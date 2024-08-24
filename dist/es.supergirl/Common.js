/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

// Notificación sobre otros wikis
var WikiaNotificationMessage = "Descubre nuestra otra comunidad: <a href='http://es.arrow.wikia.com/wiki/Wiki_Arrowverso'>Wiki Arrowverso</a>";
var WikiaNotificationexpiry = 10;
importScriptPage('WikiaNotification/code.js', 'dev');

// Extended Navigation 
 
importArticle({
    type: 'script',
    articles: [
     'w:c:dev:ExtendedNavigation/code.js'
     ]
});