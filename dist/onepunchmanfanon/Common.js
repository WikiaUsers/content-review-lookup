/* Any JavaScript here will be loaded for all users on every page load. */

/* Auto Refresh */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
 
PurgeButtonText = 'Refresh';
 
/* importScriptPages-start */
 
importScriptPage('Countdown/code.js', 'dev');
 
importScriptPage('ShowHide/code.js', 'dev');
 
//importScriptPage('MediaWiki:Search_Fix.js', 'dantest');
 
importScriptPage('BackToTopButton/code.js', 'dev');
 
/* importScriptPages-end */
 
/* importArticles-start */
importArticles({
    type: 'script',
    articles: [
    "u:dev:AjaxRC/code.js", /* Auto Refresh */
	"u:dev:DisplayClock/code.js", /* Displays clock on wiki */
	"w:c:dev:ReferencePopups/code.js", /* References pop-up when hovered over */
    ]
});
 
window.DisplayClockJS = {
	hoverText: 'Click here to refresh the page'
};
/* importArticles-end */