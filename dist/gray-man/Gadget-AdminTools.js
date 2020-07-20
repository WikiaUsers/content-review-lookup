/* AjaxBatchDelete */
window.batchDeleteDelay = 100;

/* Enable MassCategorization for Content Moderators */
window.MassCategorizationGroups = [
    'bot',
    'content-moderator',
    'sysop'
];

/* MassRename */
massRenameSummary = '[[w:c:dev:MassRename|automatic]]';

/* Imports */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AjaxBatchDelete.js',
        'u:dev:MediaWiki:AjaxCommentDelete/code.js',
        'u:dev:MediaWiki:CategoryRenameAuto-update/code.js',
        'u:dev:MediaWiki:FileUsageAuto-update/code.js',
        'u:dev:MediaWiki:MassCategorization/code.js',
        'u:dev:MediaWiki:MassEdit/code.js',
        'u:dev:MediaWiki:MassNullEdit/code.js',
        'u:dev:MediaWiki:MassProtect/code.js',
        'u:dev:MediaWiki:MassRename/code.js',
        'u:dev:MediaWiki:PageRenameAuto-update/code.js'
    ]
});