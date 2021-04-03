/**
* Размещённая ниже напись на языке Java влияет на всех пользователей и посетителей мобильной версии вики.
* Для написей обеих настольной и мобильной версий см. MediaWiki:Global.js.
* Для написей настольной версии см. MediaWiki:Common.js.
**/

mw.loader.load('/index.php?title=MediaWiki:Global.js&action=raw&ctype=text/javascript');
mw.loader.load('/index.php?title=MediaWiki:Vendor.js&action=raw&ctype=text/javascript');
mw.loader.load('/index.php?title=MediaWiki:Jquery.js&action=raw&ctype=text/javascript');
mw.loader.load('/index.php?title=MediaWiki:App.js&action=raw&ctype=text/javascript');
mw.loader.load('/index.php?title=MediaWiki:Vue.js&action=raw&ctype=text/javascript');
mw.loader.load('/index.php?title=MediaWiki:Video.js&action=raw&ctype=text/javascript');


/* Добавление ссылок "текущая версия" и "отменить" на страницу Служебная:MobileDiff */

$(function() {
    var urlRegex = /.*Special:MobileDiff\/([0-9]+).*/;
    var currentID = location.href.replace(urlRegex, '$1');
    var prevID = $('#mw-mf-diffarea .revision-history-prev a[href]').attr('href').replace(urlRegex, '$1');

    var pagelink = $('#mw-mf-diffarea a[href*="oldid"]');
     pagelink.after('<br>(<a href="/' + pagelink.text().replace(/ /g, '_') + '" style="color:#6eafff;">Текущая версия страницы</a>)');

    $('#mw-mf-diffarea').append('<a class="mw-ui-button" href="/' + pagelink.text().replace(/ /g, '_') + '?action=edit&amp;undoafter=' + prevID + '&amp;undo=' + currentID + '">Undo</a>');
});