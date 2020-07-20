/* [[Category:Wikipedia scripts]]
This script was given to me by ultradude25 of the Minecraft Wiki.
If adding this to your userspace, please provide attribution to the original author.
http://minecraftwiki.net/wiki/User:ultradude25/goToTop.js/ */
$( function() {
'use strict';


$( 'body' ).append( '<span id="to-top">▲ Go to top</span>' );
var $topButton = $( '#to-top' );

$topButton.css( {
	'color': '#000',
	'position': 'fixed',
	'bottom': '-30px',
	'left': '4px',
	'cursor': 'pointer',
	'transition': 'bottom 0.5s',
	'-webkit-transition': 'bottom 0.5s',
	'user-select': 'none',
	'-webkit-user-select': 'none',
	'-moz-user-select': 'none',
	'-ms-user-select': 'none'
} ).click( function() {
	$( 'html, body' ).animate( { scrollTop: 0 }, 'slow' );
} );

$( window ).scroll( function() {
	if ( $( window ).scrollTop() > 100 ) {
		$topButton.css( 'bottom', '4px' );
	} else {
		$topButton.css( 'bottom', '-30px' );
	}
} );


} );