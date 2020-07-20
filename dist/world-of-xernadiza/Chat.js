 /*
 Any codes taken can be given credit
 Below is credited to potcobritain wikia and anyone who needs it
*/
window.ChatStatus = {
	statuses: {
		afk: "Doing paperwork",
		edit: "Revising documents",
		food: "Enjoy a meal", 
		bathroom: "Excusing myself",
		tlopo: "Expanding influence",
		game: "Enjoying downtime",
	},
	debug: false
};

importScriptPage('MediaWiki:ChatOptions/code.js', 'dev');


window.kockaEmoticons = {
    vocab: {
        emoticons: "Emojis",
        close: "Close"
    },
    help: "Choose an emoticon listed below."
};




var blinkInterval = 1000; // Custom blink delay, 1000ms is default

importArticles({
    type: 'script',
    articles: [
        'u:dev:!mods/code.js',
        'u:dev:ChatAnnouncements/code.js',
        'u:dev:ChatBlockButton/code.2.js',
        'u:dev:ChatOptions/code.js',
        'u:dev:GiveChatModPrompt/code.js',
        'u:dev:PrivateMessageAlert/code.js',
        'u:kocka:MediaWiki:Emoticons.js',
        'u:porbritain:ChatDelay.js',
    ]
});