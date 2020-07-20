
/**
 * Wikia ChatPlugins
 * Change some options on Special:Chat to make it easier 
 * to use and more useful in general.
 * 
 * WARNING
 * Make sure you are not loading MediaWiki:Chat.js/load.js 
 * with MediaWiki:Chat-edit-count.
 * Load it with MediaWiki:Chat-welcome-message, or this
 * will malfunction badly.
 */


/** ================================== **
 ** Initialize main ChatPlugins object **
 ** ================================== **/
var ChatPlugins = {
	release: {
		version: 1.0,
		branch: "Stable"
	},
	models: {
		feature: function(id, name, access, script) {
			this.enabled = false;
			this.id = id;
			this.name = name;
			this.access = access;
			this.script = script;
		},
		alert: function(text) {
			newInlineAlert = new models.InlineAlert;
			newInlineAlert.attributes.text = text;
			mainRoom.model.chats.add(newInlineAlert);
		},
		command: function(command, script) {
			this.command = command;
			this.script = script;
		}
	},
	features: {},
	settings: {
		release: {
			version: 1.0,
			branch: "Stable"
		},
		icons: {
			staffIcon: "https://images.wikia.nocookie.net/__cb20140626173406/gamedezyner/images/6/60/StaffIcon.png",
			modIcon: "https://images.wikia.nocookie.net/__cb20140626173343/gamedezyner/images/8/89/ModIcon.png"
		},
		sounds: {
			pingSound: "https://images.wikia.nocookie.net/gamedezyner/images/7/7e/PingSound.ogg"
		},
		features: {
			pings: false
		}
	},
	save: function() {
		ChatPlugins.settings.features.pings = ChatPlugins.features.pings.enabled;
		api.functions.editPage("User:"+wgUserName+"/ChatPlugins.js",JSON.stringify(ChatPlugins.settings));
	},
	load: function() {
		new ChatPlugins.models.alert("Welcome to Chat Plugins 1.0!");
		pagecontents = api.functions.getPageContents("User:"+wgUserName+"/ChatPlugins.js");
		if (pagecontents=="error") {
			new ChatPlugins.models.alert("There seems to be something wrong with your settings file, or it doesn't exist yet. Default settings have been saved.");
			ChatPlugins.save();
		}
		else {
			ChatPlugins.settings=JSON.parse(pagecontents);
			ChatPlugins.features.pings.enabled = ChatPlugins.settings.features.pings;
			ChatPlugins.features.pings.words = ChatPlugins.settings.pings;
		}
		pagecontents = api.functions.getPageContents("MediaWiki:ChatPluginsSettings.js");
		if (pagecontents!="error") {
			wikicustom = JSON.parse(pagecontents);
			if (typeof(wikicustom.settings)!="object") {
				new ChatPlugins.models.alert("This wiki has a custom settings page, but it is broken.");
			}
			else {
				ChatPlugins.settings.icons = wikicustom.settings.icons; //Load Wiki-specific icons
				ChatPlugins.settings.sounds = wikicustom.settings.sounds; //Load Wiki-specific sounds
				new ChatPlugins.models.alert("This wiki has custom settings and they have been applied.");
			}
			
		}
	}
};




/** ======================================================= **
  * 				Inline Moderation Functions
  *						   =ALWAYS ON=
  *	ID: -NONE-
  *	Name: Mod Icons
  * Feature Name: modIcons
  *	Access: 0 - Any User
  *	Special Objects: -NONE-
  *	
 ** ======================================================= **/
