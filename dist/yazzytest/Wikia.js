importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxBatchDelete/code.js',
        'u:dev:DupImageList/code.js',
        'u:dev:SocialIcons/code.js', 
        'MediaWiki:Wikia.js/inputUserInformation.js',
        'u:halo:MediaWiki:Wikia.js/Slider.js'
    ]
});
 
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "color"
};
cacheSkip = [];
cacheSkipLimit = 5000;
 
 
// Auto-refresh Special:RecentActivity
 
AjaxRCRefreshText = 'Auto-refresh';  
AjaxRCRefreshHoverText = 'Automatically refresh the page';  
importScriptPage('AjaxRC/code.js', 'dev');  
var ajaxPages =["Special:RecentChanges", "Special:WikiActivity"];
/* importScriptPage('MediaWiki:Snow.js', 'community'); */