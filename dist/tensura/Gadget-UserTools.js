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
window.cacheSkip = [];
window.cacheSkipLimit = 1000;
window.CacheCheckRemove = true;

/* Purge Button Display Text */
window.PurgeButtonText = 'Purge';
 
/* Imports */
mw.loader.using('ext.fandom.ContentReview.legacyLoaders.js', function() {
    importArticles({
    	type: 'script',
    	articles: [
    	    'u:dev:MediaWiki:AjaxRC/code.js',
    	    'u:dev:MediaWiki:CacheCheck/code.js',
    	    'u:dev:MediaWiki:DupImageList/code.js',
    	    'u:dev:MediaWiki:FixWantedFiles/code.js',
    	    'u:dev:MediaWiki:ListFiles/code.js',
    	    'u:dev:MediaWiki:MarkBlocked.js',
    	    'u:dev:MediaWiki:PurgeButton/code.js',
        ]
    });
});