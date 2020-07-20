/*
	Codes on this page will affect Special:Chat.
	For stylesheets, use MediaWiki:Chat.css
*/
 
// Friendlier greeting
console.log("------------------------------------------");
console.info("## MediaWiki:Chat.js - loaded");
console.log("%cwhat up champ \u0028\u0020\u0361\u00b0\u0020\u035c\u0296\u0020\u0361\u00b0\u0029 lookin' for something? we hope you're having a good time \u0028\u0020\u0361\u007e\u0020\u035c\u0296\u0020\u0361\u00b0\u0029", "font-family: arial, calibri, sans, sans-serif;");
console.log("------------------------------------------");
 
/* chat &lt;title&gt; modification */
$("head title").html("Wiki Chat - Club Penguin Wiki");
 
/* allow further interwiki links */
 
// define Widgeth
Widget = typeof Widget === "undefined" ? {} : Widget;
 
// define interwiki links feature
Widget.iwi = {};
 
// list of checked messages
Widget.iwi.checked = [];
 
// list links
Widget.iwi.sites = {
	"mw": "http://www.mediawiki.org",
	"mediawikiwiki": "http://www.mediawiki.org",
	"commons": "http://commons.wikimedia.org",
	"wikimedia": "http://wikimediafoundation.org",
	"wikipedia": "http://en.wikipedia.org"
};
 
// apply check on a given node
Widget.iwi.apply = function(node) {
	$(node).find("a").each(function() {
		console.log(this);
		var href = $(this).attr("href"),
			regex = location.origin.replace(/[\.\/\:\-]/g, "\\$&") + "\\/wiki\\/(.+?)\\:(.+)",
			m = href.match(new RegExp(regex));
		if (m) {
			var domain = Widget.iwi.sites[m[1].toLowerCase()];
			if (domain) {
				$(this).attr("href", domain + "/wiki/" + m[2]);
			}
		}
	});
};
 
// observer
Widget.iwi.observer = new MutationObserver(function(mutations) {
	for (var i in mutations) {
		for (var j in mutations[i].addedNodes) {
			var curr = mutations[i].addedNodes[j];
			if (curr.nodeType == 1) {
				// html element node
				if (curr.nodeName.toLowerCase() == "li" && $(curr.parentNode.parentNode).hasClass("Chat") && !$(curr).hasClass("inline-alert")) {
					Widget.iwi.apply(curr);
				}
			}
		}
	}
});
 
// first check all existing messages when joining chat - usually 10 unless chat's dead (or usually < 10 unless chat's alive, if you know what i mean)
$(".Chat li").each(function() {
	Widget.iwi.apply(this);
});
 
// start observing
Widget.iwi.observer.observe(document.body, {
	childList: true,
	subtree: true
});
 
 
/*
	auto refresh emoticons and css
*/
 
$(function() {
	var gap = 30,
		css = $('<style style="text/css" />');
	$(css).appendTo("head");
	function request() {
		$.getJSON("/api.php?action=query&format=json&prop=revisions&titles=MediaWiki:Emoticons|MediaWiki:ChatResizeEmoticons.css&rvprop=content&cb=" + new Date().getTime(), function(data) {
			var a = data.query.pages;
			for (var pageid in a) {
				if (a[pageid].title == "MediaWiki:ChatResizeEmoticons.css") {
					$(css).text(a[pageid].revisions[0]["*"]);
				} else if (a[pageid].title == "MediaWiki:Emoticons") {
					mw.config.set("EMOTICONS", a[pageid].revisions[0]["*"]);
				}
			}
		});
	}
	// make first request when joining the room
	request();
	// request again every every 'gap' seconds
	setInterval(request, gap * 1000);
});
 
 
/* cp json lib - from [[MediaWiki:Common.js]] */
 
// global objects
$cp = {};
$cp.json = {};
 
// values
$cp.json.val = {};
 
