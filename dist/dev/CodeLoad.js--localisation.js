/*jslint browser, long */
/*global require, importArticle */

require(["mw", "fosl.codeload"], function (mw, cl) {
    "use strict";

    function main(i18n) {
        var msgKeys = Object.keys(i18n._messages.en);
        var msg = {};

        // collect all i18n-js translations so we can use them with mw.messages
        msgKeys.forEach(function (msgKey) {
            msg["codeload-" + msgKey] = i18n.msg(msgKey).plain();
        });

        // use wiki language for edit summary
        msg["codeload-edit-summary"] = i18n.inContentLang().msg("edit-summary").plain();

        // if defined, set custom intro message
        if (typeof cl.introMessage === "string") {
            msg["codeload-intro-custom"] = cl.introMessage;
        }

        mw.messages.set(msg);
        cl.messagesReady.resolve();
    }

    mw.hook("dev.i18n").add(function (i18njs) {
        i18njs.loadMessages("CodeLoad").done(main);
    });

    if (!(window.dev && window.dev.i18n && window.dev.i18n.loadMessages)) {
        importArticle({
            type: "script",
            article: "u:dev:I18n-js/code.js"
        });
    }
});