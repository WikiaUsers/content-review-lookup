importArticles({
    type: "script",
    articles: [
        "MediaWiki:Wikia.js/MainPage.js",
    ]
});

// Auto-refresh Special:RecentActivity

AjaxRCRefreshText = 'Auto-refresh';  
AjaxRCRefreshHoverText = 'Automatically refresh the page';  
importScriptPage('AjaxRC/code.js', 'dev');  
var ajaxPages =["Special:RecentChanges", "Special:WikiActivity"];
/* importScriptPage('MediaWiki:Snow.js', 'community'); */