$(function () {
	NodeChatController.prototype.sendMessage = function (event) {
		if(!this.active) {
			return true;
		}
 
		if (event.which == 13 && !event.shiftKey) {
			event.preventDefault();
			mainRoom.resetActivityTimer();
			var inputField = this.viewDiscussion.getTextInput();
			var send = Preparse.call(this, inputField.val());
 
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
 
 
	function Preparse(input) { //Parse slash commands.
		if(input.substring(0, 9) === '/announce' || input.substring(0, 9) === 'ANNOUNCE:') {
			if($.inArray('sysop', mw.config.get('wgUserGroups')) !== -1 || $.inArray('chatmoderator', mw.config.get('wgUserGroups')) !== -1) {
				input = input.split(' ');
				input.shift();
				input = input.join(' ');
				$('#Write [name="message"]').val('ANNOUNCE:' +input);
				return true;
			}
		} else {return true;}
	}
 
	ChatView.prototype.render = function(type) {
		if(this.model.get('text') == ''){
			var params = this.model.get('msgParams');
			params.unshift(this.model.get('wfMsg'));
			var i18nText = $.msg.apply(null, params);
			this.model.set({text: i18nText});
		}
 
		var msg = this.model.toJSON();
 
		msg.text = this.processText(msg.text, this.model.get('isInlineAlert'));
		if(this.model.get('isInlineAlert')){
			var originalTemplate = this.template;
			this.template = this.inlineTemplate;
			$(this.el).html(this.template(msg));
			this.template = originalTemplate;
		} else {
			$(this.el).html(this.template(msg));
		}
 
		$(this.el).attr('id', 'entry-' + this.model.cid );
 
		if (this.model.get('name')) {
			$(this.el).attr('data-user', this.model.get('name'));
		}
 
		if (type == 'change' || typeof(type) == 'undefined') {
			if (this.model.get('continued') === true) {
				$(this.el).addClass('continued');
			}
		}
 
		if (this.model.get('name') == wgUserName) {
			$(this.el).addClass('you');
		}
 
		if ($('#WikiChatList [data-user="'+ this.model.get('name') +'"]').is('.chat-mod')) {
			$(this.el).addClass('chat-mod');
		}
 
		if(this.model.get('isInlineAlert') === true){
			$(this.el).addClass('inline-alert');
		} else {
			$(this.el).find('.username').prepend('<span class="boundary">&lt;</span>').append('<span class="boundary">&gt;</span>');
		}
 
		if(this.model.get('timeStamp').toString().match(/^\d+$/)) {
			var date = new Date(this.model.get('timeStamp'));
			var hours = (date.getHours().toString().length == 1) ? '0' + date.getHours() : date.getHours();
			var minutes = (date.getMinutes().toString().length == 1) ? '0' + date.getMinutes() : date.getMinutes();
			var seconds = (date.getSeconds().toString().length == 1) ? '0' + date.getSeconds() : date.getSeconds();
			$(this.el).find('.time').html('<span class="boundary">[</span>' + hours + ':' + minutes + ':' + seconds + '<span class="boundary">]</span>');
		}
 
		chatAnnounce(this.el);
 
		return this;
	}
 
	models.User = Backbone.Model.extend({
		defaults: {
			'name': '',
			'since': '',
			'statusMessage': '',
			'statusState': STATUS_STATE_PRESENT,
			'isModerator': false,
			'isStaff': false,
			'isCanGiveChatMode': false,
			'avatarSrc': "http://placekitten.com/50/50",
			'editCount': '?',
			'isPrivate': false,
			'active': false,
			'privateRoomId': false
		},
		initialize: function(options){
			attrs = this.attributes;
			setTimeout(function() {
				if (attrs.statusMessage.length && attrs.statusMessage.split(' ')[0] == wgUserName.replace(' ','_') && attrs.name != wgUserName) {
					for (var i in onStatusMessage) {
						onStatusMessage[i](attrs)
					}
				}
			}, 50);
		},
		isAway: function(){
			return (this.get('statusState') == STATUS_STATE_AWAY);
		}
	});
 
	function sendStatusMessage(msg,user) {
		var setStatusCommand = new models.SetStatusCommand({
			statusState: STATUS_STATE_PRESENT,
			statusMessage: user.replace(' ','_') + ' ' + msg
		});
		mainRoom.socket.send(setStatusCommand.xport());
	}
 
	var mods = [];
	var chatAnnounce = function(el) {
		$.getJSON(mw.util.wikiScript('api') + '/api.php?action=query&list=allusers&augroup=sysop|chatmoderator&aulimit=500&format=json', function (data) {
			if (data.query && data.query.allusers) {
				for (var i = 0; i < data.query.allusers.length; i++) {
					if ($.inArray(data.query.allusers[i].name, mods) === -1) {
						mods.push(data.query.allusers[i].name);
					}
				}
			}
			chatParse(el);
		});
	};
 
	var chatParse = function (el) {
		var text = $(el).find('.message').html();
		text = text?text:'';
		if (text.substring(0, 9) === 'ANNOUNCE:') {
			$(el).removeClass().addClass('inline-alert').html(text.substring(9)); 
		}
	};
});