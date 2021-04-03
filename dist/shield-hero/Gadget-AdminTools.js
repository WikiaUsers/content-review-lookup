/* AjaxBatchDelete */
window.batchDeleteDelay = 100;
 
/* Enable MassCategorization for Content Moderators */
window.MassCategorizationGroups = [
    'bot',
    'content-moderator',
    'sysop'
];

window.massEditConfig = {
    editInterval: 1500
};
 
window.batchDeleteDelay = 100;
 
window.MassCategorizationGroups = [
	'sysop',
	'content-moderator'
];
 
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "This blog is considered archived because it hasn\'t been commented on in over <expiryDays> days, please don\'t bump this blog!",
    nonexpiryCategory: "Never archived blogs"
};
 
/* Cache Check */
window.topLevelCat      = 'The Rising of the Shield Hero Wiki';
window.cacheSkip        = [];
window.cacheSkipLimit   = 1000;
window.CacheCheckRemove = false;
window.cacheSkip        = [
    'Deadendpages',
    'Lonelypages',
    'Specialpages',
    'Uncategorizedcategories',
    'Uncategorizedpages',
    'Uncategorizedimages',
    'Uncategorizedtemplates',
    'Unusedcategories',
    'Unusedimages',
    'Unusedtemplates',
    'UnusedVideos',
    'Wantedcategories',
    'Wantedpages',
    'Wantedfiles',
    'Wantedtemplates'
];
 
/* MassRename */
massRenameSummary = '[[w:c:dev:MassRename|automatic]]';
 
/* Imports */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AjaxBatchDelete.js',
        'u:dev:MediaWiki:FixWantedFiles/code.js',
        'u:dev:MediaWiki:MassEdit/code.js',
        'u:dev:MediaWiki:MassNullEdit/code.js',
        'u:dev:MediaWiki:MassProtect/code.js',
        'u:dev:MediaWiki:MassRename/code.js',
        'u:dev:MediaWiki:PageRenameAuto-update/code.js',
        // UCP-unknown
        'u:dev:MediaWiki:CategoryRenameAuto-update/code.js',
        'u:dev:MediaWiki:FileUsageAuto-update/code.js',
        'u:dev:MediaWiki:MassCategorization/code.js'
    ]
});