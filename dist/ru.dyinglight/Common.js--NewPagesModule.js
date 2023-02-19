/* Any JavaScript here will be loaded for all users on every page load. */

/* БЛОК «НОВЫЕ СТАТЬИ» ---------------------------- */

//=========================================
// Необходимо для [[Шаблон:NewPagesModule]]

$(function(){
	$('<section class="module"></section>')
		.appendTo('#WikiaRail')
		.load('/ru/index.php?title=Template:NewPagesModule&action=render');
});