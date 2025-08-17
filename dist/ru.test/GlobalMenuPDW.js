/* Автор: Frontwards (редакция Петра Первого Викии) */
 
document.querySelector('.wds-global-navigation__logo').href = '//polandball.wikia.com';
 
var spanWiki = document.querySelector('.wds-dropdown__toggle span');
spanWiki.innerHTML = 'Семейка Polandball';
 
var newLink = document.createElement('a');
newLink.className = 'wds-global-navigation__cc';
newLink.innerHTML = 'Вики Сообщества';
newLink.setAttribute('href','http://ru.community.wikia.com');
var nav = document.querySelector('.wds-global-navigation__content-bar-left');
nav.appendChild(newLink);
 
/* Автор куска: Fngplg (редакция Петра Первого Викии) */ 
window.gnWikiLinks = ['http://http://ru.cityball.wikia.com|CitybBall Wiki', 'http://ru.usersofpolandball.wikia.com|Участники Polandball вики', 'http://uk.polandball.wikia.com|Polandball Wiki на Украинском языке'];
$(function () {
    var $menu = $('.wds-global-navigation__link-group .wds-list'),
        links = window.gnWikiLinks || [];
    if (!$menu.length || !links.length) return;
    links.forEach(function (v) {
        var link = v.replace(/\[|\]/g, ''),
            $a = $('<a>', {
                href: (/(.*?)\||$/.exec(link) || {})[1] || link,
                text: (/\|(.*)/.exec(link) || {})[1] || link,
                title: link
            });
        $menu.prepend($('<li>').append($a));
    });
});
/* ------------------------------------------------------------------ */
 
var ind = 0; 
$(".wds-global-navigation__content-bar-left .wds-is-linked li").each(function(){ 
ind++; 
$(this).attr("id","banus"+ind); 
});