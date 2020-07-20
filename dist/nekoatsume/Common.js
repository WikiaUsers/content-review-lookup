/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
	type:'script',
	articles: [
        'MediaWiki:Common.js/redditWidget.js',      // Adds reddit widget to id="reddit-widget"
	]
});


importArticle({type:'script', article:'u:w:MediaWiki:Snow.js'});