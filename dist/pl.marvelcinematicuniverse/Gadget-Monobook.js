/* Źródło: http://gwfanon.wikia.com/wiki/MediaWiki:Gadget-Monobook.js/css
Autor: Mustafar29 */
$(".wds-tabs").append("<span class=\"monobook-sidebar-module\"><ul><li><a href=\"/wiki/Specjalna:Ostatnie_zmiany\">Ostatnie zmiany</a></li><li><a href=\"/wiki/Specjalna:Random/main\">Losowa strona</a></li><li><a href=\"/wiki/Specjalna:Obrazy\">Obrazy</a></li><li><a href=\"/d\">Dyskusje</a></li></ul></span><span class=\"monobook-sidebar-module\"><ul><li><a href=\"/wiki/Specjalna:Utwórz_stronę\">Utwórz stronę</a></li><li><a href=\"/wiki/Specjalna:Prześlij\">Prześlij obraz</a></li></ul></span>");

$(function(){
    $('<div id="przerzucamy"></div>')
    .appendTo('.wds-dropdown__content')
    .load('/index.php?title=Template:Wyszukiwarka&action=render');
});