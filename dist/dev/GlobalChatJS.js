/* [[GlobalChatJS]] - use Community Central chat.js page globally, like global.js page */

/*jslint browser, long */
/*global console, mediaWiki, ChatWidget */

(function (mw) {
    "use strict";

    // run only if Chat ResourceLoader module is defined + double-run protection
    if (
        mw.loader.getState("ext.Chat2") === null
        || window.loadedGlobalChatJS
    ) {
        return;
    }
    window.loadedGlobalChatJS = true;

    // default hook to import user's chat.js page from Community Central
    function chatHookDefault(chatWindow) {
        chatWindow.importArticle({
            type: "script",
            article: "u:community:User:" + chatWindow.mw.config.get("wgUserName") + "/chat.js"
        });
    }

    // original handler: https://github.com/Wikia/app/blob/dev/extensions/wikia/Chat2/js/ChatWidget.js#L209-L221
    function chatLinkHandler(linkToSpecialChat) {
        var chatUrl = linkToSpecialChat && new mw.Uri(linkToSpecialChat);

        if (!chatUrl || chatUrl.host !== location.hostname) {
            // that shouldn't happen…
            return;
        }

        // open chat window
        var chatWindow = window.open(chatUrl.toString(), "wikiachat", mw.config.get("wgWikiaChatWindowFeatures"));

        // allow the default hook to be overridden by a "GlobalChatJS_chatHook" function defined in the global scope
        var chatHook = typeof window.GlobalChatJS_chatHook === "function"
            ? window.GlobalChatJS_chatHook
            : chatHookDefault;

        // don't use default hook for chat on Community Central wiki, else JS will be loaded twice
        if (mw.config.get("wgCityId") === "177" && chatHook === chatHookDefault) {
            return;
        }

        // add hook to chat window
        if (chatWindow.addEventListener) {
            chatWindow.addEventListener("DOMContentLoaded", chatHook.bind(null, chatWindow), false);
        } else {
            // addEventListener isn't immediately available in some browsers (IE)
            setTimeout(chatHook, 3600, chatWindow);
        }
    }

    // replace existing chat link handler
    function replaceChatLinkHandler() {
        if (window.ChatWidget && ChatWidget.onClickChatButton) {
            ChatWidget.onClickChatButton = chatLinkHandler;
        } else {
            console.warn("GlobalChatJS: Replacing link handler failed, stopping…");
        }
    }

    // log the service worker failure and use click handler
    function serviceWorkerFailure(error) {
        if (error) {
            console.warn("GlobalChatJS: Service worker registration failed:", error);
        }

        console.warn("GlobalChatJS: Service workers not supported, replacing link handler instead…");
        replaceChatLinkHandler();
    }

    // register [[MediaWiki:GlobalChatJS/service-worker.js]] as service worker
    function registerServiceWorker() {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register(
                mw.config.get("wgLoadScript") + "?mode=articles&only=scripts&articles=u:dev:MediaWiki:GlobalChatJS/service-worker.js"
            )["catch"](serviceWorkerFailure);
        } else {
            serviceWorkerFailure();
        }
    }

    registerServiceWorker();
}(mediaWiki));