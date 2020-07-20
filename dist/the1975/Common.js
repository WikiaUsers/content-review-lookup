/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
    type: "script",
    articles: [
        "u:dev:PurgeButton/code.js",
        "u:dev:WallGreetingButton/code.js",
        "u:dev:ShowHide/code.js",
        "u:dev:ReferencePopups/code.js",
        "u:dev:FloatingToc/code.js",
        "u:dev:Countdown/code.js",
        "u:dev:DisplayClock/code.js",
        "u:dev:DupImageList/code.js",
        "u:dev:MarkBlocked.js",
	"u:dev:MediaWiki:NewPagesUser.js"
    ]
});
 
/* auto refresh */
 
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');