importScriptPage('MediaWiki:Wikia.js/BookSlider.js');
importScriptPage('MediaWiki:Wikia.js/inputUserInformation.js');

//Scrolls Games left and right
$('.GamesArrowLeft').click(function () {
    scroll = $('#GamesCarousel').scrollLeft();
    $('#GamesCarousel').animate({'scrollLeft': scroll-540},1000);
});
$('.GamesArrowRight').click(function () {
    scroll = $('#GamesCarousel').scrollLeft();
    $('#GamesCarousel').animate({'scrollLeft': scroll+540},1000);
});