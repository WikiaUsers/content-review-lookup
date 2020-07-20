/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
    type: "script",
    articles: [
        "w:dev:AjaxRC/code.js",
    ]
});
/* Auto Refresh */
AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];

importArticles({
type: 'script',
articles: [
'u:dev:MediaWiki:EmoticonsWindow/code.js',
]
});



window.railWAM = {
    logPage:"Project:WAM Log"
};