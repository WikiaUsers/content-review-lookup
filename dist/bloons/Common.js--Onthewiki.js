/* Any JavaScript here will be loaded for all users on every page load. */

// Adding links to On the Wiki tab - From Runescape Wiki

$(document).ready(function() {
    if ( skin == 'oasis' && $.inArray("staff", wgUserGroups) == -1) {
        $('.WikiHeaderRestyle nav ul li.marked ul').prepend('<li><a class="subnav-2a" href="/wiki/Bloons Wiki:Policies">Our Policies</a></li>');
    }
});