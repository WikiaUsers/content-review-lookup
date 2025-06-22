/* jshint
    esversion: 5, esnext: false, forin: true, immed: true, indent: 4,
    latedef: true, newcap: true, noarg: true, undef: true, unused: true,
    browser: true, jquery: true, onevar: true, eqeqeq: true, multistr: true,
    maxerr: 999999, forin: false, -W082, -W084
*/
/* global mw, ace, importArticles, console, confirm, alert, prompt */

$.when(
    $.Deferred(function (def) {
        mw.hook('dev.qdmodal').add(function(QDmodal) {
            def.resolve(QDmodal);
        });
    }),
    $.Deferred(function (def) {
        $(function () { // DOM ready
            def.resolve();
        });
    }),
    mw.loader.using(["mediawiki.util", "mediawiki.api", "ext.codeEditor.ace"])
).then(function (QDmodal) {
    "use strict";
    // Pages
    var allowedPages = [
        "Inventory_slot/Tooltips",
        "Inventory_slot/Test",
    ].map(function (p) {
        return mw.config.get("wgFormattedNamespaces")[828] + ":" + p;
    });
    if (!allowedPages.includes(mw.config.get("wgPageName")) || (window.TooltipsEditor && window.TooltipsEditor.loaded))
        return;

    var api = new mw.Api();

    console.log("Loading TooltipsEditor...");

    var TooltipsEditor, that;
    TooltipsEditor = that = window.TooltipsEditor = {

        // variables; undefined variables are just for easier variable tracking
        modal: new QDmodal("TooltipsEditor"),
        loaded: true,
        deloadAll: function () {
            that.actions = that.closing = that.isInMain = that.data = that.json = that.oldjson = that.oldjsonkeys = that.editor = that.lastFocusedEditor = that.lastFocusedElement = undefined;
        },

        otherInputBoxes: {
            // <param internal name>: {display: <param display name>, optional?: true/false }
            "name": {
                display: "Name",
                replace: true
            },
            "image": {
                display: "Image",
                replace: true,
                optional: true
            },
            "link": {
                display: "Link",
                replace: true,
                optional: true
            },
        },
        forEachInputBox: function (callback) {
            var i = 0;
            for (var intername in that.otherInputBoxes) {
                if (true) { // stops the editor from complaining
                    i++;
                    callback(intername, i, that.otherInputBoxes);
                }
            }
        },
        colorConversions: {
            0: "black",
            1: "dark_blue",
            2: "dark_green",
            3: "dark_aqua",
            4: "dark_red",
            5: "dark_purple",
            6: "gold",
            7: "gray",
            8: "dark_gray",
            9: "blue",
            a: "green",
            b: "aqua",
            c: "red",
            d: "light_purple",
            e: "yellow",
            f: "white",
            l: "bold",
            n: "underline",
            m: "strikethrough",
            o: "italic",
            r: "reset",
        },
        rarityConversions: {
            "Common": "f",
            "Uncommon": "a",
            "Rare": "9",
            "Epic": "5",
            "Legendary": "6",
            "Mythic": "d",
            "Divine": "b",
            "(Supreme)": "4",
            "Special": "c",
            "Very Special": "c",
        },
        shortForm: {
            "Common": "C",
            "Uncommon": "U",
            "Rare": "R",
            "Epic": "E",
            "Legendary": "L",
            "Mythic": "M",
            "Divine": "D",
            "(Supreme)": "(SE)",
            "Special": "SL",
            "Very Special": "VSL",
        },
        specialchars: ("❤ ❈ ❁ ✦ ☣ ☠ ✎ ∞ ✯ ♣ ❂ ⚔ ⫽ α ✹ ⸕ ☘ 🗲 ❣ ⚚ ⸎ ʬ ϕ ∮")
            .replaceAll(" ", " &nbsp; ")
            .split(" ")
            .map(function (v) {
                if (!v.match("&nbsp;")) {
                    return $("<a>", {
                        "class": "TooltipsEditor-insertChar",
                        text: v,
                        title: "Insert \"" + v + "\"",
                    });
                } else {
                    return v;
                }
            }),

        // helper JSON/param functions
        optionalParam: function (v) {
            if (typeof v !== "string")
                return "";
            else
                return v.trim();
        },
        inOldjson: function (k) {
            return that.oldjsonkeys.indexOf(k) !== -1;
        },
        throwOldjson: function (k) {
            if (that.inOldjson(k) && !(k in that.oldjson)) {
                that.oldjson[k] = {};
                Object.assign(that.oldjson[k], that.json[k]);
            }
        },
        getEditParamPackage: function (text, cls, obj, k) {
            function getOtherParamAttr(obj, k) {
                var ret = {};
                that.forEachInputBox(function (inter) {
                    ret["data-tooltip-" + inter] =
                        obj[k] && obj[k][inter] && obj[k][inter].replaceAll("&amp;", "&");
                });
                return ret;
            }
            return Object.assign({
                "text": text,
                "class": cls,
                "data-tooltip-title": obj[k] && obj[k].title && obj[k].title.replaceAll("&amp;", "&"),
                "data-tooltip-text": obj[k] && obj[k].text && obj[k].text.replaceAll("&amp;", "&"),
                "data-tooltip-key": k.replaceAll("&amp;", "&")
            }, getOtherParamAttr(obj, k));
        },
        getMinetipParamPackage: function (text, cls, obj, k) {
            return {
                "class": cls,
                text: text,
                "data-minetip-text": obj[k] && obj[k].text && obj[k].text.replaceAll("&amp;", "&"),
                "data-minetip-title": obj[k] && obj[k].title && obj[k].title.replaceAll("&amp;", "&"),
            };
        },

        // helper parsers
        parsewithUIText: function () {
            return api.post({
                action: "parse",
                contentmodel: "wikitext",
                text: "{{UIText|" + ace.tooltipsTextEditor.getValue() + "|}}",
            });
        },
        getParsedText: function (data) {
            return $(data.parse.text["*"]).find("p").html().trim().replaceAll(/&amp;/g, "&").replaceAll(/&nbsp;/g, " ");
        },
        // helper parsers: helper conversion functions from different layers
        processResult: function (d) {
            // [1.entry] lua data => json/preview format
            // inverse of applyReplacements
            // note: double-backslash and escaped quotes are treated as one character
            // in both lua and json. No replacement needed
            return JSON.parse(d);
        },
        applyReplacements: function (s) {
            // [1.exit] json/preview format => lua data
            // inverse of processResult
            // note: double-backslash and escaped quotes are treated as one character
            // in json, they should be escaped again for lua to understand
            return s.replaceAll(/\\/g, '\\\\').replaceAll(/(['"])/g, "\\$1");
        },
        convertSlashes: function (s) {
            // [2.entry] json/preview format => editor view
            // inverse of replaceLines
            // with reference to MediaWiki:Common.js/minetip.js
            s = s.replaceAll(/\\\\/g, "&#92;").replaceAll(/\\\//g, "&#47;");
            return s.replaceAll(/\//g, "\n").replaceAll("&#92;", "\\").replaceAll("&#47;", "/");
        },
        replaceLines: function (s) {
            // [2.exit] editor view => json/preview format
            // inverse of convertSlashes
            s = s.replaceAll(/\\/g, "&#92;").replaceAll(/\//g, "&#47;");
            return s.replaceAll("&#92;", "\\\\").replaceAll("&#47;", "\\/").replaceAll(/\n/g, "/");
        },

        // helper DOM/editor functions
        reset: function (confirm) {
            if (confirm) {
                $("#TooltipsEditor-search").show();
                $("#TooltipsEditor-searchResults").empty();
                $("#searchResultsMessage, #TooltipsEditor-editor").hide();
                $("#TooltipsEditor > section").removeClass("mw-ajax-loader");
                ace.tooltipsTextEditor.setValue("");
                ace.tooltipsTitleEditor.setValue("");
                $("#TooltipsEditor-key, #TooltipsEditor-name").val("");
                $(".qdmodal-button").show();
                if ($("#TooltipsEditor-searchInput").val().trim() !== "") that.generateSearch();
                $("#TooltipsEditor header h3").text("Tooltips Editor");
            }
        },
        processColors: function () {
            return Object.keys(that.colorConversions).map(function (v, i, a) {
                return $("<a>", {
                    "class": "TooltipsEditor-insertFormat" + ((i === a.length - 1) && " TooltipsEditor-last" || ""),
                    text: that.colorConversions[v].replaceAll("_", " ").replaceAll(/(\w)(\w*)/g, function (_, $1, $2) {
                        return $1.toUpperCase() + $2;
                    }),
                    "data-insert": "&" + v,
                });
            });
        },
        processRarityTexts: function () {
            return Object.keys(that.rarityConversions).map(function (v, i, a) {
                return $("<span>", {
                    html: [
                        $("<a>", {
                            "class": "TooltipsEditor-insertFormat",
                            text: v,
                            "data-insert": "&" + that.rarityConversions[v] + "&l" + v.toUpperCase().replaceAll(/[()]/g, ""),
                            style: "font-style: italic;",
                        }),
                        $("<a>", {
                            "class": "TooltipsEditor-insertFormat" + ((i === a.length - 1) && " TooltipsEditor-last" || ""),
                            text: that.shortForm[v],
                            "data-insert": "&" + that.rarityConversions[v],
                            style: "font-style: italic;",
                        }),
                    ]
                });
            });
        },
        updatePreview: function () {
            // no parser solution (quick)
            $("#TooltipsEditor-preview").attr({
                "data-minetip-text": that.replaceLines(ace.tooltipsTextEditor.getValue()),
                "data-minetip-title": ace.tooltipsTitleEditor.getValue(),
            });
            // experimental solution (slow)
            /*
            that.parsewithUIText().then(function(data) {
                $("#TooltipsEditor-preview").attr({
                    "data-minetip-text": that.getParsedText(data),
                    "data-minetip-title": ace.tooltipsTitleEditor.getValue(),
                });
            });
            */
        },
        insertText: function (text) {
            var editor = that.lastFocusedEditor;
            if (!editor && that.lastFocusedElement) {
                return that.lastFocusedElement.textSelection("encapsulateSelection", {
                    pre: text,
                    peri: "",
                }), true;
            }

            editor.insert(text, 1);

            return true;
        },

        // Lua Helpers
        luaTableToJson: function (s) {
            return api.postWithToken('csrf', api.assertCurrentUser({
                action: "scribunto-console",
                title: mw.config.get("wgPageName"),
                question: "=mw.text.jsonEncode(p)",
                content: s,
            }));
        },
        refreshLuaCache: function () {
            var api = new mw.Api();
            api.get({
                action: 'parse',
                text: '{{#invoke:Cache|refreshSlotAliasesCache}}'
            }).then(function (data) {
                console.log('Cache Refreshed!', data);
            })
            // Fandom doesn't like catch as a method name
            ["catch"](function (err) {
                mw.notify("Error refreshing lua cache", {
                    title: "Uncaught Error",
                    type: "error"
                });
                console.error(err);
            });
        },

        // main function updateActions
        updateActions: function (keys) {
            function allInputEquals(a, b) {
                var alltrue = true;
                that.forEachInputBox(function (inter, i, otherinputboxes) {
                    var val = otherinputboxes[inter];
                    if (val.optional ?
                        (that.optionalParam(a[inter]) !== that.optionalParam(b[inter])) :
                        (a[inter] !== b[inter])) {
                        alltrue = false;
                    }
                });
                return alltrue;
            }

            function updateOne(k) {
                if (k) {
                    // if no old version, two cases:
                    if (!that.inOldjson(k) && (k in that.json)) // first case: has a new version => entry added
                        that.actions[k] = "add";
                    else if (!that.inOldjson(k) && !(k in that.json)) { // second case: does not have a new version => entry does not exist
                        if (k in that.actions) delete that.actions[k];
                    }
                    // at this point, it is guaranteed that an old version exists:
                    else if (!(k in that.json)) // no new version =?> entry removed
                        that.actions[k] = "remove";
                    else if (!that.oldjson[k] || // value of old version is not recorded => new version must be equal to old version
                        (that.oldjson[k].title === that.json[k].title &&
                            that.oldjson[k].text === that.json[k].text &&
                            allInputEquals(that.oldjson[k], that.json[k])
                        ) // compare each entries of the old version to new version; proceed if all equal
                    ) {
                        if (k in that.actions) delete that.actions[k];
                        if (k in that.oldjson) delete that.oldjson[k];
                    } else { // new version must be different from old version
                        that.actions[k] = "modify";
                    }
                }
            }
            var revertAction = function () {
                var key = $(this).attr("data-value");
                if (key in that.oldjson) {
                    that.json[key] = {};
                    Object.assign(that.json[key], that.oldjson[key]);
                    delete that.oldjson[key];
                } else if (key in that.json)
                    delete that.json[key];
                if (key in that.actions) delete that.actions[key];
                mw.notify("for " + key, {
                    title: "Undo Successful",
                    type: "info"
                });
                that.updateActions();
                if ($("#TooltipsEditor-searchInput").val().trim() !== "") that.generateSearch();
            };
            // calling updateActions() without keys will refresh the table without additional change
            // keys can be an array of strings or one string
            if (keys) {
                if (typeof (keys) === "string") {
                    updateOne(keys);
                } else {
                    for (var i = 0; i < keys.length; i++) {
                        var k = keys[i];
                        updateOne(k);
                    }
                }
            }

            var $log = $("#TooltipsEditor-actionLog");
            var len = Object.keys(that.actions).length;
            var ls = [
                [],
                [],
                [],
                []
            ];
            var getEditParams = that.getEditParamPackage.bind(null, "edit", "actions-edit-button");
            var getUndoPreview = that.getMinetipParamPackage.bind(null, "preview (undo)", "minetip actions-preview-button", that.oldjson);
            var getCurrentPreview = that.getMinetipParamPackage.bind(null, "preview (current)", "minetip actions-preview-button", that.json);
            var getUndoButtonParams = function (k) {
                return {
                    text: "undo",
                    "class": "actions-undo-button",
                    "data-value": k
                };
            };

            $log.empty().append($("<li>", {
                text: len ? "Unsaved changes: " : "No changes were made",
                "class": "actions-none"
            }));

            if (len) {
                Object.keys(that.actions).sort().forEach(function (k) {
                    switch (that.actions[k]) {
                        case ("add"): {
                            ls[0].push($("<li>", {
                                html: [
                                    "Added " + k,
                                    $("<a>", getUndoButtonParams(k)).on("click", revertAction /* don't bind */ ),
                                    $("<a>", getEditParams(that.json, k)),
                                    $("<span>", getCurrentPreview(k))
                                ],
                                "class": "actions-add"
                            }));
                            break;
                        }
                        case ("modify"): {
                            ls[1].push($("<li>", {
                                html: [
                                    "Modified " + k,
                                    $("<a>", getUndoButtonParams(k)).on("click", revertAction /* don't bind */ ),
                                    $("<a>", getEditParams(that.json, k)),
                                    $("<span>", getUndoPreview(k)),
                                    $("<span>", getCurrentPreview(k))
                                ],
                                "class": "actions-modify"
                            }));
                            break;
                        }
                        case ("remove"): {
                            ls[2].push($("<li>", {
                                html: [
                                    "Removed&nbsp;" + k,
                                    $("<a>", getUndoButtonParams(k)).on("click", revertAction /* don't bind */ ),
                                    $("<a>", getEditParams(that.oldjson, k)),
                                    $("<span>", getUndoPreview(k))
                                ],
                                "class": "actions-remove"
                            }));
                            break;
                        }
                    }
                });
            }

            ls.forEach(function (v) {
                $log.append(v);
            });
            $log.append($("<li>", {
                text: "Saving changes will also sort all Tooltips in alphabetical order.",
                "class": "actions-none"
            }));
            $("#TooltipsEditor-undoLog").append(ls[3]); //.prepend(ls[3])

            $("#TooltipsEditor-totalTooltips").html($("<p>", {
                html: [
                    "Tooltips Count: " + Object.keys(that.json).length,
                    $("<span>", (function () {
                        var diff = Object.keys(that.json).length - that.oldjsonkeys.length;
                        if (diff < 0) {
                            return {
                                text: "(" + diff + ")",
                                "class": "diff-negative"
                            };
                        } else if (diff > 0) {
                            return {
                                text: "(+" + diff + ")",
                                "class": "diff-positive"
                            };
                        } else {
                            return {
                                text: "(0)",
                                "class": "diff-zero"
                            };
                        }
                    }())),
                ],
            }));
        },

        // main function generateSearch
        generateSearch: function () {
            function searchArray(arr, search) {
                var splitSearch = function (str) {
                    var pattern = str.split("").map(function (v) {
                        return "(?=.*" + mw.util.escapeRegExp(v) + ")";
                    }).join("");
                    var regex = new RegExp(pattern, "i");
                    var match = str.match(regex);

                    return match && match[0];
                };

                return arr.filter(function (v) {
                    return v.toLowerCase().includes(search.toLowerCase()) || splitSearch(v.toLowerCase(), search.toLowerCase());
                });
            }

            $("#searchResultsMessage").show();

            var $this = $("#TooltipsEditor-searchInput");
            var $results = $("#TooltipsEditor-searchResults");
            var val = $this.val();
            var abort = false;

            if (val.trim() === "") return $results.html("<p>Enter a search term to start searching.</p>");

            var names = Object.keys(that.json).sort();
            var results = searchArray(names, val);

            if (results.length > 100) {
                results.length = 100;
                abort = true;
            }

            $results.empty();

            results.forEach(function (v) {
                $results[0].appendChild($("<li>", {
                    html: [
                        $("<a>", {
                            href: mw.util.getUrl(v),
                            title: v,
                            text: v,
                            target: "_blank",
                        }),
                        " (",
                        $("<a>", that.getEditParamPackage("edit", "TooltipsEditor-editTooltip", that.json, v)),
                        "<span class='noselect'> &bull; </span>",
                        $("<span>", that.getMinetipParamPackage("preview", "minetip TooltipsEditor-previewTooltip", that.json, v)),
                        "<span class='noselect'> &bull; </span>",
                        $("<a>", {
                            "class": "TooltipsEditor-removeTooltip",
                            text: "remove",
                            "data-key": v.replaceAll("&amp;", "&"),
                        }),
                        ")",
                    ],
                })[0]);
            });

            if (!results.length) return $results.html("<p>No tooltip matched your search.</p>");
            else if (abort) $results.append("<p>Showing the first 100 results.</p>");
            else $results.append("<p>Total: " + results.length + (results.length > 1 && " results" || " result") + ".</p>");
        },

        // main function openEditor
        openEditor: function (values) {
            that.isInMain = false;
            values.oldKey = values.key;

            $("#TooltipsEditor-search").hide();
            $("#TooltipsEditor-editor").show();
            $("#TooltipsEditor header h3").text("Edit Panel");

            ace.tooltipsTextEditor.resize();
            ace.tooltipsTitleEditor.resize();

            ace.tooltipsTextEditor.setValue(that.convertSlashes(values.text || ""));
            ace.tooltipsTitleEditor.setValue(values.title || "");
            $("#TooltipsEditor-key").val(values.key || "");

            that.forEachInputBox(function (inter) {
                $("#TooltipsEditor-" + inter).val(values[inter] || "");
            });

            $(".qdmodal-button").hide();
            $("#TooltipsEditor-save, #TooltipsEditor-preview, #TooltipsEditor-cancel").remove();
            var $button1 = $("<span>", {
                "class": "oo-ui-buttonElement",
                html: $("<button>", {
                    id: "TooltipsEditor-save",
                    text: "Save",
                    "class": "oo-ui-buttonElement-button",
                    click: that.onSave.bind(null, values.oldKey),
                }),
            });
            var $button2 = $("<span>", {
                "class": "oo-ui-buttonElement",
                html: $("<button>", {
                    id: "TooltipsEditor-cancel",
                    text: "Cancel",
                    "class": "oo-ui-buttonElement-button",
                    click: function () {
                        that.reset(confirm("Go back to main page without saving?"));
                    },
                }),
            });
            var $button3 = $("<span>", {
                id: "TooltipsEditor-preview-wrapper",
                "class": "oo-ui-buttonElement",
                html: $("<button>", {
                    id: "TooltipsEditor-preview",
                    "class": "minetip oo-ui-buttonElement-button",
                    text: "Preview",
                }),
            });
            $("#TooltipsEditor-editor").append(
                $button1,
                $button2,
                $button3
            );
            that.updatePreview();
        },

        // main function onSave
        onSave: function (oldKey) {
            var otherparams = {};
            var values = {
                oldKey: oldKey,
                text: ace.tooltipsTextEditor.getValue(),
                title: ace.tooltipsTitleEditor.getValue(),
                key: $("#TooltipsEditor-key").val(),
            };
            that.forEachInputBox(function (inter) {
                values[inter] = $("#TooltipsEditor-" + inter).val();
                otherparams[inter] = values[inter].trim();
            });

            if (!values.key) return alert("You need to enter a Tooltip Key!");

            var pass = true;
            that.forEachInputBox(function (inter, i, otherinputboxes) {
                var val = otherinputboxes[inter];
                if (!val.optional) {
                    if (!values[inter]) {
                        pass = false;
                        return alert("You need to enter the tooltip's " + val.display + "!");
                    }
                }
            });
            if (!pass) return;

            that.throwOldjson(values.oldKey);
            that.throwOldjson(values.key);

            if (values.oldKey) delete that.json[values.oldKey];
            that.editor.addClass("mw-ajax-loader");
            $(".qdmodal-button").show();
            $("#TooltipsEditor-editor, #searchResultsMessage").hide();

            that.parsewithUIText().then(function (data) {
                that.json[values.key] = Object.assign({
                    text: values.text ? that.getParsedText(data) : undefined,
                    title: values.title.trim(),
                }, otherparams);
                that.isInMain = true;
                that.data = that.json;

                that.updateActions([values.oldKey, values.key]);
                that.reset(true);
            });
        },

        /* Editor-related Functions */
        // main functions setupEditor, aceSyntaxDef, getAceMode
        setupEditor: function (id) {
            // This defines the mode of editor. For how it works, see https://ace.c9.io/#nav=higlighter
            var aceEditor = ace.edit(id);
            var mode = that.getAceMode();
            // if you wonder where the NetworkError about ./worker-javascript.js comes from, here it is.
            // the error is left untouched intentionally
            aceEditor.session.setMode(mode);

            if (id === "TooltipsEditor-text-AceEditor") {
                aceEditor.setOptions({
                    wrapBehavioursEnabled: true,
                    wrap: true,
                });

                aceEditor.session.on("change", function () {
                    var height = aceEditor.session.getScreenLength() *
                        aceEditor.renderer.lineHeight +
                        aceEditor.renderer.scrollBar.getWidth() + "px";

                    $(id).css({
                        height: height
                    });
                    aceEditor.resize();

                    if (aceEditor.session.getScreenWidth() > 1000) {
                        $(id).css({
                            width: "1000px"
                        });
                    }
                });
            }

            aceEditor.session.on("change", that.updatePreview);
            aceEditor.on("focus", function () {
                that.lastFocusedEditor = aceEditor;
            });

            return aceEditor;
        },
        aceSyntaxDef: function () {
            /* The function aceDef is explicitly written with independent values
             * so that it can be tested on https://ace.c9.io/tool/mode_creator.html
             * When testing, JUST USE THE CONTENT INSIDE aceDef. No need to copy the ace.define(...)
             * For how this works, see https://ace.c9.io/#nav=higlighter
             * or https://github.com/ajaxorg/ace/wiki/Creating-or-Extending-an-Edit-Mode

             * Important notes on understanding $rule definition:
             * "The highlighter functions as a state machine, with regex matches used to determine tokens and transitions between states."
             * "The highlighter starts off in the "start" state."
             * "If a rule is matched which has a next state set, then the tokeniser will move into that new state."
             * "Rules are prioritised based on their position within the ruleset, and the usual matching rules for regex apply."

             * For require() / ace.require() pathnames, the "ace/" refers to the directory at https://github.com/ajaxorg/ace/src
             * Tokenizer source code (I hope you won't ever need it): https://github.com/ajaxorg/ace/blob/master/src/tokenizer.js
            */
            ace.define("ace/mode/minetip", [], function aceDef(require, exports) {
                var oop = require("ace/lib/oop");
                var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

                /* Constants */
                var formattingConversions = {
                    "l": "format_bold", // note: class is from ace editor; must be used for correct cursor letter widths
                    "m": "format-m", // note: must be custom for compatibility with m && n
                    "n": "format-n", // note: must be custom the .ace_format_underline is problematic
                    "o": "format_italic",
                };
                var escapesExp = /\\(ench?a?n?t?m?e?n?t?|ra?r?i?t?y?|poti?o?n|sta?t?)\{(?:.+?)\}|\\(?:[rntvb&]|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{1,4}|u\{[0-9a-fA-F]{1,6}\}|[0-2][0-7]{0,2}|3[0-7][0-7]?|[4-7][0-7].)/;
                var colorConvList = "0123456789abcdef";

                // A color rule object - since we want to store custom attributes in it
                function OneColorRule(c) {
                    this.color = c;
                    this.formats = []; // format stack for this color rule
                    var myFormats = this.formats;
                    this.rules = [ /* [0: matches escapes] */ {
                        regex: escapesExp,
                        token: "backescape.code",
                    }, /* [1: matches color code] */ {
                        regex: /(&)([0-9a-f])/,
                        token: function (_, code) {
                            this.nextCode = code;
                            return "escape.format.code.color";
                        },
                        next: function () {
                            myFormats = []; // clear format stack before leaving state
                            return "color-" + this.nextCode;
                        },
                    }, /* [2: matches formatting code] */ {
                        regex: /(&)([k-o])/,
                        token: function (_, code) {
                            if (code !== "k")
                                myFormats.push(formattingConversions[code]);
                            return "escape.format.code.text";
                        },
                    }, /* [3: matches reset/end-of-line] */ {
                        regex: /&r|$/,
                        token: "language.escape.format.code",
                        next: function () {
                            myFormats = []; // clear format stack on reset
                            return "start";
                        },
                    }, /* [4: matches any character] */ {
                        regex: /[^\0]/,
                        token: function () {
                            myFormats = myFormats.filter(function (v, i) {
                                return i === myFormats.indexOf(v);
                            });
                            return "format.color.format-" + c + ".code" + myFormats.map(function (code) {
                                return "." + code;
                            }).join("");
                        },
                    }];
                }

                // Defining the actual HighlightRules object
                function MinecraftHighlightRules() {
                    var formatStack = []; // a format stack for the "start" state
                    this.$rules = {
                        /* rules on "start" state */
                        start: [ /* [0: matches escapes] */ {
                            regex: escapesExp,
                            token: "backescape.code",
                        }, /* [1: matches color code] */ {
                            regex: /(&)([0-9a-f])/,
                            token: function (_, code) {
                                this.nextCode = code;
                                return "escape.format.code.color";
                            },
                            next: function () {
                                formatStack = []; // clear format stack before leaving state
                                return "color-" + this.nextCode;
                            },
                        }, /* [2: matches formatting code] */ {
                            regex: /(&)([k-o])/,
                            token: function (_, code) {
                                if (code !== "k")
                                    formatStack.push(formattingConversions[code]);
                                return "escape.format.code.color";
                            },
                        }, /* [3: matches reset/end-of-line] */ {
                            regex: /&r|$/,
                            token: function () {
                                formatStack = []; // clear format stack on reset
                                return "language.escape.format.code";
                            },
                        }, /* [4: matches any character] */ {
                            regex: /[^\0]/,
                            token: function () {
                                formatStack = formatStack.filter(function (v, i) {
                                    return i === formatStack.indexOf(v);
                                });
                                return "text.formatted" + formatStack.map(function (code) {
                                    return "." + code;
                                }).join("");
                            },
                        }],
                    };
                    /* insert rules on all "color-{0-9a-f}" states */
                    // note: must call a function to add each color rule (X vanilla for-loop)
                    for (var i = 0; i < colorConvList.length; i++) {
                        var c = colorConvList[i];
                        var key = "color-" + c;
                        // place a new rule object in $rules
                        var colorRule = new OneColorRule(c);
                        this.$rules[key] = colorRule.rules;
                    }
                    this.normalizeRules();
                }

                // Export Rules
                oop.inherits(MinecraftHighlightRules, TextHighlightRules);
                exports.MinecraftHighlightRules = MinecraftHighlightRules;
            });
        },
        // Get an instance of the Minetip mode
        // Note: The standard method shown on the website to create a new class
        // with oop.inherit has so far not been successful.
        getAceMode: function () {
            var JsMode = ace.require("ace/mode/javascript").Mode;
            var newMode = new JsMode();
            var minetipRules = ace.require("ace/mode/minetip");
            if (minetipRules) {
                newMode.HighlightRules = minetipRules.MinecraftHighlightRules;
                return newMode;
            }
        },

        // main function mainProcess
        mainProcess: function () {
            that.oldjson = {};
            that.json = {};
            that.actions = [];
            that.aceSyntaxDef(); // note: intentionally placed way earlier than any setupEditor calls

            if (arguments.length > 1) {
                var jsonStr = [];
                // Merge result into a single string to limit JSON.parse() calls
                if (Array.isArray(arguments[0])) {
                    Array.from(arguments).forEach(function (v) {
                        jsonStr.push(v[0]["return"].replaceAll(/^\{|\}$/g, ""));
                    });
                } else jsonStr.push(arguments[0]["return"].replaceAll(/^\{|\}$/g, ""));
                // Parse String
                that.json = that.processResult("{" + jsonStr.join(",") + "}");
            } else {
                that.json = that.processResult(arguments[0]);
            }

            that.editor = $("#TooltipsEditor > section");
            that.data = that.json;
            that.oldjsonkeys = Object.keys(that.json);

            var otherparams = [];
            that.forEachInputBox(function (inter, i, otherinputboxes) {
                var val = otherinputboxes[inter];
                otherparams.push(
                    $("<span>", {
                        text: "Tooltip " + val.display + ": ",
                        "class": "TooltipsEditor-inputbox-label TooltipsEditor-label"
                    }),
                    $("<input>", {
                        id: "TooltipsEditor-" + inter,
                        "class": "TooltipsEditor-inputbox"
                    })
                );

                if (val.optional)
                    otherparams.push($("<span>", {
                        text: "(*Optional)",
                        "class": "TooltipsEditor-inputbox-note"
                    }));

                otherparams.push("<br>");
            });

            // create elements
            that.editor.empty();
            that.editor.append(
                $("<div>", {
                    id: "TooltipsEditor-search",
                    html: [
                        $("<div>", {
                            text: "Tooltips Editor Main Page",
                            id: "TooltipsEditor-pageTitle"
                        }),
                        $("<div>", {
                            id: "TooltipsEditor-totalTooltips"
                        }),
                        $("<div>", {
                            id: "TooltipsEditor-searchRow",
                            html: [
                                $("<div>", {
                                    text: "Search Existing Tooltip: ",
                                    id: "TooltipsEditor-searchLabel"
                                }),
                                $("<div>", {
                                    html: [
                                        $("<input>", {
                                            id: "TooltipsEditor-searchInput",
                                            keyup: that.generateSearch,
                                        }),
                                        "<span style='margin: 0 1em; font-weight: bold; text-transform: uppercase;'>or</span>",
                                        $("<span>", {
                                            "class": "oo-ui-buttonElement",
                                            html: [
                                                $("<button>", {
                                                    id: "TooltipsEditor-addNew",
                                                    "class": "oo-ui-buttonElement-button",
                                                    text: "Add New Tooltip",
                                                    click: function () {
                                                        that.openEditor({});
                                                    },
                                                }),
                                            ],
                                        }),
                                    ]
                                }),
                            ]
                        }),
                        $("<ul>", {
                            id: "TooltipsEditor-actionLog",
                        }),
                        $("<div>", {
                            id: "TooltipsEditor-undoLog",
                        }),
                        "<br>",
                        $("<span>", {
                            text: "Search Results: ",
                            id: "searchResultsMessage"
                        }),
                        $("<ul>", {
                            id: "TooltipsEditor-searchResults",
                        }),
                        $("<div>", {
                            "class": "footer-link",
                            html: [
                                $("<span>", {
                                    html: [
                                        "(",
                                        $("<a>", {
                                            href: mw.util.getUrl("MediaWiki:Gadget-TooltipsEditor.js"),
                                            text: "View JavaScript",
                                            target: "_blank"
                                        }),
                                        ")",
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),
                $("<div>", {
                    id: "TooltipsEditor-editor",
                    style: "display: none;",
                    html: Array.prototype.concat(
                        [
                            "This editor uses Minecraft\'s ",
                            $("<a>", {
                                href: "https://minecraft.gamepedia.com/Formatting codes",
                                text: "formatting codes",
                                title: "https://minecraft.gamepedia.com/Formatting codes",
                                target: "_blank",
                            }),
                            " and the template ",
                            $("<code>", {
                                html: [
                                    "{{",
                                    $("<a>", {
                                        href: mw.util.getUrl("Template:UIText"),
                                        text: "UIText",
                                        title: "Template:UIText",
                                        target: "_blank",
                                    }),
                                    "}}",
                                ],
                            }),
                            "for extra formatting. Click the links for more info.",
                            "<br>",
                            $("<fieldset>", {
                                id: "TooltipsEditor-insertionTool",
                                html: [
                                    $("<legend>", {
                                        text: "Toolbox (Click to Insert)"
                                    }),
                                    $("<div>", {
                                        html: [
                                            $("<span>", {
                                                text: "Formatting"
                                            }),
                                            $("<div>", {
                                                id: "TooltipsEditor-insertFormat",
                                                html: that.processColors(),
                                                "class": "noselect"
                                            }),
                                            "<hr>",
                                            $("<span>", {
                                                text: "Special Character"
                                            }),
                                            $("<div>", {
                                                id: "TooltipsEditor-insertChar",
                                                html: that.specialchars,
                                                "class": "noselect"
                                            }),
                                            "<hr>",
                                            $("<span>", {
                                                text: "Rarity Text/Color"
                                            }),
                                            $("<div>", {
                                                id: "TooltipsEditor-insertFormat",
                                                html: that.processRarityTexts(),
                                                "class": "noselect"
                                            }),
                                        ],
                                    }),
                                ],
                            }), "<br>",
                            $("<span>", {
                                text: "Tooltip Key: ",
                                "class": "TooltipsEditor-inputbox-label TooltipsEditor-label"
                            }),
                            $("<input>", {
                                id: "TooltipsEditor-key",
                                "class": "TooltipsEditor-inputbox"
                            }),
                            "<br>",
                        ],
                        otherparams,
                        [
                            $("<span>", {
                                text: "Tooltip Title: ",
                                "class": "TooltipsEditor-label"
                            }),
                            $("<div>", {
                                id: "TooltipsEditor-title-AceEditor"
                            }),
                            $("<span>", {
                                text: "Tooltip Text: ",
                                "class": "TooltipsEditor-label"
                            }),
                            $("<div>", {
                                id: "TooltipsEditor-text-AceEditor"
                            }),
                        ]),
                })
            );

            $(".TooltipsEditor-insertFormat:not('.TooltipsEditor-last')").after($("<span>", {
                text: " • ",
            }));
            that.editor.removeClass("mw-ajax-loader");
            that.updateActions();

            // setup events
            $("#TooltipsEditor-key, #TooltipsEditor-name").focus(function () {
                that.lastFocusedElement = $(this);
                that.lastFocusedEditor = null;
            });
            $(document.body).on("click", ".TooltipsEditor-insertFormat", function () {
                var $this = $(this);
                var insert = $this.attr("data-insert");

                if (that.lastFocusedEditor) {
                    var editor = that.lastFocusedEditor;

                    var selection = editor.selection;
                    if (!selection.ranges.length) {
                        editor.insert(insert);
                    } else {
                        selection.ranges.forEach(function (range) {
                            editor.session.insert({
                                row: range.start.row,
                                column: range.start.column,
                            }, insert);
                        });
                    }
                    that.lastFocusedEditor.focus();
                } else if (that.lastFocusedElement) {
                    that.lastFocusedElement.focus();
                }
            });
            $(document.body).on("click", ".TooltipsEditor-insertChar", function (e) {
                e.preventDefault();
                e.stopImmediatePropagation();

                if (that.lastFocusedEditor) {
                    that.insertText($(this).attr("data-insert") || $(this).text());
                    that.lastFocusedEditor.focus();
                } else if (that.lastFocusedElement) that.lastFocusedElement.focus();
            });
            $(document.body).on("click", ".TooltipsEditor-removeTooltip", function () {
                var $this = $(this);
                var key = $this.attr("data-key");

                that.throwOldjson(key);
                delete that.json[key];
                that.updateActions(key);
                that.generateSearch();
            });
            $(document.body).on("click", ".TooltipsEditor-editTooltip, .actions-edit-button", function () {
                var $this = $(this);

                var otherparams = {};
                that.forEachInputBox(function (inter) {
                    otherparams[inter] = $this.attr("data-tooltip-" + inter);
                });

                that.openEditor(Object.assign({
                    text: $this.attr("data-tooltip-text"),
                    title: $this.attr("data-tooltip-title"),
                    key: $this.attr("data-tooltip-key"),
                }, otherparams));
            });

            // set up editors
            window.ace.tooltipsTextEditor = that.setupEditor("TooltipsEditor-text-AceEditor");
            window.ace.tooltipsTitleEditor = that.setupEditor("TooltipsEditor-title-AceEditor");
        },

        /* Editor Handlers */
        // main functions editorCloseHandler, onClick
        editorCloseHandler: function () {
            that.closing = true;

            if (confirm("Are you sure you want to save and close the editor?")) {
                that.modal.hide();
                mw.notify("Another popup should indicate a successful edit.", {
                    title: "Processing Your Edit",
                    type: "info",
                });
            } else return;

            var ret = [];

            Object.keys(that.data).sort().forEach(function (k) {
                var v = that.data[k];
                var otherparams = [];

                that.forEachInputBox(function (inter, i, otherinputboxes) {
                    var val = otherinputboxes[inter];
                    if (val.optional && (that.optionalParam(v[inter]) !== "")) {
                        otherparams.push(
                            inter + " = '" + (val.replace ? that.applyReplacements(v[inter]) : v[inter]) + "', "
                        );
                    } else if (!val.optional) {
                        otherparams.push(
                            v[inter] ? inter + " = '" + that.applyReplacements(v[inter]) + "', " : ""
                        );
                    }
                });

                ret.push(Array.prototype.concat(
                    "\t['" + k.replaceAll(/(['"])/g, "\\$1") + "'] = {",
                    otherparams,
                    v.title ? "title = '" + that.applyReplacements(v.title) + "', " : "",
                    v.text ? "text = '" + that.applyReplacements(v.text) + "', " : "",
                    "},"
                ).join(""));
            });

            ret = "return {\n" + ret.join("\n") + "\n}\n".replaceAll(/&amp;/g, "&");

            api.postWithEditToken({
                action: "edit",
                text: ret,
                title: mw.config.get("wgPageName"),
                summary: "Updating tooltips (TooltipsEditor)",
                minor: true,
            }).then(function (d) {
                console.log(d);
                var saved = "newrevid" in d.edit;
                if (saved) {
                    mw.notify("Review your changes now!", {
                        title: "Tooltips Saved!",
                        type: "info"
                    });
                    location.href = new mw.Title(mw.config.get("wgPageName"), -1).getUrl({
                        type: "revision",
                        diff: d.edit.newrevid,
                        oldid: d.edit.oldrevid,
                    });

                    // Auto refresh lua cache on exit
                    that.refreshLuaCache();
                } else {
                    mw.notify("No changes were made.", {
                        title: "Tooltips Saved!",
                        type: "info"
                    });
                }
            });
        },
        onClick: function (tooltips) {
            that.closing = false;

            $(window).on("beforeunload", function () {
                if (!that.closing)
                    return "Are you sure you want to exit the page and discard your changes?";
            });

            that.modal.show({
                title: "Tooltips Editor",
                onHide: function () {
                    if (!that.closing && confirm("Are you sure you want to exit the editor and discard your changes?")) {
                        that.closing = true;
                        return true;
                    } else if (that.closing) return true;
                    else return false;
                },
                buttons: [{
                    text: "Save and Close",
                    handler: that.editorCloseHandler,
                }],
            });
            $("#TooltipsEditor > section").attr("class", "mw-ajax-loader");

            var promises = [];
            var split = tooltips.split("\n");

            // Split lua table into multiple tables due to size limitation of 500k bytes
            if (split.length > 1350) {
                var lines = split;
                lines.pop();
                lines.shift();

                for (var i = 0; i < lines.length; i += 900) {
                    var ret = "return {\n" + lines.slice(i, i + 900).join("\n") + "\n}";
                    promises.push(that.luaTableToJson(ret));
                }
            } else {
                promises = [that.luaTableToJson(tooltips)];
            }

            $.when.apply($, promises).then(that.mainProcess, function (code, e) {
                return alert("Failed to parse Tooltips: ", e), console.warn("Failed to parse Tooltips: ", e);
            }).catch(console.warn);
        },

        // entry point
        init: function () {
            $(".editTooltips").click(function () {
                api.get({
                    action: "query",
                    format: "json",
                    prop: "revisions",
                    titles: mw.config.get("wgPageName"),
                    formatversion: 2,
                    rvprop: "content",
                    rvslots: "*",
                }).then(function (d) {
                    var content = d.query.pages[0].revisions[0].slots.main.content;
                    that.deloadAll();
                    that.onClick(content);
                });
            });
        },
        secretDebugTool: function () {
            var it = prompt("Please enter an item to see its JSON");
            if (it !== null && it !== "") {
                if (it in that.json) {
                    mw.notify("See results in console.", {
                        title: "Debug: Found",
                        type: "warn"
                    });
                    console.log(that.json[it]);
                } else mw.notify("Item not found.", {
                    title: "Debug: Failed",
                    type: "warn"
                });
            }
        },
    };

    TooltipsEditor.init();

    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:BannerNotification.js',
        ]
    }, {
        type: "style",
        articles: [
            "MediaWiki:Gadget-TooltipsEditor.css",
        ],
    });
}).catch(console.warn);