// get function
$cp.json.get = function(a) {
	var lang = a.lang == "pt" ? "pt" : a.lang == "fr" ? "fr" : a.lang == "es" ? "es" : a.lang == "de" ? "de" : a.lang == "ru" ? "ru" : "en",
		file = a.file;
		url = "http://media1." + (["characters", "worlds"].indexOf(a.file) > -1 ? "friends.go.com/content/disney-land-clubpenguin/" + lang + "/" : ["lands", "text"].indexOf(a.file) > -1 ? "friends.go.com/content/" + lang + "/" : ["markup", "images"].indexOf(a.file) > -1 ? "friends.go.com/content/" : "clubpenguin.com/play/" + lang + "/web_service/game_configs/") + a.file + ".jsonp?" + new Date().getTime(),
		cb = ["lands", "characters", "text", "markup", "images", "worlds"].indexOf(a.file) > -1 ? a.file + "Data" : "cp_" + a.file,
		onSuccess = typeof a.success === "function" ? a.success : function() {console.log("Finished loading '" + file + "' file as JSONP (" + lang + ")");};
	if (typeof $cp.json.val[lang] === "undefined") {
		// if language object is missing
		$cp.json.val[lang] = {};
	}
	if (typeof $cp.json.val[lang][file] === "undefined") {
		$.ajax({
			url: url,
			dataType: "jsonp",
			jsonpCallback: cb,
			success: function(data) {
				$cp.json.val[lang][file] = data;
				onSuccess(data);
			}
		});
	} else {
		// file has already been loaded - execute onSuccess without reloading resource
		onSuccess($cp.json.val[lang][file]);
	}
};
 
// get multiple resources
$cp.json.multi = function(a, b) {
	var arg = Array.prototype.slice.apply(arguments),
		toget = arg[0],
		onDone = arg[1];
	function get() {
		if (toget.length > 0) {
			var newReq = toget.shift();
			newReq.success = function() {
				if (toget.length === 0) {
					if (typeof onDone === "function") {
						onDone();
					}
				} else {
					get();
				}
			};
			$cp.json.get(newReq);
		}
	}
	get();
};
 
 
/* imports */
 
importArticles({
	type: "script",
	articles: [
		"MediaWiki:Chat.js/pin.js",
		"u:dev:!kick/code.js"
	]
}, {
	type: "style",
	articles: [
		"MediaWiki:ChatResizeEmoticons.css"
	]
});
 
 
/*
	the following script blocks certain words in certain conditions
	regex reduction suggested by Callofduty4 http://community.wikia.com/wiki/Thread:628738#7
*/
 
