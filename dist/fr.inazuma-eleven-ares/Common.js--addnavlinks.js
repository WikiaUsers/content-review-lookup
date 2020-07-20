
$(document).ready(function() {
    if ( skin == 'oasis' && $.inArray("staff", wgUserGroups) == -1) {
        $('.WikiHeader nav ul li.marked ul').prepend('<li><a class="subnav-2a" href="/wiki/Inazume_Eleven:Administrateurs">Administrateurs</a></li>');
        $('.WikiHeader nav ul li.marked ul').append('<li><a class="subnav-2a" href="/wiki/Project:CVU">CVU</a></li>');