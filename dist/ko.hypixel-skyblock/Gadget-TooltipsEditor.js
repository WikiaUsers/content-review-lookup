/* jshint
    esversion: 5, esnext: false, forin: true,
    immed: true, indent: 4,
    latedef: true, newcap: true,
    noarg: true, undef: true,
    undef: true, unused: true,
    browser: true, jquery: true,
    onevar: true, eqeqeq: true,
    multistr: true, maxerr: 999999,
    -W082, -W084
*/
/* global mw, ace */

$.when(
    $.Deferred(function (def) {
        $(function () {
            def.resolve();
        });
    }),
    mw.loader.using(["mediawiki.util", "mediawiki.api", "ext.codeEditor.ace"]),
    $.Deferred(function (def) {
        if (mw.libs.QDmodal) {
            def.resolve(mw.libs.QDmodal);
        } else {
            $.ajax({
                cache: true,
                dataType: "script",
                url: "https://dev.fandom.com/load.php?mode=articles&only=scripts&articles=MediaWiki:QDmodal.js"
            }).done(function () {
                def.resolve(mw.libs.QDmodal);
            });
        }
    })
).then(function () {
    // Pages
    var allowedPages = [
        "Inventory_slot/Tooltips",
        "Inventory_slot/Test",
    ].map(function (p) {
        return mw.config.get("wgFormattedNamespaces")[828] + ":" + p;
    });
    if (!allowedPages.includes(mw.config.get("wgPageName")) || (window.TooltipsEditor && window.TooltipsEditor.loaded)) return;

    var api = new mw.Api();

    console.log("툴팁 편집기 불러오는 중...");

    var that;
    var TooltipsEditor = window.TooltipsEditor = Object.assign(this, {

        // variables; undefined variables are just for easier variable tracking
        modal: new mw.libs.QDmodal("TooltipsEditor"),
        loaded: true,
        colorRules: undefined,
        deloadAll: function () {
            this.actions = this.closing = this.isInMain = this.data = this.json = this.oldjson = this.oldjsonkeys = this.editor = this.lastFocusedEditor = this.lastFocusedElement = undefined;
        },

        otherInputBoxes: {
            // <param internal name>: {display: <param display name>, optional?: true/false }
            "name": {
                display: "이름",
                replace: true
            },
            "image": {
                display: "이미지",
                optional: true
            },
            "link": {
                display: "링크",
                optional: true
            },
        },
        forEachInputBox: function (callback) {
            var i = 0;
            for (var intername in this.otherInputBoxes) {
                if (true) { // stops the editor from complaining
                    i++;
                    callback(intername, i, this.otherInputBoxes);
                }
            }
        },
        colorConversions: {
            0: "검은색",
            1: "짙은 파란색",
            2: "짙은 초록색",
            3: "청록색",
            4: "짙은 빨간색",
            5: "짙은 보라색",
            6: "주황색",
            7: "회색",
            8: "짙은 회색",
            9: "파란색",
            a: "초록색",
            b: "하늘색",
            c: "빨간색",
            d: "옅은 보라색",
            e: "노란색",
            f: "흰색",
            l: "굵음",
            n: "밑줄",
            m: "취소선",
            o: "기울임",
            r: "효과 초기화",
        },
        colorConvList: "0123456789abcdef",
        conversions: {
            "l": "굵음",
            "m": "밑줄",
            "n": "취소선",
            "o": "기울임",
        },
        rarityConversions: {
            "일반": "f",
            "고급": "a",
            "희귀": "9",
            "특급": "5",
            "전설": "6",
            "신화": "d",
            "신급": "b",
            "(초월)": "4",
            "특별": "c",
            "초특별": "c",
        },
        shortForm: {
            "일반": "C",
            "고급": "U",
            "희귀": "R",
            "특급": "E",
            "전설": "L",
            "신화": "M",
            "신급": "D",
            "(초월)": "(SE)",
            "특별": "SL",
            "초특별": "VSL",
        },
        specialchars: ("❤ ❈ ❂ ❁ ☣ ☠ ⚔ ✎ ⫽ ๑ ❣ ♨ ☄ ⸎ Ⓢ ⸕ ☘ Ⓟ ✦ ☯ ф ⚡ ✦ ✯ ♣ α ☂ ʬ ⚚ ◆ ☤")
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
        escapes: {
            regex: /\\(ench?a?n?t?m?e?n?t?|ra?r?i?t?y?|poti?o?n|sta?t?)\{(?:.+?)\}|\\(?:[rntvb&]|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{1,4}|u\{[0-9a-fA-F]{1,6}\}|[0-2][0-7]{0,2}|3[0-7][0-7]?|[4-7][0-7].)/,
            token: "backescape.code",
        },

        // helper functions for this.updateActions
        optionalParam: function (v) {
            if (typeof v !== "string")
                return "";
            else
                return v.trim();
        },
        inOldjson: function (k) {
            return this.oldjsonkeys.indexOf(k) !== -1;
        },
        throwOldjson: function (k) {
            if (this.inOldjson(k) && !(k in this.oldjson)) {
                this.oldjson[k] = {};
                Object.assign(this.oldjson[k], this.json[k]);
            }
        },
        allInputEquals: function (a, b) {
            var alltrue = true;
            this.forEachInputBox(function (inter, i, otherinputboxes) {
                var val = otherinputboxes[inter];
                if (val.optional ?
                    (this.optionalParam(a[inter]) !== this.optionalParam(b[inter])) :
                    (a[inter] !== b[inter])) {
                    alltrue = false;
                }
            }.bind(this));
            return alltrue;
        },
        updateOne: function (k) {
            if (k) {
                // if no old version, two cases:
                if (!this.inOldjson(k) && (k in this.json)) // first case: has a new version => entry added
                    this.actions[k] = "add";
                else if (!this.inOldjson(k) && !(k in this.json)) { // second case: does not have a new version => entry does not exist
                    if (k in this.actions) delete this.actions[k];
                }
                // at this point, it is guaranteed that an old version exists:
                else if (!(k in this.json)) // no new version =?> entry removed
                    this.actions[k] = "remove";
                else if (!this.oldjson[k] // value of old version is not recorded => new version must be equal to old version
                    ||
                    (this.oldjson[k].title === this.json[k].title &&
                        this.oldjson[k].text === this.json[k].text &&
                        this.allInputEquals(this.oldjson[k], this.json[k])
                    ) // compare each entries of the old version to new version; proceed if all equal
                ) {
                    if (k in this.actions) delete this.actions[k];
                    if (k in this.oldjson) delete this.oldjson[k];
                } else { // new version must be different from old version
                    this.actions[k] = "modify";
                }
            }
        },
        revertAction: function () {
            var key = $(this).attr("data-value");
            if (key in that.oldjson) {
                that.json[key] = {};
                Object.assign(that.json[key], that.oldjson[key]);
                delete that.oldjson[key];
            } else if (key in that.json)
                delete that.json[key];
            if (key in that.actions) delete that.actions[key];
            mw.notify("for " + key, {
                title: "실행 취소",
                type: "info"
            });
            that.updateActions();
            if ($("#TooltipsEditor-searchInput").val().trim() !== "") that.generateSearch();
        },
        getOtherParamAttr: function (obj, k) {
            var ret = {};
            this.forEachInputBox(function (inter) {
                ret["data-tooltip-" + inter] =
                    obj[k] && obj[k][inter] && obj[k][inter].replaceAll("&amp;", "&");
            }.bind(this));
            return ret;
        },
        getEditParamPackage: function (text, cls, obj, k) {
            return Object.assign({
                "text": text,
                "class": cls,
                "data-tooltip-title": obj[k] && obj[k].title && obj[k].title.replaceAll("&amp;", "&"),
                "data-tooltip-text": obj[k] && obj[k].text && obj[k].text.replaceAll("&amp;", "&"),
                "data-tooltip-key": k.replaceAll("&amp;", "&")
            }, this.getOtherParamAttr(obj, k));
        },
        getMinetipParamPackage: function (text, cls, obj, k) {
            return {
                "class": cls,
                text: text,
                "data-minetip-text": obj[k] && obj[k].text && obj[k].text.replaceAll("&amp;", "&"),
                "data-minetip-title": obj[k] && obj[k].title && obj[k].title.replaceAll("&amp;", "&"),
            };
        },

        // main function this.updateActions
        updateActions: function (keys) {
            // calling updateActions() without keys will refresh the table without additional change
            // keys can be an array of strings or one string
            if (keys) {
                if (typeof (keys) === "string") {
                    this.updateOne(keys);
                } else {
                    for (var i = 0; i < keys.length; i++) {
                        var k = keys[i];
                        this.updateOne(k);
                    }
                }
            }

            var $log = $("#TooltipsEditor-actionLog");
            var len = Object.keys(this.actions).length;
            var ls = [
                [],
                [],
                [],
                []
            ];
            var getEditParams = this.getEditParamPackage.bind(this, "편집", "actions-edit-button");
            var getUndoPreview = this.getMinetipParamPackage.bind(this, "미리보기 (이전)", "minetip actions-preview-button", this.oldjson);
            var getCurrentPreview = this.getMinetipParamPackage.bind(this, "미리보기 (현재)", "minetip actions-preview-button", this.json);
            var getUndoButtonParams = function (k) {
                return {
                    text: "실행 취소",
                    "class": "actions-undo-button",
                    "data-value": k
                };
            };

            $log.empty().append($("<li>", {
                text: len ? "저장되지 않은 편집: " : "아무런 편집도 이루어지지 않았습니다.",
                "class": "actions-none"
            }));

            if (len) {
                Object.keys(this.actions).sort().forEach(function (k) {
                    switch (this.actions[k]) {
                        case ("add"): {
                            ls[0].push($("<li>", {
                                html: [
                                    k + " 추가됨.",
                                    $("<a>", getUndoButtonParams(k)).on("click", this.revertAction /* don't bind */ ),
                                    $("<a>", getEditParams(this.json, k)),
                                    $("<span>", getCurrentPreview(k))
                                ],
                                "class": "actions-add"
                            }));
                            break;
                        }
                        case ("modify"): {
                            ls[1].push($("<li>", {
                                html: [
                                    k + " 수정됨.",
                                    $("<a>", getUndoButtonParams(k)).on("click", this.revertAction /* don't bind */ ),
                                    $("<a>", getEditParams(this.json, k)),
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
                                    k + " 삭제됨.",
                                    $("<a>", getUndoButtonParams(k)).on("click", this.revertAction /* don't bind */ ),
                                    $("<a>", getEditParams(this.oldjson, k)),
                                    $("<span>", getUndoPreview(k))
                                ],
                                "class": "actions-remove"
                            }));
                            break;
                        }
                    }
                }.bind(this));
            }

            ls.forEach(function (v) {
                $log.append(v);
            });
            $log.append($("<li>", {
                text: "또한 편집을 저장하면 모든 툴팁이 글자 순으로 정렬됩니다.",
                "class": "actions-none"
            }));
            $("#TooltipsEditor-undoLog").append(ls[3]); //.prepend(ls[3])

            $("#TooltipsEditor-totalTooltips").html($("<p>", {
                html: [
                    "툴팁의 총 개수: " + Object.keys(this.json).length,
                    $("<span>", (function () {
                        var diff = Object.keys(this.json).length - this.oldjsonkeys.length;
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
                    }.bind(this)())),
                ],
            }));
        },

        // helper functions for this.generateSearch
        searchArray: function (arr, search) {
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
        },

        // main function this.generateSearch
        generateSearch: function () {
            $("#searchResultsMessage").show();

            var $this = $("#TooltipsEditor-searchInput");
            var $results = $("#TooltipsEditor-searchResults");
            var val = $this.val();
            var abort = false;

            if (val.trim() === "") return $results.html("<p>검색어를 입력하여 검색하세요.</p>");

            var names = Object.keys(this.json).sort();
            var results = this.searchArray(names, val);

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
                        $("<a>", this.getEditParamPackage("edit", "TooltipsEditor-editTooltip", this.json, v)),
                        "<span class='noselect'> &bull; </span>",
                        $("<span>", this.getMinetipParamPackage("preview", "minetip TooltipsEditor-previewTooltip", this.json, v)),
                        "<span class='noselect'> &bull; </span>",
                        $("<a>", {
                            "class": "TooltipsEditor-removeTooltip",
                            text: "remove",
                            "data-key": v.replaceAll("&amp;", "&"),
                        }),
                        ")",
                    ],
                })[0]);
            }.bind(this));

            if (!results.length) return $results.html("<p>아무런 툴팁도 검색되지 않았습니다.</p>");
            else if (abort) $results.append("<p>상위 100개의 검색 결과를 표시합니다.</p>");
            else $results.append("<p>총 "+results.length+" 개의 결과가 검색되었습니다."+".</p>");
        },

        // helper functions for this.openEditor
        convertSlashes: function (s) {
            // [2.entry] json/preview format => editor view
            // inverse of this.replaceLines
            // with reference to MediaWiki:Common.js/minetip.js
            s = s.replaceAll(/\\\\/g, "&#92;").replaceAll(/\\\//g, "&#47;");
            return s.replaceAll(/\//g, "\n").replaceAll("&#92;", "\\").replaceAll("&#47;", "/");
        },

        // main function this.openEditor
        openEditor: function (values) {
            this.isInMain = false;
            values.oldKey = values.key;

            $("#TooltipsEditor-search").hide();
            $("#TooltipsEditor-editor").show();
            $("#TooltipsEditor header h3").text("편집 창");

            ace.tooltipsTextEditor.resize();
            ace.tooltipsTitleEditor.resize();

            ace.tooltipsTextEditor.setValue(this.convertSlashes(values.text || ""));
            ace.tooltipsTitleEditor.setValue(values.title || "");
            $("#TooltipsEditor-key").val(values.key || "");

            this.forEachInputBox(function (inter) {
                $("#TooltipsEditor-" + inter).val(values[inter] || "");
            });

            $(".qdmodal-button").hide();
            $("#TooltipsEditor-save, #TooltipsEditor-preview, #TooltipsEditor-cancel").remove();
            var $button1 = $("<span>", {
                "class": "oo-ui-buttonElement",
                html: $("<button>", {
                    id: "TooltipsEditor-save",
                    text: "저장",
                    "class": "oo-ui-buttonElement-button",
                    click: this.onSave.bind(this, values.oldKey),
                }),
            });
            var $button2 = $("<span>", {
                "class": "oo-ui-buttonElement",
                html: $("<button>", {
                    id: "TooltipsEditor-cancel",
                    text: "취소",
                    "class": "oo-ui-buttonElement-button",
                    click: function () {
                        this.reset(confirm("저장하지 않고 메인 메뉴로 돌아가시겠습니까?"));
                    }.bind(this),
                }),
            });
            var $button3 = $("<span>", {
                id: "TooltipsEditor-preview-wrapper",
                "class": "oo-ui-buttonElement",
                html: $("<button>", {
                    id: "TooltipsEditor-preview",
                    "class": "minetip oo-ui-buttonElement-button",
                    text: "미리보기",
                }),
            });
            $("#TooltipsEditor-editor").append(
                $button1,
                $button2,
                $button3
            );
            this.updatePreview();
        },

        onSave: function (oldKey) {
            var otherparams = {};
            var values = {
                oldKey: oldKey,
                text: ace.tooltipsTextEditor.getValue(),
                title: ace.tooltipsTitleEditor.getValue(),
                key: $("#TooltipsEditor-key").val(),
            };
            this.forEachInputBox(function (inter) {
                values[inter] = $("#TooltipsEditor-" + inter).val();
                otherparams[inter] = values[inter].trim();
            }.bind(this));

            if (!values.key) return alert("툴팁 ID를 입력해야 합니다!");

            var pass = true;
            this.forEachInputBox(function (inter, i, otherinputboxes) {
                var val = otherinputboxes[inter];
                if (!val.optional) {
                    if (!values[inter]) {
                        pass = false;
                        return alert("툴팁의 " + val.display + "을(를) 입력해야 합니다!");
                    }
                }
            }.bind(this));
            if (!pass) return;

            this.throwOldjson(values.oldKey);
            this.throwOldjson(values.key);

            if (values.oldKey) delete this.json[values.oldKey];
            this.editor.addClass("mw-ajax-loader");
            $(".qdmodal-button").show();
            $("#TooltipsEditor-editor, #searchResultsMessage").hide();

            this.parsewithUIText().then(function (data) {
                this.json[values.key] = Object.assign({
                    text: values.text ? this.getParsedText(data) : undefined,
                    title: values.title.trim(),
                }, otherparams);
                this.isInMain = true;
                this.data = this.json;

                this.updateActions([values.oldKey, values.key]);
                this.reset(true);
            }.bind(this));
        },

        // helper functions for this.MainProcess
        processResult: function (d) {
            // [1.entry] lua data => json/preview format
            // inverse of this.applyReplacements
            // note: double-backslash and escaped quotes are treated as one character
            // in both lua and json. No replacement needed
            return JSON.parse(d);
        },
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
                if ($("#TooltipsEditor-searchInput").val().trim() !== "") this.generateSearch();
                $("#TooltipsEditor header h3").text("아이템 툴팁 편집기");
            }
        },
        processColors: function () {
            return Object.keys(this.colorConversions).map(function (v, i, a) {
                return $("<a>", {
                    "class": "TooltipsEditor-insertFormat" + ((i === a.length - 1) && " TooltipsEditor-last" || ""),
                    text: this.colorConversions[v].replaceAll("_", " ").replaceAll(/(\w)(\w*)/g, function (_, $1, $2) {
                        return $1.toUpperCase() + $2;
                    }),
                    "data-insert": "&" + v,
                });
            }.bind(this));
        },
        processRarityTexts: function () {
            return Object.keys(this.rarityConversions).map(function (v, i, a) {
                return $("<span>", {
                    html: [
                        $("<a>", {
                            "class": "TooltipsEditor-insertFormat",
                            text: v,
                            "data-insert": "&" + this.rarityConversions[v] + "&l" + v.toUpperCase().replaceAll(/[()]/g, ""),
                            style: "font-style: italic;",
                        }),
                        $("<a>", {
                            "class": "TooltipsEditor-insertFormat" + ((i === a.length - 1) && " TooltipsEditor-last" || ""),
                            text: this.shortForm[v],
                            "data-insert": "&" + this.rarityConversions[v],
                            style: "font-style: italic;",
                        }),
                    ]
                });
            }.bind(this));
        },
        replaceLines: function (s) {
            // [2.exit] editor view => json/preview format
            // inverse of this.convertSlashes
            s = s.replaceAll(/\\/g, "&#92;").replaceAll(/\//g, "&#47;");
            return s.replaceAll("&#92;", "\\\\").replaceAll("&#47;", "\\/").replaceAll(/\n/g, "/");
        },
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
        updatePreview: function () {
            // no parser solution (quick)
            $("#TooltipsEditor-preview").attr({
                "data-minetip-text": this.replaceLines(ace.tooltipsTextEditor.getValue()),
                "data-minetip-title": ace.tooltipsTitleEditor.getValue(),
            });
            // experimental solution (slow)
            /*
            this.parsewithUIText().then(function(data) {
                $("#TooltipsEditor-preview").attr({
                    // "data-minetip-text": this.replaceLines(ace.tooltipsTextEditor.getValue()), // no parser solution
                    "data-minetip-text": this.getParsedText(data),
                    "data-minetip-title": ace.tooltipsTitleEditor.getValue(),
                });
            }.bind(this));
            */
        },
        insertText: function (text) {
            var editor = this.lastFocusedEditor;
            if (!editor && this.lastFocusedElement) {
                return this.lastFocusedElement.textSelection("encapsulateSelection", {
                    pre: text,
                    peri: "",
                }), true;
            }

            editor.insert(text, 1);

            return true;
        },
        setupEditor: function (id) {
            var aceEditor = ace.edit(id);
            var mode = new(ace.require("ace/mode/javascript").Mode)();
            mode.HighlightRules = ace.require("ace/mode/minecraft-tooltips").MinecraftHighlightRules;
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

            aceEditor.session.on("change", this.updatePreview.bind(this));
            aceEditor.on("focus", function () {
                this.lastFocusedEditor = aceEditor;
            }.bind(this));

            return aceEditor;
        },

        onMatch: function (str) {
            var match = this.splitRegex.exec(str);
            var values = match.slice(1);
            values.push(match[0]);

            var types = this.token.apply(this, values);

            if (typeof types === "string")
                return [{
                    type: types,
                    value: str
                }];
            var tokens = [];
            for (var i = 0, l = types.length; i < l; i++) {
                if (values[i])
                    tokens[tokens.length] = {
                        type: types[i],
                        value: values[i]
                    };
            }
            return tokens;
        },
        MinecraftHighlightRules: function () {
            var formats = [];

            this.$rules = {
                start: [{ // [0]
                    regex: /&([0-9a-f])/,
                    token: function (code) {
                        this.nextCode = code;
                        that.colorRules["color-" + code].formats = [];
                        return "escape.format.code.color";
                    },
                    next: function () {
                        return "color-" + this.nextCode;
                    },
                    onMatch: that.onMatch,
                }, { // [1]
                    regex: /&r/,
                    token: function () {
                        formats = [];
                        return "escape.format.code.color";
                    },
                }, /* [2] */ that.escapes, { // [3]
                    regex: /&([k-o])/,
                    token: function (code) {
                        if (code !== "k")
                            formats.push(that.conversions[code]);
                        return "escape.format.code.color";
                    },
                }, { // [4]
                    regex: /[^\0]/,
                    token: function () {
                        var ret = "text.formatted";

                        formats.forEach(function (code) {
                            ret += ".format_" + code;
                        });
                        return ret;
                    },
                }],
            };

            for (var prefix in that.colorRules) {
                if (that.colorRules.hasOwnProperty(prefix)) {
                    var data = that.colorRules[prefix];

                    this.$rules[prefix] = data.rules;
                }
            }

            this.normalizeRules();
        },

        // main function this.MainProcess
        MainProcess: function () {
            this.oldjson = {};
            this.json = {};
            this.actions = [];

            if (arguments.length > 1) {
                var jsonStr = [];

                // Merge result into a single string to limit JSON.parse() calls
                if (Array.isArray(arguments[0])) {
                    Array.from(arguments).forEach(function (v) {
                        jsonStr.push(v[0]["return"].replaceAll(/^\{|\}$/g, ""));
                    });
                } else jsonStr.push(arguments[0]["return"].replaceAll(/^\{|\}$/g, ""));
                // Parse String
                this.json = this.processResult("{" + jsonStr.join(",") + "}");
            } else {
                this.json = this.processResult(arguments[0]);
            }

            this.editor = $("#TooltipsEditor > section");
            this.data = this.json;
            this.oldjsonkeys = Object.keys(this.json);

            ace.define("ace/mode/minecraft-tooltips", [], function (require, exports) {
                var oop = require("../lib/oop");
                var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

                this.colorRules = {};
                this.colorConvList.split("").forEach(function (code) {
                    this["color-" + code] = {
                        formats: [],
                        rules: [{ // [0]
                            token: function (code) {
                                this.nextCode = code;
                                return "escape.format.code.color";
                            },
                            regex: /&([0-9a-f])/,
                            next: function () {
                                return "color-" + this.nextCode;
                            },
                            onMatch: that.onMatch,
                        }, { // [1]
                            regex: /&([k-o])/,
                            token: function (code) {
                                if (code !== "k")
                                    this.formats.push(that.conversions[code]);
                                return "escape.format.code.text";
                            },
                        }, { // [2]
                            token: "language.escape.format.code",
                            regex: /&r/,
                            next: "start",
                        }, /* [3] */ that.escapes, { // [4]
                            regex: /[^\0]/,
                            token: function () {
                                var ret = "format.color.format-" + code + ".code";

                                this.formats.forEach(function (code) {
                                    ret += ".format_" + code;
                                });
                                return ret;
                            },
                        }],
                    };

                    var data = this["color-" + code];
                    data.rules[0].token = data.rules[0].token.bind(data);
                    data.rules[0].next = data.rules[0].next.bind(data);
                    data.rules[1].token = data.rules[1].token.bind(data);
                    data.rules[4].token = data.rules[4].token.bind(data);
                }, this.colorRules);

                var MinecraftHighlightRules = this.MinecraftHighlightRules;

                oop.inherits(MinecraftHighlightRules, TextHighlightRules);

                exports.MinecraftHighlightRules = MinecraftHighlightRules;
            }.bind(this));

            var otherparams = [];
            this.forEachInputBox(function (inter, i, otherinputboxes) {
                var val = otherinputboxes[inter];
                otherparams.push(
                    $("<span>", {
                        text: "툴팁 " + val.display + ": ",
                        "class": "TooltipsEditor-inputbox-label TooltipsEditor-label"
                    }),
                    $("<input>", {
                        id: "TooltipsEditor-" + inter,
                        "class": "TooltipsEditor-inputbox"
                    })
                );

                if (val.optional)
                    otherparams.push($("<span>", {
                        text: "(*선택 사항)",
                        "class": "TooltipsEditor-inputbox-note"
                    }));

                otherparams.push("<br>");
            }.bind(this));

            this.editor.empty();
            this.editor.append(
                $("<div>", {
                    id: "TooltipsEditor-search",
                    html: [
                        $("<div>", {
                            text: "툴팁 편집기 메인 메뉴",
                            id: "TooltipsEditor-pageTitle"
                        }),
                        $("<div>", {
                            id: "TooltipsEditor-totalTooltips"
                        }),
                        $("<div>", {
                            id: "TooltipsEditor-searchRow",
                            html: [
                                $("<div>", {
                                    text: "기존 툴팁 검색: ",
                                    id: "TooltipsEditor-searchLabel"
                                }),
                                $("<div>", {
                                    html: [
                                        $("<input>", {
                                            id: "TooltipsEditor-searchInput",
                                            keyup: this.generateSearch.bind(this),
                                        }),
                                        "<span style='margin: 0 1em; font-weight: bold; text-transform: uppercase;'>또는</span>",
                                        $("<span>", {
                                            "class": "oo-ui-buttonElement",
                                            html: [
                                                $("<button>", {
                                                    id: "TooltipsEditor-addNew",
                                                    "class": "oo-ui-buttonElement-button",
                                                    text: "신규 툴팁 추가",
                                                    click: function () {
                                                        this.openEditor({});
                                                    }.bind(this),
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
                            text: "검색 결과: ",
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
                                            text: "자바스크립트 보기",
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
                            "이 편집기는 마인크래프트의 ",
                            $("<a>", {
                                href: "https://minecraft.gamepedia.com/Formatting codes",
                                text: "텍스트 형식",
                                title: "https://minecraft.gamepedia.com/Formatting codes",
                                target: "_blank",
                            }),
                            "과 틀 ",
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
                            "을 사용합니다. 더 자세한 정보는 아래의 링크를 참고하십시오.",
                            "<br>",
                            $("<fieldset>", {
                                id: "TooltipsEditor-insertionTool",
                                html: [
                                    $("<legend>", {
                                        text: "도구 상자 (클릭하여 삽입할 수 있습니다)"
                                    }),
                                    $("<div>", {
                                        html: [
                                            $("<span>", {
                                                text: "텍스트 꾸미기"
                                            }),
                                            $("<div>", {
                                                id: "TooltipsEditor-insertFormat",
                                                html: this.processColors(),
                                                "class": "noselect"
                                            }),
                                            "<hr>",
                                            $("<span>", {
                                                text: "특수문자"
                                            }),
                                            $("<div>", {
                                                id: "TooltipsEditor-insertChar",
                                                html: this.specialchars,
                                                "class": "noselect"
                                            }),
                                            "<hr>",
                                            $("<span>", {
                                                text: "희귀도 텍스트/색"
                                            }),
                                            $("<div>", {
                                                id: "TooltipsEditor-insertFormat",
                                                html: this.processRarityTexts(),
                                                "class": "noselect"
                                            }),
                                        ],
                                    }),
                                ],
                            }), "<br>",
                            $("<span>", {
                                text: "툴팁 ID: ",
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
                                text: "툴팁 제목: ",
                                "class": "TooltipsEditor-label"
                            }),
                            $("<div>", {
                                id: "TooltipsEditor-title-AceEditor"
                            }),
                            $("<span>", {
                                text: "툴팁 텍스트: ",
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
            this.editor.removeClass("mw-ajax-loader");
            this.updateActions();

            $("#TooltipsEditor-key, #TooltipsEditor-name").focus(function () {
                that.lastFocusedElement = $(this);
                that.lastFocusedEditor = null;
            });

            $(".TooltipsEditor-insertFormat").click(function () {
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
                } else if (that.lastFocusedElement) that.lastFocusedElement.focus();
            });

            window.ace.tooltipsTextEditor = this.setupEditor("TooltipsEditor-text-AceEditor");
            window.ace.tooltipsTitleEditor = this.setupEditor("TooltipsEditor-title-AceEditor");

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
        },

        // helper functions for this.onClick
        luaTableToJson: function (s) {
            return api.post({
                action: "scribunto-console",
                title: mw.config.get("wgPageName"),
                question: "=mw.text.jsonEncode(p)",
                content: s,
            });
        },
        applyReplacements: function (s) {
            // [1.exit] json/preview format => lua data
            // inverse of this.processResult
            // note: double-backslash and escaped quotes are treated as one character
            // in json, they should be escaped again for lua to understand
            return s.replaceAll(/\\/g, '\\\\').replaceAll(/(['"])/g, "\\$1");
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
        editorCloseHandler: function () {
            this.closing = true;

            if (confirm("편집을 저장하고 편집기를 닫으시겠습니까?")) {
                this.modal.hide();
                mw.notify("성공적으로 편집이 진행되면 다른 팝업이 나타납니다.", {
                    title: "편집 진행 중",
                    type: "info",
                });
            } else return;

            var ret = [];

            Object.keys(this.data).sort().forEach(function (k) {
                var v = this.data[k];
                var otherparams = [];

                this.forEachInputBox(function (inter, i, otherinputboxes) {
                    var val = otherinputboxes[inter];
                    if (val.optional && (this.optionalParam(v[inter]) !== "")) {
                        otherparams.push(
                            inter + " = '" + (val.replace ? this.applyReplacements(v[inter]) : v[inter]) + "', "
                        );
                    } else if (!val.optional) {
                        otherparams.push(
                            v[inter] ? inter + " = '" + this.applyReplacements(v[inter]) + "', " : ""
                        );
                    }
                }.bind(this));

                ret.push(Array.prototype.concat(
                    "\t['" + k.replaceAll(/(['"])/g, "\\$1") + "'] = {",
                    otherparams,
                    v.title ? "title = '" + this.applyReplacements(v.title) + "', " : "",
                    v.text ? "text = '" + this.applyReplacements(v.text) + "', " : "",
                    "},"
                ).join(""));
            }.bind(this));

            ret = "return {\n" + ret.join("\n") + "\n}\n".replaceAll(/&amp;/g, "&");

            api.postWithEditToken({
                action: "edit",
                text: ret,
                title: mw.config.get("wgPageName"),
                summary: "툴팁 업데이트 (TooltipsEditor)",
                minor: true,
            }).then(function (d) {
                console.log(d);
                var saved = "newrevid" in d.edit;
                if (saved) {
                    mw.notify("", {
                        title: "툴팁이 저장되었습니다!",
                        type: "info"
                    });
                    // location.href = new mw.Title(mw.config.get("wgPageName"), -1).getUrl({
                    //    type: "revision",
                    //    diff: d.edit.newrevid,
                    //    oldid: d.edit.oldrevid,
                    //});

                    // Auto refresh lua cache on exit
                    that.refreshLuaCache();
                } else {
                    mw.notify("아무런 편집도 이루어지지 않았습니다.", {
                        title: "툴팁이 저장되었습니다!",
                        type: "info"
                    });
                }
            });
        },

        // main function this.onClick
        onClick: function (tooltips) {
            this.closing = false;

            $(window).on("beforeunload", function () {
                if (!this.closing)
                    return "정말 편집기를 닫고 편집을 취소하시겠습니까?";
            }.bind(this));

            this.modal.show({
                title: "툴팁 편집기",
                onHide: function () {
                    if (!this.closing && confirm("정말 편집기를 닫고 편집을 취소하시겠습니까?")) {
                        this.closing = true;
                        return true;
                    } else if (this.closing) return true;
                    else return false;
                }.bind(this),
                buttons: [{
                    text: "저장하고 닫기",
                    handler: this.editorCloseHandler.bind(this),
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
                    promises.push(this.luaTableToJson(ret));
                }
            } else {
                promises = [this.luaTableToJson(tooltips)];
            }

            $.when.apply($, promises).then(this.MainProcess.bind(this), function (code, e) {
                return alert("Failed to parse Tooltips: ", e), console.warn("Failed to parse Tooltips: ", e);
            }).catch(console.warn);
        },

        // entry point
        init: function () {
            $("<link>", {
                rel: "stylesheet",
                href: new mw.Title("Gadget-TooltipsEditor.css", 8).getUrl({
                    action: "raw",
                    ctype: "text/css"
                })
            }).appendTo("head");

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

                    this.deloadAll();
                    this.onClick(content);
                }.bind(this));
            }.bind(this));
        },
        secretDebugTool: function () {
            var it = prompt("Please enter an item to see its JSON");
            if (it !== null && it !== "") {
                if (it in this.json) {
                    mw.notify("See results in console.", {
                        title: "Debug: Found",
                        type: "warn"
                    });
                    console.log(this.json[it]);
                } else mw.notify("Item not found.", {
                    title: "Debug: Failed",
                    type: "warn"
                });
            }
        },
    });

    that = TooltipsEditor; // using "TooltipsEditor" and defining "that" here so the editor won't complain about it
    this.init();
}.bind((window.TooltipsEditor = window.TooltipsEditor || Object.create(null)))).catch(console.warn);