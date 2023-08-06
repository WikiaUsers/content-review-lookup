/* Il codice JavaScript inserito qui viene caricato da ciascuna pagina, per tutti gli utenti. */

mw.hook('wikipage.content').add(function($content) {
	var main = $content.find('#conan-interactive-map')[0];
	if (main) {
		importArticles({
			type: "script",
			articles: [
				'u:conanexiles:MediaWiki:ConanLeaflet.js',
				'MediaWiki:InteractiveMap.js'
			]
		});
	}
});