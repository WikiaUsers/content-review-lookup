/*
 * Used to create in-line alerts in chat for everyone to see, only usable by chat mods and admins
 * By Kangaroopower
*/

$(function () {
	window.onNewMessage = [];
	//Not by Kangaroopower, but modified by Kangaroopower
	NodeChatController.prototype.sendMessage = function (event) {
		if(!this.active) {
			return true;
		}
 
		if (event.which == 13 && !event.shiftKey) {
			event.preventDefault();
			mainRoom.resetActivityTimer();
			var inputField = this.viewDiscussion.getTextInput();
			var send = Announceparse.call(this, inputField.val());
 
			if (inputField.val() && send) {
				var chatEntry = new models.ChatEntry({roomId: this.roomId, name: wgUserName, text: inputField.val()});
				if( this.isPrivate == true ) { //is prive
					if( this.afterInitQueue.length < 1 || this.model.users.length < 2 ){
						this.mainController.socket.send( this.model.privateRoom.xport() );
					}
					if( !this.isInitialized  ) {
						this.afterInitQueue.push(chatEntry.xport());
						//temp chat entry in case of slow connection time
						chatEntry.set({temp : true, avatarSrc: wgAvatarUrl });  
						this.model.chats.add(chatEntry);
					} else {
						this.socket.send(chatEntry.xport());
					}
				} else {
					this.socket.send(chatEntry.xport());
				}
 
				event.preventDefault();
			}
			inputField.val('');
			$().log('submitting form');
			inputField.focus();
		}
	}
	mainRoom.viewDiscussion.unbind('sendMessage');
	mainRoom.viewDiscussion.bind('sendMessage', $.proxy(mainRoom.sendMessage, mainRoom));
 
 	//by Kangaroopower
	function Announceparse(input) { //Parse slash commands.
		var conf = mw.config.get(['wgUserGroups', 'wgUserName']),
			ug = conf.wgUserGroups;
		if(input.substring(0, 9) === '/announce') {
			if(conf.wgUserName === 'Kangaroopower' || $.inArray('sysop', ug) > -1 || $.inArray('chatmoderator', ug) > -1) {
				$('#Write [name="message"]').val(input+ ' -'+ wgUserName );
				return true;
			}
			return false;
		}
		return true;
	}
	
	//by kangaroopower- depends on Joeytje50's newmessage code
	onNewMessage.push(function(el) {
		var text = $(el).find('.message').html();
		text = text?text:'';
		if (text.substring(0, 9) === '/announce') {
			$(el).removeClass().addClass('inline-alert').html(text.substring(9) ); 
		}
	});
});