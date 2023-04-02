$(function() {
	/* self badge */
	var g = mw.config.get("wgUserGroups"),
		order = ["bureaucrat", "sysop", "patroller", "rollback"],
		myGroups = mw.config.get("wgUserGroups"),
		dominantGroup;
		icons = {
			"bureaucrat": "https://images.wikia.nocookie.net/the-unwanted/images/0/09/Bcrat_Star.png",
			"sysop": "https://images.wikia.nocookie.net/the-unwanted/images/0/03/Admin_Star.png",
			"patroller": "https://images.wikia.nocookie.net/the-unwanted/images/8/8d/Patroller_Star.png",
			"rollback": "https://images.wikia.nocookie.net/the-unwanted/images/8/8f/Rollback_Star.png"
		};
	for (var i in order) {
		var currGroup = order[i];
		if (myGroups.indexOf(currGroup) > -1) {
			dominantGroup = currGroup;
			break;
		}
	}
	if (typeof dominantGroup === "string") {
		$("body").addClass("cugroup-" + dominantGroup);
		mw.util.addCSS(
			'body.cugroup-' + dominantGroup + ' #ChatHeader > .User > .username:after {\n' +
				'\tbackground-image: url(\'' + icons[dominantGroup] + '\');\n' +
				'\tbackground-position: 0 0;\n' +
			'}'
		);
	}

	/* badges user list */
	$.when(
		$.getJSON("/api.php?action=query&format=json&list=allusers&augroup=bureaucrat&aulimit=max&cb=" + new Date().getTime()),
		$.getJSON("/api.php?action=query&format=json&list=allusers&augroup=sysop&aulimit=max&cb=" + new Date().getTime()),
		$.getJSON("/api.php?action=query&format=json&list=allusers&augroup=patroller&aulimit=max&cb=" + new Date().getTime()),
		$.getJSON("/api.php?action=query&format=json&list=allusers&augroup=rollback&aulimit=max&cb=" + new Date().getTime())
	).done(function(data_bureaucrat, data_sysop, data_patroller, data_rollback) {
		var users = {
				"bureaucrat": data_bureaucrat[0].query.allusers,
				"sysop": data_sysop[0].query.allusers,
				"patroller": data_patroller[0].query.allusers,
				"rollback": data_rollback[0].query.allusers
			},
			checkedUsers = [],
			cssData = {},
			cssOutput = "";
		for (var i in order) {
			var currGroup = order[i];
			for (var j in users[currGroup]) {
				var currUser = users[currGroup][j];
				if (checkedUsers.indexOf(currUser.name) == -1 && currUser.id > 0) {
					checkedUsers.push(currUser.name);
					if (!cssData.hasOwnProperty(currGroup)) {
						cssData[currGroup] = [];
					}
					cssData[currGroup].push('body.ChatWindow #Rail .User[data-user="' + currUser.name + '"] .username:after');
				}
			}
		}
		for (var i in order) {
			if (typeof cssData[order[i]] === "object") {
				cssOutput += (
					cssData[order[i]].join(",") + '{' +
						'background-image: url(\'' + icons[order[i]] + '\');' +
					'background-position: 0 0;' +
					'}'
				);
			}
		}
		mw.util.addCSS(cssOutput);
	});
});