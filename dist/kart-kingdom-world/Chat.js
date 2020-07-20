importArticles({
    type: 'script',
    articles: [
        // ...
        'u:dev:MediaWiki:EmoticonsWindow/code.js',
        // ...
    ]
});
importArticles({
	type: "script",
	articles: [
		"u:dev:ChatDelay/code.js"
	]
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:!kick/code.js',
    ]
});
window.absentMessage = '<user> they might be at home at the moment';
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:!kick/code.js',
    ]
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatOptions/code.js',
    ]
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatStatus/code.js',
    ]
});
window.ChatStatus = {
	statuses: {
		afk: "Somewhere else at the moment",
		edit: "Editing",
		food: "Eating",
		tv: "Watching a video",
		game: "Playing a game"
	},
	debug: false
};