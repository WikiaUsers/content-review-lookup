/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */
 
/*AutoRefreshing Special Pages by Pcj y Grunny */ 
 
AjaxRCRefreshText = 'Actualización automatica'; 
AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente'; 
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity","Especial:NuevasImágenes"]; importScriptURI('http://vegadark.wikia.com/index.php?title=MediaWiki:RapiTareas.js&action=raw&ctype=text/javascript'); 
importScriptPage('AjaxRC/code.js', 'dev');