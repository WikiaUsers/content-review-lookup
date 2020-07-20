/* JavaScript die hier wordt geplaatst heeft invloed op alle pagina's voor alle gebruikers */

/* Collapsible classes
 * See w:c:dev:ShowHide for info and attribution
 */
 
importScriptPage('ShowHide/code.js', 'dev');

//***************************
// Displaytitle - import
//***************************
importScriptPage('User:Jgjake2/js/DISPLAYTITLE.js', 'deadisland');

//***************************
// Site Meter - import
//***************************
importScript('MediaWiki:Common.js/sitemeter.js')

//***************************
//Ajax autorefresh 
//***************************
var ajaxPages = [":Wikia discussies", "Speciaal:Volglijst", "Speciaal:Logboeken", "Speciaal:Bijdragen", "Speciaal:RecenteWijzigingen", "Forum:Index"];
var AjaxRCRefreshText = 'Auto-refresh';
importScriptPage('AjaxRC/code.js', 'dev');

//****************************
//Sjabloon:USERNAME
//****************************
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
}

//******************************
//IRC Embedding 
//******************************
function onloadhookcustom() {
  var replace = document.getElementById("JRChatReplace");
  if (null != replace) {
    replace.innerHTML='<iframe src="http://webchat.freenode.net/?channels=pipoproductions" width="980" height="670"></iframe>';
     if (window.attachEvent) window.attachEvent("onbeforeunload",confirmexitjrchat);
    else window.onbeforeunload = confirmexitjrchat;

  }
  //alert(document.getElementById("JRChatReplace").innerHTML);

}

//******************************
//Google Embedding 
//******************************
function onloadhookcustom() {
  var replace = document.getElementById("Google");
  if (null != replace) {
    replace.innerHTML='<iframe src="http://www.google.nl/" width="980" height="670"></iframe>';
     if (window.attachEvent) window.attachEvent("onbeforeunload",confirmexitjrchat);
    else window.onbeforeunload = confirmexitjrchat;

  }
  //alert(document.getElementById("Google").innerHTML);

}