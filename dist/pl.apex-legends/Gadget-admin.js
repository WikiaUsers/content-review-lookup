// Konfiguracja gadżetów
window.batchDeleteDelay = 500;
window.WHAMDeleteReason = 'Sprzątanie wandalizmu';
window.WHAMBlockReason = '[[Pomoc:Wandalizm|Wandalizm]]';

// Importy
importArticles({
	type: 'script',
	articles: [
		'u:dev:MediaWiki:AjaxBatchDelete.js',
		'u:dev:MediaWiki:WHAM/code.2.js',
		'u:dev:MediaWiki:AjaxPatrol/code.js'
	]
});