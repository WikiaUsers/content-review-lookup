/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */

$.when( mw.loader.using( 'mediawiki.api' ), $.ready ).then( function () {

	// Cache purge shortcut
	var purgeUrl = $( '#ca-cargo-purge > a' ).attr( 'href' );
	$( '#ca-cargo-purge' ).remove();
	$( '#p-views > ul' ).append( '<li></li>' );
	$( '#p-views > ul > li:not( [id] )' ).attr( 'id', 'ca-cargo-purge' );
	$( '#ca-cargo-purge' ).append( '<span><a>⟳</a></span>' );
	$( '#ca-cargo-purge > span > a' )
		.attr( {
			title    : 'Purge the cache [alt-shift-g]',
			href     : purgeUrl,
			accesskey: 'g'
		} )
		.css( { 'line-height': 0, 'font-size': 'large' } );

	// Link titles
	$( '.notitle a' ).attr( 'title', '' );

	// Slideshows
	loadSlideshows( $( '.mw-parser-output' ), 2500 );

	// Infoboxes TEST
	var $infoboxes = $( '.infobox2' ).filter( function () {
		var height = $( this ).height();
		return !!height && height >= 700;
	} );
	if ( !$infoboxes.length ) {
		return;
	}

	var $parserOutput = $( '.mw-parser-output' ).first();

	function onResize() {
		var width = $parserOutput.width();
		if ( !width || width < 1000 ) {
			$infoboxes.removeClass( 'infobox2-compact' );
		} else {
			$infoboxes.addClass( 'infobox2-compact' );
		}
	}

	onResize();
	$( window ).resize( onResize );
} );

function loadSlideshows( $container, timeout ) {
	$container.find( '.infobox-slideshow' ).each( function () {
		var $slideshow = $( this ),
			$slides    = $slideshow.children();
		if ( $slides.length < 2 ) {
			$slideshow.removeClass( 'infobox-slideshow' );
			$slides.children().unwrap();
			return;
		}
	
		(function interval() {
			setTimeout( interval, timeout );
			$slideshow.append( $slideshow.children().first() );
		})();
	} );
}