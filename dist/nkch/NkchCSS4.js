//@ts-check
"use strict";

/**
 * @constructor
 * @param {nkchCSS.Options} options
*/
function nkchCSS(options) {

    /** @type {nkchCSS.DefaultOptions} */
    this.defaultOptions = {
        themes: {
            light: "default",
            dark: "default"
        },
        title: "nkchCSS 4<sup style='font-size: 10px; vertical-align: super;'>OBT 3</sup>"
    }

    /** @type {nkchCSS.EditorOptions} */
    this.options = {
        themes: {},
        title: this.defaultOptions.title
    };

    if (options.themes) {
        this.options.themes.light = options.themes.light ? options.themes.light : this.defaultOptions.themes.light;
        this.options.themes.dark = options.themes.dark ? options.themes.dark : this.defaultOptions.themes.dark;
    }

    /** @type {CodeMirror.Editor | null} */
    this.editor = null;

    /** @type {Object<string, HTMLElement | SVGElement| OO.ui.Element>} */
    this.elements = {};

    
    /** @type {Object<string, any>} */
    this.env = {
        skin: mw.config.get("skin")
    }

    /** @type { nkchCSS.Checks } */
    this.checks = {
        editor: {
            isInitialized: false,
            isEnabled: true,
            isShown: false
        },
        isCodeInvalid: false,
    };

    /** @type {Object<string, string>} */
    this.svgPath = {
        star: "M6.15008 5.30832C6.06799 5.48263 5.90933 5.60345 5.72578 5.63141L0.4831 6.42984C0.0208923 6.50023 " +
            "-0.163665 7.09555 0.170791 7.43724L3.96443 11.3129C4.09725 11.4486 4.15785 11.6441 4.1265 11.8357L3.23094 17.3082C3.15199 " +
            "17.7907 3.63516 18.1586 4.04857 17.9308L8.73777 15.3471C8.90194 15.2566 9.09806 15.2566 9.26223 15.3471L13.9514 17.9308C14.3648 " +
            "18.1586 14.848 17.7907 14.7691 17.3082L13.8735 11.8357C13.8421 11.6441 13.9028 11.4486 14.0356 11.3129L17.8292 7.43724C18.1637 " +
            "7.09555 17.9791 6.50023 17.5169 6.42984L12.2742 5.63141C12.0907 5.60345 11.932 5.48263 11.8499 5.30832L9.50532 0.329227C9.29862 " +
            "-0.109742 8.70138 -0.109742 8.49467 0.329226L6.15008 5.30832ZM9 2.99274L7.56499 6.04019C7.25307 6.70259 6.65014 7.16171 5.95267 " +
            "7.26793L2.74389 7.75661L5.06579 10.1287C5.57048 10.6443 5.80078 11.3872 5.68164 12.1152L5.13351 15.4647L8.00354 13.8833C8.62737 " +
            "13.5396 9.37263 13.5396 9.99646 13.8833L12.8665 15.4647L12.3184 12.1152C12.1992 11.3872 12.4295 10.6443 12.9342 10.1287L15.2561 " +
            "7.75661L12.0473 7.26793C11.3499 7.16171 10.7469 6.70259 10.435 6.04019L9 2.99274Z",
        eye: "M9 11.402c-1.108 0-2.01-.853-2.01-1.902 0-1.05.902-1.902 2.01-1.902 1.108 0 2.01.853 2.01 1.902s-.902 1.902-2.01 1.902M2.056 " +
            "9.5c1.058 2.768 3.81 4.608 6.943 4.608 3.134 0 5.886-1.84 6.945-4.608C14.886 6.732 12.134 4.892 9 4.892c-3.133 0-5.885 1.84-6.944 " +
            "4.608M9 16C4.883 16 1.284 13.502.046 9.785a.895.895 0 0 1 0-.57C1.284 5.498 4.883 3 9 3c4.117 0 7.715 2.498 8.953 6.215a.895.895 " +
            "0 0 1 0 .57C16.715 13.502 13.117 16 9 16",
        eyeCrossed: "M7.214 8.628L4.746 6.16a7.036 7.036 0 0 0-2.69 3.34c1.058 2.768 3.81 4.608 6.943 4.608a7.757 7.757 0 0 0 3.069-.626L9.82 " +
            "11.236c-.25.106-.529.166-.821.166-1.108 0-2.01-.853-2.01-1.902 0-.314.08-.61.224-.872zm1.799-1.03c1.102.007 1.997.857 1.997 1.902l-.003.093 " +
            "2.822 2.822A6.989 6.989 0 0 0 15.944 9.5C14.886 6.732 12.134 4.892 9 4.892a7.79 7.79 0 0 0-2.337.356l2.35 2.35zM3.359 4.773L1.293 " +
            "2.707C.35 1.764 1.764.35 2.707 1.293l2.47 2.47A9.862 9.862 0 0 1 9 3c4.117 0 7.716 2.498 8.954 6.215a.895.895 0 0 1 0 .57 8.855 8.855 " +
            "0 0 1-2.747 4.007l1.501 1.5c.943.944-.471 2.358-1.414 1.415l-1.788-1.788A9.814 9.814 0 0 1 8.999 16C4.883 16 1.284 13.502.046 " +
            "9.785a.895.895 0 0 1 0-.57A8.899 8.899 0 0 1 3.36 4.773z",
        close: "M10.414 9l6.293-6.293a.999.999 0 1 0-1.414-1.414L9 7.586 2.707 1.293a.999.999 0 1 0-1.414 1.414L7.586 9l-6.293 6.293a.999.999 " +
            "0 1 0 1.414 1.414L9 10.414l6.293 6.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L10.414 9z",
        download: "M16 12a1 1 0 0 0-1 1v2H3v-2a1 1 0 1 0-2 0v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1m-7.707.707a1.009 1.009 0 0 0 " +
            ".704.293h.006a.988.988 0 0 0 .704-.293l5-5a.999.999 0 1 0-1.414-1.414L10 9.586V2a1 1 0 1 0-2 0v7.586L4.707 6.293a.999.999 0 1 " +
            "0-1.414 1.414l5 5z",
        upload: "M13.293 7.70725C13.488 7.90225 13.744 8.00025 14 8.00025C14.256 8.00025 14.512 7.90225 14.707 7.70725C15.098 7.31625 15.098 6.68425 " +
            "14.707 6.29325L9.707 1.29325C9.316 0.90225 8.684 0.90225 8.293 1.29325L3.293 6.29325C2.902 6.68425 2.902 7.31625 3.293 7.70725C3.488 7.90225 " +
            "3.744 8.00025 4 8.00025C4.256 8.00025 4.512 7.90225 4.707 7.70725L8 4.41425V12.1669C8 12.6278 8.448 13.0002 9 13.0002C9.552 13.0002 10 12.6278 " +
            "10 12.1669V4.41425L13.293 7.70725ZM16 17.0002C16.552 17.0002 17 16.5532 17 16.0002V13.0002C17 12.4473 16.552 12.0002 16 12.0002C15.448 12.0002 15 " +
            "12.4473 15 13.0002V15.0002H3V13.0002C3 12.4473 2.552 12.0002 2 12.0002C1.448 12.0002 1 12.4473 1 13.0002V16.0002C1 16.5532 1.448 17.0002 " +
            "2 17.0002H16Z"
    }

    /**
     * @constructor
     * @param {string} tag
     * @param {nkchCSS.ElementOptions} [options]
    */
    this.Element = function (tag, options) {
        const _this = this;

        if (tag === "svg" || tag === "path") throw new Error("Use SvgElement instead");

        _this.element = document.createElement(tag);
        _this.options = options;

        if (_this.element instanceof HTMLElement) {
            if (_this.options) {
                if (_this.options.classes) {
                    for (const c in _this.options.classes)
                        _this.element.classList.add(_this.options.classes[c]);
                }

                if (_this.options.id) _this.element.id = _this.options.id;

                if (_this.options.attributes) {
                    for (const a in _this.options.attributes)
                        _this.element.setAttribute(a, _this.options.attributes[a]);
                }

                if (_this.options.html) _this.element.innerHTML = _this.options.html;

                if (_this.options.text) _this.element.innerText = _this.options.text;

                if (_this.options.styles) {
                    for (const s in _this.options.styles)
                        _this.element.style[s] = _this.options.styles[s];
                }
                
                if (_this.options.href)
                    if (_this.element instanceof HTMLAnchorElement) _this.element.href = _this.options.href;

                if (_this.options.events) {
                    for (const e in _this.options.events) {
                        _this.element.addEventListener(e, _this.options.events[e], false);
                    }
                }

                if (_this.options.add) {
                    if (_this.options.add.append)
                        _this.options.add.append.append(_this.element);

                    if (_this.options.add.prepend)
                        _this.options.add.prepend.prepend(_this.element);

                    if (_this.options.add.before)
                        _this.options.add.before.before(_this.element);

                    if (_this.options.add.after)
                        _this.options.add.after.after(_this.element);
                }
            }
        } else
            throw new Error("Could not create element");

        return _this;
    }

    /** @constructor */
    /**
     * @param {nkchCSS.SvgElementOptions} [options]
     */
    this.SvgElement = function (options) {
        const _this = this;

        _this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        _this.path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        _this.options = options;

        _this.svg.append(_this.path);
        
        if (_this.options) {
            if (_this.options.classes) {
                for (const c in _this.options.classes)
                    _this.svg.classList.add(_this.options.classes[c]);
            }

            if (_this.options.svgAttributes) {
                for (const a in _this.options.svgAttributes)
                    _this.svg.setAttribute(a, _this.options.svgAttributes[a]);
            }

            if (_this.options.pathAttributes) {
                for (const a in _this.options.pathAttributes)
                    _this.path.setAttribute(a, _this.options.pathAttributes[a]);
            }

            if (_this.options.add) {
                if (_this.options.add.append)
                    _this.options.add.append.append(_this.svg);

                if (_this.options.add.prepend)
                    _this.options.add.prepend.prepend(_this.svg);

                if (_this.options.add.before)
                    _this.options.add.before.before(_this.svg);

                if (_this.options.add.after)
                    _this.options.add.after.after(_this.svg);
            }
        }

        return _this;
    }

    this.initialize();
};

