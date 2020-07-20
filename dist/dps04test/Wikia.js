ChatStringsBlocker = {"count": 0};
$('textarea[name="message"]').on("keypress", function(e) {
	if (e.keyCode == 13) {
		var a = " " + $('textarea[name="message"]').val().toLowerCase() + " ", // the padded spaces are to make sure that matches won't be located in the beginning or ending of the message
			b = [
				"ass",
				"asses",
				"bitch",
				"bitches",
				"bitchy",
				"boob",
				"boobs",
				"cunt",
				"dick",
				"dumbass",
				"fuck",
				"fucker",
				"fucking",
				"motherfucker",
				"nigga",
				"niggas",
				"nigger",
				"niggers",
				"penis",
				"penises",
				"piss",
				"pussy",
				"shit",
				"shitty",
				"tits",
				"sex",
				"whore",
				"whores"
			],
			escape = "[\\n\\d \\?\\!\\.\\,]+(" + b.join("\n").replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&").replace(/\n/g,"|") + ")[\\n\\d \\?\\!\\.\\,]+"; // decoder from http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex#answer-6969486
		if (a.split(new RegExp(escape)).length > 1) { // 1 or more matches (no need to globally search)
			$('textarea[name="message"]').val("");
			ChatStringsBlocker.count++;
			if (ChatStringsBlocker.count < 2) {
				alert("Warning! You were caught using inappropriate language and your message has been blocked.");
			} else if (ChatStringsBlocker.count === 2) {
				alert("LAST WARNING!!!\nIt's the second time you were caught using inappropriate language. A third time would automatically kick you from the chat room!");
			} else if (ChatStringsBlocker.count === 3) {
				window.close(); // close on 3rd offense
			}
		}
	}
});

$('.chat-name').append('<p>Rules, Guidelines whatever else you want to put here</p>');