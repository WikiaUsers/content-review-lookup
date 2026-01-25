/*** Any JavaScript here will be loaded for all users on every page load. ***/
/* Pre-import configuration */
window.preloadTemplates_list = "MediaWiki:PreloaderList";

/* Imports */
importArticles({
    type: 'script',
    articles: [
    	// from Fandom Developers
        'u:dev:MediaWiki:Nuke/code.js',
        'u:dev:MediaWiki:MultiUpload.js',
        'u:dev:MediaWiki:MassProtect/code.js',
        'u:dev:MediaWiki:Charts.js',
        'u:dev:PreloadTemplates.js'
    ]
});