//SandboxLink
/* Add a menu item to profile menu with link to user contributions in modernized UI */
(function() {
    if (window.SandboxLinkLoaded) {
        return;
    }
    window.SandboxLinkLoaded = true;
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
    mw.hook('dev.i18n').add(function(i18no) {
        $.when(
            i18no.loadMessages('SandboxLink'),
            mw.loader.using('mediawiki.util')
        ).then(function(i18n) {
            var conf = mw.config.get([
                'wgFormattedNamespaces',
                'wgUserName'
            ]);
            $('.wds-global-navigation__user-menu .wds-list').append(
                $('<li>', {
                    id: 'MySandbox'
                }).append(
                    $('<a>', {
                        'class': 'wds-global-navigation__dropdown-link',
                        href: mw.util.getUrl(conf.wgFormattedNamespaces[2] + ':' + conf.wgUserName + '/' + i18n.inContentLang().msg('sandbox-subpage').plain()),
                        text: i18n.msg('sandbox').plain()
                    })
                )
            );
        });
    });
})();