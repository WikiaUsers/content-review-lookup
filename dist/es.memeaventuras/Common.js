// 1. AutoRefreshing RecentChanges and WikiActivity
 
var AjaxRCRefreshText = 'Act. autom�t.';
var AjaxRCRefreshHoverText = 'Refrescar esta p�gina autom�ticamente';
var ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity","Especial:Registro","Especial:NuevasIm�genes"];
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