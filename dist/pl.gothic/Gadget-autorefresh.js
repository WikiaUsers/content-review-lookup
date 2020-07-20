window.AjaxRCRefreshText = 'Automatyczne odświeżanie';
window.ajaxRefresh = 15000;
window.ajaxSpecialPages = [
    'Recentchanges',
    'Images',
    'Log',
    'Watchlist',
    'WikiActivity',
    'Contributions'
];
importArticle({ type: 'script', article: 'u:dev:MediaWiki:AjaxRC/code.js' });