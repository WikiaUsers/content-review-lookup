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
        'https://static.wikia.nocookie.net/cartoonalvinandthechipmunks/images/7/71/Background_D_%28HR%29.png/revision/latest?cb=20231115204901&format=original&path-prefix=ru'
        ];
    } else if (h > 15 && h <= 18) {
        // Время от 16:00 до 18:59
        s = [
        'https://static.wikia.nocookie.net/cartoonalvinandthechipmunks/images/d/d0/Background_E.jpg/revision/latest?cb=20231004091243&format=original&path-prefix=ru'
        ];
    } else if (h > 18 && h <= 20) {
        // Время от 19:00 до 20:59
        s = [
        'https://static.wikia.nocookie.net/cartoonalvinandthechipmunks/images/2/2b/Background_LE.png/revision/latest?cb=20231116222830&format=original&path-prefix=ru'
        ];  
    } else {
        // Время от 21:00 до 05:59
        s = [
        'https://static.wikia.nocookie.net/cartoonalvinandthechipmunks/images/e/e7/Background_N_%2801%29.jpeg/revision/latest?cb=20230801070610&format=original&path-prefix=ru',
        'https://static.wikia.nocookie.net/cartoonalvinandthechipmunks/images/6/68/Background_N_%2802_HR%29.png/revision/latest?cb=20231115204943&format=original&path-prefix=ru',
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

/* tst */
window.quizName = "Вы готовы, ребята? С вами я, Дэйв, и мы начинаем!";
window.quizLang = "ru";
window.resultsTextArray = [ 
    "Мне очень жаль, но похоже вам могут понадобится дополнительные занятия с мисс Смит. Не волнуйтесь, Элвин составит вам компанию.",
    "Эй, а вы неплохо справились! Я бы угостил вас печеньем, но, боюсь, Теодор опять всё слопал.",
    "Просто великолепно! Кажется, вы можете неплохо поладить с Саймоном." 
];
window.questions = [
    ["Сколько бурундуков живёт в доме Севиллов?",
    "3",
    "6",
    "2 в 64 степени"], 

    ["Любимая игрушка Теодора?",
    "Говорящий Тедди",
    "Плачущий Норберт",
    "Одна из орущих гусениц"],

    ["Как зовут пухловатого и неуклюжего рыжего парня?",
    "Чиззи",
    "Кевин",
    "Рон Уизли"],
    
    ["С помощью какого слова Дэйв часто выражает своё недовольство?",
    "Элвин!!!",
    "Проклятье!",
    "Гвоздь мне в кеды!"],
    
    ["Одно из увлечений Элвина?",
    "Футбол",
    "Выпечка",
    "Слушать музыку в жанре Harsh Noise Wall"], 

    ["Имя одного из роботов Саймона?",
    "Гизмо",
    "Глория",
    "Вертер"],
    
    ["Каким именем мисс Кронер называет Теодора?",
    "Кроуфорд",
    "Тимми",
    "Симулякр"],
    
    ["Как зовут местного офицера-растяпу?",
    "Дангус",
    "Дирк",
    "Дерек"],
    
    ["На какой улице находится дом Севиллов?",
    "Либерти-Лейн",
    "Хоув-Бич",
    "Пост-экзистенциализм"],
    ];