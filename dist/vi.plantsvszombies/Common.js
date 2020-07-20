/* Any JavaScript here will be loaded for all users on every page load. */

importScriptPage('ShowHide/code.js', 'dev');

//The "if (mw.config.get("wgUserGroups").indexOf('sysop') > -1)" code allows imported scripts to load only for administrators
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Auto-refreshes the page.';
ajaxPages = ["Special:RecentChanges", "Special:WikiActivity"];
importScriptPage('ShowHide/code.js', 'dev');
importScriptPage('AjaxRC/code.js', 'dev');
importScriptPage('AjaxBatchDelete/code.js', 'dev');
if (mw.config.get("wgUserGroups").indexOf('sysop') > -1)
massBlockDelay = 1000;
importScriptPage('MassBlock/code.js', 'dev');
chatBlockReason = "ToU violation";
chatBlockExpiry = "3 months";
importScriptPage('ChatBlockButton/code.2.js','dev');
if (mw.config.get("wgUserGroups").indexOf('sysop') > -1)
importScriptPage('ViewRemoved/code.js', 'dev');
importScriptPage('ChatRefresh/code.js', 'dev');
var ArchiveToolConfig = { 
   archiveListTemplate: 'Archives',
   archivePageTemplate: 'Archivepage',
   archiveSubpage: 'Archive',
   userLang: true
};
importScriptPage('ArchiveTool/code.js', 'dev');
importScriptPage('PowerPageMaker/code.js', 'dev'); 
importScriptPage('AdminDashboard JS-Button/code.js', 'dev');
importArticles({
        type: "script",
        articles: [
                "w:c:dev:SignatureCheck/code.js",
                "w:c:dev:BackToTopButton/code.js",
                "w:c:dev:View_Source/code.js",
                "w:c:dev:ListAdmins/code.js",
                "u:dev:SearchSuggest/code.js",
                "w:c:dev:RevealAnonIP/code.js",
                "MediaWiki:Common.js/Usertags.js",
                "w:c:dev:PurgeBlogs/code.js",
                'u:dev:GiveChatModPrompt/code.js',
                'u:dev:!mods/code.js',
                'u:dev:MibbitIRC/code.js',
                'u:dev:TopEditors/code.js',
                "u:dev:RecentChangesMultiple/code.js",
                'u:dev:DisplayTimer/code.js',
                'u:dev:ExtendedNavigation/code.js'
                
        ]
});

if (mw.config.get("wgUserGroups").indexOf('sysop') > -1)
importArticles({
        type: "script",
        articles: [
                'w:c:dev:LastEdited/code.js',
        ]
});

// http://dev.wikia.com/wiki/RevealAnonIP
window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat', 'staff']
};
 
/* Add extra classes based on category
 * @author: UltimateSupreme (http://c.wikia.com/wiki/User:UltimateSupreme)
 */
(function ($, mw) {
    function categorycheck() {
        if ($(this).text() === "Dreamworld levels") {
            $(".wikia-infobox").addClass("dreamworld");
            mw.log("Category found!");
            return;
        }
    }
    if (mw.config.get("skin") === "oasis") {
        $("li.category > span.name > a").each(categorycheck);
    } else {
        $(".mw-normal-catlinks a").each(categorycheck);
    }
}(jQuery, mediaWiki));
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').text(mw.config.get('wgUserName'));
});

/* End of the {{USERNAME}} replacement */