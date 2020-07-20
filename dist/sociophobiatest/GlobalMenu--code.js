/* Автор: Frontwards */
 
document.querySelector('.wds-global-navigation__logo').href = '//shararam.wikia.com';
 
var spanWiki = document.querySelector('.wds-dropdown__toggle span');
spanWiki.innerHTML = 'Спутники';
 
var newLink = document.createElement('a');
newLink.className = 'wds-global-navigation__cc';
newLink.innerHTML = 'Вики Сообщества';
newLink.setAttribute('href','http://ru.community.wikia.com');
var nav = document.querySelector('.wds-global-navigation__content-bar-left');
nav.appendChild(newLink);
 
/* Автор куска: Fngplg */ 
window.gnWikiLinks = ['http://ru.users-of-shararam.wikia.com|Участники Шарарам вики','http://ru.peopleshararam.wikia.com|Народ Шарарама вики', 'http://ru.swrolevie.wikia.com|Ролевые /шв/ вики'];

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

/* Значки */ 
function svgReplacer (selector, path, square) {
    var thisSelector = document.querySelector(selector);
	thisSelector.innerHTML = path;
	thisSelector.style.width = square;
	thisSelector.style.height = square;
}

svgReplacer('#wds-icons-bell', '<path d="M21.882 19.472a.998.998 0 0 0-.05-1.026C21.814 18.418 20 15.656 20 12V8c0-4.411-3.59-8-8-8-4.411 0-8 3.589-8 8v4c0 3.628-1.815 6.419-1.832 6.446a1.003 1.003 0 0 0-.05 1.026c.175.325.514.528.882.528h18a1 1 0 0 0 .882-.528M12 24c1.474 0 2.75-.81 3.444-2H8.556c.694 1.19 1.97 2 3.444 2" fill-rule="evenodd"></path>', '20px');

svgReplacer('#wds-icons-message', '<path d="M23 1H1a1 1 0 0 0-1 1v15a1 1 0 0 0 1 1h6.52l3.699 4.625a1 1 0 0 0 1.562 0L16.48 18H23a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1" fill-rule="evenodd"></path>', '20px');

svgReplacer('#wds-icons-flag', '<path d="M12 2c6.066 0 11 4.078 11 9.09 0 5.014-4.934 9.092-11 9.092-.919 0-1.843-.098-2.753-.292L4.09 21.935a.922.922 0 0 1-.895-.12.907.907 0 0 1-.356-.824l.483-4.313C1.822 15.088 1 13.118 1 11.091 1 6.078 5.934 2 12 2" fill-rule="evenodd"></path>', '18px');