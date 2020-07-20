/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

/* Заглавная страница */
/** Анимация для NavButton **/
jQuery(document).ready(function($) {	
	$(".NavButton").mouseleave(function(){
		var item = $(this).find('#imove');
		var topAttr = item.attr('data-top');
		item.animate({ top: topAttr }, {queue:false, duration:300});
	}).mouseenter(function(){
		var item = $(this).find('#imove');
		var topAttr = item.attr('data-top');
		var curTop = item.css('top');
		typeof topAttr === "undefined" ? item.attr('data-top', curTop) : "";
		item.animate({ top: '0px' }, {queue:false, duration:300});
	});
	$(window).resize(function() {
		$(".NavButton #imove").removeAttr('style');
		$(".NavButton #imove").removeAttr('data-top');
	});
});