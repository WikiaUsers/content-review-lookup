mw.loader.using(['ext.fandom.ContentReview.legacyLoaders.js'], function() {
	window.topLevelCat = 'Browse';
	window.cacheSkipLimit = 1000;
	window.CacheCheckRemove = true;
	importArticles({
		type: 'script',
		articles: [
			'u:dev:MediaWiki:CacheCheck/code.js'
		],
	});
});