/** @returns {void} */
nkchCSS.prototype.initialize = function () {
    /** @type {nkchCSS} */
    const _this = this;

    switch (_this.env.skin) {
        case "fandomdesktop":
            /* ~ quickbar item ~ */
            /** @type {HTMLElement | HTMLLIElement} */
            const quickbarItem = new _this.Element("li", {
                classes: ["nkch-css4__quickbar-button"],
                add: { append: document.querySelector("#WikiaBar .toolbar .tools") }
            }).element;

            _this.elements.quickbarItem = quickbarItem;


            /* ~ quickbar item : spinner ~ */
            /** @type {HTMLElement | HTMLSpanElement} */
            const quickbarItem_spinner = new _this.Element("span", {
                classes: ["nkch-css4__quickbar-button-spinner", "is-hidden"],
                add: { append: quickbarItem }
            }).element;

            _this.elements.quickbarItem_spinner = quickbarItem_spinner;


            /* ~ quickbar item : link ~ */
            /** @type {HTMLElement | HTMLAnchorElement} */
            const quickbarItem_link = new _this.Element("a", {
                classes: ["nkch-css4__quickbar-button-link"],
                href: "#",
                text: "nkchCSS 4",
                events: {
                    click: _this.show.bind(_this)
                },
                add: { append: quickbarItem }
            }).element;

            _this.elements.quickbarItem_link = quickbarItem_link;
            break;
        
        case "vector":
        case "vector-2022":
            /* ~ sidebar item ~ */
            /** @type {HTMLElement | HTMLLIElement} */
            const sidebarItem = new _this.Element("li", {
                classes: ["nkch-css4__sidebar-button", "mw-list-item"],
                id: "n-nkchcss",
                add: { append: document.querySelector("#mw-panel .vector-menu-content-list") }
            }).element;

            _this.elements.sidebarItem = sidebarItem;

            /* ~ sidebar item : spinner ~ */
            /** @type {HTMLElement | HTMLSpanElement} */
            const sidebarItem_spinner = new _this.Element("span", {
                classes: ["nkch-css4__sidebar-button-spinner", "is-hidden"],
                add: { append: sidebarItem }
            }).element;

            _this.elements.sidebarItem_spinner = sidebarItem_spinner;

            /* ~ sidebar item : link ~ */
            /** @type {HTMLElement | HTMLAnchorElement} */
            const sidebarItem_link = new _this.Element("a", {
                classes: ["nkch-css4__sidebar-button-link"],
                href: "#",
                text: "nkchCSS 4",
                events: {
                    click: _this.show.bind(_this)
                },
                add: { append: sidebarItem }
            }).element;

            _this.elements.sidebarItem_link = sidebarItem_link;
            break;
    }
}

