/* Add "about us" and IRC links to "On the Wiki" menu
 * From Avatar Wiki, modified by PerryH
 */
 
$(function() {
	if ( skin == 'oasis' && $.inArray("staff", wgUserGroups) == -1) {
		$('.WikiHeaderRestyle nav ul li.marked ul').prepend('<li><a class="subnav-2a" href="/wiki/Spezial:Mostvisitedpages/latest">Beliebte Seiten</a></li>');
		$('.WikiHeaderRestyle nav ul li.marked ul').append('<li><a class="subnav-2a" href="/wiki/Top_Fun_Wiki:About">Über uns</a></li>');
	}
});