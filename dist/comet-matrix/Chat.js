importArticles( { 
    type: 'script', 
    articles: [ 
        'u:kocka:Emoticons/code.js', // EmoticonsWindow
        'u:dev:GiveChatModPrompt/code.js', 
        'u:dev:ChatAnnouncements/code.js', 
        'u:dev:PrivateMessageAlert/code.js',
        'u:dev:!mods/code.js',
        'u:dev:!kick/code.js',
        'u:dev:ChatPMs.js',
        'u:dev:AjaxEmoticons/code.js', // AjaxEmoticons (so users don't have to refresh the chat to see the latest emoticons)
        'u:dev:ChatOptions/code.js',
        'u:dev:MediaWiki:ChatStatus/code.js'
        ] 
    } 
);

window.ChatStatus = {
	statuses: {
		afk: "AFK",
		edit: "Editing",
		eating: "Eating",
		tv: "Watching TV",
		gaming: "Gaming",
		coding: "Coding",
		school: "In School",
		homework: "Doing Homework",
		reading: "Reading",
	},
	debug: false
};