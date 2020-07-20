/* Any JavaScript here will be loaded for all users on every page load. */

/* Tabber: This is to make the last tab the default inside infoboxes only. */
/*
$(window).on('load.tabberhack', function() {
    $('.infobox .tabberlive')[0].tabber.tabShow($('.infobox ul.tabbernav li').length - 1); // Switch to last tab
    $(window).off('load.tabberhack');
});
*/

// ============================================================
//                       Imports
// ============================================================
// Check the original pages for more information.
// Most of these are found at
//    http://dev.wikia.com/wiki/List_of_JavaScript_enhancements
 
importArticles({
    type: 'script',
    articles: [
        // ReferencePopups - http://dev.wikia.com/wiki/ReferencePopups
        'w:c:dev:ReferencePopups/code.js',
        // Adds a "Refresh" option to page controls
        'w:dev:PurgeButton/code.js',
        "u:dev:EditConflictAlert/code.js"
    ]
});

window.railWAM = {
    logPage:"Kubera Wiki:WAM Log",
};