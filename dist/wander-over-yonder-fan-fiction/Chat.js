
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