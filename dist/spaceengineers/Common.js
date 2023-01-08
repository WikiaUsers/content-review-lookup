/* Any JavaScript here will be loaded for all users on every page load. */

/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */
window.ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions"];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh every 60 seconds.';

//Spoiler alert 2
SpoilerAlert = {
  'class': "Spoiler",
}

//moved to MediaWiki:ImportJS


    
importScriptPage('AjaxRC/code.js', 'dev');
importScriptPage('ListAdmins/code.js', 'dev');