/* 
 * ChatHacks.js, by Monchoman45.
 * Version 5.0.3
 * 
 * Features:
 *   Ability to clear your chat window
 *   A host of slash commands (including /me and /afk)
 *   Inline alerts every time your away status changes
 *   Icons next to messages by staff and chat mods in the room
 *   Pings when someone mentions your name or any other specified phrases
 */
$(function () {
	if(wgPageName == 'Special:Chat') {
		importScriptURI('http://monchbox.wikia.com/index.php?title=MediaWiki:APIQuery.js&action=raw&ctype=text/javascript'); //APIQuery for /unban
 
		$('head').append('<style type="text/css">\n.stafficon {\n\tmargin-bottom:-4px;\n}\n.modicon {\n\tmargin-bottom:-2px;\n}\n.UserStatsMenu {\n\tcolor:#000;\n}\n.Chat .continued {\n\ttop:0;\n\tmargin-bottom:0;\n}\n.Write [name="message"] {\n\twidth:93%;\n}\n.inline-alert span {\n\tcolor:#006CB0;\n\tcursor:pointer;\n}\n.inline-alert span:hover {\n\ttext-decoration:underline;\n}\n#pingspan {\n\tposition:absolute;\n\tz-index:5;\n\ttop:23px;\n\tmargin-left:15px;\n\tfont-size:15px;\n\tfont-weight:normal;\n\tline-height:15px;\n}\n#pings {\n\tresize:none;\n\tmargin-left:0;\n\tfont-size:12px;\n\theight:100px;\n\tdisplay:block;\n}\n#pingspan div span {\n\tfont-size:55%;\n}\n</style>');
 
		//Add a 'go afk' button and a 'clear chat' button
		$('#Write').append('<a class="wikia-button" href="javascript:toggleAway()" style="position:absolute; right:0;">AFK</a><a class="wikia-button" href="javascript:active().clearWindow()" style="position:absolute; right:0; bottom:2px;">Clear</a>');
		//Unbind all of the window listeners that set your status to back
		$(window).unbind('mousemove').unbind('focus').unbind('keypress');
		//Add the sound space
		$('body').append('<span id="sound"></span>');
		//Add the area for adding more pings
		$('#ChatHeader .wordmark').append('<span id="pingspan"><div>Ping phrases <span title="If a user says one of these phrases (case insensitive), you will be pinged">(?)</span></div><textarea id="pings" style="display:none;">' + ((readCookie('pingphrases')) ? readCookie('pingphrases').split('\\n').join('\n') : wgUserName) + '</textarea></span>');
		document.getElementById('pingspan').onmouseover = function(event) {document.getElementById('pings').style.display = 'block';}
		document.getElementById('pingspan').onmouseout = function(event) {document.getElementById('pings').style.display = 'none'; createCookie('pingphrases', document.getElementById('pings').value.split('\n').join('\\n'), 99999);}
	}
});
 
