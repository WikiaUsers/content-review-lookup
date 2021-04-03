if ( !$( '#ca-purge' ).length ) {
	$( '#p-cactions' ).find( 'ul' ).append(
		$( '<li>' ).attr( 'id', 'ca-purge' ).append(
			$( '<a>' ).attr( 'href', mw.util.getUrl( null, { action: 'purge' } ) ).text( 'Purge' )
		)
	);
}