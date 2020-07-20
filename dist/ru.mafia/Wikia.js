// Добавляет ссылку на личную песочницу
 
$(function() {
    var loc = window.location.href;
    var username = (wgTitle == "Contributions") ? mw.html.escape(loc.substring(loc.lastIndexOf("/")+1)) : mw.html.escape(wgTitle);
    $('.tabs-container > ul.tabs').append('<li data-id="Полигон"><a href="/wiki/User:' + username + '/Полигон">Полигон</a></li>');
});