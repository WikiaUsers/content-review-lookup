/* Cualquier c�digo JavaScript escrito aqu� se cargar� para todos los usuarios en cada carga de p�gina. */

/* Auto-refrescar WikiActividad */
 
var AjaxRCRefreshText = 'Act. autom�t.';
var AjaxRCRefreshHoverText = 'Refrescar autom�ticamente';
var ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity","Especial:Registro"];
var ajaxIndicator = '';
var ajaxRefresh = 10000;
importScriptPage('AjaxRC/code.js', 'dev');