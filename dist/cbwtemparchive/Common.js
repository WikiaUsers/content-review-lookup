/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace | wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */

importScriptPage("User:Monchoman45/ChatHacks.js","c"); // Put this on your MediaWiki:Common.js