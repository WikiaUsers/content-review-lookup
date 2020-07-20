/* Any JavaScript here will be loaded for users using the Wikia skin */

// START Random page background
// From: http://armedassault.wikia.com/wiki/MediaWiki:Wikia.js
// Author: Dim@s535
 
function randomBg() {
    var imgs = [
        'https://images.wikia.nocookie.net/__cb20140929030047/dayz-standalone/images/a/aa/DayZ-Background-5.jpg',
        'https://images.wikia.nocookie.net/__cb20140929030458/dayz-standalone/images/5/5a/DayZ-Background-11.jpg',
    ];
 
    $('body').css('background-size', 'cover'); 
    $('body').css('background-image', 'url(' + imgs[Math.floor((imgs.length) * Math.random())] + ')');
}
 
randomBg();
// END Random page background

// START Background snow
//importScriptPage('MediaWiki:Snow.js','community');
// END Background snow