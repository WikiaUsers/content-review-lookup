/********************************************************************************
 * ChatSocket.js, by Monchoman45.
 * 
 * Allows creation of "raw" sockets for Wikia chat.
 * Uses a websocket interface if able, otherwise, will fall back on ajax polling.
 */

function ChatSocket(key) {
	this.listeners = {
		connect: [],
		disconnect: [],
		message: [],
		error: []
	};
	this.mode = false;
	this.connected = false;
	this.connecting = false;
	this.socket = false;
	this.roomId = 0;
	this.key = (key ? key : '');
	this.session = 0;
}

ChatSocket.polling = []; //store active JSON polls

io = {j: []}; //json polling always calls a function in io.j

//Function for adding a listener to a socket event
//Accepts the event type (connect, disconnect, message, error) and the listener function
//Returns false if the type is invalid, otherwise true
ChatSocket.prototype.addListener = function(type, func) {
	if(!this.listeners[type]) {return false;}
	this.listeners[type].push(func);
	return true;
}
//Function for removing a listener from a socket event
//Accepts the event type and the listener function
//Returns false if the type is invalid, otherwise true
ChatSocket.prototype.removeListener = function(type, func) {
	if(!this.listeners[type]) {return false;}
	for(var i = 0; i < this.listeners[type].length; i++) {
		if(this.listeners[type][i] == func) {this.listeners[type].splice(i, 1); return true;}
	}
	return false;
}
//Function for calling listeners for a socket event
//Accepts the event type
//Returns false if the type is invalid, otherwise true
ChatSocket.prototype.callListeners = function(type) {
	if(!this.listeners[type]) {return false;}
	var args = [];
	for(var i = 1; i < arguments.length; i++) {args.push(arguments[i]);}
	for(var i = 0; i < this.listeners[type].length; i++) {
		this.listeners[type][i].apply(this, args);
	}
	return true;
}

//Function for making ChatAjax requests through index.php?action=ajax
//Accepts a parameter string, and a callback function
//&method=getListOfBlockedPrivate will return all users who have blocked you, and all users you have blocked
//&method=getPrivateRoomId will return a valid id that can be used as a private room
ChatSocket.prototype.cajax = function(params, post, callback) {
	if(!params) {params = '';}
	var str = ''
	for(var i in post) {
		str += '&' + i + '=' + encodeURIComponent(post[i]);
	}
	str = str.substring(1);
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/index.php?action=ajax&rs=ChatAjax' + params, true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200 && typeof callback == 'function') {callback.call(this.socket, this.responseText);}
	}
	xhr.socket = this;
	xhr.send(str);
}

//Function for JSON polling
//Accepts url for poll
//http://chatserver.wikia.com:8000/socket.io/1/?name=<wgUserName>&key=<key>&t=<time> returns a key for connecting with the socket
ChatSocket.prototype.json = function(url, callback) {
	var index = io.j.length;
	var cs = this;
	var script = document.createElement('script');
	script.src = url + '&jsonp=' + index;
	script.onload = function() {document.head.removeChild(this);}
	document.head.appendChild(script);
	ChatSocket.polling.push(index);
	io.j.push(function() {
		callback.apply(cs, arguments);
		for(var i = 0; i < ChatSocket.polling.length; i++) {
			if(ChatSocket.polling[i] == index) {ChatSocket.polling.splice(i, 1); break;}
		}
		if(ChatSocket.polling.length == 0) {io.j = [];}
	});
}

//Function for sending any message
//Accepts the message to send
ChatSocket.prototype.send = function(text) {
	this.socket.send(text);
}

//Function for sending a chat message
//Accepts the message to send
ChatSocket.prototype.sendMessage = function(text) {
	var ref = 0;
	while(text.indexOf('\\', ref) != -1) {text = text.substring(0, ref) + text.substring(ref, text.length).replace('\\', '\\\\'); ref = text.indexOf('\\', ref) + 2;}
	ref = 0;
	while(text.indexOf('\n', ref) != -1) {text = text.substring(0, ref) + text.substring(ref, text.length).replace('\n', '\\n'); ref = text.indexOf('\n', ref);}
	ref = 0;
	while(text.indexOf('"', ref) != -1) {text = text.substring(0, ref) + text.substring(ref, text.length).replace('"', '\\"'); ref = text.indexOf('"', ref) + 1;}
	var message = '{"attrs":{"msgType":"chat","text":"' + text + '"}}';
	if(this.mode == 'websocket') {this.socket.send('3:::' + message);}
	else if(this.mode == 'xhr') {
		ref = 0;
		while(message.indexOf('\\', ref) != -1) {message = message.substring(0, ref) + message.substring(ref, message.length).replace('\\', '\\\\'); ref = message.indexOf('\\', ref) + 2;}
		ref = 0;
		while(message.indexOf('"', ref) != -1) {message = message.substring(0, ref) + message.substring(ref, message.length).replace('"', '\\"'); ref = message.indexOf('"', ref) + 1;}
		this.socket.send('5:::{"name":"message","args":["' + message + '"]}');
	}
}

