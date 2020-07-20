/*
 * @name:           DifferentSkinEditor
 * @description:    Allows source mode editing in a different skin
 * @author:         Count of Howard (https://dev.fandom.com/wiki/User:Count_of_Howard)
 */
(function() {
    if ($('#DifferentSkinEditor').exists()) {
        return;
    }
    var URL = (window.location.href).replace(/#.*/, ''), 
        par = (window.location.search) ? '&' : '?',
        url = mw.config.get('wgArticlePath').replace('$1', 'edit/') + mw.config.get('wgPageName') + '/0?useskin=mercury';
    function init(i18n) {
        $('.UserProfileActionButton .WikiaMenuElement, .page-header__contribution-buttons .wds-list').append(
            $('<li>', { id: 'DifferentSkinEditor' }).append(
                $('<a>', {
                    href: url,
                    text: i18n.msg('mercury').plain()
                })
            )
        );
    }
    mw.hook('dev.i18n').add(function(i18n) {
        i18n.loadMessages('DifferentSkinEditor').then(init);
    });
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
})();