/* Any JavaScript here will be loaded for all users on every page load. */

/* see http://dev.wikia.com/wiki/ShowHide for details */
/* importScriptPage('ShowHide/code.js', 'dev');

/* Standard Edit Summaries */
importScript('MediaWiki:Common.js/standardeditsummaries.js');

/* Message Wall Greeting Button */
/*importArticles({
    type: 'script',
    articles: [
        'w:dev:WallGreetingButton/code.js'
    ]
});*/

importArticles({
	type: 'script',
	articles: [
		// ...
		'u:dev:DisplayClock/code.js',
		// ...
	]
});