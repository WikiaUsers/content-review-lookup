/**
 * @title        animated counter
 * @description  animate a number from zero to its value
 * @author       clodaghelm
 * @source       clocachelm.fandom.com
 * @version      1.0.1
 * @license      CC-BY-SA-4.0
 */
 
$( function() {
	$( '.count-number' ).each( function() {
		$( this ).prop( 'Counter', 0 ).animate({
			Counter: $( this ).text().replace( /,/g, '' )
		}, {
			duration: 5000,
			easing: 'swing',
			step: function(now) {
				$( this ).text( Math.ceil(now).toLocaleString( 'en' ) );
			}
		});
	});
});