/**
 * AutoPurge
 * @file Automatically purges pages in <tt>window.autoPurgePages</tt> array
 * @author Count of Howard <dev.fandom.com/wiki/User_talk:Count_of_Howard>
 * @license Apache-2.0
 * @external "jQuery"
 * @external "mediawiki.api"
 */

/*jslint browser, this:true */
/*global mw, jQuery, window */

mw.loader.using("mediawiki.api", function () {
    "use strict";

    if (window.autoPurgePages === undefined) {
        return;
    }

    /**
     * @class AutoPurge
     * @classdesc The central AutoPurge class
     */
    var AutoPurge = {
        /**
         * @method purgePage
         * @param {string} $page
         * @returns {void}
         */
        purgePage: function ($page) {
            var $api = new mw.Api();

            $api.get({
                action: "purge",
                titles: $page
            }).done(function ($data) {
                if (!$data.error) {
                    window.location.reload(true);
                }
            });

        },
        /**
         * @method checkPage
         * @param {string} $page
         * @returns {void}
         */
        checkPage: function ($page) {
            var $city = mw.config.get("wgCityId");
            var $storageId = $page + "-" + $city + "-" + "AP";

            if (window.localStorage) {
                if (!localStorage.getItem($storageId)) {
                    localStorage[$storageId] = true;
                    this.purgePage($page);
                } else {
                    localStorage.removeItem($storageId);
                }
            }
        },
        /**
         * @method init
         * @returns {void}
         */
        init: function () {
            var $pageName = mw.config.get("wgPageName");

            if (jQuery.inArray($pageName, window.autoPurgePages) !== -1) {
                this.checkPage($pageName);
            }
        }
    };

    AutoPurge.init();
});