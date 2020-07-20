// ==UserScript==
// @name           Javascript Slider
// @namespace      http://community.wikia.com/wiki/User:T3CHNOCIDE
// @author         T3CHNOCIDE
// @description    Creates animated slider.
// @include        http://*.wikia.com/*
// ==/UserScript==

//Width of slides
var slideWidth = 698;

//Sets slide tracking token
var slideNumber = 1;
	
//Sets click function for scroll
$('.slideCircle').click(function() {
	if ($('#jsSlider').is(':animated') == false) {
		if ($(this).data("slide") == 1) {
			//Circle 1
			if (slideNumber >= 2 && slideNumber <= 4) {
				var slideStep = slideWidth * (slideNumber - 1);
				$('#jsSlider').animate({'margin-left': '+=' + slideStep + 'px'}, {queue: false, duration:500});
				$('*[data-slide="' + slideNumber + '"]').css({'background-color': 'rgba(255,255,255,0.0)'});
				slideNumber = 1;
				$('*[data-slide="' + slideNumber + '"]').css({'background-color': 'rgba(255,255,255,1.0)'});
			}
		} else if ($(this).data("slide") == 2) {
			//Circle 2
			if (slideNumber == 1) {
				var slideStep = slideWidth;
				$('#jsSlider').animate({'margin-left': '-=' + slideStep + 'px'}, {queue: false, duration:500});
				$('*[data-slide="' + slideNumber + '"]').css({'background-color': 'rgba(255,255,255,0.0)'});
				slideNumber = 2;
				$('*[data-slide="' + slideNumber + '"]').css({'background-color': 'rgba(255,255,255,1.0)'});
			} else if (slideNumber == 3 || slideNumber == 4) {
				var slideStep = slideWidth * (slideNumber - 2);
				$('#jsSlider').animate({'margin-left': '+=' + slideStep + 'px'}, {queue: false, duration:500});
				$('*[data-slide="' + slideNumber + '"]').css({'background-color': 'rgba(255,255,255,0.0)'});
				slideNumber = 2;
				$('*[data-slide="' + slideNumber + '"]').css({'background-color': 'rgba(255,255,255,1.0)'});
			}
		} else if ($(this).data("slide") == 3) {
			//Circle 3
			if (slideNumber == 4) {
				var slideStep = slideWidth;
				$('#jsSlider').animate({'margin-left': '+=' + slideStep + 'px'}, {queue: false, duration:500});
				$('*[data-slide="' + slideNumber + '"]').css({'background-color': 'rgba(255,255,255,0.0)'});
				slideNumber = 3;
				$('*[data-slide="' + slideNumber + '"]').css({'background-color': 'rgba(255,255,255,1.0)'});
			} else if (slideNumber == 1 || slideNumber == 2) {
				var slideStep = slideWidth * (3 - slideNumber);
				$('#jsSlider').animate({'margin-left': '-=' + slideStep + 'px'}, {queue: false, duration:500});
				$('*[data-slide="' + slideNumber + '"]').css({'background-color': 'rgba(255,255,255,0.0)'});
				slideNumber = 3;
				$('*[data-slide="' + slideNumber + '"]').css({'background-color': 'rgba(255,255,255,1.0)'});
			}
		} else if ($(this).data("slide") == 4) {
			//Circle 4
			if (slideNumber >= 1 && slideNumber <= 3) {
				var slideStep = slideWidth * (4 - slideNumber);
				$('#jsSlider').animate({'margin-left': '-=' + slideStep + 'px'}, {queue: false, duration:500});
				$('*[data-slide="' + slideNumber + '"]').css({'background-color': 'rgba(255,255,255,0.0)'});
				slideNumber = 4;
				$('*[data-slide="' + slideNumber + '"]').css({'background-color': 'rgba(255,255,255,1.0)'});
			}
		}
	}
});

//Sets auto scroll using timer
var scrolltimer = window.setInterval(autoScroll, 6000);

function autoScroll() {
	if ($('#jsSlider').is(':animated') == false) {
		if (parseInt($('#jsSlider').css('margin-left'), 10) > -2094) {
			$('#jsSlider').animate({'margin-left': '-=' + slideWidth + 'px'}, {queue: false, duration:500});
			$('*[data-slide="' + slideNumber + '"]').css({'background-color': 'rgba(255,255,255,0.0)'});
			slideNumber += 1;
			$('*[data-slide="' + slideNumber + '"]').css({'background-color': 'rgba(255,255,255,1.0)'});
		} else {
			$('#jsSlider').animate({'margin-left': '+=' + (slideWidth * 3) + 'px'}, {queue: false, duration:500});
			$('*[data-slide="' + slideNumber + '"]').css({'background-color': 'rgba(255,255,255,0.0)'});
			slideNumber -= 3;
			$('*[data-slide="' + slideNumber + '"]').css({'background-color': 'rgba(255,255,255,1.0)'});
		}
	}
}

//Turns off autoscroll on hover
$('#jsSlider').on("mouseenter",function(){
	clearInterval(scrolltimer);
}).on("mouseleave",function(){
	scrolltimer = window.setInterval(autoScroll, 6000);
});