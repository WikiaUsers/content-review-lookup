/* Add "About Us" to the "On the Wiki" menu
 * Obtained from Avatar Wiki @ w:c:avatar with modifications by [[User:The 888th Avatar]]
 * Originally from RuneScape Wiki @ w:c:runescape
 */

$(document).ready(function() {
    if ( skin == 'oasis' && $.inArray("staff", wgUserGroups) == -1) {
        $('.WikiHeader nav ul li.marked ul').prepend('<li><a class="subnav-2a" href="/wiki/Kung_Fu_Panda_Wiki:About">About Us</a></li>');
    }
});