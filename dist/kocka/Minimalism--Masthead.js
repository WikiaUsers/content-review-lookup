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
    ]), ip = mw.config.get('profileUserName');
    if (ip && (mw.util.isIPAddress(ip))) {
        if (
            config.wgCanonicalSpecialPageName !== 'Contributions' &&
            !config.wgArticleId
        ) {
            window.location.href = mw.util.getUrl('Special:Contribs/' + ip);
        } else {
            $('#userProfileApp').remove();
        }
    }
});