/* Any JavaScript here will be loaded for all users on every page load. */

/**
 * Element animator
 *
 * Will cycle the active class on any child elements
 * within an element with the animated class.
 */
( function() {
	if ( !mcw.animate ) {
		mcw.animate = setInterval( function() {
			$( '.animated' ).each( function() {
				var $elem = $( this );
				var $current = $elem.children( '.active' );
				var $next = $current.nextAll( ':not(.skip):first' );
				// Loop back to the start
				if ( !$next.length ) {
					$next = $elem.children( ':not(.skip):first' );
				}
				$current.removeClass( 'active' );
				$next.addClass( 'active' );
			} );
		}, 2000 );
	}
}() );



/**
 * Pause grid GUI templates (e.g. [[Template:Grid/Crafting Table]]) on mouseover
 *
 * This is so people have a chance to look at each image on the cell
 * and click on pages they want to view.
 */
$( '#mw-content-text' ).on( {
	'mouseenter': function() { 
		$( this ).find( '.animated' ).removeClass( 'animated' ).addClass( 'paused' );
	},
	'mouseleave': function() {
		$( this ).find( '.paused' ).removeClass( 'paused' ).addClass( 'animated' );
	}
}, '.grid-generic, .grid-Crafting_Table, .grid-Furnace, .grid-Brewing_Stand' )