// 1. AutoRefreshing RecentChanges and WikiActivity
 
var AjaxRCRefreshText = 'Act. automát.';
var AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';
var ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity","Especial:Registro","Especial:NuevasImágenes"];
var ajaxRefresh = 20000;
importScriptPage('AjaxRC/code.js', 'dev');
 
// 2. Username

function UserNameReplace(){
  if (wgUserName){
    var spans = getElementsByClassName(document, "span", "insertusername");
 
    for (var i = 0; i < spans.length; i++){
      spans[i].innerHTML = wgUserName;
    }
  }
}