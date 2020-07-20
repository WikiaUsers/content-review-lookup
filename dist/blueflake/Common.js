/* Any JavaScript here will be loaded for all users on every page load. */
importScriptPage('ShowHide/code.js', 'dev');
importScriptPage('ArchiveTool/code.js', 'dev');
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);