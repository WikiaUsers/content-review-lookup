/**
 * ToolbarLinks.js
 * @file Enables addition of custom toolbar buttons that can import code or link
 *       to specific pages/articles on click.
 * @author Eizen <dev.wikia.com/wiki/User_talk:Eizen>
 * @external "mediawiki.util"
 * @external "wikia.window"
 * @external "jQuery"
 * @external "mw"
 */

/*jslint browser, this:true */
/*global mw, jQuery, window, require */

require(["jquery", "mw", "wikia.window"], function (jQuery, mw, wk) {
    "use strict";

    if (!window.customToolbarLinks || window.isToolbarLinksLoaded) {
        return;
    }
    window.isToolbarLinksLoaded = true;

    /**
     * @class ToolbarLinks
     * @classdesc The central ToolbarLinks class
     */
    var ToolbarLinks = {

        /**
         * @method createToolbarLink
         * @description Method creates and returns a formatted <tt>String</tt>
         *              representing a toolbar list element.
         * @param {String} $linkText
         * @param {String} $href
         * @returns {String}
         */
        createToolbarLink: function ($linkText, $href) {
            return mw.html.element("li", {
                "class": "overflow"
            }, new mw.html.Raw(
                mw.html.element("a", {
                    title: $linkText,
                    href: $href,
                    style: "cursor:pointer;"
                }, $linkText)
            ));
        },

        /**
         * @method formatImports
         * @description This method ensures that all import elements are
         *              properly formatted, prepending "u:dev:MediaWiki:" to the
         *              script names array passed as a parameter.
         * @param {String[]} $imports
         * @return {String[]} $formattedArray
         */
        formatImports: function ($imports) {
            var $formattedArray = [];

            $imports.forEach(function ($import) {
                if (!$import.startsWith("MediaWiki:")) {
                    $import = "MediaWiki:" + $import;
                }
                $import = "u:dev:" + $import;
                $formattedArray.push($import);
            });

            return $formattedArray;
        },

        /**
         * @method constructLink
         * @description Method simply creates a toolbar link that links to the
         *              designated address.
         * @param {String} $linkText
         * @param {String} $desiredNode
         * @param {String} $address
         * @returns {void}
         */
        constructLink: function ($linkText, $desiredNode, $address) {
            var $href = wk.wgArticlePath.replace("$1", $address);
            var $element = this.createToolbarLink($linkText, $href);

            jQuery($element).appendTo($desiredNode);
        },

        /**
         * @method importCode
         * @description Method formats and imports a set of included scripts or
         *              stylesheets on button press. The button is removed from
         *              the toolbar once the scripts/styles have been imported.
         * @param {String} $linkText
         * @param {String} $desiredNode
         * @param {String[]} $scripts
         * @param {String[]} $styles
         * @returns {void}
         */
        importCode: function ($linkText, $desiredNode, $scripts, $styles) {
            var $formattedImports;
            var $modules = [];
            var $element = this.createToolbarLink($linkText, "#");

            if ($scripts !== undefined) {
                $formattedImports = this.formatImports($scripts);
                $modules.push({
                    type: "script",
                    articles: $formattedImports
                });
            }

            if ($styles !== undefined) {
                $formattedImports = this.formatImports($styles);
                $modules.push({
                    type: "style",
                    articles: $formattedImports
                });
            }

            jQuery($element).appendTo($desiredNode).click(function () {
                wk.importArticles.apply(undefined, $modules);
                jQuery(this).remove();
            });
        },

        /**
         * @method init
         * @description Main method sorts through the user's custom links,
         *              choosing placements and helper methods depending on each
         *              item's config options.
         * @returns {void}
         */
        init: function () {
            var $node;
            var that = this;

            window.customToolbarLinks.forEach(function ($link) {
                if ($link.placement === "toolbar") {
                    $node = ".toolbar .tools";
                } else if ($link.placement === "myTools") {
                    $node = "#my-tools-menu";
                } else {
                    return;
                }

                if ($link.action === "link") {
                    that.constructLink($link.title, $node, $link.address);
                } else if ($link.action === "import") {

                    // Scripts only
                    if ($link.scripts && !$link.styles) {
                        that.importCode($link.title, $node, $link.scripts);

                    // Styles only
                    } else if (!$link.scripts && $link.styles) {
                        that.importCode($link.title, $node, undefined,
                            $link.styles);

                    // Both scripts and styles
                    } else if ($link.scripts && $link.styles) {
                        that.importCode($link.title, $node, $link.scripts,
                            $link.styles);
                    }
                }
            });
        }
    };

    mw.loader.using("mediawiki.util").then(
        jQuery.proxy(ToolbarLinks.init, ToolbarLinks)
    );
});