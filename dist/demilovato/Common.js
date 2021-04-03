/* Any JavaScript here will be loaded for all users on every page load. */
 
importArticles({
    type: "script",
    articles: [
        "MediaWiki:Common.js/Summaries.js",
        "MediaWiki:CollapsibleTables.js",
        "MediaWiki:Common.js/Countdown.js",
        "MediaWiki:Common.js/InactiveUsers.js",
        "MediaWiki:Common.js/DuplicateImages.js",
        "w:runescape:MediaWiki:Common.js/WLH_edit.js",
        "w:dev:PurgeButton/code.js",
        'w:dev:AllPagesHideRedirect/code.js',
        'w:dev:FixMultipleUpload/code.js',
        "w:dev:WallGreetingButton/code.js",
        "w:dev:ShowHide/code.js",
        "w:dev:LockOldBlogs/code.js",
        "w:dev:ReferencePopups/code.js",
        "w:dev:DisplayClock/code.js"
 
    ]
});
 
var ajaxPages = ["Special:WikiActivity","Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions"];
var AjaxRCRefreshText = 'Auto-refresh';
var AjaxRCRefreshHoverText = 'Automatically refresh this page';
var ajaxRefresh = 30000;
importScriptPage('AjaxRC/code.js', 'dev');
 
SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Upcoming Content');
    }
};
importScriptPage('MediaWiki:Common.js/SpoilerPop.js', 'onceuponatime');
 
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "This blog is inactive. There is no need to comment",
    nonexpiryCategory: "Non-Archived Blogs"
};
 
// Alert contributors when they are editing with their bot flag set
if (mediaWiki.config.get("wgAction") == "edit" && mediaWiki.config.get("wgUserGroups").indexOf("bot") != -1){
   $("#EditPageHeader").after('<div id="botWarning" style="background-color: darkred; color:silver; display:block; padding: 5px 0px; text-align: center; font-weight: bold; font-size: 110%;">NOTE: You are currently editing with your bot flag set!!</div>')
}

importArticles({
    type: 'script',
    articles: [
        'u:dev:ExtendedNavigation/code.js'
    ]
});

/*YouTube Videos*/
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:YoutubePlayer/code.js'
    ]
});

/*Username*/
importArticles({
    type: "script",
    articles: [
        "u:dev:MediaWiki:InputUsername/code.js"
    ]
});