/**
 * AddUserRightsTag.js
 *
 * Adds easy way to add user rights on the masthead
 * @author: [[w:User:Algorithmz]]
 * fork of EditcountTag
 */
(function() {
    var config = mw.config.get([
        'profileUserName',
        'wgUserGroups'
    ]);
    if (
        !/bureaucrat|sysop|staff|wiki-specialist/.test(config.wgUserGroups.join()) ||
        !mw.config.get('profileUserName') ||
        window.AddUserRightsTagLoaded
    ) {
        return;
    }
    window.AddUserRightsTagLoaded = true;
    function findContainer() {
        var promise = $.Deferred(),
            interval = setInterval(function() {
                var $element = $('#userProfileApp .user-identity-header__actions');
                if ($element.length) {
                    clearInterval(interval);
                    promise.resolve($element);
                }
            }, 300);
        return promise;
    }
    function init(text, $container) {
        $('<a>', {
            'class': 'wds-button user-identity-header__button',
            'href': mw.util.getUrl('Special:UserRights/' + config.profileUserName),
            'text': text
        }).appendTo($container);
    }
    mw.hook('dev.fetch').add(function(fetch) {
        $.when(fetch('userrights'), findContainer())
            .then(init);
    });
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:Fetch.js'
    });
})();