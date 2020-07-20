/* Any JavaScript here will be loaded for all users on every page load. */

// ============================================================
//                       Imports
// ============================================================
// Check the original pages for more information.
 
 /* simple "Back to Top" button for longer pages */
importScriptPage('BackToTopButton/code.js', 'dev');

importArticles({
    type: 'script',
    articles: [
        // ReferencePopups - http://dev.wikia.com/wiki/ReferencePopups
        'w:c:dev:ReferencePopups/code.js',
        // Display Clock
        'w:dev:DisplayClock/code.js',
        // Adds a "Refresh" option to page controls
        'w:dev:PurgeButton/code.js',
    ]
});