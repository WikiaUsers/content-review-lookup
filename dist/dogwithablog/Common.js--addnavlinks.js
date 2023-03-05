/* Any JavaScript here will be loaded for all users on every page load. */
/* Add "about us" and policies links to "On the Wiki" menu
* From RuneScape Wiki, modified by: [[User:Voltorb]]
 */

$(function() {
	if ( skin == 'oasis' && $.inArray("staff", wgUserGroups) == -1) {
		$('.WikiHeaderRestyle nav ul li.marked ul').prepend('<li><a class="subnav-2a" href="/wiki/Dog_With_A_Blog_Wiki:About">About us</a></li>');
		$('.WikiHeaderRestyle nav ul li.marked ul').append('<li><a class="subnav-2a" href="/wiki/Dog_With_A_Blog_Wiki:Policies">Policies</a></li>');
	}
});