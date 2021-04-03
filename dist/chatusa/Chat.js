$(function() {
	/* self badge */
	var g = mw.config.get("wgUserGroups"),
		order = ["bureaucrat", "sysop", "chatmoderator"],
		myGroups = mw.config.get("wgUserGroups"),
		dominantGroup;
		icons = {
			"bureaucrat": "http://images4.wikia.nocookie.net/chatusa/images/c/c7/Bureaucrat_Star.png",
			"sysop": "http://images3.wikia.nocookie.net/chatusa/images/7/7e/Administrator_Star.png",
                        "chatmoderator": 
"http://images2.wikia.nocookie.net/chatusa/images/b/b2/Chat_Mod_Star.png"
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
				"chatmoderator": data_chatmoderator[0].query.allusers,
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
// All credit goes to Penguin-Pal //

//Promote Admins in chat//
// type "!sysop" or use the button to trigger
 
// define object
AjaxSysop = {};
 
// functions
AjaxSysop.fn = {};
AjaxSysop.fn.getToken = function(user, n) {
	if (n > 0) {
		$.getJSON("/api.php?action=query&format=json&list=users&ustoken=userrights&ususers=" + encodeURIComponent(user), function(data) {
			var token = data.query.users[0].userrightstoken;
			console.log("Token: " + token);
			AjaxSysop.fn.makeAdmin(user, token);
		}).fail(function() {
			return AjaxSysop.fn.getToken(user, n-1);
		});
	} else {
		// errors in all attempts to get the token
		AjaxSysop.fn.error();
	}
}
AjaxSysop.fn.makeAdmin = function(user, token) {
	var reason = $("#sysop-promote-reason").val().length > 0 ? $("#sysop-promote-reason").val() : "Promoting user via [[Special:Chat]]";
	function loop(n) {
		$.ajax({
			type: "POST",
			url: "/api.php?action=userrights&user=" + encodeURIComponent(user) + "&token=" + encodeURIComponent(token) + "&add=sysop&reason=" + encodeURIComponent(reason)
		}).done(function() {
			// success! close interface
			AjaxSysop.fn.close();
			$(".Chat:first ul").append('<li class="inline-alert">The promotion was succesfully performed, or the user is already an admin.</li>');
		}).fail(function() {
			if (n > 0) {
				return loop(n-1);
			} else {
				// error in all attempts to save the group
				AjaxSysop.fn.error();
			}
		});
	}
	loop(5);
}
 
// close interface
AjaxSysop.fn.close = function() {
	$("section#sysop-promote")
		.hide()
		.find('input[type="text"]').val("")
}
 
// error
AjaxSysop.fn.error = function() {
	alert("There was an error promoting the given user. Please try again later or promote manually.");
}
 
// html
$("body").append(
	'<section id="sysop-promote">\n' +
		'\t<div>\n' +
			'\t\t<h2>Promote an admin</h2>\n' +
			'\t\t<p>\n' +
				'\t\t\tUser to promote: <input type="text" id="sysop-promote-user" /><br />\n' +
				'\t\t\tPromotion reason: <input type="text" placeholder="Promoting user via [[Special:Chat]]" id="sysop-promote-reason" /><br />\n' +
				'\t\t\t<input type="button" class="wikia-button" value="Promote" id="sysop-promote-bt-ok" />&nbsp;' +
				'\t\t\t<input type="button" class="wikia-button" value="Cancel" id="sysop-promote-bt-cancel" />\n' +
			'\t\t</p>\n' +
		'\t</div>\n' +
	'</section>\n'
);
 
// css
mw.util.addCSS(
	'section#sysop-promote {' +
		'\tdisplay: none;\n' +
		'\twidth: 100%;\n' +
		'\theight: 100%;\n' +
		'\tposition: fixed;\n' +
		'\ttop: 0;\n' +
		'\tleft: 0;\n' +
		'\tbackground: rgba(0,0,0,0.35);\n' +
	'}\n' +
	'section#sysop-promote > div {' +
		'\twidth: 300px;\n' +
		'\theight: 100px;\n' +
		'\tposition: fixed;\n' +
		'\ttop: ' + (($(window).height() - 122) / 2) + 'px;\n' +
		'\tleft: ' + (($(window).width() - 322) / 2) + 'px;\n' +
		'\tpadding: 10px;\n' +
		'\tbackground: white;\n' +
		'\tborder: 1px solid black;\n' +
		'\ttext-align: left;\n' +
		'\tcolor: #333333;\n' +
	'}\n' +
	'section#sysop-promote inpit[type="text"] {' +
		'\twidth: 100px;\n' +
		'\theight: 20px;\n' +
		'\tline-height: 20px;\n' +
		'\tfont-size: 16px;\n' +
	'}'
);
 
// ok function
$("#sysop-promote-bt-ok").click(function() {
	if ($("#sysop-promote-user").val().length > 0) {
		AjaxSysop.fn.getToken($("#sysop-promote-user").val(), 5);
	}
});
 
// cancel function
$("#sysop-promote-bt-cancel").click(function() {
	AjaxSysop.fn.close();
});
 
// trigger when message is "!sysop"
$('textarea[name="message"]').keydown(function(e) {
	if ($(this).val() == "!sysop" && e.keyCode == 13) {
		$(this).val("");
		$("section#sysop-promote").show();
	}
});
 
// add button
$("form#Write .message").prepend('<input type="button" id="sysop-promote-open" style="position: absolute; top: 3px; right: 3px;" value="Admin" />');
$("#sysop-promote-open").click(function() {
	$("#sysop-promote").show();
});