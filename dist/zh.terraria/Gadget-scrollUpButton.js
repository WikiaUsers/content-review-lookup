/* Adds an UP button to the left of the page
   Copied from the Russian Minecraft Wiki: https://minecraft-ru.gamepedia.com/MediaWiki:Gadget-scrollUpButton.js*/
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
			"title": "Up"
		})
	);
    $("#scroll-top").click(function(e) {
        $('body,html').animate({scrollTop:0},300);
    });
    scrollTop();
});