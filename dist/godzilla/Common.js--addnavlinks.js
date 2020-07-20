/* Add "about us" link to "On Wikizilla" menu
 * From RuneScape Wiki, modified by: [[User:The 888th Avatar]] and Rappy
 */

$(function() {
    if (skin == 'oasis') {
        $('.WikiHeader nav ul li.marked ul').append('<li><a class="subnav-2a" href="/wiki/Wikizilla:About">About</a></li>');
    }
});