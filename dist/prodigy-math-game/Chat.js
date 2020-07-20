// ChatTags
window.chatags = {
    images: true,
    videos: true
};
 
// !mods
window.ModPing = "https://soundbible.com/grab.php?id=2084&type=mp3";
 
 
//Switch to night button
window.night_button = 'Switch to Night Chat';
 
//Switch to day button
window.day_button = 'Switch to Day Chat';
 
//
//Color scheme for NIGHT Chat
//Link color
window.linkColor = 'dodgerblue';
 
//All text Color
window.textColor = '#FFFFFF';
 
//Self text background color
window.selfTextColor = 'none';
 
//Chat background color
window.backgroundColor = '#383941';
 
//Chat foreground color
window.foregroundColor = '#383941';
 
// User stats foreground color
window.userStatsColor = 'none';
 
//END NIGHT Chat color scheme
 
// Imports
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:!kick/code.js',
        'u:dev:MediaWiki:!ban/code.js',
        'u:dev:MediaWiki:!mods.js',
        'u:dev:MediaWiki:!pm.js',
        'u:dev:MediaWiki:AjaxEmoticons/code.js',
        'u:dev:MediaWiki:ChatAnnouncements/code.js',
        'u:dev:MediaWiki:ChatAwayButton/code.js',
        'u:dev:MediaWiki:ChatCount.js',
        'u:dev:MediaWiki:ChatShortcuts.js',
        'u:dev:MediaWiki:ChatStatus/code.js',
        'u:dev:MediaWiki:ChatImages/code.js',
        'u:dev:MediaWiki:ChatReload/code.js',
        'u:dev:MediaWiki:ChatSendButton.js',
        'u:dev:MediaWiki:ChatBlockButton/code.2.js',
        'u:dev:MediaWiki:ChatUserPageButton.js',
        'u:dev:MediaWiki:Day/Night_chat/code.js',
        'u:dev:MediaWiki:EmoticonDragAndDrop.js',
        'u:dev:MediaWiki:EmoticonsWindow/code.js',
        'u:dev:MediaWiki:ExtendedPrivateMessaging/code.js',
        'u:dev:MediaWiki:FucodeLogger.js',
        'u:dev:MediaWiki:IsTyping.js',
        'u:dev:MediaWiki:NewMessageCount.js',
        'u:shining-armor:MediaWiki:ChatTags/code.js',
    ]
});
 
 
window.ChatStatus = {
	statuses: {
		afk: "AFK",
		homework: "Busy doing Homework",
		calling: "Calling someone",
		multichatting: "Chatting on different Live Chat",
		checkfandom: "Checking Fandom",
		mediacheck: "Checking social media",
		coding: "Coding",
		cooking: "Cooking",
		depressed: "Depressed",
		dontdisturb: "Do not disturb",
		chores: "Doing chores",
		dangerous: "Doing risky stuff",
		drawing: "Drawing",
		food: "Eating",
		snacktime: "Eating snacks",
		edit: "Editing",
		emergency: "Emergency...",
		parentproblems: "Family issues...",
		google: "Googling something",
		game: "Playing games",
		play: "Playing Prodigy",
		pm: "Private Messaging",
		shopping: "Shopping somewhere",
		sleep: "Sleeping",
		HazardousBrowsing: "Surfing through dangerous websites",
		Appleapplications: "Using Apple based applications",
		shower: "Taking a shower",
		walk: "Taking a walk",
		Andriodapplications: "Using Android based applications",
		discordtalking: "Using Discord",
		facetime: "Video calling someone",
		washhands: "Washing hands",
		movie: "Watching a movie",
		watchnews: "Watching the news",
		tv: "Watching TV",
	},
	debug: false
};
 
 
 
