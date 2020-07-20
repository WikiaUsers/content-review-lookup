/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */
/* Actualizacion Automatica- WikiActivitad */

var AjaxRCRefreshText = 'Loading...';
var AjaxRCRefreshHoverText = 'Refrescar automáticamente';
var ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity","Especial:Registro"];
var ajaxRefresh = 20000;
importScriptPage('AjaxRC/code.js', 'dev');
importScriptPage('WallGreetingButton/code.js', 'dev');

function UserNameReplace() { 
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return; 
    $("span.insertusername").html(wgUserName); 
    } 
    addOnloadHook(UserNameReplace);
    
importScriptPage('MediaWiki:ChatOptions/es/code.js', 'dev');