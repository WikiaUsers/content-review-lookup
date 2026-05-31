/* IMPORTANT: Any JavaScript here will be loaded for all users on every page load. */
/* ==================== Configuration ==================== */
preloadTemplates_subpage = "case-by-case";
preloadTemplates_namespace = "Template";

/* ==================== Imports ==================== */
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
        
        /** ========== User management ========== **/
        'u:dev:MediaWiki:MassUserRights/code.js',
        'u:dev:MediaWiki:MassBlock/code.js',
        'u:dev:MediaWiki:SandboxTab/code.js',
        
        /** ========== Extra ========== **/
        'u:dev:MediaWiki:TemplateData Documentation.js',
        'u:dev:MediaWiki:EasyTalk.js',
        'u:dev:MediaWiki:Charts.js',
        'u:dev:MediaWiki:YouTubeModal/code.js',
    ]
});