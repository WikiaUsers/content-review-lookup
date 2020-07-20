/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
/*Таймер PPV*/
importArticles({
    type: "script",
    articles: [
        "w:c:dev:MediaWiki:Countdown/code.js"
    ]
});
window.countdownTimer = {
    newppvAlert : function () {
        $ (this).text('PPV в эфире');
    }
};
countdownTimer.translations = { 
    en: {
        and: 'и',
        second: 'секунда',
        seconds: 'секунд',
        minute: 'минута',
        minutes: 'минут',
        hour: 'час',
        hours: 'часов',
        day: 'день',
        days: 'дней'
    }
};

importArticles({
    type: "script",
    articles: [
        "MediaWiki:Wikia.js/jsSlider.js"
    ]
});
/*Слайдер PPV*/
//Scrolls Games left and right (blue default)
$('.GamesArrowLeft').click(function () {
    scroll = $('#GamesCarousel').scrollLeft();
    $('#GamesCarousel').animate({'scrollLeft': scroll-305},1000);
});
$('.GamesArrowRight').click(function () {
    scroll = $('#GamesCarousel').scrollLeft();
    $('#GamesCarousel').animate({'scrollLeft': scroll+305},1000);
});
 
//Scrolls Games left and right (gold)
$('.GamesArrowLeft-gold').click(function () {
    scroll = $('#GamesCarousel').scrollLeft();
    $('#GamesCarousel').animate({'scrollLeft': scroll-305},1000);
});
$('.GamesArrowRight-gold').click(function () {
    scroll = $('#GamesCarousel').scrollLeft();
    $('#GamesCarousel').animate({'scrollLeft': scroll+305},1000);
});