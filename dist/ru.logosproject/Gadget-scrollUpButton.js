/* Добавляет кнопку «Вверх» справа */

function scrollTop(){
    $(window).scroll(function(e) {
	    if($(window).scrollTop()>0) {
	    	$("#scroll-up").fadeIn(300);
	    } else{ 
	    	$("#scroll-up").fadeOut(300);
	    }
    });
}

$(function(){
	$("div#footer").append($("<span></span>")
		.attr({
			"id": "scroll-up",
			"title": "Наверх"
		})
	);
    $("#scroll-up").click(function(e) {
        $('body,html').animate({scrollTop:0},300);
    });
    scrollTop();
});