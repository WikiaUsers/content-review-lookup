/* Анимация */
var width = $('.ticker-text').width(),
    containerwidth = $('.ticker-container').width(),
    left = containerwidth;
$(document).ready(function(e){
	function tick() {
        if(--left < -width){
            left = containerwidth;
        }
        $(".ticker-text").css("margin-left", left + "px");
        setTimeout(tick, 2);
      }
      tick();
});

/* Скрывание и раскрывание */
$(function () {
    $('.collapsible-element-container').each(function () {
        if (!($(this).hasClass('no-collapse'))) {
            $(this).find('.collapsible-element').hide();
        }
        $(this).find('.collapsible-element-trigger').click(function () {
            $(this).parent().find('.collapsible-element').slideToggle(500);
        });
    });
});