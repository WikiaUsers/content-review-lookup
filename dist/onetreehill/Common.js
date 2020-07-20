/* Any JavaScript here will be loaded for all users on every page load. */
/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */
 
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');

/* Summary filler
 * From RuneScape Wiki
 */
 
importScriptPage('MediaWiki:Common.js/standardeditsummaries.js', 'runescape');
importArticle({type:'script', article:'w:c:dev:DisplayClock/code.js'});

/* Title rewrite */
importScriptPage('MediaWiki:Common.js/titlerewrite.js', 'onetreehill');

/* collapsible */
importScriptPage('ShowHide/code.js', 'dev');