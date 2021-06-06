/* [[QDmodal]] - flexbox-based modal library */

/*jslint browser, long, this */
/*global jQuery, mediaWiki */

(function ($, mw) {
    "use strict";

    var version = 20210606.1;

    if (mw.libs.QDmodal && mw.libs.QDmodal.version >= version) {
        return;
    }

    var closeText = {
        // language list - start
        en: "Close",
        ar: "أغلق",
        be: "Закрыць",
        bn: "বন্ধ করুন",
        de: "Schließen",
        el: "Κλείσιμο",
        es: "Cerrar",
        fr: "Fermer",
        hi: "बंद करें",
        ko: "닫기",
        pl: "Zamknij",
        ru: "Закрыть",
        tr: "Kapat",
        uk: "Закрити",
        'zh-hans': "关闭",
        'zh-hant': "關閉",
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
        + "<path d='M 3,3 13,13 M 13,3 3,13'/>"
        + "</svg>"
    );
    var $spinner = $(
        "<svg class='qdmodal-spinner' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'>"
        + ("<path d='M 25,5 v 10'/>".repeat(12))
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
            event.key === "Escape"
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
            if (this.data.onHide(this) === false) {
                return;
            }
        }

        this.visible = false;
        this.data = null;
        this.$container.detach();

        if (!visibleModals.length) {
            $body.removeClass("qdmodal-is-visible");
        }
    };

    mw.libs.QDmodal.prototype.show = function (data) {
        if (!data) {
            return;
        }

        this.data = data;

        // only set title if one is given, else keep previous title
        if (data.title) {
            this.$title.text(data.title);
        }

        if (data.loading) {
            this.$content.empty().append($spinner.clone());
        } else {
            this.$content.html(data.content || "");
        }

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
            $body.addClass("qdmodal-is-visible").append(this.$container);
            this.visible = true;
        }

        if (typeof this.data.onShow === "function") {
            this.data.onShow(this);
        }
    };


    //// Initialisation ////

    mw.libs.QDmodal.version = version;

    // provide other scripts a copy of the loading spinner
    mw.libs.QDmodal.getSpinner = function () {
    	return $("<span>").addClass("qdmodal-spinner-container").append($spinner.clone());
    };

    // no-op function, kept to prevent breakage in other scripts
    mw.libs.QDmodal.loadTheme = function () {};

    $(function () {
        document.documentElement.style.setProperty(
            "--qdmodal-scrollbar-width",
            (window.innerWidth - document.body.offsetWidth) + "px"
        );

        // remove older stylesheets
        $("#qdmodal-stylesheet").remove();

        var css = document.createElement("link");
        css.id = "qdmodal-stylesheet";
        css.rel = "stylesheet";
        css.href = "https://dev.fandom.com/load.php?mode=articles&articles=MediaWiki:QDmodal.css&cb=" + version + "&only=styles";
        document.head.prepend(css);
    });

    // fire hook for convenience
    mw.hook("dev.qdmodal").fire(mw.libs.QDmodal);
}(jQuery, mediaWiki));