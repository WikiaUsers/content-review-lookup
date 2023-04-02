/* Any JavaScript here will be loaded for all users on every page load. */
//* Coppied from Create Wiki - create.fandom.com/wiki/MediaWiki:Common.js

$( function() {

( function() {
	var $content = $( '#mw-content-text' );
	var advanceFrame = function( parentElem, parentSelector ) {
		var curFrame = parentElem.querySelector( parentSelector + ' > .animated-active' );
		$( curFrame ).removeClass( 'animated-active' );
		var $nextFrame = $( curFrame && curFrame.nextElementSibling || parentElem.firstElementChild );
		return $nextFrame.addClass( 'animated-active' );
	};
	
	// Set the name of the hidden property
	var hidden; 
	if ( typeof document.hidden !== 'undefined' ) {
		hidden = 'hidden';
	} else if ( typeof document.msHidden !== 'undefined' ) {
		hidden = 'msHidden';
	} else if ( typeof document.webkitHidden !== 'undefined' ) {
		hidden = 'webkitHidden';
	}
	
	setInterval( function() {
		if ( hidden && document[hidden] ) {
			return;
		}
		$content.find( '.animated' ).each( function() {
			if ( $( this ).hasClass( 'animated-paused' ) ) {
				return;
			}
			
			var $nextFrame = advanceFrame( this, '.animated' );
			if ( $nextFrame.hasClass( 'animated-subframe' ) ) {
				advanceFrame( $nextFrame[0], '.animated-subframe' );
			}
		} );
	}, 2000 );
}() );

/**
 * Pause animations on mouseover of a designated container (.animated-container and .mcui)
 *
 * This is so people have a chance to look at the image and click on pages they want to view.
 */
$( '#mw-content-text' ).on( 'mouseenter mouseleave', '.animated-container, .mcui', function( e ) {
	$( this ).find( '.animated' ).toggleClass( 'animated-paused', e.type === 'mouseenter' );
} );

// A work around to force wikia's lazy loading to fire
setTimeout(function(){
	$(".animated .lzy[onload]").load();
}, 1000);

} );
// Make alternating rows in sorted tables differnet color
var ts_alternate_row_colors = true;