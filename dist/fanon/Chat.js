importScriptPage('ChatOptions/code.js', 'dev');

/*Commands*/
//For interwiki chatting, a merger of NodeRoomController's private management functions, and NodeChatController's public management functions.
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
 
 
	});
 
window.commands = {
		'away': 'afk',
		'afk': function(com, text) {
			if($('#ChatHeader .User').hasClass('away') == false) {toggleAway();} //if you're away, hitting enter has already sent you back
		},
		'clear': function(com, text) { //Clear the active chat window
			this.clearWindow();
		},
		'nc': function(com, text) { //Nobody cares
			$('#Write [name="message"]').val('[[' + i18n['uncyc'] + '|' + (com ? com : i18n['nobodycares']) + ']]');
			return true;
		},
		'devoice': function(com, text) { //IRCpwnt
			$('#Write [name="message"]').val('* ChanServ set channel mode -v ' + (com ? com : wgUserName));
			return true;
		},
		'coppa': function(com, text) { //Too young
			if(com) {$('#Write [name="message"]').val('http://coppa.org ' + com);}
			else {$('#Write [name="message"]').val('http://coppa.org ' + i18n['coppa']);}
			return true;
		},
		'silence': function(com, text) { //Idle
			$('#Write [name="message"]').val('People idle, enjoy the silence. http://www.youtube.com/watch?v=diT3FvDHMyo');
			return true;
		},
		'kick': 'kickban',
		'ban': 'kickban',
		'kb': 'kickban',
		'kickban': function(com, text) { //Kickban a user
			if(com) {
				var mod = new models.KickBanCommand({userToBan: com});
				this.socket.send(mod.xport());
			}
			else {this.inlineAlert(i18n['erruser'].replace(/\$1/g, text.split(' ')[0]));}
		},
		'unban': function(com, text) { //Unban a user
			if(com) {
				api.newQuery(POST, 'action=userrights&user=' + com + '&remove=bannedfromchat', function(result) {
					if(result.userrights.removed[0] == 'bannedfromchat') {
						this.inlineAlert(i18n['unbanned'].replace(/\$1/g, com));
					}
					else {
						this.inlineAlert(i18n['notbanned'].replace(/\$1/g, com));
					}
				});
				api.send(0, true);
			}
			else {this.inlineAlert(i18n['erruser'].replace(/\$1/g, text.split(' ')[0]));}
		},
		'mod': function(com, text) { //Make a user a mod
			if(com) {
				var giveChatModCommand = new models.GiveChatModCommand({userToPromote: com});
	        		this.socket.send(giveChatModCommand.xport());
			}
			else {this.inlineAlert(i18n['erruser'].replace(/\$1/g, text.split(' ')[0]));}
		},
		'demod': function(com, text) { //Remove a user's mod right
			if(com) {
				api.newQuery(POST, 'action=userrights&user=' + com + '&remove=chatmoderator', function(result) {
					if(result.userrights.removed[0] == 'chatmoderator') {
						this.inlineAlert(i18n['demodded'].replace(/\$1/g, com));
					}
					else {
						this.inlineAlert(i18n['notmod'].replace(/\$1/g, com));
					}
				});
				api.send(0, true);
			}
			else {this.inlineAlert(i18n['erruser'].replace(/\$1/g, text.split(' ')[0]));}
		},
		'block': function(com, text) { //Block a user from private chatting you
			if(com) {this.blockPrivate({name: com});}
			else {this.inlineAlert(i18n['erruser'].replace(/\$1/g, text.split(' ')[0]));}
		},
		'unblock': function(com, text) { //Unblock a user from private chatting you - should merge this into a toggle
			if(com) {this.allowPrivate({name: com});}
			else {this.inlineAlert(i18n['erruser'].replace(/\$1/g, text.split(' ')[0]));}
		},
		'chat': 'private',
		'room': 'private',
		'private': function(com, text) { //Invoke a private room
			if(com) {
				var arr = com.split('#');
				for(var i in arr) {array[i] = arr[i].removeTrailing(' ');}
				mainRoom.openPrivateChat(arr);
			}
			else {this.inlineAlert(i18n['erruser'].replace(/\$1/g, text.split(' ')[0]));}
		},
		'enter': 'join',
		'join': function(com, text) { //Now for a command with chutzpah - join any chat on Wikia
			//Need to fix this so that joined rooms can be selected
			if(com) {
				var data = new models.OpenPrivateRoom({roomId: com});
 				mainRoom.baseOpenPrivateRoom(data, true);
				$('.private').before('<h1 id="Room_' + com + '" class="public wordmark" onclick="mainRoom.showRoom(' + com + ')"><span class="font-">' + com + '</span><span id="MsgCount_' + com + '" class="splotch">0</span></h1>');
				mainRoom.showRoom(com);
				mainRoom.chats.privates[com].init();
			}
			else {this.inlineAlert(i18n['errroom'].replace(/\$1/g, text.split(' ')[0]));}
		},
		'leave': 'part',
		'part': function(com, text) { //Leave the room you're looking at, or the room you specify
			if(!com) {var id = this.roomId; var chat = this;}
			else {var id = com; var chat = mainRoom.chats.privates[com];}
			$('#Room_' + id).remove();
			chat.socket.autoReconnect = false;
			chat.socket.socket.disconnect();
			if(!com) {mainRoom.show('main');}
		},
		'roomid': 'id',
		'id': function(com, text) {
			this.inlineAlert(i18n['id'] + ': ' + this.roomId);
		},
		'self': function(com, text) { //Send a message to yourself
			if(com) {
				newstr = '';
				for(var i = 0; i < com.length; i++) {
					switch(com.charAt(i)) {
						case '[':
							if(com.charAt(i + 1) == '[') {
								var k = com.indexOf(']', i);
								if(com.charAt(k + 1) == ']') {
									var substr = com.substring(i + 2, k);
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
							else if(com.substring(i + 1, i + 8) == 'http://') {
								var k = com.indexOf(']', i);
								var splstr = com.substring(i + 1, k).split(' ');
								if(splstr == com.substring(i + 1, k)) {
									var linktext = '[1]';
								}
								else {
									var linktext = build(splstr, 1);
								}
								newstr += '<a href="' + splstr[0] + '">' + linktext + '</a>';
								i = k;
							}
							break;
						default:
							newstr += com.charAt(i);
							break;
					}
				}
				this.viewDiscussion.chatUL.append('<li><img class="avatar" src="' + $('#ChatHeader .User img').attr('src') + '"><span class="username">' + wgUserName + '</span><span class="message" style="color:#999;"> (' + i18n['self'] + ') ' + newstr + '</span></li>');
			}
			else {
				this.viewDiscussion.chatUL.append('<li><img class="avatar" src="' + $('#ChatHeader .User img').attr('src') + '"><span class="username">' + wgUserName + '</span><span class="message" style="color:#999;"> (' + i18n['self'] + ')</span></li>');
			}
			this.viewDiscussion.scrollToBottom();
		},
		'help': function(com, text) {
			if(com) {
				var ref = com.replace(/ /g, '.');
				var str = '';
				var subcoms = [];
				var subdirs = [];
				while(typeof eval('window.commands.' + ref) == 'string') {ref.substring(0, ref.lastIndexOf('.')) + '.' + eval('window.commands' + ref).toLowerCase();}
				var command = eval('window.commands.' + ref);
				if(i18n['help-' + ref]) {str += i18n['help'].replace(/\$1/g, ref.replace(/\./g, ' ')).replace(/\$2/g, i18n['help-' + ref].replace(/\$1/g, i18n['example']).replace(/\$1/g, i18n['exampleuser']));}
				if(typeof command == 'object') {
					for(var i in command) {
						if(typeof command[i] == 'function') {subcoms.push(i);}
						if(typeof command[i] == 'object') {subdirs.push(i);}
					}
				}
				if(subcoms.length > 0) {str += '\n' + i18n['subcoms'] + ': ' + subcoms.join(', ');}
				if(subdirs.length > 0) {str += '\n' + i18n['subdirs'] + ': ' + subdirs.join(', ');}
				str = str.removeTrailing('\n');
				if(str != '') {this.inlineAlert(str);}
				else {this.inlineAlert(i18n['nohelp'].replace(/\$1/g, command));}
			}
			else {
				var str = [];
				for(var i in window.commands) {
					if(typeof window.commands[i] == 'function' || typeof window.commands[i] == 'object') {str.push(i);}
				}
				this.inlineAlert(i18n['commands'].replace(/\$1/g, str.join(', ')));
			}
		}
	};