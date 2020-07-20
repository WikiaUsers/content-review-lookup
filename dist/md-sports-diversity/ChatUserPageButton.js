// ChatUserPageButton - Count of Howard
// 03-10-16 - Initial revision
// 12-10-16 - mw.config.get cleanup
// 18-11-16 - Revised to work with new updated icons
// 19-11-16 - Icon adaption; <li> link fix
// 14-12-16 - Fixed double loading problem
// 28-01-16 - General cleanup

$(function() {
    var config = mw.config.get([
        'wgArticlePath',
        'wgCanonicalSpecialPageName',
        'wgUserLanguage'
    ]);
    if (config.wgCanonicalSpecialPageName !== 'Chat' || $('#userpage').length > 0) {
        return;
    }
    var i18n = {
        en: 'User Page',
        be: 'Прафайл',
        de: 'Benutzerseite',
        es: 'Página de usuario',
        pl: 'Strona użytkownika',
        pt: 'Página de utilizador',
        'pt-br': 'Página de usuário',
        ru: 'Профайл',
        sr: 'Профил',
        'sr-el': 'Profil',
        uk: 'Профайл',
        sv: 'Användarsida'
    },
    alias = $.fn.show;
    
    $.fn.show = function() {
        alias.apply(this, arguments);
        $('.contribs')
            .clone()
            .addClass('userpage')
            .removeClass('contribs')
            .prependTo('.regular-actions');
        $('.userpage a').attr({
            id: 'userpage',
            target: '_blank',
            href: config.wgArticlePath
                .replace('$1', 'User:' + $('#UserStatsMenu .info ul .username')
                    .text()
                    .replace(/ /g, '_')
                )
        });
        if($('.userpage svg').exists()) {
            $('.userpage svg')[0].setAttribute('viewBox','0 0 24 24');
            $('.userpage path').attr('d', 'M12 14c3.309 0 6-2.691 6-6V6c0-3.309-2.691-6-6-6S6 2.691 6 6v2c0 3.309 2.691 6 6 6zm5 2H7c-3.86 0-7 3.14-7 7a1 1 0 0 0 1 1h22a1 1 0 0 0 1-1c0-3.86-3.14-7-7-7z');
            $('.userpage .label').text(i18n[config.wgUserLanguage] || i18n[config.wgUserLanguage.split('-')[0]] || i18n.en);
        }
    };
});