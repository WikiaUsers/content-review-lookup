/* Cualquier c�digo JavaScript escrito aqu� se cargar� para todos los usuarios en cada p�gina. */

var WikiaNotificationMessage = "Vota por el art�culo destacado del mes de Octubre <a href='/wiki/Subforo:Destacados'>AQU�</a>.";
var WikiaNotificationexpiry = 29;
importScriptPage('WikiaNotification/code.js', 'dev');

importArticles({
    type: "script",
    articles: [
        "w:c:dev:MediaWiki:Countdown/code.js"
    ]
});