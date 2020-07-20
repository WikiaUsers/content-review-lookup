require(["wikia.window", "jquery", "mw"], function(window, jQuery, mw){
    "use strict";
    var ACTION = mw.config.get("wgAction"),
        ISEDITPAGE = mw.config.get("wgIsEditPage"),
        NS = mw.config.get("wgNamespaceNumber"),
        NAMESPACE = mw.config.get("wgFormattedNamespaces"),
        FNAMESPACE = NAMESPACE[NS].toLowerCase(),
        ALLOWED = ["", "talk", "user", "user blog"];
    
    if (
        (ALLOWED.indexOf(FNAMESPACE) === -1) ||
        (!ISEDITPAGE) || (["edit", "history"].indexOf(ACTION) > -1)
    ) return;
    
    var SCRIPTS = ["u:dev:MediaWiki:I18n-js/code.js", "u:dev:MediaWiki:Colors/code.js", "MediaWiki:ArticlePreview/core.js"],
        STYLES = ["MediaWiki:ArticlePreview.css"];
    
    window.importArticles(
        { type: "script", articles: SCRIPTS },
        { type: "style", articles: STYLES }
    );
});