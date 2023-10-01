/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
(function($) {
    'use strict';
 
    var h = (new Date()).getHours(), s, i;
 
    if (h > 5 && h <= 9) {
        // Время от 6:00 до 9:59
        s = [
       'https://static.wikia.nocookie.net/ru.starwars/images/2/27/Background_dromund.jpg',
       'https://static.wikia.nocookie.net/ru.starwars/images/d/d7/Backgroung_narshaddaa_night.jpg',
        'https://static.wikia.nocookie.net/ru.starwars/images/1/14/Background_night.jpg'
        ];
    } else if (h > 9 && h <= 15) {
        // Время от 10:00 до 15:59
        s = [
        'https://static.wikia.nocookie.net/ru.starwars/images/a/ae/Background_Naboo_morning.jpg',
        'https://static.wikia.nocookie.net/rustarwars/images/3/3c/Green_background_11.jpg'
        ];
    } else if (h > 15 && h <= 20) {
        // Время от 16:00 до 20:59
        s = [
        'https://static.wikia.nocookie.net/ru.starwars/images/6/6d/Background_8.jpg',
        'https://static.wikia.nocookie.net/ru.starwars/images/3/38/Background_morning.jpg',
         'https://static.wikia.nocookie.net/ru.starwars/images/c/ca/Background_Alderaan_1.jpg'
        ];
    } else {
        // Время от 21:00 до 05:59
        s = [
        'https://static.wikia.nocookie.net/ru.starwars/images/9/90/Background_ice_1.jpg',
        'https://static.wikia.nocookie.net/rustarwars/images/b/b2/Art_Challenge_2016,_Andrew_Bosley_1.jpg'
        ];
    }
    
    i = Math.floor( Math.random() * s.length );
 
    $('body.skin-fandomdesktop').css({
        'background-image': 'url(' + s[i] +')',
        'background-position': 'top center',
        'background-repeat': 'no-repeat',
        'background-attachment': 'fixed'
    });
})(this.jQuery);