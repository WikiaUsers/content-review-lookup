/* CacheCheck */
window.topLevelCat = 'Tensei Shitara Slime Datta Ken Wiki';
window.cacheSkip = [];
window.cacheSkipLimit = 1000;
window.CacheCheckRemove = true;
 
/* Imports */
mw.loader.using('ext.fandom.ContentReview.legacyLoaders.js', function() {
    importArticles({
    	type: 'script',
    	articles: [
    	    'u:dev:MediaWiki:CacheCheck/code.js',
    	    'u:dev:MediaWiki:DupImageList/code.js',
    	    'u:dev:MediaWiki:ListFiles/code.js'
        ]
    });
});