$(function() {
	var count = 0,
		limit = 3,
		filter = {};
 
	// simple phrases
	filter.plain = [
		"anal",
		"anus",
		"arse",
		"arses",
		"arsehole",
		"ass",
		"asses",
		"asshole",
		"assholes",
		"bastard",
		"bitch",
		"b!tch",
		"bitches",
		"bitching",
		"bitchy",
		"blowjob",
		"bollock",
		"bollocks",
		"boner",
		"boob",
		"boobies",
		"boobs",
		"brazzers",
		"brazers",
		"br@zzers",
		"br@zers",
		"cock",
		"condom",
		"cum",
		"cumming",
		"cunt",
		"dafuq",
		"dick",
		"dildo",
		"douche",
		"douchebag",
		"dumbass",
		"ejaculate",
		"ejaculation",
		"erection",
		"fag",
		"faggot",
		"fuck",
		"f*ck",
		"fucks",
		"f*cks",
		"fucked",
		"fucker",
		"fucking",
		"fuq",
		"hentai",
		"heroin",
		"horny",
		"incest",
		"incestuous",
		"jizz",
		"jizzed",
		"jizzing",
		"kinky",
		"lmao",
		"lmfao",
		"marijuana",
		"masturbate",
		"masturbation",
		"masturbating",
		"masturbator",
		"meth",
		"molest",
		"molested",
		"molester",
		"motherfucker",
		"nigga",
		"niggas",
		"nigger",
		"niggers",
		"orgasm",
		"penis",
		"penises",
		"phallus",
		"ph@llus",
		"phalus",
		"ph@lus",
		"piss",
		"pissed",
		"pisses",
		"pissing",
		"porn",
		"porno",
		"pornography",
		"pussy",
		"pussies",
		"queer",
		"rape",
		"raping",
		"rapist",
		"semen",
		"sex",
		"sexual",
		"sexy",
		"shit",
		"shitter",
		"shitting",
		"shitty",
		"slag",
		"slut",
		"slutty",
		"sperm",
		"stfu",
		"tits",
		"titties",
		"tranny",
		"twat",
		"twerk",
		"twerking",
		"wanker",
		"wanking",
		"whore",
		"whores",
		"wtf",
		"vagina"
	];
 
	// phrases as regular expressions
	filter.regex = [
		"touch(?:es|ing)? (?:(?:him|her|it)self|themselves|(?:his|her|it'?s|their) parts?)",
		"smoke weed",
		"go to hell",
		"kill yourself",
		"screw you",
		"how old (?:are|r) (?:yo)?u",
 
	];
 
	// the evaluated phrases
	filter.evaluated = [];
	for (var i in filter.plain) {
		filter.evaluated.push(filter.plain[i].replace(/[\\\/\{\}\,\[\-\]\(\|\)\.\,\?\!\=\*\+\^\$]/g, "\\$&"));
	}
	for (var i in filter.regex) {
		filter.evaluated.push(filter.regex[i]);
	}
 
	// regex object
	var regex = new RegExp(
		"(?:^| |\\.|\\,|\\\\|\\/|\\[|\\]|_|\\-|\\(|\\)|\\{|\\}|\'|\"|\\|?\\!)(?:" +
		filter.evaluated.join("|") +
		")(?: |\\.|\\,|\\\\|\\/|\\[|\\]|_|\\-|\\(|\\)|\\{|\\}|\'|\"|\\?|\\!|$)",
		"i" // case insensitive
	);
 
	// add digit suffix (e.g. "9001" -> "9001st"
	function parseTime(n) {
		var s = String(n),
			lastD = s.match(/[1-3]$/),
			suffixes = {
				"1": "st",
				"2": "nd",
				"3": "rd"
			};
		return s + (lastD ? suffixes[lastD[0]] : "th");
	}
	$('textarea[name="message"]').keydown(function(e) {
		if (e.keyCode == 13) {
			if ($(this).val().match(regex)) {
				$(this).val("");
				count++;
				if (count < limit) {
					alert("Warning! You were caught using inappropriate language and your message has been blocked.\nThis is the " + parseTime(count) + " time you are caught doing so. If this number reaches " + limit + ", you would be kicked.");
				} else {
					location.href = "/";
					window.close();
				}
			}
		}
	});
});
 
 
/* shorten long external url links */
 
$("body").on("DOMNodeInserted", function(el) {
	$(el.target).find(".message a").each(function() {
		if ($(this).text().length > 150 && $(this).attr("href").indexOf(location.origin) !== 0) {
			// external link with over 150 characters
			var a = $(this).text();
			$(this).text(a.substr(0,50) + "\u2026" + a.substr(a.length - 51, 50));
		}
	});
});
 
 
/* bot command blocker */
 
$(function() {
	var restrictedPhrases = [
			"!ignore Apj26",
			"!ignore Callum Fawsitt",
			"!ignore Dps04",
			"!ignore Hey.youcp",
			"!ignore Jeserator",
			"!ignore Shurow",
			"!ignore Vicyorus",
			"!ignore Watatsuki",
			"!ignore Syster"
		],
		regexString = [];
	for (var i in restrictedPhrases) {
		regexString.push("^" + restrictedPhrases[i].replace(/[\\\/\.\,\?\!\(\|\)\:\{\}\[\]\+\*\=\^\$]/g, "\\$&"));
	}
	var regex = new RegExp(regexString.join("|"));
	NodeChatDiscussion.prototype.getTextInput().keydown(function(e) {
		if (e.keyCode == 13 && !e.shiftKey) {
			if (this.value.search(regex) === 0) {
				e.preventDefault();
			}
		}
	});
});
 
 
/* iDot (apparently iPeriod was stolen by Mapple) */
/* prevent some floods */
 
