/**
 * Description: Lazy-load mediawiki.ui.button module when .mw-ui-button is present
 * Maintainers: [[User:Edokter]]
 */
mw.hook( 'wikipage.content' ).add( function() {
    if ( mw.loader.getState( 'mediawiki.ui.button' ) === 'registered' && $( '.mw-ui-button' ).length ) {
        mw.loader.load( 'mediawiki.ui.button' );
    }
} );