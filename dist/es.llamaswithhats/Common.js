/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

importScriptPage('AjaxRC/code.js', 'dev');
importArticles({
	type: 'script',
	articles: [
		// ...
		'w:c:dev:SignatureCheck/code.js',
		// ...
	]
});
importScriptPage('ArchiveTool/code.js', 'dev');