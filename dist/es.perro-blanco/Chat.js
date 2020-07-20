importScriptPage('ChatTags/code.js', 'dev');
importArticles( {
    type: 'script',
    articles: [
        // ...
        'u:dev:!mods/code.js',
        // ...
    ]
} );
importArticles( {
    type: 'script',
    articles: [
        // ...
        'u:dev:!kick/code.js',
        // ...
    ]
} );
importArticles({
	type: "script",
	articles: [
		"u:dev:ChatDelay/code.js"
	]
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:ChatReload/code.js'
    ]
});
importScriptPage('ChatOptions/code.js', 'dev');