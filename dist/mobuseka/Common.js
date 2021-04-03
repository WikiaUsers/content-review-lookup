/* Auto Refresh Settings */
var ajaxPages = [
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions",
    "Special:WikiActivity"
    ];
var ajaxRefresh = 30000;
var AjaxRCRefreshText = 'Auto-refresh';
var AjaxRCRefreshHoverText = 'Automatically refresh the page (Every 30s)';

/* Import Scripts */
importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxRC/code.js',
    ]
});
/*************************************************************************/



/* Automated Profile Template */
window.AutoCreateUserPagesConfig = {
    content: {
        2:'{{sub'+'st:MediaWiki:Welcome-user-page}}',
        3:false,
        1202:false
    },
    summary:'Automated new user page'
};

importArticles({ 
    type: 'script', 
    articles: [ 
        'u:dev:MediaWiki:AutoCreateUserPages.js', 
    ]
});
/*************************************************************************/