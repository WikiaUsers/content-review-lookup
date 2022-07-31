(function () {
    var usernav = $('#global-navigation-user-signout').parent();
    usernav.find('a[data-tracking-label="account.profile"]').text('👤');
    usernav.find('a[data-tracking-label="account.message-wall"], a[data-tracking-label="account.talk"]').text('💬');
    usernav.find('a[data-tracking-label="account.help"]').text('❓️');
    usernav.find('a[data-tracking-label="account.preferences"]').text('⚙️');
    usernav.find('a[data-tracking-label="account.contributions"]').text('✏️');
    usernav.find('a[data-tracking-label="bingebot.watchlist"]').text('📺');
    usernav.find('button[data-tracking-label="account.sign-out"]').text('👋');
})();