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
	}

	if(this.model.get('timeStamp').toString().match(/^\d+$/)) {
		var date = new Date(this.model.get('timeStamp'));
		var hours = (date.getHours().toString().length == 1) ? '0' + date.getHours() : date.getHours();
		var minutes = (date.getMinutes().toString().length == 1) ? '0' + date.getMinutes() : date.getMinutes();
		var seconds = (date.getSeconds().toString().length == 1) ? '0' + date.getSeconds() : date.getSeconds();
		$(this.el).find('.time').text(hours + ':' + minutes + ':' + seconds);
	}

	for (var i in onNewMessage) {
		onNewMessage[i](this.el)
	}

	return this;
}