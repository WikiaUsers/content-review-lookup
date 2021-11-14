window.massEditConfig = {
    editInterval: 1500
};

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
 
if (mw.config.get('wgUserGroups').indexOf('sysop', 'content-moderator') > -1) {
  massRenameDelay = 1000;
  massRenameSummary = 'This page under a mass of renames and would not be able to provide a summary.';
  importScriptPage('MediaWiki:MassRename/code.js', 'dev');
}
 
/* MassRename */
massRenameSummary = '[[w:c:dev:MassRename|Tool Link]]';

/* Redirect Button */
if (mw.config.get("wgUserGroups").indexOf('sysop', 'content-moderator') > -1)
  importScriptPage('MediaWiki:AjaxRedirect/code.js', 'dev');
 
/* Imports */
mw.loader.using('ext.fandom.ContentReview.legacyLoaders.js', function() {
    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:AjaxBatchDelete.js',
            'u:dev:MediaWiki:CategoryRenameAuto-update/code.js',
            'u:dev:MediaWiki:FileUsageAuto-update/code.js',
            'u:dev:MediaWiki:FixWantedFiles/code.js',
            'u:dev:MediaWiki:MassCategorization/code.js',
            'u:dev:MediaWiki:MassEdit/code.js',
            'u:dev:MediaWiki:MassProtect/code.js',
            'u:dev:MediaWiki:MassRename/code.js',
            'u:dev:MediaWiki:PageRenameAuto-update/code.js',
            'u:dev:MediaWiki:ReferencePopups/code.js'
        ]
    });
});