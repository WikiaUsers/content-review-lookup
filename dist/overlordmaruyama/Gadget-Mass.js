massRenameSummary       = 'automatic';
window.batchDeleteDelay = 100;

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AjaxBatchDelete.js',
        'u:dev:MediaWiki:CategoryRenameAuto-update/code.js',
        'u:dev:MediaWiki:FileUsageAuto-update/code.js',
        'u:dev:MediaWiki:MassCategorization/code.js',
        'u:dev:MediaWiki:MassEdit/code.js',
        'u:dev:MediaWiki:MassNullEdit/code.js',
        'u:dev:MediaWiki:MassPatrol/code.js',
        'u:dev:MediaWiki:MassProtect/code.js',
        'u:dev:MediaWiki:MassRename/code.js',
        'u:dev:MediaWiki:Nuke/code.js',
        'u:dev:MediaWiki:PageRenameAuto-update/code.js'
    ]
});