//====================================================================================================================================
$("head").append('<style id="ChatPluginsModIconsStyle">.Chat .username:after {content: "";}</style>');
ChatPlugins.features.modIcons = new ChatPlugins.models.feature(null,"Mod Icons",0,function (chat) {
	var icon = '';
	for(var i in mainRoom.model.users.models) {
		if(mainRoom.model.users.models[i].attributes.name == chat.attributes.name) {
			if(mainRoom.model.users.models[i].attributes.isStaff) {
				icon = ' <img class="stafficon" src="' + ChatPlugins.settings.icons.staffIcon + '">';
			}
			else if(mainRoom.model.users.models[i].attributes.isModerator) {
				icon = ' <img class="modicon" src="' + ChatPlugins.settings.icons.modIcon + '">';
			}
			break;
		}
	}
	mainRoom.viewDiscussion.chatUL.children().last().children(".username").html(mainRoom.viewDiscussion.chatUL.children().last().children(".username").html() + icon);
	
	
	if (wgUserGroups.indexOf("chatmoderator")>=0||wgUserGroups.indexOf("sysop")>=0) {
		mainRoom.viewDiscussion.chatUL.children().last().children('.username').hover(
			function(){
				var thistarget = this;
				var username = $(thistarget).parent().attr("data-user");
				if (username!=wgUserName) {
					$(thistarget).append('<span class="inlinemod"> - <span class="inline-kick" style="color:blue;cursor:pointer;">Kick</span>&nbsp;-&nbsp;<span class="inline-ban" style="color:blue;cursor:pointer;">Ban</span>&nbsp;</span>');
					
                    $(thistarget).children().children('.inline-kick').click(function(){
                        mainRoom.kick({name:username})
                    });
					$(thistarget).children().children('.inline-ban').click(function(){
                        mainRoom.ban({name:username})
                    });
				}
			},function(){
				$(this).children('.inlinemod').remove();
			}
		);
		mainRoom.viewDiscussion.chatUL.children().last().children('.message').hover(
			function() {
				thistarget = this;
				username = $(thistarget).parent().attr("data-user");
				message = $(thistarget).text();
				$(thistarget).append('<span class="inline-quote" style="color:blue;cursor:pointer;">&nbsp;&nbsp;Quote</span>');
				$(thistarget).children('.inline-quote').click(function(){$('textarea').val(">"+message.replace("\n","\n>")+'\n');$("textarea").focus();});
				
			},function() {
				$(this).children('.inline-quote').remove();
			}
		);
	}
}
);
//Bind function to chat updates
mainRoom.model.chats.bind('afteradd', $.proxy(ChatPlugins.features.modIcons.script, mainRoom.viewDiscussion));
//====================================================================================================================================
/** ======================================================= **
  *		 				Slash Commands
  *						  =ALWAYS ON=
  *	ID: -NONE-
  *	Name: Internal Slash Commands
  * Feature Name: slash
  *	Access: 0 - Any User
  *	Special Objects: commands
  *	
 ** ======================================================= **/
ChatPlugins.features.slash = new ChatPlugins.models.feature(null,"Slash Commands",0,function(event) {
    if (this.active && event.which == 13 && !event.shiftKey) {
		
        var inputField = $(event.target),
            inputValue = inputField.val(),
            inputValueLength = inputValue.length;
        event.preventDefault();
		for (var i in ChatPlugins.features.slash.commands) {
			if (inputValue.match(ChatPlugins.features.slash.commands[i].command)) {
				ChatPlugins.features.slash.commands[i].script(inputValue.match(ChatPlugins.features.slash.commands[i].command));
				inputValue = "";
				inputField.val("");
			}
		}
		
        if (inputValue.length && inputValueLength <= this.maxCharacterLimit && inputValue.match(/^\/(?!me\s)/)==null) {
            var chatEntry = new models.ChatEntry({
                roomId: this.roomId,
                name: wgUserName,
                text: inputValue
            });
            if (!this.isMain()) {
                if (this.afterInitQueue.length < 1 || this.model.users.length < 2) {
                    this.mainController.socket.send(this.model.privateRoom.xport());
                }
                if (!this.isInitialized) {
                    this.afterInitQueue.push(chatEntry.xport());
                    chatEntry.set({
                        temp: true,
                        avatarSrc: wgAvatarUrl
                    });
                    this.model.chats.add(chatEntry);
                } else {
                    this.socket.send(chatEntry.xport());
                }
            } else {
                this.socket.send(chatEntry.xport());
            }
            inputField.val('').focus();
            $('body').removeClass('warn limit-near limit-reached');
        }
    }
});
mainRoom.viewDiscussion.unbind('sendMessage');
mainRoom.viewDiscussion.bind('sendMessage', $.proxy(ChatPlugins.features.slash.script, mainRoom));

