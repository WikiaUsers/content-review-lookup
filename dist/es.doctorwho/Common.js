/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */
 
/*AutoRefreshing Special Pages by Pcj y Grunny */ 
 
AjaxRCRefreshText = 'Actualización automatica'; 
AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente'; 
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity","Especial:NuevasImágenes"]; importScriptURI('http://vegadark.wikia.com/index.php?title=MediaWiki:RapiTareas.js&action=raw&ctype=text/javascript'); 
importScriptPage('AjaxRC/code.js', 'dev');

/* LinkPreview settings */ 
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.noimage = 'https://vignette.wikia.nocookie.net/tardis/images/9/97/TARDIS_Monitor_11b.jpg/revision/latest/scale-to-width-down/250?cb=20130814114438';
window.pPreview.delay = 300;
window.pPreview.tlen = 300;