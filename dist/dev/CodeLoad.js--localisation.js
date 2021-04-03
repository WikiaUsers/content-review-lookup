/*jslint browser, long */
/*global mediaWiki, importArticle, codeLoad */

(function (mw, cl) {
    "use strict";

    // messages present in [[MediaWiki:Custom-CodeLoad/i18n.json]]
    var msgKeys = [
        "clear-cache",
        "clear-cache-success",
        "close",
        "done",
        "edit-summary",
        "entry",
        "group-other",
        "heading",
        "intro",
        "intro-sysop",
        "no-definitions",
        "preferences",
        "preferences-with-title",
        "reset",
        "reset-tooltip",
        "save",
        "save-anon",
        "save-fail",
        "save-success",
        "save-tooltip",
        "user-page-info"
    ];

    function main(i18n) {
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
            article: "u:dev:MediaWiki:I18n-js/code.js"
        });
    }
}(mediaWiki, codeLoad));