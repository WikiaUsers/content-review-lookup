/**
 * Dodaje hook wykonywany po załadowaniu prawego panelu
 * Potrzebny do skryptów osadzanych w treści prawego panelu wiki
 */
;( function() {
	// Prawy panel nie istnieje, zakończ
	if (
		!document.querySelector( '.page__right-rail' ) ||
		window.rightRailHookLoaded
	) {
		return;
	}
	window.rightRailHookLoaded = true;

	// Opóźnienie wynosi (domyślnie) 100ms
	const intervalDelay = ( window.rightRailHookInterval || 100 );

	// Zarejestruj interwał nasłuchujący istnienia panelu
	const rightRailInterval = setInterval( function() {
		// Panel został załadowany
		if ( !!document.querySelector( '.sticky-modules-wrapper' ) ) {
			// Usuń interwał
			clearInterval( rightRailInterval );

			// Wykonaj hook
			mw.hook( 'custom.rightRail.loaded' ).fire(
				// Zwróć callback z zawartością panelu
				document.querySelector( '.right-rail-wrapper' )
			);
		}
	}, intervalDelay );
} )();