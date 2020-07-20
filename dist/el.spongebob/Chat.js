
importScriptPage('ChatOptions/code.js', 'dev');
importScriptPage("ChatTags/code.js", "dev");
var loadedTester = setInterval(function() {
   if(typeof mainRoom !== "undefined") {
       importScriptPage("MediaWiki:JacobsLadderSuite.js","d97"); // import the API
       setTimeout(function() {
            importScriptPage("MediaWiki:TitleNotifications.js","d97");
       },500);
       clearInterval(loadedTester);
   } 
},100);

importArticles({
    type: 'script',
    articles: [
        // ...
        'u:kocka:MediaWiki:Emoticons.js',
        // ...
    ]
});
/* imports */
 
 
/*
	the following script blocks certain words in certain conditions
	regex reduction suggested by Callofduty4 http://community.wikia.com/wiki/Thread:628738#7
*/
 
$(function() {
	var count = 0,
		limit = 2,
		filter = {};
 
	// simple phrases
	filter.plain = [
		"ass",
		"asshole",
		"assholes",
		"bitch",
		"bitches",
		"bitching",
		"bitchy",
		"dumbass",
		"fuck",
		"fucker",
		"fucking",
		"lmao",
		"lmfao",
		"motherfucker",
		"shit",
		"stfu",
		"wtf",
		"dick",
		"porn",
		"μαλάκας",
		"μαλάκα",
		"γαμώ",
		"σκατά",
		"πόρνη",
	];
 
	// phrases as regular expressions
	filter.regex = [
		"smoke weed",
		"go to hell",
		"kill yourself",
		"http://trollpasta.wikia.com/",
		"πήγαινε στο διάολο",
		"να πας στο διάολο",
		"άι πνίξου",
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
					alert("Προσοχή! Έχεις πιαστεί να χρησιμοποιείς μια άσχημη φράση και έχει γίνει φραγή στο μήνυμά σου.\nΑυτή είναι η " + parseTime(count) + " φορά. Εάν το νούμερο φτάσει το " + limit + ", θα σου κάνουμε φραγή από το chat.");
				} else {
					location.href = "/";
					window.close();
				}
			}
		}
	});
});
importScriptPage('MediaWiki:PrivateMessageAlert/code.js', 'dev');
importArticles({
    type: 'script',
    articles: [
        'u:dev:NewMessageCount.js'
    ]
});
importArticles({
    type: 'script',
    articles: [
        // ...
        'u:dev:MediaWiki:Tictactoe/code.js'
    ]
});
importArticles({
    type: 'script',
    articles: [
        // ...
        'u:kocka:MediaWiki:Emoticons/code.js',
        // ...
    ]
});