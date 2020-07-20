importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatStatus/code.js',
    ]
});

window.ChatStatus = {
	statuses: {
		afk: "AFK",
		edit: "Editing",
		food: "Eating",
		tv: "Watching TV",
		game: "Playing games"
	},
	debug: false
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatAnnouncements/code.js',
    ]
});

window.chatAnnouncementsAll = true;

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatUserPageButton.js',
    ]
});