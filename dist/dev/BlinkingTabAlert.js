/**
 * BlinkingTabCount - Count of Howard
 * Credit goes to OneTwoThreeFall and Dorumin for their "NewMessageCount"
 * and "PrivateMessageAlert" scripts, which comprised the bulk of this code.
 * This was a simple adaptation on my part.
 * 19-9-16 - Added custom message option
 */
require(['wikia.window', 'jquery', 'mw'], function(window, $, mw) {
    'use strict';

    if (
        mw.config.get('wgCanonicalSpecialPageName') !== 'Chat' ||
        window.loadedNewMessageCount
    ) {
        return;
    }
    window.loadedNewMessageCount = true;

    var BlinkingTabAlert = {
        messages: 0,
        originalTitle: document.title,
        toLoad: 2,
        hook: function() {
            if (--this.toLoad === 0) {
                window.dev.i18n.loadMessages('BlinkingTabAlert')
                    .then($.proxy(this.init, this));
            }
        },
        init: function(i18n) {
            this.i18n = i18n;
            window.addEventListener('blur', $.proxy(this.start, this), false);
            window.addEventListener('focus', $.proxy(this.stop, this), false);
            window.mainRoom.socket
                .bind('chat:add', $.proxy(this.message, this));
        },
        start: function() {
            this.watching = true;
        },
        stop: function() {
            this.watching = false;
            this.messages = 0;
            document.title = this.originalTitle;
            clearInterval(this.timeout);
            this.timeout = null;
        },
        message: function() {
            if (!this.watching) {
                return;
            }
            ++this.messages;
            if (
                typeof window.customMessage === 'object' &&
                window.customMessage !== null
            ) {
                this.newTitle = window.customMessage.message
                    .replace(/\$1/g, this.messages.toString());
            } else {
                this.newTitle = this.i18n.msg('message', this.messages).parse();
            }
            if (!this.timeout) {
                this.timeout = setInterval($.proxy(this.flash, this), 500);
            }
        },
        flash: function() {
            document.title = document.title === this.newTitle ?
                this.originalTitle :
                this.newTitle;
        }
    };

    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:Chat-js.js',
            'u:dev:MediaWiki:I18n-js/code.js'
        ]
    });
    mw.hook('dev.chat.socket')
        .add($.proxy(BlinkingTabAlert.hook, BlinkingTabAlert));
    mw.hook('dev.i18n').add($.proxy(BlinkingTabAlert.hook, BlinkingTabAlert));
});