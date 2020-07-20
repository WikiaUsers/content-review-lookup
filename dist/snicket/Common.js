/* Any JavaScript here will be loaded for all users on every page load. */

/* ================
   Imports
   ================ */
   
importArticles({
    type: "script",
    articles: [
        "u:dev:AjaxRC/code.js",
        "w:dev:Countdown/code.js",
        "w:dev:SpoilerAlert/code.js",
        "w:dev:ShowHide/code.js",
        "w:dev:EditIntroButton/code.js",
        "w:dev:DupImageList/code.js",
        "w:dev:RevealAnonIP/code.js",
        "w:dev:Category_Sorter/code.js",
        "w:dev:Standard_Edit_Summary/code.js",
        "w:dev:TopEditors/code.js"
    ]
});

/* =============
   MOS box 
   from Brickipedia
   ===============
   Keep at end of common.js, but before
   any addOnloadHooks.
   ================ */
 
/* 
    I took this out, at least for now, as
    I couldn't get it to allow scrolling.
    
    =====================================

importScript('MediaWiki:Common.js/mosbox.js');

    */


/* ================
   AJAX customisation
   ================ */
window.ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:Watchlist","Special:Log","Special:Contributions"];
window.ajaxRefresh = 30000
AjaxRCRefreshText = 'Auto-refresh via AJAX';
AjaxRCRefreshHoverText = 'Automatically refreshes the page';


/** 
 * SpoilerAlert
 * documentation at: http://dev.wikia.com/wiki/SpoilerAlert
 * © Peter Coester, 2012
 * 
 * __NOWYSIWYG__
 */
 
SpoilerAlert = {
            question: 'This page may contain spoilers about unreleased stories.<br />Run away while you still can.',
            yes: 'We can handle it.<br />We can handle anything.',
            no: 'Get me out of here!!!',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Contains spoilers');
    },
    back:true
};