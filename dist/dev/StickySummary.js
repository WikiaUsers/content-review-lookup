/* [[StickySummary]] - auto-fill summary/reason textbox when making repetitive changes */

/*jslint browser, long */
/*global jQuery, mediaWiki */

(function ($, mw) {
    "use strict";

    var context = (function () {
        var actions = {
            "delete": "delete",
            edit: "edit",
            protect: "protect",
            submit: "edit"
        };
        var specialPages = {
            Movepage: "move",
            Undelete: "undelete"
        };

        return specialPages[mw.config.get("wgCanonicalSpecialPageName")] ||
                actions[mw.config.get("wgAction")] ||
                null;
    }());

    // run only on suitable pages + double-run protection
    if (!context || window.loadedStickySummary) {
        return;
    }
    window.loadedStickySummary = true;


    // icons from Font Awesome Free 5.4.1 by @fontawesome - https://fontawesome.com
    // licensed under CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/)
    var icons = {
        lock: "<svg id='stickysummary-lock' width='14' height='16' viewBox='0 0 448 512' xmlns='http://www.w3.org/2000/svg'><path d='M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z' fill='currentcolor'/></svg>",
        unlock: "<svg id='stickysummary-unlock' width='14' height='16' viewBox='0 0 448 512' xmlns='http://www.w3.org/2000/svg'><path d='M400 256H152V152.9c0-39.6 31.7-72.5 71.3-72.9 40-.4 72.7 32.1 72.7 72v16c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24v-16C376 68 307.5-.3 223.5 0 139.5.3 72 69.5 72 153.5V256H48c-26.5 0-48 21.5-48 48v160c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z' fill='currentcolor'/></svg>"
    };
    var targets = {
        "delete": "#wpReason",
        edit: "#wpSummary",
        move: "#wpReason",
        protect: "#mwProtect-reason",
        undelete: "#wpComment"
    };

    var $button;
    var $target;
    var defaultValue = "";
    var storageId = "StickySummary-" + context;

    function updateState(event) {
        // ignore non-stickysummary events
        if (event.key !== storageId) {
            return;
        }

        var currentValue = $target.val();

        // note: event.newValue should be null for removed item, but IE uses empty string instead
        if (event.newValue) {
            $button.addClass("stickysummary-enabled");

            // update existing summary if it hasn't been changed
            if (currentValue === defaultValue) {
                $target.val(event.newValue);
            }
        } else {
            $button.removeClass("stickysummary-enabled");

            // clear existing summary (except on current window) if it matches old storage value
            if (!event.ownWindow && currentValue === event.oldValue) {
                $target.val(defaultValue);
            }
        }
    }

    function saveSummary(event) {
        event.preventDefault();

        var storageValue = localStorage.getItem(storageId);
        var newValue = $target.val();

        // if no summary is saved and new summary isn't empty, then save the current summary, else clear the saved summary
        if (!storageValue && newValue) {
            localStorage.setItem(storageId, newValue);
        } else {
            localStorage.removeItem(storageId);
            newValue = null;
        }

        // fire faux event, as storage events don't fire for the window in which a change is made
        updateState({
            ownWindow: true,
            key: storageId,
            oldValue: storageValue,
            newValue: newValue
        });
    }

    function initSummary() {
        // remember default value except if submitting edit (don't want to clear summary in that case)
        if (mw.config.get("wgAction") !== "submit") {
            defaultValue = $target[0].getAttribute("value") || "";
        }

        updateState({
            key: storageId,
            newValue: localStorage.getItem(storageId)
        });
    }

    function main() {
        mw.util.addCSS(
            "#stickysummary-lock, #stickysummary-unlock {" +
                "margin: 0 3px;" +
                "vertical-align: text-bottom;" +
            "}" +
            ".stickysummary:not(.stickysummary-enabled) > #stickysummary-lock," +
            ".stickysummary.stickysummary-enabled > #stickysummary-unlock {" +
                "display: none;" +
            "}" +
            // oasis-specific styles
            ".EditPage .module_page_controls label[for='wpSummary'] {" +
                "display: inline;" +
                "float: none;" +
            "}" +
            ".EditPage.mode-source.editpage-sourcewidemode-on .stickysummary {" +
                "float:" + (document.dir === "rtl" ? "right" : "left") + ";" +
                "margin-top: 14px;" +
            "}"
        );

        $target = $(targets[context]);

        $button = $("<a>").attr({
            "class": "stickysummary",
            href: "#",
            title: "StickySummary"
        }).append(
            icons.unlock,
            icons.lock
        ).click(saveSummary);

        // stop if target element doesn't exist
        if (!$target.length) {
            return;
        }

        if (context === "edit") {
            $("label[for='wpSummary']").after($button);
        } else {
            $target.after($button);
        }

        initSummary();
        window.addEventListener("storage", updateState);
    }

    $(main);
}(jQuery, mediaWiki));