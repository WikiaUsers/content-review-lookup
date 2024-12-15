/* [[StickySummary]] - auto-fill summary/reason textbox when making repetitive changes */

(function ($, mw) {
    "use strict";

    // double-run protection
    if (window.loadedStickySummary) {
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
        move: "input[name='wpReason']",
        protect: "#mwProtect-reason",
        undelete: "#wpComment"
    };
    var optionTargets = {
        edit: {
            minor: "#wpMinoredit"
        },
        move: {
            leaveredirect: "input[name='wpLeaveRedirect']"
        }
    };
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

    var $button;
    var $target;
    var defaultValue = "";
    var options = {};
    var optionKeys = Object.keys(optionTargets[context] || {});
    var storageId = "StickySummary-" + context;
    var storageIdOptions = storageId + "-options";

    function updateOptions(shouldClearOptions) {
        if (!optionKeys.length) {
            return;
        }

        var optionValues = {};

        if (!shouldClearOptions) {
            try {
                optionValues = JSON.parse(localStorage.getItem(storageIdOptions) || "{}");
            } catch (ignore) {
                console.warn("StickySummary: invalid options in storage:", storageIdOptions);
                return;
            }
        }

        optionKeys.forEach(function (opt) {
            var $opt = options[opt];

            if ($opt.prop("type") === "checkbox") {
                $opt.prop("checked", shouldClearOptions
                    ? $opt.prop("defaultChecked")
                    : optionValues[opt]
                );
            } else {
                $opt.val(shouldClearOptions
                    ? $opt[0].getAttribute("value")
                    : optionValues[opt]
                );
            }
        });
    }

    function updateState(event) {
        // ignore non-stickysummary events
        if (event.key !== storageId) {
            return;
        }

        // stop if target element doesn't exist
        if (!$target || $target.length === 0) {
            return;
        }

        var currentValue = $target.val();

        // note: event.newValue should be null for removed item, but IE uses empty string instead
        if (event.newValue) {
            $button.addClass("stickysummary-enabled");

            // update existing summary if it hasn't been changed
            if (currentValue === defaultValue) {
                updateOptions();
                $target.val(event.newValue);
            }
        } else {
            $button.removeClass("stickysummary-enabled");

            // clear existing summary (except on current window) if it matches old storage value
            if (!event.ownWindow && currentValue === event.oldValue) {
                updateOptions(true);
                $target.val(defaultValue);
            }
        }
    }

    function saveOptions() {
        if (!optionKeys.length) {
            return;
        }

        var optionValues = {};

        optionKeys.forEach(function (opt) {
            var $opt = options[opt];

            if ($opt.prop("type") === "checkbox") {
                optionValues[opt] = $opt.prop("checked");
            } else {
                optionValues[opt] = $opt.val();
            }
        });

        localStorage.setItem(storageIdOptions, JSON.stringify(optionValues));
    }

    function saveSummary() {
        var storageValue = localStorage.getItem(storageId);
        var newValue = $target.val();

        // if no summary is saved and new summary isn't empty, then save the current summary, else clear the saved summary
        if (!storageValue && newValue) {
            saveOptions();
            localStorage.setItem(storageId, newValue);
        } else {
            localStorage.removeItem(storageIdOptions);
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
        // stop if target element doesn't exist
        if (!$target || $target.length === 0) {
            return;
        }

        // remember default value except if submitting edit (don't want to clear summary in that case)
        if (mw.config.get("wgAction") !== "submit") {
            defaultValue = $target[0].getAttribute("value") || "";
        }

        updateState({
            key: storageId,
            newValue: localStorage.getItem(storageId)
        });
    }

    function initVisualEditor() {
        storageId = "StickySummary-edit";

        $target = $(".ve-ui-summaryPanel-summaryInputField > input, .ve-ui-mwSaveDialog-summary > textarea");
        var $summaryMsg = $(".ve-ui-mwSaveDialog-summaryLabel");

        if ($summaryMsg.length) {
            $summaryMsg.append($button);
        } else {
            $target.after($button);
        }

        initSummary();
    }

    function main() {
        mw.util.addCSS(
            ".stickysummary {" +
                "align-self: center;" +
            "}" +
            "#stickysummary-lock, #stickysummary-unlock {" +
                "margin: 0 3px;" +
                "vertical-align: text-bottom;" +
            "}" +
            ".stickysummary:not(.stickysummary-enabled) > #stickysummary-lock," +
            ".stickysummary.stickysummary-enabled > #stickysummary-unlock {" +
                "display: none;" +
            "}" +
            "#movepage .oo-ui-textInputWidget," +
            "#deleteconfirm .oo-ui-textInputWidget," +
            "#undelete .oo-ui-textInputWidget," +
            ".ve-ui-summaryPanel-summaryInputField {" +
                "display: flex;" +
            "}"
        );

        $button = $("<a>").attr({
            "class": "stickysummary",
            title: "StickySummary"
        }).append(
            icons.unlock,
            icons.lock
        ).click(saveSummary);

        $target = $(targets[context]);

        optionKeys.forEach(function (option) {
            options[option] = $(optionTargets[context][option]);
        });

        window.addEventListener("storage", updateState);

        // visual editor integration
        // - vanilla
        mw.hook("ve.saveDialog.stateChanged").add(initVisualEditor);
        // - fandom
        mw.hook("ve.activationComplete").add(initVisualEditor);

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
    }

    $(main);
}(jQuery, mediaWiki));