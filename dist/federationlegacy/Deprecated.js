/**
 * The place to put any JavaScript that has been deprecated but may
 *  be used again at some point.
 */

/* Code for multi-button */

$( function coloredButtons() {
	$( '.WikiaPageHeader' ).append( $( '#multi-button' ) );
	$( '#multi-button' ).css( { 'bottom' : '-2em', 'float' : 'right', 'margin-top' : '2px', 'position' : 'absolute', 'right' : '0' } ).show();
} );

/* Remove image attribution as per new Wikia regulations */

$('.picture-attribution').remove();