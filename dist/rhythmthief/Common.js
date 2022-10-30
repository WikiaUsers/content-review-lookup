/* Any JavaScript here will be loaded for all users on every page load. */
/** Show/hide for toggling chart rows, borrowed from the Star Wars wiki **/
$( function () {
	if( !$( '.chart-toggles' ).length ) {
		return;
	}
	$( '.chart-toggles' ).find( 'td > a' ).click( function () {
		var	hideBtnClass = $( this ).parent().attr( 'class' ),
			$hideContent = $( 'tr.' + hideBtnClass );
		if( !$hideContent.length ) {
			return;
		}
		$hideContent.toggle($(this).text().includes('show'));
		if ( $( this ).text().indexOf( 'hide' ) >= 1 ) {
			$( this ).text( $( this ).text().replace( 'hide', 'show' ) );
		} else {
			$( this ).text( $( this ).text().replace( 'show', 'hide' ) );
		}
	} );
} );