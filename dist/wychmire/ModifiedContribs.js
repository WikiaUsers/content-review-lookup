
/*
    Based off the ContribsLink code by User:KnazO and User:KockaAdmiralac. Modified to provide a link to Forge's coding page instead.
*/

(function() {
    if (window.CRefLinkLoaded) {
        return;
    }
    window.CRefLinkLoaded = true;
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
    mw.hook('dev.i18n').add(function(i18no) {
        i18no.loadMessages('cRefLink').then(function(i18n) {
            $('.wds-global-navigation__user-menu div:nth-child(2) ul li:nth-child(2)').after(
                $('<li>').append(
                    $('<a>', {
                        'data-id': 'codeReference',
                        'class': 'wds-global-navigation__dropdown-link',
                        href: mw.util.getUrl('Special:MyContributions'),
                        text: i18n.msg('cRef').plain()
                    })
                )
            );
        });
    });
})();