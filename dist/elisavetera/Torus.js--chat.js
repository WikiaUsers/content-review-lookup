Torus.classes.Chat = function(room, name) {
	if(!(this instanceof Torus.classes.Chat)) {throw new Error('Must call Torus.classes.Chat with `new`.');}
	if(room < 0) {throw new Error('Invalid negative room id. (Chat constructor)');}
	if(!name) {throw new Error('Tried to create room with no name. (Chat constructor)');}
	if(Torus.chats[name]) {throw new Error('Tried to create room ' + name + ' but it already exists. (Chat constructor)');}

	Torus.chats[room] = this;

	if(room > 0) {
		Torus.chats[name] = this;

		this.id = room;
		this.parent = false; //the source of a PM
		this.name = name;
		//this.away_timeout = 0;
		this.connected = false;
		this.connecting = false;
		this.users = 0;
		this.userlist = {};
		this.listeners = {
			chat: {},
			io: {}
		};
	}
	else { //this is the status room
		this.id = room;
		this.name = name;
		this.listeners = {
			chat: {},
		};
	}

	var event = new Torus.classes.ChatEvent('new', this);
	Torus.call_listeners(event);
}

Torus.classes.Chat.socket_connect = function(event) {
	event.sock.chat.connecting = false;
	event.sock.chat.connected = true;
	event.sock.chat.send_command('initquery');
	Torus.alert('Connected.', event.sock.chat);
	Torus.io.getBlockedPrivate();
	Torus.call_listeners(new Torus.classes.ChatEvent('open', event.sock.chat));
}
Torus.classes.Chat.socket_disconnect = function(event) {event.sock.chat.disconnect(event.message);}
Torus.classes.Chat.socket_message = function(event) {
	if(event.message.data) {data = JSON.parse(event.message.data);}
	else {data = {};} //disableReconnect and probably forceReconnect do this

	var e = event.sock.chat['event_' + event.message.event](data);
	Torus.call_listeners(e);
}

Torus.classes.Chat.prototype.connect = function(transport) {
	if(this.connected || this.connecting) {throw new Error('Tried to open ' + this.name + ' which is already open. (Chat.connect)');}
	if(!transport) {transport = 'polling';}

	Torus.alert('Connecting to ' + this.name + '...');

	if(Torus.database[this.name]) {var info = Torus.database[this.name];}
	else if(this.parent) {
		var info = {
			domain: this.parent.socket.domain,
			port: this.parent.socket.port,
			server: this.parent.socket.server,
			room: this.id,
			key: this.parent.socket.key
		};
	}
	else if(this.name == Torus.local.domain) {var info = {};}
	else {throw new Error('Can\'t connect to ' + this.name + ': connection info isn\'t in database and room is not local');}

	this.connecting = true;
	this.socket = new Torus.io.transports[transport](info);
	this.socket.chat = this;
	this.socket.add_listener('io', 'connect', Torus.classes.Chat.socket_connect);
	this.socket.add_listener('io', 'disconnect', Torus.classes.Chat.socket_disconnect);
	this.socket.add_listener('io', 'message', Torus.classes.Chat.socket_message);
}
Torus.classes.Chat.prototype.reconnect = function() {
	this.socket.close(true);
	this.connected = false;
	this.connecting = false;
	this.connect(this.socket.transport);
	Torus.call_listeners(new Torus.classes.ChatEvent('reopen', this));
}
Torus.classes.Chat.prototype.disconnect = function(message) {
	this.socket.close(true);

	Torus.alert('Disconnected from ' + this.name + ': ' + message);
	this.connecting = false;
	this.connected = false;
	var event = new Torus.classes.ChatEvent('close', this);
	event.message = message;
	Torus.call_listeners(event);

	//FIXME: this is probably bad
	this.users = 0;
	this.userlist = {};
	delete Torus.chats[this.id];
	if(this.id != this.name) {delete Torus.chats[this.name];}
}

Torus.classes.Chat.prototype.update_user = function(name, data) {
	if(data) {
		if(!this.userlist[name]) {
			this.users++;
			this.userlist[name] = data;
		}
		else {
			for(var i in data) {this.userlist[name][i] = data[i];}
		}
	}
	var event = new Torus.classes.ChatEvent('update_user', this);
	event.user = name;
	Torus.call_listeners(event);
}
Torus.classes.Chat.prototype.remove_user = function(name) {
	if(this.userlist[name]) {
		this.users--;
		delete this.userlist[name];
	}
	var event = new Torus.classes.ChatEvent('remove_user', this);
	event.user = name;
	Torus.call_listeners(event);
}

