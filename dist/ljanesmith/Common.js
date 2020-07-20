/* Any JavaScript here will be loaded for all users on every page load. */

 
/* Auto Refresh */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');
 
/* Collapsible */
importScriptPage('ShowHide/code.js', 'dev');
 
importScriptPage('CollapsibleInfobox/code.js', 'dev');


/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').text(mw.config.get('wgUserName'));
});

/* End of the {{USERNAME}} replacement */