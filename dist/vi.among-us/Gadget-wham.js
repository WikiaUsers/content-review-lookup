// Mã: [[w:c:dev:WHAM]]

mw.loader.using('ext.fandom.ContentReview.legacyLoaders.js').then(function() {
	window.WHAMBotMe = true;
	window.WHAMBotReason = 'Dọn dẹp';
	window.WHAMDelay = 100;
	window.WHAMDeleteReason = 'Dọn dẹp';
	window.WHAMBlockReason = 'Phá hoại và/hoặc gây rối trật tự.';
	
	importArticles({
		type: 'script',
		articles: [
			'u:dev:MediaWiki:WHAM/code.2.js',
		]
	});
});