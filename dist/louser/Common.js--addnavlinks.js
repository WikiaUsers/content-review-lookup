/* Add "about us" and IRC links to "On the Wiki" menu
 * From RuneScape Wiki, modified by: [[User:The 888th Avatar]], IRC addition by [[User:Thailog]]
 */

$(document).ready(function() {
    if ( skin == 'oasis' && $.inArray("staff", wgUserGroups) == -1) {
        $('.WikiHeader nav ul li.marked ul').prepend('<li><a class="subnav-2a" href="/wiki/Project:About">About us</a></li>');
    }
});