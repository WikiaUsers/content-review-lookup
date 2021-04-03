/**
 * Name:        Minimalism - Masthead.js
 * Author:      KockaAdmiralac <wikia@kocka.tech>
 * Description: Removes mastheads of anonymous users and
 *              redirects their userpages / talkpages to
 *              their contributions if they don't exist
 * NOTE:        PERSONAL USE ONLY!
 */
mw.loader.using('mediawiki.util').then(function() {
    var config = mw.config.get([
        'wgArticleId',
        'wgCanonicalSpecialPageName',
        'wgPageName'
    ]), ip = mw.config.get('profileUserName') || $('#UserProfileMasthead .masthead-info h1').text();
    if (ip && (mw.util.isIPv4Address(ip) || mw.util.isIPv6Address(ip))) {
        if (
            config.wgCanonicalSpecialPageName !== 'Contributions' &&
            !config.wgArticleId
        ) {
            window.location.href = mw.util.getUrl('Special:Contribs/' + ip);
        } else {
            $('#WikiaUserPagesHeader, #userProfileApp').remove();
        }
    }
    // Mark as subpage to remove the top margin properly
    if (config.wgPageName.indexOf('/') !== -1) {
        $('body').addClass('is-subpage');
    }
});