/* Adds icons to page header bottom border
 * by the founder of the Avatar Wiki
 */
 
$(function() {
	if (skin == "oasis" || skin == "wikia") {
		$('.WikiaPageHeader').append($('#icons'));
		$('#icons').css({'position' : 'absolute', 'right' : '0', 'bottom' : '-1.5em'});
	}
});