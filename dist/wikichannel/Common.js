/* Any JavaScript here will be loaded for all users on every page load. */
 
importScriptPage('ShowHide/code.js', 'dev');
 
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');
importScriptPage('ShowHide/code.js', 'dev');
importScriptPage('InactiveUsers/code.js', 'dev');
InactiveUsers = { months: 2 }