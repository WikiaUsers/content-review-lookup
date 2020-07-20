/* Any JavaScript here will be loaded for users using the Wikia skin */

// START Random page background
// From: http://armedassault.wikia.com/wiki/MediaWiki:Wikia.js
// Author: Dim@s535
 
function randomBg() {
    var imgs = [
        'https://images.wikia.nocookie.net/__cb20141108094509/district9/images/f/f9/District_9_background_1.jpg',
        'https://images.wikia.nocookie.net/__cb20141108094511/district9/images/9/95/District_9_background_2.jpg',
        'https://images.wikia.nocookie.net/__cb20141108094511/district9/images/7/72/District_9_background_3.jpg',
    ];
 
    $('body').css('background-size', 'cover'); 
    $('body').css('background-image', 'url(' + imgs[Math.floor((imgs.length) * Math.random())] + ')');
}
 
randomBg();
// END Random page background