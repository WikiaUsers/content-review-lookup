/* 
* Custom Chat Pings
* Advanced chat pings with flexibility to customise various properties
* Includes blacklist for unwanted false positives
* Can also set to ping for alerts too (e.g. join/leave/ban)
* @author Ozank Cx
*/

$(function() {

    if (
        window.CustomChatPingsLoaded ||
        mw.config.get('wgCanonicalSpecialPageName') !== "Chat"
    ) {
        return;
    }
    window.CustomChatPingsLoaded = true;

var config = JSON.parse(localStorage.getItem('custom-chat-pings-config')) || {},
object,
objectText,
pingFinished,
formHTML = '\
<form method="" name="" class="WikiaForm "> \
	<fieldset> \
		<p>Mode: \
			<select id="select-pings-mode"> \
				<option value="0">Messages</option> \
				<option value="1">Alerts</option> \
				<option value="2">All</option> \
			</select> \
		</p> \
		<p>Audio: \
			<input style="width: 80%" type="text" id="text-pings-audio" placeholder="https://images.wikia.nocookie.net/monchbox/images/0/01/Beep-sound.ogg"/> \
		</p> \
		<p>Color: \
			<input type="text" id="text-pings-color" placeholder="red"/> \
		</p> \
		<br/> \
		<p>For each field, seperate each entry with a <b>comma</b>. All entries are case insensitive.</p> \
		<br/> \
			<h2><span class="mw-headline">Messages</span></h2> \
				<h3><span class="mw-headline">List:</span></h3> \
					<input style="width: 80%" id="text-pings-messages-list"/> \
				<h3><span class="mw-headline">Blacklist:</span></h3> \
					<input style="width: 80%" id="text-pings-messages-blacklist"/> \
				<h3><span class="mw-headline">Ignored Users:</span></h3> \
					<input style="width: 80%" id="text-pings-messages-ignore"/> \
			<br/><br/> \
			<h2><span class="mw-headline">Alerts</span></h2> \
				<h3><span class="mw-headline">List:</span></h3> \
					<input style="width: 80%" id="text-pings-alerts-list"/> \
				<h3><span class="mw-headline">Blacklist:</span></h3> \
					<input style="width: 80%" id="text-pings-alerts-blacklist"/> \
			<p>To report bugs or suggestions, do so <a href="//dev.wikia.com/wiki/Talk:CustomChatPings" target="_blank">here</a>.</p> \
	</fieldset> \
</form>',
self = {
		init: function() {
			
			//add audio object to page
			$('body').append('<span id="custom-ping-sound" style="display:none;"></span>');
			
			//add button for loading GUI
			$('#Write').append('<span style="position: absolute; top: 0px; right: 47px" class="button" id="btn-custom-ping">Pings</span>');
			
			//set event listener to load the GUI 
			$('#btn-custom-ping').click(function() { 
				self.loadGUI();
			});
			
			//start the chat event listener we'll be using
			//@param the child object being added
			mainRoom.model.chats.bind("afteradd", function (child) {
				//select child object
				object = $('#entry-' + child.cid);
				
				//set ping boolean to false
				pingFinished = false;
				
				if (config.messageList || config.alertList) {
					if (object.hasClass('inline-alert')) {
						if (config.mode != 0) {
							objectText = object.text().toLowerCase().trim();
							$.each(config.alertList.split(','), function(i,v) {
								$.each(config.alertBlacklist.split(','), function(i2,v2) {
									if (objectText.indexOf(v.toLowerCase()) !== -1 && (objectText.indexOf(v2.toLowerCase()) === -1 || !v2)) {
										self.processPing();
										if (pingFinished) return;
									}
								});
								if (pingFinished) return;
							});
						}
					}
					else if ($('div.User > span:nth-child(2)').text() !== object.attr('data-user')) {
						if (config.mode != 1) {
							objectText = object.children('.message').text().toLowerCase().trim();
							$.each(config.messageList.split(','), function(i,v) {
								$.each(config.messageBlacklist.split(','), function(i2,v2) {
									$.each(config.ignore.split(','), function(i3,v3) {
										if (objectText.indexOf(v.toLowerCase()) !== -1 && (objectText.indexOf(v2.toLowerCase()) === -1 || !v2) && (object.attr('data-user').toLowerCase().indexOf(v3.toLowerCase()) === -1 || !v3)) {
											self.processPing();
											if (pingFinished) return;
										}
									});
									if (pingFinished) return;
								});
								if (pingFinished) return;
							});
						}
					}
				}
			});
			
			//add inline alert to confirm loading of script
			mainRoom.model.chats.add(new models.InlineAlert({text:'Custom Chat Pings loaded. To report bugs or suggestions, do so [[w:c:dev:Talk:CustomChatPings|here]].'}));
		},
		loadGUI: function() {
			$.showCustomModal('Custom Chat Pings', formHTML, {
				id: 'form-custom-ping',
				width: '30%',
				buttons: [{  
				    message: 'Cancel',
				    handler: function() {
						$('#form-custom-ping').closeModal();
				    }
				},  {
				    message: 'Reset',
				    defaultButton: true,
				    handler: function() {
						$.showCustomModal('Confirmation', 'Are you sure you want to reset the values?', {
							id: 'form-custom-ping-clear',
							width: '20%',
							buttons: [{  
								message: 'Yes',
								defaultButton: true,
								handler: function() {
									$('#select-pings-mode').val(0);
									$('#text-pings-audio,#text-pings-color,#text-pings-messages-list,#text-pings-messages-blacklist,#text-pings-messages-ignore,#text-pings-alerts-list,#text-pings-alerts-blacklist').val('');
									$('#form-custom-ping-clear').closeModal();
								}
							},  {
								message: 'No',
								defaultButton: true,
								handler: function() {
									$('#form-custom-ping-clear').closeModal();
								}
							}]
						});
				    }
				},  {
				    message: 'Update',
				    defaultButton: true,
				    handler: function() {
						config.mode = $('#select-pings-mode').val();
						config.audio = $('#text-pings-audio').val() || $('#text-pings-audio').attr('placeholder');
						config.color = $('#text-pings-color').val() || $('#text-pings-color').attr('placeholder');
						config.messageList = $('#text-pings-messages-list').val();
						config.messageBlacklist = $('#text-pings-messages-blacklist').val();
						config.ignore = $('#text-pings-messages-ignore').val();					
						config.alertList = $('#text-pings-alerts-list').val();
						config.alertBlacklist = $('#text-pings-alerts-blacklist').val();
						
						localStorage.setItem('custom-chat-pings-config', JSON.stringify(config));
						$('#form-custom-ping').closeModal();
				    }
				}]
			});
			
			//load stored values after GUI loads
			if (config.mode) $('#select-pings-mode').val(config.mode);
			if (config.audio) $('#text-pings-audio').val(config.audio);
			if (config.color) $('#text-pings-color').val(config.color);
			if (config.messageList) $('#text-pings-messages-list').val(config.messageList);
			if (config.messageBlacklist) $('#text-pings-messages-blacklist').val(config.messageBlacklist);
			if (config.ignore) $('#text-pings-messages-ignore').val(config.ignore);
			if (config.alertList) $('#text-pings-alerts-list').val(config.alertList);
			if (config.alertBlacklist) $('#text-pings-alerts-blacklist').val(config.alertBlacklist);			
		},
		processPing: function () {
			//change text color
			object.find('.message').css('color', config.color);
								
			//play sound
			$('#custom-ping-sound').html('<audio src="' + config.audio + '" autoplay=""></audio>');
									
			//stop all loops
			pingFinished = true;		
		}
};

self.init();

});