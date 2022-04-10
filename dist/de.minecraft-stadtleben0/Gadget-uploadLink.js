$( function() {
	$( 'a.new[href^="/index.php?title=Datei:"]' ).each( function( i, e ) {
		var t = $( e ).attr( 'href' ).match( /\/index.php\?title=Datei:(.*)&action=edit&redlink=1/ )[1];
		$( e ).after(
			$( '<span>' ).append(
				' (', $( '<a>', { href: '/index.php?title=Spezial:Hochladen&wpDestFile=' + t } ).html( 'Hochladen' ), ')'
			)
		);
	} );
} );