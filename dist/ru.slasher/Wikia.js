importArticles({
    type: "script",
    articles: [
        "MediaWiki:Wikia.js/Slider.js",
        'u:dev:MediaWiki:SyntaxHighlight.js'
    ]
});

//===================================
// Новый блок "Новые статьи" с [[Шаблон:NewPagesModule]] внутри.
// Стили записаны в MediaWiki:Boxes.css
// Скрипт by ДжоДжо Вики
// 
 
$(function(){
	$('<section class="module"></section>')
		.appendTo('#WikiaRail')
		.load('/ru/index.php?title=Template:NewPagesModule&action=render');
});

//===================================
// Переключатель стилей работающий с [[Шаблон:Франшиза]]
// Стили записаны в MediaWiki:Styles.css
// Скрипт by АУИ Вики
// Автор Maxwell Winters
// 

$(function() {
if($('#changestyle').length > 0) {
var cl = $($('#changestyle').get(0)).data('bg');
if(cl) {
cl = cl.replace(/[^0-9a-ząćęęłńóśźż]+/ig, '_');
$(document.body).addClass('franchise-' + cl);
}
}
});

//===================================
//Прокрутки BOX влево и вправо
// Скрипт by Ведьмак Вики
// 

$('.BoxStrelaLeft').click(function () {
    scroll = $('#BoxCarousel').scrollLeft();
    $('#BoxCarousel').animate({'scrollLeft': scroll-540},1000);
});
$('.BoxStrelaRight').click(function () {
    scroll = $('#BoxCarousel').scrollLeft();
    $('#BoxCarousel').animate({'scrollLeft': scroll+540},1000);
});