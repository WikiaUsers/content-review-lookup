/**
 * PageCreator
 * @file Displays information related to page's creator
 * @author Eizen <dev.wikia.com/wiki/User_talk:Eizen>
 * @external "jQuery"
 * @external "mediawiki.util"
 * @external "mediawiki.api"
 * @external "mw"
 * @external "wikia.window"
 */

/*jslint browser, this:true */
/*global mw, jQuery, window, wk */

require(["jquery", "mw", "wikia.window"], function (jQuery, mw, wk) {
    "use strict";

    if (
        window.isPageCreatorLoaded ||
        jQuery("#page-creator").exists() ||
        wk.wgNamespaceNumber === -1 ||
        wk.wgArticleId === 0 ||
        wk.wgAction === 'edit'
    ) {
        return;
    }
    window.isPageCreatorLoaded = true;

    if (!window.dev || !window.dev.i18n) {
        wk.importArticle({
            type: "script",
            article: "u:dev:MediaWiki:I18n-js/code.js"
        });
    }
    var $i18n;

    /**
     * @class PageCreator
     * @classdesc The central PageCreator class
     */
    var PageCreator = {

        /**
         * @method getData
         * @description Method for querying API for data related to revisions.
         *              Acquires timestamp, ids, and user-related info.
         * @param {function} callback
         * @returns {void}
         */
        getData: function (callback) {
            var that = this;

            this.api.get({
                action: "query",
                prop: "revisions",
                titles: wk.wgPageName,
                rvprop: "ids|timestamp|user|userid",
                rvlimit: "1",
                rvdir: "newer",
                format: "json"
            }).done(function ($data) {
                if (!$data.error) {
                    callback(that, $data);
                }
            });
        },

        /**
         * @method handleData
         * @description Utility method for handling data provided from the
         *              <code>getData</code> method. Assembles the HTML string,
         *              handles user skin, and deals with user config options.
         * @param {this} that
         * @param {JSON} $result
         * @returns {void}
         */
        handleData: function (that, $result) {
            var $data = $result.query.pages[wk.wgArticleId].revisions[0];
            var $revisionURL = wk.wgPageName + "?oldid=" + $data.revid;
            var $divElement = mw.html.element("div", { id: "page-creator" });

            var $userLink = jQuery("<div>").append(
                jQuery("<a>", {
                    href: mw.util.getUrl("User:" + $data.user),
                    text: $data.user
                }),
                " ",
                jQuery("<span>", {
                    "class": "mw-usertoollinks"
                }).append(
                    "(",
                    jQuery("<a>", {
                        href: mw.util.getUrl("User talk:" + $data.user),
                        text: $i18n.msg("talk").plain()
                    }),
                    " | ",
                    jQuery("<a>", {
                        href: mw.util.getUrl(
                            "Special:Contributions/" + $data.user
                        ),
                        text: $i18n.msg("contribs").plain()
                    }),
                    ")"
                )
            );

            // Placement of PC before LE if possible
            if (jQuery("#lastEdited").exists()) {
                jQuery($divElement).insertBefore("#lastEdited");
            } else if (wk.skin === "oasis") {
                jQuery($divElement)
                    .insertAfter("#PageHeader .page-header__title");
            } else {
                jQuery($divElement).insertBefore("#bodyContent");
            }

            /**
             * These two <code>if</code> blocks are hacky workarounds to account
             * for the new config object implementation I've decided to pursue.
             * Should work for old and new config methods.
             */
            if (
                (window.pageCreatorAvatar || that.config.useAvatar) &&
                $data.userid !== 0
            ) {
                $userLink.prepend(
                    jQuery("<img>", {
                        id: "pc-avatar",
                        src: "https://services.fandom.com/user-avatar/user/" +
                             $data.userid + "/avatar",
                        width: 15,
                        height: 15
                    }),
                    " "
                );
            }

            if (window.pageCreatorTimestamp || that.config.useTimestamp) {
                that.handleTimestamps($data, $revisionURL, $userLink.html());
            } else {
                jQuery("#page-creator")
                    .html($i18n.msg("main").escape()
                        .replace(/\$1/g, $userLink.html()));
            }

            // Handle avatar not existing
            jQuery("#page-creator img").error(function() {
                jQuery(this).attr(
                    "src",
                    "https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest"
                );
            });

            mw.hook("PageCreator.render").fire(jQuery("#page-creator"));
        },

        /**
         * @method handleTimestamps
         * @description Handler method for the setting of timestamps, provided
         *              the user has included a config option specifying the
         *              addition of timestamps. Timestamps may be displayed in
         *              either UTC or local.
         * @param {JSON} $data
         * @param {String} $rev
         * @param {String} $link
         * @returns {void}
         */
        handleTimestamps: function ($data, $rev, $link) {
            var $time;
            var $formattedCreationDate;
            var $creationDateLink;

            if (window.pageCreatorUTC || this.config.useUTC) {
                $time = new Date($data.timestamp).toUTCString();
                $formattedCreationDate = $time.slice(0, 3) + ", " +
                        $time.slice(4, 16) + ", " + $time.slice(17, 25) +
                        " (" + $time.slice(26) + ")";
            } else {
                $time = new Date($data.timestamp).toString();
                $formattedCreationDate = $time.slice(0, 3) + ", " +
                        $time.slice(4, 15) + ", " + $time.slice(16, 24) +
                        " " + $time.slice(34);
            }

            $creationDateLink = jQuery("<a>", {
                href: wk.wgArticlePath.replace('$1', $rev),
                html: this.config.useTimeago ? jQuery.timeago($formattedCreationDate) : $formattedCreationDate
            }).prop('outerHTML');

            var on;
            if (!this.config.useTimeago) {
                on = $i18n.msg("on").escape().replace(/\$2/g, $creationDateLink);
            } else {
                on = $creationDateLink;
            }

            jQuery("#page-creator")
                .html(
                    $i18n.msg("main").escape().replace(/\$1/g, $link) + " " + on
                );
        },

        /**
         * @method init
         * @description The main method of the script, this function sets config
         *              options and invokes the <code>getData</code> method if
         *              the viewed page is in the list of approved namespaces.
         * @param {JSON} $lang
         * @returns {void}
         */
        init: function ($lang) {
            $lang.useUserLang();
            $i18n = $lang;

            this.api = new mw.Api();
            this.config = jQuery.extend(
                {
                    namespaces: [0, 4, 8, 10, 14],
                    useAvatar: false,
                    useTimestamp: false,
                    useUTC: false,
                    useTimeago: false
                },
                window.pageCreatorConfig
            );

            mw.util.addCSS(
                "#page-creator {" +
                    "line-height: normal;" +
                    "font-size: 12px;" +
                    "font-weight: normal;" +
                "}" +
                ".UserProfileActionButton + #page-creator {" +
                    "margin-top: -37px;" +
                "}"
            );

            // One of a number of hacky patches accounting for the old config
            var $namespaces = window.pageCreatorNamespaces ||
                this.config.namespaces;

            if ($namespaces === 'all') {
                $namespaces = Object.keys(wk.wgFormattedNamespaces).map(Number);
            }

            if (jQuery.inArray(wk.wgNamespaceNumber, $namespaces) !== -1) {
                this.getData(this.handleData);
            }
        }
    };

    mw.hook("dev.i18n").add(function ($i18n) {
        jQuery.when(
            $i18n.loadMessages("PageCreator"),
            mw.loader.using(["mediawiki.util", "mediawiki.api"])
        ).done(jQuery.proxy(PageCreator.init, PageCreator));
    });
});