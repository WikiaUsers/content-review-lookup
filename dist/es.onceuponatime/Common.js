/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

var WikiaNotificationMessage = "Sigua la serie y la wiki por twitter, por medio de los hashtags: #TheLoversEvil, si prefieres ser un villano, y #HappyEndingsOUAT, si desean ver a los héroes en acción.";
var WikiaNotificationexpiry = 30;
importScriptPage('WikiaNotification/code.js', 'dev');

/* displayTimer (obtenido de Literatura Wiki) */
importScript('MediaWiki:Common.js/displayTimer.js');

/* Para desplegable */
var ShowHideConfig = { linkBefore:true };
importScriptPage('ShowHide/code.js', 'dev');