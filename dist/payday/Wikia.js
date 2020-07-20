importArticles({
    type: 'script',
    articles: [
        'u:dev:ExtendedNavigation/code.js',
        'u:dev:AjaxRC/code.js',
    ]
});

/* Auto Refresh */
AjaxRCRefresh = 30;
AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions","Special:WikiActivity"];