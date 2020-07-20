/**
 * ChatAwayButton.js
 * @file Adds "Away" button to chat, isolated functionality from ChatHacks
 * @author Eizen <dev.fandom.com/wiki/User_talk:Eizen>
 * @external "wikia.window"
 * @external "jQuery"
 * @external "mw"
 */

/*jslint browser, this:true */
/*global mw,jQuery,require,wk,mainRoom,models,NodeChatController */

require(["jquery", "mw", "wikia.window"], function (jQuery, mw, wk) {
    "use strict";

    if (
        wk.wgCanonicalSpecialPageName !== "Chat" ||
        wk.isChatAwayButtonLoaded
    ) {
        return;
    }
    wk.isChatAwayButtonLoaded = true;

    /**
     * @class ChatAwayButton
     * @classdesc The central ChatAwayButton class
     */
    var ChatAwayButton = {
        loaded: 0,
        toggle: 0,

        /**
         * @method constructButton
         * @description Constructs a simple button element and returns it.
         * @param {Object} $lang
         * @returns {dev.chat.Button}
         */
        constructButton: function ($lang) {
            return new wk.dev.chat.Button({
                name: "ChatAwayButton",
                attr: {
                    click: jQuery.proxy(this.click, this),
                    id: "ChatAwayButton",
                    text: $lang.msg("away").plain()
                }
            });
        },

        /**
         * @method setStatus
         * @description Sets the away/present status of the user in question;
         *              slight modification to the standard methods used.
         * @param {string} $status
         * @returns {void}
         */
        setStatus: function ($status) {
            mainRoom.socket.send(
                new models.SetStatusCommand({
                    statusState: $status,
                    statusMessage: ""
                }).xport()
            );
        },

        /**
         * @method click
         * @description Handles clicks on the away button.
         * @returns {void}
         */
        click: function () {
            return (this.toggle ^= 1)
                ? this.setStatus(STATUS_STATE_AWAY)
                : this.setStatus(STATUS_STATE_PRESENT);
        },

        /**
         * @method main
         * @description The main method, handles placement and click events. The
         *              default <tt>setAway</tt> and <tt>setBack</tt> methods
         *              have been noop'ed in this script for my own personal
         *              preference, as I'm not a fan of the <tt>setTimeout</tt>
         *              implementation used or the inability to add messages to
         *              the chat while away.
         * @param {Object} $lang
         * @returns {void}
         */
        main: function ($lang) {
            this.$button = this.constructButton($lang);

            // Negating the defaults
            NodeChatController.prototype.setAway = jQuery.noop;
            NodeChatController.prototype.setBack = jQuery.noop;
        },

        /**
         * @method preload
         * @description Handles hooks from I18n-js and Chat-js and after they
         *              both fire loads i18n and runs the main method.
         * @returns {void}
         */
        preload: function() {
            if (++this.loaded === 2) {
                wk.dev.i18n.loadMessages("ChatAwayButton").then(
                    jQuery.proxy(this.main, this)
                );
            }
        }
    };

    mw.hook("dev.chat.render").add(
        jQuery.proxy(ChatAwayButton.preload, ChatAwayButton)
    );

    mw.hook("dev.i18n").add(
        jQuery.proxy(ChatAwayButton.preload, ChatAwayButton)
    );

    wk.importArticles({
        type: "script",
        articles: [
            "u:dev:MediaWiki:I18n-js/code.js",
            "u:dev:MediaWiki:Chat-js.js"
        ]
    });
});