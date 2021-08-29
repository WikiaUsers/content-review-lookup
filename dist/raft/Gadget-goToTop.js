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
	$(".page-side-tools").append($( "<button></button>")
		.attr({
			"id": "scroll-top",
			"data-wds-tooltip": "Up",
			"class": "page-side-tool"
		})
	);
	
	$("#scroll-top").append($( "<img>")
		.attr({
			"src": "https://static.wikia.nocookie.net/raft_gamepedia_en/images/1/1c/RaftArrow.png/revision/latest",
			"width": "32",
			"height": "32"
		})
	);
	
    $("#scroll-top").click(function(e) {
        $('body,html').animate({scrollTop:0},300);
    });
    scrollTop();
});