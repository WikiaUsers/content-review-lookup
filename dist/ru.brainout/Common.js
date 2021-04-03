/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

/*FluidSlider*/
importScriptPage('MediaWiki:FluidSlider/code.js', 'ru.community');

/* Кнопка "Наверх" */
window.BackToTopModern = true;

/* Статус неактивного пользователя */
// Inactive users
window.InactiveUsers = { 
    months: 1,
    text: 'НЕАКТИВЕН'
};

/* Случайный фон */
document.addEventListener("DOMContentLoaded", function(event){ 
    var imgs = [
    'https://vignette.wikia.nocookie.net/brainout/images/c/cb/Bg1.jpg/revision/latest?cb=20200827020446&path-prefix=ru',
     'https://vignette.wikia.nocookie.net/brainout/images/a/a5/Bg2.jpg/revision/latest?cb=20200827020447&path-prefix=ru',
     'https://vignette.wikia.nocookie.net/brainout/images/f/ff/Bg3.jpg/revision/latest?cb=20200827020959&path-prefix=ru',
     'https://vignette.wikia.nocookie.net/brainout/images/3/32/Bg4.jpg/revision/latest?cb=20200827021027&path-prefix=ru',
     'https://vignette.wikia.nocookie.net/brainout/images/7/71/Bg5.jpg/revision/latest?cb=20200827021054&path-prefix=ru'
   ];
 
 /*
    $('body.skin-oasis').attr('style', 'background-image:url(' + imgs[Math.floor((imgs.length) * Math.random())] + ') !important');
});
 */
 
 document.getElementsByTagName("body")[0]
 .setAttribute("style", 'background-image:url(' 
 + imgs[Math.floor((imgs.length) * Math.random())] + ') !important');
 
});
/********************/