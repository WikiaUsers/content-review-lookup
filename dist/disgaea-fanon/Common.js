/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
    type: "script",
    articles: [
        "w:dev:AjaxRC/code.js",
    ]
});

/* Auto Refresh */
AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];