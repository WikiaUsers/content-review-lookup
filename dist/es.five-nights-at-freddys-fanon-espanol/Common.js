/* AutoRefreshing RecentChanges and WikiActivity */
 
var AjaxRCRefreshText = 'Act. autom�t.';
var AjaxRCRefreshHoverText = 'Refrescar autom�ticamente';
var ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity","Especial:Registro"];
var ajaxRefresh = 20000;
importScriptPage('AjaxRC/code.js', 'dev');

window.railWAM = {
    logPage:"Project:WAM Log"
};