"use strict";
// Hello from TypeScript
/// <reference types="../node_modules/monaco-editor/monaco" />
var nkchCSS = /** @class */ (function () {
    function nkchCSS(options) {
        this.options = options;
        this.checks = {
            editor: {
                isInitialized: false,
                isEnabled: true,
                isOpen: false
            },
            isCodeInvalid: false
        };
        this.elements = {};
        this.oojsElements = {};
        this.env = {
            skin: mw.config.get("skin"),
            lang: mw.config.get("wgScriptPath").replace("/", "")
        };
        this.versions = new Map([
            ["jquery", "3.6.1"],
            ["jquery-ui", "1.13.2"],
            ["require.js", "2.3.6"],
            ["less", "4.1.3"],
            ["monaco-editor", "0.34.0"]
        ]);
        this.initialize();
    }
    nkchCSS.prototype.open = function (event) {
        if (event)
            event.preventDefault();
        if (!this.checks.editor.isInitialized)
            return this.initializeEditor();
        else if (this.checks.editor.isOpen)
            return;
        this.elements.main.classList.remove("is-closed");
        var showAnimation = this.elements.main.animate([{
                opacity: 0,
                transform: "translateY(10px)"
            }, {
                opacity: 1,
                transform: "translateY(0)"
            }], {
            duration: 300,
            easing: "ease"
        });
        this.elements.main.dispatchEvent(new CustomEvent("nkch-css4-open", {
            cancelable: true,
            detail: this
        }));
        this.checks.editor.isOpen = true;
    };
    nkchCSS.prototype.close = function (event) {
        var _this = this;
        if (event)
            event.preventDefault();
        if (!this.checks.editor.isInitialized)
            return this.initializeEditor();
        else if (!this.checks.editor.isOpen)
            return;
        var hideAnimation = this.elements.main.animate([{
                opacity: 1,
                transform: "translateY(0)"
            }, {
                opacity: 0,
                transform: "translateY(10px)"
            }], {
            duration: 300,
            easing: "ease"
        });
        hideAnimation.onfinish = function () { return _this.elements.main.classList.add("is-closed"); };
        this.elements.main.dispatchEvent(new CustomEvent("nkch-css4-close", {
            cancelable: true,
            detail: this
        }));
        this.checks.editor.isOpen = false;
    };
    nkchCSS.prototype.toggle = function (state) {
        switch (state) {
            case true:
                this.elements.main_headerButton__toggle.classList.add("is-enabled");
                this.elements.main_headerButton__toggle.classList.remove("is-disabled");
                this.elements.main_headerButtonIconPath__toggle.setAttribute("d", SvgPath.Eye);
                this.checks.editor.isEnabled = true;
                this.updateCode(this.editor.getValue(), this.getLanguage());
                break;
            case false:
                this.elements.main_headerButton__toggle.classList.add("is-disabled");
                this.elements.main_headerButton__toggle.classList.remove("is-enabled");
                this.elements.main_headerButtonIconPath__toggle.setAttribute("d", SvgPath.EyeCrossed);
                this.checks.editor.isEnabled = false;
                this.elements.style.innerHTML = "";
                break;
        }
    };
    nkchCSS.prototype.updateCode = function (code, language, saveToStorage) {
        var _this = this;
        if (saveToStorage === void 0) { saveToStorage = true; }
        if (!this.checks.editor.isEnabled)
            return;
        if (saveToStorage) {
            mw.storage.setObject("mw-nkch-css", {
                lang: language,
                value: code
            });
        }
        switch (language) {
            default:
            case "css":
                this.checks.isCodeInvalid = false;
                this.elements.style.innerHTML = code;
                break;
            case "less":
                less.render(code)
                    .then(function (output) {
                    _this.checks.isCodeInvalid = false;
                    _this.oojsElements.compileLessButtonWidget.setDisabled(false);
                    _this.updateCode(output.css, "css", false);
                })
                    .catch(function (error) {
                    _this.checks.isCodeInvalid = true;
                    _this.oojsElements.compileLessButtonWidget.setDisabled(true);
                });
                break;
        }
        this.elements.main.dispatchEvent(new CustomEvent("nkch-css4-update", {
            cancelable: true,
            detail: this
        }));
    };
    nkchCSS.prototype.setValue = function (text) {
        var model = this.editor.getModel();
        if (model) {
            this.editor.pushUndoStop();
            this.editor.executeEdits("", [{
                    range: model.getFullModelRange(),
                    text: text
                }]);
            this.updateCode(this.editor.getValue(), this.getLanguage());
        }
    };
    nkchCSS.prototype.getLanguage = function () {
        var model = this.editor.getModel();
        return model.getLanguageId();
    };
    nkchCSS.prototype.setLanguage = function (lang, changeTab) {
        if (changeTab === void 0) { changeTab = true; }
        var model = this.editor.getModel();
        if (model)
            monaco.editor.setModelLanguage(model, lang);
        if (changeTab)
            this.oojsElements.tabs.setTabPanel(lang);
    };
    nkchCSS.prototype.compileLess = function (code) {
        var _this = this;
        if (this.getLanguage() !== "less")
            return;
        less.render(code)
            .then(function (output) {
            if (!_this.checks.isCodeInvalid) {
                _this.setValue(output.css);
                _this.setLanguage("css");
                _this.updateCode(output.css, "css");
            }
        });
    };
    nkchCSS.prototype.initialize = function () {
        var _this = this;
        switch (this.env.skin) {
            case "fandomdesktop":
                /* ~ quickbar item ~ */
                var quickbarItem = document.createElement("li");
                quickbarItem.classList.add("nkch-css4__quickbar-button");
                this.elements.quickbarItem = quickbarItem;
                /* ~ quickbar item : spinner ~ */
                var quickbarItem_spinner = document.createElement("span");
                quickbarItem_spinner.classList.add("nkch-css4__quickbar-button-spinner", "is-hidden");
                this.elements.quickbarItem_spinner = quickbarItem_spinner;
                quickbarItem.append(quickbarItem_spinner);
                /* ~ quickbar item : link ~ */
                var quickbarItem_link = document.createElement("a");
                quickbarItem_link.classList.add("nkch-css4__quickbar-button-link");
                quickbarItem_link.setAttribute("href", "#");
                quickbarItem_link.innerHTML = "nkchCSS" + "<sup>" + 4 + "</sup>";
                this.elements.quickbarItem_link = quickbarItem_link;
                quickbarItem.append(quickbarItem_link);
                quickbarItem_link.addEventListener("click", function () { return _this.open(); }, false);
                document.querySelector("#WikiaBar .toolbar .tools").append(quickbarItem);
                break;
            default:
            case "vector":
            case "vector-2022":
                /* ~ sidebar item ~ */
                var sidebarItem = document.createElement("li");
                sidebarItem.classList.add("nkch-css4__sidebar-button", "mw-list-item");
                sidebarItem.id = "n-nkchcss";
                this.elements.sidebarItem = sidebarItem;
                document.querySelector("#mw-panel .vector-menu-content-list").append(sidebarItem);
                /* ~ sidebar item : spinner ~ */
                var sidebarItem_spinner = document.createElement("span");
                sidebarItem_spinner.classList.add("nkch-css4__sidebar-button-spinner", "is-hidden");
                this.elements.sidebarItem_spinner = sidebarItem_spinner;
                sidebarItem.append(sidebarItem_spinner);
                /* ~ sidebar item : link ~ */
                var sidebarItem_link = document.createElement("a");
                sidebarItem_link.classList.add("nkch-css4__sidebar-button-link");
                sidebarItem_link.setAttribute("href", "#");
                sidebarItem_link.innerText = "nkchCSS 4";
                this.elements.sidebarItem_link = sidebarItem_link;
                sidebarItem.append(sidebarItem_link);
                sidebarItem_link.addEventListener("click", function () { return _this.open(); }, false);
                break;
        }
    };
    nkchCSS.prototype.initializeEditor = function () {
        var _this = this;
        var targetSpinner;
        switch (this.env.skin) {
            case "fandomdesktop":
                targetSpinner = this.elements.quickbarItem_spinner;
                break;
            default:
            case "vector":
            case "vector-2022":
                targetSpinner = this.elements.sidebarItem_spinner;
                break;
        }
        targetSpinner.classList.remove("is-hidden");
        mw.loader.load("https://code.jquery.com/ui/".concat(this.versions.get("jquery-ui"), "/themes/base/jquery-ui.css"), "text/css");
        mw.loader.load("https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/".concat(this.versions.get("monaco-editor"), "/min/vs/editor/editor.main.min.css"), "text/css");
        mw.loader.using(["oojs-ui"]).then(function () {
            mw.loader.getScript("https://cdnjs.cloudflare.com/ajax/libs/require.js/".concat(_this.versions.get("require.js"), "/require.min.js"))
                .then(_this.onModuleLoad.bind(_this));
        });
    };
    nkchCSS.prototype.onModuleLoad = function () {
        var _this = this;
        require.config({
            paths: {
                "jquery": "https://code.jquery.com/jquery-".concat(this.versions.get("jquery"), ".min"),
                "jquery-ui": "https://code.jquery.com/ui/".concat(this.versions.get("jquery-ui"), "/jquery-ui.min"),
                "less": "https://cdnjs.cloudflare.com/ajax/libs/less.js/".concat(this.versions.get("less"), "/less.min"),
                "vs": "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/".concat(this.versions.get("monaco-editor"), "/min/vs")
            },
            shim: {
                "jquery-ui": {
                    exports: "$",
                    deps: ["jquery"]
                }
            }
        });
        require(["jquery", "jquery-ui", "less", "vs/editor/editor.main"], function () {
            /* ~ window manager ~ */
            var windowManager = new OO.ui.WindowManager({
                classes: ["nkch-css4__window-manager"]
            });
            $(document.body).append(windowManager.$element);
            _this.oojsElements.windowManager = windowManager;
            /* ~ style ~ */
            var style = document.createElement("style");
            style.classList.add("nkch-css4-style");
            _this.elements.style = style;
            document.head.append(style);
            /* ~ main ~ */
            var main = document.createElement("div");
            main.classList.add("nkch-css4");
            _this.elements.main = main;
            document.body.after(main);
            $(main).draggable({
                cancel: ".nkch-css4__content, .nkch-css4__popup, .nkch-css4__header-button, .nkch-css4__compile, .nkch-css4__statusbar, .nkch-css4__error",
                opacity: 0.8,
                start: function () {
                    main.style.right = "auto";
                    main.style.bottom = "auto";
                }
            }).css({
                position: "fixed"
            });
            /* ~ main : container ~ */
            var main_container = document.createElement("div");
            main_container.classList.add("nkch-css4__container");
            _this.elements.main_container = main_container;
            main.append(main_container);
            /* ~ main : header ~ */
            var main_header = document.createElement("div");
            main_header.classList.add("nkch-css4__header");
            _this.elements.main_header = main_header;
            main_container.append(main_header);
            /* ~ main : header left ~ */
            var main_headerLeft = document.createElement("div");
            main_headerLeft.classList.add("nkch-css4__header-left");
            _this.elements.main_headerLeft = main_headerLeft;
            main_header.append(main_headerLeft);
            /* ~ main : header title ~ */
            var main_headerTitle = document.createElement("div");
            main_headerTitle.classList.add("nkch-css4__header-title");
            main_headerTitle.innerHTML = "nkchCSS 4<sup style='font-size: 10px; vertical-align: super;'>OBT 5</sup>";
            _this.elements.main_headerTitle = main_headerTitle;
            main_headerLeft.append(main_headerTitle);
            /* ~ main : header right ~ */
            var main_headerRight = document.createElement("div");
            main_headerRight.classList.add("nkch-css4__header-right");
            _this.elements.main_headerRight = main_headerRight;
            main_header.append(main_headerRight);
            /* ~ main : header button group ~ */
            var main_headerButtonGroup = document.createElement("div");
            main_headerButtonGroup.classList.add("nkch-css4__header-button-group");
            _this.elements.main_headerButtonGroup = main_headerButtonGroup;
            main_headerRight.append(main_headerButtonGroup);
            /* ~ main : header button (beautify) ~ */
            var main_headerButton__beautify = document.createElement("button");
            main_headerButton__beautify.classList.add("nkch-css4__header-button", "nkch-css4__header-button--beautify");
            _this.elements.main_headerButton__beautify = main_headerButton__beautify;
            main_headerButtonGroup.append(main_headerButton__beautify);
            main_headerButton__beautify.addEventListener("click", function () { return _this.editor.getAction("editor.action.formatDocument").run(); }, false);
            /* ~ [svg] main : header button icon (beautify) ~ */
            var main_headerButtonIcon__beautify = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            main_headerButtonIcon__beautify.classList.add("nkch-css4__header-icon");
            main_headerButtonIcon__beautify.setAttribute("viewBox", "0 0 18 18");
            main_headerButtonIcon__beautify.setAttribute("aria-hidden", "true");
            _this.elements.main_headerButtonIcon__beautify = main_headerButtonIcon__beautify;
            main_headerButton__beautify.append(main_headerButtonIcon__beautify);
            /* ~ [svg] main : header button icon path (beautify) ~ */
            var main_headerButtonIconPath__beautify = document.createElementNS("http://www.w3.org/2000/svg", "path");
            main_headerButtonIconPath__beautify.setAttribute("d", SvgPath.Star);
            main_headerButtonIconPath__beautify.setAttribute("fill-rule", "evenodd");
            main_headerButtonIconPath__beautify.setAttribute("clip-rule", "evenodd");
            _this.elements.main_headerButtonIconPath__beautify = main_headerButtonIconPath__beautify;
            main_headerButtonIcon__beautify.append(main_headerButtonIconPath__beautify);
            /* ~ main : header button (toggle) ~ */
            var main_headerButton__toggle = document.createElement("button");
            main_headerButton__toggle.classList.add("nkch-css4__header-button", "nkch-css4__header-button--toggle", _this.checks.editor.isEnabled ? "is-enabled" : "is-disabled");
            _this.elements.main_headerButton__toggle = main_headerButton__toggle;
            main_headerButtonGroup.append(main_headerButton__toggle);
            main_headerButton__toggle.addEventListener("click", function () { return _this.toggle(!_this.checks.editor.isEnabled); }, false);
            /* ~ [svg] main : header button icon (toggle) ~ */
            var main_headerButtonIcon__toggle = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            main_headerButtonIcon__toggle.classList.add("nkch-css4__header-icon");
            main_headerButtonIcon__toggle.setAttribute("viewBox", "0 0 18 18");
            main_headerButtonIcon__toggle.setAttribute("aria-hidden", "true");
            _this.elements.main_headerButtonIcon__toggle = main_headerButtonIcon__toggle;
            main_headerButton__toggle.append(main_headerButtonIcon__toggle);
            /* ~ [svg] main : header button icon path (toggle) ~ */
            var main_headerButtonIconPath__toggle = document.createElementNS("http://www.w3.org/2000/svg", "path");
            main_headerButtonIconPath__toggle.setAttribute("d", _this.checks.editor.isEnabled ? SvgPath.Eye : SvgPath.EyeCrossed);
            main_headerButtonIconPath__toggle.setAttribute("fill-rule", "evenodd");
            main_headerButtonIconPath__toggle.setAttribute("clip-rule", "evenodd");
            _this.elements.main_headerButtonIconPath__toggle = main_headerButtonIconPath__toggle;
            main_headerButtonIcon__toggle.append(main_headerButtonIconPath__toggle);
            /* ~ main : header button (close) ~ */
            var main_headerButton__close = document.createElement("button");
            main_headerButton__close.classList.add("nkch-css4__header-button", "nkch-css4__header-button--close");
            _this.elements.main_headerButton__close = main_headerButton__close;
            main_headerButtonGroup.append(main_headerButton__close);
            main_headerButton__close.addEventListener("click", function () { return _this.close(); }, false);
            /* ~ [svg] main : header button icon (close) ~ */
            var main_headerButtonIcon__close = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            main_headerButtonIcon__close.classList.add("nkch-css4__header-icon");
            main_headerButtonIcon__close.setAttribute("viewBox", "0 0 18 18");
            main_headerButtonIcon__close.setAttribute("aria-hidden", "true");
            _this.elements.main_headerButtonIcon__close = main_headerButtonIcon__close;
            main_headerButton__close.append(main_headerButtonIcon__close);
            /* ~ [svg] main : header button icon path (close) ~ */
            var main_headerButtonIconPath__close = document.createElementNS("http://www.w3.org/2000/svg", "path");
            main_headerButtonIconPath__close.setAttribute("d", SvgPath.Close);
            main_headerButtonIconPath__close.setAttribute("fill-rule", "evenodd");
            main_headerButtonIconPath__close.setAttribute("clip-rule", "evenodd");
            _this.elements.main_headerButtonIconPath__close = main_headerButtonIconPath__close;
            main_headerButtonIcon__close.append(main_headerButtonIconPath__close);
            /* ~ main : compile ~ */
            var main_compile = document.createElement("div");
            main_compile.classList.add("nkch-css4__compile");
            _this.elements.main_compile = main_compile;
            main_container.append(main_compile);
            var compileLessButtonWidget = new OO.ui.ButtonWidget({
                label: "Less → CSS",
                classes: ["nkch-css4__compile-button", "nkch-css4__compile-button--less"],
                framed: false
            });
            compileLessButtonWidget.on("click", function () {
                if (!compileLessButtonWidget.isDisabled()) {
                    _this.compileLess(_this.editor.getValue());
                }
            });
            _this.oojsElements.compileLessButtonWidget = compileLessButtonWidget;
            var compileLessHorizontalLayout = new OO.ui.HorizontalLayout({
                items: [compileLessButtonWidget]
            });
            $(main_compile).append(compileLessHorizontalLayout.$element);
            /* ~ main : content ~ */
            var main_content = document.createElement("div");
            main_content.classList.add("nkch-css4__content");
            _this.elements.main_content = main_content;
            main_container.append(main_content);
            var cssPanelLayout = new OO.ui.TabPanelLayout("css", {
                label: "CSS"
            });
            var lessPanelLayout = new OO.ui.TabPanelLayout("less", { label: "Less"
            });
            _this.oojsElements.cssPanelLayout = cssPanelLayout;
            _this.oojsElements.lessPanelLayout = lessPanelLayout;
            var tabsIndexLayout = new OO.ui.IndexLayout({
                expanded: false
            });
            _this.oojsElements.tabs = tabsIndexLayout;
            tabsIndexLayout.addTabPanels([cssPanelLayout, lessPanelLayout], 0);
            $(main_content).append(tabsIndexLayout.$element);
            /* ~ main : codearea ~ */
            var main_codearea = document.createElement("div");
            main_codearea.classList.add("nkch-css4__codearea");
            _this.elements.main_codearea = main_codearea;
            main_content.append(main_codearea);
            $(main_codearea).resizable({
                handles: "se",
                minHeight: 280,
                minWidth: 450
            });
            _this.editor = monaco.editor.create(main_codearea, {
                language: "css",
                theme: "vs-dark",
                fontSize: 13,
                automaticLayout: true,
                scrollBeyondLastLine: false,
                minimap: {
                    enabled: false
                }
            });
            _this.editor.onDidChangeModelContent(function () {
                _this.updateCode(_this.editor.getValue(), _this.getLanguage());
            });
            tabsIndexLayout.on("set", function (tabPanel) {
                switch (tabPanel.getName()) {
                    case "css":
                        _this.setLanguage("css", false);
                        compileLessButtonWidget.toggle(false);
                        break;
                    case "less":
                        _this.setLanguage("less", false);
                        compileLessButtonWidget.toggle(true);
                        break;
                }
                _this.updateCode(_this.editor.getValue(), _this.getLanguage());
            });
            var storageValue = mw.storage.getObject("mw-nkch-css");
            if (storageValue && typeof storageValue !== "boolean") {
                _this.setValue(storageValue.value);
                _this.setLanguage(storageValue.lang);
            }
            switch (_this.getLanguage()) {
                case "css":
                    compileLessButtonWidget.toggle(false);
                    break;
                case "less":
                    compileLessButtonWidget.toggle(true);
                    break;
            }
            /* ~ main : statusbar ~ */
            var main_statusbar = document.createElement("div");
            main_statusbar.classList.add("nkch-css4__statusbar");
            _this.elements.main_statusbar = main_statusbar;
            main_content.append(main_statusbar);
            /* ~ main : statusbar container (left) ~ */
            var main_statusbarContainer__left = document.createElement("div");
            main_statusbarContainer__left.classList.add("nkch-css4__statusbar-container", "nkch-css4__statusbar-container--left");
            _this.elements.main_statusbarContainer__left = main_statusbarContainer__left;
            main_statusbar.append(main_statusbarContainer__left);
            /* ~ main : statusbar item (file download) ~ */
            var main_statusbarItem__fileDownload = document.createElement("a");
            main_statusbarItem__fileDownload.classList.add("nkch-css4__statusbar-item", "nkch-css4__statusbar-item--file-download");
            main_statusbarItem__fileDownload.setAttribute("role", "button");
            _this.elements.main_statusbarItem__fileDownload = main_statusbarItem__fileDownload;
            main_statusbarContainer__left.append(main_statusbarItem__fileDownload);
            var downloadFile = function () {
                if (_this.editor.getValue().replaceAll(" ", "").replaceAll("\n", "").length < 1) {
                    main_statusbarItem__fileDownload.removeAttribute("download");
                    main_statusbarItem__fileDownload.removeAttribute("href");
                    return;
                }
                var fileTypes = new Map([
                    ["css", "text/css"],
                    ["less", "text/x-less"]
                ]);
                var now = new Date();
                var modelLanguage = _this.getLanguage();
                var fileName = "".concat(mw.config.get("wgWikiID"), " ").concat(now.getFullYear(), "-").concat((now.getMonth() + 1).toString().padStart(2, "0"), "-").concat(now.getDate().toString().padStart(2, "0"), " ") +
                    "".concat(now.getHours().toString().padStart(2, "0"), "-").concat(now.getMinutes().toString().padStart(2, "0"), "-").concat(now.getSeconds().toString().padStart(2, "0"), ".").concat(modelLanguage !== null && modelLanguage !== void 0 ? modelLanguage : "css");
                var fileType = modelLanguage ? fileTypes.get(modelLanguage) : "text/css";
                main_statusbarItem__fileDownload.setAttribute("download", fileName);
                main_statusbarItem__fileDownload.setAttribute("href", URL.createObjectURL(new Blob([_this.editor.getValue()], { type: fileType })));
            };
            main_statusbarItem__fileDownload.addEventListener("click", downloadFile, false);
            /* ~ [svg] main : statusbar item icon (file download) ~ */
            var main_statusbarItemIcon__fileDownload = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            main_statusbarItemIcon__fileDownload.classList.add("nkch-css4__statusbar-item-icon", "nkch-css4__statusbar-item-icon--file-download");
            main_statusbarItemIcon__fileDownload.setAttribute("viewBox", "0 0 18 18");
            main_statusbarItemIcon__fileDownload.setAttribute("aria-hidden", "true");
            _this.elements.main_statusbarItemIcon__fileDownload = main_statusbarItemIcon__fileDownload;
            main_statusbarItem__fileDownload.append(main_statusbarItemIcon__fileDownload);
            /* ~ [svg] main : header button icon path (file download) ~ */
            var main_statusbarItemIconPath__fileDownload = document.createElementNS("http://www.w3.org/2000/svg", "path");
            main_statusbarItemIconPath__fileDownload.setAttribute("d", SvgPath.Download);
            main_statusbarItemIconPath__fileDownload.setAttribute("fill-rule", "evenodd");
            main_statusbarItemIconPath__fileDownload.setAttribute("clip-rule", "evenodd");
            _this.elements.main_statusbarItemIconPath__fileDownload = main_statusbarItemIconPath__fileDownload;
            main_statusbarItemIcon__fileDownload.append(main_statusbarItemIconPath__fileDownload);
            /* ~ main : statusbar item input (file upload) ~ */
            var main_statusbarItemInput__fileUpload = document.createElement("input");
            main_statusbarItemInput__fileUpload.classList.add("nkch-css4__statusbar-item-input", "nkch-css4__statusbar-item-input--file-upload");
            main_statusbarItemInput__fileUpload.setAttribute("type", "file");
            main_statusbarItemInput__fileUpload.setAttribute("accept", "text/css,.less");
            main_statusbarItemInput__fileUpload.setAttribute("name", "nkch-css4__statusbar-item-input--file-upload");
            main_statusbarItemInput__fileUpload.style.display = "none";
            _this.elements.main_statusbarItemInput__fileUpload = main_statusbarItemInput__fileUpload;
            main_statusbarContainer__left.append(main_statusbarItemInput__fileUpload);
            var uploadFile = function () {
                if (!main_statusbarItemInput__fileUpload.files || main_statusbarItemInput__fileUpload.files.length < 1)
                    return;
                var file = main_statusbarItemInput__fileUpload.files[0];
                file.text().then(function (text) {
                    if (file.name.endsWith(".css"))
                        tabsIndexLayout.setTabPanel("css");
                    else if (file.name.endsWith(".less"))
                        tabsIndexLayout.setTabPanel("less");
                    _this.setValue(text);
                    _this.updateCode(_this.editor.getValue(), _this.getLanguage());
                });
                main_statusbarItemInput__fileUpload.value = "";
            };
            main_statusbarItemInput__fileUpload.addEventListener("change", uploadFile, false);
            /* ~ main : statusbar item (file upload) ~ */
            var main_statusbarItem__fileUpload = document.createElement("a");
            main_statusbarItem__fileUpload.classList.add("nkch-css4__statusbar-item", "nkch-css4__statusbar-item--file-upload");
            main_statusbarItem__fileUpload.setAttribute("role", "button");
            _this.elements.main_statusbarItem__fileUpload = main_statusbarItem__fileUpload;
            main_statusbarContainer__left.append(main_statusbarItem__fileUpload);
            main_statusbarItem__fileUpload.addEventListener("click", function () { return main_statusbarItemInput__fileUpload.click(); }, false);
            /* ~ [svg] main : statusbar item icon (file upload) ~ */
            var main_statusbarItemIcon__fileUpload = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            main_statusbarItemIcon__fileUpload.classList.add("nkch-css4__statusbar-item-icon", "nkch-css4__statusbar-item-icon--file-upload");
            main_statusbarItemIcon__fileUpload.setAttribute("viewBox", "0 0 18 18");
            main_statusbarItemIcon__fileUpload.setAttribute("aria-hidden", "true");
            _this.elements.main_statusbarItemIcon__fileUpload = main_statusbarItemIcon__fileUpload;
            main_statusbarItem__fileUpload.append(main_statusbarItemIcon__fileUpload);
            /* ~ [svg] main : header button icon path (file upload) ~ */
            var main_statusbarItemIconPath__fileUpload = document.createElementNS("http://www.w3.org/2000/svg", "path");
            main_statusbarItemIconPath__fileUpload.setAttribute("d", SvgPath.Upload);
            main_statusbarItemIconPath__fileUpload.setAttribute("fill-rule", "evenodd");
            main_statusbarItemIconPath__fileUpload.setAttribute("clip-rule", "evenodd");
            _this.elements.main_statusbarItemIconPath__fileUpload = main_statusbarItemIconPath__fileUpload;
            main_statusbarItemIcon__fileUpload.append(main_statusbarItemIconPath__fileUpload);
            /* ~ main : statusbar container (right) ~ */
            var main_statusbarContainer__right = document.createElement("div");
            main_statusbarContainer__right.classList.add("nkch-css4__statusbar-container", "nkch-css4__statusbar-container--right");
            _this.elements.main_statusbarContainer__right = main_statusbarContainer__right;
            main_statusbar.append(main_statusbarContainer__right);
            /* ~ main : statusbar item (selection) ~ */
            var main_statusbarItem__selection = document.createElement("a");
            main_statusbarItem__selection.classList.add("nkch-css4__statusbar-item", "nkch-css4__statusbar-item--file-upload");
            main_statusbarItem__selection.setAttribute("role", "button");
            main_statusbarItem__selection.innerText = "L: 1 • C: 1";
            _this.elements.main_statusbarItem__selection = main_statusbarItem__selection;
            main_statusbarContainer__right.append(main_statusbarItem__selection);
            _this.editor.onDidChangeCursorPosition(function (event) {
                main_statusbarItem__selection.innerText = "L: ".concat(event.position.lineNumber, " \u2022 C: ").concat(event.position.column);
                var selection = _this.editor.getSelection(), model = _this.editor.getModel();
                if (!(selection === null || selection === void 0 ? void 0 : selection.isEmpty()) && model)
                    main_statusbarItem__selection.innerText += " \u2022 S: ".concat(model.getValueInRange(selection.toJSON()).length);
            });
            switch (_this.env.skin) {
                case "fandomdesktop":
                    _this.elements.quickbarItem_spinner.classList.add("is-hidden");
                    break;
                case "vector":
                case "vector-2022":
                    _this.elements.sidebarItem_spinner.classList.add("is-hidden");
                    break;
            }
            _this.checks.editor.isInitialized = true;
            _this.open();
        });
    };
    return nkchCSS;
}());
(function () {
    var options = {};
    mw.loader.load("https://nkch.fandom.com/wiki/MediaWiki:NkchCSS4.css?action=raw&ctype=text/css", "text/css");
    if (window.nkch) {
        if (window.nkch.css4)
            return;
        else
            window.nkch.css4 = new nkchCSS(options);
    }
    else
        window.nkch = { css4: new nkchCSS(options) };
})();
var SvgPath;
(function (SvgPath) {
    SvgPath["Star"] = "M6.15008 5.30832C6.06799 5.48263 5.90933 5.60345 5.72578 5.63141L0.4831 6.42984C0.0208923 6.50023 -0.163665 7.09555 0.170791 7.43724L3.96443 11.3129C4.09725 11.4486 4.15785 11.6441 4.1265 11.8357L3.23094 17.3082C3.15199 17.7907 3.63516 18.1586 4.04857 17.9308L8.73777 15.3471C8.90194 15.2566 9.09806 15.2566 9.26223 15.3471L13.9514 17.9308C14.3648 18.1586 14.848 17.7907 14.7691 17.3082L13.8735 11.8357C13.8421 11.6441 13.9028 11.4486 14.0356 11.3129L17.8292 7.43724C18.1637 7.09555 17.9791 6.50023 17.5169 6.42984L12.2742 5.63141C12.0907 5.60345 11.932 5.48263 11.8499 5.30832L9.50532 0.329227C9.29862 -0.109742 8.70138 -0.109742 8.49467 0.329226L6.15008 5.30832ZM9 2.99274L7.56499 6.04019C7.25307 6.70259 6.65014 7.16171 5.95267 7.26793L2.74389 7.75661L5.06579 10.1287C5.57048 10.6443 5.80078 11.3872 5.68164 12.1152L5.13351 15.4647L8.00354 13.8833C8.62737 13.5396 9.37263 13.5396 9.99646 13.8833L12.8665 15.4647L12.3184 12.1152C12.1992 11.3872 12.4295 10.6443 12.9342 10.1287L15.2561 7.75661L12.0473 7.26793C11.3499 7.16171 10.7469 6.70259 10.435 6.04019L9 2.99274Z";
    SvgPath["Eye"] = "M9 11.402c-1.108 0-2.01-.853-2.01-1.902 0-1.05.902-1.902 2.01-1.902 1.108 0 2.01.853 2.01 1.902s-.902 1.902-2.01 1.902M2.056 9.5c1.058 2.768 3.81 4.608 6.943 4.608 3.134 0 5.886-1.84 6.945-4.608C14.886 6.732 12.134 4.892 9 4.892c-3.133 0-5.885 1.84-6.944 4.608M9 16C4.883 16 1.284 13.502.046 9.785a.895.895 0 0 1 0-.57C1.284 5.498 4.883 3 9 3c4.117 0 7.715 2.498 8.953 6.215a.895.895 0 0 1 0 .57C16.715 13.502 13.117 16 9 16";
    SvgPath["EyeCrossed"] = "M7.214 8.628L4.746 6.16a7.036 7.036 0 0 0-2.69 3.34c1.058 2.768 3.81 4.608 6.943 4.608a7.757 7.757 0 0 0 3.069-.626L9.82 11.236c-.25.106-.529.166-.821.166-1.108 0-2.01-.853-2.01-1.902 0-.314.08-.61.224-.872zm1.799-1.03c1.102.007 1.997.857 1.997 1.902l-.003.093 2.822 2.822A6.989 6.989 0 0 0 15.944 9.5C14.886 6.732 12.134 4.892 9 4.892a7.79 7.79 0 0 0-2.337.356l2.35 2.35zM3.359 4.773L1.293 2.707C.35 1.764 1.764.35 2.707 1.293l2.47 2.47A9.862 9.862 0 0 1 9 3c4.117 0 7.716 2.498 8.954 6.215a.895.895 0 0 1 0 .57 8.855 8.855 0 0 1-2.747 4.007l1.501 1.5c.943.944-.471 2.358-1.414 1.415l-1.788-1.788A9.814 9.814 0 0 1 8.999 16C4.883 16 1.284 13.502.046 9.785a.895.895 0 0 1 0-.57A8.899 8.899 0 0 1 3.36 4.773z";
    SvgPath["Close"] = "M10.414 9l6.293-6.293a.999.999 0 1 0-1.414-1.414L9 7.586 2.707 1.293a.999.999 0 1 0-1.414 1.414L7.586 9l-6.293 6.293a.999.999 0 1 0 1.414 1.414L9 10.414l6.293 6.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L10.414 9z";
    SvgPath["Download"] = "M16 12a1 1 0 0 0-1 1v2H3v-2a1 1 0 1 0-2 0v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1m-7.707.707a1.009 1.009 0 0 0 .704.293h.006a.988.988 0 0 0 .704-.293l5-5a.999.999 0 1 0-1.414-1.414L10 9.586V2a1 1 0 1 0-2 0v7.586L4.707 6.293a.999.999 0 1 0-1.414 1.414l5 5z";
    SvgPath["Upload"] = "M13.293 7.70725C13.488 7.90225 13.744 8.00025 14 8.00025C14.256 8.00025 14.512 7.90225 14.707 7.70725C15.098 7.31625 15.098 6.68425 14.707 6.29325L9.707 1.29325C9.316 0.90225 8.684 0.90225 8.293 1.29325L3.293 6.29325C2.902 6.68425 2.902 7.31625 3.293 7.70725C3.488 7.90225 3.744 8.00025 4 8.00025C4.256 8.00025 4.512 7.90225 4.707 7.70725L8 4.41425V12.1669C8 12.6278 8.448 13.0002 9 13.0002C9.552 13.0002 10 12.6278 10 12.1669V4.41425L13.293 7.70725ZM16 17.0002C16.552 17.0002 17 16.5532 17 16.0002V13.0002C17 12.4473 16.552 12.0002 16 12.0002C15.448 12.0002 15 12.4473 15 13.0002V15.0002H3V13.0002C3 12.4473 2.552 12.0002 2 12.0002C1.448 12.0002 1 12.4473 1 13.0002V16.0002C1 16.5532 1.448 17.0002 2 17.0002H16Z";
})(SvgPath || (SvgPath = {}));