Torus.classes.Chat.prototype.send_message = function(message, hist) {
	if(!this.connected) {throw new Error('Tried to send a message to room ' + this.id + ' before it finished connecting. (Chat.send_message)');}

	message += '';
	if((hist || hist == undefined) && Torus.data.history[1] != message) {
		Torus.data.history[0] = message;
		Torus.data.history.unshift('');
	}
	Torus.data.histindex = 0;

	message = {attrs: {msgType: 'chat', 'text': message}};

	var event = new Torus.classes.ChatEvent('send_message', this); //FIXME: does not call `me` events
	event.message = message;
	Torus.call_listeners(event);

	if(this.parent) {this.parent.send_command('openprivate', {roomId: this.id, users: this.users});}
	this.socket.send(JSON.stringify(message));
}

Torus.classes.Chat.prototype.send_command = function(command, args) {
	if(!this.connected) {throw new Error('Tried to send a command to room ' + this.id + ' before it finished connecting. (Chat.send_command)');}

	var message = {attrs: {msgType: 'command', command: command}};
	for(var i in args) {message.attrs[i] = args[i];}

	var event = new Torus.classes.ChatEvent(command, this);
	event.message = message;
	Torus.call_listeners(event);

	this.socket.send(JSON.stringify(message));
}

Torus.classes.Chat.prototype.set_status = function(state, message) {
	var user = this.userlist[wgUserName];
	if(!state) {state = user.status_state;}
	if(!message) {message = user.status_message;}
	user.old_state = user.status_state;
	user.old_message = user.status_message;
	this.send_command('setstatus', {statusState: state, statusMessage: message});
}

Torus.classes.Chat.prototype.mod = function(user) {this.send_command('givechatmod', {userToPromote: user});}

Torus.classes.Chat.prototype.kick = function(user) {this.send_command('kick', {userToKick: user});}
Torus.classes.Chat.prototype.ban = function(user, expiry, reason) {
	if(!expiry) {expiry = 0;} //this is also an unban
	else if(typeof expiry == 'string') {expiry = Torus.util.expiry_to_seconds(expiry);}
	if(!reason) {
		if(expiry) {reason = 'Misbehaving in chat';} //is a ban //FIXME: ?action=query&meta=allmessages
		else {reason = 'undo';} //is an unban //FIXME: ?action=query&meta=allmessages
	}
	this.send_command('ban', {userToBan: user, reason: reason, time: expiry});
}

Torus.classes.Chat.prototype.open_private = function(users, callback, id) {
	if(users.indexOf(wgUserName) == -1) {users.push(wgUserName);}

	if(!id) {
		var c = this; //FIXME: this forces a closure scope
		Torus.io.getPrivateId(users, function(id) {
			return c.open_private(users, callback, id);
		});
	}
	else {
		if(!Torus.chats[id]) {
			var pm = new Torus.classes.Chat(id * 1, '' + id);
			pm.parent = this;
			pm.priv_users = users;
			pm.connect();
			if(typeof callback == 'function') {pm.add_listener('chat', 'open', callback);}
		}
		else { //FIXME: everything
			//Torus.ui.activate(id); FIXME: ui
			//if(typeof callback == 'function') {callback.call(Torus.chats[id]);} //FIXME: callback expects a ChatEvent('open')
		}
	}
}

