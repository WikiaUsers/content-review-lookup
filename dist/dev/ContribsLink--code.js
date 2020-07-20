/**
 * Adds a link to your contributions on the user drop-down menu on the top right
 * @author Ozank Cx
 */
(function() {
    var user = mw.config.get('wgUserName');
    if (
        window.ContribsLinkLoaded ||
        window.isBlogLinkLoaded ||
        user === null
    ) {
        return;
    }
    window.ContribsLinkLoaded = true;
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
    function init (i18n) {
        $('.wds-global-navigation__user-menu > div:nth-child(2) > ul > li > a[data-tracking-label="account.preferences"]').parent().before(
            $('<li>').append(
                $('<a>', {
                    'data-id': 'contributions',
                    'class': 'wds-global-navigation__dropdown-link',
                    href: 
                        mw.util.getUrl(
                            'Special:Contributions/' +
                            user
                        ),
                    text: i18n.msg('contribs').plain()
                })
            )
        );
    }
    mw.hook('dev.i18n').add(function(i18n) {
        i18n.loadMessages('ContribsLink').then(init);
    });
})();