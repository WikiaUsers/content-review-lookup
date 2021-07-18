if (typeof window.nkch === "undefined") {
    const nkch = {};
    window.nkch = nkch;
};

if (typeof nkch.css === "undefined") nkch.css = {};

if (!nkch.css.isActive) {
    nkch.css.isActive = true;

    /* ~ versions of the scripts ~ */
    const versions = new Object();
    Object.defineProperties(versions, {
        "nkchCSS": {
            value: "2.4.0",
        },
        "codeMirror": {
            value: "5.62.0",
        },
        "jQueryUI": {
            value: "1.12.1",
        },
        "colorPicker": {
            value: "1.9.72",
        },
        "emmet": {
            value: "1.2.5",
        },
        "jsBeautify": {
            value: "1.14.0",
        }
    });
    Object.freeze(versions);
    nkch.css.versions = versions;

    /* ~ default options ~ */
    const options = new Object();
    Object.defineProperties(options, {
        "defaultHeight": {
            value: "300px",
            configurable: true,
            enumerable: true,
            writable: true
        },
        "defaultWidth": {
            value: "450px",
            configurable: true,
            enumerable: true,
            writable: true
        },
        "hideInfo": {
            value: false,
            configurable: true,
            enumerable: true,
            writable: true
        },
        "implementOnLoad": {
            value: false,
            configurable: true,
            enumerable: true,
            writable: true
        },
        "saveWithCookies": {
            value: false,
            configurable: true,
            enumerable: true,
            writable: true
        },
        "theme": {
            value: "default",
            configurable: true,
            enumerable: true,
            writable: true
        },
        "themes": {
            value: {
                light: "default",
                dark: "default"
            },
            configurable: true,
            enumerable: true,
            writable: true
        },
        "title": {
            value: "nkchCSS",
            configurable: true,
            enumerable: true,
            writable: true
        }
    });
    nkch.css.options = options;

    /* ~ elements ~ */
    nkch.css.el = {
        style: {
            $e: document.createElement("style")
        },
        main: {
            $e: document.createElement("div"),
            menu: {
                $e: document.createElement("div"),
                title: {
                    $e: document.createElement("div"),
                    text: {
                        $e: document.createElement("div")
                    },
                    info: {
                        $e: "..."
                    }
                },
                tools: {
                    $e: document.createElement("div"),
                    beautify: {
                        $e: document.createElement("button")
                    },
                    toggle: {
                        $e: document.createElement("button")
                    },
                    close: {
                        $e: document.createElement("button")
                    }
                }
            },
            textarea: {
                $e: document.createElement("div")
            }
        },
        toolbarButton: {
            $e: document.createElement("li"),
            link: {
                $e: document.createElement("a")
            }
        },
        communityBarButton: {
            $e: document.createElement("a")
        }
    };

    mw.loader.using(["mediawiki.util", "oojs-ui", "mediawiki.cookie"]).then(
        function () {
            /* ~ doing stuff ~ */
            mw.hook("dev.wds").add(
                function (wds) {
                    /* ~ check and define options ~ */
                    if (typeof nkch_css_configs !== "undefined") {
                        for (var key in options) {
                            if (nkch_css_configs.hasOwnProperty(key)) {
                                Object.defineProperty(options, key, {
                                    value: nkch_css_configs[key]
                                });
                            }
                        }
                    }

                    mw.loader.load("https://ajax.googleapis.com/ajax/libs/jqueryui/" + versions.jQueryUI + "/jquery-ui.css", "text/css");
                    mw.loader.getScript("https://ajax.googleapis.com/ajax/libs/jqueryui/" + versions.jQueryUI + "/jquery-ui.js").then(
                        function () {
                            nkch.css.isDisabled = false;
                            nkch.css.cookiesValue = "";

                            /* ~ style ~ */
                            document.head.appendChild(nkch.css.el.style.$e);

                            /* ~ main ~ */
                            nkch.css.el.main.$e.classList.add("nkch-css", "is-disabled");

                            mw.util.addCSS(".nkch-css {" +
                                "background-color: rgba(var(--theme-page-background-color--rgb), .7);" +
                                "backdrop-filter: blur(10px);" +
                                "border: 1px solid var(--theme-border-color);" +
                                "border-radius: 10px;" +
                                "bottom: 50px;" +
                                "height: " + options.defaultHeight + ";" +
                                "position: fixed;" +
                                "right: 20px;" +
                                "width: " + options.defaultWidth + ";" +
                                "z-index: 9999" +
                                "}");
                            mw.util.addCSS(".nkch-css.is-disabled { visibility: hidden; }");

                            document.body.after(nkch.css.el.main.$e);

                            $(nkch.css.el.main.$e).draggable({
                                cancel: ".nkch-css-text, .nkch-css-popup",
                                opacity: 0.8
                            }).resizable({
                                ghost: true,
                                handles: "nw, ne, se, sw",
                                minHeight: 300,
                                minWidth: 450
                            });

                            /* ~ main : menu ~ */
                            nkch.css.el.main.menu.$e.classList.add("nkch-css-menu");

                            mw.util.addCSS(".nkch-css-menu {" +
                                "align-items: center;" +
                                "color: var(--theme-page-text-color);" +
                                "cursor: default;" +
                                "display: flex;" +
                                "font-family: 'Rubik', sans-serif;" +
                                "font-size: 18px;" +
                                "justify-content: space-between;" +
                                "height: 44px;" +
                                "padding: 0 10px;" +
                                "}");

                            nkch.css.el.main.$e.appendChild(nkch.css.el.main.menu.$e);

                            /* ~ main : menu : title ~ */
                            nkch.css.el.main.menu.title.$e.classList.add("nkch-css-title");

                            mw.util.addCSS(".nkch-css-title { align-items: center; display: flex; max-width: 75%; }");

                            nkch.css.el.main.menu.$e.appendChild(nkch.css.el.main.menu.title.$e);

                            /* ~ main : menu : title : text ~ */
                            nkch.css.el.main.menu.title.text.$e.classList.add("nkch-css-title-text");

                            nkch.css.el.main.menu.title.text.$e.innerHTML = options.title;

                            mw.util.addCSS(".nkch-css-title-text { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }");

                            nkch.css.el.main.menu.title.$e.appendChild(nkch.css.el.main.menu.title.text.$e);

                            /* ~ main : menu : title : info ~ */
                            if (options.hideInfo === false) {
                                nkch.css.el.main.menu.title.info.$e = new OO.ui.PopupButtonWidget({
                                    classes: ["nkch-css-button", "nkch-css-title-info"],
                                    framed: false,
                                    icon: "info",
                                    popup: {
                                        $content: $("<div><a href='https://codemirror.net'>CodeMirror</a> v. " + versions.codeMirror +
                                            "<br><a href='https://jqueryui.com'>jQueryUI</a> v. " + versions.jQueryUI +
                                            "<br><a href='https://colorpicker.easylogic.studio'>ColorPicker</a> v. " + versions.colorPicker +
                                            "<br><a href='https://emmet.io'>Emmet</a> v. " + versions.emmet +
                                            "<br><a href='https://beautifier.io'>js-beautify</a> v. " + versions.jsBeautify +
                                            "</div>"),
                                        align: "center",
                                        classes: ["nkch-css-popup"],
                                        head: true,
                                        hideCloseButton: true,
                                        label: "nkchCSS v. " + versions.nkchCSS,
                                        padded: true
                                    }
                                });

                                mw.util.addCSS(".nkch-css-title-info > .oo-ui-buttonElement-button { padding: 5px 6px; }");
                                mw.util.addCSS(".nkch-css-popup { font-size: initial; z-index: 99999; }");
                                mw.util.addCSS(".nkch-css-popup .oo-ui-labelElement-label { font-size: initial; margin-bottom: 5px; }");
                                mw.util.addCSS(".nkch-css-popup .oo-ui-popupWidget-body { font-size: initial; }");
                                mw.util.addCSS(".nkch-css-popup .oo-ui-popupWidget-head > .oo-ui-buttonWidget > .oo-ui-buttonElement-button .oo-ui-icon-close { min-height: 18px; min-width: 18px; }");

                                nkch.css.el.main.menu.title.$e.appendChild(nkch.css.el.main.menu.title.info.$e.$element[0]);
                            }

                            /* ~ main : menu : tools ~ */
                            nkch.css.el.main.menu.tools.$e.classList.add("nkch-css-tools", "wds-button-group");

                            nkch.css.el.main.menu.$e.appendChild(nkch.css.el.main.menu.tools.$e);

                            /* ~ main : menu : tools : buttons ~ */
                            mw.util.addCSS(".nkch-css-tools .wds-button.wds-is-secondary { padding: 5px 6px; }");

                            /* ~ main : menu : tools : buttons : beautify ~ */
                            nkch.css.el.main.menu.tools.beautify.$e.id = "nkch-css-tools-button-beautify";
                            nkch.css.el.main.menu.tools.beautify.$e.classList.add("nkch-css-button", "wds-button", "wds-is-secondary");

                            nkch.css.el.main.menu.tools.beautify.$e.appendChild(wds.icon("star-small"));

                            nkch.css.el.main.menu.tools.$e.appendChild(nkch.css.el.main.menu.tools.beautify.$e);

                            /* ~ main : menu : tools : buttons : toggle ~ */
                            nkch.css.el.main.menu.tools.toggle.$e.id = "nkch-css-tools-button-toggle";
                            nkch.css.el.main.menu.tools.toggle.$e.classList.add("nkch-css-button", "wds-button", "wds-is-secondary");

                            nkch.css.el.main.menu.tools.toggle.$e.appendChild(wds.icon("eye-small"));
                            nkch.css.el.main.menu.tools.toggle.$e.querySelector("svg").style.fill = "var(--theme-success-color)";

                            nkch.css.el.main.menu.tools.$e.appendChild(nkch.css.el.main.menu.tools.toggle.$e);

                            /* ~ main : menu : tools : buttons : close ~ */
                            nkch.css.el.main.menu.tools.close.$e.id = "nkch-css-tools-button-close";
                            nkch.css.el.main.menu.tools.close.$e.classList.add("nkch-css-button", "wds-button", "wds-is-secondary");

                            nkch.css.el.main.menu.tools.close.$e.appendChild(wds.icon("close-small"));

                            mw.util.addCSS("#nkch-css-tools-button-close { border-color: var(--theme-alert-color); color: var(--theme-alert-color) }");
                            mw.util.addCSS("#nkch-css-tools-button-close:hover { border-color: var(--theme-alert-color--hover); color: var(--theme-alert-color--hover) }");

                            nkch.css.el.main.menu.tools.close.$e.addEventListener("click", function () {
                                nkch.actions.close();
                            });

                            nkch.css.el.main.menu.tools.$e.appendChild(nkch.css.el.main.menu.tools.close.$e);

                            /* ~ main : textarea ~ */
                            nkch.css.el.main.textarea.$e.classList.add("nkch-css-text");

                            mw.util.addCSS(".nkch-css-text { height: calc(100% - 44px); padding: 0 10px 10px 10px }");

                            nkch.css.el.main.$e.appendChild(nkch.css.el.main.textarea.$e);

                            if (mw.config.get("skin") === "fandomdesktop" || mw.config.get("skin") === "oasis") {
                                /* ~ toolbarButton ~ */
                                document.querySelector("#WikiaBar .toolbar .tools").appendChild(nkch.css.el.toolbarButton.$e);

                                /* ~ toolbarButton : link ~ */
                                nkch.css.el.toolbarButton.link.$e.classList.add("nkch-css-toolbar-button");

                                nkch.css.el.toolbarButton.link.$e.innerHTML = "nkchCSS";

                                mw.util.addCSS(".nkch-css-toolbar-button { cursor: pointer }");

                                nkch.css.el.toolbarButton.link.$e.addEventListener("click", function () {
                                    nkch.actions.open();
                                });

                                nkch.css.el.toolbarButton.$e.appendChild(nkch.css.el.toolbarButton.link.$e);

                            } else if (mw.config.get("skin") === "fandommobile") {
                                /* ~ communityBarButton ~ */
                                if (typeof document.querySelector(".wds-community-bar__discussions") !== "null") {
                                    document.querySelector(".wds-community-bar__discussions").before(nkch.css.el.communityBarButton.$e);
                                } else {
                                    document.querySelector(".wds-community-bar__navigation").before(nkch.css.el.communityBarButton.$e);
                                }

                                nkch.css.el.communityBarButton.$e.classList.add("wds-community-bar__nkchCSS");

                                nkch.css.el.communityBarButton.$e.addEventListener("click", function () {
                                    nkch.actions.open();
                                });

                                nkch.css.el.communityBarButton.$e.appendChild(wds.icon("preformat-small"));

                                mw.util.addCSS(".wds-community-bar__nkchCSS { align-items: center; color: inherit; cursor: pointer; display: flex; height: 44px; justify-content: center; width: 44px; }");
                            }

                            /* ~ load CCS ~ */
                            mw.loader.load("https://cdnjs.cloudflare.com/ajax/libs/codemirror/" + versions.codeMirror + "/codemirror.css", "text/css");
                            mw.loader.load("https://cdn.jsdelivr.net/npm/codemirror-colorpicker@" + versions.colorPicker + "/dist/codemirror-colorpicker.css", "text/css");

                            /* ~ themes ~ */
                            if (typeof options.themes === "object") {
                                if (typeof options.themes.light === "string" && options.themes.light !== "default") {
                                    mw.loader.load("https://cdnjs.cloudflare.com/ajax/libs/codemirror/" + versions.codeMirror + "/theme/" + options.themes.light + ".css", "text/css");
                                };

                                if (typeof options.themes.dark === "string" && options.themes.dark !== "default") {
                                    mw.loader.load("https://cdnjs.cloudflare.com/ajax/libs/codemirror/" + versions.codeMirror + "/theme/" + options.themes.dark + ".css", "text/css");
                                };
                            };

                            if (typeof options.theme === "string" && options.theme !== "default") {
                                mw.loader.load("https://cdnjs.cloudflare.com/ajax/libs/codemirror/" + versions.codeMirror + "/theme/" + options.theme + ".css", "text/css");
                            };

                            /* ~ load the scripts ~ */
                            mw.loader.getScript("https://cdnjs.cloudflare.com/ajax/libs/codemirror/" + versions.codeMirror + "/codemirror.js").then(
                                function () {
                                    Promise.all([
                                        mw.loader.getScript("https://cdnjs.cloudflare.com/ajax/libs/codemirror/" + versions.codeMirror + "/mode/css/css.js"),
                                        mw.loader.getScript("https://cdnjs.cloudflare.com/ajax/libs/codemirror/" + versions.codeMirror + "/addon/edit/closebrackets.js"),
                                        mw.loader.getScript("https://cdn.jsdelivr.net/npm/codemirror-colorpicker@" + versions.colorPicker + "/dist/codemirror-colorpicker.js"),
                                        mw.loader.getScript("https://cdn.jsdelivr.net/npm/emmet-codemirror@" + versions.emmet + "/dist/emmet.js"),
                                        mw.loader.getScript("https://cdnjs.cloudflare.com/ajax/libs/js-beautify/" + versions.jsBeautify + "/beautify-css.js")
                                    ]).then(
                                        function () {
                                            /* ~ CodeMirror editor ~ */
                                            const editorOptions = {
                                                mode: "css",
                                                indentUnit: 4,
                                                indentWithTabs: true,
                                                lineNumbers: true,
                                                lineWrapping: true,
                                                tabSize: 4,
                                                autoCloseBrackets: true,
                                                colorpicker: {
                                                    mode: "edit",
                                                    onChange: function () {
                                                        nkch.actions.updateCode(editor.getValue());
                                                    },
                                                    onLastUpdate: function () {
                                                        nkch.actions.updateCode(editor.getValue());
                                                    }
                                                },
                                                extraKeys: {
                                                    "Tab": "emmetExpandAbbreviation",
                                                    "Esc": "emmetResetAbbreviation",
                                                    "Enter": "emmetInsertLineBreak"
                                                }
                                            }

                                            /* ~ shiny themes ~ */
                                            if (typeof nkch_css_configs === "object" && typeof nkch_css_configs.themes === "object") {
                                                if (typeof options.themes === "object") {
                                                    if (document.body.classList.contains("theme-fandomdesktop-light")) {
                                                        if (typeof options.themes.light === "string") {
                                                            Object.assign(editorOptions, {
                                                                theme: options.themes.light
                                                            })
                                                        }
                                                    } else if (document.body.classList.contains("theme-fandomdesktop-dark")) {
                                                        if (typeof options.themes.dark === "string") {
                                                            Object.assign(editorOptions, {
                                                                theme: options.themes.dark
                                                            })
                                                        }
                                                    }
                                                }
                                            } else if (typeof options.theme === "string") {
                                                Object.assign(editorOptions, {
                                                    theme: options.theme
                                                })
                                            };

                                            /* ~ tasty cookies ~ */
                                            if (options.saveWithCookies === true) {
                                                if (mw.cookie.get("savedValue", "nkchCSS_") == null) {
                                                    nkch.css.cookiesValue = "";
                                                } else {
                                                    nkch.css.cookiesValue = mw.cookie.get("savedValue", "nkchCSS_");
                                                }

                                                Object.assign(editorOptions, {
                                                    value: nkch.css.cookiesValue
                                                })
                                            }

                                            /* ~ defining editor ~ */
                                            var editor = CodeMirror(nkch.css.el.main.textarea.$e, editorOptions);
                                            emmetCodeMirror(editor);

                                            mw.util.addCSS(".CodeMirror { border-radius: 5px; height: 100%; }");
                                            mw.util.addCSS(".codemirror-colorpicker { z-index: 99999 !important; }");

                                            if (typeof nkch_css_configs === "object" && typeof nkch_css_configs.themes === "object") {
                                                setInterval(
                                                    function () {
                                                        if (document.body.classList.contains("theme-fandomdesktop-light") && !document.body.classList.contains("theme-fandomdesktop-dark")) {
                                                            editor.setOption("theme", options.themes.light);
                                                        } else if (document.body.classList.contains("theme-fandomdesktop-dark") && !document.body.classList.contains("theme-fandomdesktop-light")) {
                                                            editor.setOption("theme", options.themes.dark);
                                                        }
                                                    },
                                                    1000
                                                );
                                            };

                                            /* ~ some actions ~ */
                                            nkch.css.el.main.menu.tools.toggle.$e.addEventListener("click", function () {
                                                nkch.actions.toggle(editor.getValue());
                                            });

                                            nkch.css.el.main.menu.tools.beautify.$e.addEventListener("click", function () {
                                                nkch.actions.beautify(editor.getValue());
                                            });

                                            const textarea = document.querySelector(".nkch-css .CodeMirror");

                                            textarea.addEventListener("keyup", function () {
                                                nkch.actions.updateCode(editor.getValue());
                                            });

                                            function preventUnload(e) {
                                                if (editor.getValue().length > 0) {
                                                    e.preventDefault();
                                                    e.returnValue = "";
                                                    return false;
                                                }
                                            }

                                            nkch.css.cookiePath = "/";

                                            if (mw.config.get("wgScriptPath") !== "") {
                                                nkch.css.cookiePath = mw.config.get("wgScriptPath");
                                            } else {
                                                nkch.css.cookiePath = "/wiki";
                                            }

                                            nkch.actions = {
                                                updateCode: function (css) {
                                                    if (nkch.css.isDisabled === false) {
                                                        nkch.css.el.style.$e.innerHTML = css;

                                                        if (options.saveWithCookies === true) {
                                                            mw.cookie.set("savedValue", css, {
                                                                prefix: "nkchCSS_",
                                                                domain: mw.config.get("wgServerName"),
                                                                path: nkch.css.cookiePath
                                                            })
                                                        }
                                                    }
                                                },
                                                open: function () {
                                                    nkch.css.el.main.$e.classList.remove("is-disabled");

                                                    if (options.saveWithCookies === false) {
                                                        window.addEventListener("beforeunload", preventUnload);
                                                    };
                                                },
                                                close: function () {
                                                    nkch.css.el.main.$e.classList.add("is-disabled");

                                                    if (options.saveWithCookies === false) {
                                                        window.removeEventListener("beforeunload", preventUnload);
                                                    };
                                                },
                                                toggle: function (css) {
                                                    switch (nkch.css.isDisabled) {
                                                        case true:
                                                            nkch.css.el.main.menu.tools.toggle.$e.querySelector("svg").remove();
                                                            nkch.css.el.main.menu.tools.toggle.$e.appendChild(wds.icon("eye-small"));
                                                            nkch.css.el.main.menu.tools.toggle.$e.querySelector("svg").style.fill = "var(--theme-success-color)";
                                                            nkch.css.el.style.$e.innerHTML = css;
                                                            nkch.css.isDisabled = false;
                                                            break;
                                                        case false:
                                                            nkch.css.el.main.menu.tools.toggle.$e.querySelector("svg").remove();
                                                            nkch.css.el.main.menu.tools.toggle.$e.appendChild(wds.icon("eye-crossed-small"));
                                                            nkch.css.el.main.menu.tools.toggle.$e.querySelector("svg").style.fill = "var(--theme-alert-color)";
                                                            nkch.css.el.style.$e.innerHTML = "";
                                                            nkch.css.isDisabled = true;
                                                            break;
                                                    }
                                                },
                                                beautify: function (css) {
                                                    var beautifiedCSS = css_beautify(css, {
                                                        indent_size: "1",
                                                        indent_char: "\t"
                                                    });
                                                    editor.setValue(beautifiedCSS);
                                                }
                                            };

                                            if (options.saveWithCookies === true && options.implementOnLoad === true) {
                                                nkch.actions.updateCode(nkch.css.cookiesValue);
                                            };
                                        }
                                    );
                                }
                            );
                        }
                    );
                }
            );

            /* ~ import stuff ~ */
            importArticle({
                type: "script",
                article: "u:dev:MediaWiki:WDSIcons/code.js"
            });
        }
    );
};