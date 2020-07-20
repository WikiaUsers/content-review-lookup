/**
 * <nowiki>
 * ChatReload
 * By [[User:AnimatedCartoons]]
 */
require(['wikia.window', 'jquery', 'mw'], function(window, $, mw) {
    'use strict';
    window.ChatReload = $.extend({
        init: function() {
            this.api = new mw.Api();
            var time = this.time || window.chatReloadTime;
            setInterval(
                $.proxy(this.interval, this),
                (typeof time === 'number' && time >= 5000) ? time : 20000
            );
        },
        interval: function() {
            if (!$('.chat-module').exists()) {
                // Nothing to refresh.
                return;
            }
            mw.log('ChatReload refreshing...');
            this.api.get({
                action: 'parse',
                disablepp: true,
                text: '<chat />'
            }).done(this.callback);
        },
        callback: function(data) {
            var text = data.parse.text['*'],
                chatSelector = '.WikiaPageContentWrapper > #WikiaRailWrapper > #WikiaRail .chat-module',
                $svg = $(chatSelector).find('h2 > svg');
            $('.chat-module').each(function() {
                var $this = $(this),
                    w = $this.hasClass('ChatWidget');
                $this.replaceWith(text);
                if (w) {
                    $this.addClass('ChatWidget');
                }
            });
            $(chatSelector)
                .addClass('rail-module')
                .find('h2')
                .addClass('has-icon')
                .prepend($svg);
            mw.log('ChatReload refreshed.');
        }
    }, window.ChatReload);
    mw.loader.using('mediawiki.api').then(
        $.proxy(window.ChatReload.init, window.ChatReload)
    );
});