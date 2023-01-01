// Any JavaScript here will be loaded for all users on every page load.
// If you don not know what you are doing, do not edit this page.
// <source lang="JavaScript">

// Dev Wiki imports
importArticles({
    type: "script",
    articles: [
        "w:dev:BackToTopButton/code.js",
        "w:dev:DisplayClock/code.js",
        "w:dev:VisualSpellCheck/code.js",
        "w:dev:SignatureCheck/code.js",
        "w:dev:AntiUnicruft/code.js",
        "w:dev:EditIntroButton/code.js",
        "w:dev:PurgeButton/code.js",
        "w:dev:AjaxBatchDelete/code.js",
        "w:dev:Standard_Edit_Summary/code.js"
    ]
});

// RevealAnonIP -- dev wiki
window.RevealAnonIP = {
    permissions : ['user']
};
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js"
    ]
});

// Standard Edit Summaries
importScript('MediaWiki:Common.js/standardeditsummaries.js');
 
// Ajax auto-refresh
var ajaxPages = ['Special:RecentChanges','Special:WikiActivity','Special:Contributions'];
var AjaxRCRefreshText = 'Auto-refresh';
importScriptPage('AjaxRC/code.js', 'dev');
 
//</source>