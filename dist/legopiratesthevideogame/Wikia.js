




/* 
 * ChatHacks.js, 
 * 
 * Features:
 *   Imports all of your code files
 *   UTC timestamps on every message
 *   Ability to clear your chat window
 *   A message preparser with /me, /afk, /away, /clear, /self, and /kickban (sort of)
 *   Inline alerts every time your away status changes
 *   Coloring for your username and the usernames of chat mods in the room
 */
$(function () {
	if(wgPageName == 'Special:Chat') {
		$('body').prepend('<style type="text/css">.chat-mod, .mod, .mod::after {color:#da0;} .chat-mod.away {color:#eda;} .ChatHeader .username, .you .username, .you .username::after {color:#00c;} .UserStatsMenu {color:#000;} .Chat .continued {top:0; margin-bottom:0;} .Write input[type="text"] {width:90%;}</style>');
 
		//Add a 'go afk' button
		$('#Write').append('<a class="wikia-button" href="javascript:ToggleAway()" style="margin-left:3px;">AFK</a>');
		//Unbind all of the listeners that set your status to back
		$(window).unbind('mousemove').unbind('focus').unbind('keypress');
		//Set status to back when you press enter
		$('input[name=message]').bind('keypress', function () {if(event.keyCode == 13) {NodeChatHelper.resetActivityTimer();}});
		//Add a 'clear chat' button
		$('#Write').append('<a class="wikia-button" href="javascript:$(\'.Chat ul\').html(\'\')" style="margin-left:6px;">Clear</a>');
 
		window.mods = [];
		window.list = document.getElementById('Users').getElementsByTagName('ul')[0].getElementsByTagName('li');
		for(i = 0; i < list.length; i++) {
			if(list[i].className.split(' ')[1] == 'chat-mod') {
				mods.push(list[i].id.substring(5, list[i].id.length));
			}
		}
 
		//Add/remove mods when people join/leave
		NodeChatController.view.model.users._callbacks.add[0] = function(user) {
			if(user.attributes.isModerator == true) {
				var add = true;
				for(i in mods) {if(mods[i] == user.attributes.name) {add = false;}}
				if(add == true) {mods.push(user.attributes.name)}
			}
			var view = new UserView({model: user});
			$('#Users > ul').append(view.render().el);
		}
		NodeChatController.view.model.users._callbacks.remove[0] = function(user) {
			NodeChatHelper.log("Trying to remove " + user.get('name') + " from the list.");
			NodeChatHelper.log("Matches found: " + $('#' + NodeChatHelper.liIdByUsername( user.get('name') )).length);
			for(i in mods) {if(mods[i] == user.attributes.name) {mods[i] = undefined;}}
			$('#' + NodeChatHelper.liIdByUsername( user.get('name') )).remove();
		}
		//Color mod posts when they're added, add timestamps to all non-inline alert messages
		NodeChatController.view.model.chats._callbacks.add[0] = function (chat) {
			// Determine if chat view is presently scrolled to the bottom
			var isAtBottom = false;             
			if (($("#Chat").scrollTop() + 1) >= ($("#Chat ul").outerHeight() - $("#Chat").height())) {
				isAtBottom = true;
			}
 
			// Add message to chat
			var view = new ChatView({model: chat});
			for(i in mods) {if(mods[i] == view.model.attributes.name) {view.model.attributes.name = '<span class="mod">' + view.model.attributes.name + '</span>'}}
			if(view.model.attributes.msgType == 'chat') {
				var date = new Date();
				if(date.getUTCHours() >= 10) {var hours = date.getUTCHours();}
				else {var hours = '0' + date.getUTCHours();}
				if(date.getUTCMinutes() >= 10) {var minutes = date.getUTCMinutes();}
				else {var minutes = '0' + date.getUTCMinutes();}
				view.model.attributes.text = '<span class="timestamp">[' + hours + ':' + minutes + ']</span> ' + view.model.attributes.text;
			}
			$('#Chat ul').append(view.render().el);
 
			// Scroll chat to bottom
			if (chat.attributes.name == wgUserName || isAtBottom) {
				NodeChatHelper.scrollToBottom();
			}
		}
 
		//Add a custom inline alert that tells you when your status changes
		NodeChatController.view.setAway = function (){
			var msg = '';
			//var msg = $(e.target).parent().find('.user').html();
			//if(!msg){msg = '';}
			NodeChatHelper.log("Attempting to go away with message: " + msg);
			var setStatusCommand = new models.SetStatusCommand({
				statusState: STATUS_STATE_AWAY,
				statusMessage: msg
			});
			InlineAlert('You are now away.');
			this.socket.send(setStatusCommand.xport());
		}
		NodeChatController.view.setBack = function (){
			NodeChatHelper.log("Attempting to come BACK from away.");
			var setStatusCommand = new models.SetStatusCommand({
				statusState: STATUS_STATE_PRESENT,
				statusMessage: ''
			});
			InlineAlert('You are no longer away.');
			this.socket.send(setStatusCommand.xport());
		}
 
		//Parse messages before they're sent
		$('#Write').unbind('submit'); //unbind the default, because it uses 6 nested function calls that make it impossible to know what the object reference is
		NodeChatController.view.sendMessage = function(){
			var inputField = $('input[name=message]');
			var nameField = $('input[name=user_name]');
			if (inputField.val()) {
				//Preparse message - will return true or false, based on whether the message should still be sent or not
				var send = Preparse(inputField.val());
				if(send == true) {
					chatEntry = new models.ChatEntry({name: nameField.val(), text: inputField.val()});
					this.socket.send(chatEntry.xport());
				}
				inputField.val('');
			}
			NodeChatHelper.focusTextInput();
		}
		$('#Write').bind('submit', function(){NodeChatController.view.sendMessage.call(NodeChatController.view);}); //rebind our new function, even though it'll throw an XHR POST error every time we send
	}
});
 
function InlineAlert(text) {
	$('.Chat ul').append('<li class="inline-alert">' + text + '</li>');
	NodeChatHelper.scrollToBottom();
}
 
function Preparse(input) {
	var text = input.split(' ');
	switch(text[0]) {
		case '/away':
		case '/afk':
			ToggleAway();
			return false;
			break;
		case '/clear':
			$('.Chat ul').html('');
			InlineAlert('Window cleared.');
			return false;
			break;
		case '/kickban':
			//NodeChatController.view.kickBan(build(text, 1));
			return false;
			break;
		case '/self':
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
				$('.Chat ul').append('<li><img class="avatar" src="' + $('#ChatHeader .User img').attr('src') + '"><span class="username"><span class="me">' + wgUserName + '</span></span><span class="message" style="color:#999;"> (self) ' + newstr + '</span></li>');
			}
			else {
				$('.Chat ul').append('<li><img class="avatar" src="' + $('#ChatHeader .User img').attr('src') + '"><span class="username"><span class="me">' + wgUserName + '</span></span><span class="message" style="color:#999;"> (self)</span></li>');
			}
			NodeChatHelper.scrollToBottom();
			return false;
			break;
		case '/me':
			if(text[1] != undefined) {$('input[name="message"]').val('* ' + wgUserName + ' ' + build(text, 1));}
			else {$('input[name="message"]').val('* ' + wgUserName);}
			return true;
			break;
		default:
			return true;
			break;
	}
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
 
function ToggleAway() {
	if($('#ChatHeader .User').hasClass('away') == true) {
		NodeChatController.view.setBack();
	}
	else {
		NodeChatController.view.setAway();
	}
}