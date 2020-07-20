/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
    type: "script",
    articles: [
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