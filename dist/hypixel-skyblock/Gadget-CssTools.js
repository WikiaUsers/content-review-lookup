/*
 * (Y01) Less
 * (Y02) Less Source Updater
 */
// Loads LESS and staff colors updater for administrators
mw.loader.using(['mediawiki.api', 'mediawiki.Uri', 'ext.fandom.ContentReview.legacyLoaders.js'], function () {
    var api = new mw.Api();
    var conf = mw.config.get([
        "wgUserGroups",
        "wgPageName",
        "wgFormattedNamespaces",
        "wgAction",
        "wgContentLanguage",
    ]);
    if (!/bureaucrat|sysop|codeeditor|util|staff|helper|global-discussions-moderator|wiki-manager|content-team-member|soap/.test(conf.wgUserGroups.join("\n")))
        return;

    //###########################################
    /* ===Less=== (Y01) */
    function getJsonOrEmpty(url, dontLoadForEnglishWiki) {
        return $.Deferred(function (def) {
            if (dontLoadForEnglishWiki && conf.wgContentLanguage === "en")
                def.resolve([]);
            $.getJSON(url + "?action=raw&ctype=text/json")
                .done(function (dt) {
                    def.resolve(dt);
                })
                .fail(function () {
                    def.resolve([]);
                });
        });
    }
    $.when(
        // get list of pages from the English Wiki
        getJsonOrEmpty("https://hypixel-skyblock.fandom.com/wiki/MediaWiki:Custom-Less.json", false),
        // also enable for pages from local wiki [[MediaWiki:Custom-Less.json]]
        getJsonOrEmpty(mw.util.getUrl("MediaWiki:Custom-Less.json"), true)
    ).then(function (lessJson, lessJsonLocal) {
        var lessPages = lessJson.concat(lessJsonLocal);
        var mwns = conf.wgFormattedNamespaces[8] + ":"; // localized mw namespace
        lessPages = ["Common.css", "Custom-common.less"].concat(lessPages).map(function (s) {
            return mwns + s;
        });
        window.lessOpts = window.lessOpts || [];
        window.lessOpts.push({
            // this is the page that has the compiled CSS
            target: mwns + "Common.css",
            // this is the page that lists the LESS files to compile
            source: mwns + "Custom-common.less",
            // these are the pages that you want to be able to update the target page from
            // note, you should not have more than one update button per page
            load: lessPages,
            // target page header
            header: mwns + "Custom-css-header/common",
        });
        window.lessConfig = window.lessConfig || [];
        window.lessConfig = {
            // reloads the page after the target page has successfully been updated
            reload: true,
            // wraps the parsed CSS in pre tags to prevent any unwanted links to templates, pages or files
            wrap: true,
            // allowed groups
            allowed: ["codeeditor"],
        };
        importArticles({
            type: "script",
            articles: [
                "u:dev:MediaWiki:Less/code.2.js",
            ]
        });
    }).catch(console.warn);

    //###########################################
    /* ===Less Source Updater=== (Y02) */
    function updateLessSource() {
        return $.get("https://hypixel-skyblock.fandom.com/api.php", {
            action: "query",
            format: "json",
            prop: "revisions",
            titles: "MediaWiki:Custom-common.less",
            formatversion: 2,
            rvprop: "content",
            rvslots: "*",
        }).then(function (d) {
            if (d.query)
                if (d.query.pages[0].missing !== true)
                    // also replaces @lang with the local variable code
                    return d.query.pages[0].revisions[0].slots.main.content
                        .replace(/@lang: ".*?"/g, "@lang: \"/" + conf.wgContentLanguage + "\"");
                else {
                    new BannerNotification($("<div>", {
                        html: "<div>Update failed. Failed to fetch source.</div>",
                    }).prop("outerHTML"), "warn", null, 5000).show();
                    return false;
                }
            else {
                new BannerNotification($("<div>", {
                    html: "<div>Update failed. See console for error.</div>",
                }).prop("outerHTML"), "warn", null, 5000).show();
                console.warn(d);
            }
        }).then(function (content) {
            if (content) {
                api.postWithEditToken({
                        action: "edit",
                        format: "json",
                        watchlist: "nochange",
                        title: "MediaWiki:Custom-common.less",
                        text: content,
                        summary: "Updated Less Source (source: [[:en:MediaWiki:Custom-common.less]])",
                    }).done(function () {
                        new BannerNotification($("<div>", {
                            html: "<div>Update successful!</div>",
                        }).prop("outerHTML"), "confirm", null, 5000).show();
                    })
                    .fail(function (err) {
                        new BannerNotification($("<div>", {
                            html: "<div>Update failed. See console for error.</div>",
                        }).prop("outerHTML"), "warn", null, 5000).show();
                        console.warn(err);
                    });
            }
        });
    }
    var allowedPages = [conf.wgFormattedNamespaces[8] + ":" + "Custom-common.less", conf.wgFormattedNamespaces[8] + ":" + "Common.css"];
    if (allowedPages.includes(conf.wgPageName) &&
        conf.wgAction === "view" &&
        conf.wgContentLanguage !== "en") {
        $("#mw-content-text").prepend($("<a>", {
            class: "wds-button",
            html: $("<div>", {
                click: function () {
                    var $this = $(this);
                    if (confirm("Update Less Source from English Wiki?")) {
                        $this.text("Updating...");
                        $this.attr({
                            disabled: true
                        });
                        updateLessSource().then(function () {
                            $this.text("Update Less Source");
                            $this.removeAttr("disabled");
                        });
                    }
                },
                text: "Update Less Source",
                title: "Update Less Source from English Wiki",
            }),
            title: "Update Less Source from English Wiki",
            css: {
                cursor: "pointer",
                margin: "0 0 5px 5px",
            }
        }));
    }
});