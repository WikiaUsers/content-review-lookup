/* Add purge action */
if ( !$( '#ca-purge' ).length ) {
	$( '#p-cactions' ).find( 'ul' ).append(
		$( '<li>' ).attr( 'id', 'ca-purge' ).addClass( 'collapsible' ).append(
			$( '<a>' ).attr( 'href', mw.util.getUrl( null, { action: 'purge' } ) ).text( 'Cache legen' )
		)
	);
} else if ( $( "#ca-purge a:contains('Purge')" ) ) { // Also replace "Purge" with "Cache legen"
	$( '#ca-purge a' ).text( "Cache legen" );
}

/* In certain circumstances, the menu "More" shows nothing. This is due to a
 * hidden Cargo purge button. If the menu only contains this, then hide it.
 */
if ( $( 'li#ca-cargo-purge' ).length == 1 && $( 'div#p-cactions div.menu ul li' ).length == 1 ) {
	$( 'div#p-cactions' ).addClass( 'emptyPortlet' );
}