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

require(["mw", "wikia.window", "wikia.ui.factory"], function (mw, wk, ui) {
    "use strict";

    if (
        window.isUsernameAvailabilityLoaded ||
        jQuery("#usernameavailability-a").exists()
    ) {
        return;
    }
    window.isUsernameAvailabilityLoaded = true;
    
    if (!window.dev || !window.dev.i18n) {
        wk.importArticle({
            type: "script",
            article: "u:dev:MediaWiki:I18n-js/code.js"
        });
    }

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

            ui.init(["modal"]).then(function (modal) {
                var config = {
                    vars: {
                        id: "ua-modal",
                        size: "small",
                        title: $i18n.msg("itemTitle").escape(),
                        content: $modalHTML,
                        buttons: [{
                            vars: {
                                value: $i18n.msg("modalCancel").escape(),
                                classes: [
                                    "normal",
                                    "primary"
                                ],
                                data: [{
                                    key: "event",
                                    value: "cancel"
                                }]
                            }
                        }, {
                            vars: {
                                value: $i18n.msg("modalSearch").escape(),
                                classes: [
                                    "normal",
                                    "primary"
                                ],
                                data: [{
                                    key: "event",
                                    value: "search"
                                }]
                            }
                        }]
                    }
                };

                modal.createComponent(config, function (uaModal) {
                    uaModal.bind("cancel", function () {
                        uaModal.trigger("close");
                    });

                    uaModal.bind("search", function () {
                        var $value = jQuery("#ua-input-value").val();

                        if (mw.Title.newFromText($value)) {
                            that.getData($value, that.handleData);
                        } else {
                            jQuery("#ua-log").prepend(
                                $i18n.msg("modalError").escape() + "<br />"
                            );
                        }

                        jQuery("#ua-input-value").val();
                    });

                    uaModal.show();
                });
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
            jQuery.nirvana.getJson("UserProfilePage", "renderUserIdentityBox", {
                title: "User:" + $username
            }).done(function ($data) {
                if ($data && $data.user) {
                    callback($data.user);
                }
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
        handleData: function ($user) {
            var $registration;
            var $userPageLink = mw.html.element("a", {
                target: "_blank",
                href: mw.util.getUrl(
                    "User:" + mw.util.wikiUrlencode($user.name)
                )
            }, $user.name);

            if ($user.registration) {
                $registration = "&nbsp;(" + $user.registration + ")";
            } else {
                $registration = "";
            }

            jQuery("#ua-log").prepend(
                $i18n.msg("modal" + ($user.edits === -1
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

    mw.hook("dev.i18n").add(function ($i18n) {
        jQuery.when(
            $i18n.loadMessages("UsernameAvailability"),
            mw.loader.using("mediawiki.util")
        ).done(jQuery.proxy(UsernameAvailability.init, UsernameAvailability));
    });
});