/* Any JavaScript here will be loaded for all users on every page load. */
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */
 
/* AJAX */
ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:NewPages"];
importScriptPage('MediaWiki:AjaxRC/code.js', 'lufanon');
 
/* displayTimer */
importScriptPage('MediaWiki:Common.js/displayTimer.js', 'legouniverse');