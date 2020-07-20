/* Auto Refresh */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');

// Display Clock
window.DisplayClockJS = {
    format: '%d %B %Y, %2H:%2M:%2S (UTC)',
    hoverText: 'Click to purge the cache'
};

/**************************************************************************/

importArticles({
    type: "script",
    articles: [
        // Test if an Element has a Certain Class
        'MediaWiki:Common.js/elementClass.js',
        // Togglers (toggles the display of elements on a page)
        'MediaWiki:Common.js/togglers.js',
        // Display Clock
        'w:dev:DisplayClock/code.js',
        // ShowHide
        'w:c:dev:ShowHide/code.js',
        // Lock old blogs
        'w:c:dev:LockOldBlogs/code.js'
    ]
}, {
    type: "style",
    article: 'Template:Ambox/code.css'
});