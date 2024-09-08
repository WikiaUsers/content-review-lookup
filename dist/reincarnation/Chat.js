$(function() {
	/* self badge */
	var g = mw.config.get("wgUserGroups"),
		order = ["bureaucrat", "sysop", "junioradmin", "chatmoderator"],
		myGroups = mw.config.get("wgUserGroups"),
		dominantGroup;
		icons = {
                        "bureaucrat": "https://images.wikia.nocookie.net/reincarnation/images/2/2c/Fgdfgdf.png",
			"sysop": "https://images.wikia.nocookie.net/reincarnation/images/9/95/Eredfg.png",
                        "junioradmin": "https://images.wikia.nocookie.net/reincarnation/images/1/14/Vilemediaa.png",
                        "chatmoderator": 
"https://images.wikia.nocookie.net/reincarnation/images/1/11/Demon_fetusasghf.png"
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
                $.getJSON("/api.php?action=query&format=json&list=allusers&augroup=junioradmin&aulimit=max&cb=" + new Date().getTime()),
                $.getJSON("/api.php?action=query&format=json&list=allusers&augroup=chatmoderator&aulimit=max&cb=" + new Date().getTime())
	).done(function(data_bureaucrat, data_sysop, data_junioradmin, data_chatmoderator) {
		var users = {
			        "bureaucrat": data_bureaucrat[0].query.allusers,
                                "sysop": data_sysop[0].query.allusers,
                                "junioradmin": data_junioradmin[0].query.allusers,
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

importScriptPage('User:Monchoman45/ChatHacks.js', 'c');
 
 importScriptPage('ChatOptions/code.js', 'dev');
 
importArticles({
       type: 'script',
       articles: [
            'u:shining-armor:MediaWiki:ChatTags/code.js',
            'u:dev:!kick/code.js',
            'u:dev:!mods/code.js',
            'u:dev:QuickModTools/code.js',
            'u:dev:ChatAnnouncements/code.js',
            'MediaWiki:ChatParty.js',
            'MediaWiki:Chat.js/Sandbox.js',  /* For sandboxing codes */
             // 'MediaWiki:chat.js/test.js' /* For testing */
       ]
});
 
/* Party Link */
var partyLink = "https://images.wikia.nocookie.net/lmbtest/images/4/4b/Pharrell_Williams_-_Happy.ogg"; 
var partyLink2 = "";
var partyLink3 = "";
var partyLink4 = ""; 
var partyLink5 = "";
 
var partyLinkIE = "http://k007.kiwi6.com/hotlink/xc1pw6yadb/Pharrell_Williams_-_Happy.mp3"; 
var partyLinkIE2 = "";
var partyLinkIE3 = "";
var partyLinkIE4 = "";
var partyLinkIE5 = "";
 
var partyLinkText = "Happy by Pharrell Williams";
var partyLinkText2 = "Gangnam Style by PSY";
var partyLinkText3 = "Too Close by Alex Clare";
var partyLinkText4 = "Let it Go by Idina Menzel";
var partyLinkText5 = "Fancy by Charli XCX";
 
/* add clock */
	/* set main object */
window.Widget = window.Widget || {};
 
Widget.clock = {
	fn :{},
	data: {},
	core: {}
};
 
/* markup */
Widget.clock.core.xml = $('<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" xlink:xmlns="http://www.w3.org/1999/xlink" id="cpw-clock" style="margin-top: -22px; zoom: 0.9; vertical-align: middle;">\n' +
	'\t<defs>\n' +
		'\t\t<!-- hour circle -->\n' +
		'\t\t<g id="cpw-clock-hrcirc">\n' +
			'\t\t\t<circle cx="0" cy="0" r="1" />\n' +
		'\t\t</g>\n' +
		'\t\t<!-- hour structure -->\n' +
		'\t\t<g id="cpw-clock-hrcirc-pair">\n' +
			'\t\t\t<use xlink:href="#cpw-clock-hrcirc" x="1" y="1" />\n' +
			'\t\t\t<use xlink:href="#cpw-clock-hrcirc" x="1" y="29" />\n' +
		'\t\t</g>\n' +
		'\t\t<!-- hour structure - primary -->\n' +
		'\t\t<g id="cpw-clock-hrcirc-pair-0">\n' +
			'\t\t\t<use xlink:href="#cpw-clock-hrcirc-pair" style="fill: #c00; stroke: #0cc; stroke-width: 0.5;" />\n' +
		'\t\t</g>\n' +
		'\t\t<!-- hour structure - secondary -->\n' +
		'\t\t<g id="cpw-clock-hrcirc-pair-1">\n' +
			'\t\t\t<use xlink:href="#cpw-clock-hrcirc-pair" fill="#803300" />\n' +
		'\t\t</g>\n' +
	'\t</defs>\n' +
	'\t<!-- main clock -->\n' +
	'\t<g>\n' +
		'\t\t<circle cx="20" cy="20" r="20" fill="#e66" />\n' +
		'\t\t<circle cx="20" cy="20" r="17" style="fill: #fff; stroke: #ffd5d5; stroke-width: 2;" />\n' +
		'\t\t<!-- time zone text -->\n' +
		'\t\t<text x="1000" y="30" font-family="helvetica, arial, sans" font-size="9" id="cpw-clock-zonetxt" fill="#bbb">unset</text>\n' +
		'\t\t<!-- hour circles -->\n' +
		'\t\t<use xlink:href="#cpw-clock-hrcirc-pair-0" x="19" y="5" fill="#c00" />\n' +
		'\t\t<use xlink:href="#cpw-clock-hrcirc-pair-1" x="19" y="5" transform="rotate(30 20 20)" />\n' +
		'\t\t<use xlink:href="#cpw-clock-hrcirc-pair-1" x="19" y="5" transform="rotate(60 20 20)" />\n' +
		'\t\t<use xlink:href="#cpw-clock-hrcirc-pair-0" x="19" y="5" transform="rotate(90 20 20)" />\n' +
		'\t\t<use xlink:href="#cpw-clock-hrcirc-pair-1" x="19" y="5" transform="rotate(120 20 20)" />\n' +
		'\t\t<use xlink:href="#cpw-clock-hrcirc-pair-1" x="19" y="5" transform="rotate(150 20 20)" />\n' +
		'\t\t<!-- hands -->\n' +
			'\t\t\t<!-- seconds -->\n' +
		'\t\t<line x1="20" y1="20" x2="20" y2="5" id="cpw-clock-hands-s" transform="rotate(0 20 20)" style="stroke: #000; stroke-width: 0.5;" />\n' +
			'\t\t\t<!-- minutes -->\n' +
		'\t\t<line x1="20" y1="20" x2="20" y2="7" id="cpw-clock-hands-m" transform="rotate(60 20 20)" style="stroke: #d33; stroke-width: 1;" />\n' +
			'\t\t\t<!-- hours -->\n' +
		'\t\t<line x1="20" y1="20" x2="20" y2="11" id="cpw-clock-hands-h" transform="rotate(305 20 20)" style="stroke: #a1f; stroke-width: 1;" />\n' +
		'\t\t<!-- front -->\n' +
		'\t\t<circle cx="20" cy="20" r="1" fill="#000" />\n' +
	'\t</g>\n' +
'</svg>');
$("#ChatHeader .wordmark").append(Widget.clock.core.xml); // seems to work for now, otherwise add proper xml parsing
 
 
	/* data */
// dimensions
Widget.clock.data.dimensions = [40, 40];
 
// dimensions
Widget.clock.data.zones = {
	est: -7,
	utc: 0,
	_offset: new Date().getTimezoneOffset() / 60
};
// wanted mode
Widget.clock.data.mode = "est";
 
 
	/* functions */
// get transform rotation value
Widget.clock.fn.getRotation = function(deg) {
	var a = Widget.clock.data.dimensions;
	return "rotate(" + (deg % 180 === 0 && deg % 360 !== 0 ? "179.99" /* per stupid displays in paths, though lines seem to be fine */ : deg) + " " + (a[0] / 2) + " " + (a[1] / 2) + ")";
};
 
Widget.clock.fn.setHands = function(h, m, s) {
	var a = {
		h: document.querySelector("#cpw-clock-hands-h"),
		m: document.querySelector("#cpw-clock-hands-m"),
		s: document.querySelector("#cpw-clock-hands-s")
	};
	// set seconds
	a.s.setAttributeNS(null, "transform", Widget.clock.fn.getRotation(s * 6));
	// set minutes
	a.m.setAttributeNS(null, "transform", Widget.clock.fn.getRotation(m * 6));
	// set hours
	a.h.setAttributeNS(null, "transform", Widget.clock.fn.getRotation(h * 30 + m * 0.5));
};
 
// adjust the clock
Widget.clock.fn.setClock = function() { // mode is the given time zone
	var a = new Date().getTime(),
		b = new Date(a + (Widget.clock.data.zones[Widget.clock.data.mode] + Widget.clock.data.zones._offset) * 3600000);
	Widget.clock.fn.setHands(
		b.getHours(),
		b.getMinutes(),
		b.getSeconds()
	);
};
 
// set zone
Widget.clock.fn.setZone = function(mode) { // mode is the given time zone
	if (Widget.clock.data.zones.hasOwnProperty(mode) && mode.indexOf("_") !== 0) {
		// listed zone
		Widget.clock.data.mode = mode;
		var txt = document.querySelector("#cpw-clock-zonetxt");
		txt.innerHTML = mode.toUpperCase();
		txt.setAttributeNS(null, "x", (Widget.clock.data.dimensions[1] - txt.getBoundingClientRect().width) / 2);
	}
};
 
 
	/* implement */
Widget.clock.fn.setZone("est");
Widget.clock.fn.setClock();
Widget.clock.core.to = setInterval(
	Widget.clock.fn.setClock,
	1000
	);
	
 