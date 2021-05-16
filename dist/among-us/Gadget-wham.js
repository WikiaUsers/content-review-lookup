// Code: [[w:c:dev:WHAM]]

mw.loader.using('ext.fandom.ContentReview.legacyLoaders.js').then(function() {
	window.WHAMBotMe = true;
	window.WHAMBotReason = 'Cleanup';
	window.WHAMDelay = 100;
	window.WHAMDeleteReason = 'Cleanup';
	window.WHAMBlockReason = 'Vandalism and/or general disruption';
	
	importArticles({
		type: 'script',
		articles: [
			'u:dev:MediaWiki:WHAM/code.2.js',
		]
	});
});