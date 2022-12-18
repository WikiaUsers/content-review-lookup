/* <nowiki> */
 
/**
 * Open external links in a new tab/window
 * Source: http://en.wikipedia.org/wiki/MediaWiki:Gadget-exlinks.js
 */

$( function() {
	var $alinks = mw.util.$content.find( 'a' );
	$alinks.each( function() {
		var $tablink = $( this );
		if ( $tablink.is( '.external, .extiw' ) && $tablink.attr( 'href' ).indexOf( mw.config.get( 'wgServer' ) ) !== 0 ) {
			$tablink.attr( 'target', '_blank' );
		}
	});
});

/* </nowiki> */