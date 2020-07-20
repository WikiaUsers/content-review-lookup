/*****************************
 * AUTHOR: Akrivus
 * TODO: Not sure, you tell me.
 ****************************/
 
// Import custom CSS.
importArticles({
    type: "style",
    articles: [
      "MediaWiki:PICCOLO.css"
    ]
});
 
// Load the block list.
var BLOCK_LIST = [];
var IGNORE_LIST = [mw.config.get('wgUserName')];
var PING_LIST = [mw.config.get('wgUserName')];

// Load the hidden messages.
var HIDDEN_MESSAGES = {};
 
// Mod message tooltip that appears when mods hover over a message.
var MOD_MSG_TOOLTIP =
	"<span class=\"chat-tooltip\">"
	 + "&nbsp;-&nbsp;"
	 + "<span class=\"hide-msg msg-tooltip\" onclick=\"hideMessage(message);\">Hide</span> • "
	 + "<span class=\"quote-msg msg-tooltip\" onclick=\"quoteMessage(message);\">Quote</span>"
	 + "</span>";
 
// User message tooltip that appears when normal users hover over a message.
var MSG_TOOLTIP =
	"<span class=\"chat-tooltip\">"
	 + "&nbsp;-&nbsp;"
	 + "<span class=\"hide-msg msg-tooltip\" onclick=\"hideMessage(message);\">Hide</span> • "
	 + "<span class=\"quote-msg msg-tooltip\" onclick=\"quoteMessage(message);\">Quote</span>"
	 + "</span>";
	 
// Message tooltip that appears when users hover over a hidden message.
var HIDDEN_MSG_TOOLTIP =
	"<span class=\"chat-tooltip\">"
	 + "&nbsp;-&nbsp;"
	 + "<span class=\"hide-msg msg-tooltip\" onclick=\"showMessage(message);\">Show</span>"
	 + "</span>";
 
// Mod user tooltip, gives advanced options like ping, kick, and ban.
var MOD_USER_TOOLTIP =
	"<span class=\"chat-tooltip\">"
	 + "&nbsp;-&nbsp;"
	 + "<span class=\"kick-user user-tooltip\" onclick=\"kickUser(message);\">Kick</span> • "
	 + "<span class=\"ban-user user-tooltip\" onclick=\"banUser(message);\">Ban</span> • "
	 + "<span class=\"ping-user user-tooltip\" onclick=\"pingUser(message);\">Ping</span> • "
	 + "<span class=\"pm-user user-tooltip\" onclick=\"pmUser(message);\">Private Message</span>"
	 + "</span>";
	 
// Mod user tooltip for users that left.
var MOD_USER_AFTER_LEFT_TOOLTIP =
	"<span class=\"chat-tooltip\">"
	 + "&nbsp;-&nbsp;"
	 + "<span class=\"ban-user user-tooltip\" onclick=\"banUser(message);\">Ban</span>"
	 + "</span>";
 
// User tooltip, gives options like ignore and ping.
var USER_TOOLTIP =
	"<span class=\"chat-tooltip\">"
	 + "&nbsp;-&nbsp;"
	 + "<span class=\"ignore-user user-tooltip\" onclick=\"ignoreUser(message);\">Ignore</span> • "
	 + "<span class=\"block-user user-tooltip\" onclick=\"blockUser(message);\">Block</span> • "
	 + "<span class=\"ping-user user-tooltip\" onclick=\"pingUser(message);\">Ping</span> • "
	 + "<span class=\"pm-user user-tooltip\" onclick=\"pmUser(message);\">Private Message</span>"
	 + "</span>"; 
	 
// User tooltip for users that left.
var USER_AFTER_LEFT_TOOLTIP =
	"<span class=\"chat-tooltip\">"
	 + "&nbsp;-&nbsp;"
	 + "<span class=\"ignore-user user-tooltip\" onclick=\"ignoreUser(message);\">Ignore</span> • "
	 + "<span class=\"block-user user-tooltip\" onclick=\"blockUser(message);\">Block</span>"
	 + "</span>";
	 
// User tooltip, takes away ignore and block options.
var USER_ON_MOD_TOOLTIP =
	"<span class=\"chat-tooltip\">"
	 + "&nbsp;-&nbsp;"
	 + "<span class=\"ping-user user-tooltip\" onclick=\"pingUser(message);\">Ping</span> • "
	 + "<span class=\"pm-user user-tooltip\" onclick=\"pmUser(message);\">Private Message</span>"
	 + "</span>"; 
	 
