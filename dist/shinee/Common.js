/* Any JavaScript here will be loaded for all users on every page load. */
if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}

'use strict';

$(function() {

    //settings for slider
    var width = 600;
    var animationSpeed = 1000;
    var pause = 3000;
    var currentSlide = 1;

    //cache DOM elements
    var $slider = $('#slider');
    var $slideContainer = $slider.find('.slides');
    var $slides = $slideContainer.find('.slide');

    var interval;

    function startSlider() {
        interval = setInterval(function() {
            $slideContainer.animate({'margin-left': '-='+width}, animationSpeed, function() {
                currentSlide++;
                if (currentSlide === $slides.length) {
                    currentSlide = 1;
                    $slideContainer.css('margin-left', 0);
                }
            });
        }, pause);
    }
    function pauseSlider() {
        clearInterval(interval);
    }

    $slideContainer
        .on('mouseenter', pauseSlider)
        .on('mouseleave', startSlider);

    startSlider();


});

/* Adds view source to drop down menu. */
importArticles({
    type: 'script',
    articles: [
         'u:dev:MediaWiki:View_Source/code.js'
    ]
});