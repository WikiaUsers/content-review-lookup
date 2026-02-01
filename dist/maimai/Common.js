/* IMPORTANT: Any JavaScript here will be loaded for all users on every page load. */
/* Configuration */
// Use [[MediaWiki:Custom-PreloaderList]] as the preloader list which will be loaded by PreloadTemplates.js.
window.preloadTemplates_list = 'MediaWiki:Custom-PreloaderList';

/* Editing related extensions */
importArticles({
    type: 'script',
    articles: [
    	'u:dev:MediaWiki:Nuke/code.js',
        'u:dev:MediaWiki:MultiUpload.js',
        'u:dev:MediaWiki:MassProtect/code.js',
        'u:dev:MediaWiki:Charts.js',
    ]
});