mw.loader.using(['ext.fandom.ContentReview.legacyLoaders.js'], function() {
	window.CustomTools = [
		{
			link: mw.util.getUrl('User:' + mw.config.get('wgUserName')) + '/common.css',
			placement: 'global-navigation-dropdown',
			position: -1,
			text: 'Local CSS'
		},
		{
			link: mw.util.getUrl('User:' + mw.config.get('wgUserName')) + '/common.js',
			placement: 'global-navigation-dropdown',
			position: -1,
			text: 'Local JS'
		}
	];
	importArticles({
		type: 'script',
		articles: [
			'u:dev:MediaWiki:CustomTools.js'
		],
	});
});