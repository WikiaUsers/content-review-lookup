//===================================
// Переключатель стилей работающий с [[Шаблон:Версия]]
// Стили записаны в MediaWiki:Styles.css
// Скрипт by АУИ Вики
// Автор Maxwell Winters
// 
 
$(function() {
if($('#changestyle').length > 0) {
var cl = $($('#changestyle').get(0)).data('bg');
if(cl) {
cl = cl.replace(/[^0-9a-ząćęęłńóśźż]+/ig, '_');
$(document.body).addClass('version-' + cl);
}
}
});

//===================================
// Новый блок "Дискорд" с [[Шаблон:Discord]] внутри.
// Скрипт by ДжоДжо Вики
// 
 
$(function(){
	$('<section class="module"></section>')
		.appendTo('#WikiaRail')
		.load('/ru/index.php?title=Template:Discord&action=render');
});