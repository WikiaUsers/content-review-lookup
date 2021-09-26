//##############################################################
/* ==Element animator== (B00)*/
// Taken from https://minecraft.gamepedia.com/MediaWiki:Gadget-site.js
/**
 * Element animator
 *
 * Cycles through a set of elements (or "frames") on a 2 second timer per frame
 * Add the "animated" class to the frame containing the elements to animate.
 * Optionally, add the "animated-active" class to the frame to display first.
 * Optionally, add the "animated-subframe" class to a frame, and the
 * "animated-active" class to a subframe within, in order to designate a set of
 * subframes which will only be cycled every time the parent frame is displayed.
 * Animations with the "animated-paused" class will be skipped each interval.
 *
 * Requires some styling in wiki's CSS.
 */

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
$( '#mw-content-text' ).on( 'mouseenter mouseleave', '.pw-infobox', function( e ) {
	$( this ).find( '.animated' ).toggleClass( 'animated-paused', e.type === 'mouseenter' );
} );

// A work around to force wikia's lazy loading to fire
setTimeout(function(){
    $(".animated .lzy[onload]").load();
}, 1000);

} );

importArticles({
    type: 'script',
    articles: [
        "MediaWiki:Common.js/minetip.js",
        "MediaWiki:Common.js/ui.js",
    ]
});