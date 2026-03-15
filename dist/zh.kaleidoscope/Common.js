/* 这里的任何JavaScript将为所有用户在每次页面加载时加载。 */
/**
 * Animated Site Announcement
 * 
 * To show mutiple announcements. 
 */
( function() {
	var $content = $( '#localNotice' );
	var advanceFrame = function( parentElem, parentSelector ) {
		var curFrame = parentElem.querySelector( parentSelector + ' > .animated-active' );
		$( curFrame ).removeClass( 'animated-active' );
		var $nextFrame = $( curFrame && curFrame.nextElementSibling || parentElem.firstElementChild );
		return $nextFrame.addClass( 'animated-active' );
	};
	setInterval( function() {
		$content.find( '.animated' ).each( function() {
			var $nextFrame = advanceFrame( this, '.animated' );
			if ( $nextFrame.hasClass( 'animated-subframe' ) ) {
				advanceFrame( $nextFrame[0], '.animated-subframe' );
			}
		} );
	}, 2000 );
}() );