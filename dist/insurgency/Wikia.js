// IMPORT: LastEdited

window.lastEdited = {
    avatar: false,
    size: false,
    comment: false,
    namespaces: {
        exclude: [1,2]
    },
};

// IMPORT: Auto-Refreshing RecentChanges, Logs, Contributions, and WikiActivity

var ajaxPages = ["Special:RecentChanges", "Special:Log", "Special:Contributions", "Special:WikiActivity"];
var AjaxRCRefreshText = 'AutoRefresh';

// Imports

importArticles({
    type: 'script',
    articles: [
        'u:admintools:MediaWiki:Wikia.js/cancelButton.js',
        'u:dev:LastEdited/code.js',
        'u:dev:BackToTopButton/code.js',
        'u:dev:InactiveUsers/code.js',
        'u:dev:InputUsername/code.js',
        'u:dev:AjaxRC/code.js',
    ]
});