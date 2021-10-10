/* Any JavaScript here will be loaded for all users on every page load. */
 
/* Auto Refresh Settings */
var ajaxPages = [
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions",
    "Special:WikiActivity"
    ];
var AjaxRCRefreshText = 'Auto-refresh';
var AjaxRCRefreshHoverText = 'Automatically refresh the page';
var ajaxRefresh = 30000;
 
/* Import Scripts */
importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxRC/code.js',
    ]
});

/* Discord Banner */
window.DiscordBannerSettings = {
    bannerStyle: '4',
    inviteLink: 'bdQKA3K',
    prependToRail: false
};