/** @returns {void} */
nkchCSS.prototype.initializeEditor = function () {
    /** @type {nkchCSS} */
    const _this = this;

    mw.loader.using(["oojs-ui"]).then(
        function () {
            var targetSpinner;

            switch (_this.env.skin) {
                case "fandomdesktop":
                    if (_this.elements.quickbarItem_spinner instanceof HTMLSpanElement)
                        targetSpinner = _this.elements.quickbarItem_spinner;
                    break;

                case "vector":
                case "vector-2022":
                    if (_this.elements.sidebarItem_spinner instanceof HTMLSpanElement)
                        targetSpinner = _this.elements.sidebarItem_spinner;
                    break;
            }
            
            if (targetSpinner) targetSpinner.classList.remove("is-hidden");

            mw.loader.load("https://code.jquery.com/ui/" + "1.13.1" + "/themes/base/jquery-ui.css", "text/css");
            mw.loader.load(_this.getUnpkgLink("codemirror", "5.65.5", "lib/codemirror.css"), "text/css");

            mw.loader.getScript(_this.getUnpkgLink("codemirror", "5.65.5")).then(
                function () {
                    Promise.all([
                        mw.loader.getScript("https://code.jquery.com/ui/" + "1.13.1" + "/jquery-ui.js"),

                        mw.loader.getScript(_this.getUnpkgLink("codemirror", "5.65.5", "mode/css/css.js")),
                        mw.loader.getScript(_this.getUnpkgLink("codemirror", "5.65.5", "addon/edit/closebrackets.js")),
                        
                        mw.loader.getScript(_this.getUnpkgLink("less")),
                        
                        mw.loader.getScript(_this.getUnpkgLink("emmet-codemirror")),
                        mw.loader.getScript(_this.getUnpkgLink("js-beautify", null, "js/lib/beautify-css.js"))
                    ]).then(OnModuleLoad);
                }
            )
        }
    )

    function OnModuleLoad() {
        const windowManager = new OO.ui.WindowManager({
            classes: ["nkch-css4__window-manager"]
        });

        $(document.body).append(windowManager.$element);

        _this.elements.windowManager = windowManager;


        /* ~ style ~ */
        /** @type {HTMLElement | HTMLStyleElement} */
        const style = new _this.Element("style", {
            classes: ["nkch-css4__style"],
            add: { append: document.head }
        }).element;

        _this.elements.style = style;


        /* ~ main ~ */
        /** @type {HTMLElement | HTMLDivElement} */
        const main = new _this.Element("div", {
            classes: ["nkch-css4"],
            add: { after: document.body }
        }).element;

        /** @param {HTMLElement} element_elementArray */
        $(main).draggable({
            cancel: ".nkch-css4__content, .nkch-css4__popup, .nkch-css4__header-button, .nkch-css4__compile, .nkch-css4__statusbar, .nkch-css4__error",
            opacity: 0.8,
            start: function() {
                main.classList.add("is-dragging");

                main.style.right = "auto";
                main.style.bottom = "auto";
            }
        }).css({
            position: "fixed"
        });

        _this.elements.main = main;


        /* ~ main : header ~ */
        /** @type {HTMLElement | HTMLDivElement} */
        const main_header = new _this.Element("div", {
            classes: ["nkch-css4__header"],
            add: { append: main }
        }).element;

        _this.elements.main_header = main_header;


        /* ~ main : header left ~ */
        /** @type {HTMLElement | HTMLDivElement} */
        const main_headerLeft = new _this.Element("div", {
            classes: ["nkch-css4__header-left"],
            add: { append: main_header }
        }).element;

        _this.elements.main_headerLeft = main_headerLeft;


        /* ~ main : header title ~ */
        /** @type {HTMLElement | HTMLDivElement} */
        const main_headerTitle = new _this.Element("div", {
            classes: ["nkch-css4__header-title"],
            text: _this.options.title,
            add: { append: main_headerLeft }
        }).element;

        _this.elements.main_headerTitle = main_headerTitle;


        /* ~ main : header info ~ */
        /** @type {HTMLElement | HTMLDivElement} */
        const main_headerInfo = new _this.Element("div", {
            classes: ["nkch-css4__header-info"],
            add: { append: main_headerLeft }
        }).element;

        _this.elements.main_headerInfo = main_headerInfo;


        /* ~ main : header right ~ */
        /** @type {HTMLElement | HTMLDivElement} */
        const main_headerRight = new _this.Element("div", {
            classes: ["nkch-css4__header-right"],
            add: { append: main_header }
        }).element;

        _this.elements.main_headerRight = main_headerRight;


        /* ~ main : header button group ~ */
        /** @type {HTMLElement | HTMLDivElement} */
        const main_headerButtonGroup = new _this.Element("div", {
            classes: ["nkch-css4__header-button-group"],
            add: { append: main_headerRight }
        }).element;

        _this.elements.main_headerButtonGroup = main_headerButtonGroup;


        /* ~ main : header button (beautify) ~ */
        /** @type {HTMLElement | HTMLButtonElement} */
        const main_headerButton__beautify = new _this.Element("button", {
            classes: ["nkch-css4__header-button", "nkch-css4__header-button--beautify"],
            events: {
                click: function () {
                    if (_this.editor) _this.beautify(_this.editor.getValue());
                }
            },
            add: { append: main_headerButtonGroup }
        }).element;

        _this.elements.main_headerButton_beautify = main_headerButton__beautify;


        /* ~ [svg] main : header button icon (beautify) ~ */
        /** @type {SVGElement} */
        const main_headerButtonIcon = new _this.SvgElement({
            classes: ["nkch-css4__header-icon"],
            svgAttributes: {
                viewBox: "0 0 18 18",
                "aria-hidden": "true"
            },
            pathAttributes: {
                d: _this.svgPath.star,
                "fill-rule": "evenodd",
                "clip-rule": "evenodd"
            },
            add: { append: main_headerButton__beautify }
        }).svg;

        _this.elements.main_headerButtonIcon = main_headerButtonIcon;


        /* ~ main : header button (toggle) ~ */
        /** @type {HTMLElement | HTMLButtonElement} */
        const main_headerButton__toggle = new _this.Element("button", {
            classes: ["nkch-css4__header-button", "nkch-css4__header-button--toggle", _this.checks.editor.isEnabled ? "is-enabled" : "is-disabled"],
            events: {
                click: function() {
                    _this.toggle(!_this.checks.editor.isEnabled);
                }
            },
            add: { append: main_headerButtonGroup }
        }).element;

        _this.elements.main_headerButton__toggle = main_headerButton__toggle;


        /* ~ [svg] main : header button icon (toggle) ~ */
        /** @type {SVGElement} */
        const main_headerButtonIcon__toggle = new _this.SvgElement({
            classes: ["nkch-css4__header-icon"],
            svgAttributes: {
                viewBox: "0 0 18 18",
                "aria-hidden": "true"
            },
            pathAttributes: {
                d: _this.checks.editor.isEnabled ? _this.svgPath.eye : _this.svgPath.eyeCrossed,
                "fill-rule": "evenodd",
                "clip-rule": "evenodd"
            },
            add: { append: main_headerButton__toggle }
        }).svg;

        _this.elements.main_headerButtonIcon__toggle = main_headerButtonIcon__toggle;


        /* ~ main : header button (close) ~ */
        /** @type {HTMLElement | HTMLButtonElement} */
        const main_headerButton__close = new _this.Element("button", {
            classes: ["nkch-css4__header-button", "nkch-css4__header-button--close"],
            events: {
                click: _this.hide.bind(_this)
            },
            add: { append: main_headerButtonGroup }
        }).element;

        _this.elements.main_headerButton_close = main_headerButton__close;

        
        /* ~ [svg] main : header button icon (close) ~ */
        /** @type {SVGElement} */
        const main_headerButtonIcon_close = new _this.SvgElement({
            classes: ["nkch-css4__header-icon"],
            svgAttributes: {
                viewBox: "0 0 18 18",
                "aria-hidden": "true"
            },
            pathAttributes: {
                d: _this.svgPath.close,
                "fill-rule": "evenodd",
                "clip-rule": "evenodd"
            },
            add: { append: main_headerButton__close }
        }).svg;

        _this.elements.main_headerButtonIcon_close = main_headerButtonIcon_close;


        /* ~ main : compile ~ */
        /** @type {HTMLElement | HTMLDivElement} */
        const main_compile = new _this.Element("div", {
            classes: ["nkch-css4__compile"],
            add: { append: main }
        }).element;

        var compile_less = new OO.ui.ButtonWidget({
            label: "Less → CSS",
            classes: ["nkch-css4__compile-button", "nkch-css4__compile-button--less"],
            framed: false
        });

        compile_less.toggle(false);

        compile_less.on("click", function() {
            if (_this.editor && !compile_less.isDisabled())
                _this.compile(_this.editor.getValue(), "text/x-less");
        });
        
        _this.elements.compile_less = compile_less;

        const compileLayout = new OO.ui.HorizontalLayout({ items: [compile_less] });
        $(main_compile).append(compileLayout.$element);

        _this.elements.main_compile = main_compile;


        /* ~ main : content ~ */
        /** @type {HTMLElement | HTMLDivElement} */
        const main_content = new _this.Element("div", {
            classes: ["nkch-css4__content"],
            add: { append: main }
        }).element;

        var panel_css = new OO.ui.TabPanelLayout("css", { label: "CSS" }),
            panel_less = new OO.ui.TabPanelLayout("less", { label: "Less" });

        _this.elements.panel_css = panel_css;
        _this.elements.panel_less = panel_less;

        const tabs = new OO.ui.IndexLayout({ expanded: false });
        _this.elements.tabs = tabs;

        tabs.addTabPanels([panel_css, panel_less], 0);
        $(main_content).append(tabs.$element);

        _this.elements.main_content = main_content;


        /* ~ main : content textarea ~ */
        /** @type {HTMLElement | HTMLTextAreaElement} */
        const main_contentTextArea = new _this.Element("textarea", {
            classes: ["nkch-css4__textarea"],
            add: { append: main_content }
        }).element;

        if (!(main_contentTextArea instanceof HTMLTextAreaElement)) return;
        _this.editor = self.CodeMirror.fromTextArea(main_contentTextArea, {
            mode: "text/css",
            lineNumbers: true,
            lineWrapping: true,
            indentUnit: 4,
            indentWithTabs: false,
            smartIndent: true,

            extraKeys: {
                "Ctrl-Space": "autocomplete"
            }
        });

        emmetCodeMirror(_this.editor);

        tabs.on("set", function(tab) {
            if (!_this.editor) return;

            switch (tab.name) {
                case "css":
                    _this.editor.setOption("mode", "text/css");
                    compile_less.toggle(false);
                    break;
                case "less":
                    _this.editor.setOption("mode", "text/x-less");
                    compile_less.toggle(true);
                    break;
            }

            _this.updateCode(_this.editor.getValue(), _this.editor.getOption("mode"));
            _this.editor.refresh();
        })

        _this.elements.main_contentTextArea = main_contentTextArea;

        _this.editor.setSize(450, 220);
        _this.editor.refresh();

        _this.editor.on("keyup", function() {
            if (_this.editor) _this.updateCode(_this.editor.getValue(), _this.editor.getOption("mode"));
        });


        /* ~ main : statusbar ~ */
        /** @type {HTMLElement | HTMLDivElement} */
        const main_statusbar = new _this.Element("div", {
            classes: ["nkch-css4__statusbar"],
            add: { append: main }
        }).element;

        _this.elements.main_statusbar = main_statusbar;


        /* ~ main : statusbar container (left) ~ */
        /** @type {HTMLElement | HTMLDivElement} */
        const main_statusbarContainer__left = new _this.Element("div", {
            classes: ["nkch-css4__statusbar-container", "nkch-css4__statusbar-container--left"],
            add: { append: main_statusbar }
        }).element;

        _this.elements.main_statusbarContainer__left = main_statusbarContainer__left;


        /* ~ main : statusbar item (file download) ~ */
        /** @type {HTMLElement | HTMLAnchorElement} */
        const main_statusbarItem__fileDownload = new _this.Element("a", {
            classes: ["nkch-css4__statusbar-item", "nkch-css4__statusbar-item--file-download"],
            attributes: {
                role: "button",
            },
            events: {
                click: function () { downloadFile(); }
            },
            add: { append: main_statusbarContainer__left }
        }).element;

        var downloadFile = function () {
            if (!_this.editor) return;

            if (_this.editor.getValue().replaceAll(" ", "").replaceAll("\n", "").length < 1) {
                main_statusbarItem__fileDownload.removeAttribute("download");
                main_statusbarItem__fileDownload.removeAttribute("href");
                return;
            }

            var now = new Date(),
                date = {
                    year: now.getFullYear(),
                    month: now.getMonth() + 1,
                    day: now.getDate(),
                    hour: now.getHours(),
                    minute: now.getMinutes(),
                    second: now.getSeconds()
                },
                fileName = 
                    mw.config.get("wgWikiID") + " " +
                    date.year + "-" + date.month + "-" + date.day + " " + date.hour + "-" + date.minute + "-" + date.second,
                fileType = "";

            switch (_this.editor.getOption("mode")) {
                case "text/css":
                    fileName += ".css";
                    fileType = "text/css";
                    break;
                case "text/x-less":
                    fileName += ".less";
                    fileType = "text/x-less";
                    break;
            }

            var fileUrl = URL.createObjectURL(new Blob([_this.editor.getValue()], { type: fileType }));

            main_statusbarItem__fileDownload.setAttribute("download", fileName);
            main_statusbarItem__fileDownload.setAttribute("href", fileUrl);
        }

        _this.elements.main_statusbarItem_fileDownload = main_statusbarItem__fileDownload;

        /* ~ [svg] main : statusbar item icon (file download) ~ */
        /** @type {SVGElement} */
        const main_statusbarItemIcon__fileDownload = new _this.SvgElement({
            classes: ["nkch-css4__statusbar-item-icon", "nkch-css4__statusbar-item-icon--file-download"],
            svgAttributes: {
                viewBox: "0 0 18 18",
                "aria-hidden": "true"
            },
            pathAttributes: {
                d: _this.svgPath.download,
                "fill-rule": "evenodd",
                "clip-rule": "evenodd"
            },
            add: { append: main_statusbarItem__fileDownload }
        }).svg;

        _this.elements.main_statusbarItemIcon__fileDownload = main_statusbarItemIcon__fileDownload;


        /* ~ main : statusbar item input (file upload) ~ */
        /** @type {HTMLElement | HTMLInputElement} */
        const main_statusbarItemInput__fileUpload = new _this.Element("input", {
            classes: ["nkch-css4__statusbar-item-input", "nkch-css4__statusbar-item-input--file-download"],
            attributes: {
                type: "file",
                accept: "text/css,.less",
                name: "nkch-css4__statusbar-item-input--file-download"
            },
            styles: {
                display: "none"
            },
            events: {
                change: function () { uploadFile(); }
            },
            add: { append: main_statusbarContainer__left }
        }).element;

        var uploadFile = function() {
            if (!(main_statusbarItemInput__fileUpload instanceof HTMLInputElement)) return;
            if (!main_statusbarItemInput__fileUpload.files || main_statusbarItemInput__fileUpload.files.length < 1) return;

            var file = main_statusbarItemInput__fileUpload.files[0];

            file.text().then(
                function(text) {
                    if (file.name.endsWith(".css")) 
                        tabs.setTabPanel("css");
                    else if (file.name.endsWith(".less")) 
                        tabs.setTabPanel("less");

                    if (_this.editor) {
                        _this.editor.setValue(text);
                        _this.updateCode(_this.editor.getValue(), _this.editor.getOption("mode"));
                    }

                    main_statusbarItemInput__fileUpload.value = "";
                }
            );
        }

        _this.elements.main_statusbarItemInput__fileUpload = main_statusbarItemInput__fileUpload;


        /* ~ main : statusbar item (file upload) ~ */
        /** @type {HTMLElement | HTMLAnchorElement} */
        const main_statusbarItem__fileUpload = new _this.Element("a", {
            classes: ["nkch-css4__statusbar-item", "nkch-css4__statusbar-item--file-upload"],
            attributes: {
                role: "button",
            },
            events: {
                click: function() {
                    main_statusbarItemInput__fileUpload.click();
                }
            },
            add: { append: main_statusbarContainer__left }
        }).element;

        _this.elements.main_statusbarItem_fileUpload = main_statusbarItem__fileUpload;


        /* ~ [svg] main : statusbar item icon (file upload) ~ */
        /** @type {SVGElement} */
        const main_statusbarItemIcon__fileUpload = new _this.SvgElement({
            classes: ["nkch-css4__statusbar-item-icon", "nkch-css4__statusbar-item-icon--file-upload"],
            svgAttributes: {
                viewBox: "0 0 18 18",
                "aria-hidden": "true"
            },
            pathAttributes: {
                d: _this.svgPath.upload,
                "fill-rule": "evenodd",
                "clip-rule": "evenodd"
            },
            add: { append: main_statusbarItem__fileUpload }
        }).svg;

        _this.elements.main_statusbarItemIcon__fileUpload = main_statusbarItemIcon__fileUpload;


        /* ~ main : statusbar container (right) ~ */
        /** @type {HTMLElement | HTMLDivElement} */
        const main_statusbarContainer__right = new _this.Element("div", {
            classes: ["nkch-css4__statusbar-container", "nkch-css4__statusbar-container--right"],
            add: { append: main_statusbar }
        }).element;

        _this.elements.main_statusbarContainer__right = main_statusbarContainer__right;


        /* ~ main : statusbar item (selection) ~ */
        /** @type {HTMLElement | HTMLDivElement} */
        const main_statusbarItem__selection = new _this.Element("a", {
            classes: ["nkch-css4__statusbar-item", "nkch-css4__statusbar-item--selection"],
            text: "L: 1 • C: 1",
            attributes: {
                role: "button",
            },
            events: {
                click: function() { moveSelection(); }
            },
            add: { append: main_statusbarContainer__right }
        }).element;
        
        _this.editor.on("cursorActivity", function() {
            if (!_this.editor) return;

            var cursor = _this.editor.getCursor(),
                selection = _this.editor.getSelection();

                main_statusbarItem__selection.innerText = "L: " + (cursor.line + 1) + " • C: " + (cursor.ch + 1);
                
            if (selection.length > 0) main_statusbarItem__selection.innerText += " • S: " + selection.length;
        });

        var goToSelectionDialog = new OO.ui.MessageDialog({
            classes: ["nkch-css4__message-dialog", "nkch-css4__message-dialog--go-to-selection"]
        });

        _this.elements.windowManager.addWindows([goToSelectionDialog]);

        var moveSelection = function () {
            if (!_this.editor) return;

            const goToSelectionDialog_textInput__line = new OO.ui.TextInputWidget({
                placeholder: _this.editor.lineCount(),
                icon: "tableMoveRowAfter",
                validate: getLineTextInputValidity
            });

            const goToSelectionDialog_textField__line = new OO.ui.FieldLayout(goToSelectionDialog_textInput__line, {
                label: "L"
            });

            function getLineTextInputValidity(value) {
                if (!_this.editor) return false;
                if (!new RegExp(/^\d+$/).test(value)) return false;

                value = Number(value);
                return (value > 0 && value <= _this.editor.lineCount());
            }

            const goToSelectionDialog_textInput__character = new OO.ui.TextInputWidget({
                placeholder: _this.editor.getLine(_this.editor.lineCount() - 1).length + 1,
                icon: "tableMoveColumnAfter",
                disabled: true,
                validate: getCharacterTextInputValidity
            });

            const goToSelectionDialog_textField__character = new OO.ui.FieldLayout(goToSelectionDialog_textInput__character, {
                label: "C"
            });

            function getCharacterTextInputValidity(value) {
                if (!_this.editor) return false;
                if (!getLineTextInputValidity(goToSelectionDialog_textInput__line.getValue())) return false;

                value = Number(value);
                return (value > 0 && value <= _this.editor.getLine(goToSelectionDialog_textInput__line.getValue() - 1).length + 1);
            }

            goToSelectionDialog_textInput__line.on("change", function(value) {
                if (value.length > 0) {
                    goToSelectionDialog_textInput__character.setDisabled(false);

                    goToSelectionDialog_textInput__character.setValidityFlag(
                        getCharacterTextInputValidity(goToSelectionDialog_textInput__character.getValue())
                    );
                } else goToSelectionDialog_textInput__character.setDisabled(true);  
            });

            const goToSelectionDialog_fieldset = new OO.ui.FieldsetLayout({
                items: [goToSelectionDialog_textField__line, goToSelectionDialog_textField__character]
            });

            const instance = windowManager.openWindow(goToSelectionDialog, {
                message: goToSelectionDialog_fieldset.$element
            });

            instance.opened.then(
                function() {
                    const acceptAction = goToSelectionDialog.actions.list.find(function (el) { return el.action === "accept" }),
                        rejectAction = goToSelectionDialog.actions.list.find(function (el) { return el.action === "reject" });

                    acceptAction.setDisabled(true);

                    var timer = setInterval(function() {
                        var valid = (
                            getLineTextInputValidity(goToSelectionDialog_textInput__line.getValue()) &&
                            getCharacterTextInputValidity(goToSelectionDialog_textInput__character.getValue())
                        );

                        if (acceptAction.isDisabled() === valid) acceptAction.setDisabled(!valid);
                    }, 100);

                    acceptAction.on("click", function() {
                        if (!_this.editor) return;
                        clearInterval(timer);

                        _this.editor.focus();
                        _this.editor.setCursor(goToSelectionDialog_textInput__line.getValue() - 1, goToSelectionDialog_textInput__character.getValue() - 1);
                    });

                    rejectAction.on("click", function() {
                        clearInterval(timer);
                    });
                }
            );
        }

        _this.elements.main_statusbarItem__selection = main_statusbarItem__selection;

        
        /* ~ main : error ~ */
        /** @type {HTMLElement | HTMLDivElement} */
        const main_error = new _this.Element("div", {
            classes: ["nkch-css4__error"],
            add: { append: main }
        }).element;

        _this.elements.main_error = main_error;


        /* ~ main : error title ~ */
        /** @type {HTMLElement | HTMLSpanElement} */
        const main_errorTitle = new _this.Element("span", {
            classes: ["nkch-css4__error-title"],
            add: { append: main_error }
        }).element;

        _this.elements.main_errorTitle = main_errorTitle;


        /* ~ main : error content ~ */
        /** @type {HTMLElement | HTMLSpanElement} */
        const main_errorContent = new _this.Element("span", {
            classes: ["nkch-css4__error-content"],
            add: { append: main_error }
        }).element;

        _this.elements.main_errorContent = main_errorContent;


        switch (mw.config.get("skin")) {
            case "fandomdesktop":
                if (_this.elements.quickbarItem_spinner instanceof HTMLSpanElement) 
                    _this.elements.quickbarItem_spinner.classList.add("is-hidden");
                break;

            case "vector":
            case "vector-2022":
                if (_this.elements.sidebarItem_spinner instanceof HTMLSpanElement) 
                    _this.elements.sidebarItem_spinner.classList.add("is-hidden");
                break;
        }

        _this.checks.editor.isInitialized = true;
        _this.show();
    }
}


