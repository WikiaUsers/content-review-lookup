/* Cualquier c�digo JavaScript escrito aqu� se cargar� para todos los usuarios en cada carga de p�gina. */
 
/*AutoRefreshing Special Pages by Pcj y Grunny */ 
 
AjaxRCRefreshText = 'Actualizaci�n automatica'; 
AjaxRCRefreshHoverText = 'Refrescar esta p�gina autom�ticamente'; 
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity","Especial:NuevasIm�genes"]; importScriptURI('http://vegadark.wikia.com/index.php?title=MediaWiki:RapiTareas.js&action=raw&ctype=text/javascript'); 
importScriptPage('AjaxRC/code.js', 'dev');

/* LinkPreview settings */ 
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.noimage = 'https://vignette.wikia.nocookie.net/tardis/images/9/97/TARDIS_Monitor_11b.jpg/revision/latest/scale-to-width-down/250?cb=20130814114438';
window.pPreview.delay = 300;
window.pPreview.tlen = 300;