//—————————————————————————————— ! ! ! ———————————————————————————————//
/* Import scripts. NOTE: Place scripts configurations above this line */
importArticles({
    type: 'script',
    articles: [
        'u:kocka:Emoticons/code.js', // EmoticonsWindow

        'u:dev:!kick/code.js',
        'u:dev:AjaxEmoticons/code.js', // AjaxEmoticons (so users don't have to refresh the chat to see the latest emoticons)
        'u:dev:ChatAnnouncements/code.js',
        'u:dev:ChatOptions/code.js',
        'u:dev:ChatPMs.js',
        'u:dev:ChatTags/code.js',
        'u:dev:PrivateMessageAlert/code.js',
        'u:dev:Tabinsert.js', // Tab Insert
        
        'u:su:!mods.js',
        "u:dev:MediaWiki:ChatStatus/code.js"
    ]
});
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
		reading: "Reading"
	},
	debug: false
};