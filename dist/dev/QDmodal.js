/* [[QDmodal]] - flexbox-based modal library */

/*jslint browser, long, this */
/*global jQuery, mediaWiki */

(function ($, mw) {
    "use strict";

    var version = 20200530;

    if (mw.libs.QDmodal && mw.libs.QDmodal.version >= version) {
        return;
    }

    var closeText = {
        // language list - start
        en: "Close",
        ar: "أغلق",
        be: "Закрыць",
        de: "Schließen",
        es: "Cerrar",
        fr: "Fermer",
        ko: "닫기",
        pl: "Zamknij",
        ru: "Закрыть",
        tr: "Kapat",
        uk: "Закрити"
        // language list - stop
    };

    var lang = mw.config.get("wgUserLanguage");
    closeText = closeText[lang] || closeText[lang.split("-")[0]] || closeText.en;

    var visibleModals = document.getElementsByClassName("qdmodal");
    var $window = $(window);
    var $body = $(document.body);
    var $closeIcon = $(
        "<svg class='qdmodal-close' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'>"
          + "<title>" + closeText + "</title>"
          + "<path stroke='currentColor' d='M 3,3 13,13 M 13,3 3,13'/>"
        + "</svg>"
    );

    function isElementOrChildFrontmost(element) {
        var pos = element.getBoundingClientRect();
        var frontmostElement = document.elementFromPoint(pos.left, pos.top);
        return element.contains(frontmostElement);
    }

    function addButton(button) {
        var $button = $("<span>");

        if (button.href) {
            $button = $("<a>").attr({
                href: button.href,
                target: "_blank"
            });
        }

        if (typeof button.handler === "function") {
            $button.on("click", button.handler);
        }

        if (button.attr) {
            $button.attr(button.attr);
        }

        $button.addClass("qdmodal-button").text(button.text);

        this.$footer.append($button);
    }

    function closeOnBackgroundClick(event) {
        if (event.target === event.delegateTarget) {
            this.hide();
        }
    }

    function closeOnEscapeKeydown(event) {
        if (
            event.which === 27 // Escape key
            && isElementOrChildFrontmost(this.$container[0])
        ) {
            this.hide();
        }
    }

    //// QDmodal constructor ////

    mw.libs.QDmodal = function (id) {
        if (this === mw.libs) {
            throw new Error("mw.libs.QDmodal should be called as a constructor.");
        }

        var $close = $closeIcon.clone();

        this.$container = $("<div>").addClass("qdmodal-container");
        this.$element = $("<div>").addClass("qdmodal");
        this.$title = $("<h3>");
        this.$content = $("<section>");
        this.$footer = $("<footer>");

        this.$container.append(
            this.$element.append(
                $("<header>").append(
                    this.$title,
                    $close
                ),
                this.$content,
                this.$footer
            )
        );

        this.visible = false;
        this.data = null;

        if (typeof id === "string") {
            this.$element.attr("id", id);
        }

        $close.on("click", this.hide.bind(this));
        this.$container.on("click", closeOnBackgroundClick.bind(this));
        $window.on("keydown", closeOnEscapeKeydown.bind(this));
    };

    mw.libs.QDmodal.prototype.hide = function () {
        if (this.data && typeof this.data.onHide === "function") {
            this.data.onHide(this);
        }

        this.visible = false;
        this.data = null;
        this.$container.detach();

        if (!visibleModals.length) {
            $body.removeClass("qdmodal-no-scroll");
        }
    };

    mw.libs.QDmodal.prototype.show = function (data) {
        if (!data) {
            return;
        }

        this.data = data;

        this.$content.toggleClass("mw-ajax-loader", Boolean(data.loading));

        // only set title if one is given, else keep previous title
        if (data.title) {
            this.$title.text(data.title);
        }

        this.$content.html(data.content || "");

        this.$footer.empty();

        if (Array.isArray(data.buttons)) {
            data.buttons.forEach(addButton.bind(this));
        }

        if (typeof this.data.onBeforeShow === "function") {
            this.data.onBeforeShow(this);
        }

        if (data.hook) {
            mw.hook(data.hook).fire(this);
        }

        if (!this.visible) {
            $body
                .addClass("qdmodal-no-scroll")
                .append(this.$container);
            this.visible = true;
        }

        if (typeof this.data.onShow === "function") {
            this.data.onShow(this);
        }
    };

    mw.libs.QDmodal.version = version;

    // fire hook for convenience
    mw.hook("dev.qdmodal").fire(mw.libs.QDmodal);

    //// QDmodal theming ////

    function isDark(colour) {
        // use canvas to normalise a CSS colour string to #RRGGBB
        // https://stackoverflow.com/a/47355187
        var ctx = document.createElement("canvas").getContext("2d");
        ctx.fillStyle = colour;
        var rgb = ctx.fillStyle;

        // get the lightness of a #RRGGBB colour
        // https://github.com/Wikia/app/blob/7df3d19/extensions/wikia/SASS/SassUtil.php#L239-L254
        var r = parseInt(rgb.slice(1, 3), 16) / 255;
        var g = parseInt(rgb.slice(3, 5), 16) / 255;
        var b = parseInt(rgb.slice(5, 7), 16) / 255;
        var l = (Math.max(r, g, b) + Math.min(r, g, b)) / 2;

        return l < 0.5;
    }

    mw.libs.QDmodal.loadTheme = function () {
        var skin = mw.config.get("skin");
        var version = mw.config.get("wgVersion");
        var theme = {
            background: "#fff",
            text: "#222",

            langStart: document.dir === "rtl" ? "right" : "left",
            langEnd: document.dir === "rtl" ? "left" : "right",
            scrollbarWidth: window.innerWidth - document.body.offsetWidth
        };

        // use wiki's custom colours for Fandom platform
        // TODO: not present on UCP Oasis? alternative?
        var wikiTheme = mw.config.get("wgSassParams");
        if (wikiTheme) {
            theme.background = wikiTheme["color-page"];
            theme.links = wikiTheme["color-links"];
            theme.text = isDark(theme.background) ? "#d5d4d4" : "#3a3a3a";
        }

        // use dark theme on wikis with HydraDark skin
        if (skin === "hydradark") {
            theme.background = "#181818";
            theme.text = "#e0e0e0";
        }

        // support light/dark theme on RuneScape Wiki
        if (/(?:^|\.)runescape\.wiki$/.test(location.hostname)) {
            if ($body.hasClass("wgl-darkmode")) {
                theme.background = "#172136";
                theme.text = "#cbd9f4";
            } else {
                theme.background = "#fbfbfb";
                theme.text = "#36414f";
            }
        }

        var styles = (
            "body.qdmodal-no-scroll {"
              // add a margin equivalent to the scrollbar width to
              // prevent page content moving due to hidden overflow
              + "margin-${langEnd}: ${scrollbarWidth}px;"
              + "overflow-y: hidden;"
            + "}"

            + ".qdmodal-container {"
              + "align-items: center;"
              + "background-color: hsla(0, 0%, 0%, 0.4);"
              + "bottom: 0;"
              + "display: flex;"
              + "font-size: 14px;"
              + "justify-content: center;"
              + "line-height: 22px;"
              + "left: 0;"
              + "position: fixed;"
              + "right: 0;"
              + "top: 0;"
              // to appear above #globalNavigation element on fandom
              + "z-index: 5000101;"
            + "}"

            + ".qdmodal-container ~ .modal-blackout.visible {"
              // fix fandom uifactory modal shown above qdmodal
              + "z-index: 5000102;"
            + "}"

            + ".modalWrapper ~ .qdmodal-container {"
              // fix qdmodal shown above fandom $.showModal
              + "z-index: 5001102;"
            + "}"

            + ".qdmodal {"
              + "background-color: ${background};"
              + "border-radius: 3px;"
              + "color: ${text};"
              + "display: flex;"
              + "flex-direction: column;"
              + "max-height: calc(100% - 50px);"
              + "max-width: calc(100% - 50px);"
              + "overflow: hidden;"
            + "}"

            + "@media (max-height: 500px) {"
              + ".qdmodal {"
                + "max-height: 100%;"
              + "}"
            + "}"

            + "@media (max-width: 500px) {"
              + ".qdmodal {"
                + "max-width: 100%;"
              + "}"
            + "}"

            + ".qdmodal > section {"
              + "flex-grow: 1;"
              + "min-height: 40px;"
              + "overflow-y: auto;"
              + "padding: 20px;"
              // stop mw-ajax-loader class from changing positioning, it's not needed
              // with the flex-grow and causes it to overlap close button
              + "position: static;"
              // use native scrolling in modal on iOS
              + "-webkit-overflow-scrolling: touch;"
            + "}"

            + ".qdmodal > header,"
            + ".qdmodal > footer {"
              + "background-color: hsla(0, 0%, 75%, 0.4);"
              + "display: flex;"
            + "}"

            + ".qdmodal > header {"
              + "min-height: 22px;"
              + "padding: 12px 20px;"
            + "}"

            // TODO: scrollable footer if content is too wide for display
            // inspo: https://fastmail.blog/content/images/2020/03/Image-3-Sliding-Tab-bar-v2-1-.png
            + ".qdmodal > footer {"
              + "align-items: center;"
              + "flex-direction: row-reverse;"
              + "min-height: 27px;"
              + "padding: 9px;"
            + "}"

            + ".qdmodal > header > h3 {"
              + "color: inherit;"
              + "flex-grow: 1;"
              + "font-size: 1.3em;"
              + "font-weight: bold;"
              + "margin: 0;"
              + "-webkit-mask-image: linear-gradient(to left, transparent, black 3em);"
              + "mask-image: linear-gradient(to left, transparent, black 3em);"
              + "overflow: hidden;"
              + "padding: 0;"
              + "white-space: nowrap;"
            + "}"

            + ".qdmodal-close {"
              + "height: 28px;"
              + "margin: -12px -20px;"
              + "margin-${langStart}: 0;"
              + "min-width: 28px;"
              + "padding: 9px;"
              + "width: 28px;"
            + "}"

            + ".qdmodal-button {"
              + "border: 1px solid #999;"
              + "border-radius: 3px;"
              + "color: inherit;"
              + "cursor: default;"
              + "display: block;"
              + "font-size: 0.9em;"
              + "height: 1em;"
              + "line-height: 1;"
              + "margin-${langStart}: 12px;"
              + "padding: 6px 12px;"
              + "white-space: nowrap;"
            + "}"

            + ".qdmodal-button[href] {"
              + "cursor: pointer;"
            + "}"

            + ".qdmodal-button:visited {"
              + "color: inherit;"
            + "}"

            + ".qdmodal-button[disabled] {"
              + "opacity: 0.6;"
              + "pointer-events: none;"
            + "}"

            + ".qdmodal-close,"
            + ".qdmodal-button {"
              + "transition: background-color 0.2s;"
            + "}"

            + ".qdmodal-close:hover,"
            + ".qdmodal-button:hover {"
              + "background-color: ${background};"
              + "border-color: #777;"
              + "color: inherit;"
            + "}"
        );

        // fix bold/italic on wikis with 1.19 Oasis skin (it uses a CSS reset)
        if (skin === "oasis" && version === "1.19.24") {
            styles += ".qdmodal strong, .qdmodal b { font-weight: bold; }";
            styles += ".qdmodal em, .qdmodal i { font-style: italic; }";
        }

        // fix loader image path on wikis with UCP Oasis skin
        // TODO: i don't like this relying on 1.19 assets -
        //   try to figure out the proper path or hope they'll fix their CSS
        if (skin === "oasis" && version !== "1.19.24") {
            styles += ".mw-ajax-loader { background-image: url(/skins/common/images/ajax-loader.gif); }";
        }

        if (theme.links) {
            styles += ".qdmodal > section a:not(.new) { color: ${links}; }";
        }

        if (isDark(theme.background)) {
            styles += ".qdmodal .mw-ajax-loader { filter: invert(100%); }";
        }

        // remove any existing stylesheets
        $("#qdmodal-stylesheet").remove();

        var styleElement = document.createElement("style");
        styleElement.id = "qdmodal-stylesheet";
        styleElement.type = "text/css";

        // replace placeholders with theme data
        styleElement.textContent = styles.replace(/\$\{([^}]+)\}/g, function (ignore, prop) {
            return theme[prop];
        });

        // add new stylesheet
        document.head.appendChild(styleElement);
    };

    mw.libs.QDmodal.loadTheme();
}(jQuery, mediaWiki));