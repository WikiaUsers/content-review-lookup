/**
 * EraIcons.js
 * @file Adds era icons to page headers
 * @authors SlyCooperFan1 <dev.fandom.com/wiki/User_talk:SlyCooperFan1>
            Eizen <dev.fandom.com/wiki/User_talk:Eizen>
            Ursuul <dev.fandom.com/wiki/User_talk:Ursuul>
 * @external "mediawiki.util"
 * @external "wikia.window"
 * @external "jQuery"
 */

/*jslint browser, this:true */
/*global mw, jQuery, console, window, wikia.window */

require(["jquery", "mw", "wikia.window"], function (jQuery, mw, wk) {
    "use strict";

    const RESTRICTED_NS = [-1, 2, 3, 420, 501, 502, 828, 1200, 1201, 1202, 2000,
        2001, 2002];

    if (
        window.isEraIconsLoaded ||
        jQuery.inArray(wk.wgNamespaceNumber, RESTRICTED_NS) !== -1 ||
        !jQuery("#PageHeader").exists()
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

            jQuery(".page-header__contribution>div:first-child").prepend(
                mw.html.element("div", {
                    "class": that.container
                })
            );

            if (jQuery(".page-header__languages").exists()) {
                jQuery("." + that.container).css("right", "70px");
            }

            jQuery(".eraicon").each(function () {
                jQuery(this).appendTo("." + that.container)
                    .addClass("wds-dropdown");

                var $dropdownInfo = jQuery(this).find("a").attr("title");
                jQuery(this).find("a").removeAttr("title");

                jQuery(this).append(that.createDropdownElement($dropdownInfo));
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
                wk.importArticle({
                    type: "style",
                    article: "u:dev:MediaWiki:EraIcons.css"
                });
            }

            this.addIcons();
        }
    };

    mw.loader.using("mediawiki.util").then(
        jQuery.proxy(EraIcons.init, EraIcons)
    );
});