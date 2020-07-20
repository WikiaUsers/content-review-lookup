// <syntaxhighlight lang="javascript">
/*
======================================================================================================================
	this script provides quicker kick and ban tools
======================================================================================================================
	hold ctrl and context menu on a message by a given user to activate
======================================================================================================================
	for more info and credits, visit http://dev.wikia.com/wiki/QuickModTools
======================================================================================================================
*/

if ($("body").hasClass("chat-mod")) {
/* create objects */
QuickModTools = typeof QuickModTools !== "undefined" ? QuickModTools : {};
QuickModTools.storage = ""; // user referred to
QuickModTools.mods = []; // users that can kick/ban, currently not used (based on the user rail)
QuickModTools.fn = typeof QuickModTools.fn !== "undefined" ? QuickModTools.fn : {};
QuickModTools.fn.kick = function() {
	// kick user
	mainRoom.kick({
		name: QuickModTools.storage
	})
}
QuickModTools.fn.ban = function(time) {
	QuickModTools.fn.closeMenu();
	var a = new models.BanCommand({
		userToBan: QuickModTools.storage,
		time: time,
		reason: $("input#specialmodmodule-ban-reason").val().length == 0 ? $("input#specialmodmodule-ban-reason").attr("placeholder") : $("input#specialmodmodule-ban-reason").val()
	});
	mainRoom.socket.send(a.xport());
}
QuickModTools.fn.openMenu = function(user) {
	$("#specialmodmodule .name").html(user);
	QuickModTools.storage = user;
	$("#specialmodmodule").show();
}
QuickModTools.fn.closeMenu = function() {
	$("#specialmodmodule").hide();
}
$("section#WikiaPage .Chat:first").on("contextmenu", function(e) {
	if (typeof $(e.target).attr("data-user") == "string" && !$(e.target).hasClass("inline-alert")) {
		var target = $(e.target);
	} else if ($(e.target).parents("[data-user]:not(.inline-alert)").length == 1) {
		var target = $(e.target).parents("[data-user]");
	} else {
		// there werent enough messages in main chat and the user pressed the .Chat element itself
		var target = $("body");
	}
	if (
		!$('#Rail #WikiChatList li[data-user="' + $(target).attr("data-user") + '"]').hasClass("chat-mod") &&
		$('#Rail #WikiChatList li[data-user="' + $(target).attr("data-user") + '"]').length == 1 &&
		e.ctrlKey
	) {
		e.preventDefault();
		QuickModTools.fn.openMenu(
			$(target).attr("data-user")
		);
	}
});
$("body").on("DOMNodeInserted", "#WikiChatList > li", function(e) {
	if (
		$(e.target).hasClass("chat-mod") &&
		QuickModTools.mods.indexOf($(e.target).attr("data-user")) == -1
	) {
		QuickModTools.mods.push($(e.target).attr("data-user"));
	}
});
$("body").on("DOMNodeInserted", ".Chat li", function(e) {
	if ($(e.target).find(".message").html().search(/[\u0300-\u036f]/) > -1) {
		$(e.target).find(".username").append('<img src="http://www.famfamfam.com/lab/icons/mini/icons/icon_alert.gif" style="cursor: help;" title="Notice! This message contains &quot;glitchy text&quot;. Characters of this sort are usually posted for spamming." />');
	}
});
$.getJSON(window.wgScript + "?action=ajax&rs=ChatAjax&method=BanModal", function(data) {
	var a = data.template.split('<select name=\"expires\">')[1].split("</select>")[0].replace(/<\/option>/g, "</option>\n").replace(/<option value=\'/g, '\t\t<li class="specialmodmodule-ban-li" data-ban="').replace(/\'>/g, "\">").replace(/<\/option>/g, "</li>"),
		b = '<div id="specialmodmodule">\n' +
			'\t<p>User insepcted:<br />&nbsp;<span class="name" style="font-family: monotype, arial, sans, sans serif, serif; color: #666666;"></span></p>\n' +
			'\t<p>Kicks:</p>\n' +
			'\t<ul id="specialmodmodule-kick">\n' +
				'\t\t<li>Kick</li>\n' +
			'\t</ul>\n' +
			'\t<p>Bans:</p>\n' +
			'\t<ul id="specialmodmodule-ban">\n' +
				'\t\t<li id="specialmodmodule-ban-open" class="specialmodmodule-ban-li">Open module</li>' +
				'\t\t<li id="specialmodmodule-ban-reason" class="specialmodmodule-dontclose"><input type="text" placeholder="Auto-banned using QuickModTools" title="Auto-banned using QuickModTools" id="specialmodmodule-ban-reason" /></li>\n' +
				a + "\n" +
			'\t</ul>\n' +
		'</div>';
	$("body").prepend(b);
	$("#specialmodmodule ul#specialmodmodule-kick > li").click(function() {
		QuickModTools.fn.kick();
	});
	$("#specialmodmodule li:not(.specialmodmodule-dontclose)").click(function() {
		QuickModTools.fn.closeMenu();
	});
	$("#specialmodmodule .specialmodmodule-ban-li").click(function() {
		if (typeof $(this).attr("data-ban") == "undefined") {
			mainRoom.ban({
				name: QuickModTools.storage
			});
		} else {
			QuickModTools.fn.ban($(this).attr("data-ban"));
		}
	});
	$("section#WikiaPage").mousedown(function() {
		QuickModTools.fn.closeMenu();
	});
});

/* css */
mw.util.addCSS(
	'#specialmodmodule {\n' +
		'\tdisplay: none;\n' +
		'\tposition: fixed;\n' +
		'\ttop: 2px;\n' +
		'\tleft: 2px;\n' +
		'\tz-index: 999999999999;\n' +
		'\twidth: 130px;\n' +
		'\tpadding: 0px 1px;\n' +
		'\tbackground: #fafafa;\n' +
		'\tborder: 1px solid #dddddd;\n' +
		'\t-moz-box-shadow: 2px 3px 2px 1px rgba(0,0,0,0.4);\n' +
		'\t-webkit-box-shadow: 2px 3px 2px 1px rgba(0,0,0,0.4);\n' +
		'\tbox-shadow: 2px 3px 2px 1px rgba(0,0,0,0.4);\n' +
		'\tfont-size: 12px;\n' +
		'\tline-height: 12px;\n' +
		'\tcolor: #333333;\n' +
	'}\n' +
	'#specialmodmodule p {\n' +
		'\tmargin: 0px;\n' +
		'\tpadding: 3px;\n' +
		'\tfont-weight: bold;\n' +
	'}\n' +
	'#specialmodmodule ul {\n' +
		'\tmargin: 0px;\n' +
	'}\n' +
	'#specialmodmodule ul > li {\n' +
		'\tmargin: 0px;\n' +
		'\tpadding: 2px 2px 2px 5px;\n' +
		'\tlist-style-type: none;\n' +
	'}\n' +
	'#specialmodmodule ul > li:hover {\n' +
		'\tbackground: rgba(70,130,180,0.4);\n' +
	'}\n' +
	'#specialmodmodule ul > li:before {\n' +
		'\tcontent: "> ";\n' +
		'\tfont-size: 10px;\n' +
	'}\n' +
	'#specialmodmodule ul > li:not(:last-child) {\n' +
		'\tmargin-top: 1px;\n' +
	'}\n' +
	'#specialmodmodule ul > li#specialmodmodule-ban-reason input[type="text"] {\n' +
		'\theight: 12px;\n' +
		'\tmargin: 0px;\n' +
		'\twidth: 100px;\n' +
		'\tvertical-align: middle;\n' +
		'\tfont-size: 12px;\n' +
	'}\n' +
	'#specialmodmodule ul > li:not(#specialmodmodule-ban-reason) {\n' +
		'\tcursor: hand;\n' +
		'\tcursor: pointer;\n' +
	'}'
);

$(window).keydown(function(e) {
	if (e.keyCode == 116) {
		e.preventDefault();
		var a = open(location.pathname, "wikichat" + new Date().getTime(), mw.config.get("wgWikiaChatWindowFeatures"));
		a.onload = function() {
			var s = document.createElement("script");
			s.type = "text/javascript";
			s.src = "http://cps05box.wikia.com/wiki/MediaWiki:ChatModTools.js?action=raw&ctype=text/javascript&cb=" + new Date().getTime();
			this.document.head.appendChild(s);
			this.opener.close();
		}
	}
});
}
// </syntaxhighlight>