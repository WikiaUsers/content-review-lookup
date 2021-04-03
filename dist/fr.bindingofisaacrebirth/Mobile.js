mw.loader.using('mobile.site.styles');

$( function () {
	// Slideshows initialization
	var $slideshows = $( '.infobox-slideshow' ),
		anim = new Array( $slideshows.size() ).fill( 0 );
	$slideshows.each( function () {
		var maxHeight = 0,
			maxWidth  = 0;
		$( this )
			.find( '.slide' )
			.each( function () {
				maxHeight = Math.max( maxHeight, $( this ).height() );
				maxWidth  = Math.max( maxWidth , $( this ).width()  );
			} );
		$( this )
			.height( maxHeight )
			.width ( maxWidth  );
	} );

	// Slideshows loop
	setInterval( function () {
		$slideshows.each( function ( i, slideshow ) {
			var $slides = $( slideshow ).find( '.slide' );
			if ( $slides.length > 1 )
				if ( $( slideshow ).hasClass( 'infobox-slideshow-smooth' ) ) {
					$( $slides.get( anim[ i ] ) ).fadeOut( 'slow' );
					anim[ i ] = $slides.get( anim[ i ] + 1 ) ? anim[ i ] + 1 : 0;
					$( $slides.get( anim[ i ] ) ).fadeIn( 'slow' );
				} else {
					$( $slides.get( anim[ i ] ) ).fadeOut( 'slow' );
					anim[ i ] = $slides.get( anim[ i ] + 1 ) ? anim[ i ] + 1 : 0;
					$( $slides.get( anim[ i ] ) ).fadeIn( 'slow' );
				}
		} );
	}, 3000 );

	$( 'div.infobox > table > tr:not( .infobox-title ), div.infobox > table > * > tr:not( .infobox-title )' ).hide();
} );

$( 'div.infobox > table > tr.infobox-title, div.infobox > table > * > tr.infobox-title' ).click( function () {
	$( this ).nextAll().toggle();
} );