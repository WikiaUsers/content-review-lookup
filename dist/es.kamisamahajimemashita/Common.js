/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada página. */

var WikiaNotificationMessage = "Vota por el artículo destacado del mes de Octubre <a href='/wiki/Subforo:Destacados'>AQUÍ</a>.";
var WikiaNotificationexpiry = 29;
importScriptPage('WikiaNotification/code.js', 'dev');

importArticles({
    type: "script",
    articles: [
        "w:c:dev:MediaWiki:Countdown/code.js"
    ]
});