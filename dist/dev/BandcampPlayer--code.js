mw.hook('wikipage.content').add(function($content) {
	var $bandcamp = $content.find( '.bandcamp:not(.loaded)' );
    if ( !$bandcamp.length ) return;
 
	$bandcamp.each( function() {
		var elem = $( this );
 
		var width = elem.attr( 'data-width' ),
			height = elem.attr( 'data-height' ),
			data_src = elem.attr( 'data-src' );
 
		if ( !/^https?:\/\/bandcamp\.com\//.test( data_src ) ) return;
		elem.empty();
		var is_px = [ true, true ]; // width, height
 
		if ( /%/.test( width ) || !/\d+/.test( width ) ) is_px[ 0 ] = false;
		if ( /%/.test( height ) ) is_px[ 1 ] = false;

		var frame_width = parseFloat( width, 10 ) || 100;
			frame_height = height ? ( parseFloat( height, 10 ) || 'auto' ) : '';
 
		$( '<iframe />', {
			style: 'border: 0',
			width: frame_width + ( is_px[ 0 ] ? 'px' : '%' ),
			height: frame_height + ( frame_height ? ( is_px[ 1 ] ? 'px': '%' ) : '' ),
			src: data_src
		}).appendTo( elem );
            elem.addClass( 'loaded' );
	});
});