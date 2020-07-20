window.onload = function() {
    setTimeout(function() {
    if(mainRoom.userMain.attributes.groups.includes("sysop")) {
        mainRoom.userMain.attributes.canPromoteModerator = true; //Can kick & ban chat moderators if you have SYSOP rights
    }},3500); //3.5 second delay for lag
};
importArticles({
    type: 'script',
    articles: [
         'u:dev:MediaWiki:AjaxEmoticons/code.js',
         'u:dev:MediaWiki:EmoticonsWindow/code.js',
         'u:dev:MediaWiki:ChatAnnouncements/code.js',
         'u:dev:MediaWiki:ExtendedPrivateMessaging/code.js',
         'u:dev:MediaWiki:ChatAwayButton/code.js',
         'u:dev:MediaWiki:ChatStatus/code.js',
         'u:dev:MediaWiki:ChatImages/code.js',
         'u:dev:MediaWiki:ChatReload/code.js',
         'u:dev:MediaWiki:ChatSendButton.js',
         'u:dev:MediaWiki:ChatBlockButton/code.2.js',
         'u:dev:MediaWiki:ChatUserPageButton.js',
         'u:dev:MediaWiki:IsTyping.js',
         'u:dev:MediaWiki:FucodeLogger.js',
         'u:shining-armor:MediaWiki:ChatTags/code.js',
         'u:dev:MediaWiki:NewMessageCount.js',
         
    ]
});

window.ChatStatus = {
	statuses: {
		afk: "AFK",
		edit: "Editing",
		food: "Eating",
		tv: "Watching TV",
		game: "Playing games",
		pm: "Private Messaging",
		emergency: "Emergency...",
		coding: "Coding stuff",
		mediacheck: "Checking Social Media",
		parentproblems: "Family Issues...",
		movie: "Watching a Movie",
		checkfandom: "Checking Fandom",
		drawing: "Drawing stuff",
		homework: "Busy doing Homework",
		fandomproblems: "Solving a situation on fandom...",
		depressed: "Depressed",
		watchnews: "Watching News on TV",
		fandomproject: "Doing a Fandom Project",
		snacktime: "Eating some snacks",
		shopping: "Shopping somewhere",
		funeral: "Sad Funeral",
		dangerousstuff: "Doing risky things",
		sleep: "Sleeping",
		calling: "Calling Someone",
		washhands: "Washing hands",
		shower: "Taking a shower",
		cleaning: "Cleaning something or cleaning chores",
		cooking: "Cooking",
		multichatting: "Chatting on different Live Chat",
		discordtalking: "Chatting on discord",
		walk: "Taking a Walk",
		google: "Google-ing something from online"
	},
	debug: false
};


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
				"bitch",
				"bitches",
				"bitchy",
				"boob",
				"boobs",
				"cunt",
				"dick",
				"fuck",
				"fucker",
				"fucking",
				"ratshit",
				"motherfucker",
				"penis",
				"penises",
				"piss",
				"pussy",
				"shit",
				"shitty",
				"tits",
				"sex",
				"frick",
				"fricking",
                "cock",
                "Cock",
                "COCK",
                "fric",
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
					alert("Last warning!!\nIt is the second time you were caught using inappropriate language. A third time will automatically kick you from the chat room!");
				} else if (ChatStringsBlocker.count === 3) {
					window.close(); // close on 3rd offense
				}
			}
		}
	}
});