/* Código Javascript colocado aqui será carregado para todos os utilizadores em cada carregamento de página */
/* Any JavaScript here will be loaded for all users on every page load. */
/* Import countdown script from Wikia */
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js",
        "w:c:dev:ReferencePopups/code.js",
        "w:c:dev:ReferencePopups/custom.js",
        "Mediawiki:Gadget-QuizQ.js",
        "MediaWiki:Wikiamenuicons.js",
    ]
});
/* Import countdown script from Wikia */
importScriptPage('PurgeButton/code.js', 'dev');
importScriptPage("ExternalImageLoader/code.js", "dev");