// Auto-Refresh High Traffic Pages //
window.ajaxSpecialPages = ["RecentChanges","WikiActivity",
"Watchlist", "Log", "Contributions", "AbuseLog", "NewPages"];
window.AjaxRCRefreshText = 'Auto-refresh';
window.ajaxRefresh = 60000;
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxRC/code.js',
    ]
});
// http://dev.wikia.com/wiki/AjaxRC //


// Reveal Anonymous User IP //
importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js"
    ]
});
// http://dev.wikia.com/wiki/RevealAnonIP //