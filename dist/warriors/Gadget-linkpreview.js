// [[w:c:dev:LinkPreview]] - opt-in ser gadget
mw.loader.using('ext.fandom.ContentReview.legacyLoaders.js').then(function () {
	importArticles({
	    type: 'script',
	    articles: [
	        'u:dev:MediaWiki:LinkPreview/code.js',
	    ]
	});
});