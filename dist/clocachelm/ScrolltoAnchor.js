/**
 * @title        scroll to anchor
 * @description  smooth scrolling when clicking an anchor link
 * @author       clodaghelm
 * @source       clocachelm.fandom.com
 * @version      2.0.0
 * @license      CC-BY-SA-4.0
 */

$( function() {
	$( 'a[href^="#"]' ).click( function(event) {
			
		var id = $( $( this ).attr( 'href' ).replace( /[.]/g, '\\.' ) );
			
		var offset = 60;
			
		var target = $( id ).offset().top - offset;
			
		$( 'html, body' ).animate({
			scrollTop: target
		}, 1000, 'swing' );
		
        event.preventDefault();
	});
});