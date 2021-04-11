/**
 * UsernameAvailability/code.js
 * @file Allows users to check for extant usernames in modal
 * @author Eizen <dev.fandom.com/wiki/User_talk:Eizen>
 * @external "mediawiki.util"
 * @external "jQuery"
 * @external "wikia.ui.factory"
 * @external "wikia.window"
 * @external "mw"
 */

/*jslint browser, this:true */
/*global mw, jQuery, window, require, wk, ui */

(function () {
    "use strict";

    if (
        window.isUsernameAvailabilityLoaded ||
        jQuery("#usernameavailability-a").length !== 0
    ) {
        return;
    }
    window.isUsernameAvailabilityLoaded = true;
    
    importArticles({
        type: "script",
        articles: [
            "u:dev:MediaWiki:I18n-js/code.js",
            "u:dev:MediaWiki:ShowCustomModal.js"
        ]
    });

    var $i18n;

    /**
     * @class UsernameAvailability
     * @classdesc The central UsernameAvailability class
     */
    var UsernameAvailability = {

        /**
         * @method constructItem
         * @description Returns a link element inside a list element to be
         *              prepended to the toolbar/toolbox
         * @param {string} $text
         * @returns {element}
         */
        constructItem: function ($text) {
            return mw.html.element("li", {
                "class": "overflow",
                "id": "usernameavailability-li"
            }, new mw.html.Raw(
                mw.html.element("a", {
                    "id": "usernameavailability-a",
                    "href": "#",
                    "title": $text
                }, $text)
            ));
        },

        /**
         * @method displayModal
         * @description Displays a user interface using wikia.ui.factory modal
         *              styles. Differs from previous jQuery modal UI
         *              implementation.
         * @param {string} $modalHTML
         * @returns {void}
         */
        displayModal: function ($modalHTML) {
            var that = this;

            mw.util.addCSS(
                "#ua-modal {" +
                    "width: 500px !important;" +
                "}" +
                "#ua-input-value {" +
                    "height: 30px;" +
                    "width: 100%;" +
                    "padding: 0;" +
                "}" +
                "#ua-log {" +
                    "height: 100px;" +
                    "width: 98%;" +
                    "border: 1px solid;" +
                    "font-family: monospace;" +
                    "background: #fff;" +
                    "color: #aeaeae;" +
                    "overflow: scroll;" +
                    "padding:5px;" +
                "}"
            );

            var $modal = dev.showCustomModal($i18n.msg("itemTitle").escape(), {
                id: "ua-modal",
                content: $modalHTML,
                buttons: [{
                    message: $i18n.msg("modalCancel").escape(),
                    handler: function() {
                        dev.showCustomModal.closeModal($modal);
                    }
                }, {
                    message: $i18n.msg("modalSearch").escape(),
                    handler: function() {
                        var $value = jQuery("#ua-input-value").val();

                        if (mw.Title.newFromText($value)) {
                            that.getData($value, that.handleData);
                        } else {
                            jQuery("#ua-log").prepend(
                                $i18n.msg("modalError").escape() + "<br />"
                            );
                        }

                        jQuery("#ua-input-value").val();
                    },
                }]
            });
        },

        /**
         * @method getData
         * @description Queries data concerning username input, passes to
         *              callback (handleData)
         * @param {string} $username
         * @param {callback} callback
         * @returns {void}
         */
        getData: function ($username, callback) {
            var server = mw.config.get('wgServer');

            jQuery.ajax({
                url: server + '/wikia.php',
                data: {
                    controller: 'UserApiController',
                    method: 'getUsersByName',
                    query: $username
                }
            }).then(function(data) {
                // we only care about the first user
                if (data.users.length === 0) {
                    callback($username, null);
                    return;
                }

                var user = data.users[0];

                if (user.name.toLowerCase() !== $username.toLowerCase()) {
                    // wrong user
                    callback($username, null);
                    return;
                }

                // fetch registration date
                // user.name is the source of truth from this point on
                jQuery.ajax({
                    url: server + '/wikia.php',
                    data: {
                        controller: 'UserProfile',
                        method: 'getUserData',
                        userId: user.id,
                        format: 'json'
                    }
                }).then(function(data) {
                    callback(user.name, data.userData);
                });
            });
        },

        /**
         * @method handleData
         * @description Callback handler for data queried on username input.
         *              Adds log entry to log field. Previous implementation
         *              appended entries and displayed a link at the end. New
         *              implementation replaces "This username" with the input
         *              username itself and prepends to the log. Furthermore, if
         *              the user's registration date is a legit value, it is
         *              displayed after the entry.
         * @param {string} $user
         * @returns {void}
         */
        handleData: function (username, userData) {
            var $registration;
            var $userPageLink = mw.html.element("a", {
                target: "_blank",
                href: mw.util.getUrl(
                    "User:" + mw.util.wikiUrlencode(username)
                )
            }, username);

            if (userData && userData.registration) {
                $registration = "&nbsp;(" + userData.registration + ")";
            } else {
                $registration = "";
            }

            jQuery("#ua-log").prepend(
                $i18n.msg("modal" + (userData === null
                    ? "Unclaimed"
                    : "Exists"), $userPageLink).plain() +
                $registration + "<br />"
            );
        },

        /**
         * @method init
         * @description Assembles contents and handles click events
         * @returns {void}
         */
        init: function ($lang) {
            var that = this;

            $i18n = $lang;
            $i18n.useContentLang();

            var $element = this.constructItem($i18n.msg("itemTitle").escape());
            var $location = "#my-tools-menu";

            var $modalHTML =
                "<form id='ua-modal-form' class='WikiaForm '>" +
                    "<fieldset>" +
                        "<p>" + $i18n.msg("modalTitle").escape() + "<br />" +
                            "<input type='textbox' id='ua-input-value'" +
                                "maxlength='30' placeholder='" +
                                    $i18n.msg("modalSearch").escape() +
                            "'/>" +
                        "</p>" +
                    "</fieldset><br />" + "<hr />" +
                "</form>" +
                "<div id='ua-log'></div>";

            jQuery($location).prepend($element).click(function () {
                that.displayModal($modalHTML);
            });
        }
    };

    // some more sophisticated dep management would be in order
    mw.hook("dev.showCustomModal").add(function() {
        mw.hook("dev.i18n").add(function($i18n) {
            jQuery.when(
                $i18n.loadMessages("UsernameAvailability"),
                mw.loader.using("mediawiki.util")
            ).done(jQuery.proxy(UsernameAvailability.init, UsernameAvailability));
        });
    });
})();