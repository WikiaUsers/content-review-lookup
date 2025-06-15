mw.loader.using('ext.fandom.ContentReview.legacyLoaders.js').then(function() {
	importArticles({
	    type: 'script',
	    articles: [
	        'u:dev:MediaWiki:UCXSearchBar.js',
	    ]
	});
	importArticles({
	    type: "style",
	    article: "u:dev:MediaWiki:UCXSearchBar.css"
	});
});