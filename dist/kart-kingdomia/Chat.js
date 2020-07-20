
importArticles({
    type: 'script',
    articles: [
        'u:dev:IsTyping/code.js',
         'u:dev:MediaWiki:EmoticonsWindow/code.js',
         'u:dev:ChatImages/code.js',
         'u:shining-armor:MediaWiki:ChatTags/code.js',
         'u:dev:MediaWiki:ChatAnnouncements/code.js',
    ]
});

window.chatAnnouncementsAll = true;
/*
	the following script blocks certain works in certain conditions
*/
 
ChatStringsBlocker = {"count": 0};
$('textarea[name="message"]').on("keypress", function(e) {
	if (e.keyCode == 13) {
		var a = $('textarea[name="message"]').val().toLowerCase(),
			b = [
				"ass",
				"asses",
				"asshole",
				"assholes",
				"bitch",
				"bitches",
				"bitchy",
				"boob",
				"boobs",
				"cunt",
				"dick",
				"dicks",
				"dildo",
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
			c = false; // prevent duplication if blocked word was detected already
		for (var i = 0; i < b.length; i++) { // loop through all words
			var d = b[i];
			if (
			(
			/* possibilities start */
				a == d ||                                                                      // whole message equals the word
				a.search(new RegExp(d + "[ ,\\.\\!\\?]")) == 0 ||                              // starts with the word
				a.search(new RegExp("[ ,\\.\\!\\?]" + d + "[ ,\\.\\!\\?]")) > -1 ||            // contains the word
				a.substr(a.length - d.length - 1).search(new RegExp("[ ,\\.\\!\\?]" + d)) > -1 // end with the word
			/* possibilities end */
			) && c === false
			) {
				var c = true;
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
	}
});