/**
 * @param {Event} [event]
 * @returns {void}
 */
nkchCSS.prototype.show = function (event) {
    /** @type {nkchCSS} */
    const _this = this;
    
    if (event) event.preventDefault();

    if (!_this.checks.editor.isInitialized) return _this.initializeEditor();
    else if (_this.checks.editor.isShown) return;

    if (_this.elements.main instanceof HTMLElement) {
        _this.elements.main.classList.remove("is-disabled");

        const showAnimation = _this.elements.main.animate([{
            opacity: 0,
            transform: "translateY(10px)"
        }, {
            opacity: 1,
            transform: "translateY(0)"
        }], {
            duration: 300,
            easing: "ease"
        });

        _this.elements.main.dispatchEvent(new CustomEvent("nkch-css4-show", {
            cancelable: true,
            detail: _this
        }));
    }

    _this.checks.editor.isShown = true;
}


/**
 * @param {Event} [event]
 * @returns {void}
 */
nkchCSS.prototype.hide = function (event) {
    /** @type {nkchCSS} */
    const _this = this;
    
    if (event) event.preventDefault();

    if (!_this.checks.editor.isInitialized) return;
    else if (!_this.checks.editor.isShown) return;

    if (_this.elements.main instanceof HTMLElement) {
        const hideAnimation = _this.elements.main.animate([{
            opacity: 1,
            transform: "translateY(0)"
        }, {
            opacity: 0,
            transform: "translateY(10px)"
        }], {
            duration: 300,
            easing: "ease"
        });

        hideAnimation.onfinish = function () {
            if (_this.elements.main instanceof HTMLElement)
                _this.elements.main.classList.add("is-disabled");
        };

        _this.elements.main.dispatchEvent(new CustomEvent("nkch-css4-hide", {
            cancelable: true,
            detail: _this
        }));
    }

    _this.checks.editor.isShown = false;
}


