// Random Page Background
// Author: Dim@s535

function randomBg() {
    var imgs = [
        'https://vignette.wikia.nocookie.net/wagnike2/images/1/18/BG_1.jpg',
        'https://vignette.wikia.nocookie.net/wagnike2/images/8/84/BG_2.jpg',
    ];

    $('body').css('background-size', 'cover'); 
    $('body').css('background-image', 'url(' + imgs[Math.floor((imgs.length) * Math.random())] + ')');
}
 
randomBg();