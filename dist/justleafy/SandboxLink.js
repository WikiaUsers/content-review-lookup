//SandboxLink
/* Add a menu item to profile menu with link to user contributions in modernized UI */
(function() {
    if (window.SandboxLinkLoaded) {
        return;
    }
    window.SandboxLinkLoaded = true;
    var conf = mw.config.get([
        'wgContentLanguage',
        'wgFormattedNamespaces',
        'wgUserLanguage',
        'wgUserName'
    ]),
    i18n = {
        en: 'My Sandbox'
    };
    i18n = i18n[conf.wgUserLanguage] ||
           i18n[conf.wgUserLanguage.split('-')[0]] ||
           i18n[conf.wgContentLanguage] ||
           i18n[conf.wgContentLanguage.split('-')[0]] ||
           i18n.en;
    $('.wds-global-navigation__user-menu .wds-list').append(
        $('<li>', {
            id: 'MySandbox'
        }).append(
            $('<a>', {
                'class': 'wds-global-navigation__dropdown-link',
                href: mw.util.getUrl(conf.wgFormattedNamespaces[2] + ':' + conf.wgUserName + '/Sandbox'),
                text: i18n
            })
        )
    );
})();