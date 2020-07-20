/**
 * PseudoTalkPages/code.js
 * @file Facilitates the addition of talk pages to wikis with message walls
 *       Made for the English Diep.io Wikia
 * @author Eizen <dev.fandom.com/wiki/User_talk:Eizen>
 * @external "mediawiki.util"
 * @external "jQuery"
 * @external "wikia.window"
 * @external "mw"
 */

/*jslint browser, this:true */
/*global mw, jQuery, window, require, wk */

require(["jquery", "mw", "wikia.window"], function (jQuery, mw, wk) {
    "use strict";

    if (
        window.isPTPLoaded ||
        jQuery("#pseudotalkpages-a").exists() ||
        jQuery.inArray(wk.wgNamespaceNumber, [2, 500, 1200]) === -1
    ) {
        return;
    }
    window.isPTPLoaded = true;

    /**
     * @class PseudoTalkPages
     * @classdesc The central class, etc etc
     */
    var PseudoTalkPages = {
        i18n: {
            "en": "Talk Page",
            "be": "Старонка абмеркавання",
            "es": "Página de discusión",
            "ja": "このページについて話し合う",
            "nl": "Overlegpagina",
            "pl": "Dyskusja",
            "pt-br": "Página de Discussão",
            "ru": "Страница обсуждения",
            "tr": "Tartışma Sayfası",
            "uk": "Сторінка обговорення",
            "zh": "談話頁",
        },

        /**
         * @method returnSkinContent
         * @description Method returns the name of the user page owner and the
         *              element after which to append the list item. Array
         *              content is skin-specific.
         * @returns {array} $skinSpecificContent
         */
        returnSkinContent: function () {
            var $skinSpecificContent = [];

            switch (wk.skin) {
            case "oasis":
            case "wikia":
                $skinSpecificContent.push(
                    jQuery(".UserProfileMasthead .masthead-info h1").text(),
                    ".WikiaUserPagesHeader ul.tabs > li[data-id='wall']"
                );
                break;
            case "monobook":
            case "wowwiki":
            case "uncyclopedia":
                $skinSpecificContent.push(
                    jQuery(".firstHeading, #firstHeading")
                        .clone().children().remove().end().text().split(":")[1],
                    "#p-cactions ul > li:nth-child(2)"
                );
                break;
            }

            return $skinSpecificContent;
        },

        /**
         * @method constructItem
         * @description Method returns a link inside a list item
         * @param {string} $href
         * @param {string} $text
         * @returns {mw.html.element}
         */
        constructItem: function ($href, $text) {
            return mw.html.element("li", {
                "id": "pseudotalkpages-li"
            }, new mw.html.Raw(
                mw.html.element("a", {
                    "id": "pseudotalkpages-a",
                    "href": $href,
                    "title": $text
                }, $text)
            ));
        },

        /**
         * @method init
         * @description Method assembles all the content and appends it after
         *              the proper node. Also fires a hook for use by BlogLink.
         * @returns {void}
         */
        init: function () {
            var $lang =
                    this.i18n[wk.wgUserLanguage] ||
                    this.i18n[wk.wgUserLanguage.split("-")[0]] ||
                    this.i18n.en;
            var $skinContent = this.returnSkinContent();

            if ( // If is anon...
                mw.util.isIPv4Address($skinContent[0]) ||
                mw.util.isIPv6Address($skinContent[0])
            ) {
                return;
            }

            var $page = "User:" + $skinContent[0] + "/Talk";
            var $tabElement = this.constructItem(mw.util.getUrl($page), $lang);

            if (wk.wgPageName.split("/")[1] !== "Talk") {
                jQuery($skinContent[1]).after($tabElement);
            }

            mw.hook("pseudotalkpages.loaded").fire();
        }
    };

    mw.loader.using("mediawiki.util").then(
        jQuery.proxy(PseudoTalkPages.init, PseudoTalkPages)
    );
});