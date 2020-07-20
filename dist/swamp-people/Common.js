/* Any JavaScript here will be loaded for all users on every page load. */

/*** Countdown Timer ***/

importScriptPage('Countdown/code.js', 'dev');

/*** Auto-refreshing recent changes ***/
 
AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically Refreshes the Recent Activity';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');