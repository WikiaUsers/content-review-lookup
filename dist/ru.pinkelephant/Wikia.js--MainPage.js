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
    $('#GamesCarousel').animate({'scrollLeft': scroll-630},1000);
});
$('.GamesArrowRight').click(function () {
    scroll = $('#GamesCarousel').scrollLeft();
    $('#GamesCarousel').animate({'scrollLeft': scroll+630},1000);
});