// Ignored user tooltip, gives options like unignore.
var IGNORED_USER_TOOLTIP =
	"<span class=\"chat-tooltip\">"
	 + "&nbsp;-&nbsp;"
	 + "<span class=\"unignore-user user-tooltip\" onclick=\"unignoreUser(message);\">Unignore</span> • "
	 + "<span class=\"block-user user-tooltip\" onclick=\"blockUser(message);\">Block</span> • "
	 + "<span class=\"ping-user user-tooltip\" onclick=\"pingUser(message);\">Ping</span> • "
	 + "<span class=\"pm-user user-tooltip\" onclick=\"pmUser(message);\">Private Message</span>"
	 + "</span>";
	 
// Ignored user tooltip, gives options like unignore.
var IGNORED_USER_AFTER_LEFT_TOOLTIP =
	"<span class=\"chat-tooltip\">"
	 + "&nbsp;-&nbsp;"
	 + "<span class=\"unignore-user user-tooltip\" onclick=\"unignoreUser(message);\">Unignore</span> • "
	 + "<span class=\"block-user user-tooltip\" onclick=\"blockUser(message);\">Block</span>"
	 + "</span>";
 
// Blocked user tooltip, gives advanced options like unblock.
var BLOCKED_USER_TOOLTIP =
	"<span class=\"chat-tooltip\">"
	 + "&nbsp;-&nbsp;"
	 + "<span class=\"unblock-user user-tooltip\" onclick=\"unblockUser(message);\">Unblock</span>"
	 + "</span>";

// The buttons that appear next to a normal user's name.	 
var USER_BUTTONS =
	"<div style=\"z-index:1000; right:153px; width:360px; position:absolute;\">"
	 + "<button onclick=\"openIgnoreList();\">Ignored Users</button> "
	 + "<button onclick=\"openBlocksList();\">Blocked Users</button> "
	 + "<button onclick=\"openPingsList();\">Pings List</button> "
	 + "<button id=\"change-status\" onclick=\"changeStatus();\">Go AFK</button>"
	 + "</div>";
	 
// The buttons that appear next to a mod user's name.	 
var MOD_USER_BUTTONS =
	"<div style=\"z-index:1000; right:153px; width:150px; position:absolute;\">"
	 + "<button onclick=\"openPingsList();\">Pings List</button> "
	 + "<button id=\"change-status\" onclick=\"changeStatus();\">Go AFK</button>"
	 + "</div>";
 
// Semaphore that lets us know the chat is working.
var chatStarted = false;
 
// Fix "mainRoom is not defined"
var interval = setInterval(function () {
		if (window.mainRoom) {
			// Make sure it doesn't load twice.
			if (typeof piccoloLoaded == "undefined") {
				piccoloLoaded = true;
			} else {
				return;
			}
			
			// Set local storage.
			if (typeof localStorage.getItem("Block-List") == "string") {
				BLOCK_LIST = JSON.parse(localStorage.getItem("Block-List"));
			}
			if (typeof localStorage.getItem("Ignore-List") == "string") {
				IGNORE_LIST = JSON.parse(localStorage.getItem("Ignore-List"));
			}
			if (typeof localStorage.getItem("Ping-List") == "string") {
				PING_LIST = JSON.parse(localStorage.getItem("Ping-List"));
			}
 
			// Bind the message reader.
			mainRoom.model.chats.bind('afteradd', checkMessage);
			
			// Add user settings.
			$('.public').prepend(function() {
					you = mw.config.get('wgUserName');
					if (isModerator(you)) {
						return MOD_USER_BUTTONS;
					} else {
						return USER_BUTTONS;
					}
				}
			);
 
			// Called when you hover over a message.
			$('body').on('mouseenter', '.Chat .message', function () {
				message = $(this).parent();
				you = mw.config.get('wgUserName');
				tooltip = MSG_TOOLTIP;
				
				if (message.find(".message").hasClass("msg-hidden")) {
					tooltip = HIDDEN_MSG_TOOLTIP;
				} else if (isModerator(you)) {
					tooltip = MOD_MSG_TOOLTIP;
				}
				
				message.find(".message").append(tooltip);
			});
			$('body').on('mouseleave', '.Chat .message', function () {
				$(".chat-tooltip").remove();
			});
 
			// Called when you hover over a username.
			$('body').on('mouseenter', '.Chat .username', function () {
				message = $(this).parent();
				user = stripHTML(message.find(".username").html());
				you = mw.config.get('wgUserName');
				tooltip = USER_TOOLTIP;
				
				if (user == you) {
					tooltip = "";
				} else if (isModerator(you)) {
					if (isModerator(user)) {
						tooltip = USER_ON_MOD_TOOLTIP;
					} else {
						tooltip = MOD_USER_TOOLTIP;
					}
				} else if (!isStillInChat(user)) {
					if (!isModerator(user)) {
						if (isModerator(you)) {
							tooltip = MOD_USER_AFTER_LEFT_TOOLTIP;
						} else if (isIgnored(user)) {
							tooltip = IGNORED_USER_AFTER_LEFT_TOOLTIP;
						} else if (isBlocked(user)) {
							tooltip = BLOCKED_USER_TOOLTIP;
						} else {
							tooltip = USER_AFTER_LEFT_TOOLTIP;
						}
					}
				} else if (isModerator(user)) {
					tooltip = USER_ON_MOD_TOOLTIP;
				} else if (isBlocked(user)) {
					tooltip = BLOCKED_USER_TOOLTIP;
				} else if (isIgnored(user)) {
					tooltip = IGNORED_USER_TOOLTIP;
				}
				
				message.find(".username").append(tooltip);
			});
			$('body').on('mouseleave', '.Chat .username', function () {
				$(".chat-tooltip").remove();
			});
 
			// Clear the interval so we don't screw things up.
			clearInterval(interval);
		}
	}, 250);
 
