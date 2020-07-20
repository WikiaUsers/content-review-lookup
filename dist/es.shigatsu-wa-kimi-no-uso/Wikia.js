importArticles({
    type: "script",
    articles: [
       "MediaWiki:Wikia.js/Slider.js"
    ]
});

//MultiPics 
$('.MultiPicsA').click(function () {
    scroll = $('#Carousel').scrollLeft();
    $('#Carousel').animate({'scrollLeft': scroll-540},1000);
});
$('.MultiPicsB').click(function () {
    scroll = $('#Carousel').scrollLeft();
    $('#Carousel').animate({'scrollLeft': scroll+540},1000);
});