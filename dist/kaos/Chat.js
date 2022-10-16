var beepSound = '';

importArticles({
    type: 'script',
    articles: [
        'u:kaos:MediaWiki:ChatOptions/code.js',
        'u:shining-armor:MediaWiki:ChatTags/code.js',
        'u:dev:MediaWiki:ChatAnnouncements/code.js',
        'u:dev:MediaWiki:PrivateMessageAlert/code.js',
        'u:dev:MediaWiki:ChatTimestamps/code.js',
        'u:kocka:MediaWiki:Emoticons/code.js'
        ]
});



//$(function() {
//    $('.Rail').on('DOMNodeInserted', function(e) {
//        if (e.target.id.indexOf('priv-user-') > -1) {
//            $('<audio>')
//                .attr({
//                    id: 'ping',
//                    src: 'http://vignette1.wikia.nocookie.net/test-z/images/c/cf/Ping.ogg',
//                    autoplay: true
//                })
//                .appendTo('body');
//        }
//    });
 //   $('.WikiaPage').on('DOMNodeInserted', function(e) {
 //       if (e.target.className.indexOf('Chat') > -1) {
 //           $('.Chat').not($('#Chat_' + window.roomId)).each(function() //  {
//                $(this).on('DOMNodeInserted', function() {
//                    if ($(this).is(':hidden')/* || ($(this).is(' :visible') && document.visibilityState == 'hidden')*/) {
 //                       $('<audio>')
 //                           .attr({
//                                id: 'ping',
//                                src: 'http://vignette1.wikia.nocookie.net/test-z/images/c/cf/Ping.ogg',
//                                autoplay: true
//                            })
//                            .appendTo('body');
//                    }
//                });
//            });
//        }
//    });
//});