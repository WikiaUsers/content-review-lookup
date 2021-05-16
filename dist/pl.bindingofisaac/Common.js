/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */
/* Portal */
mw.loader.using( ['jquery.ui.tabs'], function() {
	$( document ).ready( function() {
		var $tabs = $( '#portal_slider' ).tabs( {
			fx: {
				opacity: 'toggle',
				duration: 100
			}
		} );
		$( '[class^=portal_sliderlink]' ).click( function() { // bind click event to link
			$tabs.tabs( 'select', this.className.replace( 'portal_sliderlink_', '' ) );
			return false;
		} );
		$( '#portal_next' ).click( function() {
			$tabs.tabs( 'select', ( $tabs.tabs( 'option', 'selected' ) === ( $tabs.tabs('length' ) ) - 1 ) ? 0 : $tabs.tabs( 'option', 'selected' ) + 1 ); // switch to next tab
			return false;
		} );
		$( '#portal_prev' ).click( function() { // bind click event to link
			$tabs.tabs( 'select', ( $tabs.tabs( 'option', 'selected' ) === 0 ) ? ( $tabs.tabs( 'length' ) - 1 ) : $tabs.tabs( 'option', 'selected' ) - 1 ); // switch to previous tab
			return false;
		} );
	} );
} );