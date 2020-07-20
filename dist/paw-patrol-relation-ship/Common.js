/* Any JavaScript here will be loaded for all users on every page load. */

window.ajaxPages = ["Some Frequently Updated Page"];
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Watchlist", "Log", "Contributions"];
window.ajaxIndicator = 'https://media2.giphy.com/media/WasWLSYaN4bWo/giphy.gif';
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AjaxRC/code.js',
    ]
});