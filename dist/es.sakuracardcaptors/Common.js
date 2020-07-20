/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */
/* Código cuenta regresiva*/
importArticles({
    type: "script",
    articles: [
        "w:c:dev:MediaWiki:Countdown/code.js"
    ]
});

/* Codigo para tablas y div desplegables */
var ShowHideConfig = { linkBefore:true };
importScriptPage('ShowHide/code.js', 'dev');