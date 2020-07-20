/* Any JavaScript here will be loaded for all users on every page load. */

/* Auto Refresh */ 
AjaxRCRefreshText = 'Auto-refresh';
 AjaxRCRefreshHoverText = 'Automatically refresh the page'; 
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"]; 
importScriptPage('AjaxRC/code.js', 'dev');
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

/* End of the {{USERNAME}} replacement */