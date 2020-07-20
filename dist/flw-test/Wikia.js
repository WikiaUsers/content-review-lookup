/* Insert page header icons */

$('#PageHeader').prepend('<div id="header-icons"></div>');
$('#header-icons').append($('#canon'));

/* Remove image attribution as per new Wikia regulations */
$('.picture-attribution').remove();
 
/* Disabling "breadcrumb" tiered links for subpages in main namespace.
** Article titles there should be considered "flat", even if containing slashes.
** See: [[Memory Alpha talk:Subpages]]. By: [[User:Bobogoobo]]. */
$(function() {
    var $h2 = $('.WikiaPageHeader h2'), ismain = (mw.config.get('wgNamespaceNumber') === 0);
    if (ismain && $h2.children('a').length > 1) {
        $h2.html($h2[0].innerHTML.substring($h2[0].innerHTML.indexOf('|') + 1));
    } else if (ismain && $h2.text().indexOf('<') === 0) {
        $h2.remove();
    }
});

/* Move colored buttons */
$( function coloredButtons() {
	$( '.WikiaPageHeader' ).append( $( '#cButton' ) );
	$( '#cButton' ).css( { 'bottom' : '-2em', 'float' : 'right', 'margin-top' : '2px', 'position' : 'absolute', 'right' : '0' } ).show();
} );