/**
 * @param {string} code
 * @param {string | CodeMirror.ModeSpec<CodeMirror.ModeSpecOptions> | undefined } mode
 * @returns {void}
 */
nkchCSS.prototype.updateCode = function (code, mode) {
    /** @type {nkchCSS} */
    const _this = this;

    if (_this.checks.editor.isEnabled) {
        switch (mode) {
            default:
            case "text/css":
                if (_this.checks.isCodeInvalid) {
                    if (_this.elements.main_error instanceof HTMLDivElement &&
                        _this.elements.main_errorTitle instanceof HTMLSpanElement &&
                        _this.elements.main_errorContent instanceof HTMLSpanElement) {
                        _this.elements.main_error.classList.remove("is-visible");

                        _this.elements.main_errorTitle.innerText = "";
                        _this.elements.main_errorContent.innerText = "";
                    }
                }

                if (_this.elements.style instanceof HTMLStyleElement)
                    _this.elements.style.innerHTML = code;
                break;

            case "text/x-less":
                less.render(code)
                    .then(
                        function (output) {
                            if (_this.checks.isCodeInvalid) {
                                if (_this.elements.main_error instanceof HTMLDivElement &&
                                    _this.elements.main_errorTitle instanceof HTMLSpanElement &&
                                    _this.elements.main_errorContent instanceof HTMLSpanElement) {
                                    _this.elements.main_error.classList.remove("is-visible");

                                    _this.elements.main_errorTitle.innerText = "";
                                    _this.elements.main_errorContent.innerText = "";
                                }
                            }

                            if (_this.elements.compile_less instanceof OO.ui.ButtonWidget)
                                _this.elements.compile_less.setDisabled(false);
                            _this.updateCode(output.css, "css");
                        }
                    )
                    .catch(
                        function (error) {
                            if (_this.elements.main_error instanceof HTMLDivElement &&
                                _this.elements.main_errorTitle instanceof HTMLSpanElement &&
                                _this.elements.main_errorContent instanceof HTMLSpanElement &&
                                _this.elements.compile_less instanceof OO.ui.ButtonWidget) {
                                _this.elements.main_error.classList.add("is-visible");

                                _this.elements.main_errorTitle.innerText = "Less (" + error.line + ":" + (error.column + 1) + ")";
                                _this.elements.main_errorContent.innerText = error.message;

                                _this.elements.compile_less.setDisabled(true);
                                _this.checks.isCodeInvalid = true;
                            }
                        }
                    );
                break;
        }

        if (_this.elements.main instanceof HTMLDivElement)
            _this.elements.main.dispatchEvent(new CustomEvent("nkch-css4-update", {
                cancelable: true,
                detail: _this
            }));
    }
}


