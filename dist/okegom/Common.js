/*For [[Template:Icons]] */
/* Code taken from the MLB and Avatar wiki */ /* https://miraculousladybug.fandom.com/wiki/Miraculous_Ladybug_Wiki https://avatar.fandom.com/wiki/Avatar_Wiki*/
$( function () {
    if ( $( '#icons' ).length ) {
        if ( mw.config.get( 'skin' ) == 'fandomdesktop' ) {
            $( '.page-header__actions' ).prepend( $( '#icons' ).show() );
        } else {
            $( '.page-header__contribution > div' ).first().append( $( '#icons' ).show() );
        }
    }
} );

/* Modernize the BackToTop button */
window.BackToTopModern = true;