Torus.classes.Chat.prototype.event_initial = function(data) {
	var event = new Torus.classes.IOEvent('initial', this);

	this.users = 0;
	this.userlist = {}; //clear current userlist, this list is 100% accurate and ours might not be

	event.users = [];
	for(var i = 0; i < data.collections.users.models.length; i++) {event.users.push(this.event_updateUser(data.collections.users.models[i]));}
	event.messages = [];
	for(var i = 0; i < data.collections.chats.models.length; i++) {event.messages.push(this['event_chat:add'](data.collections.chats.models[i]));}

	if(this.parent) {
		event.parent = this.parent;
	}
	//this.awayTimeout = setTimeout('Torus.io.setStatus(' + Torus.ui.active + ', \'away\', \'\'); Torus.chats[' + Torus.ui.active + '].autoAway = true;', 5 * 60 * 1000);

	return event;
}
Torus.classes.Chat.prototype['event_chat:add'] = function(data) {
	var event = new Torus.classes.IOEvent('chat:add', this);

	if(!data.attrs.isInlineAlert) {
		if(data.attrs.text.indexOf('/me') == 0) {
			event.event = 'me';
			event.text = data.attrs.text.substring(4);
		}
		else {
			event.event = 'message';
			event.text = data.attrs.text;
		}
		event.user = data.attrs.name;
		event.id = data.attrs.timeStamp;
		event.time = data.attrs.timeStamp;
	}
	else if(data.attrs.wfMsg) {
		switch(data.attrs.wfMsg) {
			case 'chat-inlinealert-a-made-b-chatmod':
				event.event = 'mod';
				event.performer = data.attrs.msgParams[0];
				event.target = data.attrs.msgParams[1];
				break;
			case 'chat-err-connected-from-another-browser':
				//TODO: make this its own event
				event.event = 'alert';
				event.text = 'You are connected to ' + this.name + ' from another window.'; //FIXME: i18n
				break;
			case 'chat-kick-cant-kick-moderator':
				//TODO: figure out who we tried to kick
				event.event = 'alert';
				event.text = 'Can\'t kick moderators.'; //FIXME: i18n
				break;
			default:
				console.log(event);
				break;
		}
	}
	else {
		event.event = 'alert';
		event.text = data.attrs.text;
	}
	return event;
}
Torus.classes.Chat.prototype.event_join = function(data) {
	if(this.userlist[data.attrs.name]) {var rejoin = true;}
	else {var rejoin = false;}

	var event = this.event_updateUser(data);

	if(rejoin) {event.event = 'rejoin';}
	else {event.event = 'join';}
	return event;
}
Torus.classes.Chat.prototype.event_updateUser = function(data) {
	var event = new Torus.classes.IOEvent('update_user', this);

	event.user = data.attrs.name;
	event.data = {
		avatar: data.attrs.avatarSrc.replace('28px', '100px'),
		mod: data.attrs.isModerator,
		staff: data.attrs.isStaff,
		givemod: data.attrs.isCanGiveChatMod,
		status_state: data.attrs.statusState,
		status_message: data.attrs.statusMessage,
		edits: data.attrs.editCount
	};

	this.update_user(data.attrs.name, event.data);
	return event;
}
Torus.classes.Chat.prototype.event_part = function(data) {
	var event = new Torus.classes.IOEvent('part', this);

	event.user = data.attrs.name;
	if(this.userlist[data.attrs.name]) {this.remove_user(data.attrs.name);}
	else {event.event = 'ghost';} //ghost part (or logout)
	return event;
}
Torus.classes.Chat.prototype.event_logout = function(data) {
	var event = this.event_part(data);
	event.event = 'logout';
	return event;
}
Torus.classes.Chat.prototype.event_ban = function(data) {
	var event = this.event_kick(data);
	if(data.attrs.time == 0) {event.event = 'unban';}
	else {
		event.event = 'ban';
		event.seconds = data.attrs.time;
		event.expiry = Torus.util.seconds_to_expiry(data.attrs.time);
	}
	return event;
}
Torus.classes.Chat.prototype.event_kick = function(data) {
	var event = new Torus.classes.IOEvent('kick', this);
	event.target = data.attrs.kickedUserName;
	event.performer = data.attrs.moderatorName;
	return event;
}
Torus.classes.Chat.prototype.event_openPrivateRoom = function(data) {
	var event = new Torus.classes.IOEvent('open_private', this);

	if(!Torus.chats[data.attrs.roomId]) {
		var pm = new Torus.classes.Chat(data.attrs.roomId, '' + data.attrs.roomId);
		pm.parent = this;
		pm.priv_users = data.attrs.users;
		pm.connect();
	}
	event.private = Torus.chats[data.attrs.roomId];
	event.users = data.attrs.users;

	return event;
}
Torus.classes.Chat.prototype.event_forceReconnect = function(data) {
	this.reconnect();
	return new Torus.classes.IOEvent('force_reconnect', this);
}
Torus.classes.Chat.prototype.event_disableReconnect = function(data) {
	var event = new Torus.classes.IOEvent('force_disconnect', this);
	Torus.call_listeners(event); //FIXME: this will occur twice
	this.disconnect('Server closed the connection');
	return event;
}

Torus.classes.Chat.prototype.add_listener = Torus.add_listener;
Torus.classes.Chat.prototype.remove_listener = Torus.remove_listener;
Torus.classes.Chat.prototype.call_listeners = Torus.call_listeners;