/**
 * @param {string} code
 * @param {string} mode
 * @returns {void}
 */
nkchCSS.prototype.compile = function (code, mode) {
    /** @type {nkchCSS} */
    const _this = this;

    switch (mode) {
        case "text/x-less":
            less.render(code)
                .then(function(output) {
                    if (_this.elements.tabs instanceof OO.ui.IndexLayout)
                        _this.elements.tabs.setTabPanel("css");

                    _this.beautify(output.css);

                    if (_this.editor)
                        _this.updateCode(_this.editor.getValue(), "css");
                }
            )
    }
}


/**
 * @param {string} code
 * @returns {void}
 */
nkchCSS.prototype.beautify = function (code) {
    /** @type {nkchCSS} */
    const _this = this;

    var codeBeautified = css_beautify(code, {
        indent_size: 4,
        indent_char: " ",
    });

    if (_this.editor) _this.editor.setValue(codeBeautified);
}


/**
 * @param {boolean} state
 * @returns {void}
 */
nkchCSS.prototype.toggle = function (state) {
    /** @type {nkchCSS} */
    const _this = this;

    if (_this.elements.main_headerButton__toggle instanceof HTMLButtonElement &&
        _this.elements.main_headerButtonIcon__toggle instanceof SVGElement) {
        var classList = _this.elements.main_headerButton__toggle.classList,
            path = _this.elements.main_headerButtonIcon__toggle.querySelector("path");

        switch (state) {
            case true:
                if (!_this.checks.editor.isEnabled) {
                    classList.add("is-enabled");
                    classList.remove("is-disabled");

                    if (path) path.setAttribute("d", _this.svgPath.eye);
                    _this.checks.editor.isEnabled = true;

                    if (_this.editor)
                        _this.updateCode(_this.editor.getValue(), _this.editor.getOption("mode"));
                }
                break;

            case false:
                if (_this.checks.editor.isEnabled) {
                    classList.add("is-disabled");
                    classList.remove("is-enabled");

                    if (path) path.setAttribute("d", _this.svgPath.eyeCrossed);
                    _this.checks.editor.isEnabled = false;

                    if (_this.elements.style instanceof HTMLStyleElement)
                        _this.elements.style.innerHTML = "";
                }
                break;
        }
    }
}


/** 
 * @param {string} module
 * @param {string | null} [version]
 * @param {string} [path]
 * @returns {string | never}
 */
nkchCSS.prototype.getUnpkgLink = function (module, version, path) {
    if (!module) throw new Error("Module is not specified");
    if (module.includes("/")) module.replaceAll(/^\/?|\/?$/, "");

    return "https://unpkg.com/" + module + (version ? "@" + version : "") + (path ? "/" + path : "");
}


function setup() {
    /** @type {nkch} */
    var nkch = window.nkch ? window.nkch : {};
    window.nkch = nkch;

    /** @type {nkchCSS.Options} */
    var options = typeof nkch_css_configs !== "undefined" ? nkch_css_configs : {};

    mw.loader.load("https://nkch.fandom.com/wiki/MediaWiki:NkchCSS4.css?action=raw&ctype=text/css", "text/css");

    if (nkch.css4 && nkch.css4 instanceof nkchCSS)
        return mw.log.warn("nkchCSS is already in use.");
    else nkch.css4 = new nkchCSS(options);
}

setup();