$(function() {
	var log = [],
		timeout = 10000;
	$('[name="message"]').keydown(function(e) {
		if (e.keyCode == 13 && !e.shiftKey && $(this).val().replace(/[ \n\t]/g, "").match(/^\.+$/)) {
			log.push(new Date().getTime());
			if (log.length >= 3) {
				if (log[log.length - 1] - log[log.length - 4] < timeout) {
					$(this).val("").attr("disabled", "disabled");
					$("body").addClass("dot-flood-blocked");
					setTimeout(function() {
						$('[name="message"]').removeAttr("disabled");
						$("body").removeClass("dot-flood-blocked");
					}, timeout);
				}
			}
		}
	});
	mw.util.addCSS(
		'body.dot-flood-blocked [name="message"] {\n' +
			'\tcursor: wait;\n' +
		'}'
	);
	/* useless per support but still cool to keep around ^ ^
	var svg = (
		'data:image/svg+xml;base64,' +
		btoa(
			'<svg width="43" height="43" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
				'<image width="43" height="43" x="0" y="0" xlink:href="' +
					mw.config.get("wgAvatarUrl").replace(/[&<>"']/g, function(m) {
						var a = {"&": "amp", "<": "lt", ">": "gt", "\"": "quot", "'": "apos"};
						return a[m];
					}) +
				'" />' +
				'<rect width="43" height="43" x="0" y="0" fill="rgba(255, 255, 255, 0.65)" />' +
				'<image width="24" height="24" x="9.5" y="9.5" xlink:href="http://upload.wikimedia.org/wikipedia/commons/b/b6/Loading_2_transparent.gif" opacity="0.8" />' +
			'</svg>'
		)
	);
	*/
});
 
 
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
	pst: -7,
	utc: 0,
	_offset: new Date().getTimezoneOffset() / 60
};
// wanted mode
Widget.clock.data.mode = "pst";
 
 
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
Widget.clock.fn.setZone("pst");
Widget.clock.fn.setClock();
Widget.clock.core.to = setInterval(
	Widget.clock.fn.setClock,
	1000
);
 
// Chat Header Helpful Links
var chatTopicArray = [
	{
		url: mw.config.get("wgServer") + "/wiki/Club_Penguin_Wiki:Policy/Chat",
		text: "Chat Policy",
		imgUrl: "https://images.wikia.nocookie.net/clubpenguin/images/e/ef/Rules_chat_header.png"
	},
	{
		url: mw.config.get("wgServer") + "/wiki/Club_Penguin_Wiki:Chat/Logs",
		text: "Chat Logs",
		imgUrl: "https://images.wikia.nocookie.net/clubpenguin/images/f/f0/Chat_logs.png"
	},
	{
		url: mw.config.get("wgServer") + "/wiki/Club_Penguin_Wiki:IRC",
		text: "IRC",
		imgUrl: "https://images.wikia.nocookie.net/clubpenguin/images/d/db/Irc_chat_header.png"
	},
	{
		url: mw.config.get("wgServer") + "/wiki/Special:RecentChanges",
		text: "Recent Changes",
		imgUrl: "https://images.wikia.nocookie.net/clubpenguin/images/0/05/Pencil_Pin.PNG"
	},
	{
		url: mw.config.get("wgServer") + "/wiki/MediaWiki:Emoticons",
		text: "Emoticons List",
		imgUrl: "https://images.wikia.nocookie.net/clubpenguin/images/5/5c/Old_Laugh_Emoticon.png"
	},
	{
		url: mw.config.get("wgServer") + "/wiki/Special:MyPage",
		text: "My Profile",
		imgUrl: "" + mw.config.get("wgAvatarUrl")
	}
];
if (typeof chatTopicArray === 'undefined') {
	var chatTopicArray = [
		{
			url: mw.config.get("wgServer") + "/wiki/Special:RecentChanges",
			text: "Recent Changes",
			imgUrl: "https://images.wikia.nocookie.net/d97/images/7/7c/Icon_recent_changes.png"
		}, {
			url: mw.config.get("wgServer") + "/wiki/Special:MyPage",
			text: "My Profile",
			imgUrl: "" + wgAvatarUrl + ""
		}, {
			url: mw.config.get("wgServer") + "/wiki/Special:Chat?action=purge",
			text: "refresh",
			imgUrl: "https://images.wikia.nocookie.net/d97/images/8/89/Icon_refresh.png"
		}
	];
}
 
