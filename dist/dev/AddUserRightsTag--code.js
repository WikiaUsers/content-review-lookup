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
        !/bureaucrat|sysop|staff|helper|wiki-manager/.test(config.wgUserGroups.join()) ||
        $('#UserProfileMasthead, #userProfileApp').length === 0 ||
        window.AddUserRightsTagLoaded
    ) {
        return;
    }
    window.AddUserRightsTagLoaded = true;
    function findContainer() {
        var promise = $.Deferred(),
            interval = setInterval(function() {
                var $element = $('#userProfileApp .user-identity-header__attributes, #UserProfileMasthead hgroup');
                if ($element.length) {
                    clearInterval(interval);
                    promise.resolve($element);
                }
            }, 300);
        return promise;
    }
    function init(text, $container) {
        var username = config.profileUserName ||
                       $('.masthead-info h1').text();
        $('<a>', {
            'class': 'tag user-identity-header__tag',
            'css': {
                float: 'right',
                color: 'inherit',
                marginTop: '15px',
                marginRight: '-15px'
            },
            'href': mw.util.getUrl('Special:UserRights/' + username),
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