window.ajaxPages = [
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions",
    "Special:NewFiles",
    "Special:NewPages",
    "Special:ListFiles",
    "Special:WikiActivity"
];
window.AjaxRCRefreshText = 'Auto-Refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh every 60secs';
window.ajaxCallAgain = ($.isArray(window.ajaxCallAgain) && window.ajaxCallAgain) || [];
 
importArticles({
    type: 'script',
    articles: [
        //'u:c:User:ToaMeiko/chat-global.js',
        'u:dev:ListFiles/code.js',
        'u:dev:AjaxBatchDelete/code.js',
        'u:dev:WallGreetingButton/code.js',
        'u:dev:RevealAnonIP/code.js',
        'u:dev:AjaxRC/code.js',
        'MediaWiki:Common.js/bglinks.js'
    ]
}, {
    type: 'style',
    article: 'Mediawiki:Common.css/bglinks.css'
});
 
// http://dev.wikia.com/wiki/RevealAnonIP
window.RevealAnonIP = {
    permissions: ['sysop', 'bureaucrat']
};
 
if (wgPageName.indexOf("Special:MovePage/File:") != -1 || (wgCanonicalNamespace == "File" && Storage)) {
    importScriptPage("FileUsageAuto-update/code.js/min.js", "dev");
}
 
// Custom Special:[Multiple]Upload UI
if (({ Upload: 1, MultipleUpload: 1 })[mw.config.get('wgCanonicalSpecialPageName')] === 1) {
    pageScriptList.push(
        'MediaWiki:Common.js/FairUseUpload.js',
        'MediaWiki:Common.js/FixMultipleUpload.js' // Fix the Special:MultipleUpload page
    );
}