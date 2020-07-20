/* Any JavaScript here will be loaded for all users on every page load. */

/*** Winter Snow ***/

importScriptPage('MediaWiki:Snow.js');

/*** Pre-Load Show/Hide Code ***/

importScriptPage('ShowHide/code.js', 'dev');

/*** Auto-refreshing recent changes ***/
 
AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically Refreshes the Recent Activity';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');