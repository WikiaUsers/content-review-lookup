mw.loader.using(['ext.fandom.ContentReview.legacyLoaders.js'], function() {
	importArticles({
		type: 'script',
		articles: [
			'u:dev:MediaWiki:AddBlockUserTag/code.js',
			'u:dev:MediaWiki:AjaxBatchDelete.js',
			'u:dev:MediaWiki:FileUsageAuto-update/code.js',
			'u:dev:MediaWiki:ImportJS-Plus.js',
			'u:dev:MediaWiki:MassCategorization/code.js',
			'u:dev:MediaWiki:MassEdit/code.js',
			'u:dev:MediaWiki:MassProtect/code.js',
			'u:dev:MediaWiki:MassRename/code.js'
		],
	});
});