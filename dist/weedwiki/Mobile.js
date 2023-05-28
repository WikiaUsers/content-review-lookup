/* All JavaScript here will be loaded for users of the mobile site */

// Restore collapsible elements by loading the jQuery module for them. 

$( function (mw, $) {
	'use strict';

	mw.loader.using('jquery.makeCollapsible', function ( ) {
		$( '.mw-collapsible' ).makeCollapsible ( );
	} );
} (mediaWiki, jQuery) );