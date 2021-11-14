/**
* Размещаемый ниже код JavaScript применяется к основной теме внешнего вида Фандома (FandomMobile) у всех пользователей и посетителей мобильной версии вики.
* Для кода обеих настольной и мобильной версий вики см. MediaWiki:Common.js.
* Для кода только основной настольной версии вики (FandomDesktop) см. MediaWiki:Fandomdesktop.js.
* Для кода только старой настольной версии вики (HydraDark) см. MediaWiki:Hydradark.js.
* Для кода только основной мобильной версии вики (FandomMobile) см. MediaWiki:Mobile.js.
**/

mw.loader.load('https://hytale.fandom.com/ru/index.php?title=MediaWiki:Fandomdesktop.js&action=raw&ctype=text/javascript');
mw.loader.load('https://hytale.fandom.com/ru/index.php?title=MediaWiki:Global.js&action=raw&ctype=text/javascript');


/* Добавление ссылок "текущая версия" и "отменить" на страницу Служебная:MobileDiff */

$(function() {
    var urlRegex = /.*Special:MobileDiff\/([0-9]+).*/;
    var currentID = location.href.replace(urlRegex, '$1');
    var prevID = $('#mw-mf-diffarea .revision-history-prev a[href]').attr('href').replace(urlRegex, '$1');

    var pagelink = $('#mw-mf-diffarea a[href*="oldid"]');
     pagelink.after('<br>(<a href="/' + pagelink.text().replace(/ /g, '_') + '" style="color:#6eafff;">Текущая версия страницы</a>)');

    $('#mw-mf-diffarea').append('<a class="mw-ui-button" href="/' + pagelink.text().replace(/ /g, '_') + '?action=edit&amp;undoafter=' + prevID + '&amp;undo=' + currentID + '">Undo</a>');
});