//Function for sending a command
//Accepts the command name, and the object parameters for that command
//setstatus, "statusState":"away","statusMessage":"" will set your status as away
//setstatus, "statusState":"here","statusMessage":"" will set your status as back
//kickban, "userToBan":"<user>" will kickban someone
//givechatmod, "userToPromote":"<user>" will promote someone to chat mod
//openprivate, "roomId":<id>,"users":["<user1>", "<user2>", "<etc>"] will open a private room
ChatSocket.prototype.sendCommand = function(command, params) {
	var ref = 0;
	while(command.indexOf('\\', ref) != -1) {command = command.substring(0, ref) + command.substring(ref, command.length).replace('\\', '\\\\'); ref = command.indexOf('\\', ref) + 2;}
	ref = 0;
	if(params) {
		while(params.indexOf('\\', ref) != -1) {params = params.substring(0, ref) + params.substring(ref, params.length).replace('\\', '\\\\'); ref = params.indexOf('\\', ref) + 2;}
		params = ',' + params;
	}
	else {params = '';}
	var message = '{"attrs":{"msgType":"command","command":"' + command + '"' + params + '}}';
	if(this.mode == 'websocket') {this.socket.send('3:::' + message);}
	else if(this.mode == 'xhr') {
		ref = 0;
		while(message.indexOf('"', ref) != -1) {message = message.substring(0, ref) + message.substring(ref, message.length).replace('"', '\\"'); ref = message.indexOf('"', ref) + 1;}
		this.socket.send('5:::{"name":"message","args":["' + message + '"]}');
	}
}

