/**
 * NavLinks.js
 * @file Adds links to either globalNav or local header nav
 * @author Eizen <dev.wikia.com/wiki/User_talk:Eizen>
 * @external "jQuery"
 * @external "wikia.window"
 * @external "mw"
 */

/*jslint browser, this:true */
/*global mw, wk, jQuery, window, require */

require(["mw", "wikia.window"], function (mw, wk) {
    "use strict";

    var NavLinks = {
        cloneMenu: function ($clone, $textID, $listID, $target, $title) {
            jQuery($clone).clone().attr("id", "NavLinks").prependTo($target);
            jQuery($textID).text($title);
            jQuery($listID).empty().attr("id", "NavLinks-menu");
        },
        constructItem: function ($text, $address) {
            return mw.html.element("li", {
                "class": "NavLinks-menu-li"
            }, new mw.html.Raw(
                mw.html.element("a", {
                    href: wk.wgArticlePath.replace("$1", $address),
                    title: $text
                }, $text)
            ));
        },
        handlePlacement: function ($placement, $links, $title) {
            if ($placement === "global") {
                this.cloneMenu(
                    ".wds-global-navigation__wikis-menu",
                    "#NavLinks .wds-global-navigation__dropdown-toggle > span",
                    "#NavLinks .wds-list",
                    ".wds-global-navigation__links-and-search",
                    $title
                );
            } else if ($placement === "header") {
                this.cloneMenu(
                    ".wds-tabs__tab:first-of-type",
                    "#NavLinks .wds-tabs__tab-label > a > span",
                    "#NavLinks .wds-dropdown__content > ul",
                    ".wds-tabs",
                    $title
                );
            }

            $links.forEach(function ($item) {
                var $listElement = NavLinks
                        .constructItem($item.text, $item.address);

                jQuery($listElement).appendTo("#NavLinks-menu");
            });
        },
        init: function () {
            if (
                window.isNavLinksLoaded ||
                !window.NavLinksConfig ||
                !window.NavLinksConfig.links ||
                jQuery.inArray(wk.skin, ["oasis", "wikia"]) === -1
            ) {
                return;
            }
            window.isNavLinksLoaded = true;

            var $placement = window.NavLinksConfig.placement || "global";
            var $locations = window.NavLinksConfig.links;
            var $title = window.NavLinksConfig.title || "NavLinks";

            NavLinks.handlePlacement($placement, $locations, $title);
        }
    };

    jQuery(NavLinks.init);
});