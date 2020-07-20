/**
 * Name:        EditcountTab
 * Version:     v1.0
 * Author:      KockaAdmiralac <1405223@gmail.com>
 * Description: Adds a tab to user profile pages linking to their
 *              edit count.
 */
(function() {
    var username = $('#UserProfileMasthead h1').text();
    if (
        window.EditcountTabLoaded ||
        !$('#WikiaUserPagesHeader').exists() ||
        // TODO: Fix weird loading order
        mw.util.isIPv4Address(username) ||
        mw.util.isIPv6Address(username)
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
        $('#WikiaUserPagesHeader .tabs-container .tabs').append(
            $('<li>', {
                'data-id': 'editcount',
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