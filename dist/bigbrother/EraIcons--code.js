/**
 * EraIcons.js
 * @file Adds era icons to page headers
 * @authors SlyCooperFan1 <dev.wikia.com/wiki/User_talk:SlyCooperFan1>
            Eizen <dev.wikia.com/wiki/User_talk:Eizen>
            Ursuul <dev.wikia.com/wiki/User_talk:Ursuul>
 * @external "mediawiki.util"
 * @external "wikia.window"
 * @external "jQuery"
 */
 
/*jslint browser, this:true */
/*global mw, jQuery, console, window, wikia.window */

require(["mw", "wikia.window"], function (mw, wk) {
    "use strict";

    if (
        window.isEraIconsLoaded ||
        jQuery.inArray(
            wk.wgNamespaceNumber,
            [-1, 2, 3, 420, 501, 502, 828, 1200, 1201, 1202, 2000, 2001, 2002]
        ) !== -1 ||
        (
            jQuery.inArray(wk.skin, ["wikia", "oasis"]) !== -1 &&
            !jQuery("#PageHeader").exists()
        ) ||
        (
            jQuery.inArray(wk.skin, ["monobook", "uncyclopedia", "wowpedia"]) !== -1 &&
            !jQuery("#firstHeading").exists()
        )
    ) {
        return;
    }
    window.isEraIconsLoaded = true;

    var EraIcons = {
        addToOasis: function () {
            jQuery(".page-header__contribution>div:first-child").prepend(
                jQuery("<div>")
                    .attr("class", "page-header__eraicons")
            );

            if (jQuery(".page-header__languages").exists()) {
                jQuery(".page-header__eraicons").css("right", "70px");
            }

            jQuery(".eraicon").each(function () {
                jQuery(this).appendTo(".page-header__eraicons").addClass("wds-dropdown");

                var $dropdownInfo = jQuery(this).find("a").attr("title");
                jQuery(this).find("a").removeAttr("title");

                jQuery(this).append(
                    jQuery("<div>")
                        .attr("class", "wds-dropdown__content")
                        .html(
                            jQuery("<span>")
                                .attr("class", "eraicon-dropdown")
                                .text($dropdownInfo)
                        )
                );
            });
        },
        addToMonobook: function () {
            jQuery(".firstHeading").append(
                jQuery("<div>")
                    .attr("class", "page-header-eraicons")
            );

            jQuery(".eraicon").each(function () {
                jQuery(this).appendTo(".page-header-eraicons");
            });
        },
        init: function () {
            var $useIncludedStylesheet = window.useIncludedStylesheet || false;

            if ($useIncludedStylesheet) {
                wk.importArticle({
                    type: "style",
                    article: "u:dev:MediaWiki:EraIcons/code.css"
                });
            }

            switch (wk.skin) {
            case "wikia":
            case "oasis":
                EraIcons.addToOasis();
                break;
            case "monobook":
            case "uncyclopedia":
            case "wowpedia":
                EraIcons.addToMonobook();
                break;
            }
        }
    };

    mw.loader.using("mediawiki.util").then(EraIcons.init);
});