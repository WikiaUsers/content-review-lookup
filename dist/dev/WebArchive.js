/**
 * WebArchive
 * @author Rail01
 */
(function() {
    var config = mw.config.get([
        'wgArticleId',
        'wgUserGroups'
    ]);
    if (
        config.wgArticleId === 0 ||
        config.wgUserGroups.indexOf( 'autoconfirmed' ) === -1 ||
        window.WebArchiveLoaded
    ) return;
    window.WebArchiveLoaded = true;

    function init(i18n) {
        $('<a>', {
            class: 'wds-button wds-is-secondary',
            id: 'WebArchiveLink',
            href: 'https://web.archive.org/save/' + window.location.href,
            target: ( !window.WebArchiveNewTab ? '_blank' : null ),
            text: i18n.msg( 'archive-text' ).plain(),
            title: i18n.msg( 'archive-title' ).plain()
        }).appendTo( '.page-header__contribution-buttons, .page-header__actions' );
    }

    mw.hook( 'dev.i18n' ).add(function(i18n) {
        i18n.loadMessages( 'WebArchive' ).then(init);
    });
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
})();