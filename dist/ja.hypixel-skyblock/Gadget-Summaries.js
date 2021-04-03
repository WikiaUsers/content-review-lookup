
window.dev = window.dev || {};
window.dev.editSummaries = {
	css: '#stdSummaries { ... }',
	select: 'MediaWiki:Custom-StandardEditSummary'
};

importArticles({
	type: 'script',
	articles: [
	    "u:dev:MediaWiki:Standard_Edit_Summary/code.js"
	]
});