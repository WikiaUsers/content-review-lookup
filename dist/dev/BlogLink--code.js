/**
 * BlogLink.js
 * @file Adds links to user's blogs, contributions, and pseudo talk pages
 * @author Eizen <dev.fandom.com/wiki/User_talk:Eizen>
 *         Ursuul <dev.fandom.com/wiki/User_talk:Ursuul>
 * @license CC-BY-SA 3.0
 * @external "mediawiki.util"
 * @external "I18n-js"
 */

/* jshint -W030, undef: true, unused: true, eqnull: true, laxbreak: true,
   bitwise: false */

;(function (window, $, mw) {
    "use strict";

    if (window.isBlogLinkLoaded) {
        return;
    }
    window.isBlogLinkLoaded = true;

    if (!window.dev || !window.dev.i18n) {
        window.importArticles({
            type: "script",
            articles: ["u:dev:MediaWiki:I18n-js/code.js"]
        });
    }

    var $i18n, config, isUCP;

    config = mw.config.get([
        "skin",
        "wgCityId",
        "wgUserName",
        "wgVersion"
    ]);

    isUCP = window.parseFloat(config.wgVersion) > 1.19;

    //Add class to preferences parent li so that the defualt placement can attach
    $(((config.skin === "oasis")
        ? ".wds-global-navigation__user-menu > div:nth-child(2)"
        : ".global-navigation__bottom .wds-dropdown__content") +
          " > ul > li > a[data-tracking-label='account.preferences']"
    ).parent().addClass("account-preferences");

    /**
     * @class BlogLink
     * @classdesc The central BlogLink class
     */
    var BlogLink = {
        defaultPlacement: "li.account-preferences",

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

            $(($($target).length ? $target : this.defaultPlacement))[
                (config.skin === "oasis") ? "before" : "after"
            ]($element);
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
         * @method getFeaturesData
         * @returns {object}
         */
        getFeaturesData: function () {
            return (isUCP)
                ? $.get(mw.util.wikiScript("wikia"), {
                      controller: "Fandom\\AdminDashboard\\WikiFeatures",
                      method: "wikiFeatures",
                      format: "json",
                  })
                : $.nirvana.getJson(
                      "WikiFeaturesSpecialController",
                      "index"
                  );
        },

        /**
         * @method checkForBlogs
         * @description Method retrives data regarding the activated features on
         *              the wiki in question and invokes the addLink method if
         *              blogs are enabled.
         * @returns {void}
         */
        checkForBlogs: function () {
            this.getFeaturesData().then(function (paramData) {
                if (
                    (
                        isUCP && 
                        !paramData.error &&
                        paramData.features.wgEnableBlogArticles
                    ) ||
                    (
                        !isUCP &&
                        !paramData.error &&
                        paramData.features[1].name === "wgEnableBlogArticles" &&
                        paramData.features[1].enabled
                    )
                ) {
                    this.addLink(
                        "blog",
                        "User blog:" + config.wgUserName,
                        "blog",
                        "#bl-contributions"
                    );
                }
            }.bind(this), window.console.error);
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
            this.config = $.extend(
                {
                    talk: true,
                    contribs: true,
                    activity: isUCP,
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
                if (config.skin === "fandomdesktop") {
                    $("a[data-tracking-label='account.contributions'").remove();
                }

                this.addLink(
                    "contributions",
                    "Special:Contributions/" + config.wgUserName,
                    "contribs",
                    this.defaultPlacement
                );
            }

            // Add UCP-exclusive link to UserProfileActivity
            if (this.config.activity && isUCP) {
                this.addLink(
                    "activity",
                    "Special:UserProfileActivity/" + config.wgUserName,
                    "activity",
                    this.defaultPlacement
                );
            }

            // Add PTP link only if the script is loaded on the wiki
            if (this.config.talk) {
                mw.hook("pseudotalkpages.loaded").add(function () {
                    $.proxy(
                        BlogLink.addLink(
                            "talk",
                            "User:" + config.wgUserName + "/Talk",
                            "talk",
                            "#bl-blog"
                        ),
                        BlogLink
                    );
                });
            }

            // For whatever reason, En-CC has no WikiFeaturesSpecialController
            if (config.wgCityId !== "177") {
                this.checkForBlogs();
            } else {
                this.addLink(
                    "blog",
                    "User blog:" + config.wgUserName,
                    "blog",
                    "#bl-contributions"
                );
            }
        }
    };

    mw.hook("dev.i18n").add(function ($i18n) {
        $.when(
            $i18n.loadMessages("BlogLink", {cacheVersion: 1}),
            mw.loader.using("mediawiki.util")
        ).done($.proxy(BlogLink.main, BlogLink));
    });
}(this, this.jQuery, this.mediaWiki));