if(wgPageName == 'Special:Chat') {
	window.canding = false; //to prevent pinging people with scrollback
	setTimeout('window.canding = true', 10000); //lazy load quick fix
	window.ding = 0;
	window.titleorig = document.title;
	function Unding() { //for fixing the title after you've been dinged
		document.getElementsByTagName('title')[0].innerHTML = window.titleorig;
		clearInterval(window.ding);
	}
	$(window).bind('focus', Unding);
 
	mainRoom.model.users.staff = [];
	mainRoom.model.users.mods = [];
 
	//Make a list of mods and staff
	NodeRoomController.prototype.onInitial = function(message) {
		if(!this.isInitialized){
			_.each(this.model.chats.models, $.proxy(function(data) {
				this.model.chats.remove(data);
			},this)); 
 
			this.model.chats.trigger('clear');
			// On first connection, just update the entire model.
			this.model.mport(message.data);
			this.isInitialized = true;
		} else {
			// If this is a reconnect... go through the model that was given and selectively, only add ChatEntries that were not already in the collection of chats.
			var jsonObj = JSON.parse(message.data);
			var chatEntries = this.model.chats;
			_.each(jsonObj.collections.chats.models, function(item, index){
				var match = chatEntries.get(item.id);
				if(typeof match == "undefined"){
					$().log("Found a ChatEntry that must have occurred during reconnection. Adding it to the model...");
					var additionalEntry = new models.ChatEntry();
					additionalEntry.mport( JSON.stringify(item) );
					chatEntries.add(additionalEntry);
				}
			});
 
			// TODO: update the entire userlist (if the server went down or something, you're not going to get "part" messages for the users who are gone).
			// See BugzId 6107 for more info & partially completed code.
		}
 
		for(var i in this.afterInitQueue) {
			this.socket.send(this.afterInitQueue[i]);   
		} 
 
		this.afterInitQueue = [];
 
		this.model.users.staff = [];
		this.model.users.mods = [];
		var list = document.getElementById('WikiChatList').getElementsByTagName('li');
		for(var i in list) {
			if(list[i].className) {
				var classes = list[i].className.split(' ');
				var user = false;
				var isstaff = false;
				var mod = false;
				for(var j in classes) {
					if(classes[j] == 'User') {user = true;}
					if(classes[j] == 'staff') {isstaff = true;}
					if(classes[j] == 'chat-mod') {mod = true;}
				}
				if(isstaff && user) {
					this.model.users.staff.push(list[i].getElementsByTagName('span')[0].innerHTML);
				}
				else if(mod && user) {
					this.model.users.mods.push(list[i].getElementsByTagName('span')[0].innerHTML);
				}
			}
		}
		window.canding = true;
	}
 
	//Add/remove mods when people join/leave
	NodeChatUsers.prototype.addUser = function (user) {
		if(user.attributes.isStaff == true) {
			var isstaff = true;
			for(var i in this.staff) {if(this.staff[i] == user.attributes.name) {isstaff = false;}}
			if(isstaff == true) {this.staff.push(user.attributes.name);}
		}
		else if(user.attributes.isModerator == true) {
			var mod = true;
			for(var i in this.mods) {if(this.mods[i] == user.attributes.name) {mod = false;}}
			if(mod == true) {this.mods.push(user.attributes.name);}
		}
		var view = new UserView({model: user});
		var list = (user.attributes.isPrivate) ? $('#PrivateChatList') : $('#WikiChatList');			
		var el = $(view.render().el);
 
		// For private chats, show private headline and possibly select the chat		
		if(user.get('isPrivate')) {
			$('#Rail h1.private').show();
			if(user.get('active')) {
				el.addClass('selected');	
			}
		}
 
		// Add users to list
		if (list.children().length) {
			// The list is not empty. Arrange alphabetically.
			var compareA = el.data('user').toUpperCase();
			var wasAdded = false;
			list.children().each(function(idx, itm) {
				compareB = $(itm).data('user').toUpperCase();
				if (compareA < compareB) {
					$(itm).before(el);
					wasAdded = true;
					return false;
				}
			});
			if (!wasAdded) {
				list.append(el);
			}
		} else {
			// The list is empty. Append this user.
			list.append(el);
		}
 
		// Scroll the list down if a new private chat is being added
		if (user.get('isPrivate')) {
			$().log('UserView SCROLL DOWN!!!');
			$('#Rail').scrollTop($('#Rail').get(0).scrollHeight);		
		}
 
		// Only show chevron in public chat if there is anyone to talk to
		if (list.children().length > 1) {
			$('#Rail .public .chevron').show();
		} else {
			$('#Rail .public .chevron').hide();
		}		
	}
	NodeChatUsers.prototype.removeUser = function (user) {
		for(var i in this.mods) {if(this.mods[i] == user.attributes.name) {this.mods.splice(i, 1);}}
		for(var i in this.staff) {if(this.staff[i] == user.attributes.name) {this.staff.splice(i, 1);}}
		var view = new UserView({model: user});
		view.getUserElement().remove();
	}
	mainRoom.model.users.unbind('add');
	mainRoom.model.users.unbind('remove');
	mainRoom.model.users.bind('add', mainRoom.viewUsers.addUser);
	mainRoom.model.users.bind('remove', mainRoom.viewUsers.removeUser);
 
	//Put images on mod and staff posts when they're added, ping if you've been mentioned
	NodeChatDiscussion.prototype.addChat = function (chat) {
		// Determine if chat view is presently scrolled to the bottom
		var isAtBottom = false;				
		if (( this.chatDiv.scrollTop() + 1) >= (this.chatUL.outerHeight() - this.chatDiv.height())) {
			isAtBottom = true;
		}
 
		// Add message to chat
		var view = new ChatView({model: chat});
		this.chatUL.append(view.render().el);
		var icon = '';
		for(var i in this.model.users.staff) {if(this.model.users.staff[i] == chat.attributes.name) {icon = ' <img class="stafficon" src="/extensions/wikia/Chat/images/icon-staff.png">'}}
		for(var i in this.model.users.mods) {if(this.model.users.mods[i] == chat.attributes.name) {icon = ' <img class="modicon" src="/extensions/wikia/Chat/images/icon-chatmod.png">'}}
		if(icon) {this.chatUL.children().last().children('.username').html(this.chatUL.children().last().children('.username').html() + icon);}
 
		if(window.canding && chat.attributes.name != wgUserName && !chat.attributes.isInlineAlert) {
			var text = document.createElement('span');
			text.innerHTML = chat.attributes.text;
			text = text.textContent;
			var pings = document.getElementById('pings').value.split('\n');
			for(var i = 0; i < pings.length; i++) {
				if(text.toLowerCase().indexOf(pings[i].toLowerCase()) != -1) {
					$('#sound').html('<embed src="http://images.wikia.com/monchbox/images/0/01/Beep-sound.ogg" hidden="true" autostart="true" loop="false" />');
					window.ding = setInterval('FlashTitle()', 500);
					this.scrollToBottom();
					var ref = text.toLowerCase().indexOf(pings[i].toLowerCase());
					var phrase = text.slice(ref, ref + pings[i].length);
					this.chatUL.children().last().children('.message').html(text.replace(phrase, '<span style="color:red;">' + phrase + '</span>'));
					break;
				}
			}
		}
 
		// Scroll chat to bottom
		if (chat.attributes.name == wgUserName || isAtBottom) {
			this.scrollToBottom();
		}
	}
	mainRoom.model.chats.unbind('afteradd');
	mainRoom.model.chats.bind('afteradd', $.proxy(mainRoom.viewDiscussion.addChat, mainRoom.viewDiscussion));
 
	//Add a custom inline alert that tells you when your status changes
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
		if( ! this.comingBackFromAway){ // if we have sent this command (but just haven't finished coming back yet), don't keep spamming the server w/this command
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
 
	//Parse messages before they're sent
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
				if( this.mainController != null ) { //is prive
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
			case '/kick':
			case '/ban':
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
}

/* 
 * i18n for User:Monchoman45/ChatHacks.js
 * Please suggest new translations or corrections to translations on my talk page (User talk:Monchoman45).
 */
 
switch(wgUserLanguage) {
 
	case 'es':
 
		var i18n = {
			'activity': 'Activity - $1 chat',
			'afk': 'AFK',
			'away': 'Se encuentra auyense.',
			'back': 'Ya no esta ausente.',
			'clear': 'Borrar',
			'cleared': 'Ventana borrada.',
			'commands': 'Commands: $1',
			'coppa': '- You must be 13 or older to legally have an account on Wikia.',
			'demodded': '$1 was demodded.',
			'emote': 'Emote',
			'erruser': '$1 error: User must be specified',
			'errroom': '$1 error: Room id must be specified',
			'example': 'Ejemplo',
			'exampleuser': 'ExampleUser',
			'help': 'Help - /$1: $2',
			'help-afk': 'Toggles your away status.\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/afk\')">/afk</span>',
			'help-clear': 'Clears the currently open chat window.\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/clear\')">/clear</span>',
			'help-room': 'Invokes a private room.\nNames must be separated by a hashtag (#).\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/room $2\')">/room $2</span>',
			'help-block': 'Blocks the specified user from private chatting you.\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/block $2\')">/block $2</span>',
			'help-unblock': 'Unblocks the specified user from private chatting you.\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/unblock $2\')">/unblock $2</span>',
			'help-kickban': 'Kickbans the specified user.\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/kickban $2\')">/kickban $2</span>',
			'help-part': 'Leaves the current chat room.\nAn id can also be specified for leaving a particular chat room.\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/part\')">/part</span>',
			'help-help': 'Displays information about other commands.\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/help\')">/help</span>',
		}
		break;
}
 
//Add a 'go afk' button and a 'clear chat' button
$('#Write').append('<a class="wikia-button" href="javascript:toggleAway()" style="position:absolute; right:0; top:0;">' + i18n['afk'] + '</a><a class="wikia-button" href="javascript:active().clearWindow()" style="position:absolute; right:0; bottom:2px;">' + i18n['clear'] + '</a>');
$('#ChatHeader .wordmark').append('<span id="pingspan"><div>' + i18n['pingphrases'] + ' <span title="' + i18n['pingphrasestooltip'] + '">(?)</span></div><textarea id="pings" style="display:none;">' + ((readCookie('pingphrases')) ? readCookie('pingphrases').split('\\n').join('\n') : wgUserName) + '</textarea></span>');
//Add an interface for adding pings
document.getElementById('pingspan').onmouseover = function(event) {document.getElementById('pings').style.display = 'block';}
document.getElementById('pingspan').onmouseout = function(event) {document.getElementById('pings').style.display = 'none'; createCookie('pingphrases', document.getElementById('pings').value.split('\n').join('\\n'), 99999);}
 
mainRoom.inlineAlert(i18n['init']);