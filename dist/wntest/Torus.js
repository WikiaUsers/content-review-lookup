/************** Torus chat client **************
 * A Wikia chat client that isn't Special:Chat *
 * ------------------------------------------- *
 * Written and maintained by Monchoman45       *
 ***********************************************/

/*{{cc}} {{cl}}*/importScriptURI('http://monchbox.wikia.com/wiki/MediaWiki:Torus.js?action=raw&ctype=text/javascript&templates=expand&t=' + (new Date()).getTime());

/*{{cc}}
window.Torus = {
	init: false,
	local: 0,
	version: 201.7, //2.0.1r7
	chats: {},
	listeners: {
		open: [],
		close: [],
		reopen: [],
		logout: []
	},
	io: {
		polling: 0,
		transports: {},
		listeners: {
			initial: [],
			message: [],
			alert: [],
			me: [],
			join: [],
			rejoin: [],
			part: [],
			ghost: [],
			logout: [],
			updateUser: [],
			mod: [],
			kick: [],
			ban: [],
			unban: [],
			openPrivateRoom: [],
			forceReconnect: [],
			disableReconnect: [],
		}
	},
	ui: {
		window: document.createElement('div'),
		active: 0,
		viewing: [],
		listeners: {
			render: [],
			activate: [],
			show: [],
			unshow: [],
			renderPopup: [],
			unrenderPopup: [],
			ping: [],
			fullscreen: []
		}
	},
	logs: {
		messages: {},
		plain: {},
		socket: {}
	},
	options: {},
	commands: {},
	util: {},
	data: {
		domains: {},
		ids: {},
		titleflash: document.title,
		pinginterval: 0,
		history: [],
		histindex: 0,
		tabtext: '',
		tabindex: 0,
		tabpos: 0,
		fullscreen: false
	}
}

window.io = {j: []};

//Function for adding an event listener
//Accepts the event name and the listener function
Torus.addListener = Torus.ui.addListener = Torus.io.addListener = function(type, func) {
	if(!this.listeners[type]) {this.listeners[type] = [];}
	this.listeners[type].push(func);
	return true;
}
//Function for removing an event listener
//Accepts the event name and the listener function
//Returns true if the listener is removed, otherwise false
Torus.removeListener = Torus.ui.removeListener = Torus.io.removeListener = function(type, func) {
	if(!this.listeners[type]) {return false;}
	for(var i = 0; i < this.listeners[type].length; i++) {
		if(this.listeners[type][i] == func) {this.listeners[type].splice(i, 1); return true;}
	}
	return false;
}
//Function for calling listeners for an event
//Accepts the event name
//Returns false if the type is invalid, otherwise true
Torus.callListeners = Torus.ui.callListeners = Torus.io.callListeners = function(type) {
	if(!this.listeners[type]) {return false;}
	if(this.listeners[type].length == 0) {return true;}
	var args = [];
	for(var i = 1; i < arguments.length; i++) {args.push(arguments[i]);}
	for(var i = 0; i < this.listeners[type].length; i++) {
		this.listeners[type][i].apply(this, args);
	}
	return true;
}

Torus.open = function(room, key, server, port, session, transport) {
	if(isNaN(room * 1)) {room = Torus.data.domains[room];}
	if(room <= 0) {throw new Error('Invalid room ' + room + '. (open)');}
	
	if(!Torus.chats[room] || (Torus.chats[room].connected == false && Torus.chats[room].connecting == false)) {
		if(!Torus.chats[room]) {
			Torus.ui.addRoom(room);
			Torus.ui.activate(room);
		}
		Torus.chats[room].connecting = true;
		
		if(key === false) {throw new Error('\'key\' is false. (open)');}
		else if(!key) {
			Torus.io.spider(function(data) {
				if(!data) {throw new Error('Can\'t spider: wiki does not have chat. (open)');}
				
				if(!server) {server = data.nodeHostname;}
				if(!port) {port = data.nodePort;}
				Torus.chats[room].connecting = false;
				if(data.chatkey.key === false) {key = false;} //why can't chatkey just be false?
				else {key = data.chatkey}
				return Torus.open(room, key, server, port, session);
			});
			return;
		}
		if(!server) {server = 'chat2-2.wikia.com';}
		if(!port) {port = '80';}
		if(!session) {
			Torus.io.session(room, key, server, port, function(data) {
				Torus.chats[room].connecting = false;
				if(typeof data == 'string') {return Torus.open(room, key, server, port, data);}
				else {Torus.close(room, 'Unable to retrieve session id: ' + data.message);}
			});
			return;
		}
		
		if(transport) {Torus.chats[room].transport = transport;}
		Torus.chats[room].socket = Torus.io.transports[Torus.chats[room].transport](room, key, server, port, session);
		Torus.alert('Connecting to ' + (Torus.data.ids[room] ? Torus.data.ids[room] : room) + '...');
	}
	else {throw new Error('Room ' + room + ' is already open. (open)');}
}

Torus.close = function(room, message) {
	if(isNaN(room * 1)) {room = Torus.data.domains[room];}
	if(!Torus.chats[room] || room <= 0) {throw new Error('Invalid room ' + room + '. (close)');}
	
	if(Torus.chats[room].socket) {
		Torus.chats[room].socket.silence();
		Torus.chats[room].socket.close();
	}
	Torus.alert('Disconnected from ' + (Torus.data.ids[room] ? Torus.data.ids[room] : room) + ': ' + message);
	Torus.chats[room].connected = false;
	Torus.chats[room].callListeners('close');
	Torus.callListeners('close', room);
	Torus.ui.removeRoom(room);
}

Torus.reopen = function(room) {
	if(isNaN(room * 1)) {room = Torus.data.domains[room];}
	if(!Torus.chats[room] || room <= 0) {throw new Error('Invalid room ' + room + '. (reopen)');}
	
	Torus.alert('Reconnecting...', room);
	Torus.chats[room].socket.silence();
	Torus.chats[room].socket.close();
	Torus.chats[room].connected = false;
	Torus.open(room);
	Torus.chats[room].callListeners('reopen');
	Torus.callListeners('reopen', room);
}

Torus.logout = function() {
	for(var i in Torus.chats) {
		if(i > 0) {
			Torus.io.sendCommand(i, 'logout');
			Torus.chats[i].callListeners('logout');
			Torus.close(i, 'logout');
		}
	}
	Torus.callListeners('logout');
}

Torus.alert = function(text, room) {
	if(!room) {room = 0;}
	
	if(text.indexOf('\n') != -1) {
		var spl = text.split('\n');
		for(var i = 0; i < spl.length; i++) {
			Torus.ui.addLine({
				event: 'alert',
				type: 'io',
				id: (new Date()).getTime(),
				room: room,
				time: (new Date()).getTime(),
				rawtext: spl[i],
				text: Torus.util.parseLinks(spl[i])
			});
		}
	}
	else {Torus.ui.addLine({
		event: 'alert',
		type: 'io',
		id: (new Date()).getTime(),
		room: room,
		time: (new Date()).getTime(),
		rawtext: text,
		text: Torus.util.parseLinks(text)
	});}
}

Torus.ui.addRoom = function(room, name) {
	if(isNaN(room * 1)) {room = Torus.data.domains[room];}
	if(!room) {throw new Error('Invalid room ' + room + '. (ui.addRoom)');}
	if(room > 0) {name = (Torus.data.ids[room] ? Torus.data.ids[room] : room);}
	else if(!name) {throw new Error('Special rooms must be named');}
	
	if(Torus.chats[room]) {return;}
	Torus.ui.window.tabs.innerHTML += '<span id="torus-tab-' + room + '" class="torus-tab" onclick="event.preventDefault(); if(event.shiftKey && Torus.ui.active != ' + room + ') {Torus.ui.show(' + room + ');} else {Torus.ui.activate(' + room + ');}">' + name + (room > 0 ? '<span class="torus-tab-close" onclick="event.stopPropagation(); Torus.close(' + room + ', \'closed\');">x</span>' : '') + '</span>';
	if(room > 0) {
		if(!Torus.options.pings[name]) {
			Torus.options.pings[name] = {};
			Torus.options.pings[name].enabled = true;
			Torus.options.pings[name].case_sensitive = {type: 'text', value: ''};
			Torus.options.pings[name].case_insensitive = {type: 'text', value: ''};
		}
		Torus.chats[room] = {
			id: room,
			parent: false, //the source of a PM
			name: name,
			awayTimeout: 0,
			transport: 'xhr-polling',
			connected: false,
			connecting: true,
			reconnecting: false,
			userlist: {length: 0},
			listeners: {
				open: [],
				close: [],
				reopen: [],
				logout: [],
				render: [],
				activate: [],
				show: [],
				unshow: [],
				ping: [],
				initial: [],
				message: [],
				me: [],
				alert: [],
				join: [],
				rejoin: [],
				part: [],
				ghost: [],
				logout: [],
				updateUser: [],
				mod: [],
				kick: [],
				ban: [],
				unban: [],
				openPrivateRoom: [],
				forceReconnect: [],
				disableReconnect: [],
			},
			addListener: Torus.addListener,
			removeListener: Torus.removeListener,
			callListeners: Torus.callListeners
		};
		for(var i in Torus.logs) {
			if(!Torus.logs[i][room]) {Torus.logs[i][room] = [];}
		}
	}
	else {
		Torus.chats[room] = {
			name: name,
			listeners: {
				render: [],
				activate: []
			},
			addListener: Torus.addListener,
			removeListener: Torus.removeListener,
			callListeners: Torus.callListeners
		};
	}
}

Torus.ui.removeRoom = function(room) {
	if(isNaN(room * 1)) {room = Torus.data.domains[room];}
	if(!Torus.chats[room]) {throw new Error('Invalid room ' + room + '. (ui.removeRoom)');}
	
	if(room > 0 && Torus.chats[room].connected) {return Torus.close(room);} //function was called when the room is still open
	
	if(Torus.ui.active == room) {
		if(Torus.chats[room].parent) {Torus.ui.activate(Torus.chats[room].parent);}
		else {Torus.ui.activate(0);}
	}
	if(Torus.chats[room].viewing) {Torus.ui.show(room);}
	var tabs = Torus.ui.window.tabs;
	for(var i = 0; i < tabs.children.length; i++) {
		if(tabs.children[i].id == 'torus-tab-' + room) {tabs.removeChild(tabs.children[i]); break;}
	}
	delete Torus.chats[room];
}

Torus.ui.render = function() {
	var rooms = [];
	var indexes = [];
	var active = false;
	for(var i = 0; i < Torus.ui.viewing.length; i++) {
		if(Torus.ui.viewing[i] == Torus.ui.active) {active = true;}
		if(Torus.logs.messages[Torus.ui.viewing[i]].length > 0) {
			rooms.push(Torus.logs.messages[Torus.ui.viewing[i]]);
			indexes.push(Torus.logs.messages[Torus.ui.viewing[i]].length - 1);
		}
	}
	if(!active && Torus.logs.messages[Torus.ui.active].length > 0) {
		rooms.push(Torus.logs.messages[Torus.ui.active]);
		indexes.push(Torus.logs.messages[Torus.ui.active].length - 1);
	}
	
	Torus.ui.window.window.innerHTML = '';
	for(var i = 0; i < Torus.options.messages.general.max.value && rooms.length > 0; i++) {
		var message = rooms[0][indexes[0]];
		var source = 0;
		for(var j = 1; j < rooms.length; j++) {
			if(rooms[j][indexes[j]].id > message.id) {
				message = rooms[j][indexes[j]];
				source = j;
			}
		}
		indexes[source]--;
		if(indexes[source] == -1) { //no more messages
			rooms.splice(source, 1);
			indexes.splice(source, 1);
		}
		if(i == 0) {Torus.ui.window.window.appendChild(Torus.ui.renderLine(message));}
		else {Torus.ui.window.window.insertBefore(Torus.ui.renderLine(message), Torus.ui.window.window.firstChild);}
	}
	
	Torus.ui.window.sidebar.innerHTML = '';
	for(var i in Torus.chats[Torus.ui.active].userlist) {
		if(i == 'length') {continue;}
		Torus.ui.updateUser(Torus.ui.active, i);
	}
	
	if(Torus.ui.active > 0) {Torus.chats[Torus.ui.active].callListeners('render');}
	for(var i = 0; i < Torus.ui.viewing.length; i++) {
		if(Torus.ui.viewing[i] > 0) {Torus.chats[Torus.ui.viewing[i]].callListeners('render');}
	}
	Torus.ui.callListeners('render');
}

Torus.ui.activate = function(room) {
	if(isNaN(room * 1)) {room = Torus.data.domains[room];}
	if(!Torus.chats[room]) {throw new Error('Invalid room ' + room + '. (ui.activate)');}
	
	var tabs = Torus.ui.window.tabs.children;
	for(var i = 0; i < tabs.length; i++) {
		if(tabs[i].id == 'torus-tab-' + Torus.ui.active) {
			var classes = tabs[i].className.split(' ');
			for(var j = 0; j < classes.length; j++) {
				if(classes[j] == 'torus-tab-active') {classes.splice(j, 1); break;}
			}
			tabs[i].className = classes.join(' ');
			break;
		}
	}
	
	if(Torus.ui.active == -1) {Torus.options.save();}
	
	Torus.ui.active = room;
	for(var i = 0; i < tabs.length; i++) {
		if(tabs[i].id == 'torus-tab-' + room) {tabs[i].className += ' torus-tab-active'; break;}
	}
	
	Torus.ui.window.sidebar.innerHTML = '';
	if(room > 0) {Torus.ui.updateUser(room, wgUserName);}
	
	if(room > 0) {
		if(!Torus.chats[room].parent) {Torus.ui.window.info.innerHTML = 'Public room' + (Torus.data.ids[room] ? ' of <a href="http://' + Torus.data.ids[room] + '.wikia.com" onclick="event.preventDefault(); window.open(this.href, \'torus\');">' + Torus.data.ids[room] + '</a>' : '') + '. (' + room + ')';}
		else {Torus.ui.window.info.innerHTML = 'Private room of ' + (Torus.data.ids[Torus.chats[room].parent] ? '<a href="http://' + Torus.data.ids[Torus.chats[room].parent] + '.wikia.com" onclick="event.preventDefault(); window.open(this.href, \'torus\');">' + Torus.data.ids[Torus.chats[room].parent] + '</a>' : Torus.chats[room].parent) + ', between ' + Torus.chats[room].users.slice(0, Torus.chats[room].users.length - 1).join(', ') + ' and ' + Torus.chats[room].users[Torus.chats[room].users.length - 1] + '. (' + room + ')';}
	}
	else {Torus.ui.window.info.innerHTML = '';}

	if(room >= 0) {Torus.ui.render();}
	
	Torus.ui.window.window.scrollTop = Torus.ui.window.window.scrollHeight;
	if(room > 0) {Torus.chats[room].callListeners('activate');}
	Torus.ui.callListeners('activate', room);
}

Torus.ui.show = function(room) {
	if(isNaN(room * 1)) {room = Torus.data.domains[room];}
	if(room < 0 || !Torus.chats[room]) {throw new Error('Invalid room ' + room + '. (ui.show)');}

	var tabs = Torus.ui.window.tabs.children;
	if(Torus.chats[room].viewing) {
		Torus.chats[room].viewing = false;
		for(var i = 0; i < Torus.ui.viewing.length; i++) {
			if(Torus.ui.viewing[i] == room) {Torus.ui.viewing.splice(i, 1);}
		}
		for(var i = 0; i < tabs.length; i++) {
			if(tabs[i].id == 'torus-tab-' + room) {
				var classes = tabs[i].className.split(' ');
				for(var j = 0; j < classes.length; j++) {
					if(classes[j] == 'torus-tab-viewing') {classes.splice(j, 1); break;}
				}
				tabs[i].className = classes.join(' ');
				break;
			}
		}
		Torus.ui.render();
		if(room > 0) {Torus.chats[room].callListeners('unshow');}
		Torus.ui.callListeners('unshow', room);
		return;
	}
	Torus.ui.viewing.push(room);
	Torus.chats[room].viewing = true;
	for(var i = 0; i < tabs.length; i++) {
		if(tabs[i].id == 'torus-tab-' + room) {tabs[i].className += ' torus-tab-viewing'; break;}
	}
	
	Torus.ui.render();
	Torus.ui.window.window.scrollTop = Torus.ui.window.window.scrollHeight;
	
	if(room > 0) {Torus.chats[room].callListeners('show');}
	Torus.ui.callListeners('show', room);
}

Torus.ui.addLine = function(message) {
	if(isNaN(message.room * 1)) {message.room = Torus.data.domains[message.room];}
	if(!Torus.chats[message.room]) {throw new Error('Invalid room ' + message.room + '. (ui.addLine)');}
	if(message.room < 0) {throw new Error('Cannot add lines to special rooms. (ui.addLine)');}
	
	Torus.logs.messages[message.room].push(message);
	//Torus.logs.plain[message.room].push(message);
	
	if(message.room == Torus.ui.active || (Torus.chats[message.room].viewing && Torus.ui.active >= 0)) {
		var scroll = false;
		if(Torus.ui.window.window.offsetHeight + Torus.ui.window.window.scrollTop >= Torus.ui.window.window.scrollHeight) {scroll = true;}
		Torus.ui.window.window.appendChild(Torus.ui.renderLine(message));
		if(scroll) {Torus.ui.window.window.scrollTop = Torus.ui.window.window.scrollHeight;}
		
		if(Torus.ui.window.window.children.length > Torus.options.messages.general.max.value) {Torus.ui.window.window.removeChild(Torus.ui.window.window.children[0]);}
	}
}

Torus.ui.renderLine = function(message) {
	if(message.type != 'io') {throw new Error('Event type must be io. (ui.renderLine)');}
	var line = document.createElement('div');
	line.className = 'torus-message torus-room-' + message.room;
	if(message.room != Torus.ui.active) {line.className += ' torus-message-inactive';}
	line.innerHTML = '<span class="torus-message-timestamp">[' + Torus.util.timestamp(message.time) + ']</span> <span class="torus-message-room">(' + (Torus.data.ids[message.room] ? Torus.data.ids[message.room] : message.room) + ')</span> ';
	switch(message.event) {
		case 'message':
			line.innerHTML += '&lt;<span class="torus-message-usercolor" style="color:' + Torus.util.colorHash(message.user) + ';">' + message.user + '</span>&gt; ' + message.text;
			break;
		case 'me':
			line.innerHTML += '* <span class="torus-message-usercolor" style="color:' + Torus.util.colorHash(message.user) + ';">' + message.user + '</span> ' + message.text;
			break;
		case 'alert':
			line.innerHTML += '== ' + message.text;
			break;
		case 'join':
		case 'rejoin':
		case 'ghost':
			line.innerHTML += '== <span class="torus-message-usercolor" style="color:' + Torus.util.colorHash(message.user) + ';">' + message.user + '</span> ' + message.event + 'ed ' + (Torus.data.ids[message.room] ? Torus.data.ids[message.room] : message.room);
			break;
		case 'part':
			line.innerHTML += '== <span class="torus-message-usercolor" style="color:' + Torus.util.colorHash(message.user) + ';">' + message.user + '</span> left ' + (Torus.data.ids[message.room] ? Torus.data.ids[message.room] : message.room);
			break;
		case 'logout':
			line.innerHTML += '== <span class="torus-message-usercolor" style="color:' + Torus.util.colorHash(message.user) + ';">' + message.user + '</span> logged out';
			break;
		case 'mod':
			line.innerHTML += '== <span class="torus-usercolor" style="color:' + Torus.util.colorHash(message.performer) + '">' + message.performer + '</span> promoted <span class="torus-usercolor" style="color:' + Torus.util.colorHash(message.target) + '">' + message.target + '</span> to chatmod';
			break;
		case 'kick':
		case 'ban':
		case 'unban':
			if(message.event != 'kick') {var tense = 'ned';} //curse you, english language
			else {var tense = 'ed'}
			line.innerHTML += '== <span class="torus-message-usercolor" style="color:' + Torus.util.colorHash(message.performer) + ';">' + message.performer + '</span> ' + message.event + tense + ' <span class="torus-message-usercolor" style="color:' + Torus.util.colorHash(message.target) + ';">' + message.target + '</span> from ' + (Torus.data.ids[message.room] ? Torus.data.ids[message.room] : message.room);
			if(message.event == 'ban') {line.innerHTML += ' for ' + message.expiry;}
			break;
		default: throw new Error('Message type ' + message.event + ' is not rendered. (ui.renderLine)');
	}
	return line;
}

Torus.ui.updateUser = function(room, name, props) {
	if(isNaN(room * 1)) {room = Torus.data.domains[room];}
	if(!Torus.chats[room] || room <= 0) {throw new Error('Invalid room ' + room + '. (ui.updateUser)');}

	if(!Torus.chats[room].userlist[name] && !props) {return;}
	else if(!Torus.chats[room].userlist[name] && props) {Torus.chats[room].userlist.length++;}
	if(props) {
		if(!Torus.chats[room].userlist[name]) {Torus.chats[room].userlist[name] = props;}
		else {
			for(var i in props) {Torus.chats[room].userlist[name][i] = props[i];}
		}
	}
	props = Torus.chats[room].userlist[name];
	
	if(Torus.ui.active == room) {
		var userlist = Torus.ui.window.sidebar.getElementsByTagName('li');
		var changed = false;
		for(var i = 0; i < userlist.length; i++) {
			if(userlist[i].className.indexOf('torus-user-' + encodeURIComponent(name)) != -1) { //is encodeURIComponent sufficient for this?
				var li = userlist[i];
				changed = true;
				break;
			}
		}
		if(!changed) {
			var li = document.createElement('li');
			li.onmouseover = function(event) {Torus.ui.renderPopup(name);}
			var sidebar = Torus.ui.window.sidebar;
			var added = false;
			for(var i = 0; i < sidebar.children.length; i++) {
				var child = sidebar.children[i].children[sidebar.children[i].children.length - 1].textContent;
				var before = true;
				for(var j = 0; j < child.length; j++) {
					if(child.charCodeAt(j) > name.charCodeAt(j)) {break;}
					else if(child.charCodeAt(j) != name.charCodeAt(j)) {before = false; break;}
				}
				if(before) {
					sidebar.insertBefore(li, sidebar.children[i]);
					added = true;
					break;
				}
			}
			if(!added) {sidebar.appendChild(li);} //is at the end of the alphabet
		}
		
		li.className = 'torus-user ' + (props.mod || props.staff ? 'torus-user-' + (props.staff ? 'staff' : 'mod') + ' ' : '') + 'torus-user-' + encodeURIComponent(name);
		li.innerHTML = (props.mod || props.staff ? '<img class="torus-user-icon-' + (props.staff ? 'staff' : 'mod') + '" src="https://images.wikia.nocookie.net/monchbox/images/' + (props.staff ? 'f/f3/Icon-staff' : '6/6b/Icon-chatmod') + '.png">' : '') + '&nbsp;<span class="torus-user-name' + (props.statusState.toLowerCase() == 'away' ? ' torus-user-away' : '') + '">' + name + '</span>';
	}
}

Torus.ui.removeUser = function(room, name) {
	if(isNaN(room * 1)) {room = Torus.data.domains[room];}
	if(!Torus.chats[room] || room <= 0) {throw new Error('Invalid room ' + room + '. (ui.removeUser)');}

	delete Torus.chats[room].userlist[name];
	Torus.chats[room].userlist.length--;
	if(Torus.ui.active == room) {
		var users = Torus.ui.window.sidebar.getElementsByTagName('li');
		for(var i = 0; i < users.length; i++) {
			if(users[i].className.indexOf('torus-user-' + encodeURIComponent(name)) != -1) {
				users[i].parentNode.removeChild(users[i]);
				break;
			}
		}
	}
}

Torus.ui.renderPopup = function(name, room, coords) {
	if(!room || room <= 0) {room = Torus.ui.active;}
	if(!name || !Torus.chats[room].userlist[name]) {throw new Error('Invalid user ' + name + '. (ui.renderPopup)');}
	
	var target = Torus.chats[room].userlist[name];
	var user = Torus.chats[room].userlist[wgUserName];
	var html = '<img id="torus-popup-avatar" src="' + target.avatar + '"><div id="torus-popup-info"><div><span id="torus-popup-name">' + name + '</span>';
	if(target.mod || target.staff) {html += ' <span id="torus-popup-access"><img class="torus-user-icon-' + (target.staff ? 'staff' : 'mod') + '" src="https://images.wikia.nocookie.net/monchbox/images/' + (target.staff ? 'f/f3/Icon-staff' : '6/6b/Icon-chatmod') + '.png">' + (!target.staff && target.givemod ? '+' : '') + '</span>';}
	html += '</div><div id="torus-popup-status-state">' + target.statusState + '</div><div id="torus-popup-status-message">' + target.statusMessage + '</div></div>';
	if(Torus.data.ids[room]) {html += '<div id="torus-popup-userlinks"><div><a class="torus-popup-userlink" href="http://' + Torus.data.ids[room] + '.wikia.com/wiki/User_talk:' + name + '" onclick="event.preventDefault(); window.open(this.href, \'torus\');">talk</a><a class="torus-popup-userlink" href="http://' + Torus.data.ids[room] + '.wikia.com/wiki/Special:Contributions/' + name + '" onclick="event.preventDefault(); window.open(this.href, \'torus\');">contribs</a></div><div><a class="torus-popup-userlink" href="http://' + Torus.data.ids[room] + '.wikia.com/wiki/Special:Log/chatban?page=User:' + name + '" onclick="event.preventDefault(); window.open(this.href, \'torus\');">ban history</a><a class="torus-popup-userlink" href="http://' + Torus.data.ids[room] + '.wikia.com/wiki/Special:Log/chatconnect?user=' + name + '" onclick="event.preventDefault(); window.open(this.href, \'torus\');">chatconnect</a></div></div>';}
	else if(Torus.data.ids[Torus.chats[room].parent]) {html += '<div id="torus-popup-userlinks"><div><a class="torus-popup-userlink" href="http://' + Torus.data.ids[Torus.chats[room].parent] + '.wikia.com/wiki/User_talk:' + name + '" onclick="event.preventDefault(); window.open(this.href, \'torus\');">talk</a><a class="torus-popup-userlink" href="http://' + Torus.data.ids[Torus.chats[room].parent] + '.wikia.com/wiki/Special:Contributions/' + name + '" onclick="event.preventDefault(); window.open(this.href, \'torus\');">contribs</a></div><div><a class="torus-popup-userlink" href="http://' + Torus.data.ids[Torus.chats[room].parent] + '.wikia.com/wiki/Special:Log/chatban?page=User:' + name + '" onclick="event.preventDefault(); window.open(this.href, \'torus\');">ban history</a><a class="torus-popup-userlink" href="http://' + Torus.data.ids[Torus.chats[room].parent] + '.wikia.com/wiki/Special:Log/chatconnect?user=' + name + '" onclick="event.preventDefault(); window.open(this.href, \'torus\');">chatconnect</a></div></div>';}
	html += '<div id="torus-popup-actions"><a class="torus-popup-action" onclick="Torus.io.openPrivate(' + room + ', [\'' + name + '\']);">Private message</a>';
	var blocked = false;
	for(var i = 0; i < Torus.data.blocked.length; i++) {
		if(Torus.data.blocked[i] == name) {blocked = true; break;}
	}
	if(blocked) {html += '<a class="torus-popup-action" onclick="Torus.io.unblock(\'' + name + '\');">Unblock PMs</a>';}
	else {html += '<a class="torus-popup-action" onclick="Torus.io.block(\'' + name +  '\');">Block PMs</a>';}
	if((user.givemod || user.staff) && !target.mod && !target.staff) {html += '<a class="torus-popup-action" onclick="this.children[0].style.display = \'block\';"><div id="torus-popup-modconfirm"><input id="torus-popup-modconfirm-yes" type="button" value="Yes" onclick="Torus.io.giveMod(' + room + ', \'' + name + '\');"> Are you sure? <input id="torus-popup-modconfirm-no" type="button" value="No" onclick="this.parentNode.style.display = \'\'"></div>Promote to mod</a>';}
	else {html += '<a class="torus-popup-action torus-popup-action-disabled">Promote to mod</a>';}
	if(user.staff || user.givemod || (user.mod && !target.givemod && !target.staff)) {html += '<a class="torus-popup-action" onclick="Torus.io.kick(' + room + ', \'' + name + '\');">Kick</a><a class="torus-popup-action"><div id="torus-popup-banmodal"><div><label>Expiry:</label> <input type="text" id="torus-popup-banexpiry" placeholder="1 day" onkeyup="if(event.keyCode == 13) {if(this.value) {Torus.io.ban(' + room + ', \'' + name + '\', Torus.util.expiryToSeconds(this.value), this.parentNode.nextSibling.lastChild.value);} else {Torus.io.ban(' + room + ', \'' + name + '\', 60 * 60 * 24, this.parentNode.nextSibling.lastChild.value);}}"></input></div><div>Reason: <input type="text" id="torus-popup-banreason" placeholder="Misbehaving in chat" onkeyup="if(event.keyCode == 13) {var expiry = this.parentNode.previousSibling.lastChild.value; if(expiry) {Torus.io.ban(' + room + ', \'' + name + '\', Torus.util.expiryToSeconds(expiry), this.value);} else {Torus.io.ban(' + room + ', \'' + name + '\', 60 * 60 * 24, this.value);}}"></div><div><input type="submit" id="torus-popup-banbutton" value="Ban" onclick="Torus.io.ban(' + room + ', \'' + name + '\', Torus.util.expiryToSeconds(this.parentNode.previousSibling.previousSibling.lastChild.value), this.parentNode.previousSibling.lastChild.value);"></div></div>Ban</a>';}
	else {html += '<a class="torus-popup-action torus-popup-action-disabled">Kick</a><a class="torus-popup-action torus-popup-action-disabled">Ban</a>';}
	html += '</div>';
	Torus.ui.window.popup.innerHTML = html;
	
	Torus.ui.window.popup.style.display = 'block';
	if(coords) {
		Torus.ui.window.popup.style.right = 'auto';
		Torus.ui.window.popup.style.left = coords.x + 'px';
		Torus.ui.window.popup.style.top = coords.y + 'px';
	}
	else {
		var userlist = Torus.ui.window.sidebar.children;
		for(var i = 0; i < userlist.length; i++) {
			if(userlist[i].lastChild.innerHTML == name) {
				Torus.ui.window.popup.style.top = userlist[i].offsetTop - Torus.ui.window.sidebar.scrollTop + 'px';
				break;
			}
		}
	}
	Torus.ui.callListeners('renderPopup');
}

Torus.ui.unrenderPopup = function() {
	Torus.ui.window.popup.style.top = '';
	Torus.ui.window.popup.style.right = '';
	Torus.ui.window.popup.style.left = '';
	Torus.ui.window.popup.innerHTML = '';
	Torus.ui.window.popup.style.display = 'none';
	Torus.ui.callListeners('unrenderPopup');
}

Torus.ui.ping = function(room) {
	if(isNaN(room * 1)) {room = Torus.data.domains[room];}
	
	if(Torus.options.pings.general.enabled && Torus.ui.window.window.parentNode && Torus.data.pinginterval == 0) {
		Torus.data.titleflash = document.title;
		document.title = Torus.options.pings.general.alert.value;
		Torus.data.pinginterval = setInterval('if(document.title != Torus.options.pings.general.alert.value) {document.title = Torus.options.pings.general.alert.value;} else {document.title = Torus.data.titleflash;}', Torus.options.pings.general.interval.value);
		if(Torus.options.pings.general.beep.value) {
			var beep = document.createElement('audio');
			beep.src = Torus.options.pings.general.sound.value;
			beep.play();
		}
	}
	if(Torus.chats[room]) {Torus.chats[room].callListeners('ping');}
	Torus.ui.callListeners('ping');
}

Torus.ui.fullscreen = function() {
	if(Torus.data.fullscreen) {return;}
	if(Torus.ui.window.parentNode) {Torus.ui.window.parentNode.removeChild(Torus.ui.window);}
	document.body.innerHTML = ''; //bad. bad bad bad
	document.body.appendChild(Torus.ui.window);
	Torus.ui.window.style.height = document.getElementsByTagName('html')[0].clientHeight - 25 + 'px';
	//todo: change height with resize
	Torus.data.fullscreen = true;
	Torus.ui.callListeners('fullscreen');
}

Torus.ui.inputListener = function(event) {
	if(event.keyCode == 13 && !event.shiftKey) {
		event.preventDefault();
		if(Torus.data.history[1] != this.value) {
			Torus.data.history[0] = this.value;
			Torus.data.history.unshift('');
		}
		Torus.data.histindex = 0;
		
		while(this.value.charAt(0) == '/') {
			if(this.value.indexOf('\n') != -1) {
				var result = Torus.commands.eval(this.value.substring(1, this.value.indexOf('\n')));
				if(result != undefined) {Torus.alert(result);}
				this.value = this.value.substring(this.value.indexOf('\n') + 1);
			}
			else {
				var result = Torus.commands.eval(this.value.substring(1));
				if(result != undefined) {Torus.alert(result);}
				this.value = '';
			}
		}
		if(this.value) {
			if(this.value.indexOf('./') == 0) {Torus.io.sendMessage(Torus.ui.active, this.value.substring(1), false);}
			else {Torus.io.sendMessage(Torus.ui.active, this.value, false);}
			this.value = '';
		}
	}
	else if(event.keyCode == 9) {
		event.preventDefault();
		if(!Torus.data.tabtext) {
			str = this.value;
			while(str[str - 1] == ' ') {str = str.substring(0, str.length - 1);}
			Torus.data.tabpos = str.lastIndexOf(' ') + 1;
			Torus.data.tabtext = str.substring(Torus.data.tabpos);
		}
		var matches = 0;
		for(var user in Torus.chats[Torus.ui.active].userlist) {
			if(user == 'length') {continue;}
			if(user.indexOf(Torus.data.tabtext) == 0) {matches++;}
			if(matches > Torus.data.tabindex) {break;}
		}
		if(matches <= Torus.data.tabindex) {
			user = Torus.data.tabtext;
			Torus.data.tabindex = 0;
		}
		else {Torus.data.tabindex++;}
		if(Torus.data.tabpos == 0) {this.value = user + (Torus.data.tabindex == 0 ? '' : ': ');}
		else {this.value = this.value.substring(0, Torus.data.tabpos) + user;}
	}
	else if(event.keyCode == 38 && Torus.data.histindex + 1 < Torus.data.history.length) {
		Torus.data.histindex++;
		this.value = Torus.data.history[Torus.data.histindex];
	}
	else if(event.keyCode == 40 && Torus.data.histindex > 0) {
		Torus.data.histindex--;
		this.value = Torus.data.history[Torus.data.histindex];
	}
	else if(event.keyCode != 39 && event.keyCode != 41) {
		Torus.data.tabtext = '';
		Torus.data.tabindex = 0;
		Torus.data.tabpos = 0;
	}
}

Torus.io.sendMessage = function(room, message, hist) {
	if(isNaN(room * 1)) {room = Torus.data.domains[room];}
	if(!Torus.chats[room] || room < 0) {throw new Error('Invalid room ' + room + '. (io.sendMessage)');}
	
	message += '';
	if(room == 0) {Torus.alert(message);}
	else {
		if((hist || hist == undefined) && Torus.data.history[1] != message) {
			Torus.data.history[0] = message;
			Torus.data.history.unshift('');
		}
		Torus.data.histindex = 0;
		
		if(Torus.chats[room].parent) {Torus.io.sendCommand(Torus.chats[room].parent, 'openprivate', {roomId: room, users: Torus.chats[room].users});}
		
		message = {attrs: {msgType: 'chat', 'text': message}};
		Torus.chats[room].socket.send(JSON.stringify(message));
	}
}

Torus.io.sendCommand = function(room, command, args) {
	if(isNaN(room * 1)) {room = Torus.data.domains[room];}
	if(!Torus.chats[room] || room < 0) {throw new Error('Invalid room ' + room + '. (io.sendCommand)');}
	
	var command = {attrs: {msgType: 'command', command: command}};
	for(var i in args) {command.attrs[i] = args[i];}
	Torus.chats[room].socket.send(JSON.stringify(command));
}

Torus.io.setStatus = function(room, state, message) {
	if(isNaN(room * 1)) {room = Torus.data.domains[room];}
	if(!Torus.chats[room] || room <= 0) {throw new Error('Invalid room ' + room + '. (io.setStatus)');}
	
	var user = Torus.chats[room].userlist[wgUserName];
	if(!state) {state = user.statusState;}
	if(!message) {message = user.statusMessage;}
	user.oldState = user.statusState;
	user.oldMessage = user.statusMessage;
	Torus.io.sendCommand(room, 'setstatus', {statusState: state, statusMessage: message});
}

Torus.io.giveMod = function(room, user) {
	if(isNaN(room * 1)) {room = Torus.data.domains[room];}
	if(!Torus.chats[room] || room <= 0) {throw new Error('Invalid room ' + room + '. (io.giveMod)');}

	Torus.io.sendCommand(room, 'givechatmod', {userToPromote: user});
}

Torus.io.kick = function(room, user) {
	if(isNaN(room * 1)) {room = Torus.data.domains[room];}
	if(!Torus.chats[room] || room <= 0) {throw new Error('Invalid room ' + room + '. (io.kick)');}
	
	Torus.io.sendCommand(room, 'kick', {userToKick: user});
}

Torus.io.ban = function(room, user, expiry, reason) {
	if(isNaN(room * 1)) {room = Torus.data.domains[room];}
	if(!Torus.chats[room] || room <= 0) {throw new Error('Invalid room ' + room + '. (io.ban)');}
	
	if(!expiry) {expiry = 0;} //this is also an unban
	else if(typeof expiry == 'string') {expiry = Torus.util.expiryToSeconds(expiry);}
	if(!reason) {
		if(expiry) {reason = 'Misbehaving in chat';} //is a ban
		else {reason = 'undo';} //is an unban
	}
	Torus.io.sendCommand(room, 'ban', {userToBan: user, reason: reason, time: expiry});
}

Torus.io.openPrivate = function(room, users, callback, id) {
	if(isNaN(room * 1)) {room = Torus.data.domains[room];}
	if(!Torus.chats[room] || room <= 0) {throw new Error('Invalid room ' + room + '. (io.openPrivate)');}	
	
	var username = false;
	for(var i in users) {
		if(users[i] == wgUserName) {username = true; break;}
	}
	if(!username) {users.push(wgUserName);}
	
	if(!id) {
		Torus.io.getPrivateId(users, function(id) {
			return Torus.io.openPrivate(room, users, callback, id);
		});
	}
	else {
		if(!Torus.chats[id]) {
			Torus.open(id);
			Torus.chats[id].parent = room;
			Torus.chats[id].users = users;
			if(typeof callback == 'function') {Torus.chats[id].addListener('open', callback);}
		}
		else {
			Torus.ui.activate(id);
			if(typeof callback == 'function') {callback.call(Torus.chats[id]);}
		}
	}
}

Torus.io.ajax = function(method, post, callback) {
	var str = '';
	for(var i in post) {
		str += '&' + i + '=' + encodeURIComponent(post[i]);
	}
	str = str.substring(1);
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/index.php?action=ajax&rs=ChatAjax&method=' + method + '&client=Torus&version=' + Torus.version, true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.onreadystatechange = function() {
		if(this.readyState == 4) {
			if(this.status == 200) {
				if(typeof callback == 'function') {callback.call(Torus, this.responseText);}
			}
			else {throw new Error('Request returned response ' + this.status + '. (io.ajax)');}
		}
	}
	xhr.send(str);
}

Torus.io.getPrivateId = function(users, callback) {
	Torus.io.ajax('getPrivateRoomId', {users: JSON.stringify(users)}, function(data) {
		if(typeof callback == 'function') {callback.call(Torus, JSON.parse(data).id);}
	});
}

Torus.io.getBlockedPrivate = function(callback) {
	Torus.io.ajax('getListOfBlockedPrivate', {}, function(data) {
		data = JSON.parse(data);
		Torus.data.blockedBy = data.blockedByChatUsers;
		Torus.data.blocked = data.blockedChatUsers;
		if(typeof callback == 'function') {callback.call(Torus, data);}
	});
}

Torus.io.block = function(user, callback) {
	Torus.io.ajax('blockOrBanChat', {userToBan: user, dir: 'add'}, function(data) {
		Torus.data.blocked.push(user);
		if(typeof callback == 'function') {callback.call(Torus, JSON.parse(data));}
	});
}

Torus.io.unblock = function(user, callback) {
	Torus.io.ajax('blockOrBanChat', {userToBan: user, dir: 'remove'}, function(data) {
		for(var i = 0; i < Torus.data.blocked.length; i++) {
			if(Torus.data.blocked[i] == user) {Torus.data.blocked.splice(i, 1); break;}
		}
		if(typeof callback == 'function') {callback.call(Torus, JSON.parse(data));}
	});
}

Torus.io.spider = function(callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/wikia.php?controller=Chat&format=json&client=Torus&version=' + Torus.version, true);
	xhr.onreadystatechange = function() {
		if(this.readyState == 4) {
			if(this.status == 200) {
				if(typeof callback == 'function') {callback.call(Torus, JSON.parse(this.responseText));}
			}
			else if(this.status == 404) { //wiki doesn't have chat
				if(typeof callback == 'function') {callback.call(Torus, null);}
			}
			else {throw new Error('Request returned response ' + this.status + '. (io.spider)');}
		}
	};
	xhr.send();
}

Torus.io.session = function(room, key, server, port, callback) {
	if(isNaN(room * 1)) {room = Torus.data.domains[room];}
	if(!Torus.chats[room] || room <= 0) {throw new Error('Invalid room ' + room + '. (io.session)');}
	
	if(key === false) {throw new Error('\'key\' is false. (io.session)');}
	else if(!key || typeof key == 'function') { //key is callback
		Torus.io.spider(function(data) {
			if(!data) {throw new Error('Can\'t spider: wiki does not have chat. (io.session)');}

			if(data.chatkey.key === false) {var realkey = false;}
			else {var realkey = data.chatkey;}
			Torus.io.session(room, realkey, data.nodeHostname, data.nodePort, key);
		});
	}
	else {
		var index = io.j.length;
		var script = document.createElement('script');
		script.src = 'http://' + server + ':' + port + '/socket.io/1/?name=' + encodeURIComponent(wgUserName) + '&key=' + key + '&roomId=' + room + '&jsonp=' + index + '&client=Torus&version=' + Torus.version;
		script.onload = function() {document.head.removeChild(this);}
		document.head.appendChild(script);
		Torus.io.polling++;
		io.j.push(function(data) {
			Torus.io.polling--;
			if(Torus.io.polling == 0) {io.j = [];}
			if(typeof data == 'string') {data = data.substring(0, data.indexOf(':'));} //otherwise it's an Error
			if(typeof callback == 'function') {callback.call(Torus, data);}
		});
	}
}

Torus.io.receive = function(room, message) {
	if(isNaN(room * 1)) {room = Torus.data.domains[room];}
	if(!Torus.chats[room] || room <= 0) {throw new Error('Invalid room ' + room + '. (io.receive)');}
	
	data = JSON.parse(message.data);

	var event = {
		event: message.event,
		type: 'io',
		id: (new Date()).getTime(),
		room: room,
		time: (new Date()).getTime()
	};
	switch(message.event) {
		case 'initial':
			event.users = [];
			for(var i = 0; i < data.collections.users.models.length; i++) {
				var attrs = data.collections.users.models[i].attrs;
				var props = {
					avatar: attrs.avatarSrc.replace('28px', '100px'), //enlarge the avatar
					mod: attrs.isModerator,
					staff: attrs.isStaff,
					givemod: attrs.isCanGiveChatMod,
					statusState: attrs.statusState,
					statusMessage: attrs.statusMessage,
					edits: attrs.editCount
				};
				Torus.ui.updateUser(room, attrs.name, props);
				event.users.push({
					event: 'updateUser',
					type: 'io',
					id: (new Date()).getTime(),
					room: room,
					time: (new Date()).getTime(),
					user: attrs.name,
					props: props
				});
			}
			event.messages = [];
			for(var i = 0; i < data.collections.chats.models.length; i++) {
				var attrs = data.collections.chats.models[i].attrs;
				var e = {
					type: 'io',
					id: attrs.timeStamp,
					room: room,
					time: attrs.timeStamp,
					user: attrs.name
				};
				if(attrs.text.indexOf('* ' + attrs.name) == 0) {
					e.event = 'me';
					e.rawtext = e.text = attrs.text.substring(attrs.name.length + 3);
				}
				else if(attrs.text.indexOf('/me') == 0) {
					event.event = 'me';
					event.rawtext = event.text = data.attrs.text.substring(4);
				}
				else {
					e.event = 'message';
					e.rawtext = e.text = attrs.text;
				}
				while(e.text.indexOf('<') != -1) {e.text = e.text.replace('<', '&lt;');}
				while(e.text.indexOf('>') != -1) {e.text = e.text.replace('>', '&gt;');}
				e.text = Torus.util.parseLinks(e.text, (Torus.chats[room].parent ? Torus.chats[room].parent : room));
				event.messages.push(e);
				var log = Torus.logs.messages[room];
				if(log.length == 0) {log.push(e);}
				else {
					var added = false;
					for(var j = log.length - 1; j >= 0; j--) {
						if(e.id > log[j].id) {
							log.splice(j + 1, 0, e);
							added = true;
							break;
						}
						else if(e.id == log[j].id) {
							log[j] = e;
							added = true;
							break;
						}
					}
					if(!added) {log.unshift(e);}
				}
			}
			Torus.ui.render();
			
			if(Torus.chats[room].parent) {
				event.parent = Torus.chats[room].parent;
				Torus.ui.ping(Torus.chats[room].parent);
			}
			//Torus.chats[room].awayTimeout = setTimeout('Torus.io.setStatus(' + Torus.ui.active + ', \'away\', \'\'); Torus.chats[' + Torus.ui.active + '].autoAway = true;', 5 * 60 * 1000);
			break;
		case 'chat:add':
			if(!data.attrs.isInlineAlert) {
				if(data.attrs.text.indexOf('* ' + data.attrs.name) == 0) {
					event.event = 'me';
					event.rawtext = event.text = data.attrs.text.substring(data.attrs.name.length + 3);
				}
				else if(data.attrs.text.indexOf('/me') == 0) {
					event.event = 'me';
					event.rawtext = event.text = data.attrs.text.substring(4);
				}
				else {
					event.event = 'message';
					event.rawtext = event.text = data.attrs.text;
				}
				event.user = data.attrs.name;
				event.id = data.attrs.timeStamp;
				event.time = data.attrs.timeStamp;
				
				while(event.text.indexOf('<') != -1) {event.text = event.text.replace('<', '&lt;');}
				while(event.text.indexOf('>') != -1) {event.text = event.text.replace('>', '&gt;');}
				event.text = Torus.util.parseLinks(event.text, (Torus.chats[room].parent ? Torus.chats[room].parent : room));
				while(event.text.indexOf('\n') != -1) {event.text = event.text.replace('\n', '<br />');}
				if(data.attrs.name != wgUserName) {
					var pings = (Torus.options.pings.global.case_sensitive.value + '\n' + Torus.options.pings[(Torus.data.ids[room] ? Torus.data.ids[room] : room)].case_sensitive.value).split('\n');
					for(var i = 0; i < pings.length; i++) {
						var ping = pings[i];
						if(!ping) {continue;}
						while(ping.indexOf('<') != -1) {ping = ping.replace('<', '&lt;');} //this is a horrible solution
						while(ping.indexOf('>') != -1) {ping = ping.replace('>', '&gt;');}
						var index = Torus.util.textIndex(event.text, pings[i]);
						if(index != -1) {
							Torus.ui.ping(room);
							event.text = event.text.substring(0, index) + '<span class="torus-message-ping">' + event.text.substring(index, index + ping.length) + '</span>' + event.text.substring(index + ping.length);
							break;
						}
					}
					pings = (Torus.options.pings.global.case_insensitive.value + '\n' + Torus.options.pings[(Torus.data.ids[room] ? Torus.data.ids[room] : room)].case_insensitive.value).toLowerCase().split('\n');
					for(var i = 0; i < pings.length; i++) {
						var ping = pings[i];
						if(!ping) {continue;}
						while(ping.indexOf('<') != -1) {ping = ping.replace('<', '&lt;');} //this is a horrible solution
						while(ping.indexOf('>') != -1) {ping = ping.replace('>', '&gt;');}
						var index = Torus.util.textIndex(event.text.toLowerCase(), pings[i]);
						if(index != -1) {
							Torus.ui.ping(room);
							event.text = event.text.substring(0, index) + '<span class="torus-message-ping">' + event.text.substring(index, index + ping.length) + '</span>' + event.text.substring(index + ping.length);
							break;
						}
					}
				}
			}
			else if(data.attrs.wfMsg) {
				switch(data.attrs.wfMsg) {
					case 'chat-inlinealert-a-made-b-chatmod':
						event.event = 'mod';
						event.performer = data.attrs.msgParams[0];
						event.target = data.attrs.msgParams[1];
						break;
					case 'chat-err-connected-from-another-browser':
						//todo: make this its own event
						event.event = 'alert';
						event.rawtext = event.text = 'You are connected to ' + (Torus.data.ids[room] ? Torus.data.ids[room] : room) + ' from another window.';
						break;
					default:
						console.log(event);
						break;
				}
			}
			else {
				event.event = 'alert';
				event.rawtext = data.attrs.text;
				event.text = Torus.util.parseLinks(data.attrs.text, (Torus.chats[room].parent ? Torus.chats[room].parent : room));
			}
			Torus.ui.addLine(event);
			
			if(Torus.chats[room].parent && data.attrs.name != wgUserName) {Torus.ui.ping(room);}
			break;
		case 'join':
			if(Torus.chats[room].userlist[data.attrs.name]) {event.event = 'rejoin';}
		case 'updateUser':
			event.user = data.attrs.name;
			event.data = {
				avatar: data.attrs.avatarSrc.replace('28px', '100px'),
				mod: data.attrs.isModerator,
				staff: data.attrs.isStaff,
				givemod: data.attrs.isCanGiveChatMod,
				statusState: data.attrs.statusState,
				statusMessage: data.attrs.statusMessage,
				edits: data.attrs.editCount
			};
			Torus.ui.updateUser(room, data.attrs.name, event.data);
			if(event.event == 'join') {Torus.ui.addLine(event);}
			break;
		case 'part':
		case 'logout':
			event.user = data.attrs.name;
			if(Torus.chats[room].userlist[event.user]) {Torus.ui.removeUser(room, event.user);}
			else {event.event = 'ghost';} //ghost part (or logout)
			Torus.ui.addLine(event);
			break;
		case 'ban':
			if(data.attrs.time == 0) {event.event = 'unban';}
			else {
				event.seconds = data.attrs.time;
				event.expiry = Torus.util.secondsToExpiry(data.attrs.time);
			}
		case 'kick':
			event.target = data.attrs.kickedUserName;
			event.performer = data.attrs.moderatorName;
			Torus.ui.addLine(event);
			break;
		case 'openPrivateRoom':
			if(!Torus.chats[data.attrs.roomId]) {
				Torus.open(data.attrs.roomId);
				Torus.chats[data.attrs.roomId].parent = room;
				Torus.chats[data.attrs.roomId].users = data.attrs.users;
			}
			event.private = data.attrs.roomId;
			event.users = data.attrs.users;
			break;
		case 'forceReconnect':
			Torus.reopen(room);
			break;
		case 'disableReconnect': //this would be more accurately described as force disconnect
			Torus.chats[room].callListeners('disableReconnect', event);
			Torus.io.callListeners('disableReconnect', event);
			Torus.close(room, 'Server closed the connection');
			return;
		default: console.log(event); break;
	}
	
	Torus.chats[room].callListeners(event.event, event);
	Torus.io.callListeners(event.event, event);
}

Torus.io.transports.websocket = function(room, key, server, port, session) {
	if(!room || room <= 0 || !key || !server || !port || !session) {throw new Error('Invalid transport parameters. (io.transports.websocket)');}
	
	var ws = new WebSocket('ws://' + server + ':' + port + '/socket.io/1/websocket/' + session + '/?name=' + encodeURIComponent(wgUserName) + '&key=' + key + '&roomId=' + room + '&client=Torus&version=' + Torus.version);
	ws.onmessage = function(event) {
		if(event.data.substring(0, 3) != '2::') {Torus.logs.socket[room].push({id: (new Date()).getTime(), message: event.data});}
		switch(event.data.substring(0, 3)) {
			case '0::': //disconnect
				Torus.close(room, 'Server closed the connection');
				break;
			case '1::': //connect
				if(!Torus.chats[room]) {throw new Error('Missing room on successful connect');}
				Torus.chats[room].connecting = false;
				Torus.chats[room].connected = true;
				Torus.io.sendCommand(room, 'initquery');
				Torus.alert('Connected.', room);
				Torus.io.getBlockedPrivate();
				Torus.chats[room].callListeners('open');
				Torus.callListeners('open', room);
				break;
			case '2::': //heartbeat
				this.send('2::');
				break;
			case '4::': //json
				Torus.io.receive(room, JSON.parse(event.data.substring(4)));
				break;
			case '7::': //error
				if(event.data.substring(4) == '1+0') {Torus.reopen(room);}
				else {Torus.close(room, 'Protocol error: ' + event.data.substring(4));}
				break;
			case '3::': //message
			case '5::': //event
			case '6::': //ack
			case '8::': //noop
				Torus.close(room, 'Protocol error: Received unimplemented data type ' + event.data);
				break;
		}
	}
	ws.onerror = ws.onclose = function(event) {
		if(!Torus.chats[room].connected) {
			Torus.alert('Websocket rejected, failing over to HTTP...', room);
			Torus.chats[room].transport = 'xhr-polling';
			Torus.chats[room].connecting = false;
			Torus.open(room);
		}
		else if(event.reason) {Torus.close(room, event.reason);}
		else {Torus.close(room, 'Socket error (websocket)');}
	}
	ws.silence = function() {this.onclose = null;}
	ws.send = function(message) {WebSocket.prototype.send.call(this, '3:::' + message);}
	return ws;
}

Torus.io.transports['xhr-polling'] = function(room, key, server, port, session) {
	if(!room || room <= 0 || !key || !server || !port || !session) {throw new Error('Invalid transport parameters. (io.transports.xhr-polling)');}
	
	var sock = {
		xhr: null,
		send: function(message) {
			var xhr = new XMLHttpRequest();
			xhr.open('POST', 'http://' + server + ':' + port + '/socket.io/1/xhr-polling/' + session + '/?name=' + encodeURIComponent(wgUserName) + '&key=' + key + '&roomId=' + room + '&client=Torus&version=' + Torus.version, true);
			xhr.setRequestHeader('Content-Type', 'text/plain');
			xhr.send('5:::' + JSON.stringify({name: 'message', args: [message]}));
		},
		poll: function() {
			this.xhr = new XMLHttpRequest();
			this.xhr.open('GET', 'http://' + server + ':' + port + '/socket.io/1/xhr-polling/' + session + '/?name=' + encodeURIComponent(wgUserName) + '&key=' + key + '&roomId=' + room + '&client=Torus&version=' + Torus.version, true);
			this.xhr.socket = this;
			this.xhr.onreadystatechange = function() {
				if(this.readyState == 4) {
					this.onreadystatechange = null;
					if(this.socket.xhr != this) {console.log(this.socket);}
				if(this.status == 200) {
					if(this.responseText[0] != '\ufffd') {var response = '\ufffd' + this.responseText.length + '\ufffd' + this.responseText;}
					else {var response = this.responseText;}
					while(response[0] == '\ufffd') {
						var ufffd = response.indexOf('\ufffd', 1);
						var len = response.substring(1, ufffd) * 1;
						var text = response.substring(ufffd + 1, len + ufffd + 1);
						response = response.substring(len + ufffd + 1);

						if(text.substring(0, 3) != '8::') {Torus.logs.socket[room].push({id: (new Date()).getTime(), message: text});}
						switch(text.substring(0, 3)) {
							case '0::': //disconnect
								Torus.close(room, 'Server closed the connection');
								return;
							case '1::': //connect
								if(!Torus.chats[room]) {throw new Error('Missing room on successful connect');}
								Torus.chats[room].connecting = false;
								Torus.chats[room].connected = true;
								Torus.io.sendCommand(room, 'initquery');
								Torus.alert('Connected.', room);
								Torus.io.getBlockedPrivate();
								Torus.chats[room].callListeners('open');
								Torus.callListeners('open', room);
								break;
							case '4::': //json
								Torus.io.receive(room, JSON.parse(text.substring(4)));
								break;
							case '7::': //error
								Torus.close(room, 'Protocol error: ' + text.substring(4));
								return;
							case '8::': //noop
								break;
							case '2::': //heartbeat
							case '3::': //message
							case '5::': //event
							case '6::': //ack
								Torus.close(room, 'Protocol error: Received unimplemented data type ' + text);
								break;
						}
					}
					this.socket.poll();
				} //status == 200
				else if(this.status == 404) {this.socket.poll();}
				else if(this.status != 0) {Torus.close(room, 'Socket error (xhr-polling): HTTP status ' + this.status);}
				else if(Torus.chats[room] && this.onabort) {Torus.reopen(room);} //not aborted, just died
				} //readyState == 4
			}
			this.xhr.onabort = function(event) {
				console.log(event);
				Torus.close(room, 'aborted');
			}
			this.xhr.send();
		},
		close: function() {this.xhr.abort();},
		silence: function() {this.xhr.onabort = null;}
	};
	sock.poll();
	return sock;
}

Torus.options = {
	selected: 'pings',
	pings: {
		general: {
			enabled: true,
			alert: {
				type: 'string',
				value: 'Activity!'
			},
			interval: {
				type: 'number',
				value: 500
			},
			beep: {
				type: 'boolean',
				value: true
			},
			sound: {
				type: 'string',
				value: 'https://images.wikia.nocookie.net/monchbox/images/0/01/Beep-sound.ogg'
			}
		},
		global: {
			case_sensitive: {
				type: 'text',
				value: ''
			},
			case_insensitive: {
				type: 'text',
				value: wgUserName
			}
		}
	},
	messages: {
		general: {
			max: {
				type: 'number',
				value: 200
			},
			rejoins: {
				type: 'boolean',
				value: false
			},
			timezone: {
				type: 'number',
				value: 0
			}
		}
	},
	misc: {
		connection: {
			default_rooms: {
				type: 'text',
				value: ''
			},
			local: {
				type: 'boolean',
				value: true
			}
		},
		user_colors: {
			enabled: true,
			hue: {
				type: 'number',
				value: 0
			},
			sat: {
				type: 'number',
				value: .7
			},
			val: {
				type: 'number',
				value: .6
			}
		}
	}
};

Torus.options.render = function(group) {
	var sidebar = '';
	var html = '';
	for(var i in Torus.options) {
		if(typeof Torus.options[i] != 'object') {continue;}
		
		sidebar += '<li class="torus-option-group' + (i == group ? ' torus-option-group-selected' : '') + '" onclick="Torus.options.render(\'' + i.toLowerCase() + '\');">' + i.charAt(0).toUpperCase() + i.substring(1) + '</li>';
		if(i != group) {continue;}
		for(var j in Torus.options[i]) {
			if(typeof Torus.options[i][j] != 'object') {console.log(i, j, Torus.options[i][j]); continue;}
			
			html += '<fieldset id="torus-option-set-' + i.toLowerCase() + '-' + j.toLowerCase() + '"><legend>';
			if(typeof Torus.options[i][j].enabled == 'boolean') {html += '<label for="torus-option-value-' + i.toLowerCase() + '-' + j.toLowerCase() + '-enabled">' + j.charAt(0).toUpperCase() + j.substring(1) + '</label> <input id="torus-option-value-' + i.toLowerCase() + '-' + j.toLowerCase() + '-enabled" type="checkbox" checked="' + Torus.options[i][j].enabled + '" onchange="Torus.options[\'' + i + '\'][\'' + j + '\'].enabled = this.checked;">'}
			else {html += j.charAt(0).toUpperCase() + j.substring(1);}
			html += '</legend>';
			for(var k in Torus.options[i][j]) {
				if(typeof Torus.options[i][j][k] != 'object' || Torus.options[i][j][k].value == undefined || !Torus.options[i][j][k].type) {console.log(i, j, k, Torus.options[i][j][k]); continue;}
				
				if(Torus.options[i][j][k].name) {var name = Torus.options[i][j][k].name;}
				else {var name = k.charAt(0).toUpperCase() + k.substring(1);}
				while(name.indexOf('_') != -1) {name = name.replace('_', ' ');}
				html += '<div id="torus-option-value-' + i.toLowerCase() + '-' + j.toLowerCase() + '-' + k.toLowerCase() + '">';
				switch(Torus.options[i][j][k].type) {
					case 'text':
						html += '<label for="torus-option-value-' + i.toLowerCase() + '-' + j.toLowerCase() + '-' + k.toLowerCase() + '-input">' + name + '</label>: <textarea id="torus-option-value-' + i.toLowerCase() + '-' + j.toLowerCase() + '-' + k.toLowerCase() + '-input" class="torus-option-text" rows="6" onblur="Torus.options[\'' + i + '\'][\'' + j + '\'][\'' + k + '\'].value = this.value;">' + Torus.options[i][j][k].value + '</textarea>';
						break;
					case 'boolean':
						html += '<label for="torus-option-value-' + i.toLowerCase() + '-' + j.toLowerCase() + '-' + k.toLowerCase() + '-input">' + name + '</label>: <input id="torus-option-value-' + i.toLowerCase() + '-' + j.toLowerCase() + '-' + k.toLowerCase() + '-input" class="torus-option-boolean" type="checkbox" checked="' + Torus.options[i][j][k].value + ' onchange="Torus.options[\'' + i + '\'][\'' + j + '\'][\'' + k + '\'].value = this.checked;">';
						break;
					case 'string':
						html += '<label for="torus-option-value-' + i.toLowerCase() + '-' + j.toLowerCase() + '-' + k.toLowerCase() + '-input">' + name + '</label>: <input id="torus-option-value-' + i.toLowerCase() + '-' + j.toLowerCase() + '-' + k.toLowerCase() + '-input" class="torus-option-string" type="text" value="' + Torus.options[i][j][k].value + '" onblur="Torus.options[\'' + i + '\'][\'' + j + '\'][\'' + k + '\'].value = this.value;">';
						break;
					case 'number':
						html += '<label for="torus-option-value-' + i.toLowerCase() + '-' + j.toLowerCase() + '-' + k.toLowerCase() + '-input">' + name + '</label>: <input id="torus-option-value-' + i.toLowerCase() + '-' + j.toLowerCase() + '-' + k.toLowerCase() + '-input" class="torus-option-number" type="number" value="' + Torus.options[i][j][k].value + '" onblur="if(!isNaN(this.value * 1)) {Torus.options[\'' + i + '\'][\'' + j + '\'][\'' + k + '\'].value = this.value * 1;} else {Torus.options[\'' + i + '\'][\'' + j + '\'][\'' + k + '\'].value = undefined;}">';
						break;
				}
				html += '</div>';
			}
			html += '</fieldset>';
		}
	}
	Torus.ui.window.window.innerHTML = '<ul id="torus-options-groups">' + sidebar + '</ul><div id="torus-options-window">' + html + '</div>';
	if(!group) {Torus.options.save();}
	else {Torus.options.selected = group;}
	//Torus.callListeners('options_render', group);
}

Torus.options.save = function() {
	var save = {};
	for(var i in Torus.options) {
		if(typeof Torus.options[i] == 'object') {
			save[i] = {};
			for(var j in Torus.options[i]) {
				if(typeof Torus.options[i][j] == 'object') {
					for(var k in Torus.options[i][j]) {
						if(Torus.options[i][j][k].value) {
							//if just one has a value, include all of them
							save[i][j] = Torus.options[i][j];
							break;
						}
					}
				}
			}
		}
	}
	save = JSON.stringify({version: Torus.version, options: save});
	window.localStorage.setItem('torus-options', save);
	return save;
}

Torus.options.load = function() {
	var load = JSON.parse(window.localStorage.getItem('torus-options'));
	if(!load) {return;}
	else if(load.version != Torus.version) {
		window.localStorage.removeItem('torus-options');
		return;
	}
	else {load = load.options;}
	for(var i in load) {
		if(typeof load[i] == 'object') {
			if(!Torus.options[i]) {
				Torus.options[i] = load[i];
				continue;
			}
			for(var j in load[i]) {
				if(typeof load[i][j] == 'object') {
					if(!Torus.options[i][j]) {
						Torus.options[i][j] = load[i][j];
						continue;
					}
					for(var k in load[i][j]) {
						if(typeof load[i][j][k] == 'object' || (k == 'enabled' && typeof Torus.options[i][j][k] == 'boolean')) {
							Torus.options[i][j][k] = load[i][j][k];
						}
					}
				}
			}
		}
	}
}

Torus.commands = {
	join: {
		help: 'Join a room. Accepts either the id of the room, or the domain name (for example, community will take you to the room for [[w:|community.wikia.com]]). Specifying 0 will part all rooms.',
		func: function(room) {
			if(isNaN(room * 1)) {
				if(!Torus.data.domains[room]) {return 'Unable to look up ' + room + ' in database. Try [[w:c:' + room + ':Special:Torus]].';}
				else {room = Torus.data.domains[room];}
			}
			
			if(room <= 0) {
				for(var i in Torus.chats) {
					Torus.close(i);
				}
				return true;
			}
			else {Torus.open(room);}
		}
	},
	part: {
		help: 'Leave a room. If no room is specified, the current room is left.',
		func: function(room) {
			if(!room) {Torus.close(Torus.ui.active, 'closed');}
			else {
				if(isNaN(room * 1) && !Torus.chats[Torus.data.domains[room]]) {return 'Invalid room ' + room + '.';}
				else {Torus.close(room, 'closed');}
			}
		}
	},
	quit: '/logout',
	logout: {
		help: 'Leave every room.',
		func: Torus.logout
	},
	kick: {
		help: 'Kicks a user from the current room.',
		func: function() {
			var user = '';
			for(var i = 0; i < arguments.length; i++) {user += ' ' + arguments[i];}
			user = user.substring(1);
			Torus.io.kick(Torus.ui.active, user);
		}
	},
	ban: {
		help: 'Bans or rebans a user from the current room.',
		func: function(expiry) {
			var user = '';
			for(var i = 1; i < arguments.length; i++) {user += ' ' + arguments[i];}
			user = user.substring(1);
			Torus.io.ban(Torus.ui.active, user, expiry, 'Misbehaving in chat');
		}
	},
	unban: {
		help: 'Unbans a user from the current room.',
		func: function() {
			var user = '';
			for(var i = 0; i < arguments.length; i++) {user += ' ' + arguments[i];}
			user = user.substring(1);
			Torus.io.ban(Torus.ui.active, user, 0, 'undo');
		}
	},
	mod: '/givemod',
	givemod: {
		help: 'Promotes a user to chatmod in the current room.',
		func: function() {
			var user = '';
			for(var i = 0; i < arguments.length; i++) {user += ' ' + arguments[i];}
			user = user.substring(1);
			Torus.io.giveMod(Torus.ui.active, user);
		}
	},
	query: '/private',
	priv: '/private',
	private: {
		help: 'Opens a private room. Users can be specified in a comma-separated list.',
		func: function() {
			var users = '';
			for(var i = 0; i < arguments.length; i++) {users += ' ' + arguments[i];}
			users = users.substring(1).split(', ');
			Torus.io.openPrivate(Torus.ui.active, users);
		}
	},
	away: {
		help: 'Toggles your away status for the current room.',
		func: function() {
			var message = '';
			for(var i = 0; i < arguments.length; i++) {message += ' ' + arguments[i];}
			message = message.substring(1);
			var user = Torus.chats[Torus.ui.active].userlist[wgUserName];
			
			if(user.statusState == 'away') {
				if(user.oldState == 'away') {Torus.io.setStatus(Torus.ui.active, 'here', '');}
				else {Torus.io.setStatus(Torus.ui.active, user.oldState, user.oldMessage);}
			}
			else {Torus.io.setStatus(Torus.ui.active, 'away', message);}
		}
	},
	back: {
		help: 'Sets your status as present for the current room.',
		func: function(message) {
			if(!message) {message = '';}
			Torus.io.setStatus(Torus.ui.active, 'here', message);
		}
	},
	status: {
		help: 'Changes your status state or message for the current room.',
		func: function(state) {
			var message = '';
			for(var i = 1; i < arguments.length; i++) {message += ' ' + arguments[i];}
			Torus.io.setStatus(Torus.ui.active, state, message);
		}
	},
	me: {
		help: 'Emote yourself.',
		func: function() {
			var str = '';
			for(var i = 0; i < arguments.length; i++) {str += ' ' + arguments[i];}
			Torus.io.sendMessage(Torus.ui.active, '* ' + wgUserName + str, false);
		}
	},
	db: '/database',
	database: {
		help: 'Look up domains and room ids in the database.',
		func: function(room) {
			if(!room) { //print everything
				var str = '';
				for(var i in Torus.data.domains) {
					str += '\n[[w:c:' + i + '|' + i + ']]: ' + Torus.data.domains[i];
				}
				return str.substring(1);
			}
			else if(isNaN(room * 1)) {return '[[w:c:' + room + '|' + room + ']]: ' + Torus.data.domains[room];}
			else {return '[[w:c:' + Torus.data.ids[room] + '|' + Torus.data.ids[room] + ']]: ' + room;}
		}
	},
	options: {
		help: 'View options.',
		func: function() {
			Torus.ui.activate(-1);
		}
	},
	fullscreen: {
		help: 'Make Torus fullscreen.',
		func: Torus.ui.fullscreen
	},
	help: {
		help: 'Displays help data.',
		func: function() {
			var str = '';
			for(var i = 0; i < arguments.length; i++) {str += ' ' + arguments[i];}
			str = str.substring(1);
			
			if(str) {
				var help = Torus.commands.eval(str, 'help');
				if(!help) {Torus.alert('No help data for ' + str);}
				else {return 'Help: ' + str + ': ' + help;}
			}
			else {
				var coms = '';
				for(var i in Torus.commands) {
					if(typeof Torus.commands[i] != 'function') {coms += ', ' + i;}
				}
				coms = coms.substring(2);
				return 'Commands:\n' + coms;
			}
		}
	}
};

Torus.commands.eval = function(str, prop) {
	if(typeof str != 'string') {return false;}
	var com = str.split(' ');
	var ref = Torus.commands;
	var i = 0;
	var cont = true;
	while(ref[com[i]]) {
		switch(typeof ref[com[i]]) {
			case 'string':
				if(ref[com[i]].charAt(0) == '/') {var line = ref[com[i]].substring(1) + ' ' + com.slice(i + 1).join(' ');}
				else {var line = com.slice(0, i).join(' ') + ' ' + ref[com[i]] + ' ' + com.slice(i + 1).join(' ');}
				return Torus.commands.eval(line, prop);
			case 'object':
				if(typeof ref[com[i]].func == 'function') {var command = ref[com[i]];} //is a command
				else {
					ref = ref[com[i]];
					i++;
					if(!ref[com[i]] && ref.default && ref.default.func) {var command = ref.default;}
				}
				if(command) {cont = false;}
				break;
			default:
				cont = false;
				break;
		}
		if(cont == false) {break;}
	}
	if(command) {
		if(prop == '*') {return ref;}
		else if(prop) {return command[prop];}
		else {return command.func.apply(ref, com.slice(i + 1));}
	}
}

Torus.util.colorHash = function(str) {
	if(str == undefined) {throw new Error('Not enough parameters. (util.colorHash)');}
	str += ''; //cast to string
	var hue = 0;
	var val = Torus.options.misc.user_colors.val.value;
	var sat = Torus.options.misc.user_colors.sat.value;
	for(var i = 0; i < str.length; i++) {
		hue = 31 * hue + str.charCodeAt(i); //same hash algorithm as webchat, except this is case sensitive
	}
	hue = (hue % 360 + Torus.options.misc.user_colors.hue.value) % 360;
	
	var c = val * sat;
	var m = val - c;
	var C = Math.floor((c + m) * 255).toString(16);
	var X = Math.floor((c * (1 - Math.abs((hue / 60) % 2 - 1)) + m) * 255).toString(16);
	var O = Math.floor(m * 255).toString(16);
	if(C.length == 1) {C = '0' + C;}
	if(X.length == 1) {X = '0' + X;}
	if(O.length == 1) {O = '0' + O;}
	switch(Math.floor(hue / 60)) {
		case 0: return '#' + C + X + O;
		case 1: return '#' + X + C + O;
		case 2: return '#' + O + C + X;
		case 3: return '#' + O + X + C;
		case 4: return '#' + X + O + C;
		case 5: return '#' + C + O + X;
	}
}

Torus.util.parseLinks = function (text, wiki) {
	if(!text) {throw new Error('Not enough parameters. (util.parseLinks)');}
	if(wiki && !isNaN(wiki * 1)) {wiki = Torus.data.ids[wiki];}
 
	var ref = 0;
	while(text.indexOf('http', ref) != -1) {
		if(text.charAt(text.indexOf('http', ref) - 1) != '[' && (text.indexOf('http://', ref) == text.indexOf('http', ref) || text.indexOf('https://', ref) == text.indexOf('http', ref))) {
			var start = text.indexOf('http', ref);
			var space = text.indexOf(' ', start);
			var line = text.indexOf('\n', start);
			if(space != -1 && line != -1) {
				if(space < line) {var end = space;}
				else {var end = line;}
			}
			else if(space != -1) {var end = space;}
			else if(line != -1) {var end = line;}
			else {var end = text.length;}
			var url = text.substring(start, end);
			while(url.charAt(url.length - 1) == '.' || url.charAt(url.length - 1) == ',' || url.charAt(url.length - 1) == '!' || url.charAt(url.length - 1) == '?') {url = url.substring(0, url.length - 1); end--;}
			var link = '<a href="' + url + '" onclick="event.preventDefault(); window.open(this.href, \'torus\');">' + url + '</a>';
			text = text.substring(0, start) + link + text.substring(end);
		}
		ref = text.indexOf('http', ref) + (link ? link.length - 9 : 1);
	}
	ref = 0;
	while(text.indexOf('[[', ref) != -1) {
		if(text.indexOf(']]', text.indexOf('[[', ref)) != -1) {
			var open = text.indexOf('[[', ref);
			var pipe = text.indexOf('|', open);
			var close = text.indexOf(']]', open);
			if(text.indexOf('\n', open) != -1 && text.indexOf('\n', open) < close) {ref = open + 1; continue;}
			if(pipe != -1 && pipe < close) { //is [[page|display]]
				if(pipe == close - 1) { //is [[page|page]], pipe trick
					var title = text.substring(open + 2, pipe);
					var display = title.substring(title.indexOf(':') + 1);
				}
				else {
					var title = text.substring(open + 2, pipe);
					var display = text.substring(pipe + 1, close);
				}
			}
			else { //is [[page]]
				var title = text.substring(open + 2, close);
				var display = title;
			}
			if(!title) {ref = open + 1; continue;} //skip [[]] and [[|<anything>]]
 
			var page = title;
			if(title.indexOf('w:c:') == 0) {
				if(title.indexOf(':', 5) != -1) {var domain = title.substring(4, title.indexOf(':', 5));}
				else {var domain = title.substring(4);}
				if(page == 'w:c:' + domain) {page = '';}
				else if(page == 'w:c:') {ref = open + 1; continue;}
				else {
					page = page.substring(page.indexOf(':', 4) + 1);
					title = title.substring(0, title.indexOf(':', 4)) + ':' + page.charAt(0).toUpperCase() + page.substring(1);
				}
			}
			else if(title.indexOf('w:') == 0) {
				var domain = 'c';
				if(page == 'w:') {page = '';}
				else {
					page = page.substring(page.indexOf(':', 2) + 1);
					title = 'w:' + page.charAt(0).toUpperCase() + page.substring(1);
				}
			}
			else if(title.indexOf('c:') == 0) {
				if(title.indexOf(':', 3) != -1) {var domain = title.substring(2, title.indexOf(':', 3));}
				else {var domain = title.substring(2);}
				if(page == 'c:' + domain) {page = '';}
				else if(page == 'c:') {ref = open + 1; continue;}
				else {
					page = page.substring(page.indexOf(':', 2) + 1);
					title = title.substring(0, title.indexOf(':', 2)) + ':' + page.charAt(0).toUpperCase() + page.substring(1);
				}
			}
			else if(wiki) {
				var domain = wiki;
				title = page.charAt(0).toUpperCase() + page.substring(1);
			}
			else {ref = open + 1; continue;} //no domain was specified and we don't know the local domain
			if(pipe + 1 == close) {var link = '<a href="http://' + domain + '.wikia.com/wiki/' + encodeURIComponent(page.charAt(0).toUpperCase() + page.substring(1)).replace(/%3A/g, ':').replace(/%20/g, '_').replace(/%2F/g, '/') + '" title="' + title + '" onclick="event.preventDefault(); window.open(this.href, \'torus\');">' + display.substring(display.indexOf(':') + 1) + '</a>'} //pipe trick
			else {var link = '<a href="http://' + domain + '.wikia.com/wiki/' + encodeURIComponent(page.charAt(0).toUpperCase() + page.substring(1)).replace(/%3A/g, ':').replace(/%20/g, '_').replace(/%2F/g, '/') + '" title="' + title + '" onclick="event.preventDefault(); window.open(this.href, \'torus\');">' + display + '</a>';}
			text = text.substring(0, open) + link + text.substring(close + 2);
			ref = open + link.length;
		}
		else {break;}
	}
	ref = 0;
	while(text.indexOf('[http', ref) != -1) {
		if(text.indexOf('[http://', ref) == text.indexOf('[http', ref) || text.indexOf('[https://', ref) == text.indexOf('[http', ref)) {
			var start = text.indexOf('[http', ref);
			var space = text.indexOf(' ', start);
			var end = text.indexOf(']', space);
			if(end == -1) {break;}
			if(space + 1 >= text.indexOf(']', start) || (text.indexOf('\n', start) != -1 && text.indexOf('\n', start) < end)) {ref = text.indexOf('[http', ref) + 1; continue;}
			var url = text.substring(start + 1, space);
			var link = '<a href="' + encodeURIComponent(url).replace(/%3A/g, ':').replace(/%20/g, '_').replace(/%2F/g, '/') + '" onclick="event.preventDefault(); window.open(this.href, \'torus\');">' + text.substring(space + 1, end) + '</a>';
			text = text.substring(0, start) + link + text.substring(end + 1);
		}
		ref = start + link.length;
	}
	return text;
}

Torus.util.textIndex = function(text, find) { //indexOf, but ignore stuff like the href="" attribute of links
	var ref = 0;
	var index = 0;
	while((index = text.indexOf(find, ref)) != -1) {
		if(text.lastIndexOf('<a href="', index) <= text.lastIndexOf('">', index)) {return index;}
		else {ref = index + 1;}
	}
	return -1;
}

Torus.util.timestamp = function(time) {
	var date = new Date();
	if(time) {date.setTime(time);}
	date.setUTCHours(date.getUTCHours() + Torus.options.messages.general.timezone.value);
	var hours = date.getUTCHours();
	if(hours < 10) {hours = '0' + hours;}
	var minutes = date.getUTCMinutes();
	if(minutes < 10) {minutes = '0' + minutes;}
	var seconds = date.getUTCSeconds();
	if(seconds < 10) {seconds = '0' + seconds;}
	return hours + ':' + minutes + ':' + seconds;
}

Torus.util.expiryToSeconds = function(expiry) {
	if(!expiry) {throw new Error('Not enough parameters. (util.expiryToSeconds)');}
	if(expiry == 'infinite' || expiry == 'indefinite') {return 60 * 60 * 24 * 365 * 1000;} //the server recognizes 1000 years as infinite
	else if(expiry == 'unban' || expiry == 'undo') {return 0;}
	else {
		var quant = expiry.split(' ')[0];
		var unit = expiry.split(' ')[1];
		if(quant == 'a' || quant == 'an') {quant = 1;}
		else if(isNaN(quant * 1)) {return false;}
		if(unit.charAt(unit.length - 1) == 's') {unit = unit.substring(0, unit.length - 1);}
		switch(unit) {
			case 'second': return quant;
			case 'minute': return quant * 60;
			case 'hour': return quant * 60 * 60;
			case 'day': return quant * 60 * 60 * 24;
			case 'week': return quant * 60 * 60 * 24 * 7;
			case 'month': return quant * 60 * 60 * 24 * 30;
			case 'year': return quant * 60 * 60 * 24 * 365;
		}
	}
}

Torus.util.secondsToExpiry = function(seconds) {
	if(!seconds && seconds !== 0) {throw new Error('Not enough parameters. (util.secondsToExpiry)');}
	if(seconds == 60 * 60 * 24 * 365 * 1000) {return 'infinite';}
	else if(seconds >= 60 * 60 * 24 * 365) { var quant = seconds / (60 * 60 * 24 * 365); //year
		if(quant == 1) {return '1 year';} else {return quant + ' years';}
	}
	else if(seconds >= 60 * 60 * 24 * 30) { var quant = seconds / (60 * 60 * 24 * 30); //month
		if(quant == 1) {return '1 month';} else {return quant + ' months';}
	}
	else if(seconds >= 60 * 60 * 24 * 7) { var quant = seconds / (60 * 60 * 24 * 7); //week
		if(quant == 1) {return '1 week';} else {return quant + ' weeks';}
	}
	else if(seconds >= 60 * 60 * 24) { var quant = seconds / (60 * 60 * 24); //day
		if(quant == 1) {return '1 day';} else {return quant + ' days';}
	}
	else if(seconds >= 60 * 60) { var quant = seconds / (60 * 60); //hour
		if(quant == 1) {return '1 hour';} else {return quant + ' hours';}
	}
	else if(seconds >= 60) { var quant = seconds / 60; //minute
		if(quant == 1) {return '1 minute';} else {return quant + ' minutes';}
	}
	else if(seconds == 1) {return '1 second';} //second
	else if(seconds == 0) {return 'unban';}
	else {return seconds + ' seconds';}
}

Torus.onload = function() {
	var css = document.createElement('link');
	css.id  = 'torus-css';
	css.rel = 'stylesheet';
	css.href = 'http://monchbox.wikia.com/index.php?title=MediaWiki:Torus.css&action=raw&ctype=text/css&t=' + (new Date()).getTime();
	css.type = 'text/css';
	css.media = 'screen';
	document.head.appendChild(css);
	Torus.ui.window.id = 'torus';
	Torus.ui.window.innerHTML = '<div id="torus-tabs"><span id="torus-tab--1" class="torus-tab" onclick="Torus.ui.activate(-1); Torus.options.render(Torus.options.selected);"><img width="18" src="https://images.wikia.nocookie.net/__cb20110812214252/monchbox/images/a/a1/Gear_icon.png" style="vertical-align:top;"> Options</span><span id="torus-tab-0" class="torus-tab" onclick="event.preventDefault(); if(event.shiftKey && Torus.ui.active != 0) {Torus.ui.show(0);} else {Torus.ui.activate(0);}">Status</span></div><ul id="torus-sidebar"></ul><div id="torus-popup" style="display:none;"></div><div id="torus-info"></div><div id="torus-window"></div><div id="torus-input"><textarea id="torus-input-box"></textarea></div>';
	Torus.ui.window.tabs = Torus.ui.window.children[0];
	Torus.ui.window.sidebar = Torus.ui.window.children[1];
	Torus.ui.window.popup = Torus.ui.window.children[2];
	Torus.ui.window.info = Torus.ui.window.children[3];
	Torus.ui.window.window = Torus.ui.window.children[4];
	Torus.ui.window.input = Torus.ui.window.children[5];
	Torus.ui.window.onmouseover = function() {
		if(Torus.data.pinginterval != 0) {
			clearInterval(Torus.data.pinginterval);
			Torus.data.pinginterval = 0;
			document.title = Torus.data.titleflash;
		}
		//if(Torus.ui.active > 0) {
		//	clearTimeout(Torus.chats[Torus.ui.active].awayTimeout);
		//	setTimeout('Torus.io.setStatus(' + Torus.ui.active + ', \'away\', \'\'); Torus.chats[' + Torus.ui.active + '].autoAway = true;', 5 * 60 * 1000);
		//}
	}
	Torus.ui.window.sidebar.onmouseover = Torus.ui.window.popup.onmouseover = function(event) {
		clearTimeout(Torus.ui.popupTimeout);
		Torus.ui.popupTimeout = 0;
	}
	Torus.ui.window.sidebar.onmouseout = Torus.ui.window.popup.onmouseout = function(event) {
		Torus.ui.popupTimeout = setTimeout(Torus.ui.unrenderPopup, 500);
	}
	Torus.ui.window.input.getElementsByTagName('textarea')[0].onkeydown = Torus.ui.inputListener;
	
	Torus.chats[0] = Torus.chats[-1] = true;
	Torus.logs.messages[0] = [];
	Torus.ui.activate(0);
	Torus.ui.show(0);
	
	window.onbeforeunload = function() {Torus.options.save(); Torus.logout();}
	Torus.options.load();

	Torus.data.domains = {
{{MediaWiki:Torus.js/Database-3}}
	};
	for(var i in Torus.data.domains) {
		if(!Torus.data.ids[Torus.data.domains]) {Torus.data.ids[Torus.data.domains[i]] = i;}
	}
	
	var domain = document.location.host.substring(0, document.location.host.indexOf('.wikia.com'));
	if(domain.indexOf('preview.') == 0) {domain = domain.substring(8);}
	if(Torus.data.domains[domain]) {Torus.local = Torus.data.domains[domain];}
	else {
		Torus.io.spider(function(data) {
			if(!data) {
				Torus.alert('This wiki doesn\'t have chat enabled. The local room has been set to Community Central.');
				Torus.local = 2087;
			}
			else {
				if(Torus.data.domains) {
					Torus.data.domains[domain] = data.roomId;
					Torus.data.ids[data.roomId] = domain;
				}
				Torus.local = data.roomId;
			}
			if(data.chatkey.key === false) {Torus.alert('You don\'t appear to be logged in - you must have an account to use chat on Wikia. Please [[Special:UserSignup|register]] or [[Special:UserLogin|log in]].');}
			else if(wgCanonicalNamespace == 'Special' && wgTitle == 'Torus' && Torus.options.misc.connection.local.value) {Torus.open(Torus.local, data.chatkey, data.nodeHostname, data.nodePort);}
		});
	}
	
	if(wgCanonicalNamespace == 'Special' && wgTitle == 'Torus') {
		document.title = 'Torus - It\'s a donut - ' + wgSiteName;
		if(skin == 'oasis') {
			var body = 'WikiaArticle';
			if(document.getElementById('WikiaPageHeader')) {
				document.getElementById('WikiaPageHeader').getElementsByTagName('h1')[0].innerHTML = 'Torus';
				document.getElementById('WikiaPageHeader').getElementsByTagName('h2')[0].innerHTML = 'It\'s a donut';
			}
		}
		else {
			var body = 'bodyContent';
			document.getElementById('firstHeading').innerHTML = 'Torus';
		}
		document.getElementById(body).innerHTML = (document.getElementById('AdminDashboardHeader') ? '<div class="AdminDashboardGeneralHeader AdminDashboardArticleHeader"><h1>Torus</h1></div>' : '');
		document.getElementById(body).appendChild(Torus.ui.window);
		if(Torus.local && Torus.options.misc.connection.local.value) {Torus.open(Torus.local);}
		if(Torus.options.misc.connection.default_rooms.value) {
			var rooms = Torus.options.misc.connection.default_rooms.value.split('\n');
			for(var i = 0; i < rooms.length; i++) {
				if(isNaN(rooms[i] * 1)) {var room = Torus.data.domains[rooms[i]];}
				else {var room = rooms[i];}
				if(!Torus.chats[room]) {Torus.open(rooms[i]);} //could be Torus.local
			}
		}
	}
	Torus.alert('Initialized.');
	Torus.init = true;
}

$(Torus.onload);
{{co}} */