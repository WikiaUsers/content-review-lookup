// ************
// Chat options import
// ************
// Written by Sactage, Callofduty4 and Madnessfan34537
var chatOptionsLoaded;
if (chatOptionsLoaded != 1){
	chatOptionsLoaded = 1;
	importScriptPage('MediaWiki:Chat.js/options.js','cod');
}
// ****************
// END Chat options import
// ****************
/**
 
/**
 * Replace picture URL with picture
 * By AnimatedCartoons
 * Supported picture formats: .jpg, .jpeg, .png, .gif, .bmp, and .svg
 */
setInterval(function () {
    "use strict";
    var $jpg = $('.Chat .message a[href$=".jpg"]').text(),
        $jpeg, $png, $gif, $bmp, $svg;
    $('.Chat .message a[href$=".jpg"]').replaceWith('<img src="' + $jpg + '" />');
    $jpeg = $('.Chat .message a[href$=".jpeg"]').text();
    $('.Chat .message a[href$=".jpeg"]').replaceWith('<img src="' + $jpeg + '" />');
    $png = $('.Chat .message a[href$=".png"]').text();
    $('.Chat .message a[href$=".png"]').replaceWith('<img src="' + $png + '" />');
    $gif = $('.Chat .message a[href$=".gif"]').text();
    $('.Chat .message a[href$=".gif"]').replaceWith('<img src="' + $gif + '" />');
    $bmp = $('.Chat .message a[href$=".bmp"]').text();
    $('.Chat .message a[href$=".bmp"]').replaceWith('<img src="' + $bmp + '" />');
    $svg = $('.Chat .message a[href$=".svg"]').text();
    $('.Chat .message a[href$=".svg"]').replaceWith('<img src="' + $svg + '" />');
}, 1);
 
//
/**
 * Replace YouTube video or playlist URL with YouTube video or playlist
 * Copyright © 2012, [[User:AnimatedCartoons]]
 */
setInterval(function () {
    "use strict";
    var $video1 = $('.Chat .message a[href*="www.youtube.com/watch?v="]').text(),
        video2 = $video1.replace('www.youtube.com/watch?v=', 'www.youtube-nocookie.com/embed/'),
        video3,
        $playlist1 = $('.Chat .message a[href*="www.youtube.com/playlist?list="]').text(),
        playlist2 = $playlist1.replace('www.youtube.com', 'www.youtube-nocookie.com/embed'),
        playlist3;
    if (video2.indexOf('http://') === 0) {
        video3 = video2.slice(7);
    } else if (video2.indexOf('https://') === 0) {
        video3 = video2.slice(8);
    } else if (playlist2.indexOf('http://') === 0) {
        playlist3 = playlist2.slice(7);
    } else if (playlist2.indexOf('https://') === 0) {
        playlist3 = playlist2.slice(8);
    }
    $('.Chat .message a[href*="www.youtube.com/watch?v="]').replaceWith('<iframe width="560" height="315" src="https://' + video3 + '?html5=1" frameborder="0" webkitAllowFullScreen="webkitAllowFullScreen" mozallowfullscreen="mozallowfullscreen" allowfullscreen="allowfullscreen"></iframe>');
    $('.Chat .message a[href*="www.youtube.com/playlist?list="]').replaceWith('<iframe width="560" height="315" src="https://' + playlist3 + '" frameborder="0" webkitAllowFullScreen="webkitAllowFullScreen" mozallowfullscreen="mozallowfullscreen" allowfullscreen="allowfullscreen"></iframe>');
}, 1);
//