if (wgCanonicalSpecialPageName == 'Chat'){
    function Preparse(input) { //Parse slash commands.
		if(input.charAt(0) == '/') {
			var com = input.split(' ');
			com[0] = com[0].substring(1, com[0].length);
			var ref = '.' + com[0].toLowerCase();
			if(window.commands[com[0].toLowerCase()] === undefined) {return true;}
			while(typeof eval('window.commands' + ref) != 'function') {
				if(typeof eval('window.commands' + ref) == 'string') {
					ref = ref.substring(0, ref.lastIndexOf('.')) + '.' + eval('window.commands' + ref).toLowerCase();
					continue;
				}
				if(typeof eval('window.commands' + ref) == 'object') {
					if(!com[1]) {
						if(typeof eval('window.commands' + ref).default == 'function') {eval('window.commands' + ref).default.call(this, '', chat);}
						return true;
					}
					if(eval('window.commands' + ref)[com[1].toLowerCase()]) {ref += '.' + com[1].toLowerCase();}
					else if(eval('window.commands' + ref).default) {
						ref += '.default';
						if(typeof eval('window.commands' + ref) == 'function') {break;}
					}
					else {return true;}
					com = com.slice(1, com.length);
					continue;
				}
				if(typeof eval('window.commands' + ref) == 'undefined') {return true;}
			}
			com = com.slice(1, com.length);
			return eval('window.commands' + ref).call(this, com.join(' '), input);
		}
		else {return true;}
	}
	
    NodeChatController.prototype.sendMessage = function(event){
        if (!this.active){
            return true;
        }
        
        if (event.which == 13 && !event.shiftKey){
            event.preventDefault();
            mainRoom.resetActivityTimer();
            var inputField = this.viewDiscussion.getTextInput(),
                send = parse.call(this, inputField.val());
            if (inputField.val() && send){
                var chatEntry = new models.ChatEntry({roomId: this.roomId, name: wgUserName, text: inputField.val()});
				if( this.isPrivate === true ) { //is private
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
    };
    mainRoom.viewDiscussion.unbind('sendMessage');
	mainRoom.viewDiscussion.bind('sendMessage', $.proxy(mainRoom.sendMessage, mainRoom));
	
	window.commands = {
	    '': ''
	};
}