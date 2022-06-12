//@ts-check
"use strict";

/**
 * @constructor
 * @param {nkchCSS.Options} options
*/
function nkchCSS(options) {
    /** @type {nkchCSS.Options} */
    this.defaultOptions = {
        features: {
            localStorage: false,
            less: false,
            colorPicker: false,
            emmet: false,
        },
        themes: {
            light: "default",
            dark: "default"
        },
        title: "nkchCSS 4<sup style='font-size: 10px; vertical-align: super;'>OBT 2</sup>"
    }

    /** @type {nkchCSS.Options} */
    this.options = {
        features: Object.assign(this.defaultOptions.features, options.features),
        themes: Object.assign(this.defaultOptions.themes, options.themes),
        title: options.title ? options.title : this.defaultOptions.title
    };

    /** @type {CodeMirror.Editor} */
    this.editor;

    /** @type {boolean} */
    this.isEditorInitialized = false;
    /** @type {boolean} */
    this.isEditorShown = false;
    /** @type {boolean} */
    this.isEditorEnabled = true;
    /** @type {boolean} */
    this.isErrorVisible = false;

    this.elements = {};

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

        _this.element =
            tag.toLowerCase() === "svg" ?
                document.createElementNS("http://www.w3.org/2000/svg", "svg") :
            tag.toLowerCase() === "path" ?
                document.createElementNS("http://www.w3.org/2000/svg", "path") :
                document.createElement(tag);
        _this.options = options;

        if (_this.element instanceof HTMLElement || _this.element instanceof SVGElement) {
            if (_this.options.classes)
                _this.options.classes.forEach(function(el) {
                    _this.element.classList.add(el);
                });

            if (_this.options.id)
                _this.element.id = _this.options.id;

            if (_this.options.add)
                if (_this.options.add.append) {
                    _this.options.add.append.forEach(function(el) {
                        el.append(_this.element);
                    });
                } else if (_this.options.add.prepend) {
                    _this.options.add.prepend.forEach(function(el) {
                        el.prepend(_this.element);
                    });
                } else if (_this.options.add.after) {
                    _this.options.add.after.forEach(function(el) {
                        el.after(_this.element);
                    });
                } else if (_this.options.add.before) {
                    _this.options.add.before.forEach(function(el) {
                        el.before(_this.element);
                    });
                }

            if (_this.options.html)
                _this.element.innerHTML = _this.options.html;

            if (_this.options.text && _this.element instanceof HTMLElement)
                _this.element.innerText = _this.options.text;

            if (_this.options.href && _this.element instanceof HTMLAnchorElement)
                _this.element.href = _this.options.href;
        }
    }

    this.initialize();
}

/** @returns {void} */
nkchCSS.prototype.initialize = function() {
    /** @type {nkchCSS} */
    const _this = this;

    switch (mw.config.get("skin")) {
        case "fandomdesktop":
            /* ~ quickbar item ~ */
            const quickbarItem = new _this.Element("li", {
                classes: ["nkch-css4__quickbar-button"],
                add: {
                    append: [document.querySelector("#WikiaBar .toolbar .tools")]
                }
            }).element;

            _this.elements.quickbarItem = quickbarItem;

            
            /* ~ quickbar item : spinner ~ */
            const quickbarItem_spinner = new _this.Element("span", {
                classes: ["nkch-css4__quickbar-button-spinner", "is-hidden"],
                add: {
                    append: [quickbarItem]
                }
            }).element;

            _this.elements.quickbarItem_spinner = quickbarItem_spinner;


            /* ~ quickbar item : link ~ */
            const quickbarItem_link = new _this.Element("a", {
                classes: ["nkch-css4__quickbar-button-link"],
                text: "nkchCSS 4",
                href: "#",
                add: {
                    append: [quickbarItem]
                }
            }).element;

            quickbarItem_link.addEventListener("click", _this.show.bind(_this), false);
            
            _this.elements.quickbarItem_link = quickbarItem_link;
            break;

        case "vector":
        case "vector-2022":
            /* ~ sidebar item ~ */
            const vectorMenuItem = new _this.Element("li", {
                classes: ["nkch-css4__sidebar-button", "mw-list-item"],
                id: "n-nkchcss",
                href: "#",
                add: {
                    append: [document.querySelector("#mw-panel .vector-menu-content-list")]
                }
            }).element;

            _this.elements.vectorMenuItem = vectorMenuItem;

            
            /* ~ sidebar item : spinner ~ */
            const vectorMenuItem_spinner = new _this.Element("span", {
                classes: ["nkch-css4__sidebar-button-spinner", "is-hidden"],
                add: {
                    append: [vectorMenuItem]
                }
            }).element;

            _this.elements.vectorMenuItem_spinner = vectorMenuItem_spinner;


            /* ~ sidebar item : link ~ */
            const vectorMenuItem_link = new _this.Element("a", {
                classes: ["nkch-css4__sidebar-button-link"],
                text: "nkchCSS 4",
                href: "#",
                add: {
                    append: [vectorMenuItem]
                }
            }).element;

            vectorMenuItem_link.addEventListener("click", _this.show.bind(_this), false);

            _this.elements.vectorMenuItem_link = vectorMenuItem_link;
            break;
    }
}

