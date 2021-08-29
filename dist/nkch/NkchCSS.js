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
            value: "2.5.0",
        },
        "codeMirror": {
            value: "5.62.3",
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
            $e: document.createElement("style"),
            $classes: ["nkch-css__style"]
        },
        main: {
            $e: document.createElement("div"),
            $classes: ["nkch-css"],
            menu: {
                $e: document.createElement("div"),
                $classes: ["nkch-css__menu"],
                title: {
                    $e: document.createElement("div"),
                    $classes: ["nkch-css__title"],
                    text: {
                        $e: document.createElement("div"),
                        $classes: ["nkch-css__title-text"]
                    },
                    info: {
                        $e: "...",
                        $classes: ["nkch-css__title-info"]
                    }
                },
                tools: {
                    $e: document.createElement("div"),
                    $classes: ["nkch-css__tools", "wds-button-group"],
                    beautify: {
                        $e: document.createElement("button"),
                        $classes: ["nkch-css__button", "nkch-css__tools-button", "nkch-css__tools-button--beautify", "wds-button", "wds-is-secondary"]
                    },
                    toggle: {
                        $e: document.createElement("button"),
                        $classes: ["nkch-css__button", "nkch-css__tools-button", "nkch-css__tools-button--toggle", "wds-button", "wds-is-secondary"]
                    },
                    close: {
                        $e: document.createElement("button"),
                        $classes: ["nkch-css__button", "nkch-css__tools-button", "nkch-css__tools-button--close", "wds-button", "wds-is-secondary"]
                    }
                }
            },
            textarea: {
                $e: document.createElement("div"),
                $classes: ["nkch-css__text"]
            }
        },
        toolbarButton: {
            $e: document.createElement("li"),
            $classes: ["nkch-css__toolbar-button"],
            link: {
                $e: document.createElement("a"),
                $classes: ["nkch-css__toolbar-button-link"]
            }
        },
        communityBarButton: {
            $e: document.createElement("a"),
            $classes: ["nkch-css__community-bar-button", "wds-community-bar__nkchCSS"]
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

                    /* ~ latest jQueryUI (just in case) ~ */
                    mw.loader.load("https://ajax.googleapis.com/ajax/libs/jqueryui/" + versions.jQueryUI + "/jquery-ui.css", "text/css");
                    mw.loader.getScript("https://ajax.googleapis.com/ajax/libs/jqueryui/" + versions.jQueryUI + "/jquery-ui.js").then(
                        function () {
                            nkch.css.isDisabled = false;
                            nkch.css.cookiesValue = "";

                            function addClasses(element) {
                                element.$classes.forEach(function (c) {
                                    element.$e.classList.add(c)
                                });
                            }

                            /* ~ style ~ */
                            nkch.css.el.style.$e.setAttribute("type", "text/css");
                            addClasses(nkch.css.el.style);

                            document.head.appendChild(nkch.css.el.style.$e);

                            /* ~ main ~ */
                            addClasses(nkch.css.el.main);
                            nkch.css.el.main.$e.classList.add("is-disabled");

                            document.body.after(nkch.css.el.main.$e);

                            $(nkch.css.el.main.$e).draggable({
                                cancel: ".nkch-css__text, .nkch-css__popup",
                                opacity: 0.8
                            }).resizable({
                                ghost: true,
                                handles: "nw, ne, se, sw",
                                minHeight: 300,
                                minWidth: 450
                            });

                            Object.assign(nkch.css.el.main.$e.style, {
                                position: "fixed",
                                height: options.defaultHeight,
                                width: options.defaultWidth
                            });

                            /* ~ main : menu ~ */
                            addClasses(nkch.css.el.main.menu);

                            nkch.css.el.main.$e.appendChild(nkch.css.el.main.menu.$e);

                            /* ~ main : menu : title ~ */
                            addClasses(nkch.css.el.main.menu.title);

                            nkch.css.el.main.menu.$e.appendChild(nkch.css.el.main.menu.title.$e);

                            /* ~ main : menu : title : text ~ */
                            addClasses(nkch.css.el.main.menu.title.text);

                            nkch.css.el.main.menu.title.text.$e.innerHTML = options.title;

                            nkch.css.el.main.menu.title.$e.appendChild(nkch.css.el.main.menu.title.text.$e);

                            /* ~ main : menu : title : info ~ */
                            if (options.hideInfo === false) {
                                nkch.css.el.main.menu.title.info.$e = new OO.ui.PopupButtonWidget({
                                    classes: ["nkch-css__title-info"],
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
                                        classes: ["nkch-css__popup"],
                                        head: true,
                                        hideCloseButton: true,
                                        label: "nkchCSS v. " + versions.nkchCSS,
                                        padded: true
                                    }
                                });

                                nkch.css.el.main.menu.title.$e.appendChild(nkch.css.el.main.menu.title.info.$e.$element[0]);
                            }

                            /* ~ main : menu : tools ~ */
                            addClasses(nkch.css.el.main.menu.tools);

                            nkch.css.el.main.menu.$e.appendChild(nkch.css.el.main.menu.tools.$e);

                            /* ~ main : menu : tools : buttons ~ */

                            /* ~ main : menu : tools : buttons : beautify ~ */
                            addClasses(nkch.css.el.main.menu.tools.beautify);

                            nkch.css.el.main.menu.tools.beautify.$e.appendChild(wds.icon("star-small"));

                            nkch.css.el.main.menu.tools.$e.appendChild(nkch.css.el.main.menu.tools.beautify.$e);

                            /* ~ main : menu : tools : buttons : toggle ~ */
                            addClasses(nkch.css.el.main.menu.tools.toggle);

                            nkch.css.el.main.menu.tools.toggle.$e.appendChild(wds.icon("eye-small"));
                            nkch.css.el.main.menu.tools.toggle.$e.querySelector("svg").style.fill = "var(--theme-success-color)";

                            nkch.css.el.main.menu.tools.$e.appendChild(nkch.css.el.main.menu.tools.toggle.$e);

                            /* ~ main : menu : tools : buttons : close ~ */
                            addClasses(nkch.css.el.main.menu.tools.close);

                            nkch.css.el.main.menu.tools.close.$e.appendChild(wds.icon("close-small"));

                            nkch.css.el.main.menu.tools.close.$e.addEventListener("click", function () {
                                nkch.css.actions.close();
                            });

                            nkch.css.el.main.menu.tools.$e.appendChild(nkch.css.el.main.menu.tools.close.$e);

                            /* ~ main : textarea ~ */
                            addClasses(nkch.css.el.main.textarea);

                            nkch.css.el.main.$e.appendChild(nkch.css.el.main.textarea.$e);

                            if (mw.config.get("skin") === "fandomdesktop" || mw.config.get("skin") === "oasis") {
                                /* ~ toolbarButton ~ */
                                addClasses(nkch.css.el.toolbarButton);

                                document.querySelector("#WikiaBar .toolbar .tools").appendChild(nkch.css.el.toolbarButton.$e);

                                /* ~ toolbarButton : link ~ */
                                addClasses(nkch.css.el.toolbarButton.link);

                                nkch.css.el.toolbarButton.link.$e.innerHTML = "nkchCSS";

                                nkch.css.el.toolbarButton.link.$e.addEventListener("click", function () {
                                    nkch.css.actions.open();
                                });

                                nkch.css.el.toolbarButton.$e.appendChild(nkch.css.el.toolbarButton.link.$e);

                            } else if (mw.config.get("skin") === "fandommobile") {
                                /* ~ communityBarButton ~ */
                                if (typeof document.querySelector(".wds-community-bar__discussions") !== "null") {
                                    document.querySelector(".wds-community-bar__discussions").before(nkch.css.el.communityBarButton.$e);
                                } else {
                                    document.querySelector(".wds-community-bar__navigation").before(nkch.css.el.communityBarButton.$e);
                                }

                                addClasses(nkch.css.el.communityBarButton);

                                nkch.css.el.communityBarButton.$e.addEventListener("click", function () {
                                    nkch.css.actions.open();
                                });

                                nkch.css.el.communityBarButton.$e.appendChild(wds.icon("preformat-small"));

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
                                                        nkch.css.actions.updateCode(editor.getValue());
                                                    },
                                                    onLastUpdate: function () {
                                                        nkch.css.actions.updateCode(editor.getValue());
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
                                                    switch (mw.config.get("isDarkTheme")) {
                                                        case false:
                                                            if (typeof options.themes.light === "string") {
                                                                Object.assign(editorOptions, {
                                                                    theme: options.themes.light
                                                                })
                                                            }
                                                            break;
                                                        case true:
                                                            if (typeof options.themes.dark === "string") {
                                                                Object.assign(editorOptions, {
                                                                    theme: options.themes.dark
                                                                })
                                                            }
                                                            break;
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

                                            if (typeof nkch_css_configs === "object" && typeof nkch_css_configs.themes === "object") {
                                                setInterval(
                                                    function () {
                                                        switch (mw.config.get("isDarkTheme")) {
                                                            case false:
                                                                editor.setOption("theme", options.themes.light);
                                                                break;
                                                            case true:
                                                                editor.setOption("theme", options.themes.dark);
                                                                break;
                                                        }
                                                    },
                                                    1000
                                                );
                                            };

                                            /* ~ some actions ~ */
                                            nkch.css.el.main.menu.tools.toggle.$e.addEventListener("click", function () {
                                                nkch.css.actions.toggle(editor.getValue());
                                            });

                                            nkch.css.el.main.menu.tools.beautify.$e.addEventListener("click", function () {
                                                nkch.css.actions.beautify(editor.getValue());
                                            });

                                            const textarea = document.querySelector(".nkch-css .CodeMirror");
                                            textarea.classList.add("nkch-css__editor");

                                            textarea.addEventListener("keyup", function () {
                                                nkch.css.actions.updateCode(editor.getValue());
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

                                            nkch.css.actions = {
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
                                                nkch.css.actions.updateCode(nkch.css.cookiesValue);
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
            importArticles({
                type: "script",
                article: "u:dev:MediaWiki:WDSIcons/code.js"
            }, {
                type: "style",
                article: "u:nkch:MediaWiki:nkchCSS.css"
            });
        }
    );
};