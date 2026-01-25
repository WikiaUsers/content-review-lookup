/* Any JavaScript here will be loaded for all users on every page load. */
/**
 * AJAX Configuration Block
 * These settings must stay ABOVE the importArticles section.
 */

// 1. AjaxRC (Recent Changes) Configuration
window.ajaxSpecialPages = [
    "Recentchanges", 
    "Watchlist", 
    "Log", 
    "Contributions", 
    "Images"
];
window.ajaxRefresh = 30000; // Refreshes every 30 seconds
window.AjaxRCRefreshText = 'Auto-refresh'; // Label for the checkbox
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

// 2. AjaxBatchDelete Configuration (For Admins/Content Mods)
window.batchDeleteDelay = 500; // Half-second delay between deletions to avoid rate limits

// 3. AjaxUndo & QuickDiff Settings
window.AjaxUndo = {
    undoSummary: 'Reverting edit via AjaxUndo'
};

/**
 * Script Imports
 * This pulls the code from the Fandom Dev Wiki.
 */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AjaxRC/code.js',
        'u:dev:MediaWiki:AjaxBatchDelete.js',
        'u:dev:MediaWiki:AjaxUndo.js',
        'u:dev:MediaWiki:AjaxQuickDiff/code.js'
    ]
});