/** @returns {void} */
nkchCSS.prototype.initializeEditor = function() {
    /** @type {nkchCSS} */
    const _this = this;

    mw.loader.using(["oojs-ui"]).then(
        function() {
            switch (mw.config.get("skin")) {
                case "fandomdesktop":
                    _this.elements.quickbarItem_spinner.classList.remove("is-hidden");
                    break;

                case "vector":
                case "vector-2022":
                    _this.elements.vectorMenuItem_spinner.classList.remove("is-hidden");
                    break;
            }

            mw.loader.load("https://code.jquery.com/ui/" + "1.13.1" + "/themes/base/jquery-ui.css", "text/css");
            mw.loader.load(_this.getUnpkgLink("codemirror", "5.65.5", "lib/codemirror.css"), "text/css");

            mw.loader.getScript(_this.getUnpkgLink("codemirror", "5.65.5")).then(
                function() {
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
    );

    function OnModuleLoad() {
        /* ~ style ~ */
        const style = new _this.Element("style", {
            classes: ["nkch-css4__style", "nkch-css4__style--css"],
            add: {
                append: [document.head]
            }
        }).element;

        style.setAttribute("type", "text/css");

        _this.elements.style = style;


        /* ~ main ~ */
        const main = new _this.Element("div", {
            classes: ["nkch-css4", "is-disabled"],
            add: {
                after: [document.body]
            }
        }).element;

        $(main).draggable({
            cancel: ".nkch-css4__content, .nkch-css4__popup, .nkch-css4__header-button, .nkch-css4__compile, .nkch-css4__statusbar, .nkch-css4__error",
            opacity: 0.8,
            start: function() {
                $(main).css({
                    "right": "auto",
                    "bottom": "auto"
                });
            }
        }).css({
            position: "fixed"
        });

        document.body.classList.add("nkch-css4__is-added");

        _this.elements.main = main;


        /* ~ main : notice ~ */
        const main_notice = new _this.Element("div", {
            classes: ["nkch-css4__notice"],
            add: {
                append: [main]
            }
        }).element;

        _this.elements.main_notice = main_notice;


        /* ~ main : header ~ */
        const main_header = new _this.Element("div", {
            classes: ["nkch-css4__header"],
            add: {
                append: [main]
            }
        }).element;
        
        _this.elements.main_header = main_header;


        /* ~ main : header left ~ */
        const main_headerLeft = new _this.Element("div", {
            classes: ["nkch-css4__header-left"],
            add: {
                append: [main_header]
            }
        }).element;

        _this.elements.main_headerLeft = main_headerLeft;


        /* ~ main : header title ~ */
        const main_headerTitle = new _this.Element("div", {
            classes: ["nkch-css4__header-title"],
            html: _this.options.title,
            add: {
                append: [main_headerLeft]
            }
        }).element;

        _this.elements.main_headerTitle = main_headerTitle;


        /* ~ main : header info ~ */
        const main_headerInfo = new _this.Element("div", {
            classes: ["nkch-css4__header-info"],
            add: {
                append: [main_headerLeft]
            }
        }).element;

        _this.elements.main_headerInfo = main_headerInfo;


        /* ~ main : header right ~ */
        const main_headerRight = new _this.Element("div", {
            classes: ["nkch-css4__header-right"],
            add: {
                append: [main_header]
            }
        }).element;

        _this.elements.main_headerRight = main_headerRight;
    

        /* ~ main : header button group ~ */
        const main_headerButtonGroup = new _this.Element("div", {
            classes: ["nkch-css4__header-button-group"],
            add: {
                append: [main_headerRight]
            }
        }).element;

        _this.elements.main_headerButtonGroup = main_headerButtonGroup;


        /* ~ main : header button (beautify) ~ */
        const main_headerButton__beautify = new _this.Element("button", {
            classes: ["nkch-css4__header-button", "nkch-css4__header-button--beautify"],
            add: {
                append: [main_headerButtonGroup]
            }
        }).element;

        main_headerButton__beautify.addEventListener("click", function() {
            _this.beautify(_this.editor.getValue());
        }, false);

        _this.elements.main_headerButton__beautify = main_headerButton__beautify;


        /** @type {SVGSVGElement} */
        const main_headerButton__beautifyIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        _this.elements.main_headerButton__beautifyIcon = main_headerButton__beautifyIcon;

        main_headerButton__beautifyIcon.classList.add("nkch-css4__header-icon");
        main_headerButton__beautifyIcon.setAttribute("viewBox", "0 0 18 18");
        main_headerButton__beautifyIcon.setAttribute("aria-hidden", "true");

        main_headerButton__beautify.append(main_headerButton__beautifyIcon);


        /** @type {SVGPathElement} */
        const main_headerButton__beautifyIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        _this.elements.main_headerButton__beautifyIconPath = main_headerButton__beautifyIconPath;

        main_headerButton__beautifyIconPath.setAttribute("d", _this.svgPath.star);
        main_headerButton__beautifyIconPath.setAttribute("fill-rule", "evenodd");
        main_headerButton__beautifyIconPath.setAttribute("clip-rule", "evenodd");

        main_headerButton__beautifyIcon.append(main_headerButton__beautifyIconPath);

        
        /* ~ main : header button (toggle) ~ */
        const main_headerButton__toggle = new _this.Element("button", {
            classes: ["nkch-css4__header-button", "nkch-css4__header-button--toggle", _this.isEditorEnabled ? "is-enabled" : "is-disabled"],
            add: {
                append: [main_headerButtonGroup]
            }
        }).element;

        main_headerButton__toggle.addEventListener("click", function() {
            _this.toggle(!_this.isEditorEnabled);
        }, false);

        _this.elements.main_headerButton__toggle = main_headerButton__toggle;


        /** @type {SVGSVGElement} */
        const main_headerButton__toggleIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        _this.elements.main_headerButton__toggleIcon = main_headerButton__toggleIcon;

        main_headerButton__toggleIcon.classList.add("nkch-css4__header-icon");
        main_headerButton__toggleIcon.setAttribute("viewBox", "0 0 18 18");
        main_headerButton__toggleIcon.setAttribute("aria-hidden", "true");

        main_headerButton__toggle.append(main_headerButton__toggleIcon);


        /** @type {SVGPathElement} */
        const main_headerButton__toggleIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        _this.elements.main_headerButton__toggleIconPath = main_headerButton__toggleIconPath;

        main_headerButton__toggleIconPath.setAttribute("d", _this.isEditorEnabled ? _this.svgPath.eye : _this.svgPath.eyeCrossed);
        main_headerButton__toggleIconPath.setAttribute("fill-rule", "evenodd");
        main_headerButton__toggleIconPath.setAttribute("clip-rule", "evenodd");

        main_headerButton__toggleIcon.append(main_headerButton__toggleIconPath);

        
        /* ~ main : header button (close) ~ */
        const main_headerButton__close = new _this.Element("button", {
            classes: ["nkch-css4__header-button", "nkch-css4__header-button--close"],
            add: {
                append: [main_headerButtonGroup]
            }
        }).element;

        main_headerButton__close.addEventListener("click", _this.hide.bind(_this), false);

        _this.elements.main_headerButton__close = main_headerButton__close;


        /** @type {SVGSVGElement} */
        const main_headerButton__closeIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        _this.elements.main_headerButton__closeIcon = main_headerButton__closeIcon;

        main_headerButton__closeIcon.classList.add("nkch-css4__header-icon");
        main_headerButton__closeIcon.setAttribute("viewBox", "0 0 18 18");
        main_headerButton__closeIcon.setAttribute("aria-hidden", "true");

        main_headerButton__close.append(main_headerButton__closeIcon);

        
        /** @type {SVGPathElement} */
        const main_headerButton__closeIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        _this.elements.main_headerButton__closeIconPath = main_headerButton__closeIconPath;

        main_headerButton__closeIconPath.setAttribute("d", _this.svgPath.close);
        main_headerButton__closeIconPath.setAttribute("fill-rule", "evenodd");
        main_headerButton__closeIconPath.setAttribute("clip-rule", "evenodd");

        main_headerButton__closeIcon.append(main_headerButton__closeIconPath);

        
        /* ~ main : compile ~ */
        const main_compile = new _this.Element("div", {
            classes: ["nkch-css4__compile"],
            add: {
                append: [main]
            }
        }).element;

        var compile_less = new OO.ui.ButtonWidget({
            label: "Less → CSS",
            classes: ["nkch-css4__compile-button", "nkch-css4__compile-button--less"],
            framed: false
        });

        _this.elements.compile_less = compile_less;
        compile_less.toggle(false);
        
        compile_less.on("click", function() {
            if (!compile_less.isDisabled()) _this.compile(_this.editor.getValue(), "text/x-less");
        });

        const compileLayout = new OO.ui.HorizontalLayout({ items: [compile_less] });
        $(main_compile).append(compileLayout.$element);
        
        _this.elements.main_compile = main_compile;

        
        /* ~ main : content ~ */
        const main_content = new _this.Element("div", {
            classes: ["nkch-css4__content"],
            add: {
                append: [main]
            }
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


        /** @type {HTMLTextAreaElement} */
        const main_contentTextArea = document.createElement("textarea");
        _this.elements.main_contentTextArea = main_contentTextArea;

        main_contentTextArea.classList.add("nkch-css4__textarea");

        main_content.append(main_contentTextArea);

        _this.editor = self.CodeMirror.fromTextArea(main_contentTextArea, {
            indentUnit: 4,
            lineWrapping: true,
            lineNumbers: true,
            autoCloseBrackets: true
        });

        _this.editor.setOption("mode", "css");

        emmetCodeMirror(_this.editor);

        tabs.on("set", function(event) {
            switch (event.name) {
                case "css":
                    _this.editor.setOption("mode", "css");

                    compile_less.toggle(false);
                    _this.updateCode(_this.editor.getValue(), _this.editor.getOption("mode"));

                    _this.editor.refresh();
                    break;

                case "less":
                    _this.editor.setOption("mode", "text/x-less");

                    compile_less.toggle(true);
                    _this.updateCode(_this.editor.getValue(), _this.editor.getOption("mode"));

                    _this.editor.refresh();
                    break;
            }
        });

        _this.editor.setSize(450, 220);
        _this.editor.refresh();

        _this.editor.on("keyup", function () {
            _this.updateCode(_this.editor.getValue(), _this.editor.getOption("mode"));
        });

        /** @type {HTMLDivElement} */
        const main_statusbar = document.createElement("div");
        _this.elements.main_statusbar = main_statusbar;

        main_statusbar.classList.add("nkch-css4__statusbar");

        main.append(main_statusbar);

        /** @type {HTMLDivElement} */
        const main_statusbarContainer__left = document.createElement("div");
        _this.elements.main_statusbarContainer__left = main_statusbarContainer__left;

        main_statusbarContainer__left.classList.add("nkch-css4__statusbar-container", "nkch-css4__statusbar-container--left");

        main_statusbar.append(main_statusbarContainer__left);

        /** @type {HTMLAnchorElement} */
        const main_statusbarItem__fileDownload = document.createElement("a");
        _this.elements.main_statusbarItem__fileDownload = main_statusbarItem__fileDownload;

        main_statusbarItem__fileDownload.classList.add("nkch-css4__statusbar-item", "nkch-css4__status-item--download");
        main_statusbarItem__fileDownload.setAttribute("role", "button");
        main_statusbarItem__fileDownload.setAttribute("role", "button");

        main_statusbarItem__fileDownload.addEventListener("click", function() {
            if (_this.editor.getValue() === "") return;

            var date = new Date(),
                filetype = "",
                filename =
                    mw.config.get("wgWikiID") + " " +
                    date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2, "0") + "-" + date.getDate().toString().padStart(2, "0") + " " +
                    date.getHours().toString().padStart(2, "0") + "-" + date.getMinutes().toString().padStart(2, "0") + "-" + date.getSeconds().toString().padStart(2, "0");

                switch (_this.editor.getOption("mode")) {
                    case "css":
                        filetype = "text/css";
                        filename += ".css";
                        break;
                    case "text/x-less":
                        filetype = "text/x-less";
                        filename += ".less";
                        break;
                }

            main_statusbarItem__fileDownload.setAttribute("download", filename);
            main_statusbarItem__fileDownload.href = URL.createObjectURL(new Blob([_this.editor.getValue()], {
                type: filetype,
            }));
        }, false);

        main_statusbarContainer__left.append(main_statusbarItem__fileDownload);


        /** @type {SVGSVGElement} */
        const main_statusbarItem__fileDownloadIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        _this.elements.main_statusbarItem__fileDownloadIcon = main_statusbarItem__fileDownloadIcon;

        main_statusbarItem__fileDownloadIcon.classList.add("nkch-css4__statusbar-item-icon");
        main_statusbarItem__fileDownloadIcon.setAttribute("viewBox", "0 0 18 18");
        main_statusbarItem__fileDownloadIcon.setAttribute("aria-hidden", "true");

        main_statusbarItem__fileDownload.append(main_statusbarItem__fileDownloadIcon);

        
        /** @type {SVGPathElement} */
        const main_statusbarItem__fileDownloadIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        _this.elements.main_statusbarItem__fileDownloadIconPath = main_statusbarItem__fileDownloadIconPath;

        main_statusbarItem__fileDownloadIconPath.setAttribute("d", _this.svgPath.download);
        main_statusbarItem__fileDownloadIconPath.setAttribute("fill-rule", "evenodd");
        main_statusbarItem__fileDownloadIconPath.setAttribute("clip-rule", "evenodd");

        main_statusbarItem__fileDownloadIcon.append(main_statusbarItem__fileDownloadIconPath);


        const main_statusbarItem__fileUploadInput = new _this.Element("input", {
            add: {
                append: [main_statusbarContainer__left]
            }
        }).element;

        main_statusbarItem__fileUploadInput.setAttribute("type", "file");
        main_statusbarItem__fileUploadInput.setAttribute("accept", "text/css,.less");

        main_statusbarItem__fileUploadInput.style.display = "none";

        main_statusbarItem__fileUploadInput.addEventListener("change", function() {
            if (main_statusbarItem__fileUploadInput.files.length < 1) return;

            var file = main_statusbarItem__fileUploadInput.files[0];

            file.text().then(
                function(text) {
                    if (file.name.endsWith(".css")) 
                        tabs.setTabPanel("css");
                    else if (file.name.endsWith(".less")) 
                        tabs.setTabPanel("less");

                    _this.editor.setValue(text);
                    _this.updateCode(_this.editor.getValue(), _this.editor.getOption("mode"));
                    main_statusbarItem__fileUploadInput.value = "";
                }
            );
        }, false);

        _this.elements.main_statusbarItem__fileUploadInput = main_statusbarItem__fileUploadInput;


        /** @type {HTMLAnchorElement} */
        const main_statusbarItem__fileUpload = document.createElement("a");
        _this.elements.main_statusbarItem__fileUpload = main_statusbarItem__fileUpload;

        main_statusbarItem__fileUpload.classList.add("nkch-css4__statusbar-item", "nkch-css4__status-item--upload");
        main_statusbarItem__fileUpload.setAttribute("role", "button");

        main_statusbarItem__fileUpload.addEventListener("click", function() {
            if (main_statusbarItem__fileUploadInput)
                main_statusbarItem__fileUploadInput.click();
        }, false);

        main_statusbarContainer__left.append(main_statusbarItem__fileUpload);


        /** @type {SVGSVGElement} */
        const main_statusbarItem__fileUploadIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        _this.elements.main_statusbarItem__fileUploadIcon = main_statusbarItem__fileUploadIcon;

        main_statusbarItem__fileUploadIcon.classList.add("nkch-css4__statusbar-item-icon");
        main_statusbarItem__fileUploadIcon.setAttribute("viewBox", "0 0 18 18");
        main_statusbarItem__fileUploadIcon.setAttribute("aria-hidden", "true");

        main_statusbarItem__fileUpload.append(main_statusbarItem__fileUploadIcon);


        /** @type {SVGPathElement} */
        const main_statusbarItem__fileUploadIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        _this.elements.main_statusbarItem__fileUploadIconPath = main_statusbarItem__fileUploadIconPath;

        main_statusbarItem__fileUploadIconPath.setAttribute("d", _this.svgPath.upload);
        main_statusbarItem__fileUploadIconPath.setAttribute("fill-rule", "evenodd");
        main_statusbarItem__fileUploadIconPath.setAttribute("clip-rule", "evenodd");

        main_statusbarItem__fileUploadIcon.append(main_statusbarItem__fileUploadIconPath);


        /** @type {HTMLDivElement} */
        const main_statusbarContainer__right = document.createElement("div");
        _this.elements.main_statusbarContainer__right = main_statusbarContainer__right;

        main_statusbarContainer__right.classList.add("nkch-css4__statusbar-container", "nkch-css4__statusbar-container--right");

        main_statusbar.append(main_statusbarContainer__right);

        /** @type {HTMLAnchorElement} */
        const main_statusbarItem__selection = document.createElement("a");
        _this.elements.main_statusbarItem__selection = main_statusbarItem__selection;

        main_statusbarItem__selection.classList.add("nkch-css4__statusbar-item", "nkch-css4__status-item--selection");
        main_statusbarItem__selection.setAttribute("role", "button");
        main_statusbarItem__selection.innerText = "L: 1 • C: 1";

        _this.editor.on("cursorActivity", function() {
            var cursor = _this.editor.getCursor(),
                selection = _this.editor.getSelection();

                main_statusbarItem__selection.innerText = "L: " + (cursor.line + 1) + " • C: " + (cursor.ch + 1);
                
            if (selection.length > 0) main_statusbarItem__selection.innerText += " • S: " + selection.length;
        })

        main_statusbarContainer__right.append(main_statusbarItem__selection);

        /** @type {HTMLDivElement} */
        const main_error = document.createElement("div");
        _this.elements.main_error = main_error;

        main_error.classList.add("nkch-css4__error");

        main.append(main_error);

        /** @type {HTMLSpanElement} */
        const main_errorTitle = document.createElement("span");
        _this.elements.main_errorTitle = main_errorTitle;

        main_errorTitle.classList.add("nkch-css4__error-title");

        main_error.append(main_errorTitle);

        /** @type {HTMLSpanElement} */
        const main_errorContent = document.createElement("span");
        _this.elements.main_errorContent = main_errorContent;

        main_errorContent.classList.add("nkch-css4__error-content");

        main_error.append(main_errorContent);
        
        switch (mw.config.get("skin")) {
            case "fandomdesktop":
                _this.elements.quickbarItem_spinner.classList.add("is-hidden");
                break;

            case "vector":
            case "vector-2022":
                _this.elements.vectorMenuItem_spinner.classList.add("is-hidden");
                break;
        }

        _this.isEditorInitialized = true;
        _this.show();
    } 
}

/** 
 * @param {Event} [event]
 * @returns {void}
 */
nkchCSS.prototype.show = function(event) {
    /** @type {nkchCSS} */
    const _this = this;
    
    if (event) event.preventDefault();

    if (!_this.isEditorInitialized) return _this.initializeEditor();
    else if (_this.isEditorShown) return;

    _this.elements.main.classList.remove("is-disabled");

    const openAnimation = _this.elements.main.animate([{
        opacity: 0,
        transform: "translateY(10px)"
    }, {
        opacity: 1,
        transform: "translateY(0)"
    }], {
        easing: "ease",
        duration: 300
    });

    _this.elements.main.dispatchEvent(new Event("nkch-css-open"));
    _this.isEditorShown = true;
}

/** 
 * @param {Event} [event]
 * @returns {void}
 */
nkchCSS.prototype.hide = function(event) {
    /** @type {nkchCSS} */
    const _this = this;

    if (event) event.preventDefault();

    if (!_this.isEditorInitialized) return;
    else if (!_this.isEditorShown) return;

    const closeAnimation = _this.elements.main.animate([{
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
        _this.elements.main.classList.add("is-disabled");
    };

    _this.elements.main.dispatchEvent(new Event("nkch-css-close"));
    _this.isEditorShown = false;
}

/** 
 * @param {string} code
 * @param {string | CodeMirror.ModeSpec<CodeMirror.ModeSpecOptions> } mode
 * @returns {void}
 */
nkchCSS.prototype.updateCode = function(code, mode) {
    /** @type {nkchCSS} */
    const _this = this;

    if (_this.isEditorEnabled) {
        switch (mode) {
            default:
            case "css":
                if (_this.isErrorVisible) {
                    _this.elements.main_error.classList.remove("is-visible");

                    _this.elements.main_errorTitle.innerText = "";
                    _this.elements.main_errorContent.innerText = "";
                }

                _this.elements.style.innerHTML = code;
                break;
            case "text/x-less":
                less.render(code)
                    .then(
                        function (output) {
                            if (_this.isErrorVisible) {
                                _this.elements.main_error.classList.remove("is-visible");

                                _this.elements.main_errorTitle.innerText = "";
                                _this.elements.main_errorContent.innerText = "";

                                _this.isErrorVisible = false;
                            }

                            _this.elements.compile_less.setDisabled(false);
                            _this.updateCode(output.css, "css");
                        }
                    )
                    .catch(
                        function (error) {
                            _this.elements.main_error.classList.add("is-visible");

                            _this.elements.main_errorTitle.innerText = "Less (" + error.line + ":" + (error.column + 1) + ")";
                            _this.elements.main_errorContent.innerText = error.message;

                            _this.elements.compile_less.setDisabled(true);
                            _this.isErrorVisible = true;
                        }
                    );
                break;
        }

        _this.elements.main.dispatchEvent(new Event("nkch-css-update"));
    }
}

/** 
 * @param {string} code
 * @param {string} mode
 * @returns {void}
 */
nkchCSS.prototype.compile = function(code, mode) {
    /** @type {nkchCSS} */
    const _this = this;

    switch (mode) {
        case "text/x-less":
            less.render(code)
                .then(
                    function (output) {
                        _this.elements.tabs.setTabPanel("css");
                        _this.beautify(output.css);
                        _this.updateCode(_this.editor.getValue(), "css");
                    }
                )
    }
}

/** 
 * @param {string} code
 * @returns {void}
 */
nkchCSS.prototype.beautify = function(code) {
    /** @type {nkchCSS} */
    const _this = this;

    var codeBeautified = css_beautify(code, {
        indent_size: "4",
        indent_char: " "
    });

    _this.editor.setValue(codeBeautified);
}

/** 
 * @param {boolean} state
 * @returns {void}
 */
nkchCSS.prototype.toggle = function(state) {
    /** @type {nkchCSS} */
    const _this = this;

    var classList = _this.elements.main_headerButton__toggle.classList;
    switch (state) {
        case true:
            if (!_this.isEditorEnabled) {
                classList.add("is-enabled");
                classList.remove("is-disabled");

                _this.elements.main_headerButton__toggleIconPath.setAttribute("d", _this.svgPath.eye);
                _this.isEditorEnabled = true;

                _this.updateCode(_this.editor.getValue(), _this.editor.getOption("mode"));
            }
            break;
        case false:
            if (_this.isEditorEnabled) {
                classList.add("is-disabled");
                classList.remove("is-enabled");

                _this.elements.main_headerButton__toggleIconPath.setAttribute("d", _this.svgPath.eyeCrossed);
                _this.isEditorEnabled = false;

                _this.elements.style.innerHTML = "";
            }
            break;
    }
}

/** 
 * @param {string} module
 * @param {string} [version]
 * @param {string} [path]
 * @returns {string | never}
 */
nkchCSS.prototype.getUnpkgLink = function(module, version, path) {
    if (!module) throw new Error("Module is not specified");
    if (module.includes("/")) module.replaceAll(/^\/?|\/?$/, "");

    var string = ("https://unpkg.com/" + module) + (version ? "@" + version : "") + (path ? "/" + path : "");
    return string;
}

/**
 * @param {nkchCSS.Options} [options]
 * @returns {void}
*/
function nkchCSS__setup(options) {
    /** @type {nkch} */
    var nkch = window.nkch ? window.nkch : {};
    window.nkch = nkch;

    mw.loader.load("https://nkch.fandom.com/wiki/MediaWiki:NkchCSS4.css?action=raw&ctype=text/css", "text/css");
    
    if (nkch.css4 && nkch.css4 instanceof nkchCSS) {
        return mw.log.warn("nkchCSS is already in use.");
    } else nkch.css4 = new nkchCSS(options ? options : {});
}

nkchCSS__setup();