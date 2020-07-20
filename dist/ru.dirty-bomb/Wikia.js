/*********************************
//Шаблон НавНаемники
*********************************/
$('.GamesArrowLeft').click(function() {
    scroll = $('#GamesCarousel').scrollLeft();
    $('#GamesCarousel').animate({
        'scrollLeft': scroll - 500
    }, 1000);
});
$('.GamesArrowRight').click(function() {
    scroll = $('#GamesCarousel').scrollLeft();
    $('#GamesCarousel').animate({
        'scrollLeft': scroll + 500
    }, 1000);
});

//*****************************/