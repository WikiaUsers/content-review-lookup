if(wgCanonicalSpecialPageName == 'Chat') {
	window.hasFocus = true;
	window.dinged = false;
	window.ding = 0;
	window.titleorig = document.title;
	function Unding() {
		document.getElementsByTagName('title')[0].innerHTML = window.titleorig;
		clearInterval(window.ding);
		window.dinged = false;
	}
	$(window).bind('focus', Unding);
	$(window).bind('focus', function() {window.hasFocus = true;});
	$(window).bind('blur', function() {window.hasFocus = false;});
 
	NodeChatDiscussion.prototype.iconPing = function (chat) {
		var icon = '';
		for(var i in this.model.users.models) {
			if(this.model.users.models[i].attributes.name == chat.attributes.name) {
				if(this.model.users.models[i].attributes.isModerator) {
					icon = ' <img class="modicon" src="https://images.wikia.nocookie.net/__cb20140614221604/sonic-fan-universe/images/9/96/Icon.png">';
				}
				break;
			}
		}
		if(icon) {this.chatUL.children().last().children('.username').html(this.chatUL.children().last().children('.username').html() + icon);}
 
		if(mainRoom.isInitialized && chat.attributes.name != wgUserName && !chat.attributes.isInlineAlert) {
			window.dinged = true;
			var text = chat.attributes.text;
			var pings = document.getElementById('pings').value.removeTrailing('\n').split('\n');
			for(var i = 0; i < pings.length; i++) {
				if(text.toLowerCase().indexOf(pings[i].toLowerCase()) != -1 || this != mainRoom.viewDiscussion) {
					if(!window.hasFocus) {
						document.getElementById('sound').innerHTML = '<audio src="https://images.wikia.nocookie.net/sonic-fan-universe/images/c/cf/Ping.ogg" autoplay=""></audio>';
						if(!window.dinged) {window.ding = setInterval('FlashTitle()', 500);}
					}
					this.scrollToBottom();
					if(this == mainRoom.viewDiscussion) {
						var ref = text.toLowerCase().indexOf(pings[i].toLowerCase());
						var phrase = text.slice(ref, ref + pings[i].length);
						this.chatUL.children().last().children('.message').addClass('ping');
					}
					break;
				}
			}
		}

		this.chatUL.children().last().children('.message img').each(function() {this.outerHTML = '<span onclick="this.outerHTML = decodeURIComponent(\'' + encodeURIComponent(this.outerHTML) + '\');" style="color:blue; cursor:pointer;" title="' + i18n['emote'] + '">' + this.title + '</span>';});
	}
	mainRoom.model.chats.bind('afteradd', $.proxy(mainRoom.viewDiscussion.iconPing, mainRoom.viewDiscussion));

	NodeChatController.prototype.setAway = function (msg){
		if(!msg) {var msg = '';}
		$().log("Attempting to go away with message: " + msg);
		var setStatusCommand = new models.SetStatusCommand({
			statusState: STATUS_STATE_AWAY,
			statusMessage: msg
		});
		this.inlineAlert(i18n['away']);
		this.socket.send(setStatusCommand.xport());
	}
	NodeChatController.prototype.setBack = function (){
		if( !this.comingBackFromAway ) {
			$().log("Telling the server that I'm back.");
			this.comingBackFromAway = true;
			var setStatusCommand = new models.SetStatusCommand({
				statusState: STATUS_STATE_PRESENT,
				statusMessage: ''
			});
			this.inlineAlert(i18n['back']);
			this.socket.send(setStatusCommand.xport());
		}
	}
 
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
				if( this.isPrivate == true ) {
					if( this.afterInitQueue.length < 1 || this.model.users.length < 2 ){
						this.mainController.socket.send( this.model.privateRoom.xport() );
					}
					if( !this.isInitialized  ) {
						this.afterInitQueue.push(chatEntry.xport());
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
 
			if( !this.isPrivate ) {
				var newChatEntry = new models.InlineAlert({text: $.msg('chat-user-joined', [joinedUser.get('name')] ) });
				this.model.chats.add(newChatEntry);				
			}
 
			this.disableRoom(joinedUser, false);
		} else {
			this.model.users.remove(connectedUser);
			this.model.users.add(joinedUser);
		}		
	}
	NodeRoomController.prototype.onPart = function(message) {
		var partedUser = new models.User();
		partedUser.mport(message.data);
 
		var connectedUser = this.model.users.findByName(partedUser.get('name'));
 
		if(typeof connectedUser != "undefined"){
 
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
			var privateUser =  this.model.privateUsers.findByName(user.get('name'));
 
			if(typeof privateUser != "undefined"){
				var roomId = privateUser.get('roomId');
				if( typeof( this.chats.privates[roomId] ) != "undefined" ){
					this.chats.privates[roomId].model.room.set({ 
						'blockedMessageInput': flag
					});
				}
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
		this.chats.opens[roomId].mainController = this;
		this.showRoom(roomId);
		this.chats.opens[roomId].init();
	}

	NodeChatController.prototype.inlineAlert = function(text) {
		for(var i in text.split('\n')) {
			this.viewDiscussion.chatUL.append('<li class="inline-alert">' + text.split('\n')[i] + '</li>');
		}
		this.viewDiscussion.scrollToBottom();
	}
 
	function FlashTitle() {
		if(document.getElementsByTagName('title')[0].innerHTML == window.titleorig) {
			document.getElementsByTagName('title')[0].innerHTML = i18n['activity'].replace(/\$1/g, wgSiteName);
		}
		else {
			document.getElementsByTagName('title')[0].innerHTML = window.titleorig;
		}
	}
 
 
	function Preparse(input) {
		if(input.charAt(0) == '/') {
			var com = input.split(' ');
			com[0] = com[0].substring(1, com[0].length);
			var ref = '.' + com[0].toLowerCase();
			if(window.commands[com[0].toLowerCase()] == undefined) {return true;}
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
 
	window.commands = {
		'away': 'afk',
		'afk': function(com, text) {
			if($('#ChatHeader .User').hasClass('away') == false) {toggleAway();}
		},
		'clear': function(com, text) {
			this.clearWindow();
		},
		'kick': 'kickban',
		'ban': 'kickban',
		'kb': 'kickban',
		'kickban': function(com, text) {
			if(com) {
				var mod = new models.KickBanCommand({userToBan: com});
				this.socket.send(mod.xport());
			}
			else {this.inlineAlert(i18n['erruser'].replace(/\$1/g, text.split(' ')[0]));}
		},
		'unban': function(com, text) {
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
		'mod': function(com, text) {
			if(com) {
				var giveChatModCommand = new models.GiveChatModCommand({userToPromote: com});
	        		this.socket.send(giveChatModCommand.xport());
			}
			else {this.inlineAlert(i18n['erruser'].replace(/\$1/g, text.split(' ')[0]));}
		},
		'demod': function(com, text) {
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
		'block': function(com, text) {
			if(com) {this.blockPrivate({name: com});}
			else {this.inlineAlert(i18n['erruser'].replace(/\$1/g, text.split(' ')[0]));}
		},
		'unblock': function(com, text) {
			if(com) {this.allowPrivate({name: com});}
			else {this.inlineAlert(i18n['erruser'].replace(/\$1/g, text.split(' ')[0]));}
		},
		'chat': 'private',
		'room': 'private',
		'private': function(com, text) {
			if(com) {
				var arr = com.split('#');
				for(var i in arr) {array[i] = arr[i].removeTrailing(' ');}
				mainRoom.openPrivateChat(arr);
			}
			else {this.inlineAlert(i18n['erruser'].replace(/\$1/g, text.split(' ')[0]));}
		},

		'roomid': 'id',
		'id': function(com, text) {
			this.inlineAlert(i18n['id'] + ': ' + this.roomId);
		},
		'self': function(com, text) {
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
	toggleAway.back = function() {
		if($('#ChatHeader .User').hasClass('away') == true) {mainRoom.setBack();}
	}
	toggleAway.away = function(msg) {
		if(!msg) {var msg = '';}
		if($('#ChatHeader .User').hasClass('away') == false) {mainRoom.setAway(msg);}
	}
 
	NodeChatController.prototype.clearWindow = function() {
		this.viewDiscussion.chatUL.html('');
		this.inlineAlert(i18n['cleared']);
	}
 
	function active() {
		if(mainRoom.activeRoom && mainRoom.activeRoom != 'main') {return mainRoom.chats.privates[mainRoom.activeRoom];}
		else {return mainRoom;}
	}
 
	String.prototype.removeTrailing = function(char) {
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
		importScriptURI('http://c.wikia.com/index.php?title=User:Monchoman45/ChatHacks.js/i18n.js&action=raw&ctype=text/javascript');
		importScriptURI('http://monchbox.wikia.com/index.php?title=MediaWiki:APIQuery.js&action=raw&ctype=text/javascript');
 
		$('head').append('<style type="text/css">\n.stafficon {\n\tmargin-bottom:-4px;\n\twidth:14px;\n\theight:14px;\n}\n.modicon {\n\tmargin-bottom:-3px;\n\twidth:14px;\n\theight:14px;\n}\n.UserStatsMenu {\n\tcolor:#000;\n}\n.Write [name="message"] {\n\twidth:93%;\n}\n.inline-alert span {\n\tcolor:#006CB0;\n\tcursor:pointer;\n}\n.inline-alert span:hover {\n\ttext-decoration:underline;\n}\n#pingspan {\n\tposition:absolute;\n\tz-index:5;\n\ttop:23px;\n\tmargin-left:15px;\n\tfont-size:15px;\n\tfont-weight:normal;\n\tline-height:15px;\n}\n#pings {\n\tresize:none;\n\tmargin-left:0;\n\tfont-size:12px;\n\theight:100px;\n\tdisplay:block;\n}\n#pingspan div span {\n\tfont-size:55%;\n}\n#ChatHeader {\n\tz-index:9999;\n}\n#ChatHeader {\n\tz-index:9999;\n}\n.message.ping {\n\tcolor:red;\n}\n</style>');
 
		$(window).unbind('mousemove').unbind('focus').unbind('keypress');
		$('body').append('<span id="sound" style="display:none;"></span>');
	});
}
else {
	$(function () {
		var a = document.getElementsByTagName('a');
		for(var i = 0; i < a.length; i++) {
			if(a[i].href && a[i].href.indexOf('/wiki/Special:Chat') != -1) {
				a[i].addEventListener('click', function(event) {event.preventDefault(); OpenChatWindow();});
				a[i].removeAttribute('data-canonical');
			}
		}
		if(document.body.className.indexOf('skin-oasis') != -1) {window.chatcheck = setInterval('ChatCheck()', 200);}
	});
 
	function ChatCheck() {
		if($('.chat-join button').length != 0) {
			$('.chat-join button').replaceWith('<a class="wikia-button" onclick="OpenChatWindow()">' + $('.chat-join button').html() + '</a>');
			clearInterval(window.chatcheck);
		}
	}
 
	function OpenChatWindow() {
		window.chatwindow = window.open('/wiki/Special:Chat?useskin=wikia', 'chat');
		window.chatwindow.onload = function () {
			window.chatwindow.importScriptPage('User:' + wgUserName + '/global.js', 'c');
			window.chatwindow.importScript('User:' + wgUserName + '/wikia.js');
		}
	}
}