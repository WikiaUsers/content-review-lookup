;(function (window, $, mw) {
    "use strict";
 
    const RESTRICTED_NS = [-1, 2, 3, 420, 501, 502, 828, 1200, 1201, 1202, 2000,
        2001, 2002];
 
    if (
        window.isEraIconsLoaded ||
        $.inArray(mw.config.get("wgNamespaceNumber"), RESTRICTED_NS) !== -1 ||
        !$("#PageHeader").length
    ) {
        return;
    }
    window.isEraIconsLoaded = true;
 
    var EraIcons = {
        target: ".page-header__contribution>div:first-child",
        container: "page-header__eraicons",
 
        /**
         * @method  createDropdownElement
         * @description Encases link title info within a div/span duo, allowing
         *              users to display relevant title info about the era icon
         *              on hover.
         * @param {String} $dropdownInfo
         * @returns {String}
         */
        createDropdownElement: function ($dropdownInfo) {
            return mw.html.element("div", {
                "class": "wds-dropdown__content"
            }, new mw.html.Raw(
                mw.html.element("span", {
                    "class": "eraicon-dropdown"
                }, $dropdownInfo)
            ));
        },
 
        /**
         * @method addIcons
         * @description The main method of the script. It prepends a container
         *              element to the header (adjusted slightly as needed) and
         *              shuffles all the relevant elements containing the
         *              <code>.eraicon</code> class to the container. Link title
         *              info is displayed on hover.
         * @returns {void}
         */
        addIcons: function () {
            var that = this;
 
            if ($("." + this.container).length) {
                $("." + this.container).empty();
            } else {
                $(that.target).prepend(
                    mw.html.element("div", {
                        "class": that.container
                    })
                );
            }
 
            if ($(".page-header__languages").length) {
                $("." + that.container).css("right", "70px");
            }
 
            $(".eraicon:not('.ve-ce-branchNode')").each(function () {
                $(this).appendTo("." + that.container)
                    .addClass("wds-dropdown");
 
                var $dropdownInfo = $(this).find("a").attr("title");
                $(this).find("a").removeAttr("title");
 
                $(this).append(that.createDropdownElement($dropdownInfo));
            });
        },
 
        /**
         * @method init
         * @description Method checks to see if user/wiki has custom styling
         *              enabled, and then begins the addition process.
         * @returns {void}
         */
        init: function () {
            var $useIncludedStylesheet = window.useIncludedStylesheet || false;
 
            if ($useIncludedStylesheet) {
                window.importArticle({
                    type: "style",
                    article: "u:dev:MediaWiki:EraIcons.css"
                });
            }
 
            // Re-add the icons after saving new edit
            mw.hook("postEdit").add(this.addIcons.bind(this));
 
            // Always run first time
            this.addIcons();
        }
    };
 
    mw.loader.using("mediawiki.util").then(
        $.proxy(EraIcons.init, EraIcons)
    );
}(this, this.jQuery, this.mediaWiki));