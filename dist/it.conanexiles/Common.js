/* Il codice JavaScript inserito qui viene caricato da ciascuna pagina, per tutti gli utenti. */

mw.hook('wikipage.content').add(function($content) {
	if (!$content.find('#conan-interactive-map').length) return;
	importArticles({
		type: 'script',
		articles: [
			'u:conanexiles:MediaWiki:ConanLeaflet.js',
			'MediaWiki:InteractiveMap.js'
		]
	});
});