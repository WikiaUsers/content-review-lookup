$(function() {
    //Показываем подсказку у курсора
    $('.w-wrap-tooltip').mousemove(function (e)	{
    	$(this).children('.w-tooltip').css({
    		'left' : e.clientX + 20,
    		'top' : e.clientY + 20
    	}).show();
    });
    //Убираем, если курсор вне текста с подсказкой
    $('.w-wrap-tooltip').mouseout(function () {
    	$(this).children('.w-tooltip').hide().css({
    		'top' : 0,
    		'left' : 0
    	});
    });
});