console.log("KanColle Wiki Script 020");

window.RevealAnonIP = {
    permissions : ['user']
};

mw.loader.load('https://apis.google.com/js/platform.js');

importArticles({
    type: "script",
    articles: [
        "w:c:dev:BackToTopButton/code.js",
        "w:c:dev:RevealAnonIP/code.js",
        "w:c:dev:Countdown/code.js",
        "u:dev:OggPlayer.js",
        "MediaWiki:SidebarBox_021.js",
        "MediaWiki:FleetReporting.js",
        "MediaWiki:CommentWarning.js",
        "MediaWiki:DetailToggle.js",
        "MediaWiki:TwitterTimeline.js",
        //"MediaWiki:TabviewArticleComments.js",
        "MediaWiki:EnableTalkButton.js",
    ]
}, {
    type: "style",
    articles: [
        "MediaWiki:ClosedThreads.css"
    ]
});

importArticles({
    type: "script",
    articles: [
        "MediaWiki:Utils.js",
        "MediaWiki:CommentQuote.js"
    ],
    debug: true,
});