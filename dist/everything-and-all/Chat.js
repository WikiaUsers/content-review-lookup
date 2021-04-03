
$(function() {
	/* self badge */
	var g = mw.config.get("wgUserGroups"),
		order = ["bureaucrat", "sysop", "chatmoderator"],
		myGroups = mw.config.get("wgUserGroups"),
		dominantGroup;
		icons = {
			"bureaucrat":"http://images3.wikia.nocookie.net/everything-and-all/images/6/64/Favicon.ico",
			"sysop": "http://images3.wikia.nocookie.net/everything-and-all/images/6/64/Favicon.ico",
                        "chatmoderator": 
"http://images3.wikia.nocookie.net/everything-and-all/images/6/64/Favicon.ico",
			
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
                $.getJSON("/api.php?action=query&format=json&list=allusers&augroup=chatmoderator&aulimit=max&cb=" + new Date().getTime())
		
	).done(function(data_bureaucrat, data_sysop, data_chatmoderator) {
		var users = {
				"bureaucrat": data_bureaucrat[0].query.allusers,
				"sysop": data_sysop[0].query.allusers,
				"chatmoderator": data_chatmoderator[0].query.allusers
			
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