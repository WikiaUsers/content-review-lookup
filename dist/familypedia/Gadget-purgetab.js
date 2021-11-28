/* Purge caption button */
$( function() {
    if ( !$( '#ca-purge' ).length && wgIsArticle ) {
        addPortletLink(
            'p-cactions',
            wgArticlePath.replace( '$1', encodeURIComponent( wgPageName ) ) + '?action=purge',
            skin == 'vector' ? 'Purge' : '*',
            'ca-purge',
            'Purge the server cache of this page',
            '*'
        );
    }
});