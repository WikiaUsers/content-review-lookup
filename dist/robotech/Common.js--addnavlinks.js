/* Any JavaScript here will be loaded for all users on every page load. */

/* Add "about us" and IRC links to "On the Wiki" menu
 * From RuneScape Wiki, modified by: [[User:Grey Lurker]]
 */

$(document).ready(function() {
    if ( skin == 'oasis' && $.inArray("staff", wgUserGroups) == -1) {
        $('.WikiHeader nav ul li.marked ul').prepend('<li><a class="subnav-2a" href="/wiki/Robotech_Saga_Wiki:About">About Us</a></li>');
/*        $('.WikiHeader nav ul li.marked ul').append('<li><a class="subnav-2a" href="/wiki/Avatar_Wiki:IRC_access">Chat</a></li>');*/
    }
});