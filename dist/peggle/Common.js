/* Any JavaScript here will be loaded for all users on every page load. */

AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Auto-refreshes the page.';
ajaxPages = ["Special:RecentChanges", "Special:WikiActivity"];
importScriptPage('ShowHide/code.js', 'dev');
importScriptPage('AjaxRC/code.js', 'dev');
importScriptPage('AjaxBatchDelete/code.js', 'dev');
 
importArticles({
        type: "script",
        articles: [
                "w:c:dev:SignatureCheck/code.js",
                "w:c:dev:View_Source/code.js",
                "w:c:dev:ListAdmins/code.js",
                "u:dev:SearchSuggest/code.js",
                "w:c:dev:RevealAnonIP/code.js",
                "MediaWiki:Common.js/Usertags.js",
                "w:c:dev:LockOldBlogs/code.js",
                "u:dev:LockForums/code.js"
        ]
});