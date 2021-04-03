/* Any JavaScript here will be loaded for all users on every page load. */
/* Auto Refresh Settings */
var ajaxPages = [
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions",
    "Special:WikiActivity"
    ];
var AjaxRCRefreshText = 'Auto-refresh';
var AjaxRCRefreshHoverText = 'Automatically refresh the page';
var ajaxRefresh = 30000;

window.BackToTopModern = true;
window.railWAM = {
    logPage:"Project:WAM Log"
};
 
/* Import Scripts */
importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxRC/code.js',
        'u:dev:MediaWiki:BackToTopButton/code.js',
        'u:dev:MediaWiki:RailWAM/code.js',
        'u:dev:MediaWiki:DisplayTimer/code.js',
        'u:dev:MediaWiki:SeeMoreActivityButton/code.js',
        'u:dev:MediaWiki:DiscussionsRailModule/code.js',
        'u:dev:MediaWiki:User Avatar Finder/code.js',
        'u:dev:MediaWiki:SourceEditButton.js',
        'u:dev:MediaWiki:RailWAM/code.js',
        'u:dev:MediaWiki:ReferencePopups/code.js',
    ]
});