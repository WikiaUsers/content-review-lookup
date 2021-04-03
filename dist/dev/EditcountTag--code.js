/**
 * EditcountTag.js
 *
 * Adds editcount tags to the masthead
 * @author: [[w:User:Slyst]]
 */
(function() {
    if (
        $('#UserProfileMasthead, #userProfileApp').length === 0 ||
        window.EditcountTagLoaded
    ) {
        return;
    }
    window.EditcountTagLoaded = true;
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
        var username = mw.config.get('profileUserName') ||
                       $('.masthead-info h1').text();
        $('<a>', {
            'class': 'tag user-identity-header__tag',
            'css': {
                float: 'right',
                color: 'inherit',
                marginTop: '15px',
                marginRight: '-15px'
            },
            'href': mw.util.getUrl('Special:Editcount/' + username),
            'text': text
        }).appendTo($container);
    }
    mw.hook('dev.fetch').add(function(fetch) {
        $.when(fetch('editcount'), findContainer())
            .then(init);
    });
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:Fetch.js'
    });
})();