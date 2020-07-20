/**
 * UserActivityTab/code.js
 * @file Provides a link to Special:UserActivity
 * @author Eizen <dev.wikia.com/wiki/User_talk:Eizen>
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
        window.isUserActivityTabLoaded ||
        jQuery("li[data-id='user-activity']").exists() ||
        !$("#UserProfileMasthead").exists()
    ) {
        return;
    }
    window.isUserActivityTabLoaded = true;

    /**
     * @class UserActivityTab
     * @classdesc main class
     */
    var UserActivityTab = {

        /**
         * @method constructItem
         * @description Method returns a link inside a list item
         * @param {string} $text
         * @returns {mw.html.element}
         */
        constructItem: function ($text) {
            return mw.html.element("li", {
                "id": "useractivitytab-li",
                "data-id": "user-activity"
            }, new mw.html.Raw(
                mw.html.element("a", {
                    "id": "useractivitytab-a",
                    // wikia.com, for easier grepping
                    // when we need to replace this
                    "href": mw.util.getUrl("w:Special:UserActivity"),
                    "title": $text
                }, $text)
            ));
        },

        /**
         * @method init
         * @description Assembles all the necessary content and appends to
         *              selected node only if the user page being viewed is the
         *              owner's.
         * @returns {void}
         */
        init: function ($lang) {
            var $element = this.constructItem($lang.msg("activity").plain());

            if (
                jQuery(".UserProfileMasthead .masthead-info h1").text() ===
                wk.wgUserName
            ) {
                jQuery(".WikiaUserPagesHeader ul.tabs").append($element);
            }
        },

        /**
         * @method i18n
         * @description Called when [[I18n-js]] library gets loaded.
         *              Loads "User Activity" tab text.
         * @param {object} i18n
         * @returns {void}
         */
        i18n: function ($i18n) {
            $i18n.loadMessages("UserActivityTab").then(
                jQuery.proxy(this.init, this)
            );
        }
    };

    importArticle({
        type: "script",
        article: "u:dev:MediaWiki:I18n-js/code.js"
    });
    mw.hook("dev.i18n").add(jQuery.proxy(UserActivityTab.i18n, UserActivityTab));
});