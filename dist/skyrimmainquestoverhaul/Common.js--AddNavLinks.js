/* Add "About", "Policies" and "Maintenance" to the "On the Wiki" navigation menu.
 * Found at Avatar Wiki, who got it from the Runescape Wiki.
 * Added by JibstaMan on 06-08-2012
 * Modified by JibstaMan on 22-03-2013 to account for layout changes.
 */
$(function() {
	if ( skin == 'oasis' && $.inArray("staff", wgUserGroups) == -1) {
		$('.WikiHeader nav ul li.marked ul').prepend('<li><a class="subnav-2a" href="/wiki/Skyrim_Main_Quest_Overhaul_Wiki:Policies_and_Guidelines">Policies</a></li>');
		$('.WikiHeader nav ul li.marked ul').prepend('<li><a class="subnav-2a" href="/wiki/Skyrim_Main_Quest_Overhaul_Wiki:About">About</a></li>');
		$('.WikiHeader nav ul li.marked ul').append('<li><a class="subnav-2a" href="/wiki/Skyrim_Main_Quest_Overhaul_Wiki:Maintenance">Maintenance</a></li>');
	}
});