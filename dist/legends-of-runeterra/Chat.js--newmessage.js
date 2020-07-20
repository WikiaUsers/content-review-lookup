/* SYNTAX:
onNewMessage.push(function(el) {
	//code here, el being the li element.
});
*/

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
		if (msg.text.indexOf('/me ') == 0) {
			msg.text = msg.text.substr(4);
			var originalTemplate = this.template;
			this.template = this.meMessageTemplate;
			$(this.el).html(this.template(msg)).addClass('me-message-line');
			this.template = originalTemplate;
		} else {
			if (msg.text.indexOf('//me ') == 0) {
				msg.text = msg.text.substr(1);
			}
			$(this.el).html(this.template(msg));
		}
	}

	$(this.el).attr('id', 'entry-' + this.model.cid);

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

	if (this.model.get('timeStamp').toString().match(/^\d+$/)) {
		var date = new Date(this.model.get('timeStamp'));
		var hours = (date.getHours().toString().length == 1 ? '0' : '') + date.getHours();
		var minutes = (date.getMinutes().toString().length == 1 ? '0' : '') + date.getMinutes();
		var seconds = (date.getSeconds().toString().length == 1 ? '0' : '') + date.getSeconds();
		$(this.el).find('.time').html('<span class="boundary">[</span>' + hours + ':' + minutes + ':' + seconds + '<span class="boundary">]</span>');
	}

	for (var i in onNewMessage) {
		onNewMessage[i](this.el,this.model.attributes)
	}

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
		'isCanGiveChatMod': false,
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