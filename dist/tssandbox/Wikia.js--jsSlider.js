// ==UserScript==
// @name           Javascript Slider
// @namespace      http://community.wikia.com/wiki/User:T3CHNOCIDE
// @author         T3CHNOCIDE
// @description    Creates animated slider.
// @include        http://*.wikia.com/*
// ==/UserScript==
 
//Tracks slide from scroll
var slideNumber = 1;
 
//Changes caption with slide
function rightCaption() {
	if (slideNumber == 1) {
		$('#caption1').animate({'opacity': '0'}, {queue: false, duration:500}).hide()
		$('#caption2').show().animate({'opacity': '1'}, {queue: false, duration:500})
	} else if (slideNumber == 2) {
		$('#caption2').animate({'opacity': '0'}, {queue: false, duration:500}).hide()
		$('#caption3').show().animate({'opacity': '1'}, {queue: false, duration:500})
	} else if (slideNumber == 3) {
		$('#caption3').animate({'opacity': '0'}, {queue: false, duration:500}).hide()
		$('#caption4').show().animate({'opacity': '1'}, {queue: false, duration:500})
	} else if (slideNumber == 4) {
		$('#caption4').animate({'opacity': '0'}, {queue: false, duration:500}).hide()
		$('#caption1').show().animate({'opacity': '1'}, {queue: false, duration:500})
	}
}
 
function leftCaption() {
	if (slideNumber == 1) {
		$('#caption1').animate({'opacity': '0'}, {queue: false, duration:500}).hide()
		$('#caption4').show().animate({'opacity': '1'}, {queue: false, duration:500})
	} else if (slideNumber == 2) {
		$('#caption2').animate({'opacity': '0'}, {queue: false, duration:500}).hide()
		$('#caption1').show().animate({'opacity': '1'}, {queue: false, duration:500})
	} else if (slideNumber == 3) {
		$('#caption3').animate({'opacity': '0'}, {queue: false, duration:500}).hide()
		$('#caption2').show().animate({'opacity': '1'}, {queue: false, duration:500})
	} else if (slideNumber == 4) {
		$('#caption4').animate({'opacity': '0'}, {queue: false, duration:500}).hide()
		$('#caption3').show().animate({'opacity': '1'}, {queue: false, duration:500})
	}
}
 
function hideCaption() {
	if ($('#caption' + slideNumber).text() == "") {
		$('#captionBorder').animate({'opacity': '0'}, {queue: false, duration:0})
	} else {
		$('#captionBorder').animate({'opacity': '1'}, {queue: false, duration:0})
	}
}
 
//Sets click function for scroll
$('#slideRight').click(function() {
	if ($('#jsSlider').is(':animated')) {
		//Pass
	} else {
		if (parseInt($('#jsSlider').css('margin-left'), 10) > -2004) {
			$('#jsSlider').animate({'margin-left': '-=668px'}, {queue: false, duration:500});
			rightCaption()
			slideNumber += 1;
			hideCaption()
		} else {
			$('#jsSlider').animate({'margin-left': '+=2004px'}, {queue: false, duration:500});
			rightCaption()
			slideNumber -= 3;
			hideCaption()
		}
	}
});
 
$('#slideLeft').click(function() {
	if ($('#jsSlider').is(':animated')) {
		//Pass
	} else {
		if (parseInt($('#jsSlider').css('margin-left'), 10) < 0) {
			$('#jsSlider').animate({'margin-left': '+=668px'}, {queue: false, duration:500});
			leftCaption()
			slideNumber -= 1;
			hideCaption()
		} else {
			$('#jsSlider').animate({'margin-left': '-=2004px'}, {queue: false, duration:500});
			leftCaption()
			slideNumber += 3;
			hideCaption()
		}
	}
});
 
//Sets auto scroll using timer
var scrolltimer = window.setInterval(autoScroll, 6000);
 
function autoScroll() {
	if ($('#jsSlider').is(':animated')) {
		//Pass
	} else {
		if (parseInt($('#jsSlider').css('margin-left'), 10) > -2004) {
			$('#jsSlider').animate({'margin-left': '-=668px'}, {queue: false, duration:500});
			rightCaption()
			slideNumber += 1;
			hideCaption()
		} else {
			$('#jsSlider').animate({'margin-left': '+=2004px'}, {queue: false, duration:500});
			rightCaption()
			slideNumber -= 3;
			hideCaption()
		}
	}
}
 
//Turns off autoscroll on hover
$('#jsSlider').on("mouseenter",function(){
	scrolltimer = window.clearInterval(scrolltimer)
}).on("mouseleave",function(){
	scrolltimer = window.setInterval(autoScroll, 6000);
});