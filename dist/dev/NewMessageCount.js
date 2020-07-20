/* [[NewMessageCount]] - show new message count in the Chat window title */

/*jslint browser */
/*global mw, mainRoom */

(function () {
    "use strict";

    // only run in chat + double-run protection
    if (
        mw.config.get("wgCanonicalSpecialPageName") !== "Chat"
        || window.loadedNewMessageCount
    ) {
        return;
    }
    window.loadedNewMessageCount = true;

    var originalTitle = document.title;
    var watchingForMessages = false;
    var newMessages = 0;

    function startWatch() {
        watchingForMessages = true;
    }

    function stopWatch() {
        watchingForMessages = false;
        newMessages = 0;
        document.title = originalTitle;
    }

    function messageReceived() {
        if (watchingForMessages) {
            newMessages += 1;
            document.title = "(" + newMessages + ") " + originalTitle;
        }
    }

    window.addEventListener("blur", startWatch, false);
    window.addEventListener("focus", stopWatch, false);

    // wait for chat mainRoom code to initialise
    var checkForChatInit = setInterval(function () {
        if (window.mainRoom && mainRoom.isInitialized === true) {
            clearInterval(checkForChatInit);
            mainRoom.socket.bind("chat:add", messageReceived);
        }
    }, 523);
}());