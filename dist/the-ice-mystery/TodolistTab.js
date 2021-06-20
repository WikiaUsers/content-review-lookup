(function() {
    if (
        window.todolistTabLoaded ||
        (
            $('#UserProfileMasthead').length === 0 &&
            !mw.config.get('profileUserName')
        )
    ) {
        return;
    }
    window.todolistTabLoaded = true;
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
    function findContainer() {
        var promise = $.Deferred(),
            interval = setInterval(function() {
                var $element = $('#userProfileApp .user-profile-navigation, #WikiaUserPagesHeader .tabs-container .tabs');
                if ($element.length) {
                    clearInterval(interval);
                    promise.resolve($element);
                }
            }, 300);
        return promise;
    }
    mw.hook('dev.i18n').add(function(i18no) {
        $.when(
            i18no.loadMessages('TodolistTab'),
            findContainer(),
            mw.loader.using('mediawiki.util')
        ).then(function(i18n, $container) {
            var username = mw.config.get('profileUserName') || $('#UserProfileMasthead h1').text(),
                title = 'User:' + username + '/' + 'Todolist';
            $container.append(
                $('<li>', {
                    'class': 'user-profile-navigation__link false',
                    'data-id': 'todolist'
                }).append(
                    $('<a>', {
                        href: mw.util.getUrl(title),
                        title: title,
                        text: 'Todolist'
                    })
                )
            );
        });
    });
})();