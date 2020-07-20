/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

/* AutoRefreshing RecentChanges and WikiActivity */
 
var AjaxRCRefreshText = 'Act. automát.';
var AjaxRCRefreshHoverText = 'Refrescar automáticamente';
var ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity","Especial:Registro"];
var ajaxRefresh = 20000;
importScriptPage('AjaxRC/code.js', 'dev');