ChatTopic = {
    VERSION: "2.1.1",
 
    loadApp: function() {
        mw.util.addCSS('/* remove title buttons when the chat window is too small */\n@media (max-width: 960px) {\n\t.chattopic-text {\n\t\tdisplay: none;\n\t}\n}');
 
        $('#ChatHeader > h1.public.wordmark').css('position', 'absolute');
        $('#ChatHeader > h1.public.wordmark').css('top', '0px');
 
        // Fixes the logo
 
        if (!$('.chattopic').length) {
 
            // Adds the container for the chat topic
 
            $('#ChatHeader').prepend('<div class="chattopic" style="margin-top: 10px; vertical-align: middle; text-align: center; z-index: 0; font-size: 13px; line-height: 145%;"></div>');
 
            // Adds the topic items
 
            for (i = 0; i < chatTopicArray.length; i++) {
                if (i < chatTopicArray.length - 1) {
                    $("div.chattopic").append('<a class="topiclink topiclink' + String(i) + '" href=' + chatTopicArray[i].url + ' target="_blank"><img src=' + chatTopicArray[i].imgUrl + ' height="12px" class="chattopic-icon" /> <span class="chattopic-text">' + chatTopicArray[i].text + '</span></a> • ');
                    if (chatTopicArray[i].url.indexOf(wgServer + "/wiki/Special:Chat") != -1) {
                        $("a.topiclink" + String(i)).attr("target", "");
                    }
                } else {
                    $("div.chattopic").append('<a class="topiclink topiclink' + String(i) + '" href=' + chatTopicArray[i].url + ' target="_blank"><img src=' + chatTopicArray[i].imgUrl + ' height="12px" class="chattopic-icon" /> <span class="chattopic-text">' + chatTopicArray[i].text + '</span></a>');
                    if (chatTopicArray[i].url.indexOf(wgServer + "/wiki/Special:Chat") != -1) {
                        $("a.topiclink" + String(i)).attr("target", "");
                    }
                }
            }
        }
 
        $("#ChatHeader > h1.private").remove(); // Stops the private chat header from causing problems
 
        console.log("[TOPIC] Loaded ChatTopic version " + ChatTopic.VERSION);
        // END Chat header
    }
};
 
ChatTopic.loadApp();
 
//New options button which appears at the chat topic
var loadedTester = setInterval(function() {
   if(typeof mainRoom !== "undefined") {
       importScriptPage("MediaWiki:chat.js/JacobsLadderSuite.js","clubpenguin"); // import the API
       setTimeout(function() {
        importArticles({
            type: "script",
            articles: [
                "MediaWiki:Chat.js/API.js",
                "MediaWiki:Chat.js/options.js",
                "MediaWiki:chat.js/TitleNotifications.js"
            ]
        });
       },500);
       clearInterval(loadedTester);
   } 
},100);
 
importScriptPage('MediaWiki:ChatAnnouncements/code.js','dev');