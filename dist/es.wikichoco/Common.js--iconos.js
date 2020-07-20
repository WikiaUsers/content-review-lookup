/* Adds icons to page header bottom border
 * by: [[Usuario:El Sabio del Fuego]]
 */

$(function() {
	if (skin == "oasis" || skin == "wikia") {
		$('.WikiaPageHeader').append($('#iconos'));
		$('#iconos').css({'position' : 'absolute', 'right' : '0', 'bottom' : '-1.2em'});
	}
});