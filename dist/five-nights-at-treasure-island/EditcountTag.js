// <syntaxhighlight lang="javascript">
/**
 * EditcountTag.js
 *
 * Adds editcount tags to the masthead
 * @author: [[w:User:Fubuki風吹]]
 */

$(function() {
    var config = {
        skin: mw.config.get('skin'),
        lang: mw.config.get('wgContentLanguage'),
        nsid: mw.config.get('wgNamespaceNumber'),
        spname: mw.config.get('wgCanonicalSpecialPageName'),
        user: mw.config.get('wgUserName'),
        title: mw.config.get('wgTitle')
    }, css;
    var text = {
        // These translations are taken from xx.c.wikia.com/wiki/Special:Editcount
        // and are subject to inaccuracy. If you find something out of place,
        // feel free to correct it
        de: 'Beitragszähler',
        en: 'Editcount',
        es: 'Cuenta de Ediciones',
        fr: 'Compteur de modifications',
        it: 'Editcount',
        nl: 'Bewerkingsteller'
    };
    text = text[config.lang] || text.en;
    if ([2, 3, 500, -1].indexOf(config.nsid) !== -1) {
        var user = config.title;
        switch (config.spname) {
            case 'Contributions':
                user = config.title.split('/')[1];
                break;
            case 'Following':
                user = config.username;
                break;
        }
        switch (config.skin) {
            case 'oasis':
                css = {
                    float: 'right',
                    color: 'inherit',
                    marginTop: '5px',
                    marginRight: '-15px'
                };
                $('<a>', {
                    class: 'tag',
                    href: '/wiki/Special:Editcount/' + user
                }).text(text).css(css).appendTo('.UserProfileMasthead hgroup');
                break;
            case 'monobook':
                css = {
                    float: 'right',
                    fontSize: '13px'
                }
                $('<a>', {
                    href: '/wiki/Special:Editcount/' + user
                }).text('[' + text + ']').css(css).appendTo('#column-content .firstHeading');
                break;
        }
    }
});
// </syntaxhighlight>