/* Any JavaScript here will be loaded for all users on every page load. */
/* Adds icons to page header bottom border
 * by: [[User:The 888th Avatar]]
 */
 
$(function() {
	if (skin == "oasis" || skin == "wikia") {
		$('.WikiaPageHeader').append($('#icons'));
		$('#icons').css({'position' : 'absolute', 'right' : '0', 'bottom' : '-1.2em'});
	}
});