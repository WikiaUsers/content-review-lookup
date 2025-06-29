mw.loader.using('ext.fandom.ContentReview.legacyLoaders.js').then(() => {
	window.EditIntroButtonText = 'Edit intro';
	
	importArticles({
		type: 'script',
		articles: [
			'u:dev:MediaWiki:EditIntroButton/code.js',
		]
	});
});