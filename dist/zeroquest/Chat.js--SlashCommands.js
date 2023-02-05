/* 
 * Based on ChatHacks.js, by Monchoman45.
 * Modified for the Saints Row Wiki by User:452
 * If you copy any part of this script, you are required to attribute the source.
 * 
 *   Type /help in the chat for a list of available commands.
 */
window.Version['SlashCommands'] = "2014-08-08 - custom status support, error messages";

if(wgCanonicalSpecialPageName == 'Chat') {
	var i18n = {
		'clear': 'Clear',
		'cleared': 'Window cleared.',
		'commands': 'Commands: $1',
		'demodded': '$1 was demodded.',
		'erruser': '$1 error: User must be specified',
		'example': 'Example',
		'exampleuser': 'ExampleUser',
		'help': 'Help - /$1: $2',
		'help-auto': 'Sets your away status to auto.\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/auto\')">/auto</span>',
		'help-away': 'Sets your away status to away.\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/away\')">/away</span>',
		'help-here': 'Sets your away status to here.\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/here\')">/here</span>',
		'help-me': 'Emote yourself. Similar to IRC\'s /me.\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/me likes chat hacks\')">/me likes chat hacks</span>',
		'help-clear': 'Clears the currently open chat window.\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/clear\')">/clear</span>',
		'help-mod': 'Gives the specified user chat mod status.\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/mod $2\')">/mod $2</span>',
		'help-block': 'Blocks the specified user from private chatting you.\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/block $2\')">/block $2</span>',
		'help-unblock': 'Unblocks the specified user from private chatting you.\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/unblock $2\')">/unblock $2</span>',
		'help-kick': 'Kicks the specified user.\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/kick $2\')">/kick $2</span>',
		'help-ban': 'Bans the specified user.\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/ban $2\')">/ban $2</span>',
		'help-join': 'Joins the chat room with the specified id.\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/join 10\')">/join 10</span>',
		'help-part': 'Leaves the current chat room.\nAn id can also be specified for leaving a particular chat room.\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/part\')">/part</span>',
		'help-id': 'Returns the room id of the room you\'re in.\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/id\')">/id</span>',
		'help-help': 'Displays information about other commands.\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/help\')">/help</span>',
		'help-random': 'Random emoticon.\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/random\')">/random</span>',
		'help-quote': 'Random quote.\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/quote\')">/quote</span>',
		'help-reconnect': 'Reconnect to chat and restore chat history.\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/reconnect\')">/reconnect</span>',
		'help-reload': 'Reload emoticons.\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/reload\')">/reload</span>',
		'help-silence': 'Toggle silence.\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/silence\')">/silence</span>',
		'help-version': 'Shows chathacks version info.\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/version\')">/version</span>',
		'help-unban': 'unban a user.\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/unban\')">/unban</span>',
		'help-demod': 'demod a user.\n$1: <span onclick="mainRoom.viewDiscussion.getTextInput().val(\'/demod\')">/demod</span>',
		'id': 'id',
		'nohelp': 'No help data found for /$1',
		'notbanned': '$1 is not banned.',
		'notmod': '$1 is not a mod.',
		'subcoms': 'Subcommands',
		'subdirs': 'Subdirectories',
		'unbanned': '$1 was unbanned.'
	}	
 
	//Send message function
	NodeChatController.prototype.sendMessage = function (event) {
		if(!this.active) {
			return true;
		}
 
		if (event.which == 13 && !event.shiftKey) {
			event.preventDefault();
			mainRoom.resetActivityTimer();
			if ($("li.User[data-user='"+wgUserName+"']").hasClass('away')) mainRoom.setBack();
			var inputField = this.viewDiscussion.getTextInput();

			//support for user-defined replacement functions
			if (window.userReplacement) {
			  inputField.val(window.userReplacement(inputField.val()));
			}
			//emoticons after newlines aren't rendered, fixed by adding a space after newlines.
			inputField.val(inputField.val().replace(/\n/g,"\n "));

			if(!chatOptions.options.emoticonDisable)
				while (inputField.val().indexOf("!random") != -1)
					inputField.val(inputField.val().replace("!random"," "+randomEmoticon()));

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
 
	function Preparse(input) { //Parse slash commands.
		if(input.charAt(0) == '/') {
			var args = input.substring(1).split(' ');
			var command = args[0].toLowerCase();
			if(window.commands[command ] == undefined) return input;
			else return eval('window.commands.' + command).call(this, args.slice(1).join(' '), input);
		}
		else {return true;}
	}
 
	window.commands = {
		'auto': function(args, text) {
			if (typeof toggleStatus != 'function') this.inlineAlert("You must enable 'Status Buttons' to use that command");
			else toggleStatus(0); //if you're away, hitting enter has already sent you back
		},
		'away': function(args, text) {
			if (typeof toggleStatus != 'function') this.inlineAlert("You must enable 'Status Buttons' to use that command");
			else if($("li.User[data-user='"+wgUserName+"']").hasClass('away') == true)
				toggleStatus(0);
			else
				toggleStatus(1);
		},
		'here': function(args, text) {
			if (typeof toggleStatus != 'function') this.inlineAlert("You must enable 'Status Buttons' to use that command");
			else toggleStatus(2);
		},
		'status': function(args, text) {
			newStatus(args);
			$(".setStatus").css('display','block');
		},
		'reconnect': function(args, text) { //reconnect - requires disconnectCheck enabled.
			if(typeof reconnect != 'function') this.inlineAlert("You must enable 'DisconnectCheck' to use that command");
			else reconnect(args);
		},
		'clear': function(args, text) { //Clear the active chat window
			this.clearWindow();
		},
		'version': function(args, text) {
			var enabledModules = "";
			for (i in chatOptions.modules) if (chatOptions.modules[i].loaded) enabledModules += i+", ";
			this.inlineAlert("Enabled: "+enabledModules);
			for (i in window.Version) {
				this.inlineAlert(i+": "+window.Version[i]);
			}
		},
		'random': function(args, text) {
			if(chatOptions.options.emoticonDisable) this.inlineAlert("You must enable emoticons to use that command");
			else mainRoom.socket.send(new models.ChatEntry({text: randomEmoticon()}).xport());
		},
		'quote': function(args, text) {
			randomQuote(args);
		},
		'silence': function(args, text) {
			if(typeof toggleBeep != 'function') this.inlineAlert("You must enable 'Sounds' to use that command");
			else toggleBeep();
		},
		'reload': function(args, text) {
			emoticonReload();
		},
		'kick': function(args, text) { //Kick a user 
			if(args) this.socket.send(new models.KickCommand({userToKick: args}).xport());
			else {this.inlineAlert(i18n['erruser'].replace(/\$1/g, text.split(' ')[0]));}
		},
		'ban': function(args, text) { //Kickban a user
			if(args) {
				mainRoom.socket.send(new models.BanCommand({userToBan: args.split(",")[0], time:args.split(",")[1],reason:args.split(",")[2]}).xport());
			}
			else {this.inlineAlert(i18n['erruser'].replace(/\$1/g, text.split(' ')[0]));}
		},
		'unban': function(args, text) { //Unban a user
			if(args) {
				api.newQuery('POST', 'action=userrights&user=' + args + '&remove=bannedfromchat', function(result) {
					if(result.userrights.removed[0] == 'bannedfromchat') {
						mainRoom.inlineAlert(i18n['unbanned'].replace(/\$1/g, args));
					}
					else {
						mainRoom.inlineAlert(i18n['notbanned'].replace(/\$1/g, args));
					}
				});
				api.send(0, true);
			}
			else {this.inlineAlert(i18n['erruser'].replace(/\$1/g, text.split(' ')[0]));}
		},
		'mod': function(args, text) { //Make a user a mod
			if(args) {
				this.socket.send(new models.GiveChatModCommand({userToPromote: args}).xport());
			}
			else {this.inlineAlert(i18n['erruser'].replace(/\$1/g, text.split(' ')[0]));}
		},
		'demod': function(args, text) { //Remove a user's mod right
			if(args) {
				api.newQuery('POST', 'action=userrights&user=' + args + '&remove=chatmoderator', function(result) {
					if(result.userrights.removed[0] == 'chatmoderator') {
						mainRoom.inlineAlert(i18n['demodded'].replace(/\$1/g, args));
					}
					else {
						mainRoom.inlineAlert(i18n['notmod'].replace(/\$1/g, args));
					}
				});
				api.send(0, true);
			}
			else {this.inlineAlert(i18n['erruser'].replace(/\$1/g, text.split(' ')[0]));}
		},
		'block': function(args, text) { //Block a user from private chatting you
			if(args) {this.blockPrivate({name: args});}
			else {this.inlineAlert(i18n['erruser'].replace(/\$1/g, text.split(' ')[0]));}
		},
		'unblock': function(args, text) { //Unblock a user from private chatting you - should merge this into a toggle
			if(args) {this.allowPrivate({name: args});}
			else {this.inlineAlert(i18n['erruser'].replace(/\$1/g, text.split(' ')[0]));}
		},
		'id': function(args, text) {
			this.inlineAlert(i18n['id'] + ': ' + this.roomId);
		},
		'help': function(args, text) {
			if(args) {
				var ref = args.replace(/ /g, '.');
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
	NodeChatController.prototype.clearWindow = function() {
		this.viewDiscussion.chatUL.html('');
		this.inlineAlert(i18n['cleared']);
	}
 
	String.prototype.removeTrailing = function(char) { //Remove extraneous characters
		var str = this;
		while(str.charAt(0) == char) {str = str.substring(1, str.length);}
		while(str.charAt(str.length - 1) == char) {str = str.substring(0, str.length - 1);}
		return str;
	}
 
	$(function () {
		$('head').append('<style type="text/css">\n.stafficon {\n\tmargin-bottom:-4px;\n\twidth:14px;\n\theight:14px;\n}\n.modicon {\n\tmargin-bottom:-3px;\n\twidth:14px;\n\theight:14px;\n}\n.UserStatsMenu {\n\tcolor:#000;\n}\n.Write [name="message"] {\n\twidth:100%;\n}\n</style>');
	});
}