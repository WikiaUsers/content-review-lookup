/*
	Codes on this page will affect Special:Chat.
	For stylesheets, use MediaWiki:Chat.css
*/


// Friendlier greeting
console.log("%c" + new Array(119).join("-") + "\nwhat up champ \u0028\u0020\u0361\u00b0\u0020\u035c\u0296\u0020\u0361\u00b0\u0029 lookin' for something? we hope you're having a good time \u0028\u0020\u0361\u007e\u0020\u035c\u0296\u0020\u0361\u00b0\u0029\n" + new Array(119).join("-"), "font-family: arial, calibri, sans, sans-serif;");

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
	"wikipedia": "http://en.wikipedia.org",
	"wp": "http://en.wikipedia.org"
};

// check given node
Widget.iwi.check = function(node) {
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
					Widget.iwi.check(curr);
				}
			}
		}
	}
});

// first check all existing messages when joining chat - usually 10 unless chat's dead (or usually < 10 unless chat's alive, if you know what i mean)
$(".Chat li").each(function() {
	Widget.iwi.check(this);
});

// start observing
Widget.iwi.observer.observe(document.body, {
	childList: true,
	subtree: true
});




/*
	the following script blocks certain words in certain conditions
	regex reduction suggested by Callofduty4 http://community.wikia.com/wiki/Thread:628738#7
*/

$(function() {
	var count = 0,
		limit = 3,
		filter = {},
		i;
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
		"badass",
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
		"fap",
		"fapping",
		"fappening",
		"ffs",
		"fuck",
		"f*ck",
		"fucks",
		"f*cks",
		"fucked",
		"fucker",
		"fucking",
		"fuq",
		"go to hell",
		"hentai",
		"heroin",
		"horny",
		"i love hitler",
		"incest",
		"incestuous",
		"jizz",
		"jizzed",
		"jizzing",
		"kill yourself",
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
		"paki",
		"pakis",
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
		"retard",
		"retarded",
		"screw you",
		"semen",
		"sex",
		"shit",
		"shitter",
		"shittie",
		"shitting",
		"shitty",
		"slag",
		"slut",
		"slutty",
		"smoke weed",
		"special:userlogout",
		"sperm",
		"stfu",
		"tits",
		"titties",
		"tranny",
		"twat",
		"vagina",
		"wanker",
		"wanking",
		"whore",
		"whores",
		"wtf"
	];

	// phrases as regular expressions
	filter.regex = [
		"how old (?:are|r) (?:yo)?u",
		"i hate (?:black people|muslims|jews)",
		"allah(?: ?hu)? ac?kbar"
	];

	// the evaluated phrases
	filter.evaluated = [];
	for (i in filter.plain) {
		filter.evaluated.push(filter.plain[i].replace(/[\\\/\{\}\,\[\-\]\(\|\)\.\,\?\!\=\*\+\^\$]/g, "\\$&"));
	}
	for (i in filter.regex) {
		filter.evaluated.push(filter.regex[i]);
	}

	// regex object
	var regex = new RegExp(
		"(?:^| |\\.|\\,|\\\\|\\/|\\[|\\]|_|\\-|\\(|\\)|\\{|\\}|\'|\"|\\|?\\!)(?:" +
		filter.evaluated.join("|") +
		")(?: |\\.|\\,|\\\\|\\/|\\[|\\]|_|\\-|\\(|\\)|\\{|\\}|\'|\"|\\?|\\!|$)",
		"i" // case insensitive
	);

	// add digit suffix (e.g. "9001" -> "9001st")
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
			if (regex.test($(this).val())) {
				$(this).val("");
				count++;
				if (count < limit) {
					alert("Warning! You have been caught using a restricted phrase and your message has been blocked.\nThis is the " + parseTime(count) + " time you have been caught doing so. If this number reaches " + limit + ", you will be kicked.");
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
	var regex = /^!ignore (?:Apj26|CPW Community Admin|CustardBird|Dps04|Hey\.youcp|Jeserator|Watatsuki)(?:\s|$)/i;
	NodeChatDiscussion.prototype.getTextInput().keydown(function(e) {
		if (e.keyCode == 13 && !e.shiftKey) {
			if (regex.test(this.value)) {
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
					mw.config.get("wgChatMyAvatarUrl").replace(/[&<>"']/g, function(m) {
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


// Chat Header Helpful Links
var chatTopicArray = [
	{
		url: "/wiki/Club_Penguin_Wiki:Policy/Chat",
		text: "Chat Policy",
		imgUrl: "https://images.wikia.nocookie.net/clubpenguin/images/thumb/e/ef/Rules_chat_header.png/12px-Rules_chat_header.png"
	},
	{
		url: "/wiki/Club_Penguin_Wiki:Chat/Logs",
		text: "Chat Logs",
		imgUrl: "https://images.wikia.nocookie.net/clubpenguin/images/thumb/f/f0/Chat_logs.png/12px-Chat_logs.png"
	},
		{
		url: "/wiki/Club_Penguin_Wiki:Discord",
		text: "Discord",
		imgUrl: "https://vignette.wikia.nocookie.net/clubpenguin/images/thumb/d/d0/Discord_logo.png/12px-Discord_logo.png"
	},
	{
		url: "/wiki/Special:RecentChanges",
		text: "Recent Changes",
		imgUrl: "https://images.wikia.nocookie.net/clubpenguin/images/thumb/0/05/Pencil_Pin.PNG/12px-Pencil_Pin.PNG"
	},
	{
		url: "/wiki/MediaWiki:Emoticons",
		text: "Emoticons List",
		imgUrl: "https://images.wikia.nocookie.net/clubpenguin/images/thumb/9/90/Top_Kek.png/12px-Top_Kek.png"
	},
	{
		url: "/wiki/Special:MyPage",
		text: "My Profile",
		imgUrl: "" + mw.config.get("wgChatMyAvatarUrl")
	}
];

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
function optionsLoader() {
	if (typeof mainRoom !== "undefined") {
		importArticles({
			type: "script",
			articles: [
				"MediaWiki:chat.js/JacobsLadderSuite.js",
				"MediaWiki:Chat.js/API.js",
				"MediaWiki:Chat.js/options.js",
				"MediaWiki:chat.js/TitleNotifications.js"
			]
		});
	} else {
		setTimeout(optionsLoader, 100);
	}
}


/* secondary scripts - desktop by default, mobile as optional */

// define stuff to do
function loadSecondaryScripts() {
	// load chat options - likely not relevant for mobile users
	optionsLoader();
	// further imports
	importArticles({
		type: "script",
		articles: [
			"u:dev:!kick/code.js",
			"u:dev:MediaWiki:ChatAnnouncements/code.js",
			"MediaWiki:Chat.js/clock.js",
			"MediaWiki:Chat.js/emoticonRefresh.js",
			"MediaWiki:Chat.js/emoticonRotate.js"		
		]
	}, {
		type: "style",
		articles: [
			"MediaWiki:ChatResizeEmoticons.css"
		]
	});
}

// now determine whether to load them
if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(navigator.userAgent || navigator.vendor || window.opera) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test((navigator.userAgent || navigator.vendor || window.opera).substr(0, 4))) {
	// mobile detected - from http://detectmobilebrowsers.com/
	if (confirm("Your device has been detected as a mobile device. The chat comes with some additional scripts, for a better experience. It is recommended only to load them while being connected to a Wi-Fi network. Do you wish to load them now?")) {
		// mobile-detected user agreed to load scripts
		loadSecondaryScripts();
	}
} else {
	// desktop or a laptop - import anyway
	loadSecondaryScripts();
}