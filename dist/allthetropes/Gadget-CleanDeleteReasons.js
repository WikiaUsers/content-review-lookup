// Written and maintained by [[User:Mike.lifeguard]]
jQuery( document ).ready( function() {
	if ( wgAction == 'delete' ) {
		var wpReason = document.getElementById( 'wpReason' );
		if ( !wpReason ) {
			return;
		}
		var regexp = /(content was|page was empty|content before blanking was)/i;
		if ( regexp.test( wpReason.value ) ) {
			wpReason.value = '';
		}
	}
} );