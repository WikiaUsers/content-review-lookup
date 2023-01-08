/*ChatHacks per| */
if(wgPageName == 'Special:Chat') {
	window.hasFocus = true;
	window.dinged = false;
	window.ding = 0;
	window.titleorig = document.title;
	function Unding() { //for fixing the title after you've been dinged
		document.getElementsByTagName('title')[0].innerHTML = window.titleorig;
		clearInterval(window.ding);
		window.dinged = false;
	}
	$(window).bind('focus', Unding);
	$(window).bind('focus', function() {window.hasFocus = true;});
	$(window).bind('blur', function() {window.hasFocus = false;});

	//Function for adding messages to the window
	NodeChatDiscussion.prototype.iconPing = function (chat) {
		var icon = '';
		for(var i in this.model.users.models) {
			if(this.model.users.models[i].attributes.name == chat.attributes.name) {
				if(this.model.users.models[i].attributes.isStaff) {
					icon = ' <img class="stafficon" src="/extensions/wikia/Chat/images/icon-staff.png">';
				}
				else if(this.model.users.models[i].attributes.isModerator) {
					icon = ' <img class="modicon" src="/extensions/wikia/Chat/images/icon-chatmod.png">';
				}
				break;
			}
		}
		if(icon) {this.chatUL.children().last().children('.username').html(this.chatUL.children().last().children('.username').html() + icon);}
			
		if(mainRoom.isInitialized && chat.attributes.name != wgUserName && !chat.attributes.isInlineAlert) {
			window.dinged = true;
			//resolve HTML
			var text = document.createElement('span');
			text.innerHTML = chat.attributes.text;
			text = text.textContent;
			var pings = document.getElementById('pings').value.split('\n');
			for(var i = 0; i < pings.length; i++) {
				if(text.toLowerCase().indexOf(pings[i].toLowerCase()) != -1 || this != mainRoom.viewDiscussion) {
					if(!window.hasFocus) { //Only annoy people if the window isn't focused
						$('#sound').html('<embed src="https://images.wikia.nocookie.net/monchbox/images/0/01/Beep-sound.ogg" hidden="true" autostart="true" loop="false" />');
						if(!window.dinged) {window.ding = setInterval('FlashTitle()', 500);}
					}
					this.scrollToBottom();
					if(this == mainRoom.viewDiscussion) {
						var ref = text.toLowerCase().indexOf(pings[i].toLowerCase());
						var phrase = text.slice(ref, ref + pings[i].length);
						this.chatUL.children().last().children('.message').html(text.replace(phrase, '<span style="color:red;">' + phrase + '</span>'));
					}
					break;
				}
			}
		}
	}
	mainRoom.model.chats.bind('afteradd', $.proxy(mainRoom.viewDiscussion.iconPing, mainRoom.viewDiscussion));
	
	//Away status functions
	NodeChatController.prototype.setAway = function (msg){
		if(!msg) {var msg = '';}
		$().log("Attempting to go away with message: " + msg);
		var setStatusCommand = new models.SetStatusCommand({
			statusState: STATUS_STATE_AWAY,
			statusMessage: msg
		});
		this.inlineAlert('You are now away.');
		this.socket.send(setStatusCommand.xport());
	}
	NodeChatController.prototype.setBack = function (){
		if( ! this.comingBackFromAway ){ // if we have sent this command (but just haven't finished coming back yet), don't keep spamming the server w/this command
			$().log("Telling the server that I'm back.");
			this.comingBackFromAway = true;
			var setStatusCommand = new models.SetStatusCommand({
				statusState: STATUS_STATE_PRESENT,
				statusMessage: ''
			});
			this.inlineAlert('You are no longer away.');
			this.socket.send(setStatusCommand.xport());
		}
	}
		
	//Send message function
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

	//Functions that have to be changed for interwiki chat
	NodeChatController.prototype.openPrivateRoom = function(users) {
		users.push( wgUserName );
		$.ajax({
			type: 'POST',
			url: wgScript + '?action=ajax&rs=ChatAjax&method=getPrivateRoomID',
			data: {
				users : users.join(',')
			},
			success: $.proxy(function(data) {
				$().log("Attempting create private room with users " + users.join(','));	
				var data = new models.OpenPrivateRoom({roomId: data.id, users: users});
				this.baseOpenPrivateRoom(data, true);
				this.showRoom(data.get('roomId') );
				this.chats.privates[ data.get('roomId') ].isPrivate = true;
				this.chats.privates[ data.get('roomId') ].init();
				//this.socket.send(data.xport());
			}, this)
		});
		this.viewUsers.hideMenu();
	}

	NodeRoomController.prototype.onJoin = function(message) {
		var joinedUser = new models.User();
		joinedUser.mport(message.joinData);

		var connectedUser = this.model.users.findByName(joinedUser.get('name'));
		
		if(typeof connectedUser == "undefined"){
			this.model.users.add(joinedUser);
			this.fire('afterJoin', joinedUser);
			
			//TODO: move it to other class
			if( !this.isPrivate ) {
				// Create the inline-alert (on client side so that we only display it if the user actually IS new to the room and not just disconnecting/reconnecting).
				var newChatEntry = new models.InlineAlert({text: $.msg('chat-user-joined', [joinedUser.get('name')] ) });
				this.model.chats.add(newChatEntry);				
			}
			
			this.disableRoom(joinedUser, false);
		} else {
			// The user is already in the room... just update them (in case they have changed).
			this.model.users.remove(connectedUser);
			this.model.users.add(joinedUser);
		}		
	}
	NodeRoomController.prototype.onPart = function(message) {
		var partedUser = new models.User();
		partedUser.mport(message.data);
		
		var connectedUser = this.model.users.findByName(partedUser.get('name'));

		if(typeof connectedUser != "undefined"){

			//TODO: move it to other class
			if( !this.isPrivate ) {
				var newChatEntry = new models.InlineAlert({text: $.msg('chat-user-parted', [connectedUser.get('name')] ) });
				this.model.chats.add(newChatEntry);
			}
			
			this.model.users.remove(connectedUser);
			this.disableRoom(connectedUser, true);
		}		
	}
	NodeRoomController.prototype.disableRoom = function(user, flag) {
		if( this.isPrivate == false ) {	
			//TODO: fix it for multiuser priv chat
			var privateUser =  this.model.privateUsers.findByName(user.get('name'));
			
			if(typeof privateUser != "undefined"){
				var roomId = privateUser.get('roomId');
				if( typeof( this.chats.privates[roomId] ) != "undefined" ){
					this.chats.privates[roomId].model.room.set({ 
						'blockedMessageInput': flag
					});
				}
				//try to reconnect
				if(flag === false && this.chats.privates[roomId].model.chats.length > 0) {
					this.socket.send( this.chats.privates[roomId].model.privateRoom.xport() );
				}
			}
		}
	}

	NodeChatController.prototype.showRoom = function(roomId) {
		$().log(roomId);
		if( this.activeRoom == roomId ) {
			return false;
		}
		
		this.activeRoom = roomId;
		if(roomId == 'main') {
			this.chats.main.setActive(true);
		} else {
			this.chats.main.setActive(false);
		}
		
		for(var i in this.chats.privates) {
			if(i == roomId) {
				this.chats.privates[i].setActive(true);
			} else {
				this.chats.privates[i].setActive(false);
			}
		}

		for(var i in this.chats.opens) {
			if(i == roomId) {
				this.chats.opens[i].setActive(true);
			} else {
				this.chats.opens[i].setActive(false);
			}
		}
		return true;
	}
	
	NodeChatController.prototype.openPublicRoom = function(roomId) {
		this.chats.opens[roomId] = new NodeRoomController(roomId);
		this.chats.opens[roomId].mainController = this; //set main controller for this chat room
		this.showRoom(roomId);
		this.chats.opens[roomId].init();
	}
	
	/*//For interwiki chatting, a merger of NodeRoomController's private management functions, and NodeChatController's public management functions.
	NodeInterwikiController = $.createClass(NodeRoomController, {
		constructor: function (roomId) {
			NodeInterwikiController.superclass.constructor.apply(this,arguments);

			this.socket.bind('updateUser',  $.proxy(this.onUpdateUser, this)); //Check

			this.bind('afterJoin', $.proxy(this.afterJoin, this));
			this.viewUsers = new NodeChatUsers({model: this.model, el: $('body')});
		
			this.viewUsers.bind('showPrivateMessage', $.proxy(this.privateMessage, this) );
			this.viewUsers.bind('kickBan', $.proxy(this.kickBan, this) );
			this.viewUsers.bind('giveChatMod', $.proxy(this.giveChatMod, this) );
			
			this.viewUsers.bind('blockPrivateMessage', $.proxy(this.blockPrivate, this) ); //Check
			this.viewUsers.bind('allowPrivateMessage', $.proxy(this.allowPrivate, this) ); //Check
		
			this.viewUsers.bind('mainListClick', $.proxy(this.mainListClick, this) ); //Check
			this.viewUsers.bind('privateListClick', $.proxy(this.privateListClick, this) ); //Check

			this.viewUsers.bind('clickAnchor', $.proxy(this.clickAnchor, this) ); //Check

			this.viewUsers.render();
			this.viewDiscussion.show();

			return this;
		}
		
		
	});*/

	NodeChatController.prototype.inlineAlert = function(text) {
		this.viewDiscussion.chatUL.append('<li class="inline-alert">' + text + '</li>');
		this.viewDiscussion.scrollToBottom();
	}

	function FlashTitle() {
		if(document.getElementsByTagName('title')[0].innerHTML == window.titleorig) {
			document.getElementsByTagName('title')[0].innerHTML = 'Activity - ' + wgSiteName + ' chat';
		}
		else {
			document.getElementsByTagName('title')[0].innerHTML = window.titleorig;
		}
	}

	function Preparse(input) { //Parse slash commands.
		var text = input.split(' ');
		if(text[0]) {text[0] = text[0].toLowerCase();}
		switch(text[0]) {
			case '/away':
			case '/afk': //Toggle away status
				if($('#ChatHeader .User').hasClass('away') == false) {toggleAway();} //if you're away, hitting enter has already sent you back
				break;
			case '/clear': //Clear the active chat window
				this.clearWindow();
				break;
			case '/me': //Emote
				if(text[1] != undefined) {$('#Write [name="message"]').val('* ' + wgUserName + ' ' + build(text, 1));}
				else {$('#Write [name="message"]').val('* ' + wgUserName);}
				return true;
				break;
			case '/nc': //Nobody cares
				if(text[1] != undefined) {$('#Write [name="message"]').val('[[uncyclopedia:Nobody cares|' + build(text, 1) + ']]');}
				else {$('#Write [name="message"]').val('[[uncyclopedia:Nobody cares|Nobody cares]]');}
				return true;
				break;
			case '/coppa': //Too young
				if(text[1] != undefined) {$('#Write [name="message"]').val('http://coppa.org ' + build(text, 1));}
				else {$('#Write [name="message"]').val('http://coppa.org - You must be 13 or older to have an account on Wikia.')}
				return true;
				break;
			case '/kick':
			case '/ban':
			case '/kb':
			case '/kickban': //Kickban a user
				if(text[1]) {
					var mod = new models.KickBanCommand({userToBan: build(text, 1)});
					this.socket.send(mod.xport());
				}
				else {this.inlineAlert(text[0] + ' error: User must be specified');}
				break;
			case '/unban': //Unban a user
				if(text[1]) {
					api.newQuery(POST, 'action=userrights&user=' + build(text, 1) + '&remove=bannedfromchat', function(result) {
						if(result.userrights.removed[0] == 'bannedfromchat') {
							this.inlineAlert(build(text, 1) + ' was unbanned.');
						}
						else {
							this.inlineAlert(build(text, 1) + ' is not banned.');
						}
					});
					api.send(0, true);
				}
				else {this.inlineAlert(text[0] + ' error: User must be specified');}
				break;
			case '/mod': //Make a user a mod
				if(text[1]) {
					var giveChatModCommand = new models.GiveChatModCommand({userToPromote: build(text, 1)});
	        			this.socket.send(giveChatModCommand.xport());
				}
				else {this.inlineAlert(text[0] + ' error: User must be specified');}
				break;
			case '/demod': //Remove a user's mod right
				if(text[1]) {
					api.newQuery(POST, 'action=userrights&user=' + build(text, 1) + '&remove=chatmoderator', function(result) {
						if(result.userrights.removed[0] == 'chatmoderator') {
							this.inlineAlert(build(text, 1) + ' was demodded.');
						}
						else {
							this.inlineAlert(build(text, 1) + ' is not a mod.');
						}
					});
					api.send(0, true);
				}
				else {this.inlineAlert(text[0] + ' error: User must be specified');}
				break;
			case '/block': //Block a user from private chatting you
				if(text[1]) {this.blockPrivate({name: build(text, 1)});}
				else {this.inlineAlert(text[0] + ' error: User must be specified');}
				break;
			case '/unblock': //Unblock a user from private chatting you - should merge this into a toggle
				if(text[1]) {this.allowPrivate({name: build(text, 1)});}
				else {this.inlineAlert(text[0] + ' error: User must be specified');}
				break;
			case '/chat':
			case '/room':
			case '/private': //Invoke a private room
				if(text[1]) {
					var array = build(text, 1).split('|');
					for(var i in array) {array[i] = array[i].removeTrailing(' ');}
					mainRoom.openPrivateChat(array);
				}
				else {this.inlineAlert(text[0] + ' error: Users must be specified');}
				break;
			case '/enter':
			case '/join': //Now for a command with chutzpah - join any chat on Wikia
				//Need to fix this so that joined rooms can be selected
				if(text[1]) {
					var data = new models.OpenPrivateRoom({roomId: text[1]});
 					mainRoom.baseOpenPrivateRoom(data, true);
					$('.private').before('<h1 id="Room_' + text[1] + '" class="public wordmark" onclick="mainRoom.showRoom(' + text[1] + ')"><span class="font-">' + text[1] + '</span><span id="MsgCount_' + text[1] + '" class="splotch">0</span></h1>');
					mainRoom.showRoom(text[1]);
					mainRoom.chats.privates[text[1]].init();
				}
				else {this.inlineAlert(text[0] + ' error: Room id must be specified');}
				break;
			case '/leave':
			case '/part': //Leave the room you're looking at, or the room you specify
				if(!text[1]) {var id = this.roomId; var chat = this;}
				else {var id = text[1]; var chat = mainRoom.chats.privates[text[1]];}
				$('#Room_' + id).remove();
				chat.socket.autoReconnect = false;
				chat.socket.socket.disconnect();
				if(!text[1]) {mainRoom.show('main');}
				break;
			case '/roomid':
			case '/id':
				this.inlineAlert('id: ' + this.roomId);
				break;
			case '/self': //Send a message to yourself
				if(text[1] != undefined) {
					str = build(text, 1);
					newstr = '';
					for(var i = 0; i < str.length; i++) {
						switch(str.charAt(i)) {
							case '[':
								if(str.charAt(i + 1) == '[') {
									var k = str.indexOf(']', i);
									if(str.charAt(k + 1) == ']') {
										var substr = str.substring(i + 2, k);
										if(substr.indexOf('|') != -1) {
											var link = substr.substring(0, substr.indexOf('|'));
											var linktext = substr.substring(substr.indexOf('|') + 1, substr.length);
										}
										else {
											var link = substr;
											var linktext = link;
										}
										var linkspl = link.split(' ');
										link = '';
										for(var j in linkspl) {link += linkspl[j] + '_';}
										link = link.substring(0, link.length - 1);
										newstr += '<a href="/wiki/' + link + '">' + linktext + '</a>';
										i = k + 1;
									}
								}
								else if(str.substring(i + 1, i + 8) == 'http://') {
									var k = str.indexOf(']', i);
									var splstr = str.substring(i + 1, k).split(' ');
									if(splstr == str.substring(i + 1, k)) {
										var text = '[1]';
									}
									else {
										var text = build(splstr, 1);
									}
									newstr += '<a href="' + splstr[0] + '">' + text + '</a>';
									i = k;
								}
								break;
							default:
								newstr += str.charAt(i);
								break;
						}
					}
					this.viewDiscussion.chatUL.append('<li><img class="avatar" src="' + $('#ChatHeader .User img').attr('src') + '"><span class="username">' + wgUserName + '</span><span class="message" style="color:#999;"> (self) ' + newstr + '</span></li>');
				}
				else {
					this.viewDiscussion.chatUL.append('<li><img class="avatar" src="' + $('#ChatHeader .User img').attr('src') + '"><span class="username">' + wgUserName + '</span><span class="message" style="color:#999;"> (self)</span></li>');
				}
				this.viewDiscussion.scrollToBottom();
				break;
			case '/help': //Walrus
				if(text[1]) {text[1] = text[1].toLowerCase();}
				switch(text[1]) {
					case 'me':
						this.inlineAlert('Emote yourself. Similar to IRC\'s /me.');
						this.inlineAlert('Example: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/me likes chat hacks\')">/me likes chat hacks</span>');
						break;
					case 'nc':
						this.inlineAlert('Link your message to <a href="http://uncyclopedia.wikia.com/wiki/Nobody_cares">uncyclopedia:Nobody cares</a>.');
						this.inlineAlert('Example: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/nc This is totally important\')">/nc This is totally important</span>');
						break;
					case 'away':
					case 'afk':
						this.inlineAlert('Toggles your away status.');
						this.inlineAlert('Example: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/afk\')">/afk</span>');
						break;
					case 'clear':
						this.inlineAlert('Clears the currently open chat window.');
						this.inlineAlert('Example: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/clear\')">/clear</span>');
						break;
					case 'chat':
					case 'private':
					case 'room':
						this.inlineAlert('Invokes a private room.');
						this.inlineAlert('Names must be separated by a pipe (|).');
						this.inlineAlert('Example: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/room ExampleUser\')">/room ExampleUser</span>');
						break;
					case 'mod':
						this.inlineAlert('Gives the specified user chat mod status.');
						this.inlineAlert('Example: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/mod ExampleUser\')">/mod ExampleUser</span>');
						break;
					case 'block':
						this.inlineAlert('Blocks the specified user from private chatting you.');
						this.inlineAlert('Example: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/block ExampleUser\')">/block ExampleUser</span>');
						break;
					case 'unblock':
						this.inlineAlert('Unblocks the specified user from private chatting you.');
						this.inlineAlert('Example: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/unblock ExampleUser\')">/unblock ExampleUser</span>');
						break;
					case 'kick':
					case 'kickban':
						this.inlineAlert('Kickbans the specified user.');
						this.inlineAlert('Example: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/kickban ExampleUser\')">/kickban ExampleUser</span>');
						break;
					case 'enter':
					case 'join':
						this.inlineAlert('Joins the chat room with the specified id.');
						this.inlineAlert('Example: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/join 10\')">/join 10</span>');
						break;
					case 'leave':
					case 'part':
						this.inlineAlert('Leaves the current chat room.');
						this.inlineAlert('An id can also be specified for leaving a particular chat room.');
						this.inlineAlert('Example: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/part\')">/part</span>');
						break;
					case 'roomid':
					case 'id':
						this.inlineAlert('Returns the room id of the room you\'re in.');
						this.inlineAlert('Example: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/id\')">/id</span>');
						break;
					case 'help':
						this.inlineAlert('Displays information about other commands.');
						this.inlineAlert('Example: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/help\')">/help</span>');
						break;
					default:
						this.inlineAlert('Commands:');
						this.inlineAlert('<span onclick="Preparse.call(active(), \'/help me\')">me</span>, <span onclick="Preparse.call(active(), \'/help afk\')">afk</span>, <span onclick="Preparse.call(active(), \'/help clear\')">clear</span>, <span onclick="Preparse.call(active(), \'/help room\')">room</span>, <span onclick="Preparse.call(active(), \'/help mod\')">mod</span>,');
						this.inlineAlert('<span onclick="Preparse.call(active(), \'/help block\')">block</span>, <span onclick="Preparse.call(active(), \'/help unblock\')">unblock</span>, <span onclick="Preparse.call(active(), \'/help kickban\')">kickban</span>, <span onclick="Preparse.call(active(), \'/help join\')">join</span>, <span onclick="Preparse.call(active(), \'/help part\')">part</span>, <span onclick="Preparse.call(active(), \'/help id\')">id</span>');
						break;
				}
				break;
			default:
				return true;
				break;
		}
		return false;
	}

	//Parser helping function - takes an array of text created with .split(' '),
	//and an index number for where to start, then rebuilds the string.
	//Can also accept an index value for where to stop.
	function build(text, index, stop) {
		var newtext = '';
		if(stop == undefined || stop == 0) {stop = text.length}
		else if(stop < 0) {stop += text.length}
		if(index == stop || index == text.length - 1) {return text[index];}
		for(var i = index; i < stop; i++) {
			newtext += text[i] + ' ';
		}
		return newtext;
	}

	function toggleAway(msg) {
		if(!msg) {var msg = '';}
		if($('#ChatHeader .User').hasClass('away') == true) {
			mainRoom.setBack();
		}
		else {
			mainRoom.setAway(msg);
		}
	}
	toggleAway.back = function() { //Force back status
		if($('#ChatHeader .User').hasClass('away') == true) {mainRoom.setBack();}
	}
	toggleAway.away = function(msg) { //Force away status
		if(!msg) {var msg = '';}
		if($('#ChatHeader .User').hasClass('away') == false) {mainRoom.setAway(msg);}
	}

	NodeChatController.prototype.clearWindow = function() {
		this.viewDiscussion.chatUL.html('');
		this.inlineAlert('Window cleared.');
	}

	function active() { //Returns the NodeChatController for the active window
		if(mainRoom.activeRoom && mainRoom.activeRoom != 'main') {return mainRoom.chats.privates[mainRoom.activeRoom];}
		else {return mainRoom;}
	}

	String.prototype.removeTrailing = function(char) { //Remove extraneous characters
		var str = this;
		while(str.charAt(0) == char) {str = str.substring(1, str.length);}
		while(str.charAt(str.length - 1) == char) {str = str.substring(0, str.length - 1);}
		return str;
	}

	function createCookie(name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	}
 
	function readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}

	$(function () {
		if(!importScriptURI) {function importScriptURI(a){var b=document.createElement("script");b.setAttribute("src",a);b.setAttribute("type","text/javascript");document.getElementsByTagName("head")[0].appendChild(b);return b}}
		importScriptURI('http://monchbox.wikia.com/index.php?title=MediaWiki:APIQuery.js&action=raw&ctype=text/javascript'); //APIQuery for /unban

		$('head').append('<style type="text/css">\n.stafficon {\n\tmargin-bottom:-4px;\n}\n.modicon {\n\tmargin-bottom:-2px;\n}\n.UserStatsMenu {\n\tcolor:#000;\n}\n.Chat .continued {\n\ttop:0;\n\tmargin-bottom:0;\n}\n.Write [name="message"] {\n\twidth:93%;\n}\n.inline-alert span {\n\tcolor:#006CB0;\n\tcursor:pointer;\n}\n.inline-alert span:hover {\n\ttext-decoration:underline;\n}\n#pingspan {\n\tposition:absolute;\n\tz-index:5;\n\ttop:23px;\n\tmargin-left:15px;\n\tfont-size:15px;\n\tfont-weight:normal;\n\tline-height:15px;\n}\n#pings {\n\tresize:none;\n\tmargin-left:0;\n\tfont-size:12px;\n\theight:100px;\n\tdisplay:block;\n}\n#pingspan div span {\n\tfont-size:55%;\n}\n</style>');
		
		//Add a 'go afk' button and a 'clear chat' button
		$('#Write').append('<a class="wikia-button" href="javascript:toggleAway()" style="position:absolute; right:0; top:0;">AFK</a><a class="wikia-button" href="javascript:active().clearWindow()" style="position:absolute; right:0; bottom:2px;">Clear</a>');
		//Unbind all of the window listeners that set your status to back
		$(window).unbind('mousemove').unbind('focus').unbind('keypress');
		//Add the sound space
		$('body').append('<span id="sound"></span>');
		//Add the area for adding more pings
		$('#ChatHeader .wordmark').append('<span id="pingspan"><div>Ping phrases <span title="If a user says one of these phrases (case insensitive), you will be pinged">(?)</span></div><textarea id="pings" style="display:none;">' + ((readCookie('pingphrases')) ? readCookie('pingphrases').split('\\n').join('\n') : wgUserName) + '</textarea></span>');
		document.getElementById('pingspan').onmouseover = function(event) {document.getElementById('pings').style.display = 'block';}
		document.getElementById('pingspan').onmouseout = function(event) {document.getElementById('pings').style.display = 'none'; createCookie('pingphrases', document.getElementById('pings').value.split('\n').join('\\n'), 99999);}
	});
}
else {
	$(function () {
		if(document.body.className.indexOf('skin-oasis') == -1) {
			var a = document.getElementsByTagName('a');
			for(var i in a) {
				if(a[i].href && a[i].href.indexOf('/wiki/Special:Chat') != -1) {
					a[i].href = 'javascript:OpenChatWindow(); return false;';
				}
			}
		}
		else {
			window.chatcheck = setInterval('ChatCheck()', 200);
		}
	});
 
	function ChatCheck() {
		if($('.chat-join button').length != 0) {
			$('.chat-join button').replaceWith('<a class="wikia-button" onclick="OpenChatWindow()"><img src="https://images.wikia.nocookie.net/common/__cb36140/extensions/wikia/Chat/images/chat_icon.png" style="margin-right:3px;">Join the Chat</a>');
			clearInterval(window.chatcheck);
		}
	}
 
	function OpenChatWindow() {
		window.chatwindow = window.open('/index.php?title=Special:Chat&useskin=wikia');
		window.chatwindow.onload = function () {
			//addOnloadHook, importScript, and importStylesheet
			window.chatwindow.$('body').prepend('<script>\nfunction importScript(b){var a=wgScript+"?title="+encodeURIComponent(b.replace(/ /g,"_")).replace(/%2F/ig,"/").replace(/%3A/ig,":")+"&action=raw&ctype=text/javascript";return importScriptURI(a)}\nfunction importScriptURI(a){var b=document.createElement("script");b.setAttribute("src",a);b.setAttribute("type","text/javascript");document.getElementsByTagName("head")[0].appendChild(b);return b}\nfunction importScriptPage(b,d){var a="/index.php?title="+encodeURIComponent(b.replace(/ /g,"_")).replace("%2F","/").replace("%3A",":")+"&action=raw&ctype=text/javascript";if(typeof d=="string"){if(d.indexOf("://")==-1){a="http://"+d+".wikia.com"+a}else{a=d+a}}return importScriptURI(a)}\nfunction importStylesheet(a){return importStylesheetURI(wgScript+"?action=raw&ctype=text/css&title="+encodeURIComponent(a.replace(/ /g,"_")))}\nfunction importStylesheetURI(b,d){var a=document.createElement("link");a.type="text/css";a.rel="stylesheet";a.href=b;if(d){a.media=d}document.getElementsByTagName("head")[0].appendChild(a);return a}\nfunction importStylesheetPage(b,d){var a="/index.php?title="+encodeURIComponent(b.replace(/ /g,"_")).replace("%2F","/").replace("%3A",":")+"&action=raw&ctype=text/css";if(typeof d=="string"){if(d.indexOf("://")==-1){a="http://"+d+".wikia.com"+a}else{a=d+a}}return importStylesheetURI(a)}\n//This isn\'t the same as the regular addOnloadHook, because the regular one runs from a script tag in the body that I don\'t feel like appending. It\'s easier to just make it $(function), which is essentially equivalent\nfunction addOnloadHook(func) {$(func);}\n</script>');
			//global.js
			window.chatwindow.importScriptURI('http://community.wikia.com/index.php?title=User:' + wgUserName + '/global.js&action=raw&ctype=text/javascript');
			//wikia.js
			window.chatwindow.importScriptURI(wgServer + '/index.php?title=User:' + wgUserName + '/wikia.js&action=raw&ctype=text/javascript');
			//global.css
			window.chatwindow.importStylesheetURI('http://community.wikia.com/index.php?title=User:' + wgUserName + '/global.css&action=raw&ctype=text/css');
			//wikia.css
			window.chatwindow.importStylesheetURI(wgServer + '/index.php?title=User:' + wgUserName + '/wikia.css&action=raw&ctype=text/css');
		}
	}
}