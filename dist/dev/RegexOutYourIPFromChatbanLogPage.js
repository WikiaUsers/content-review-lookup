/* By Sophiedp with help from Kocka, Doru, fng, and puxlit <3 */
(function ( $, mw ) {
    if (
        mw.config.get( 'wgCanonicalSpecialPageName' ) !== 'Contributions' ||
        window.RegexOutYourIPFromChatbanLogPageLoaded ||
        !mw.loader.getState('ext.Chat2') ||
        window.QuickLogs ||
        !$('.chat-ban-log').exists()
    ) {
        return;
    }
    window.RegexOutYourIPFromChatbanLogPageLoaded = true;
    var regex = /(\/chatban\?page=(?:(?!%3A).)+%3A)(.+)$/;
    var url = $('.chat-ban-log').attr('href');
    var user = decodeURIComponent(url.match(regex)[2]);
    if (mw.util.isIPv4Address(user) || mw.util.isIPv6Address(user)) {
        var actualUser = mw.util.wikiUrlencode($('.UserProfileMasthead .masthead-info h1').text());
        $('.chat-ban-log').attr('href', url.replace(regex, '$1' + actualUser));
    }
})( jQuery, mediaWiki );