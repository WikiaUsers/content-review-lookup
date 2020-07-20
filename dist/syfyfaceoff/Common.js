/* Any JavaScript here will be loaded for all users on every page load. */
 
// Ajax auto-refresh
var ajaxPages = ['Special:RecentChanges','Special:WikiActivity','Special:Contributions'];
var AjaxRCRefreshText = 'Auto-refresh';
// END Ajax auto-refresh
 
importArticles({
    type: "script",
    articles: [
        "u:dev:BackToTopButton/code.js",
        "u:dev:DupImageList/code.js",
        "u:dev:SearchSuggest/code.js",
        "u:dev:NullEditButton/code.js",
        "u:dev:AjaxRC/code.js"
    ]
});

importArticles({
    type: "script",
    articles: [
        "w:c:dev:MediaWiki:Countdown/code.js"
    ]
});