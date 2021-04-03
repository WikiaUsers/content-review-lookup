/* Any JavaScript here will be loaded for users using the mobile site */

/**
 * Keep tooltips going off the side of the page
 */
$( '#mw-content-text' ).on( {
	mouseenter: function() {
		var $tooltipContainer = $( this );
		var $tooltip = $tooltipContainer.find( '.tooltipin' );
		// Make sure it's on the page so it's not being squished
		// before getting width
		$tooltip.css( 'right', 0 );
		var tooltipWidth = $tooltip.outerWidth();
		$tooltip.css( 'right', '' );
		
		if ( $tooltip.offset().left + tooltipWidth > $( window ).width() ) {
			$tooltip.css(
				'margin-left',
				-( tooltipWidth - $tooltipContainer.width() - 1 )
			);
		}
	},
	mouseleave: function() {
		$( this ).find( '.tooltipin' ).css( 'margin-left', '' );
	}
}, '.tooltip' );