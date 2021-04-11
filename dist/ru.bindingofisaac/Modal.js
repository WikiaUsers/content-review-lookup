$(function(){
var modal;

mw.hook('dev.modal').add(function(modal) {
var modal = new modal.Modal({
    title: 'Таблица артефактов Repentance', //Название окна
    content: '<div id="modalcontent"></div>', //контент окна
    id: 'custommodal', //айди окна
    size: 'large',
    closeTitle: 'Закрыть' //текст кнопки закрытия
});
modal.create(); //создаём окно

$('#showcustommodal').click(function() {
modal.show(); //показываем окно по клику
});
$('#modalcontent').load('https://bindingofisaac.fandom.com/ru/wiki/Шаблон:Коллекция_Repentance .mw-parser-output', function() {
importArticle({
    type: 'script',
    article: 'u:dev:MediaWiki:Tooltips.js'
});
}); //подгружаем в окно контент другой страницы
});
});

/*Полотно*/
$(function(){
switch ( mw.config.get('wgPageName') ) {
    case 'TBoI_Wiki_Discord_Сервер':
var cloth;

mw.hook('dev.modal').add(function(modal) {
var cloth = new modal.Modal({
	title: 'Памятное полотно с участниками сервера (2017-2018)', 
    content: '<div id="modalcontent_cloth"></div>',
    id: 'custommodal_cloth',
    size: 'large',
    closeTitle: 'Закрыть'
});
cloth.create();

$('#showcloth').click(function() {
cloth.show();
});
$('#modalcontent_cloth').load('https://bindingofisaac.fandom.com/ru/wiki/Шаблон:Полотно_сервера .mw-parser-output', function() {
importArticle({
    type: 'script',
    article: 'u:dev:MediaWiki:Tooltips.js'
});
$(function(){
const scPlayer = function (data) {
	const widget = document.createElement('iframe');
	widget.classList.add('soundcloud-player');
	widget.src =
		'https://w.soundcloud.com/player/?show_artwork=false&url=' +
		encodeURI(data.src);

	if (data.color) widget.src += '&color=' + encodeURIComponent(data.color);
	if (data.width) widget.width = data.width;
	if (data.height) widget.height = data.height;

	return widget;
};

	const scParseTags = function ($content) {
		const scTags = $('.soundcloud');

		for (var i = 0; i < scTags.length; i++) {
			scTags[i].replaceWith(scPlayer(scTags[i].dataset));
		}
	};

mw.hook('wikipage.content').add(function ($content) {
	scParseTags($content);
});
})();
});
});
break;
}
});

/*Карта*/
$(function(){
switch ( mw.config.get('wgPageName') ) {
    case 'Навигационная_карта':
var map;

mw.hook('dev.modal').add(function(modal) {
var map = new modal.Modal({
	title: 'Карта прохождения',
    content: '<div id="modalcontent_map"></div>',
    id: 'custommodal_map',
    size: 'large',
    closeTitle: 'Закрыть'
});
map.create();

$('#showmap').click(function() {
map.show();
});

$('#modalcontent_map').load('https://bindingofisaac.fandom.com/ru/wiki/Шаблон:Навигационная_карта .mw-parser-output', function() {
importArticle({
    type: 'script',
    article: 'u:dev:MediaWiki:Tooltips.js'
});
});
});
break;
}
});