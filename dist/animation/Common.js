/* Any JavaScript here will be loaded for all users on every page load. */

/* For [[Template:Icons]] */
// Copied from https://avatar.wikia.com/wiki/MediaWiki:Common.js/icons.js
$( function () {
    if ( $( '#icons' ).length ) {
        if ( mw.config.get( 'skin' ) == 'fandomdesktop' ) {
            $( '.page-header__actions' ).prepend( $( '#icons' ).show() );
        } else {
            $( '.page-header__contribution > div' ).first().append( $( '#icons' ).show() );
        }
    }
} );