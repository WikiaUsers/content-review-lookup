// Gadżet
require( ['wikia.window', 'wikia.browserDetect'], function( window, browserDetect ) {
	if ( window.ResponsiveMobileLoaded || !browserDetect.isMobile() ) return;
	window.ResponsiveMobileLoaded = true;

	var meta = document.createElement( 'meta' );

	meta.name = 'viewport';
	meta.content = 'width=device-width, initial-scale=1';

	document.head.appendChild( meta );
} );