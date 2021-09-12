/* AjaxRC */
window.ajaxRefresh      = 30000;
window.ajaxSpecialPages = [
    'Contributions',
    'Log',
    'Recentchanges',
    'Watchlist',
    'WikiActivity'
];
 
/* CacheCheck */
window.topLevelCat = 'Tensei Shitara Slime Datta Ken Wiki';
 
/* Imports */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AddRailModule/code.js',
        'u:dev:MediaWiki:AjaxAbuseLog.js',
        'u:dev:MediaWiki:AjaxRedirect/code.js',
        'u:dev:MediaWiki:AutoPurge/code.js',
        'u:dev:MediaWiki:AjaxRC/code.js',
        'u:dev:MediaWiki:CacheCheck/code.js',
        'u:dev:MediaWiki:DiscussionsActivity/code.js',
        'u:dev:MediaWiki:DupImageList/code.js',
        'u:dev:MediaWiki:EditcountTag/code.js',
        'u:dev:MediaWiki:FixWantedFiles/code.js',
        'u:dev:MediaWiki:ListFiles/code.js',
        'u:dev:MediaWiki:MarkBlocked.js',
        'u:dev:MediaWiki:PurgeButton/code.js',
    ]
});