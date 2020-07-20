//* Any JavaScript here will be loaded for all users on every page load. */
 
window.MessageWallUserTags = {
    tagColor: '#000',
    glow: false,
    users: {
        'Wanderer23': 'Admin',
        'Christy32': 'Admin',
    }
};
 
var ajaxPages = ["Special:WikiActivity","Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions"];
var AjaxRCRefreshText = 'Auto-refresh';
var AjaxRCRefreshHoverText = 'Automatically refresh this page';
var ajaxRefresh = 15000;
 
SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Upcoming Content');
    }
};
 
var MessageBlock = {
  title : 'Block',
  message : 'You have been blocked for $2 because you have $1.'
};
 
importArticles({
    type: "script",
    articles: [
        "u:dev:MessageWallUserTags/code.js",
        "u:dev:AjaxRC/code.js",
        "MediaWiki:Common.js/Summaries.js",
        "MediaWiki:Common.js/icons.js",
        "MediaWiki:Common.js/histats.js",
        "MediaWiki:Common.js/SigCheck.js",
        "MediaWiki:Common.js/InactiveUsers.js",
        "MediaWiki:Common.js/DuplicateImages.js",
        "MediaWiki:Common.js/SpoilerPop.js",
        "MediaWiki:Common.js/slider.js",
        "u:runescape:MediaWiki:Common.js/WLH_edit.js",
        "u:dev:PurgeButton/code.js",
        "u:dev:DISPLAYTITLE/code.js",
        "u:dev:MessageBlock/code.js",
        "u:dev:FileUsageAuto-update/code.js",
        "u:dev:AllPagesHideRedirect/code.js",
        "u:dev:FixMultipleUpload/code.js",
        "u:dev:WallGreetingButton/code.js",
        "u:dev:ShowHide/code.js",
        "u:dev:BackToTopButton/code.js",
        "u:dev:ReferencePopups/code.js",
        "u:dev:FloatingToc/code.js",
        "u:dev:Countdown/code.js",
        "u:dev:DisplayClock/code.js",
        "u:dev:DupImageList/code.js"
    ]
});
 
// Alert contributors when they are editing with their bot flag set
if (mediaWiki.config.get("wgAction") == "edit" && mediaWiki.config.get("wgUserGroups").indexOf("bot") != -1){
   $("#EditPageHeader").after('<div id="botWarning" style="background-color: darkred; color:silver; display:block; padding: 5px 0px; text-align: center; font-weight: bold; font-size: 110%;">NOTE: You are currently editing with your bot flag set!!</div>')
}

//Facebook module
$(window).load(function(){
    $('#WikiaRail').append('<section class="module" id="facebookmodule"><iframe marginheight="0" marginwidth="0" src="" align="top" frameborder="0" width="270" height="280" scrolling="no" /></section>');
});