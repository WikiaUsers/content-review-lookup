var wgSkin = "wikia";



/********************
 * Случайный фон *
 * by Kopcap94 *
 ********************/
 
document.addEventListener("DOMContentLoaded", function(event){ 
    var imgs = [
        'https://vignette.wikia.nocookie.net/elderscrolls/images/c/cb/Bg1.jpg/revision/latest?cb=20150903225829&path-prefix=ru',
        'https://vignette.wikia.nocookie.net/elderscrolls/images/a/a5/Bg2.jpg/revision/latest?cb=20150903225846&path-prefix=ru',
        'https://vignette.wikia.nocookie.net/elderscrolls/images/f/ff/Bg3.jpg/revision/latest?cb=20150903225902&path-prefix=ru',
        'https://vignette.wikia.nocookie.net/elderscrolls/images/3/32/Bg4.jpg/revision/latest?cb=20150903225918&path-prefix=ru',
        'https://vignette.wikia.nocookie.net/elderscrolls/images/7/71/Bg5.jpg/revision/latest?cb=20150903225934&path-prefix=ru',
        'https://vignette.wikia.nocookie.net/elderscrolls/images/7/71/Bg6.jpg/revision/latest?cb=20150903225950&path-prefix=ru',
        'https://vignette.wikia.nocookie.net/elderscrolls/images/2/28/Bg7.jpg/revision/latest?cb=20150903230004&path-prefix=ru',
        'https://vignette.wikia.nocookie.net/elderscrolls/images/c/c4/Bg8.jpg/revision/latest?cb=20150903230018&path-prefix=ru',
        'https://vignette.wikia.nocookie.net/elderscrolls/images/6/60/Bg9.jpg/revision/latest?cb=20150903230034&path-prefix=ru'
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