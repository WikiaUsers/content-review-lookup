/**
 * BlogLink.js
 * @file Adds links to user's blogs, contributions, and pseudo talk pages
 * @author Eizen <dev.fandom.com/wiki/User_talk:Eizen>
 *         Ursuul <dev.fandom.com/wiki/User_talk:Ursuul>
 * @external "mediawiki.util"
 * @external "jquery"
 * @external "wikia.window"
 * @external "mw"
 */

/*jslint browser, this:true */
/*global mw, jQuery, window, require, wk */

require(["jquery", "mw", "wikia.window"], function (jQuery, mw, wk) {
    "use strict";

    if (window.isBlogLinkLoaded) {
        return;
    }
    window.isBlogLinkLoaded = true;

    if (!window.dev || !window.dev.i18n) {
        importArticle({
            type: "script",
            article: "u:dev:MediaWiki:I18n-js/code.js"
        });
    }
    
    //Add class to preferences parent li so that the defualt placement can attach
    jQuery('.wds-global-navigation__user-menu > div:nth-child(2) > ul > li > a[data-tracking-label="account.preferences"]').parent().addClass('account-preferences');

    var $i18n;

    /**
     * @class BlogLink
     * @classdesc The central BlogLink class
     */
    var BlogLink = {
        defaultPlacement: ".wds-global-navigation__user-menu > div:nth-child(2) > ul > li.account-preferences",

        /**
         * @method addLink
         * @description Method invokes construction method, producing a new HTML
         *              link element, which is then added before the target
         *              element or before the default location if the target is
         *              not found.
         * @param {string} $title - used in construction of element id
         * @param {string} $href
         * @param {string} $text
         * @param {string} $target
         * @returns {void}
         */
        addLink: function ($title, $href, $text, $target) {
            var $element = this.constructItem(
                $title,
                mw.util.getUrl($href),
                $text
            );

            if (jQuery($target).exists()) {
                jQuery($target).before($element);
            } else {
                jQuery(this.defaultPlacement).before($element);
            }
        },

        /**
         * @method constructItem
         * @description Returns a string of constructed link-in-list elements to
         *              be added to the proper target node.
         * @param {string} $parameter
         * @param {string} $href
         * @param {string} $text
         * @returns {string}
         */
        constructItem: function ($parameter, $href, $text) {
            $text = $i18n.msg($text).plain();
            return mw.html.element("li", {
                "id": "bl-" + $parameter
            }, new mw.html.Raw(
                mw.html.element("a", {
                    "id": "bl-" + $parameter + "-a",
                    "href": $href,
                    "title": $text
                }, $text)
            ));
        },

        /**
         * @method checkForBlogs
         * @description Method retrives data regarding the activated features on
         *              the wiki in question and invokes the addLink method if
         *              blogs are enabled.
         * @returns {void}
         */
        checkForBlogs: function () {
            var that = this;
            jQuery.nirvana.getJson(
                "WikiFeaturesSpecialController",
                "index"
            ).done(function ($data) {
                if (
                    !$data.error &&
                    $data.features[1].name === "wgEnableBlogArticles" &&
                    $data.features[1].enabled === true
                ) {
                    that.addLink(
                        "blog",
                        "User blog:" + wk.wgUserName,
                        "blog",
                        "#bl-contributions"
                    );
                }
            });
        },

        /**
         * @method main
         * @description Method coordinates the main action of the script,
         *              checking for user config and building links accordingly.
         * @returns {void}
         */
        main: function ($lang) {
            $lang.useUserLang();
            $i18n = $lang;
            this.config = jQuery.extend(
                {
                    talk: true,
                    contribs: true
                },
                window.blogLinkConfig
            );

            // Fix scroll issue when many items are present
            mw.util.addCSS(
                ".skin-oasis .wds-global-navigation__user-menu " +
                ".wds-dropdown__content:not(.wds-is-not-scrollable) " +
                ".wds-list {" +
                    "max-height: none;" +
                "}"
            );

            // Add contribs link if selected as user option
            if (this.config.contribs) {
                this.addLink(
                    "contributions",
                    "Special:Contributions/" + wk.wgUserName,
                    "contribs",
                    this.defaultPlacement
                );
            }

            // Add PTP link only if the script is loaded on the wiki
            if (this.config.talk) {
                mw.hook("pseudotalkpages.loaded").add(function () {
                    jQuery.proxy(
                        BlogLink.addLink(
                            "talk",
                            "User:" + wk.wgUserName + "/Talk",
                            "talk",
                            "#bl-blog"
                        ),
                        BlogLink
                    );
                });
            }

            // For whatever reason, En-CC has no WikiFeaturesSpecialController
            if (wk.wgCityId !== "177") {
                this.checkForBlogs();
            } else {
                this.addLink(
                    "blog",
                    "User blog:" + wk.wgUserName,
                    "blog",
                    "#bl-contributions"
                );
            }
        }
    };

    mw.hook("dev.i18n").add(function ($i18n) {
        jQuery.when(
            $i18n.loadMessages("BlogLink"),
            mw.loader.using("mediawiki.util")
        ).done(jQuery.proxy(BlogLink.main, BlogLink));
    });
});