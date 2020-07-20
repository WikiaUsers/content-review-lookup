/* Any JavaScript here will be loaded for all users on every page load. */

/* Add UTC clock above articles */
importScriptPage('DisplayClock/code.js', 'dev');

importScriptPage('BackToTopButton/code.js', 'dev');

importScriptPage('ShowHide/code.js', 'dev');

/* Auto Refresh */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');

/* Wall Greeting Button */
importArticles({
    type: 'script',
    articles: [
        'w:dev:WallGreetingButton/code.js'
    ]
});