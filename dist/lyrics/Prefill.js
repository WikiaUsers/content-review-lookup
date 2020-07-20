//<nowiki>
/*jslint browser, white */
/*global $, mw */

$(function () {
    "use strict";

    var editbox = document.getElementById("wpTextbox1");
    var pageName = mw.config.get("wgPageName");

    // only run when creating a new blank page
    if (
        !editbox ||
        // TODO: is there any situation where action=edit, and the editbox value is not the default (i.e. has been edited)?
        //editbox.value !== "" ||
        mw.config.get("wgAction") !== "edit" ||
        mw.config.get("wgArticleId") !== 0
    ) {
        return;
    }

    // key = regex to be tested against page name; value = text to prefill
    var prefills = {
        "^Category:Albums_by_": "{{AlbumsByArtistCat}}",
        "^Category:Songs_by_": "{{SongsByArtistCat}}",
        "^Category:Hometown/": "{{HometownCat|wp}}",
        "^Category:Label/": "{{LabelCat\n" +
                            "|description = \n" +
                            "|logo        = \n" +
                            "|website     = \n" +
                            "|wikipedia   = \n" +
                            "|discogs     = \n" +
                            "|musicbrainz = \n" +
                            "}}",
        "/[a-z]{2}$": "{{TranslatedSong|current=" + pageName.slice(-2) + "}}\n" +
                      "{{Translation|lyrics=\n" +
                      "<lyrics>\n" +
                      "<!-- Add translation here (and delete this entire line) -->\n" +
                      "</lyrics>\n" +
                      "}}",
        "/roman$": "{{TranslatedSong|current=roman}}\n" +
                   "{{Translation|lyrics=\n" +
                   "<lyrics>\n" +
                   "<!-- Add translation here (and delete this entire line) -->\n" +
                   "</lyrics>\n" +
                   "}}"
    };

    Object.keys(prefills).some(function (pageNameRE) {
        if (new RegExp(pageNameRE).test(pageName)) {
            editbox.value = prefills[pageNameRE];
            return true;
        }
    });

});