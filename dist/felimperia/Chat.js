/* SCRIPT SETTINGS
   Due to how these scripts work, variable-type settings should be set before import */
ajaxEmoticonsInterval = 180000; /* 3 minutes = 180 seconds = 180,000ms */

// Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Welcome to the official Felimperia WIki Chat! <br>Please read and follow <a href="Chat_Policy" target="_blank">our rules</a> before joining the conversation.';

window.ChatStatus = {
	statuses: {
		afk: "is AFK",
		tv: "is taking a break",
		food: "is eating",
		sleep: "is sleeping",
		homo: "is sinning",
		book: "is studying",
		google: "is researching",
		game: "is playing Felimperia",
		code: "is fixing bugs",
		edit: "is editing the wiki",
		ufo: "is spaced out"
	},
	debug: false
};
 
chatAnnouncementsAll = true;

/* IMPORTS */
importArticles({
    type: 'script',
    articles: [
        'u:dev:BlinkingTabAlert.js',
        'u:dev:MediaWiki:ChatOptions/code.js',
        'u:shining-armor:MediaWiki:ChatTags/code.js',
        'u:dev:MediaWiki:ChatAnnouncements/code.js',
        'u:dev:MediaWiki:ChatImages/code.js',
        'u:dev:MediaWiki:PrivateMessageAlert/code.js',
        'u:dev:MediaWiki:ChatNotifications/code.js',
        'u:dev:MediaWiki:ChatStatus/code.js',
        'u:kocka:MediaWiki:Emoticons.js',
    ]
});