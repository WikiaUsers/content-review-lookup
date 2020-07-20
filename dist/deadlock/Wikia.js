//************
//Auto Refresh
//************

var ajaxPages = [
    "Special:RecentChanges",
    "Special:Log",
    "Special:Contributions",
    "Special:WikiActivity"
];
var AjaxRCRefreshText = 'Auto-refresh';
 
//****************
//End Auto Refresh
//****************

importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxRC/code.js'
    ]
});