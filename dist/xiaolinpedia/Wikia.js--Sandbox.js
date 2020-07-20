$(function() {
    var loc = window.location.href;
    var username = (wgTitle == "Contributions") ? loc.substring(loc.lastIndexOf("/")+1) : wgTitle;
    $('.tabs-container > ul.tabs').append('<li data-id="editcount"><a href="/wiki/User:' + username + '/Sandbox">Sandbox</a></li>');
});