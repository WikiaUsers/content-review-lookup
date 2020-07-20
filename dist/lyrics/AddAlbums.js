/**
 * LW editor tools - Add Albums
 *
 * Depends on: [[MediaWiki:EditorTools-common.js]] [[MediaWiki:EditorTools-templates.js]] [[EditorTools-templates-lw.js]]
 * Used files: [[File:Lw btn disc.png]]
 * <nowiki>
 */

/*jslint browser, long */
/*global jQuery, mediaWiki, lw */

(function ($, mw) {
    "use strict";

    var albumBacklinks;
    var editSummary = window.codeLoad
        ? window.codeLoad.getScriptPrefs("AddAlbums").editsummary
        : "albums";
    var isAlbumPageName = / \(\d{4}\)$/;

    // sort albums by release year
    function albumYearSorter(itemData, a, b) {
        var yearA = Number(a.slice(-5, -1));
        var yearB = Number(b.slice(-5, -1));
        var typeA = itemData[a] && itemData[a].type;
        var typeB = itemData[b] && itemData[b].type;

        // if album type starts with four digits, assume it's the release year of a re-release with bonus tracks
        if (/^\d{4}/.test(typeA)) {
            yearA = Number(typeA.slice(0, 4));
        }
        if (/^\d{4}/.test(typeB)) {
            yearB = Number(typeB.slice(0, 4));
        }

        return yearA - yearB;
    }

    function addAlbums(defaults, params, name) {
        lw.updateParameters(defaults, params, name);

        lw.sortParameters(defaults, params, name, function (items) {
            // add album backlinks to items
            albumBacklinks.forEach(function (value) {
                if (items.indexOf(value) === -1) {
                    items.push(value);
                }
            });

            // filter out values that aren't album page names
            return items.filter(function (value) {
                return isAlbumPageName.test(value);
            });
        });
    }

    function addAlbumsHandler(event) {
        var $button = $(event.target);
        var pageText = lw.editbox.value;

        var newPageText = pageText;
        var backlinks = {};
        albumBacklinks = [];

        lw.setButtonIcon($button, "busy");

        function process() {
            var backlinkKeys = Object.keys(backlinks);

            var possibleTitles = [
                mw.config.get("wgTitle")
            ];

            // find redirects to song page, as they may be linked to on album pages
            backlinkKeys.forEach(function (pageId) {
                if (backlinks[pageId].redirect === "") {
                    possibleTitles.push(backlinks[pageId].title);
                }
            });

            // search page text for a link to any one of the possible titles
            // this excludes albums not directly linking to song (due to Cv template creating backlinks to songs from album pages)
            var pageLinksToTitle = function (text) {
                return possibleTitles.some(function (title) {
                    var containsTitle = new RegExp("\\[\\[" + $.escapeRE(title).replace(/ /g, "[ _]+") + "\\|");
                    return containsTitle.test(text);
                });
            };

            // search backlinks for album pages
            backlinkKeys.forEach(function (pageId) {
                if (backlinks[pageId].revisions === undefined) {
                    return;
                }

                var title = backlinks[pageId].title;
                var text = backlinks[pageId].revisions[0]["*"];

                if (isAlbumPageName.test(title) && pageLinksToTitle(text)) {
                    albumBacklinks.push(title);
                }
            });

            newPageText = newPageText.replace(lw.templateMatch("SongHeader"), function (text, name) {
                return lw.tidyTemplate(text, name, addAlbums);
            });

            if (pageText !== newPageText) {
                lw.addToEditSummary(editSummary);
                lw.editbox.value = newPageText;
                lw.setButtonIcon($button, "done", 3000);
            } else {
                lw.setButtonIcon($button, "nochange", 3000);
            }
        }

        mw.loader.using("mediawiki.api", function () {
            var api = new mw.Api({
                parameters: {
                    generator: "backlinks",
                    prop: "revisions|info",
                    rvprop: "content",
                    gbllimit: 50,
                    gblnamespace: 0,
                    gblredirect: 1,
                    gbltitle: mw.config.get("wgPageName"),
                    cb: Date.now()
                }
            });

            function collect(more) {
                api.get(more || {}).done(function (response) {
                    if (response.query) {
                        $.extend(backlinks, response.query.pages);
                    }
                    if (response["query-continue"]) {
                        collect(response["query-continue"].backlinks);
                    } else {
                        process();
                    }
                });
            }
            collect();
        });
    }

    mw.hook("lw.loadEditorTools").add(function () {
        if (lw.editPageType === "Song") {
            lw.addEditorButton("Add known albums", addAlbumsHandler, "/lyricwiki/images/d/d1/Lw_btn_disc.png");

            lw.sortableParameters["SongHeader"] = {
                prefix: "album",
                dataPrefixes: ["type"],
                sorter: albumYearSorter
            };
        }
    });
}(jQuery, mediaWiki));