//Chat strings blocker 2.0
//Original code by Glaciersong
//Modified by DaChickenKing
const ChatStringsBlocker = {
    isZalgo: function(msg) {
        msg2 = decodeURIComponent(
            encodeURIComponent(msg)
            .replace(/%CC(%[A-Z0-9]{2})+%20/g, " ")
            .replace(/%CC(%[A-Z0-9]{2})+(\w)/g, "$2")
        );
 
        if (msg == msg2) {
            return false;
        } else {
            return true;
        }
    },
 
    isInnapoprite: function(msg) {
        censorWords = [
            "ass",
            "a$$",
            "asses",
            "bitch",
            "bitches",
            "bitchy",
            "boob",
            "boobs",
            "cunt",
            "crap",
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
            "mf",
            "striper"
        ];
 
        block = false;
 
        for (i = 0; i < censorWords.length; i++) {
 
            currentWord = censorWords[i];
 
            if (
                msg == currentWord || // whole message equals the word
                msg.search(new RegExp(currentWord + "[ ,\\.\\!\\?]")) == 0 || // starts with the word
                msg.search(new RegExp("[ ,\\.\\!\\?]" + currentWord + "[ ,\\.\\!\\?]")) > -1 || // contains the word
                msg.substr(msg.length - currentWord.length - 1).search(new RegExp("[ ,\\.\\!\\?]" + currentWord)) > -1 // end with the word
            ) {
 
                block = true;
 
            }
        }
 
        return block;
 
    },
 
    shouldAllow: function(text) {
        /* approval codes:
        0 - allow
        1 - disallow for cussing/rudeness/vulgarity, etc
        2- disallow for spam
        */
 
        text = text.toLowerCase();
 
        if (this.isZalgo(text)) {
            return 2;
        } else {
            if (this.isInnapoprite(text)) {
                return 1;
            } else {
                return 0;
            }
        }
 
    },
    onMessageSend: function() {
        a = this.shouldAllow($('textarea[name="message"]').val());
 
        if (a == 1) {
            $('textarea[name="message"]').val("");
 
            mainRoom.socket.socket.close(); //disconnect from chat
            $(".typing-indicator")[0].remove(); //remove the typing indiactor
            $('textarea[name="message"]')[0].classList = ["disabled"];
            $('textarea[name="message"]')[0].disabled = "disabled"; //disable the message textbox
            $(".Chat")[0].innerHTML = ""; //remove the chat
            $("#Rail")[0].innerHTML = ""; //remove the rail
 
            $.showModal(
                "Chat Filter Auto-Kick",
                "You have been disconnected from chat for using a phrase that violates the rules. If you believe this is in error, please contact <a href='https://prodigy-math-game.fandom.com/wiki/User:DaChickenKing'>DaChickenKing</a> or an <a href='https://prodigy-math-game.fandom.com/wiki/Special:ListUsers/sysop'>admin</a>. Feel free to refresh your browser window to re-join chat."
            );
 
            return false;
        } else if (a == 2) {
            $('textarea[name="message"]').val("");
 
            mainRoom.socket.socket.close(); //disconnect from chat
            $(".typing-indicator")[0].remove(); //remove the typing indiactor
            $('textarea[name="message"]')[0].classList = ["disabled"];
            $('textarea[name="message"]')[0].disabled = "disabled"; //disable the message textbox
            $(".Chat")[0].innerHTML = ""; //remove the chat
            $("#Rail")[0].innerHTML = ""; //remove the rail
 
            $.showModal(
                "Chat Filter Auto-Kick",
                "You have been disconnected from chat for posting gibberish or spammy messages. If you believe this is in error, please contact <a href='https://prodigy-math-game.fandom.com/wiki/User:DaChickenKing'>DaChickenKing</a> or an <a href='https://prodigy-math-game.fandom.com/wiki/Special:ListUsers/sysop'>admin</a>. Feel free to refresh your browser window to re-join chat."
            );
 
            return false;
        }
 
    }
 
};
 
$('textarea[name="message"]').on("keypress", function(e) {
    if (e.keyCode == 13) {
        return ChatStringsBlocker.onMessageSend();
    }
});
 
try {
    document.getElementById("ChatSendButton").onclick = function() {
       return ChatStringsBlocker.onMessageSend();
    }
} catch(e) {
    //the chat button is very unstable, so we need to put it in a try. no need for catching.
}