/**
 * CreatePagePreloadTemplate.js
 * @file Loads preload template in all skins when using Special:CreatePage
 * @author Eizen <dev.fandom.com/wiki/User_talk:Eizen>
 * @external "mediawiki.util"
 * @external "jQuery"
 * @external "wikia.window"
 * @external "mw"
 */

/*jslint browser, this:true */
/*global mw, jQuery, window, require, wk */

require(["mw", "wikia.window"], function (mw, wk) {
    "use strict";

    if (
        wk.wgPageName !== "Special:CreatePage" ||
        window.isCreatePagePreloadTemplateLoaded
    ) {
        return;
    }
    window.isCreatePagePreloadTemplateLoaded = true;

    var PreloadTemplates = {
        redirect: function ($page, $template) {
            window.location.href = $page +
                "?action=edit&flow=create-page-special-create-page" +
                "&tracked=true&preload=" + mw.util.wikiUrlencode($template);
        },
        init: function () {
            var that = this;
            var $preloadTemplate = window.customPreloadTemplate ||
                "Template:CreatePageDefaultTemplate";

            jQuery(".modalToolbar #ok").click(function () {
                var $newPage = jQuery("input[name='wpTitle']").val();
                that.redirect($newPage, $preloadTemplate);
            });
        }
    };

    mw.loader.using("mediawiki.util").then(
        jQuery.proxy(PreloadTemplates.init, PreloadTemplates)
    );
});