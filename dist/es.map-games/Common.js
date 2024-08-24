/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

/* Auto-refrescar WikiActividad */
 
var AjaxRCRefreshText = 'Act. automát.';
var AjaxRCRefreshHoverText = 'Refrescar automáticamente';
var ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity","Especial:Registro"];
var ajaxIndicator = '';
var ajaxRefresh = 10000;
importScriptPage('AjaxRC/code.js', 'dev');