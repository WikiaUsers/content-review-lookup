;(function($, mw) {
var config = JSON.parse(localStorage.getItem('custom-chat-pings-config')) || {},
object,
objectText,
pingFinished,
formHTML = '\
<form method="" name="" class="WikiaForm "> \
	<fieldset> \
		<p>Modo: \
			<select id="select-pings-mode"> \
				<option value="0">Mensajes</option> \
				<option value="1">Alertas</option> \
				<option value="2">Todo</option> \
			</select> \
		</p> \
		<p>Sonido: \
			<input style="width: 80%" type="text" id="text-pings-audio" placeholder="https://images.wikia.nocookie.net/monchbox/images/0/01/Beep-sound.ogg"/> \
		</p> \
		<p>Color: \
			<input type="text" id="text-pings-color" placeholder="red"/> \
		</p> \
		<br/> \
		<p>Para cada campo, separa las entradas con una <b>coma</b>.</p> \
		<p>Las entradas <b>no</b> son sensibles a mayúsculas y minúsculas.</p> \
		<br/> \
			<h2><span class="mw-headline">Mensajes</span></h2> \
				<h3><span class="mw-headline">Lista:</span></h3> \
					<input style="width: 80%" id="text-pings-messages-list"/> \
				<h3><span class="mw-headline">Lista negra:</span></h3> \
					<input style="width: 80%" id="text-pings-messages-blacklist"/> \
				<h3><span class="mw-headline">Usuarios ignorados:</span></h3> \
					<input style="width: 80%" id="text-pings-messages-ignore"/> \
			<br/><br/> \
			<h2><span class="mw-headline">Alertas</span></h2> \
				<h3><span class="mw-headline">Lista:</span></h3> \
					<input style="width: 80%" id="text-pings-alerts-list"/> \
				<h3><span class="mw-headline">Lista negra:</span></h3> \
					<input style="width: 80%" id="text-pings-alerts-blacklist"/> \
			<p>Si necesitas ayuda acerca de los pings, puedes visitar  <a href="/wiki/Ayuda:Pings" target="_blank">esta página</a>.</p> \
	</fieldset> \
</form>',
self = {
		init: function() {
			if (mw.config.get('wgCanonicalSpecialPageName') !== "Chat") return;
			$('body').append('<span id="custom-ping-sound" style="display:none;"></span>');
			$('.public.wordmark').first().append('<span class="button" id="btn-pings">Pings</span>');
			$('#btn-pings').click(function() { 
				self.loadGUI();
			});
			mainRoom.model.chats.bind("afteradd", function (child) {
				object = $('#entry-' + child.cid);
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
		},
		loadGUI: function() {
			$.showCustomModal('Sonidos de notificación', formHTML, {
				id: 'form-custom-ping',
				width: '30%',
				buttons: [{  
                    message: 'Cancelar',
                    handler: function() {
						$('#form-custom-ping').closeModal();
                    }
				},  {
                    message: 'Reiniciar',
                    defaultButton: true,
                    handler: function() {
						$.showCustomModal('¿Estás seguro?', '¿Deseas reiniciar las configuración de los sonidos de notificación a sus valores predeterminados?', {
							id: 'form-custom-ping-clear',
							width: '20%',
							buttons: [{  
								message: 'Confirmar',
								defaultButton: true,
								handler: function() {
									$('#select-pings-mode').val(0);
									$('#text-pings-audio,#text-pings-color,#text-pings-messages-list,#text-pings-messages-blacklist,#text-pings-messages-ignore,#text-pings-alerts-list,#text-pings-alerts-blacklist').val('');
									$('#form-custom-ping-clear').closeModal();
								}
							},  {
								message: 'Cancelar',
								defaultButton: true,
								handler: function() {
									$('#form-custom-ping-clear').closeModal();
								}
							}]
						});
                    }
				},  {
                    message: 'Aceptar',
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
			object.css('color', config.color);
			$('#custom-ping-sound').html('<audio src="' + config.audio + '" autoplay=""></audio>');
			pingFinished = true;		
		}
};
self.init();
}) (this.jQuery, this.mediaWiki);