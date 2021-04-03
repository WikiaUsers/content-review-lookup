var CustomAlerts = {};
 
// command list
CustomAlerts.cmd = {
	waffles: "Waffle party!",
	gaben: "ALL HAIL LORD (gaben) ",
	dbz: "Always bet on dbz Kappa ",
	potato: "Potato ate my toilet D: ",
	walruses: "Walrus party!"
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
					cmd = message.match(/^\!(.+)/);
				if (cmd) {
					// command exists
					CustomAlerts.implement(node, cmd[1]);
				}
			}
		}
	}
});
 
// function for replacing a node
CustomAlerts.implement = function(node, cmd) {
	if (CustomAlerts.cmd.hasOwnProperty(cmd)) {
		// command exists - replace message with inline alert
		var li = $('<li />');
		$(li).attr({
			"data-user": $(node).attr("data-user"),
			"class": "inline-alert pseudo-inline-alert"
		}).html(CustomAlerts.cmd[cmd]);
		$(node).replaceWith(li);
	}
}
 
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