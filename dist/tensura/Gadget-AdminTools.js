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
 
window.AjaxCommentDeleteConfig = {
    fastDelete: "The reason for deletion of the comment. You can modify this text!"
};
 
window.MassCategorizationGroups = ['sysop', 'content-moderator'];
 
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "This blog is considered archived because it hasn\'t been commented on in over <expiryDays> days, please don\'t bump this blog!",
    nonexpiryCategory: "Never archived blogs"
};
 
/**** UploadInFile ****/
window.needsLicense = true;
window.allowMultiUpload = true;
 
/* Auto Refresh */
window.ajaxPages = ["Some Frequently Updated Page"];
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Watchlist", "Log", "Contributions"];
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
 
window.topLevelCat = 'Browse';
window.cacheSkip = [];
window.cacheSkipLimit = 1000;
window.CacheCheckRemove = false;
 
window.cacheSkip = ['Specialpages', 'Deadendpages', 'Lonelypages',
    'Uncategorizedcategories', 'Uncategorizedpages', 'Uncategorizedimages', 'Uncategorizedtemplates',
    'Unusedcategories', 'Unusedimages', 'Unusedtemplates', 'UnusedVideos',
    'Wantedcategories', 'Wantedpages', 'Wantedfiles', 'Wantedtemplates'];
 
if (mw.config.get('wgUserGroups').indexOf('sysop') > -1) {
  massRenameDelay = 1000;
  massRenameSummary = 'automatic';
  importScriptPage('MediaWiki:MassRename/code.js', 'dev');
}
 
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
        'u:dev:MediaWiki:FixWantedFiles/code.js',
        'u:dev:MediaWiki:MassCategorization/code.js',
        'u:dev:MediaWiki:MassEdit/code.js',
        'u:dev:MediaWiki:MassNullEdit/code.js',
        'u:dev:MediaWiki:MassProtect/code.js',
        'u:dev:MediaWiki:MassRename/code.js',
        'u:dev:MediaWiki:PageRenameAuto-update/code.js'
    ]
});