/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */
 
AjaxRCRefreshText = 'Act. automát.';
AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');
importScript('MediaWiki:Common.js/DisplayTimer.js');