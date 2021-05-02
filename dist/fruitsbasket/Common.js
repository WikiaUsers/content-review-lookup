/* Recreate welcome bot, credit to Avatar Wiki */
window.AutoCreateUserPagesConfig = {
    content: {
        2: '{{MediaWiki:Custom-Welcome}}',
        3: false
    },
    summary: 'Welcome to the wiki! (automatic edit)'
};
 
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
 
/* Import Scripts */
importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxRC/code.js',
    ]
});