/**
 * Custom ResourceLoader module providing hook to make other scripts
 * dependant on the right rail and load after it is loaded.
 *
 * @author Rail
 */
mw.loader.implement( 'custom.righRailHook', function() {
	// Rail won't be loaded – return null
	if ( !document.querySelector( '.page__right-rail' ) ) {
		return;
	}

	// Delay is 150ms
	const intervalDelay = 150;

	// Register interval checking for rail being loaded
	const rightRailInterval = setInterval( function() {
		// Rail has been loaded
		if ( !!document.querySelector( '.sticky-modules-wrapper' ) ) {
			// Remove interval
			clearInterval( rightRailInterval );

			// Fire the hook
			mw.hook( 'custom.rightRail.loaded' ).fire(
				// Callback with rail contents
				document.querySelector( '.right-rail-wrapper' )
			);
		}
	}, intervalDelay );
} );