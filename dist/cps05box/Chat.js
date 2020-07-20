/* functions */
var fn = {};
// get dominant group of given user
fn.getDominantGroup = function(groups) {
	var group = null,
		order = ["bot", "staff", "bureaucrat", "sysop", "patroller", "rollback", "chatmoderator", "interfaceeditor"],
		exceptions = { // custom class names
			"rollback": "patrollback",
			"patroller": "patrollback",
			"bot-global": "bot"
		}
		i;
	for (var i = 0; i < order.length; i++) {
		if (groups.indexOf(order[i]) > -1) {
			group = order[i];
			break;
		}
	}
	if (exceptions.hasOwnProperty(group)) {
		group = exceptions[group];
	}
	return group;
}
// get user object by username
fn.getUserObj = function(name) {
	return mainRoom.viewUsers.model.users.findByName(name);
}
// update user elements by user object
fn.updateUser = function(obj) {
	var groups = obj.attributes.groups;
	fn.updateAttrs(obj.view.el, groups);
	if (obj.attributes.name == mw.config.get("wgUserName")) {
		fn.updateAttrs("#ChatHeader .User", groups);
	}
}
// update all users
fn.updateAll = function() {
	var allusers = mainRoom.viewUsers.model.users.models,
		i;
	for (i = 0; i < allusers.length; i++) {
		fn.updateUser(allusers[i]);
	}
}
// update attributes
fn.updateAttrs = function(el, groups) {
	$(el).attr({
		"data-groups": groups.join(" "),
		"data-groups-main": fn.getDominantGroup(groups)
	});
}

/* css */
mw.util.addCSS(
	'.badge svg {\n' +
		'\tdisplay: none;\n' +
	'}'
);

/* events */
// current user joins chat
mainRoom.socket.on("initial", function(msg) {
	fn.updateAll();
});
// someone joins chat after the current user has entered
mainRoom.socket.on("join", function(msg) {
	var data = JSON.parse(msg.data);
	fn.updateUser(fn.getUserObj(data.attrs.name));
});
// user update event
mainRoom.socket.on("updateUser", function(msg) {
	var data = JSON.parse(msg.data);
	fn.updateUser(fn.getUserObj(data.attrs.name));
});