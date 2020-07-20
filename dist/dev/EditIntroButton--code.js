/*
 * Adds a button next to the regular edit button which acts as a "section edit" button for the intro
 * Written by Grunny (https://www.wikia.com/wiki/User:Grunny)
 *
 */
(function() {
    if (
        mw.config.get('wgNamespaceNumber') === -1 ||
        window.EditIntroButtonLoaded
    ) {
        return;
    }
    window.EditIntroButtonLoaded = true;
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
    mw.hook('dev.i18n').add(function(i18no) {
        i18no.loadMessages('EditIntroButton').then(function(i18n) { 
            var text = window.EditIntroButtonText ||
                       i18n.msg('text').plain();
            $(
                '.UserProfileActionButton > .wikia-menu-button > ul,' +
                '.page-header__contribution-buttons .wds-list'
            ).first().append(
                $('<li>', {
                    id: 'ca-intro'
                }).append(
                    $('<a>', {
                        href: '?action=edit&section=0',
                        title: text,
                        text: text
                    })
                )
            );
        });
    });
})();