// Hides a message.
function hideMessage(message) {
	HIDDEN_MESSAGES[$(message).attr("id")] = message.find(".message").html();
	message.find(".message").html("This message is hidden.").addClass('msg-hidden');
}

// Shows a message.
function showMessage(message) {
	message.find(".message").html(HIDDEN_MESSAGES[$(message).attr("id")]).removeClass('msg-hidden');
}
 
// Creates a quote of a message.
function quoteMessage(message) {
	target = normalize($(message).find(".username").html());
	timestamp = normalize($(message).find(".time").html());
	text = normalize($(message).find(".message").html());
	$("textarea[name=\"message\"]").val(
		$("textarea[name=\"message\"]").val()
		 + "> At " + timestamp + ", " + target + " wrote: " + text
		 + "\n");
}
 
// Kicks a user, simple as that.
function kickUser(user) {
	username = stripHTML($(user).find(".username").html());
	mainRoom.kick(mainRoom.model.users.findByName(username).attributes);
}
 
// Bans a user, simple as that.
function banUser(user) {
	username = stripHTML($(user).find(".username").html());
	mainRoom.ban(mainRoom.model.users.findByName(username).attributes);
}
 
// Pings a user, simple as that.
function pingUser(user) {
	$("textarea[name=\"message\"]").val(
		($("textarea[name=\"message\"]").val()
			 + "@"
			 + stripHTML($(user).find(".username").html())) + " ");
}
 
// Blocks a specific username.
function blockUser(user) {
	BLOCK_LIST.push(stripHTML($(user).find(".username").html()));
    localStorage.setItem("Block-List", JSON.stringify(BLOCK_LIST));
	mainRoom.blockAllowPrivateAjax(stripHTML($(user).find(".username").html()), 'add', $.proxy( function(data) {
		var userClear = new models.User({'name': stripHTML($(user).find(".username").html())});
		this.model.blockedUsers.add(userClear);
	}, mainRoom));
}
 
// Ignores a specific username.
function ignoreUser(user) {
	IGNORE_LIST.push(stripHTML($(user).find(".username").html()));
    localStorage.setItem("Ignore-List", JSON.stringify(IGNORE_LIST));
}
 
// Unblocks a specific username.
function unblockUser(user) {
	for (i = 0; i < BLOCK_LIST.length; i++) {
		if (BLOCK_LIST[i] == stripHTML($(user).find(".username").html())) {
			BLOCK_LIST[i] = undefined;
		}
		localStorage.setItem("Block-List", JSON.stringify(BLOCK_LIST));
	}
	mainRoom.blockAllowPrivateAjax(stripHTML($(user).find(".username").html()), 'remove', $.proxy( function(data) {
		var userClear = new models.User({'name': stripHTML($(user).find(".username").html())});
		this.model.blockedUsers.remove(userClear);
	}, mainRoom));
}

// Unignores a specific username.
function unignoreUser(user) {
	for (i = 0; i < IGNORE_LIST.length; i++) {
		if (IGNORE_LIST[i] == stripHTML($(user).find(".username").html())) {
			IGNORE_LIST[i] = undefined;
		}
	}
	localStorage.setItem("Ignore-List", JSON.stringify(IGNORE_LIST));
}

