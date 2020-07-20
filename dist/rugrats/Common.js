/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
    type: 'script',
    articles: [
        'w:dev:WallGreetingButton/code.js'
    ]
});

importArticles({
	type: 'script',
	articles: [
		// ...
		'w:c:dev:SignatureCheck/code.js',
		// ...
	]
});

importScriptPage('InactiveUsers/code.js', 'dev');
importScriptPage('YoutubePlayer/code.js', 'dev');