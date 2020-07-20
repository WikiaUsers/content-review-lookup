// Configure AjaxRC
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions",
    "Special:NewFiles",
    "Special:NewPages",
    "Special:ListFiles",
    "Special:WikiActivity"];
window.AjaxRCRefreshText = 'Auto-Refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh every 60secs';
window.ajaxCallAgain = ($.isArray(window.ajaxCallAgain) && window.ajaxCallAgain) || [];

importArticles({
    type: 'script',
    articles: [
        'u:c:User:ToaMeiko/chat-global.js',
        'u:dev:ListFiles/code.js',
        'u:dev:AjaxBatchDelete/code.js',
        'u:dev:WallGreetingButton/code.js',
        'u:dev:RevealAnonIP/code.js',
        'u:dev:AjaxRC/code.js',]
});

// http://dev.wikia.com/wiki/RevealAnonIP
window.RevealAnonIP = {
    permissions: ['sysop', 'bureaucrat']
};

if (wgPageName.indexOf("Special:MovePage/File:") != -1 || (wgCanonicalNamespace == "File" && Storage)) {
    importScriptPage("FileUsageAuto-update/code.js/min.js", "dev");
}

// Custom Special:[Multiple]Upload UI
if (({
    Upload: 1,
    MultipleUpload: 1
})[mw.config.get('wgCanonicalSpecialPageName')] === 1) {
    pageScriptList.push(
        'MediaWiki:Common.js/FairUseUpload.js',
        'MediaWiki:Common.js/FixMultipleUpload.js' // Fix the Special:MultipleUpload page
    );
}

//Non-Endorsement Disclaimer Prepending to "Fandom" Recirculation Rail
(function() {
    function execute() {
        $('<p>', { id: 'BibleWikiDisclaimer' })
            .css({
                'font-style': 'italic',
                'margin-left': '12px'
            })
            .html('Bible Wiki <a href="/wiki/Project:Disclaimer#Hosting" title="Disclaimer">does not endorse</a> this content')
            .prependTo('#recirculation-rail');
    }
    var interval = setInterval(function() {
        if($('#rail-module recirculation-unit, .premium-recirculation-rail').exists()) {
            clearInterval(interval);
            execute();
            setInterval(function() {
                if(!$('#BibleWikiDisclaimer').exists()) {
                    execute();
                }
            }, 1000);
        }
    }, 100);
})();

//Non-Endorsement header for Wikia Footer (including bottom ad, fan feed and global footer)
(function() {
    function execute() {
        $('<p>', { id: 'BibleWikiDisclaimer' })
            .css({
                'font-style': 'italic',
                'margin-left': '28px'
            })
            .html('Bible Wiki <a href="/wiki/Project:Disclaimer#Hosting" title="Disclaimer">does not endorse</a> external content <br />')
            .prependTo('#WikiaFooter');
    }
    var interval = setInterval(function() {
        if($('#WikiaFooter').exists()) {
            clearInterval(interval);
            execute();
            setInterval(function() {
                if(!$('#BibleWikiDisclaimer').exists()) {
                    execute();
                }
            }, 1000);
        }
    }, 100);
})();