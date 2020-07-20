/* [[Plantilla:Nombreusuario]] */
function UserNameReplace(){
  if (wgUserName){
    var spans = getElementsByClassName(document, "span", "InsertUserName");
 
    for (var i = 0; i < spans.length; i++){
      spans[i].innerHTML = wgUserName;
    }
  }
} 
addOnloadHook(UserNameReplace);
/* Usuarios Inactivos - idea de Sam Wang y dev.wikia.com */
importScriptPage('InactiveUsers/code.js', 'dev');
/* Collapsible classes
 * See w:c:dev:ShowHide for info and attribution
 */
 
importScriptPage('ShowHide/code.js', 'dev');
 
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');