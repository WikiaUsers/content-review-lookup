/**
 * 
 * Create custom chat commands in chat.
 * 
 * @author: Pepeal <w:c:pvzcc:User:Pepeal>
 * @author: Orbacal <w:c:pvzcc:User:Orbacal>.
 * @scope: Create custom chat commands. 
 * @notice: Please, avoid spamming those commands in chat.
 * 
 **/

var CustomAlerts = {};
var ownusername = wgUserName;
var perf = $("#pseudo-inline-alert").attr("data-user");
 
// command list
CustomAlerts.cmd = {
        // "User has joined/left the chat" commands.
        // @todo: Remove all of them.
iam: " You are " + wgUserName + "."
};

 
// observer
CustomAlerts.obs = new MutationObserver(function(a) {
	for (var i in a) {
		for (var j in a[i].addedNodes) {
			var node = a[i].addedNodes[j],
				isMsg = false;
			try {
				if (
					node.nodeType == 1 &&
					typeof $(node).attr("data-user") === "string" &&
					!$(node).hasClass("inline-alert") && // make sure that 'CustomAlerts.implement' doesnt attempt to replace custom alerts when inserted
					$(node).parents().eq(1).hasClass("Chat")
				) {
					// this is a chat message by some user
					isMsg = true;
				}
			} catch(err) {}
			if (isMsg) {
				var message = $(node).find(".message").html(),
					cmd = message.match(/^\!(.+)/),
					user = $(node).attr("data-user");
				if (cmd) {
					// command pattern found
					CustomAlerts.implement(node, cmd[1], user);
				}
			}
		}
	}
});
 
// function for replacing a node
CustomAlerts.implement = function(node, cmd, user) {
	if (CustomAlerts.cmd.hasOwnProperty(cmd)) {
		// command exists - replace message with inline alert
		if (!(CustomAlerts.modOnlyCmds.indexOf(cmd) > -1 && !mainRoom.viewUsers.model.users.findByName(user).attributes.isModerator)) {
			// make sure that a non-mod did not attempt to use a mod-only command
			var li = $('<li />');
			$(li).attr({
				"data-user": $(node).attr("data-user"),
			"class": "inline-alert pseudo-inline-alert"
			}).html(WikiaEmoticons.doReplacements(
				CustomAlerts.cmd[cmd],
				ChatView.prototype.emoticonMapping
			));
			$(node).replaceWith(li);
		}
	}
};
 
// add css to treat continue-messages after an alert as new messages
mw.util.addCSS(
	'.pseudo-inline-alert + .continued {\n' +
		'\tmin-height: 32px;\n' +
		'\tmargin-bottom: 0;\n' +
		'\tpadding-top: 18px;\n' +
		'\ttop: 0;\n' +
	'}\n' +
	'.Chat .pseudo-inline-alert + .continued img, .pseudo-inline-alert + .continued .time {\n' +
		'\tdisplay: inline;\n' +
	'}\n' +
	'.pseudo-inline-alert + .continued .username {\n' +
		'\tdisplay: block;\n' +
	'}'
);
 
// start observing chat
CustomAlerts.obs.observe(document.querySelector("#WikiaPage"), {
	childList: true,
	subtree: true
});