/*** Autorefrescar los cambios recientes en la wikiactividad ***/
// 4. AutoRefreshing RecentChanges and WikiActivity
 
AjaxRCRefreshText = 'Act. automát.';
AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');
// Etiqueta Inactivo
InactiveUsers = { text: 'Retirado' };
importScriptPage('InactiveUsers/code.js', 'dev');

/* Icono sociales
 * By: [[Madnessfan34537]]
 */