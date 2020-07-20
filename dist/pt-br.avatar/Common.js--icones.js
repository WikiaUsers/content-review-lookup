/* Adds icons to page header bottom border
 * by: [[w:c:avatar:User:The 888th Avatar]]
 */
 
$(function() {
	if (skin == "oasis" || skin == "wikia") {
		$('.WikiaPageHeader').append($('#icones'));
		$('#icones').css({'position' : 'absolute', 'right' : '0', 'bottom' : '2.4em'});
	}
});