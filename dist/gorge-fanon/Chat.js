importScriptPage('MediaWiki:Emoticons.js','kocka');

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

importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');
var chatags = { images: true, videos: true };