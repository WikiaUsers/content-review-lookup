/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */

/* Смена фонового изображения в зависимости от времени суток */
(function($) {
    'use strict';
 
    var h = (new Date()).getHours(), s, i;
 
    if (h > 5 && h <= 9) {
        // Время от 6:00 до 9:59
        s = [
       'https://static.wikia.nocookie.net/cartoonalvinandthechipmunks/images/f/f1/Background_M_%2801%29.jpeg/revision/latest?cb=20230923035535&format=original&path-prefix=ru',
       'https://static.wikia.nocookie.net/cartoonalvinandthechipmunks/images/6/6b/Background_M_%2802%29.jpeg/revision/latest?cb=20230928231915&format=original&path-prefix=ru'
        ];
    } else if (h > 9 && h <= 15) {
        // Время от 10:00 до 15:59
        s = [
        'https://static.wikia.nocookie.net/cartoonalvinandthechipmunks/images/5/5f/Background_D.jpg/revision/latest?cb=20230626201310&format=original&path-prefix=ru'
        ];
    } else if (h > 15 && h <= 20) {
        // Время от 16:00 до 20:59
        s = [
        'https://static.wikia.nocookie.net/cartoonalvinandthechipmunks/images/d/d0/Background_E.jpg/revision/latest?cb=20231004091243&format=original&path-prefix=ru'
        ];
    } else {
        // Время от 21:00 до 05:59
        s = [
        'https://static.wikia.nocookie.net/cartoonalvinandthechipmunks/images/e/e7/Background_N_%2801%29.jpeg/revision/latest?cb=20230801070610&format=original&path-prefix=ru',
        'https://static.wikia.nocookie.net/cartoonalvinandthechipmunks/images/4/43/Background_N_%2802%29.jpg/revision/latest?cb=20230626201058&format=original&path-prefix=ru',
        'https://static.wikia.nocookie.net/cartoonalvinandthechipmunks/images/4/4c/Background_N_%2803%29.jpeg/revision/latest?cb=20230927221130&format=original&path-prefix=ru'
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