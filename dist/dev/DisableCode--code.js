/**
 * DisableCode/code.js
 * @file Allows users to disable custom user or site CSS/JS for testing
 * @author Eizen <dev.wikia.com/wiki/User_talk:Eizen>
 * @external "mediawiki.util"
 * @external "I18n-js"
 * @external "jQuery"
 * @external "wikia.window"
 * @external "mw"
 */

/*jslint browser, this:true */
/*global mw, jQuery, window, require, wk */

require(["mw", "wikia.window", "jquery"], function (mw, wk, jQuery) {
    "use strict";

    if (window.isDisableCodeLoaded || jQuery("#disableCode").exists()) {
        return;
    }
    window.isDisableCodeLoaded = true;

    if (!window.dev || !window.dev.i18n) {
        wk.importArticle({
            type: "script",
            article: "u:dev:MediaWiki:I18n-js/code.js"
        });
    }
    var $i18n;

    /**
     * @class DisableCode
     * @classdesc The main DisableCode object literal
     */
    var DisableCode = {

        /**
         * @method constructItem
         * @description Method creates list items to be appended to the proper
         *              container element. If the item is the reset button, the
         *              <code>href</code> attribute is set to the current value
         *              of <code>window.location.href</code> minus any included
         *              <code>DisableCode.parameters</code> values. Probably
         *              should use legitimate click events in a future rewrite.
         * @param {String} $text
         * @param {String} $param
         * @returns {String}
         */
        constructItem: function ($text, $param) {
            var $href = window.location.href;
            var $search = (window.location.search)
                ? "&"
                : "?";

            if ($text === $i18n.msg("reset").plain()) {
                this.parameters.forEach(function ($selected) {
                    if ($href.indexOf($selected.param) !== -1) {
                        var $pStart = $href.indexOf($selected.param);
                        var $pSlice = $href.slice(
                                $pStart - 1,
                                $pStart + $selected.param.length + 2
                            );

                        $href = $href.replace(/#.*/, "").replace($pSlice, "");
                    }
                });
            } else {
                $href = $href.replace(/#.*/, "") + $search + $param + "=" + 0;
            }

            return mw.html.element("li", {
                "class": "overflow disableCode-li",
            }, new mw.html.Raw(
                mw.html.element("a", {
                    "class": "disableCode-a",
                    "href": $href,
                    "title": $text
                }, $text)
            ));
        },

        /**
         * @method assembleContainer
         * @description Method injects some menu-specific CSS to style the menu
         *              properly and also assembles the massive
         *              <code>String</code> of HTML that forms the "My Tools"-
         *              esque menu frame. Probably should be simplified and
         *              cleaned up at some point.
         * @returns {String}
         */
        assembleContainer: function () {
            mw.util.addCSS(
                "#disableCode-menu {" +
                    "left: 10px;" +
                    "right: auto;" +
                    "display: none;" +
                "}"
            );

            return mw.html.element("li", {
                "class": "mytools menu",
                "id": "disableCode"
            }, new mw.html.Raw(
                mw.html.element("span", {
                    "class": "arrow-icon-ctr",
                }, new mw.html.Raw(
                    mw.html.element("span", {
                        "class": "arrow-icon arrow-icon-single"
                    })
                )) +
                mw.html.element("a", {
                    "id": "disableCode-a",
                    "href": "#",
                    "title": $i18n.msg("title").plain()
                }, $i18n.msg("title").plain()) +
                mw.html.element("ul", {
                    "id": "disableCode-menu",
                    "class": "tools-menu",
                })
            ));
        },

        /**
         * @name main
         * @description This method handles the assembly of a container element,
         *              the construction of menu list members, and the menu
         *              display toggle handler. It adds the constructed elements
         *              to the new menu once assembled.
         * @return void
         */
        main: function () {
            var that = this;
            var $assembledItems = [];
            var $container = this.assembleContainer();

            // Add menu frame to toolbar
            jQuery(".toolbar .tools").prepend($container);

            // Click handler
            jQuery("#disableCode-a").click(function () {
                jQuery("#disableCode-menu").slideToggle("fast");
            });

            // Construct and add parameter elements to nascent menu frame
            this.parameters.forEach(function ($item) {
                jQuery("#disableCode-menu").append(
                    that.constructItem($item.title, $item.param)
                );
            });
        },

        /**
         * @method init
         * @description Initializing method of the program, this function
         *              defines the class's parameters array that contains the
         *              <code>String</code> representations of the URL query
         *              params and their names in the menu. It calls
         *              <code>DisableCode.main</code>.
         * @param {JSON} $lang
         * @returns {void}
         */
        init: function ($lang) {
            $lang.useUserLang();
            $i18n = $lang;

            this.parameters = [
                {
                    param: "reset-parameters",
                    title: $i18n.msg("reset").plain()
                },
                {
                    param: "useuserjs",
                    title: $i18n.msg("userJS").plain()
                },
                {
                    param: "useusercss",
                    title: $i18n.msg("userCSS").plain()
                },
                {
                    param: "usesitejs",
                    title: $i18n.msg("siteJS").plain()
                },
                {
                    param: "usesitecss",
                    title: $i18n.msg("siteCSS").plain()
                }
            ];

            this.main();
        }
    };

    mw.hook("dev.i18n").add(function ($i18n) {
        jQuery.when(
            $i18n.loadMessages("DisableCode"),
            mw.loader.using("mediawiki.util")
        ).done(jQuery.proxy(DisableCode.init, DisableCode));
    });
});