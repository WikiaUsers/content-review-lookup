/* Any JavaScript here will be loaded for all users on every page load. */
/* --- Lock comments configuration ---*/
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 1000;

/* --- SandboxTab --*/
(function() {
    if (
        window.SandboxTabLoaded ||
        (
            $('#UserProfileMasthead').length === 0 &&
            !mw.config.get('profileUserName')
        )
    ) {
        return;
    }
    window.SandboxTabLoaded = true;
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
            i18no.loadMessages('SandboxTab'),
            findContainer(),
            mw.loader.using('mediawiki.util')
        ).then(function(i18n, $container) {
            var username = mw.config.get('profileUserName') || $('#UserProfileMasthead h1').text(),
                title = 'User:' + username + '/' + i18n.inContentLang().msg('sandbox').plain();
            $container.append(
                $('<li>', {
                    'class': 'user-profile-navigation__link false',
                    'data-id': 'sandbox'
                }).append(
                    $('<a>', {
                        href: mw.util.getUrl(title) + '?preload=Template:Sandbox/preload-new-sandbox&redlink=1&action=edit',
                        title: title,
                        text: i18n.msg('sandbox').plain()
                    })
                )
            );
        });
    });
})();