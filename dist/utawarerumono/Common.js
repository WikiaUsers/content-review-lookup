/* Auto Refresh */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importArticles({
    type: 'script',
    articles: [
        "u:dev:AjaxRC/code.js",
        "u:dev:WallGreetingButton/code.js",
        "u:dev:BackToTopButton/code.js",
        'u:dev:AllPagesHideRedirect/code.js',
        "u:dev:ShowHide/code.js",
        'u:dev:PurgeButton/code.js'
    ]
});

PurgeButtonText = 'Refresh';