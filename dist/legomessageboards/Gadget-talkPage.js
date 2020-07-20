$(document).ready(function() {
    $('.AccountNavigation .subnav>li:contains("Message Wall")').replaceWith('<li><a data-id="mytalk" href="/wiki/User:'+wgUserName+'/Talk">My talk</a></li>');
});