/* Adds "Browse" to "On the Wiki" menu
 * From RuneScape Wiki, modified by: [[User:The 888th Avatar]] of Avatar Wiki
 */

$(function() {
	if ( skin == 'oasis' && $.inArray("staff", wgUserGroups) == -1) {
		$('.WikiHeader nav ul li.marked ul').prepend('<li><a class="subnav-2a" href="/wiki/Sam_and_Cat_Wiki:Browse">Browse</a></li>');
	}
});