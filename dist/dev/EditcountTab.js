/**
 * Name:        EditcountTab
 * Version:     v2024.07
 * Author:      KockaAdmiralac <wikia@kocka.tech>
 * Description: Adds a tab to user profile pages linking to their
 *              edit count.
 */
(function() {
    var username = mw.config.get('profileUserName');
    if (window.EditcountTabLoaded || !username) {
        return;
    }
    window.EditcountTabLoaded = true;
    function findContainer() {
        var promise = $.Deferred(),
            interval = setInterval(function() {
                var $element = $('#userProfileApp .user-profile-navigation');
                if ($element.length) {
                    clearInterval(interval);
                    promise.resolve($element);
                }
            }, 300);
        return promise;
    }
    mw.loader.using([
        'mediawiki.api',
        'mediawiki.util'
    ]).then(function() {
        return $.when(
            findContainer(),
            new mw.Api().loadMessagesIfMissing(['editcount'])
        );
    }).then(function($container) {
        if (mw.util.isIPAddress(username)) {
            return;
        }
        var text = mw.message('editcount').plain();
        $container.append(
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