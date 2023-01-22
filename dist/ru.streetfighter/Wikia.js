var wgSkin = "wikia";



/********************
 * Случайный фон *
 * by Kopcap94 *
 ********************/
 
document.addEventListener("DOMContentLoaded", function(event){ 
    var imgs = [
        'https://vignette.wikia.nocookie.net/streetfighter/images/0/0e/Background_SFW_01.png/revision/latest/scale-to-width-down/1500?cb=20160209173650&path-prefix=ru',
        'https://vignette.wikia.nocookie.net/streetfighter/images/5/53/Background_SFW_02.png/revision/latest/scale-to-width-down/1500?cb=20160209173650&path-prefix=ru',
        'https://vignette.wikia.nocookie.net/streetfighter/images/a/a0/Background_SFW_03.png/revision/latest/scale-to-width-down/1500?cb=20160209173651&path-prefix=ru',
        'https://vignette.wikia.nocookie.net/streetfighter/images/7/7d/Background_SFW_04.png/revision/latest/scale-to-width-down/1500?cb=20160209173651&path-prefix=ru',
        'https://vignette.wikia.nocookie.net/streetfighter/images/4/4d/Background_SFW_05.png/revision/latest/scale-to-width-down/1500?cb=20160209173651&path-prefix=ru'
    ];
 
 /*
    $('body.skin-oasis').attr('style', 'background-image:url(' + imgs[Math.floor((imgs.length) * Math.random())] + ') !important');
});
 */
 
 document.getElementsByTagName("body")[0]
 .setAttribute("style", 'background-image:url(' 
 + imgs[Math.floor((imgs.length) * Math.random())] + ') !important; background-size:100%');

});
/********************/