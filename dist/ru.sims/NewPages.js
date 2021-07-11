/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */

//==================================================================
// Блок "Новые статьи" с Шаблон:NewPagesModule внутри.

$(function(){
	$('<section class="new-pages-module"></section>')
		.appendTo('#WikiaRail')
		.load('/ru/index.php?title=Template:NewPagesModule&action=render');
});