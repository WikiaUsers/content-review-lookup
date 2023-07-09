/**
 * Scripts placed here are loaded on both desktop and mobile views.
 * 
 * Desktop-only scripts should go in [[MediaWiki:Common.js]]
 * Mobile-only scripts should go in [[MediaWiki:FandomMobile.js]].
 */

mw.hook( 'wikipage.content' ).add( function( $wikipageContent ) {
	'use strict';
	
	/**
	 * Set minimum height for animations to prevent moving the page if the frames
	 * differ in height
	 */
	// Set frames to be visible for measuring height
	var $animated = $wikipageContent.find( '.animated' ).addClass( 'animated-visible' );
	
	// Group frames per animation
	var animateds = [];
	$animated.each( function() {
		animateds.push( {
			$: $( this ).find( '> .animated-subframe' ).addBack()
				.find( '> *:not(.animated-subframe)' ),
		} );
	} );
	
	// Get highest frame for each animation (if heights differ)
	$.each( animateds, function() {
		var minHeight = 0, differentHeights;
		this.$.each( function() {
			var height = this.offsetHeight;
			differentHeights = differentHeights || minHeight && height !== minHeight;
			minHeight = Math.max( height, minHeight );
		} );
		
		if ( differentHeights ) {
			this.height = minHeight;
		}
	} );
	
	// Set animation to be at least as tall as the tallest frame,
	// and set the non-active frames to be hidden again
	$animated.each( function( i ) {
		$( this ).css( 'min-height', animateds[i].height );
	} ).removeClass( 'animated-visible' );

	
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
	 * Requires some styling from [[MediaWiki:Styles.css]].
	 */
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
		$wikipageContent.find( '.animated' ).each( function() {
			if ( $( this ).hasClass( 'animated-paused' ) ) {
				return;
			}
			
			var $nextFrame = advanceFrame( this, '.animated' );
			if ( $nextFrame.hasClass( 'animated-subframe' ) ) {
				advanceFrame( $nextFrame[0], '.animated-subframe' );
			}
		} );
	}, 2000 );
} );