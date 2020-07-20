// <pre>
window.setInterval(function() {
    $.getJSON(mw.util.wikiScript("api"), {
        "action": "query",
        "format": "json",
        "prop": "revisions",
        "titles": 'MediaWiki:Emoticons',
        "rvprop": "content",
        "cb": new Date().getTime().toString()
    }, function(data) {
        var a = data.query.pages;
        for (var pageid in a) {
            if (typeof a[pageid].missing !== "string") {
                var content = a[pageid].revisions[0]["*"];
                mw.config.set("wgChatEmoticons", content);
            }
        }
    });
}, window.ajaxEmoticonsInterval || 30000);
// </pre>