(function () {
    var usernav = mw.config.get('skin') === 'oasis' ? $('.wds-global-navigation__user-menu > div > ul') : $('#global-navigation-user-signout').parent();
    usernav.find('a[data-tracking-label="account.profile"]').text('👤');
    usernav.find('a[data-tracking-label="account.message-wall"], a[data-tracking-label="account.talk"]').text('💬');
    usernav.find('a[data-tracking-label="account.help"]').text('❓️');
    usernav.find('a[data-tracking-label="account.preferences"]').text('⚙️');
    usernav.find('a[data-tracking-label="account.contributions"]').text('✏️');
    usernav.find('a[data-tracking-label="bingebot.watchlist"]').text('📺');
    usernav.find('.wds-sign-out__button').text('👋');
    window.dev = $.extend(true, window.dev, {
        i18n: {
            overrides: {
                ContribsLink: {
                    'contribs': '✏️'
                }
            }
        }
    });
    usernav.css('display', 'flex');
    usernav.css('background-image', 'unset');
})();