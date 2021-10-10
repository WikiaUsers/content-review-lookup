// Automatycznie aktywuj film na stronie głównej
( function() {
	if ( mw.config.get( 'wgArticleId' ) !== 14 || window.mpVideoActivated ) {
		return;
	}
	window.mpVideoActivated = true;
	
	const checkInterval = setInterval( function() {
		if ( !!document.querySelector( '#mp-featured .video > .lazyloaded' ) ) {
			document.querySelector( '#mp-featured .video > .lazyloaded' ).click();
			clearInterval( checkInterval );
		}
	}, 300 );
} )();