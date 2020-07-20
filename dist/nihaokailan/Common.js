/* Any JavaScript here will be loaded for all users on every page load. */
 
var ajaxPages = ["Special:WikiActivity","Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions"];
var AjaxRCRefreshText = 'Auto-refresh';
var AjaxRCRefreshHoverText = 'Automatically refresh this page';
importScriptPage('AjaxRC/code.js', 'dev');
 
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "This blog is inactive. There is no need to comment",
    nonexpiryCategory: "Non-archived blogs"
};

 // *****************************
 // Beginning of Script importing
 // *****************************

importArticles({
    type: "script",
    articles: [
        "MediaWiki:Common.js/histats.js",
        "MediaWiki:Common.js/InactiveUsers.js",
        "MediaWiki:Common.js/SigCheck.js",
        "MediaWiki:Common.js/FileUpdater.js",
        "MediaWiki:Common.js/icons.js",
        "MediaWiki:Common.js/countdownclock.js",
        "w:c:dev:ShowHide/code.js",
        "w:c:dev:LockOldBlogs/code.js",
        "w:c:dev:DisplayClock/code.js",
        'w:c:dev:FixMultipleUpload/code.js',
        'w:c:dev:AllPagesHideRedirect/code.js',
        "w:c:dev:PurgeButton/code.js",
        'w:c:dev:DisableArchiveEdit/code.js',
        "w:c:runescape:MediaWiki:Common.js/WLH_edit.js",
        "w:c:onceuponatime:MediaWiki:CollapsibleTables.js",
        "w:c:onceuponatime:MediaWiki:Common.js/DuplicateImages.js"
    ]
});

importScriptPage('AjaxRC/code.js','dev');
 
importArticle({
  type: 'script',
  article: 'u:dev:FloatingToc/code.js'
});