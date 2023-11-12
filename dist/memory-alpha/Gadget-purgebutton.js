mw.loader.using('ext.fandom.ContentReview.legacyLoaders.js').then(function() {
	window.PurgeButtonText = 'Purge';

	importArticles({
	    type: 'script',
	    articles: [
	        'u:dev:MediaWiki:PurgeButton/code.js',
	    ]
	});
});