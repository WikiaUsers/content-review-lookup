importArticles({
    type: "script",
    articles: [
        'u:dev:ExtendedNavigation/code.js',
        'MediaWiki:Wikia.js/jsSlider.js'
    ]
});


//Scrolls Games left and right (gold)
$('.GamesArrowLeft-gold').click(function () {
    scroll = $('#GamesCarousel').scrollLeft();
    $('#GamesCarousel').animate({'scrollLeft': scroll-540},1000);
});
$('.GamesArrowRight-gold').click(function () {
    scroll = $('#GamesCarousel').scrollLeft();
    $('#GamesCarousel').animate({'scrollLeft': scroll+540},1000);
});