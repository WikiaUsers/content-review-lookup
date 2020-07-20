// ==UserScript==
// @name           Main Page Animations
// @namespace      http://community.wikia.com/wiki/User:T3CHNOCIDE
// @author         T3CHNOCIDE
// @description    Animates selected elements on the mainpage.
// @include        http://*.wikia.com/*
// ==/UserScript==

//Creates timer variable
function checkCondition() {
	if (timerTime > 0) {
		timerTime = timerTime - 1;
	} else if (timerTime = 0) {
		window.clearInterval(animationTimer)
	}
}

var animationTimer = self.setInterval(function(){checkCondition()},1);
var conditionTimer = self.setInterval(function(){checkCondition()},1);
timerTime = -1


//Scrolls Games left and right
$('.GamesArrowLeft').click(function () {
    scroll = $('#GamesCarousel').scrollLeft();
    $('#GamesCarousel').animate({'scrollLeft': scroll-1181},1000);
});
$('.GamesArrowRight').click(function () {
    scroll = $('#GamesCarousel').scrollLeft();
    $('#GamesCarousel').animate({'scrollLeft': scroll+1181},1000);
});

//Opens and closes community links
$('#communitytitle').click(function(){
	if (timerTime > 0) {
		jQuery.noop();
	} else {
		if ($('#communitylinks').hasClass('closed')) {
			$('#communitylinks').removeClass('closed').addClass('opened').animate({ height: "100%" }, 1000).css('padding-top','5px');
			$('#communitytitle').text('Collapse Community Links');
			timerTime = 500
		} else if ($('#communitylinks').hasClass('opened')) {
			$('#communitylinks').removeClass('opened').addClass('closed').animate({ height: "0px" }, 1000).css('padding-top','0px');
			$('#communitytitle').text('More Community Links');
			timerTime = 500
		}
	}
});

//Sets function to animate magenta layer
function magentaAnimate() {
	$( "#" + hoverID + "magenta" ).animate({
		left: 5
	}, {
		duration: 0,
	});
	$( "#" + hoverID + "magenta" ).animate({	
		left: -2
	}, {
		duration: 300,
	});
	$( "#" + hoverID + "magenta" ).animate({
		left: 0
	}, {
		duration: 50,
	});
}

//Sets function to animate cyan layer
function cyanAnimate() {
	$( "#" + hoverID + "cyan" ).animate({
		left: -5
	}, {
		duration: 0,
	});
	$( "#" + hoverID + "cyan" ).animate({
		left: 2
	}, {
		duration: 300,
	});
	$( "#" + hoverID + "cyan" ).animate({
		left: 0
	}, {
		duration: 50,
	});
}

//Grabs element id on hover and animates cyan and magenta layers with queue stop
$('.flickerAnimation').hover(function(){
	hoverID = $(this).attr('id');
	if (!$(this).hasClass('animated')) {
		$(this).dequeue().stop();
		cyanAnimate();
		magentaAnimate();
	}
}, function() {
    $(this).addClass('animated').animate({ background: "none" }, "normal", "linear", function() {
		$(this).removeClass('animated').dequeue();
	});
});