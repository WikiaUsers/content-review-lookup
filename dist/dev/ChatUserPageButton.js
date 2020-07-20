// ChatUserPageButton - Count of Howard
// 03-10-16 - Initial revision
// 12-10-16 - mw.config.get cleanup
// 18-11-16 - Revised to work with new updated icons
// 19-11-16 - Icon adaption; <li> link fix
// 14-12-16 - Fixed double loading problem
// 28-01-16 - General cleanup

require(['wikia.window', 'jquery', 'mw'], function(window, $, mw) {
    if (
        mw.config.get('wgCanonicalSpecialPageName') !== 'Chat' ||
        window.ChatUserPageButtonLoaded
    ) {
        return;
    }
    window.ChatUserPageButtonLoaded = true;
    var ChatUserPageButton = {
        toLoad: 2,
        hook: function() {
            if (--this.toLoad === 0) {
                window.dev.i18n.loadMessages('ChatUserPageButton')
                    .done($.proxy(this.init, this));
            }
        },
        init: function(i18n) {
            this.i18n = i18n;
            window.mainRoom.viewUsers.bind(
                'mainListClick',
                $.proxy(this.click, this)
            );
        },
        click: function() {
            $('.contribs')
                .clone()
                .addClass('userpage')
                .removeClass('contribs')
                .prependTo('.regular-actions');
            $('.userpage a').attr({
                id: 'userpage',
                target: '_blank',
                href: mw.util.getUrl(
                    'User:' +
                    $('#UserStatsMenu .info ul .username').text()
                )
            });
            if ($('.userpage svg').exists()) {
                $('.userpage svg')[0].setAttribute('viewBox','0 0 24 24');
                $('.userpage path').attr('d', 'M12 14c3.309 0 6-2.691 6-6V6c0-3.309-2.691-6-6-6S6 2.691 6 6v2c0 3.309 2.691 6 6 6zm5 2H7c-3.86 0-7 3.14-7 7a1 1 0 0 0 1 1h22a1 1 0 0 0 1-1c0-3.86-3.14-7-7-7z');
                $('.userpage .label').text(this.i18n.msg('userpage').plain());
            }
        }
    };
    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:Chat-js.js',
            'u:dev:MediaWiki:I18n-js/code.js'
        ]
    });
    mw.hook('dev.chat.render').add($.proxy(ChatUserPageButton.hook, ChatUserPageButton));
    mw.hook('dev.i18n').add($.proxy(ChatUserPageButton.hook, ChatUserPageButton));
});