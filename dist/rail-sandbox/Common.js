// Test hook for right rail. This is so stupid i have to code this myself.
mw.loader.implement( 'custom.righRailHook', function() {
	// Rail is not present, don't check for it every 150ms
	if ( !document.querySelector( '.page__right-rail' ) ) {
		return;
	}

	const rightRailInterval = setInterval( function() {
		if ( !!document.querySelector( '.sticky-modules-wrapper' ) ) {
			clearInterval( rightRailInterval );
			mw.hook( 'custom.rightRail.loaded' ).fire(
				document.querySelector( '.right-rail-wrapper' )
			);
		}
	}, 150 );
} );

mw.loader.implement( 'custom.testModule', function() {
	mw.custom.testFunctionFromModule = function( text ) {
		alert( text );
	};
} );