ChatPlugins.features.slash.commands = {
	afk: {
		command: /\/afk/,
		script: function(args) {
			$(window).unbind('mousemove').unbind('focus');
			mainRoom.setAway();
		}
	},
	exit: {
		command: /\/exit/,
		script: function(args) {
			window.location = wgServer;
		}
	},
	kick: {
		command: /^\/kick\s.+/,
		script: function(args) {
			if (args[0].match(/\/kick\s\S+$/)) {
				for (var i in mainRoom.model.users.models) {
					if (mainRoom.model.users.models[i].attributes.name == args[0].match(/\S+$/)[0]) {
						mainRoom.kick({name:args[0].match(/\S+$/)[0]});
					}
					else if (i==mainRoom.model.users.models.length-1){
						new ChatPlugins.models.alert(args[0].match(/\S+$/)[0]+" is not in this room");
					}
				}
			}
			else {
				new ChatPlugins.models.alert("kick requires only ONE argument:");
				new ChatPlugins.models.alert("/kick [username]");
			}
		}	
	},
	ban: {
		command: /^\/ban\s.+/,
		script: function(args) {
			if (args[0].match(/\/ban\s\S+$/)) {
				for (var i in mainRoom.model.users.models) {
					if (mainRoom.model.users.models[i].attributes.name == args[0].match(/\S+$/)[0]) {
						mainRoom.ban({name:args[0].match(/\S+$/)[0]});
					}
					else if (i==mainRoom.model.users.models.length-1){
						new ChatPlugins.models.alert(args[0].match(/\S+$/)[0]+" is not in this room");
					}
				}
			}
			else {
				new ChatPlugins.models.alert("ban requires only ONE argument:");
				new ChatPlugins.models.alert("/ban [username]");
			}
		}
	},
	pingson: {
		command: /^\/pingson\s?/,
		script: function(args) {
			ChatPlugins.features.pings.enabled = true;
			new ChatPlugins.models.alert("Pings are now enabled! Remember to /save when you're done changing settings!");
		}
	},
	pingsoff: {
		command: /^\/pingsoff\s?/,
		script: function(args) {
			ChatPlugins.features.pings.enabled = false;
			new ChatPlugins.models.alert("Pings are now disabled! Remember to /save when you're done changing settings!");
		}
	},
	pings: {
		command: /^\/pings\s?/,
		script: function(args) {
			var $optionsWindowHTML = $.showCustomModal( "Ping Words", '<form method="" name="" class="WikiaForm "><fieldset>' + 
				'<div>Enter your ping phrases below, one on each line.</div>' + 
				'<textarea id="pingsinput" style="width:100%;resize:vertical;min-height:100px;"></textarea>' + 
				'</fieldset></form>', {
				id: "optionsWindow",
					width: 200,
					buttons: [
						{
							id: "cancel",
							message: "Cancel",
							handler: function() {
								$('#optionsWindow').remove();
								$('.blackout').remove();
							}
						},
						{
							id: "save",
							defaultButton: true,
							message: "Save",
							handler: function(){
								ChatPlugins.features.pings.words=$("#pingsinput").val().split("\n");
								ChatPlugins.settings.pings=ChatPlugins.features.pings.words;
								$('#optionsWindow').remove();
								$('.blackout').remove();
								new ChatPlugins.models.alert("Your pings have been changed! Remember to /save when you're done changing settings!");
							}
						}
					]
			});
			$("#pingsinput").val(ChatPlugins.features.pings.words.join("\n"));
		}
	},
	save: {
		command: /^\/save\s?/,
		script: function(args) {
			ChatPlugins.save();
			new ChatPlugins.models.alert("Saved settings.");
		}
	},
	reload: {
		command: /^\/reload\s?/,
		script: function(args) {
			ChatPlugins.load();
			new ChatPlugins.models.alert("Re-loading previously saved settings.");
		}
	},
	help: {
		command: /^\/help\s?/,
		script: function(args) {
			new ChatPlugins.models.alert("Chat Plugins - By Gamedezyner");
			new ChatPlugins.models.alert("Chat Plugins is now controlled by slash commands. Here is a list of all current commands:");
			new ChatPlugins.models.alert("/help - Displays this screen");
			new ChatPlugins.models.alert("/reload - Reloads your saved settings");
			new ChatPlugins.models.alert("/save - Saves your current settings");
			new ChatPlugins.models.alert("/pings - Allows you to change your ping words");
			new ChatPlugins.models.alert("/pingson - Turns on Pings");
			new ChatPlugins.models.alert("/pingsoff - Turns off Pings");
			new ChatPlugins.models.alert("/afk - Sets your status as away");
			if (wgUserGroups.indexOf("chatmoderator")>=0||wgUserGroups.indexOf("sysop")>=0) {
				new ChatPlugins.models.alert("/kick [username] - Kicks a user (Chat Moderators only)");
				new ChatPlugins.models.alert("/ban [username] - Bans a user (Chat Moderators only)");
			}
		}
	}
	
}

