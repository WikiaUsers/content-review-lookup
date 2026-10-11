

//locks old comments
window.lockOldComments = window.lockOldComments || {};
window.lockOldComments.limit = 240;

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:Selector.js'
    ]
});

if (mw.config.get("wgPageName") === "FFG_Social") {
    var api = new mw.Api();

    api.get({
        action: "query",
        generator: "random",
        grnnamespace: 0,
        grnlimit: 1,
        prop: "extracts",
        exintro: 1,
        explaintext: 1,
        exchars: 1000,
        format: "json"
    }).done(function (data) {
        var pages = data.query && data.query.pages;

        if (!pages) {
            document.getElementById("ffg-social-page").innerHTML =
                "<div class='ffg-social-loading'>No page was returned.</div>";
            return;
        }

        var id = Object.keys(pages)[0];
        var page = pages[id];

        document.getElementById("ffg-social-page").innerHTML =
            "<div class='ffg-social-page-header'>" +
                "<div class='ffg-social-page-title'>" +
                    mw.html.escape(page.title) +
                "</div>" +
                "<div class='ffg-social-page-meta'>" +
                    "Random FFG page" +
                "</div>" +
            "</div>" +
            "<div class='ffg-social-page-body'>" +
                mw.html.escape(page.extract || "No introduction available.") +
            "</div>" +
            "<div class='ffg-social-actions'>" +
                "<a href='" + mw.util.getUrl(page.title) + "'>Open page</a>" +
                "<button class='ffg-social-next' id='ffg-next'>Next →</button>" +
            "</div>";

        document.getElementById("ffg-next").onclick = function () {
            location.reload();
        };
    }).fail(function (code, data) {
        console.error("FFG Social API error:", code, data);

        document.getElementById("ffg-social-page").innerHTML =
            "<div class='ffg-social-loading'>" +
                "<div>FFG Social API error.</div>" +
                "<div style='font-size:12px;opacity:.7'>" +
                    mw.html.escape(code || "Unknown error") +
                "</div>" +
            "</div>";
    });
}
    mw.loader.using([]).then(function () {
        nextPage();
    });

})();