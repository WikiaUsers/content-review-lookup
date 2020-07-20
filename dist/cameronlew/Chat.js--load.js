(function (mw) {
    var u = window.encodeURIComponent(mw.config.get("wgUserName"));
    importArticles({
        type    : "script",
        articles: [
            "MediaWiki:Chat.js", "User:" + u + "/chat.js"
        ]
    }, {
        type    : "style",
        articles: [
            "MediaWiki:Chat.css", "User:" + u + "/chat.css"
        ]
    });
    mw.log("CHAT LOADER: Loaded");
}(mediaWiki));