window.dev = window.dev || {};
window.dev.editSummaries = {
	css: '#stdSummaries { ... }',
	select: 'MediaWiki:Custom-StandardEditSummary'
};

mw.loader.using(['mediawiki.util', 'mediawiki.Uri', 'ext.fandom.ContentReview.legacyLoaders.js'], function() {
	importArticles({
		type: 'script',
		articles: [
			"u:dev:MediaWiki:Standard_Edit_Summary/code.js",
		]
	});
});