// Private messages a specific user.
function pmUser(user) {
	mainRoom.openPrivateChat([stripHTML($(user).find(".username").html())]);
}
 
// Checks each message and routes them to the approriate method.
function checkMessage(chat) {
	if (chat.attributes.isInlineAlert == true) {
		if (!chatStarted) {
			chatStarted = true;
		}
	} else if (chatStarted) {
		checkIfMessageIsHidden(chat);
		checkIfUserMentioned(chat);
		checkIfUserPinged(chat);
	}
}
 
// Checks if a message is supposed to be removed.
function checkIfMessageIsHidden(chat) {
	if (isBlocked(chat.attributes.name)) {
		hideMessage(mainRoom.viewDiscussion.chatUL.children().last());
	}
}
 
// Checks if a message mentions you.
function checkIfUserMentioned(chat) {
	var context = mainRoom.viewDiscussion.chatUL.children().last();
	if (!isIgnored(chat.attributes.name)) {
		if (chat.attributes.text.includes("@" + mw.config.get('wgUserName'))
			 || (isModerator(mw.config.get('wgUserName'))
				 && chat.attributes.text.includes("@mods"))
			 || (isModerator(chat.attributes.name)
				 && chat.attributes.text.includes("@everyone"))) {
 
			// Sets keyword.
			if (chat.attributes.text.includes("@everyone")) {
				keyword = "@everyone";
			}
			else if (chat.attributes.text.includes("@mods")) {
				keyword = "@mods";
			}
			else {
				keyword = "@" + mw.config.get('wgUserName');
			}
 
			// Display the notification.
			displayNotification(chat, context, keyword);
		}
	}
}
 
// Checks if a message pings you.
function checkIfUserPinged(chat) {
	var context = mainRoom.viewDiscussion.chatUL.children().last();
	if (!isIgnored(chat.attributes.name)) {
		if (!(chat.attributes.text.includes("@" + mw.config.get('wgUserName'))
			 || (isModerator(mw.config.get('wgUserName'))
				 && chat.attributes.text.includes("@mods"))
			 || (isModerator(chat.attributes.name)
				 && chat.attributes.text.includes("@everyone")))) {
			PING_LIST = Array.isArray(PING_LIST) ? PING_LIST : [mw.config.get('wgUserName')];
			for (var i = 0; i < PING_LIST.length; i++) {
			    if (!/^\s*$/.test(PING_LIST[i])) {
    				if (new RegExp(PING_LIST[i], "mi").test(chat.attributes.text)) {
    					displayNotification(chat, context, chat.attributes.text);
    					break;
    				}
			    }
			}
		}
	}
}
 
// Displays a ping notification.
function displayNotification(chat, context, keyword) {
	// Check if they have values so we can default if we have to.
	PING_SOUND = typeof PING_SOUND == "undefined" ? 'https://vignette.wikia.nocookie.net/monchbox/images/0/01/Beep-sound.ogg' : PING_SOUND;
	PING_COLOR = typeof PING_COLOR == "undefined" ? '#FF0000' : PING_COLOR;
 
	// Display the notification.
	if (Notification.permission == 'granted') {
		var notification = new Notification(
				chat.attributes.name + " pinged you!", {
				body : normalize(chat.attributes.text),
				icon : context.children('.avatar').attr('src').slice(0, -2) + '150'
			});
		notification.onclick = function () {
			mainRoom.viewDiscussion.scrollToBottom();
			notification.close();
			window.focus();
		};
	}
 
	// Make it obvious who pinged you.
	$("#" + context.attr('id') + " .message").html(
		$("#" + context.attr('id') + " .message").html().replace(
			keyword,
			"<span class=\"ping-msg\" style=\"color:" + PING_COLOR + " !important;"
			 + "font-weight:bold !important;"
			 + "text-shadow:0px 0px 10px " + PING_COLOR + " !important;\">"
			 + keyword
			 + "<\/span>"));
 
	// Add a ping sound and remove it a second later.
	$('<audio>', {
		id : 'ping',
		src : PING_SOUND,
		autoplay : true
	}).appendTo('body');
	setTimeout(function () {
		if ($('#ping').length)
			$('#ping').remove();
	}, 1000);
}
 
// Sends a message to chat.
function sendMessage(text) {
	mainRoom.socket.send(new models.ChatEntry({
			roomId : this.roomId,
			name : mw.config.get('wgUserName'),
			text : text
		}).xport());
}
 
