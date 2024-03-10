/* Додає кнопку «Вгору» зліва */
function scrollTop(){
    $(window).scroll(function(e) {
	    if($(window).scrollTop()>0) {
	    	$("#scroll-top").fadeIn(300);
	    } else{ 
	    	$("#scroll-top").fadeOut(300);
	    }
    });
}

$(function(){
	$("div#footer").append($("<span></span>")
		.attr({
			"id": "scroll-top",
			"title": "Вгору"
		})
	);
    $("#scroll-top").click(function(e) {
        $('body,html').animate({scrollTop:0},300);
    });
    scrollTop();
});