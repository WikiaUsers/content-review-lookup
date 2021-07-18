/**
 * Name:        EditcountTab
 * Version:     v1.1
 * Author:      KockaAdmiralac <wikia@kocka.tech>
 * Description: Adds a tab to user profile pages linking to their
 *              edit count.
 */
(function() {
    var username = mw.config.get('profileUserName');
    if (
        window.EditcountTabLoaded ||
        !username ||
        // TODO: Fix weird loading order
        mw.util.isIPAddress(username)
    ) {
        return;
    }
    window.EditcountTabLoaded = true;
    mw.loader.using([
        'mediawiki.api',
        'mediawiki.util'
    ]).then(function() {
        return new mw.Api().get({
            action: 'query',
            meta: 'allmessages',
            ammessages: 'editcount',
            amlang: mw.config.get('wgUserLanguage')
        });
    }).then(function(d) {
        var text = d.query.allmessages[0]['*'];
        $('.user-profile-navigation').append(
            $('<li>', {
                'class': 'user-profile-navigation__link',
                id: 'editcount-tab'
            }).append(
                $('<a>', {
                    href: mw.util.getUrl('Special:Editcount/' + username),
                    title: text,
                    text: text
                })
            )
        );
    });
})();