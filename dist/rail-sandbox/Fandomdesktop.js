mw.loader.using( 'custom.righRailHook', function() {
	mw.hook( 'custom.rightRail.loaded' ).add( function( $rail ) {
		console.log( 'Code from Fandomdesktop.js ececuted via "custom.righRailHook" module' );
	} );
} );