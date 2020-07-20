/* Add "about us" and Forums links to "On the Wiki" menu
 * From RuneScape Wiki, modified by: [[User:The 888th Avatar]], Forums addition by [[User:Regular Guy]]
 */

$(function() {
	if ( skin == 'oasis' && $.inArray("staff", wgUserGroups) == -1) {
		$('.WikiHeaderRestyle nav ul li.marked ul').prepend('<li><a class="subnav-2a" href="/wiki/FusionFall_Wiki:About">About us</a></li>');
		$('.WikiHeaderRestyle nav ul li.marked ul').append('<li><a class="subnav-2a" href="/wiki/FusionFall_Wiki:Community_Forum">Forums</a></li>');
	}
});