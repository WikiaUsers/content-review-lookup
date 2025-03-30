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
    function awaitElement() {
        return new Promise(function(resolve) {
            const container = document.getElementById('user-tab__content');
            function callback() {
                const match = container.querySelector('ul.user-tab__list');
                if (match !== null) {
                    observer.disconnect();
                    resolve(match);
                }
            }
            const observer = new MutationObserver(callback);
            observer.observe(container, {
                childList: true,
                subtree: true
            });
            callback();
        });
    }
    mw.hook('dev.i18n').add(function(i18no) {
        $.when(
            i18no.loadMessages('SandboxLink'),
            awaitElement(),
            mw.loader.using('mediawiki.util')
        ).then(function(i18n, element) {
            var conf = mw.config.get([
                'wgFormattedNamespaces',
                'wgUserName'
            ]);
            $(element).append(
                $('<li>', {
                    class: 'user-tab__list-item',
                    dir: 'auto',
                    html: $('<a>', {
                        'class': 'wds-global-navigation__dropdown-link',
                        'data-label': 'account.sandbox',
                        href: mw.util.getUrl(conf.wgFormattedNamespaces[2] + ':' + conf.wgUserName + '/' + i18n.inContentLang().msg('sandbox-subpage').plain()),
                        text: i18n.msg('sandbox').plain()
                    }),
                    id: 'MySandbox'
                })
            );
        });
    });
})();