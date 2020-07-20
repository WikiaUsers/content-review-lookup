/* Any JavaScript here will be loaded for all users on every page load. */

/* Auto Refresh */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importArticles({
    type: 'script',
    articles: [
        "u:dev:AjaxRC/code.js",
        "u:dev:WallGreetingButton/code.js",
        "u:dev:BackToTopButton/code.js",
        "u:dev:ShowHide/code.js",
        "w:c:dev:ReferencePopups/code.js", /* Balloon pop-up references */
        "w:c:dev:TopEditors/code.js",
        "w:c:dev:Countdown/code.js",
        "w:c:dev:ExternalImageLoader/code.js",
        "MediaWiki:Common.js/Notice.js" /*Site-wide Notice*/
    ]
});