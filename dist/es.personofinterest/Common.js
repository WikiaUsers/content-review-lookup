/* Cualquier c�digo JavaScript escrito aqu� se cargar� para todos los usuarios en cada carga de p�gina. */
 
/*AutoRefreshing Special Pages by Pcj y Grunny */ 
 
AjaxRCRefreshText = 'Actualizaci�n automatica'; 
AjaxRCRefreshHoverText = 'Refrescar esta p�gina autom�ticamente'; 
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity","Especial:NuevasIm�genes"]; importScriptURI('http://vegadark.wikia.com/index.php?title=MediaWiki:RapiTareas.js&action=raw&ctype=text/javascript'); 
importScriptPage('AjaxRC/code.js', 'dev');