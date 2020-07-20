(function(window, $, mw){
    var config = $.extend({}, window.CLconfig);
    if (config.disabled) return;
    
    if (config.useOld){
        importArticle({ type: "script", article: "u:dev:MediaWiki:ChatLogger.js" });
        return;
    }
    
    if (mw.config.get("wgCanoncialSpecialPageName") === "Chat"){
        importArticle({ type: "script", article: "MediaWiki:Beta/ChatLogger/core.js" });
    } else {
        if (config.useOrig) return;
        importArticle({ type: "script", article: "MediaWiki:Beta/ChatLogger/nochat.js" });
    }
}(window, jQuery, mw));