/* Any JavaScript here will be loaded for all users on every page load. */

/* Auto Refresh */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importArticles({
    type: 'script',
    articles: [
        "u:dev:AjaxRC/code.js", /* Auto Refresh */
        "u:dev:WallGreetingButton/code.js", /* Wall Greeting Button */
        "u:dev:BackToTopButton/code.js", /* Add Back To Top Button */
        "w:c:dev:ReferencePopups/code.js",
        "MediaWiki:Common.js/displayTimer.js",
        "MediaWiki:Common.js/Toggler.js"
    ]
});