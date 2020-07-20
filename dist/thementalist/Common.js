/* Any JavaScript here will be loaded for all users on every page load. */

/* Scripts executed after the HTML document is loaded */
 
// Note: some scripts will not work here; e.g. all the sidebar modules
// (because they would be executed before the sidebar finishes loading
// its contents). Only put here scripts that do not depend of elements
// slow to load. Also, put only very very small scripts that necessarily
// must be fired quickly, because they could delay the execution of the
// following scripts.
 
$(function() {
 
    /* Inserts link to blogs in navigation bar */
    $('.subnav-2').first().append('<li class="subnav-2-item"><a data-canonical="blogs" href="/wiki/Blog:Recent_posts" class="subnav-2a">Blogs</a></li>');
 
});
 
/* Scripts executed after the whole page is loaded (including images and other objects) */
$(window).load(function(){
 
    /* Adds option to refresh page to edit dropdown */
    var url = '//' + location.host + location.pathname;
    $('.WikiaMenuElement').append('<li><a id="refresh-button" href="' + url + '?action=purge" title="Refresh page">Refresh</a></li>');
 
});
 
 /* Imported scripts */

/* AutoEditDropdown */
window.AutoEditDropdownConfig = {
    expandedAreaContribute: true,
    expandedAreaEdit: true
};
 
/* Auto Refresh */
AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = [
    'Special:WikiActivity',
    'Special:RecentChanges',
    'Special:Log'
    ];
window.ajaxRefresh = 30000;
 
/* AjaxDiff */
AjaxDiff = {
    expiry: "infinite",
    reason: "Vandalism"
};

/* List of imports */
importArticles({
    type: 'script',
    articles: [
        // Local
        'MediaWiki:StyleFirstWord.js', // Styles the first word of each infobox title
        // External
        'u:dev:AjaxRC/code.js', // Auto Refresh
        'u:dev:AjaxDiff/code.js', // Allows to inspect diffs and stay in WikiActivity
        'u:dev:ReferencePopups/code.js', // Displays content of references on hover
        'u:dev:BackToTopButton/code.js', // Adds "Back to top" button in pages
        'u:dev:View_Source/code.js', // Adds "view source" link to edit dropdown
        'u:dev:RevealAnonIP/code.js', // Replaces "a wikia contributor" with IP address
        'u:dev:AutoEditDropdown/code.js', // Automatically opens edit menu on hover
    ]
});