$(function () {
if (wgPageName == "Special:MyHome") location.href="./Main_Page";
});

/* Auto-refresh Recent Wiki Activity and other pages */
var ajaxRefresh = 30000;
var AjaxRCRefreshText = 'Auto-update current page';
var AjaxRCRefreshHoverText = 'Click to automatically update the current page every 30 seconds';
var ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions","Special:WikiActivity","Special:NewFiles"];

importArticles({
    type: "script",
    articles: [
        "MediaWiki:Buildmenu.js",
        "u:dev:AjaxRC/code.js",
        "u:dev:DisplayClock/code.js",
        "u:dev:CacheCheck/code.js"
    ]
});