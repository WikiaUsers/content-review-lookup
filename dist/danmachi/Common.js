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
        "MediaWiki:Common.js/displayTimer.js",
        "MediaWiki:Common.js/Toggler.js",
        "w:c:dev:ReferencePopups/code.js", /* Balloon pop-up references */
        "MediaWiki:Common.js/ElementTestClass.js"
    ]
});
 
importScriptURI('//toolserver.org/~dapete/ime/ime.js', 'dev');

// For loading external images to wiki
importScriptPage('ExternalImageLoader/code.js', 'dev');