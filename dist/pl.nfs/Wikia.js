window.mwapi = new mw.Api();

// Dodatkowa boczna sekcja
$( function () {
	var $module = $( '<section />', {
		id: 'newmodule',
		class: 'rail-module plainlinks'
	} ).appendTo( '#WikiaRail' );

	window.mwapi.get( {
		action: 'parse',
		text: '{{Boczna_sekcja}}'
	} ).done( function( d ) {
		if ( d.error ) return;
		$module.append( d.parse.text['*'] );
	} );
} );

// Interaktywne mapy
$( function () {
	var $map = $( '#imap-main' );

	if ( $map.length && $map.data( 'map' ) ) {
		window.mwapi.get( {
			action: 'query',
			meta: 'allmessages',
			ammessages: 'Custom-Maps'
		} ).done( function( d ) {
			if ( d.error || !d.query.allmessages[0] ) return;
			var maps = JSON.parse( d.query.allmessages[0]['*'] );

			if ( maps[$map.data( 'map' )] ) {
				$map.replaceWith(
					$( '<iframe>', {
						src: 'https://nfszone.pl/' + maps[$map.data( 'map' )],
						width: '100%',
						height: '600px',
						class: 'imap',
						id: 'imap-main'
					} )
				);
			}
		} );
	}
} );