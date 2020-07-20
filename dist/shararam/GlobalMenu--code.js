/* Автор: Frontwards */
 
document.querySelector('.wds-global-navigation__logo').href = '//shararam.wikia.com';
 
var spanWiki = document.querySelector('.wds-dropdown__toggle span');
spanWiki.innerHTML = 'Вики-спутники /шв/';
 
var newLink = document.createElement('a');
newLink.className = 'wds-global-navigation__cc';
newLink.innerHTML = 'Вики Сообщества';
newLink.setAttribute('href','http://ru.community.wikia.com');
var nav = document.querySelector('.wds-global-navigation__content-bar-left');
nav.appendChild(newLink);
 
/* Автор куска: Fngplg */ 
window.gnWikiLinks = ['http://ru.peopleshararam.wikia.com|Народ Шарарама вики', 'http://ru.swrolevie.wikia.com|Ролевые /шв/ вики'];
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
 
/* Значки */ 
var ind = 0; 
$(".wds-global-navigation__content-bar-left .wds-is-linked li").each(function(){ 
ind++; 
$(this).attr("id","banus"+ind); 
});

var kalokolchik = document.querySelector("#wds-icons-bell");
var nekalokolchik = document.querySelector("#wds-icons-message");
function tupayaFignya(var1, path1, square) {
	var1.innerHTML = path1;
	var1.style.width = square;
	var1.style.height = square;
}
tupayaFignya(kalokolchik, '<path d="M21.882 19.472a.998.998 0 0 0-.05-1.026C21.814 18.418 20 15.656 20 12V8c0-4.411-3.59-8-8-8-4.411 0-8 3.589-8 8v4c0 3.628-1.815 6.419-1.832 6.446a1.003 1.003 0 0 0-.05 1.026c.175.325.514.528.882.528h18a1 1 0 0 0 .882-.528M12 24c1.474 0 2.75-.81 3.444-2H8.556c.694 1.19 1.97 2 3.444 2" fill-rule="evenodd"></path>', '20px');