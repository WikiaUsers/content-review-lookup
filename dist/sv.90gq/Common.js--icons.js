/* Any JavaScript here will be loaded for all users on every page load. */
$( function IconsOasis() {
    if ( $( '#icons' ).length ) {
    	if ( mw.config.get( 'skin' ) == 'fandomdesktop' ) {
    		$( '.page-header__actions' ).first().append( $( '#icons' ).show() );
    	}
    }
} );