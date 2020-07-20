/* Any JavaScript here will be loaded for all users on every page load. */
$( function () {
    if ( !$( '#ca-purge' ).length && mw.config.get( 'wgIsArticle' ) ) {
        mw.util.addPortletLink(
            'p-cactions',
            mw.util.getUrl( mw.config.get( 'wgPageName' ) ) + '?action=purge', 'Purge',
            'ca-purge',
            'Purge the server cache of this page',
            '*'
        );
    }
});