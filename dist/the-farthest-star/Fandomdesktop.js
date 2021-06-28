/* Any JavaScript here will be loaded for all users on every page load. */

/* Adds icons to page header bottom border
 * from Avatar wiki by: [[User:The 888th Avatar]], adapted to new header by [[User:Thailog]] and [[User:Sophiedp]]
 */

$( function () {
    if ( $( '#articletype' ).length ) {
        if ( mw.config.get( 'skin' ) == 'fandomdesktop' ) {
            $( '.page-header__actions' ).prepend( $( '#articletype' ).show() );
        } else {
            $( '.page-header__categories-in' ).first().append( $( '#articletype' ).show() );
        }
    }
} );