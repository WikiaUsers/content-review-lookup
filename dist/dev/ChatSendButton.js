/* [[ChatSendButton]] - add a 'Send' button to Chat */

/*jslint browser */
/*global $, mw, importArticle */

$(function () {
    "use strict";

    // only run in chat + double-run protection
    if (
        mw.config.get("wgCanonicalSpecialPageName") !== "Chat"
        || window.loadedChatSendButton
    ) {
        return;
    }
    window.loadedChatSendButton = true;


    // prevent empty button flash before CSS import loads
    mw.util.addCSS("#ChatSendButton:empty { display: none }");

    var $messageBoxContainer = $(".Write");
    var $messageBox = $(".Write [name='message']");
    var $sendButton = $("<span>")
        .addClass("button")
        .attr("id", "ChatSendButton")
        .appendTo($messageBoxContainer);

    $sendButton.click(function () {
        $messageBox.trigger({
            type: "keypress",
            which: 13  // enter/return key
        });
    });


    // load i18n from [[MediaWiki:Custom-ChatSendButton/i18n.json]]
    mw.hook("dev.i18n").add(function (i18njs) {
        i18njs.loadMessages("ChatSendButton").done(function (i18n) {
            $sendButton.text(i18n.msg("send").plain());
        });
    });

    // integrate with [[MobileChat]]
    mw.hook("dev.mobilechat.statechange").add(function (state) {
        if (state) {
            $sendButton
                .removeClass()
                .insertAfter($messageBox)
                .addClass("wds-button");
        } else {
            $sendButton
                .removeClass()
                .appendTo($messageBoxContainer)
                .addClass("button");
        }
    });


    importArticle({
        type: "style",
        article: "u:dev:MediaWiki:ChatSendButton.css"
    });

    if (!(window.dev && window.dev.i18n && window.dev.i18n.loadMessages)) {
        importArticle({
            type: "script",
            article: "u:dev:MediaWiki:I18n-js/code.js"
        });
    }
});