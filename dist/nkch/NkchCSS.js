var nkch = window.nkch ? window.nkch : {};
window.nkch = nkch;

nkch.css = nkch.css ? nkch.css : {};

if (!nkch.css.isActive) {
    nkch.css.isActive = true;
    nkch.css.isDisabled = false;
    nkch.css.currentTheme = "";

    nkch.css.cookiePath = mw.config.get("wgScriptPath") !== "" ? mw.config.get("wgScriptPath") : "/wiki";

    function preventUnload(e) {
        if (editor.getValue().length > 0) {
            e.preventDefault();
            e.returnValue = "";
            return false;
        }
    }

    /* ~ --- ~ versions ~ --- ~ */
    const versions = new Object();

    function setVersion(key, value) {
        Object.defineProperty(versions, key, {
            value: value,
        });
    };

    setVersion("nkchCSS", "3.0.2");
    setVersion("codeMirror", "5.65.4");
    setVersion("jQueryUI", "1.13.1");
    setVersion("colorPicker", "1.9.72");
    setVersion("emmet", "1.2.5");
    setVersion("jsBeautify", "1.14.3");
    setVersion("less", "4.1.2");
    setVersion("sass", "0.11.1");

    Object.freeze(versions);
    nkch.css.versions = versions;

    /* ~ --- ~ options ~ --- ~ */
    const options = new Object();

    function setOption(key, value) {
        Object.defineProperty(options, key, {
            value: value,
            configurable: true,
            enumerable: true,
            writable: true
        });
    };

    setOption("defaultHeight", "300px");
    setOption("defaultWidth", "450px");
    setOption("hideInfo", false);
    setOption("implementOnLoad", false);
    setOption("saveWithCookies", false);
    setOption("theme", "default");
    setOption("themes", {
        light: "default",
        dark: "default"
    });
    setOption("title", "nkchCSS");
    setOption("saveWithCookies", false);
    setOption("useAnimations", true);
    setOption("useLess", false);
    setOption("useSass", false);

    nkch.css.options = options;

    if (typeof nkch_css_configs !== "undefined") {
        for (var key in options) {
            if (nkch_css_configs.hasOwnProperty(key)) {
                setOption(key, nkch_css_configs[key]);
            }
        }
    }

    /* ~ --- ~ elements ~ --- ~ */
    nkch.css.el = {
        styles: {
            css: {
                $e: document.createElement("style"),
                $classes: ["nkch-css__style", "nkch-css__style--css"]
            },
            less: {
                $e: document.createElement("style"),
                $classes: ["nkch-css__style", "nkch-css__style--less"]
            },
            sass: {
                $e: document.createElement("style"),
                $classes: ["nkch-css__style", "nkch-css__style--sass"]
            },
        },
        theme: {
            $e: document.createElement("link"),
            $classes: ["nkch-css__theme"]
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
            content: {
                $e: document.createElement("div"),
                $classes: ["nkch-css__content"]
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

    /* ~ --- ~ add classes from array ~ --- ~ */
    function addClasses(element) {
        element.$classes.forEach(
            function (c) {
                element.$e.classList.add(c);
            }
        );
    }

    /* ~ --- ~ set theme as a link ~ --- ~ */
    function setTheme(theme) {
        switch (theme !== "default") {
            case true:
                nkch.css.el.theme.$e.setAttribute("href", "https://cdnjs.cloudflare.com/ajax/libs/codemirror/" + versions.codeMirror + "/theme/" + theme + ".css");
                break;
            case false:
                nkch.css.el.theme.$e.removeAttribute("href");
                break;
        }
    }

    /* ~ --- ~ style : css ~ --- ~ */
    addClasses(nkch.css.el.styles.css);
    nkch.css.el.styles.css.$e.setAttribute("type", "text/css");

    document.head.append(nkch.css.el.styles.css.$e);

    /* ~ --- ~ style : less ~ --- ~ */
    if (options.useLess) {
        addClasses(nkch.css.el.styles.less);
        nkch.css.el.styles.less.$e.setAttribute("type", "text/x-less");
        nkch.css.el.styles.less.$e.setAttribute("media", "not all");

        document.head.append(nkch.css.el.styles.less.$e);
    }

    /* ~ --- ~ style : sass ~ --- ~ */
    if (options.useSass) {
        addClasses(nkch.css.el.styles.sass);
        nkch.css.el.styles.sass.$e.setAttribute("type", "text/x-scss");
        nkch.css.el.styles.sass.$e.setAttribute("media", "not all");

        document.head.append(nkch.css.el.styles.sass.$e);
    }

    /* ~ --- ~ theme ~ --- ~ */
    addClasses(nkch.css.el.theme);
    nkch.css.el.theme.$e.setAttribute("rel", "stylesheet");

    document.head.append(nkch.css.el.theme.$e);

    /* ~ --- ~ load these useless sassy preprocessors (or do not) ~ --- ~ */
    mw.loader.using(["mediawiki.cookie", "mediawiki.notification", "mediawiki.util", "oojs-ui"], function () {
        switch (options.useLess || options.useSass) {
            case true:
                const loadPreprocessors = [];

                if (options.useLess) loadPreprocessors.push(mw.loader.getScript("https://cdnjs.cloudflare.com/ajax/libs/less.js/" + versions.less + "/less.js"));
                if (options.useSass) loadPreprocessors.push(mw.loader.getScript("https://cdnjs.cloudflare.com/ajax/libs/sass.js/" + versions.sass + "/sass.js"),
                    mw.loader.getScript("https://cdnjs.cloudflare.com/ajax/libs/sass.js/" + versions.sass + "/sass.worker.js")
                );

                switch (loadPreprocessors.length > 0) {
                    case true:
                        Promise.all(loadPreprocessors).then(
                            function () {
                                init();
                            }
                        )
                        break;
                    case false:
                        init();
                        break;
                }
                break;
            case false:
                init();
                break;
        };
    });

    function init() {
        mw.loader.load("https://code.jquery.com/ui/" + versions.jQueryUI + "/themes/base/jquery-ui.css", "text/css");
        mw.loader.getScript("https://code.jquery.com/ui/" + versions.jQueryUI + "/jquery-ui.js").then(
            function () {
                mw.hook("dev.wds").add(
                    function (wds) {
                        nkch.css.actions = {
                            updateCode: function (css, type) {
                                if (!nkch.css.isDisabled) {
                                    switch (type) {
                                        default:
                                        case "css":
                                            nkch.css.el.styles.css.$e.innerHTML = css;

                                            if (options.saveWithCookies) {
                                                mw.cookie.set("savedValue", css, {
                                                    prefix: "nkchCSS_",
                                                    domain: mw.config.get("wgServerName"),
                                                    path: nkch.css.cookiePath
                                                });
                                            }
                                            break;
                                        case "less":
                                            nkch.css.el.styles.less.$e.innerHTML = css;

                                            if (options.saveWithCookies) {
                                                mw.cookie.set("savedValue_less", css, {
                                                    prefix: "nkchCSS_",
                                                    domain: mw.config.get("wgServerName"),
                                                    path: nkch.css.cookiePath
                                                });
                                            }
                                            break;
                                        case "sass":
                                            nkch.css.el.styles.sass.$e.innerHTML = css;

                                            if (options.saveWithCookies) {
                                                mw.cookie.set("savedValue_sass", css, {
                                                    prefix: "nkchCSS_",
                                                    domain: mw.config.get("wgServerName"),
                                                    path: nkch.css.cookiePath
                                                });
                                            }
                                            break;
                                    }

                                    var changeEvent = new Event("nkch-css-change");
                                    nkch.css.el.main.$e.dispatchEvent(changeEvent);
                                }
                            },
                            open: function () {
                                switch (options.useAnimations) {
                                    case true:
                                        nkch.css.el.main.$e.classList.remove("is-disabled");

                                        const openAnimation = nkch.css.el.main.$e.animate([{
                                            opacity: 0,
                                            transform: "translateY(10px)"
                                        }, {
                                            opacity: 1,
                                            transform: "translateY(0)"
                                        }], {
                                            easing: "ease",
                                            duration: 300
                                        });
                                        break;
                                    case false:
                                        nkch.css.el.main.$e.classList.remove("is-disabled");
                                        break;
                                }

                                if (!options.saveWithCookies) {
                                    window.addEventListener("beforeunload", preventUnload, false);
                                };

                                var openEvent = new Event("nkch-css-open");
                                nkch.css.el.main.$e.dispatchEvent(openEvent);
                            },
                            close: function () {
                                switch (options.useAnimations) {
                                    case true:
                                        const closeAnimation = nkch.css.el.main.$e.animate([{
                                            opacity: 1,
                                            transform: "translateY(0)"
                                        }, {
                                            opacity: 0,
                                            transform: "translateY(10px)"
                                        }], {
                                            easing: "ease",
                                            duration: 300
                                        });

                                        closeAnimation.onfinish = function () {
                                            nkch.css.el.main.$e.classList.add("is-disabled");
                                        };
                                        break;
                                    case false:
                                        nkch.css.el.main.$e.classList.add("is-disabled");
                                        break;
                                };

                                if (!options.saveWithCookies) {
                                    window.removeEventListener("beforeunload", preventUnload);
                                };

                                var closeEvent = new Event("nkch-css-close");
                                nkch.css.el.main.$e.dispatchEvent(closeEvent);
                            },
                            toggle: function (css) {
                                switch (nkch.css.isDisabled) {
                                    case true:
                                        nkch.css.el.main.menu.tools.toggle.$e.querySelector("svg").remove();
                                        nkch.css.el.main.menu.tools.toggle.$e.appendChild(wds.icon("eye-small"));
                                        nkch.css.el.main.menu.tools.toggle.$e.querySelector("svg").style.fill = "var(--theme-success-color)";
                                        nkch.css.el.styles.css.$e.innerHTML = css;
                                        nkch.css.isDisabled = false;
                                        break;
                                    case false:
                                        nkch.css.el.main.menu.tools.toggle.$e.querySelector("svg").remove();
                                        nkch.css.el.main.menu.tools.toggle.$e.appendChild(wds.icon("eye-crossed-small"));
                                        nkch.css.el.main.menu.tools.toggle.$e.querySelector("svg").style.fill = "var(--theme-alert-color)";
                                        nkch.css.el.styles.css.$e.innerHTML = "";
                                        nkch.css.isDisabled = true;
                                        break;
                                }

                                var toggleEvent = new Event("nkch-css-toggle");
                                nkch.css.el.main.$e.dispatchEvent(toggleEvent);
                            },
                            beautify: function (css, editor) {
                                var beautifiedCSS = css_beautify(css, {
                                    indent_size: "1",
                                    indent_char: "\t"
                                });

                                switch (typeof editor != "undefined") {
                                    case true:
                                        editor.setValue(beautifiedCSS);
                                        break;
                                    case false:
                                        nkch.css.editors.css.setValue(beautifiedCSS);
                                        break;
                                }

                                var beautifyEvent = new Event("nkch-css-beautify");
                                nkch.css.el.main.$e.dispatchEvent(beautifyEvent);
                            }
                        };

                        /* ~ --- ~ main ~ --- ~ */
                        addClasses(nkch.css.el.main);
                        nkch.css.el.main.$e.classList.add("is-disabled");

                        document.body.after(nkch.css.el.main.$e);
                        document.body.classList.add("nkch-css__is-added");

                        $(nkch.css.el.main.$e).draggable({
                            cancel: ".nkch-css__content, .nkch-css__popup, .nkch-css__button",
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

                        /* ~ --- ~ main : menu ~ --- ~ */
                        addClasses(nkch.css.el.main.menu);

                        nkch.css.el.main.$e.append(nkch.css.el.main.menu.$e);

                        /* ~ --- ~ main : menu : title ~ --- ~ */
                        addClasses(nkch.css.el.main.menu.title);

                        nkch.css.el.main.menu.$e.append(nkch.css.el.main.menu.title.$e);

                        /* ~ --- ~ main : menu : title : text ~ --- ~ */
                        addClasses(nkch.css.el.main.menu.title.text);

                        nkch.css.el.main.menu.title.text.$e.innerHTML = options.title;

                        nkch.css.el.main.menu.title.$e.append(nkch.css.el.main.menu.title.text.$e);

                        /* ~ --- ~ main : menu : title : info ~ --- ~ */
                        if (!options.hideInfo) {
                            nkch.css.el.main.menu.title.info.$e = new OO.ui.PopupButtonWidget({
                                classes: ["nkch-css__title-info"],
                                framed: false,
                                icon: "info",
                                popup: {
                                    $content: $("<div class='nkch-css__dependencies'>" +
                                        "<a target='_blank' rel='noopener noreferrer' href='https://codemirror.net'>CodeMirror</a> v. " + versions.codeMirror + "<br>" +
                                        "<a target='_blank' rel='noopener noreferrer' href='https://jqueryui.com'>jQuery UI</a> v. " + versions.jQueryUI + "<br>" +
                                        "<a target='_blank' rel='noopener noreferrer' href='https://colorpicker.easylogic.studio'>ColorPicker</a> v. " + versions.colorPicker + "<br>" +
                                        "<a target='_blank' rel='noopener noreferrer' href='https://emmet.io'>Emmet</a> v. " + versions.emmet + "<br>" +
                                        "<a target='_blank' rel='noopener noreferrer' href='https://beautifier.io'>js-beautify</a> v. " + versions.jsBeautify +
                                        "</div>"),
                                    align: "center",
                                    classes: ["nkch-css__popup"],
                                    head: true,
                                    hideCloseButton: true,
                                    label: "nkchCSS v. " + versions.nkchCSS,
                                    padded: true
                                }
                            });

                            nkch.css.el.main.menu.title.$e.append(nkch.css.el.main.menu.title.info.$e.$element[0]);
                        }

                        /* ~ --- ~ main : menu : tools ~ --- ~ */
                        addClasses(nkch.css.el.main.menu.tools);

                        nkch.css.el.main.menu.$e.append(nkch.css.el.main.menu.tools.$e);

                        /* ~ --- ~ main : menu : tools : buttons ~ --- ~ */

                        /* ~ --- ~ main : menu : tools : buttons : beautify ~ --- ~ */
                        addClasses(nkch.css.el.main.menu.tools.beautify);

                        nkch.css.el.main.menu.tools.beautify.$e.append(wds.icon("star-small"));

                        nkch.css.el.main.menu.tools.$e.append(nkch.css.el.main.menu.tools.beautify.$e);

                        nkch.css.el.main.menu.tools.beautify.$e.addEventListener("click", function () {
                            if (options.useLess || options.useSass) {
                                switch (tabs.getCurrentTabPanelName()) {
                                    case "css":
                                        nkch.css.actions.beautify(nkch.css.editors.css.getValue(), nkch.css.editors.css);
                                        break;
                                    case "less":
                                        nkch.css.actions.beautify(nkch.css.editors.less.getValue(), nkch.css.editors.less);
                                        break;
                                    case "sass":
                                        nkch.css.actions.beautify(nkch.css.editors.sass.getValue(), nkch.css.editors.sass);
                                        break;
                                }
                            } else {
                                nkch.css.actions.beautify(nkch.css.editors.css.getValue(), nkch.css.editors.css);
                            }
                        }, false);

                        /* ~ --- ~ main : menu : tools : buttons : toggle ~ --- ~ */
                        addClasses(nkch.css.el.main.menu.tools.toggle);

                        nkch.css.el.main.menu.tools.toggle.$e.append(wds.icon("eye-small"));
                        nkch.css.el.main.menu.tools.toggle.$e.querySelector("svg").style.fill = "var(--theme-success-color)";

                        nkch.css.el.main.menu.tools.$e.append(nkch.css.el.main.menu.tools.toggle.$e);

                        nkch.css.el.main.menu.tools.toggle.$e.addEventListener("click", function () {
                            nkch.css.actions.toggle(nkch.css.editors.css.getValue());
                        }, false);

                        /* ~ --- ~ main : menu : tools : buttons : close ~ --- ~ */
                        addClasses(nkch.css.el.main.menu.tools.close);

                        nkch.css.el.main.menu.tools.close.$e.append(wds.icon("close-small"));

                        nkch.css.el.main.menu.tools.close.$e.addEventListener("click", function () {
                            nkch.css.actions.close();
                        }, false);

                        nkch.css.el.main.menu.tools.$e.append(nkch.css.el.main.menu.tools.close.$e);

                        /* ~ --- ~ main : content ~ --- ~ */
                        addClasses(nkch.css.el.main.content);

                        nkch.css.el.main.$e.append(nkch.css.el.main.content.$e);

                        var inputCSS = new OO.ui.MultilineTextInputWidget({
                            autosize: true,
                            classes: ["nkch-css__textarea"]
                        });

                        var tabCSS = new OO.ui.TabPanelLayout("css", {
                            label: "CSS",
                            expanded: false,
                            content: [inputCSS]
                        });

                        if (options.useLess) {
                            var inputLess = new OO.ui.MultilineTextInputWidget({
                                autosize: true,
                                classes: ["nkch-css__textarea"]
                            });

                            var compileLess = new OO.ui.ButtonInputWidget({
                                classes: ["nkch-css__compile-button"],
                                label: "Less → CSS"
                            });

                            var tabLess = new OO.ui.TabPanelLayout("less", {
                                label: "Less",
                                expanded: false,
                                content: [compileLess, inputLess]
                            });
                        }

                        if (options.useSass) {
                            var inputSass = new OO.ui.MultilineTextInputWidget({
                                autosize: true,
                                classes: ["nkch-css__textarea"]
                            });

                            var compileSass = new OO.ui.ButtonInputWidget({
                                classes: ["nkch-css__compile-button"],
                                label: "SCSS → CSS"
                            });

                            var tabSass = new OO.ui.TabPanelLayout("sass", {
                                label: new OO.ui.HtmlSnippet("Sass<sup style='vertical-align: super; font-size: 9px;'>(SCSS)</sup>"),
                                expanded: false,
                                content: [compileSass, inputSass]
                            });
                        }

                        if (options.useLess || options.useSass) {
                            var tabs = new OO.ui.IndexLayout({
                                expanded: false
                            });

                            tabs.addTabPanels([tabCSS]);
                            if (options.useLess) tabs.addTabPanels([tabLess]);
                            if (options.useSass) tabs.addTabPanels([tabSass]);

                            $(nkch.css.el.main.content.$e).append(tabs.$element);
                        } else {
                            $(nkch.css.el.main.content.$e).append(inputCSS.$element);
                        }

                        switch (mw.config.get("skin")) {
                            case "fandomdesktop":
                                /* ~ toolbarButton ~ */
                                addClasses(nkch.css.el.toolbarButton);

                                document.querySelector("#WikiaBar .toolbar .tools").append(nkch.css.el.toolbarButton.$e);

                                /* ~ toolbarButton : link ~ */
                                addClasses(nkch.css.el.toolbarButton.link);

                                nkch.css.el.toolbarButton.link.$e.innerHTML = "nkchCSS";

                                nkch.css.el.toolbarButton.link.$e.setAttribute("type", "button");
                                nkch.css.el.toolbarButton.link.$e.setAttribute("disabled", true);

                                nkch.css.el.toolbarButton.$e.append(nkch.css.el.toolbarButton.link.$e);
                                break;
                            case "fandommobile":
                                /* ~ communityBarButton ~ */
                                switch (typeof document.querySelector(".wds-community-bar__discussions") !== "null") {
                                    case true:
                                        document.querySelector(".wds-community-bar__discussions").before(nkch.css.el.communityBarButton.$e);
                                        break;
                                    case false:
                                        document.querySelector(".wds-community-bar__navigation").before(nkch.css.el.communityBarButton.$e);
                                        break;
                                }

                                addClasses(nkch.css.el.communityBarButton);

                                nkch.css.el.communityBarButton.$e.append(wds.icon("preformat-small"));
                                break;
                        };

                        mw.loader.load("https://cdnjs.cloudflare.com/ajax/libs/codemirror/" + versions.codeMirror + "/codemirror.css", "text/css");
                        mw.loader.load("https://cdnjs.cloudflare.com/ajax/libs/codemirror/" + versions.codeMirror + "/addon/hint/show-hint.css", "text/css");
                        mw.loader.load("https://cdn.jsdelivr.net/npm/codemirror-colorpicker@" + versions.colorPicker + "/dist/codemirror-colorpicker.css", "text/css");

                        mw.loader.getScript("https://cdnjs.cloudflare.com/ajax/libs/codemirror/" + versions.codeMirror + "/codemirror.js").then(
                            function () {
                                Promise.all([
                                    mw.loader.getScript("https://cdnjs.cloudflare.com/ajax/libs/codemirror/" + versions.codeMirror + "/mode/css/css.js"),
                                    mw.loader.getScript("https://cdnjs.cloudflare.com/ajax/libs/codemirror/" + versions.codeMirror + "/addon/edit/closebrackets.js"),
                                    mw.loader.getScript("https://cdnjs.cloudflare.com/ajax/libs/codemirror/" + versions.codeMirror + "/addon/hint/show-hint.js"),
                                    mw.loader.getScript("https://cdnjs.cloudflare.com/ajax/libs/codemirror/" + versions.codeMirror + "/addon/hint/css-hint.js"),
                                    mw.loader.getScript("https://cdn.jsdelivr.net/npm/codemirror-colorpicker@" + versions.colorPicker + "/dist/codemirror-colorpicker.js"),
                                    mw.loader.getScript("https://cdn.jsdelivr.net/npm/emmet-codemirror@" + versions.emmet + "/dist/emmet.js"),
                                    mw.loader.getScript("https://cdnjs.cloudflare.com/ajax/libs/js-beautify/" + versions.jsBeautify + "/beautify-css.js")
                                ]).then(
                                    function () {
                                        const editorOptions = {
                                            indentUnit: 4,
                                            indentWithTabs: true,
                                            lineNumbers: true,
                                            lineWrapping: true,
                                            tabSize: 4,
                                            autoCloseBrackets: true,
                                            colorpicker: {
                                                mode: "edit",
                                                onChange: function () {
                                                    if (options.useLess || options.useSass) {
                                                        switch (tabs.getCurrentTabPanelName()) {
                                                            case "css":
                                                                nkch.css.actions.updateCode(nkch.css.editors.css.getValue(), "css");
                                                                break;
                                                            case "less":
                                                                nkch.css.actions.updateCode(nkch.css.editors.less.getValue(), "less");
                                                                break;
                                                            case "sass":
                                                                nkch.css.actions.updateCode(nkch.css.editors.sass.getValue(), "sass");
                                                                break;
                                                        }
                                                    } else {
                                                        nkch.css.actions.updateCode(nkch.css.editors.css.getValue(), "css");
                                                    }
                                                },
                                                onLastUpdate: function () {
                                                    if (options.useLess || options.useSass) {
                                                        switch (tabs.getCurrentTabPanelName()) {
                                                            case "css":
                                                                nkch.css.actions.updateCode(nkch.css.editors.css.getValue(), "css");
                                                                break;
                                                            case "less":
                                                                nkch.css.actions.updateCode(nkch.css.editors.less.getValue(), "less");
                                                                break;
                                                            case "sass":
                                                                nkch.css.actions.updateCode(nkch.css.editors.sass.getValue(), "sass");
                                                                break;
                                                        }
                                                    } else {
                                                        nkch.css.actions.updateCode(nkch.css.editors.css.getValue(), "css");
                                                    }
                                                }
                                            },
                                            extraKeys: {
                                                "Tab": "emmetExpandAbbreviation",
                                                "Esc": "emmetResetAbbreviation",
                                                "Enter": "emmetInsertLineBreak",
                                                "Ctrl-Space": "autocomplete"
                                            }
                                        }

                                        /* ~ --- ~ shiny themes ~ --- ~ */
                                        if (typeof nkch_css_configs === "object" && typeof nkch_css_configs.themes === "object") {
                                            if (typeof options.themes === "object") {
                                                switch (mw.config.get("isDarkTheme")) {
                                                    case false:
                                                        if (typeof options.themes.light === "string") {
                                                            setTheme(options.themes.light);
                                                            nkch.css.currentTheme = "light";
                                                            Object.assign(editorOptions, {
                                                                theme: options.themes.light
                                                            });
                                                            nkch.css.currentTheme = "light";
                                                        }
                                                        break;
                                                    case true:
                                                        if (typeof options.themes.dark === "string") {
                                                            setTheme(options.themes.dark);
                                                            nkch.css.currentTheme = "dark";
                                                            Object.assign(editorOptions, {
                                                                theme: options.themes.dark
                                                            })
                                                            nkch.css.currentTheme = "dark";
                                                        }
                                                        break;
                                                }
                                            }
                                        } else if (typeof options.theme === "string") {
                                            setTheme(options.theme);
                                            Object.assign(editorOptions, {
                                                theme: options.theme
                                            });
                                        };

                                        /* ~ --- ~ tasty cookies ~ --- ~ */
                                        if (options.saveWithCookies) {
                                            nkch.css.cookiesValue = {};

                                            switch (mw.cookie.get("savedValue", "nkchCSS_") != null) {
                                                case true:
                                                    nkch.css.cookiesValue.css = mw.cookie.get("savedValue", "nkchCSS_");
                                                    break;
                                                case false:
                                                    nkch.css.cookiesValue.css = "";
                                                    break;
                                            }

                                            switch (mw.cookie.get("savedValue_less", "nkchCSS_") != null) {
                                                case true:
                                                    nkch.css.cookiesValue.less = mw.cookie.get("savedValue_less", "nkchCSS_");
                                                    break;
                                                case false:
                                                    nkch.css.cookiesValue.less = "";
                                                    break;
                                            }

                                            switch (mw.cookie.get("savedValue_sass", "nkchCSS_") != null) {
                                                case true:
                                                    nkch.css.cookiesValue.sass = mw.cookie.get("savedValue_sass", "nkchCSS_");
                                                    break;
                                                case false:
                                                    nkch.css.cookiesValue.sass = "";
                                                    break;
                                            }
                                        }

                                        /* ~ --- ~ editors ~ --- ~ */
                                        nkch.css.editors = {};

                                        nkch.css.editors.css = CodeMirror.fromTextArea(inputCSS.$element[0].querySelector("textarea"), editorOptions);
                                        nkch.css.editors.css.setOption("mode", "css");
                                        if (options.saveWithCookies) nkch.css.editors.css.setValue(nkch.css.cookiesValue.css);
                                        emmetCodeMirror(nkch.css.editors.css);
                                        nkch.css.editors.css.refresh();

                                        nkch.css.editors.css.on("keyup", function () {
                                            nkch.css.actions.updateCode(nkch.css.editors.css.getValue(), "css");
                                        }, false);

                                        if (options.useLess) {
                                            tabLess.on("active", function () {
                                                if (typeof nkch.css.editors.less == "undefined") {
                                                    setTimeout(function () {
                                                        nkch.css.editors.less = CodeMirror.fromTextArea(inputLess.$element[0].querySelector("textarea"), editorOptions);
                                                        nkch.css.editors.less.setOption("mode", "text/x-less");
                                                        if (options.saveWithCookies) nkch.css.editors.less.setValue(nkch.css.cookiesValue.less);
                                                        emmetCodeMirror(nkch.css.editors.less);
                                                        nkch.css.editors.less.refresh();

                                                        nkch.css.editors.less.on("keyup", function () {
                                                            nkch.css.actions.updateCode(nkch.css.editors.less.getValue(), "less");
                                                        }, false);
                                                    }, 10);
                                                }
                                            });

                                            compileLess.on("click", function (ev) {
                                                if (ev) {
                                                    less.render(nkch.css.editors.less.getValue())
                                                        .then(
                                                            function (output) {
                                                                console.log(output.css);
                                                                nkch.css.editors.css.setValue(output.css);
                                                                tabs.setTabPanel("css");
                                                                nkch.css.editors.css.refresh();
                                                                nkch.css.actions.beautify(nkch.css.editors.css.getValue());
                                                                nkch.css.actions.updateCode(nkch.css.editors.css.getValue(), "css");
                                                            }
                                                        )
                                                        .catch(
                                                            function (error) {
                                                                mw.notify(error.message, {
                                                                    title: "nkchCSS (Less)",
                                                                    type: "error"
                                                                });
                                                            }
                                                        );
                                                }
                                            });
                                        }

                                        if (options.useSass) {
                                            tabSass.on("active", function () {
                                                if (typeof nkch.css.editors.sass == "undefined") {
                                                    setTimeout(function () {
                                                        nkch.css.editors.sass = CodeMirror.fromTextArea(inputSass.$element[0].querySelector("textarea"), editorOptions);
                                                        nkch.css.editors.sass.setOption("mode", "text/x-scss");
                                                        if (options.saveWithCookies) nkch.css.editors.sass.setValue(nkch.css.cookiesValue.sass);
                                                        emmetCodeMirror(nkch.css.editors.sass);
                                                        nkch.css.editors.sass.refresh();

                                                        nkch.css.editors.sass.on("keyup", function () {
                                                            nkch.css.actions.updateCode(nkch.css.editors.sass.getValue(), "sass");
                                                        }, false);
                                                    }, 10);
                                                }
                                            });

                                            compileSass.on("click", function (ev) {
                                                if (ev !== null) {
                                                    Sass.compile(nkch.css.editors.sass.getValue(), function (output) {
                                                        console.log(output);

                                                        switch (output.status) {
                                                            case 0:
                                                                nkch.css.editors.css.setValue(output.text);
                                                                tabs.setTabPanel("css");
                                                                nkch.css.editors.css.refresh();
                                                                nkch.css.actions.beautify(nkch.css.editors.css.getValue());
                                                                nkch.css.actions.updateCode(nkch.css.editors.css.getValue(), "css");
                                                                break;
                                                            case 1:
                                                                mw.notify(output.message, {
                                                                    title: "nkchCSS (SCSS)",
                                                                    type: "error"
                                                                });
                                                                break;
                                                            case 3:
                                                                mw.notify(output.message, {
                                                                    title: "nkchCSS (SCSS)",
                                                                    type: "warn"
                                                                });
                                                                break;
                                                        }
                                                    });
                                                }
                                            });
                                        }

                                        if (typeof nkch_css_configs === "object" && typeof nkch_css_configs.themes === "object") {
                                            setInterval(
                                                function () {
                                                    switch (mw.config.get("isDarkTheme")) {
                                                        case false:
                                                            if (nkch.css.currentTheme === "dark") {
                                                                $.each(nkch.css.editors, function (key, el) {
                                                                    el.setOption("theme", options.themes.light);
                                                                });
                                                                setTheme(options.themes.light);
                                                                nkch.css.currentTheme = "light";
                                                            }
                                                            break;
                                                        case true:
                                                            if (nkch.css.currentTheme === "light") {
                                                                $.each(nkch.css.editors, function (key, el) {
                                                                    el.setOption("theme", options.themes.dark);
                                                                });
                                                                setTheme(options.themes.dark);
                                                                nkch.css.currentTheme = "dark";
                                                            }
                                                            break;
                                                    }
                                                },
                                                1000
                                            );
                                        };

                                        if (options.saveWithCookies && options.implementOnLoad) {
                                            nkch.css.actions.updateCode(nkch.css.cookiesValue, "css");

                                            if (options.useLess) nkch.css.actions.updateCode(nkch.css.cookiesValue, "less")
                                            if (options.useSass) nkch.css.actions.updateCode(nkch.css.cookiesValue, "sass")
                                        };

                                        var loadEvent = new Event("nkch-css-load");
                                        switch (mw.config.get("skin")) {
                                            case "fandomdesktop":
                                                nkch.css.el.toolbarButton.link.$e.removeAttribute("disabled");
                                                nkch.css.el.toolbarButton.link.$e.addEventListener("click", function () {
                                                    nkch.css.actions.open();
                                                }, false);

                                                nkch.css.el.main.$e.dispatchEvent(loadEvent);
                                                break;
                                            case "fandommobile":
                                                nkch.css.el.communityBarButton.$e.addEventListener("click", function () {
                                                    nkch.css.actions.open();
                                                }, false);

                                                nkch.css.el.main.$e.dispatchEvent(loadEvent);
                                                break;
                                        }
                                    }
                                );
                            }
                        );
                    }
                );
            }
        );

        /* ~ --- ~ import stuff ~ --- ~ */
        importArticles({
            type: "script",
            article: "u:dev:MediaWiki:WDSIcons/code.js"
        }, {
            type: "style",
            article: "u:nkch:MediaWiki:nkchCSS.css"
        });
    };
};