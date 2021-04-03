// jshint jquery:true, esversion:5
/* globals require, module, mediaWiki, mw, OO */
'use strict';

$( function() {
	var action = mw.config.get( 'wgAction' );
	if ( action === 'edit' || action === 'submit' ) {
		$( '#wpPreview, #wpDiff' ).on( 'click', function( e ) {
			if ( e.shiftKey ) {
				e.stopPropagation();
			}
		} );
	}
} );