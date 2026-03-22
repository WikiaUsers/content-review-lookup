/* IMPORTANT: Any JavaScript here will be loaded for all users on every page load. */
/* ==================== Pre-importing configuration ==================== */
// Use [[MediaWiki:Custom-PreloaderList]] as the preloader list which will be loaded by 'PreloadTemplates.js'.
window.preloadTemplates_list = 'MediaWiki:Custom-PreloaderList';

/* ==================== Script imports ==================== */
importArticles({
    type: 'script',
    articles: [
    	/** ========== Page management ========== **/
    	'u:dev:MediaWiki:Nuke/code.js',
    	'u:dev:MediaWiki:AjaxBatchDelete.js',
    	'u:dev:MediaWiki:MassProtect/code.js',
    	'u:dev:MediaWiki:CommentsToggle.js',
        
    	/** ========== File management ========== **/
        'u:dev:MediaWiki:ListFiles/code.js',
		'u:dev:MediaWiki:MultiUpload.js',
        
        /** ========== User page features ========== **/
        'u:dev:MediaWiki:SandboxTab/code.js',
        
        /** ========== Extra ========== **/
        'u:dev:MediaWiki:Charts.js',
    ]
});