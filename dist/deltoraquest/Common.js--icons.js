/* Adds icons to page header bottom border
 * by: [[User:The 888th Avatar]], adapted to new header by [[User:Thailog]] and [[User:Sophiedp]]
 */

$( function () {
    if ( $( '#icons' ).length ) {
        if ( mw.config.get( 'skin' ) == 'fandomdesktop' ) {
            $( '.page-header__actions' ).prepend( $( '#icons' ).show() );
        } else {
            $( '.page-header__contribution > div' ).first().append( $( '#icons' ).show() );
        }
    }
} );