// Checks if user is a moderator.
function isModerator(name) {
	try {
		return mainRoom.model.users.findByName(name).attributes.isModerator;
	} catch (e) {
		return false;
	}
}

// Checks if user is still in chat.
function isStillInChat(name) {
	try {
		return mainRoom.model.users.findByName(name).attributes != "undefined";
	} catch (e) {
		return false;
	}
}
 
// Checks if user is ignored.
function isIgnored(name) {
	if (IGNORE_LIST == null) {
		localStorage.setItem("Ignore-List", "[\"" + mw.config.get('wgUserName') + "\"]");
		IGNORE_LIST = [mw.config.get('wgUserName')];
	}
	return IGNORE_LIST.indexOf(name) > -1 || BLOCK_LIST.indexOf(name) > -1;
}

// Checks if user is blocked.
function isBlocked(name) {
	if (BLOCK_LIST == null) {
		localStorage.setItem("Block-List", "[]");
		BLOCK_LIST = [];
	}
	return BLOCK_LIST.indexOf(name) > -1;
}
 
// Strips HTML from text.
function stripHTML(text) {
	if (text == undefined || text == null)
		return null;
	return text.replace(/<span class="chat-tooltip".*>.*<\/span>/gm, '');
}
 
// Makes messages look normal.
function normalize(text) {
	if (text == undefined || text == null)
		return null;
	text = stripHTML(text);
	return text.replace(/<[^>]*>?/gm, '');
}

// Opens a ping window.
function openPingsList() {
	$.showCustomModal("Pings List",
		'<form method="" name="" class="WikiaForm"><fieldset>' + 
		'<div>Edit your pings list below, both regex and plain text are accepted.</div>' + 
		'<textarea id="pings" style="width:100%; resize:vertical; min-height:100px;"></textarea>' + 
		'</fieldset></form>', {
			id: "optionsWindow",
			width: 500,
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
					handler: function() {
						PING_LIST = $("#pings").val().split("\n");
						localStorage.setItem("Ping-List", JSON.stringify(PING_LIST));
						$('#optionsWindow').remove();
						$('.blackout').remove();
					}
				}
			]
		}
	);
	PING_LIST = JSON.parse(localStorage.getItem("Ping-List"));
	$("#pings").val(PING_LIST.join("\n"));
}

// Opens a block window.
function openBlocksList() {
	$.showCustomModal("Blocked User List",
		'<form method="" name="" class="WikiaForm"><fieldset>' + 
		'<div>Edit your blocked users list below.</div>' + 
		'<textarea id="blocks" style="width:100%; resize:vertical; min-height:100px;"></textarea>' + 
		'</fieldset></form>', {
			id: "optionsWindow",
			width: 500,
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
					handler: function() {
						BLOCK_LIST = $("#blocks").val().split("\n");
						localStorage.setItem("Block-List", JSON.stringify(PING_LIST));
						$('#optionsWindow').remove();
						$('.blackout').remove();
					}
				}
			]
		}
	);
	BLOCK_LIST = JSON.parse(localStorage.getItem("Block-List"));
	$("#blocks").val(BLOCK_LIST.join("\n"));
}

// Opens an ignore window.
function openIgnoreList() {
	$.showCustomModal("Ignored User List",
		'<form method="" name="" class="WikiaForm"><fieldset>' + 
		'<div>Edit your ignored users list below.</div>' + 
		'<textarea id="ignored" style="width:100%; resize:vertical; min-height:100px;"></textarea>' + 
		'</fieldset></form>', {
			id: "optionsWindow",
			width: 500,
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
					handler: function() {
						IGNORE_LIST = $("#ignored").val().split("\n");
						localStorage.setItem("Ignore-List", JSON.stringify(IGNORE_LIST));
						$('#optionsWindow').remove();
						$('.blackout').remove();
					}
				}
			]
		}
	);
	IGNORE_LIST = JSON.parse(localStorage.getItem("Ignore-List"));
	$("#ignored").val(IGNORE_LIST.join("\n"));
}

// Changes current status.
function changeStatus() {
	if (mainRoom.model.users.findByName(mw.config.get('wgUserName')).attributes.statusState == "here") {
		$(window).unbind('mousemove').unbind('focus');
		$("#chat-status").html("Go AFK");
		mainRoom.setAway();
	}
	else {
		$("#chat-status").html("Go Back");
		mainRoom.setBack();
	}
}