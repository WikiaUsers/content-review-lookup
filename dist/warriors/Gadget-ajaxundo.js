// for opt-in user gadget
mw.loader.using('ext.fandom.ContentReview.legacyLoaders.js').then(function() {
	importArticles({
	    type: 'script',
	    articles: [
	        'u:dev:MediaWiki:AjaxUndo/code.js',
	    ]
	});
});