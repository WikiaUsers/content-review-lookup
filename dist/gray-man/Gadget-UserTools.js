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
window.topLevelCat = 'Gray Man Wiki';

/* RailWAM */
window.railWAM = {
    autoLogForUsers: 'User:Toji-san',
    logPage: 'Project:WAM Log'
};

/* UploadInPage */
window.needsLicense = true;

/* Imports */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AddRailModule/code.js',
        'u:dev:MediaWiki:AjaxRC/code.js',
        'u:dev:MediaWiki:CacheCheck/code.js',
        'u:dev:MediaWiki:DiscussionsActivity.js',
        'u:dev:MediaWiki:DupImageList/code.js',
        'u:dev:MediaWiki:EditcountTag/code.js',
        'u:dev:MediaWiki:FixWantedFiles/code.js',
        'u:dev:MediaWiki:ListFiles/code.js',
        'u:dev:MediaWiki:MarkBlocked.js',
        'u:dev:MediaWiki:PurgeButton/code.js',
        'u:dev:MediaWiki:RailWAM/code.js',
        'u:dev:MediaWiki:UploadInPage/code.js',
        'u:dev:MediaWiki:WallGreetingButton/code.js'
    ]
});