/** ======================================================= **
  * 					Pings Function
  *	ID: 0
  *	Name: Pings
  * Feature Name: pings
  *	Access: 0 - Any User
  *	Special Objects: words
  *	
 ** ======================================================= **/
//Add HTML objects
$('head').append('<style type="text/css" id="ChatPluginsPingsStyle">.message.ping {color:red;}</style>');
$('body').append('<span id="ChatPluginsPingsSound" style="display:none;"></span>');
//Register function
ChatPlugins.features.pings = new ChatPlugins.models.feature(0,"Pings",0,function() {		
	//Quick Variables
	lastmessage = mainRoom.viewDiscussion.chatUL.children().last().children('.message');
	lastusername = mainRoom.viewDiscussion.chatUL.children().last().children('.username');
	if (lastmessage.length) {
		if (mainRoom.isInitialized && lastusername.html()!=wgUserName && !document.hasFocus() && ChatPlugins.features.pings.enabled && lastmessage.length) {
			pings = ChatPlugins.features.pings.words;
			for (var i in pings) {
				if (lastmessage.html().toLowerCase().indexOf(pings[i].toLowerCase())>=0) {
					lastmessage.addClass("ping");
					$("#ChatPluginsPingsSound").html('<audio src="' + ChatPlugins.settings.sounds.pingSound + '" autoplay=""></audio>');
				}
			}	
		}
	}
});

ChatPlugins.features.pings.words = [wgUserName];
mainRoom.model.chats.bind('afteradd', $.proxy(ChatPlugins.features.pings.script, mainRoom.viewDiscussion));

/** ======================================================= **
  * 			Do the load
 ** ======================================================= **/
ChatPlugins.load();

// ========================================================================================================================
//				SAFETY LINE							SAFETY LINE							SAFETY LINE
// ========================================================================================================================

/** ======================================================= **
  * 			Tab Complete for Usernames
 ** ======================================================= **/
