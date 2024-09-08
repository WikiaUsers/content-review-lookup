/* Add "about us" to "On the Wiki" menu
 * From RuneScape Wiki, modified by: [[User:Grey Lurker]]
 */
 
$(document).ready(function() {
    if ( skin == 'oasis' && $.inArray("staff", wgUserGroups) == -1) {
        $('.WikiHeader nav ul li.marked ul').prepend('<li><a class="subnav-2a" href="/wiki/Kämpfer_HQ_Wiki:About">About Us</a></li>');
    if ( skin == 'oasis' && $.inArray("staff", wgUserGroups) == -1) {
        $('.WikiHeader nav ul li.marked ul').prepend('<li><a class="subnav-2a" href="/wiki/Kämpfer_HQ_Wiki:Manual_of_Style">Manual of Style</a></li>');
    }
});