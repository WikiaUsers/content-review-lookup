require(["wikia.window", "jquery", "mw"], function (window, $, mw) {
    window.CustomLinks = typeof window.CustomLinks !== "undefined" ? window.CustomLinks : {};
    if (window.CustomLinks.preventDefault === true) {
        // default disabled - remove preventDefault property and don"t add default values
        delete window.CustomLinks.preventDefault;
    } else {
        // adding default values - not disabled
        $.extend(window.CustomLinks, {
            mw: "https://www.mediawiki.org/wiki/",
            mediawikiwiki: "https://www.mediawiki.org/wiki/",
            commons: "https://commons.wikimedia.org/wiki/",
            wikimedia: "https://wikimediafoundation.org/wiki/",
            wikipedia: "https://en.wikipedia.org/wiki/"
        });
    }
    // Interwiki parser
    function parseInterwiki(m) {
        if (m.attributes.isInlineAlert) {
            return;
        }
        mainRoom.viewDiscussion.el.find("#entry-" + m.cid + " a").each(function() {
            if (!$(this).attr("href")) return;
            var actualLink = $(this).attr("href").slice((wgServer + wgScriptPath + "/wiki/").length);
            if (!CustomLinks.hasOwnProperty(actualLink.split(":")[0])) return;
            var newLink = actualLink.replace(new RegExp("^(" + Object.keys(CustomLinks).join("|") + "):", "i"), function(m) {
                var nonColon = m.slice(0, -1).toLowerCase();
                return CustomLinks[nonColon];
            });
            $(this).attr("href", newLink);
        });
    }
    function privateInterwiki(p) {
        if (!p) { return; }
        mainRoom.chats.privates[p.attributes.roomId]
            .model.chats.bind('afteradd', parseInterwiki);
    }
    function chatInterwiki(mainRoom) {
        mainRoom.model.chats.models.forEach(parseInterwiki);
        mainRoom.model.chats.bind("afteradd", parseInterwiki);
        mainRoom.model.privateUsers.bind('add', privateRoomInterwiki);
    }
    // Mainroom bootloader
    mw.hook("dev.chat.render").add(chatInterwiki);
    importArticle({ type: "script", article: "u:dev:Chat-js.js" });
});