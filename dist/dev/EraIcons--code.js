/**
 * EraIcons/code.js
 * @file Adds era icons to page headers
 * @authors SlyCooperFan1 <dev.fandom.com/wiki/User_talk:SlyCooperFan1>
 *          Eizen <dev.fandom.com/wiki/User_talk:Eizen>
 *          Ursuul <dev.fandom.com/wiki/User_talk:Ursuul>
 * @license CC-BY-SA 3.0
 * @external "mediawiki.util"
 */

/* jshint -W030, undef: true, unused: true, eqnull: true, laxbreak: true */

;(function (window, $, mw) {
    "use strict";

    const RESTRICTED_NS = [-1, 2, 3, 420, 501, 502, 828, 1200, 1201, 1202, 2000,
        2001, 2002];

    if (
        window.isEraIconsLoaded ||
        $.inArray(mw.config.get("wgNamespaceNumber"), RESTRICTED_NS) !== -1 ||
        (!$("#PageHeader").length && !$(".page-header").length)
    ) {
        return;
    }
    window.isEraIconsLoaded = true;

    var EraIcons = {
        target: function(){
            if($("#PageHeader").length){
                return ".page-header__contribution>div:first-child";
            } else {
                if($(".page-header__languages").length){
                    return ".page-header__languages";
                } else {
                    if(!$(".page-header__eraicons-target").length){
                        $(".page-header").append(
                            mw.html.element("div", {
                                "class": "page-header__eraicons-target"
                            })
                        );
                    }
                    return ".page-header__eraicons-target";
                }
            }
        },
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
                $(that.target()).prepend(
                    mw.html.element("div", {
                        "class": that.container
                    })
                );
            }

            if ($(".page-header__languages").length && $("#PageHeader").length) {
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