/* AjaxRC */
window.ajaxPages = ["Blog:Recent_posts","Special:Chat","Special:WikiActivity","Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions","Special:Images","Special:Contributions"];
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/theloudhouse/images/5/53/Loading_bar.gif';
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Update content';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxRC/code.js',
    ]
});