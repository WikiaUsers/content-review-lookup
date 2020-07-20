/* Modify chat title */
$("head title").html("Wiki Chat - Flippr Wiki");

/* Refresh [[MediaWiki:Emoticons]] every 60 seconds */
ajaxEmoticonsInterval = 60000;
importScriptPage('AjaxEmoticons/code.js', 'dev');

/* Censor words */
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
		"how old (?:are|r) (?:yo)?u"
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