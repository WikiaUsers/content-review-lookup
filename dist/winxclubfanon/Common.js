importScriptPage('ShowHide/code.js', 'dev')

// Dev Wiki imports
importArticles({
    type: "script",
    articles: [
        "w:dev:BackToTopButton/code.js",
        "w:dev:VisualSpellCheck/code.js",
        "w:dev:SignatureCheck/code.js",
        "w:dev:EditIntroButton/code.js",
        "w:dev:PurgeButton/code.js",
        "w:dev:AjaxBatchDelete/code.js",
        "w:dev:SearchGoButton/code.js", 
        "u:dev:FloatingToc/code.js",
        "u:dev:InactiveUsers/code.js"
 
    ]
});

// Standard Edit Summaries
importScript('MediaWiki:Common.js/standardeditsummaries.js');
 
// Ajax auto-refresh
var ajaxPages = ['Special:RecentChanges','Special:WikiActivity','Special:Contributions'];
var AjaxRCRefreshText = 'Auto-refresh';
importScriptPage('AjaxRC/code.js', 'dev');