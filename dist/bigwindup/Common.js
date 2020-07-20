/* Any JavaScript here will be loaded for all users on every page load. */

/* Auto Refresh */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];

// Display 12 hour time followed by day, month (English, full name)
// and year with "(UTC)" at the end
window.DisplayClockJS = '%{January;February;March;April;May;June;July;August;September;October;November;December}m %2d, %Y %2I:%2M:%2S %p (UTC)';

/* Importing Articles */
importArticles({
    type: 'script',
    articles: [
        "u:dev:AjaxRC/code.js", /* Auto Refresh */
        "u:dev:WallGreetingButton/code.js", /* Wall Greeting Button */
        "u:dev:BackToTopButton/code.js", /* Add Back To Top Button */
        "u:dev:ShowHide/code.js", /* Show/Hide */
        "w:c:dev:ReferencePopups/code.js",
        "MediaWiki:Common.js/Toggler.js",
        "u:dev:DisplayClock/code.js"
    ]
});


/* Rail Module */
importArticles({
    type: 'script',
    articles: [
        'u:dev:AddRailModule/code.js',
    ]
});