function getCaretPos(ctrl) {
    var CaretPos = 0;    // IE Support
    if (document.selection) {
    ctrl.focus ();
        var Sel = document.selection.createRange ();
        Sel.moveStart ('character', -ctrl.value.length);
        CaretPos = Sel.text.length;
    }
    // Firefox support
    else if (ctrl.selectionStart || ctrl.selectionStart == '0')
        CaretPos = ctrl.selectionStart;
    return (CaretPos);
}
function setCaretPos(ctrl, pos){
    if(ctrl.setSelectionRange)
    {
        ctrl.focus();
        ctrl.setSelectionRange(pos,pos);
    }
    else if (ctrl.createTextRange) {
        var range = ctrl.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
}
 
//Tab insert for usernames
$('[name="message"]').after('<span style="display:none;" id="autofilldata">[0,"","",0,null]</span>');
$('[name="message"]').keydown(function(e) {
	if (e.keyCode == 9) {
		e.preventDefault();
		var curval = this.value;
		var afData = eval(document.getElementById('autofilldata').innerHTML);
		var curpos = afData[3]==0?getCaretPos(this):afData[3];
		var carpos = getCaretPos(this)
		if ((!curval.charAt(carpos)||curval.charAt(carpos).match(/\s/))&&!curval.charAt(carpos-1).match(/\s/)&&this.value.length) {
			var unamestart = '';
			if (afData[1].length==0) {
				for (i=curpos-1;i>=0&&!curval.charAt(i).match(/\s/);i--) {
					unamestart = curval.charAt(i) + unamestart;
				}
			} else {
				unamestart = afData[1];
			}
			var afterTComplete = '';
			for (i=curpos;i<curval.length;i++) {
				afterTComplete += curval.charAt(i);
			}
			//generate list of users
			var userList = '';
			var userlistelems = document.getElementsByClassName('User');
			for (i=0;i<userlistelems.length;i++) {
				userList += userlistelems[i].getElementsByClassName('username')[0].innerHTML+',';
			}
			userList = userList.replace(new RegExp('('+wgUserName+'|RSChatBot),|,$','g'),'')
			userList = userList.split(',').sort()
			var matchedNames = [];
			for (i=0;i<userList.length;i++) {
				if (userList[i].match(new RegExp('^'+unamestart, 'i'))) {
					matchedNames.push(userList[i]);
				}
			}
			var newval = curval.split('');
			for (i=carpos-1;i>=0&&i>=carpos-(!(afData[4]===null)?(matchedNames[afData[4]]?matchedNames[afData[4]].length:0) : unamestart.length)&&matchedNames.length>0;i--) {
				newval[i] = '';
			}
			matchedNames = !matchedNames[0]?['']:matchedNames;
			newval[curpos-unamestart.length] += matchedNames[afData[0]]?matchedNames[afData[0]]:'';
			newval = newval.join('');
			this.value = newval;
			setCaretPos(this, curpos+(matchedNames[afData[0]].length?matchedNames[afData[0]].length:0))
			var iter = afData[0]>=matchedNames.length-1?0:afData[0]+1;
			document.getElementById('autofilldata').innerHTML = '['+iter+',"'+unamestart+'","'+matchedNames[afData[0]]+'",'+curpos+','+afData[0]+']'
		}
		return false;
	} else if (e.which != 16) {
		document.getElementById('autofilldata').innerHTML = '[0,"","",0,null]';
	}
}).click(function() {
	document.getElementById('autofilldata').innerHTML = '[0,"","",0,null]';
}).blur(function() {
	document.getElementById('autofilldata').innerHTML = '[0,"","",0,null]';
})

/** ======================================================= **
 *						Chat Formatting
 ** ======================================================= **/
 $('head').append('<style type="text/css" id="ChatPluginsFormattingStyle">.quote {color:forestgreen;} .action {color:dodgerblue;}.quote.action{color:darkturquoise;}</style>');
ChatPlugins.features.formatting = new ChatPlugins.models.feature(1,"Formatting",0, function() {
	lastmessage = mainRoom.viewDiscussion.chatUL.children().last().children('.message');
	lastusername = mainRoom.viewDiscussion.chatUL.children().last().children('.username');
	if (lastmessage.length){
		var match = lastmessage.html().match(/^&gt;.+$/gm);
		for (var i in match) {
			lastmessage.html(lastmessage.html().replace(match[i],'<span class="quote">'+match[i]+'</span>'))
		}
		var match = lastmessage.html().match(/^\*[^\*\n]+$/gm);
		for (var i in match) {
			lastmessage.html(lastmessage.html().replace(match[i],'<span class="me-message">'+match[i]+'</span>'))
		}
		var match = lastmessage.html().match(/\[[^\[\n\]]+\]/gm);
		for (var i in match) {
			lastmessage.html(lastmessage.html().replace(match[i],'<span class="action">'+match[i]+'</span>'))
		}
		var match = lastmessage.html().match(/\*[^\*\n]+\*/gm);
		for (var i in match) {
			lastmessage.html(lastmessage.html().replace(match[i],'<span class="action">'+match[i]+'</span>'))
		}
	}
});
mainRoom.model.chats.bind('afteradd', $.proxy(ChatPlugins.features.formatting.script, mainRoom.viewDiscussion));