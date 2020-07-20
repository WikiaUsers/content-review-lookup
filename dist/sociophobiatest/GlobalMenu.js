document.querySelector('.wds-global-navigation__logo').href = '//shararam.wikia.com';

/* Автор: Fngplg */
window.gnWikiLinks = ['//ru.luntik.wikia.com|Лунтик Вики', '//http://ru.losyash-library.wikia.com|Библиотека Лосяша', '//http://ru.peopleshararam.wikia.com|Народ Шарарама вики', '//ru.swrolevie.wikia.com|Ролевые /шв/ вики'];
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
var aTags = document.getElementsByTagName("a");
var searchText = "Исследуйте вики";
var found;

for (var i = 0; i < aTags.length; i++) {
  if (aTags[i].textContent == searchText) {
    found = aTags[i];
    break;
  }
}

found.remove()