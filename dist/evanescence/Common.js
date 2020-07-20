importScriptPage('ShowHide/code.js', 'dev');

importScriptPage('Countdown/code.js', 'dev');
 
/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */
 
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');
 
/* Adds "purge" option to page controls
 * See w:c:dev:PurgeButton for info & attribution 
 */
 
importScriptPage('PurgeButton/code.js', 'dev');