/**
 * LW editor tools - common functions
 *
 * Used files: [[File:LW btn busy.gif]]
 * <nowiki>
 */

/*jslint browser, long */
/*global jQuery, mediaWiki, lw */

(function ($, mw) {
    "use strict";

    // make global
    window.lw = window.lw || {};

    lw.firedEvents = lw.firedEvents || {};

    function getter(getFunction) {
        return {
            get: getFunction,
            configurable: true,
            enumerable: true
        };
    }

    // lazy properties
    Object.defineProperties(lw, {
        editbox: getter(function () {
            delete lw.editbox;
            lw.editbox = document.getElementById("wpTextbox1");
            return lw.editbox;
        }),

        editSummary: getter(function () {
            delete lw.editSummary;
            lw.editSummary = document.getElementById("wpSummary");
            return lw.editSummary;
        }),

        // possible values:
        // * Artist, Album, Film, Song (and "Info" talk page versions)
        // * TranslatedSong
        // * List
        // * Unknown
        editPageType: getter(function () {
            var m = lw.editbox.value.match(/\{\{(Artist|Album|Film|Song)Header/) ||
                    lw.editbox.value.match(/\{\{((?:Artist|Album|Film|Song) Info)/) ||
                    lw.editbox.value.match(/\{\{(TranslatedSong)/) ||
                    lw.editbox.value.match(/\[\[Category:(List)/) ||
                    [null, "Unknown"];

            delete lw.editPageType;
            lw.editPageType = m[1];
            return lw.editPageType;
        }),

        editSongLanguage: getter(function () {
            var m = lw.editbox.value.match(/\|\s*language\s*=([^|}]+)/) ||
                    [null, "Unknown"];

            delete lw.editSongLanguage;
            lw.editSongLanguage = m[1].trim();
            return lw.editSongLanguage;
        })
    });

    lw.setButtonIcon = function ($button, state, length) {
        var icon = mw.config.get("wgCdnRootUrl");
        switch (state) {
        case "busy":
            icon += "/lyricwiki/images/7/76/LW_btn_busy.gif";
            break;
        case "done":
            icon += "/central/images/a/a0/Button_keep.png";
            break;
        case "nochange":
            icon += "/central/images/4/4f/Button_neutral.png";
            break;
        case "notdone":
            icon += "/central/images/1/13/Button_delete.png";
            break;
        default:
            icon += $button.data("icon");
        }
        $button.attr("src", icon);

        // temporary button change?
        if (typeof length === "number") {
            setTimeout(lw.setButtonIcon, length, $button);
        }
    };

    lw.addEditorButton = function (tooltip, onclick, imagepath) {
        var $button = $("<img>")
            .attr("title", tooltip)
            .data("icon", imagepath)
            .on("click", onclick);

        $("#cke_toolbar_source_1, #toolbar").first().append($button);

        lw.setButtonIcon($button);
    };

    lw.addToEditSummary = function (text) {
        if (
            typeof text !== "string" ||
            mw.config.get("wgArticleId") === 0 ||  // don't add on new pages
            lw.editSummary.value.indexOf(text) !== -1  // don't add if already added
        ) {
            return;
        }

        // add separator to existing summary
        if (
            lw.editSummary.value &&
            lw.editSummary.value.slice(-3) !== "*/ " &&  // not an auto-summary
            lw.editSummary.value.slice(-2) !== "; "  // separator not already added
        ) {
            lw.editSummary.value += "; ";
        }
        lw.editSummary.value += text;
    };

    function init() {
        if (
            lw.firedEvents["lw.loadEditorTools"] !== true &&
            $.inArray(mw.config.get("wgAction"), ["edit", "submit"]) !== -1 &&
            lw.editbox !== null
        ) {
            lw.firedEvents["lw.loadEditorTools"] = true;
            mw.hook("lw.loadEditorTools").fire();
        }
    }

    $(init);
}(jQuery, mediaWiki));