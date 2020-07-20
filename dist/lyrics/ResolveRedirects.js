/**
 * LW editor tools - Resolve Redirects
 *
 * Depends on: [[MediaWiki:EditorTools-common.js]]
 * Used files: [[File:Lw Button RedirectTidy.png]]
 * <nowiki>
 */

/*jslint browser */
/*global window, jQuery, mediaWiki, lw */

(function ($, mw) {
    "use strict";

    var categoryNs = mw.config.get("wgFormattedNamespaces")[14] + ":";
    var editSummary = window.codeLoad
        ? window.codeLoad.getScriptPrefs("ResolveRedirects").editsummary
        : "resolve redirects";

    function resolveRedirects(event) {
        var $button = $(event.target);
        var pageText = lw.editbox.value;

        var newPageText = pageText;
        var linkedPages = {};

        lw.setButtonIcon($button, "busy");

        function process() {
            // add prefix to Template:Lw occurrences, to prevent them being changed
            newPageText = newPageText.replace(
                /(\{\{[Ll]w\|)/g,
                "$1-rr-"
            );

            Object.keys(linkedPages).forEach(function (pageId) {
                if (linkedPages[pageId].redirect === "") {
                    var oldPageName = $.escapeRE(linkedPages[pageId].title).replace(/ /g, "[ _]+");
                    var newPageName = linkedPages[pageId].redirectto.replace(/_/g, " ");

                    // handle links/redirects involving categories by prefixing with a colon
                    if (oldPageName.indexOf(categoryNs) === 0) {
                        oldPageName = ":" + oldPageName;
                    }
                    if (newPageName.indexOf(categoryNs) === 0) {
                        newPageName = ":" + newPageName;
                    }

                    // links where current display text matches new link target, making display text redundant
                    newPageText = newPageText.replace(
                        new RegExp("\\[\\[\\s*" + oldPageName + "\\s*\\|\\s*" + $.escapeRE(newPageName) + "\\s*\\]\\]", "g"),
                        "[[" + newPageName + "]]"
                    );

                    // other links
                    newPageText = newPageText.replace(
                        new RegExp("\\[\\[\\s*" + oldPageName + "\\s*(?=(?:#.*?)?\\]\\]|\\|)", "g"),
                        "[[" + newPageName
                    );

                    // template parameter values
                    newPageText = newPageText.replace(
                        new RegExp("([\\|=]\\s*)" + oldPageName + "(?=\\s*[\\}\\|])", "g"),
                        "$1" + newPageName
                    );
                }
            });

            // remove prefix from Template:Lw occurrences
            newPageText = newPageText.replace(
                /(\{\{[Ll]w\|)-rr-/g,
                "$1"
            );

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
                    generator: "links",
                    prop: "info",
                    inprop: "redirect",
                    gpllimit: 500,
                    titles: mw.config.get("wgPageName"),
                    cb: Date.now()
                }
            });

            function collect(more) {
                api.get(more || {}).done(function (response) {
                    if (response.query) {
                        $.extend(linkedPages, response.query.pages);
                    }
                    if (response["query-continue"]) {
                        collect(response["query-continue"].links);
                    } else {
                        process();
                    }
                });
            }
            collect();
        });
    }

    mw.hook("lw.loadEditorTools").add(function () {
        lw.addEditorButton("Resolve redirects", resolveRedirects, "/lyricwiki/images/2/23/Lw_Button_RedirectTidy.png");
    });

}(jQuery, mediaWiki));