window.ajaxSpecialPages = [
    'Recentchanges',
    'WikiActivity',
    'Log',
    'Images',
    'Videos',
    'Watchlist',
    'AbuseLog'
];
window.ajaxRefresh = 30000;

importArticle( {
    type: 'script',
    article: 'u:dev:MediaWiki:AjaxRC.js'
} );