/* Any JavaScript here will be loaded for all users on every page load. */
importArticles( {
type: "script",
articles: [
"w:c:dev:Countdown/code.js",
'u:dev:DisplayClock/code.js',
'u:dev:Tooltips/code.js',
'u:dev:AjaxRC/code.js'
]
} );

window.ajaxPages = ["Some Frequently Updated Page"];
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Watchlist", "Log", "Contributions"];
window.ajaxIndicator = 'https://images.wikia.nocookie.net/__cb20100609110347/software/images/a/a9/Indicator.gif';
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';