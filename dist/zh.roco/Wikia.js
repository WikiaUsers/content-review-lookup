$(function() {
    var loc = window.location.href;
    var username = (wgTitle == "Contributions") ? loc.substring(loc.lastIndexOf("/")+1) : wgTitle;
    $('.tabs-container > ul.tabs').append('<li data-id="profile"><a href="/wiki/User:' + username + '/我的宠物">我的宠物</a></li>');
});