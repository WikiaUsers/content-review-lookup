mw.hook( 'wikipage.content' ).add( function ( $content ) {
	var images = $( "img[src*='/scale-to-width-down/']" );
	for ( var i = 0; i < images.length; i++ ) {
		var src = images[i].src;
		src = src.replace( /\/scale-to-width-down\/[0-9]*/, "" );
		images[i].src = src;
	}
} );