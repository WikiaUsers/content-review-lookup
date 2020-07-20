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

/**********************************************************************************************************************************************
 * Chat Strings blocker (the below script)  originates from the Prodigy Math Game Wiki. The code can be found directly below the comment stating "
	the following script blocks certain works in certain conditions" over here: https://prodigy-math-game.fandom.com/wiki/MediaWiki:Chat.js?oldid=138753
 * 
 * This code is licensed under CC-BY-SA
 * 
 * The license can be found here: https://creativecommons.org/licenses/by-sa/1.0/
 * 
 * No changes were made at the time of writing, however, (mainly) additional word blockings or other features may be added in the future.
**********************************************************************************************************************************************/
//Original code by Glaciersong
//Modified by DaChickenKing
$('textarea[name="message"]').on("keypress", function(e) {

    if (e.keyCode == 13) {
        var msg = $('textarea[name="message"]').val().toLowerCase(),
            censorWords = [
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
                "penis",
                "piss",
                "pussy",
                "shit",
                "cock",
                "fck",
                "penis",
                "bish",
                "bishes",
                "tits",
                "sex",
                "whore",
                "hoe",
                "69",
                "porn",
                "hentai",
                "stripper",
                "striper"
            ];

        for (i = 0; i < censorWords.length; i++) {
            if (msg.includes(censorWords[i])) {
                $('textarea[name="message"]').val("");

                mainRoom.socket.socket.close(); //disconnect from chat
                $(".typing-indicator")[0].remove(); //remove the typing indiactor
                $('textarea[name="message"]')[0].classList = ["disabled"];
                $('textarea[name="message"]')[0].disabled = "disabled"; //disable the chat textbox
                $(".Chat")[0].innerHTML = "<center>You have been kicked for cussing by the chat moderation bot</center>"; //kicked message
                $("#Rail")[0].innerHTML = ""; //remove the rail
                $("#ChatHeader")[0].remove(); //remove the chat header
            }
       }

    }
});