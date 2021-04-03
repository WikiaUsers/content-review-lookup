$( function() {
	'use strict';
	
	var action = mw.config.get( 'wgAction' );
	if ( action === 'edit' || action === 'submit' ) {
		$( '#wpPreview, #wpDiff' ).on( 'click', function( e ) {
			if ( e.shiftKey ) {
				e.stopPropagation();
			}
		} );
	}
} );