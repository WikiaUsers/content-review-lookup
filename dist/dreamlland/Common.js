/*/* Any JavaScript here will be loaded for all users on every page load. */

importScriptPage('MediaWiki:Common.js/displayTimer.js', 'runescape');

/* Auto updating recent changes opt-in
* See w:c:dev:AjaxRC for info & attribution 
*/
 
AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:UncategorizedPages","Special:AllPages"];
importScriptPage('AjaxRC/code.js', 'dev');