//Function for connecting to a room
//Accepts the id of the room
ChatSocket.prototype.connect = function (room) {
	if(this.connected || this.connecting) {return;}
	this.connecting = true;
	this.roomId = room;
	if(!this.key) {
		var cs = this;
		var xhr = new XMLHttpRequest();
		xhr.open('GET', '/wiki/Special:Chat?useskin=wikia', true);
		xhr.onreadystatechange = function(data) {
			if(this.readyState == 4 && this.status == 200) {
				if(wgVersion == '1.16.5') {var offset = 11} //1.16
				else {var offset = 12} //1.19
				cs.key = this.responseText.substring(this.responseText.indexOf('wgChatKey') + offset, this.responseText.indexOf('"', this.responseText.indexOf('wgChatKey') + offset));
				cs.connecting = false;
				if(!cs.key) {
					cs.callListeners('error', 'Connection error: Failed to fetch chat key');
					cs.roomId = 0;
					throw new Error('Connection error: Failed to fetch chat key');
				}
				cs.connect(room);
			}
		};
		xhr.send();
	}
	else {
		var cs = this;
		this.json('http://chat2-2.wikia.com:80/socket.io/1/?name=' + encodeURIComponent(encodeURIComponent(wgUserName)) + '&key=' + this.key + '&t=' + (new Date()).getTime() + '&roomId=' + room, function(str) {
			if(typeof str != 'string') { //str is an error (new Error()) message from the server
				cs.connecting = false;
				cs.callListeners('error', 'Connection error: ' + str.message);
				cs.key = '';
				cs.roomId = 0;
				throw str;
				return;
			}
			cs.session = str.substring(0, str.indexOf(':'));
			if(window.WebSocket && cs.mode != 'xhr') {
				cs.mode = 'websocket';
				cs.socket = new WebSocket('ws://chat2-2.wikia.com:80/socket.io/1/websocket/' + cs.session + '?name=' + encodeURIComponent(encodeURIComponent(wgUserName)) + '&key=' + cs.key + '&roomId=' + room);
				cs.socket.wrapper = cs;
				cs.socket.onmessage = function(event) {
					switch(event.data.substring(0, 3)) {
						case '0::': //disconnect
							this.close();
							break;
						case '1::': //connect
							this.wrapper.connecting = false;
							this.wrapper.connected = true;
							this.wrapper.sendCommand('initquery');
							this.wrapper.callListeners('connect');
							break;
						case '2::': //heartbeat
							this.send('2::');
							break;
						case '4::': //json
							eval('event = ' + event.data.substring(4));
							this.wrapper.callListeners('message', event);
							break;
						case '7::': //error
							this.wrapper.callListeners('error', 'Protocol error: ' + event.data.substring(4));
							throw new Error('Protocol error: ' + event.data.substring(4));
							break;
						case '3::': //message
						case '5::': //event
						case '6::': //ack
						case '8::': //noop
							this.wrapper.callListeners('error', 'Protocol error: Received unimplemented data type ' + event.data);
							throw new Error('Protocol error: Received unimplemented data type ' + event.data);
							break;
					}
				}
				cs.socket.onerror = function(event) {
					this.wrapper.callListeners('error', 'Socket error (ws): ' + event);
					throw new Error('Socket error (ws): ' + event);
				}
				cs.socket.onclose = function(event) {
					if(!this.wrapper.connected) { //was immediately closed, try xhr
						this.wrapper.connecting = false;
						this.wrapper.mode = 'xhr';
						this.wrapper.key = '';
						this.wrapper.session = '';
						this.wrapper.socket = undefined;
						this.wrapper.connect(room);
					}
					else {
						console.log(event);
						this.wrapper.connected = false;
						this.wrapper.callListeners('disconnect', event.reason);
						this.wrapper.roomId = 0;
						this.wrapper.key = '';
						this.wrapper.session = '';
						this.wrapper.socket = undefined;
					}
				}
			}
			else { //browser doesn't support websockets, use xhr-polling
				cs.mode = 'xhr';
				cs.socket = {
					wrapper: cs,
					url: 'http://chat2-2.wikia.com:80/socket.io/1/xhr-polling/' + str.substring(0, str.indexOf(':')) + '/?name=' + encodeURIComponent(encodeURIComponent(wgUserName)) + '&key=' + cs.key + '&roomId=' + room,
					send: function(message) {
						var xhr = new XMLHttpRequest();
						xhr.open('POST', this.url, true);
						xhr.setRequestHeader('Content-Type', 'text/plain');
						xhr.send(message);
					},
					xhr: false,
					poll: function() {
						this.xhr = new XMLHttpRequest();
						this.xhr.open('GET', this.url, true);
						this.xhr.wrapper = this.wrapper;
						this.xhr.onreadystatechange = function() {
							if(this.readyState == 4 && this.status == 200) {
								if(this.responseText.indexOf('\ufffd') == -1) {var response = '\ufffd0\ufffd' + this.responseText;} //quick fix, we don't actually use the number in the middle
								else {var response = this.responseText;}
								var cont = true;
								var ref = 1;
								while(response.indexOf('\ufffd', ref) != -1) {
									var start = response.indexOf('\ufffd', response.indexOf('\ufffd', ref));
									var end = (response.indexOf('\ufffd', start + 1) != -1 ? response.indexOf('\ufffd', start + 1) : response.length);
									var text = response.substring(start + 1, end);
									switch(text.substring(0, 3)) {
										case '0::': //disconnect
											this.wrapper.connected = false;
											this.wrapper.callListeners('disconnect', text.substring(4));
											this.wrapper.roomId = 0;
											this.wrapper.key = '';
											this.wrapper.session = '';
											this.wrapper.socket = undefined;
											cont = false;
											break;
										case '1::': //connect
											this.wrapper.connecting = false;
											this.wrapper.connected = true;
											this.wrapper.sendCommand('initquery');
											this.wrapper.callListeners('connect');
											break;
										case '4::': //json
											eval('var data = ' + text.substring(4));
											this.wrapper.callListeners('message', data);
											break;
										case '7::': //error
											this.wrapper.callListeners('error', 'Protocol error: ' + text.substring(4));
											throw new Error('Protocol error: ' + text.substring(4));
											cont = false;
											break;
										case '8::': //noop
											break;
										case '2::': //heartbeat
										case '3::': //message
										case '5::': //event
										case '6::': //ack
											this.wrapper.callListeners('error', 'Protocol error: Received unimplemented data type ' + text);
											throw new Error('Protocol error: Received unimplemented data type ' + text);
											break;
									}
									ref = end + 1;
								}
								if(cont) {this.wrapper.socket.poll();}
							}
							else if(this.readyState == 4 && this.status != 0) { //ajax error
								this.wrapper.callListeners('error', 'Socket error (xhr): received response code ' + this.status);
								throw new Error('Socket error (xhr): received response code ' + this.status);
							}
						}
						this.xhr.onabort = function() {
							this.wrapper.connected = false;
							this.wrapper.callListeners('disconnect', 'aborted');
							this.wrapper.roomId = 0;
							this.wrapper.key = '';
							this.wrapper.session = '';
							this.wrapper.socket = undefined;
						}
						this.xhr.send();
					}
				}
				cs.socket.poll();
			}
		});
	}
}

//Function for disconnecting from the room
ChatSocket.prototype.disconnect = function(message) {
	this.connected = false;
	if(this.mode == 'websocket') {
		this.socket.onclose = null;
		this.socket.close(3000, message);
	}
	else if(this.mode == 'xhr') {
		this.socket.xhr.onabort = null;
		this.socket.xhr.abort();
	}
	this.callListeners('disconnect', message);
	this.roomId = 0;
	this.key = '';
	this.session = '';
	this.socket = undefined;
}

//Function for reconnecting
ChatSocket.prototype.reconnect = function() {
	var room = this.roomId;
	this.disconnect('reconnecting');
	this.connect(room);
}