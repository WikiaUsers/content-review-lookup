importArticles({
    type: "script",
    articles: [
        "u:dev:AjaxBatchDelete/code.js",
        "u:dev:DupImageList/code.js",
        "MediaWiki:Wikia.js/inputUserInformation.js",
        "MediaWiki:Wikia.js/MainPage.js",
        "MediaWiki:Wikia.js/Slider.js"
    ]
});

// Auto-refresh Special:RecentActivity

AjaxRCRefreshText = 'Auto-refresh';  
AjaxRCRefreshHoverText = 'Automatically refresh the page';  
importScriptPage('AjaxRC/code.js', 'dev');  
var ajaxPages =["Special:RecentChanges", "Special:WikiActivity"];
/* importScriptPage('MediaWiki:Snow.js', 'community'); */