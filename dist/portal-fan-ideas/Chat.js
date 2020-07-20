/*  Monchoman's chat hacks */
 
importScriptPage("MediaWiki:Chat.js/ChatHacks.js", "pvzcc"); 

importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');

importArticles({
  type: 'script',
  articles: [
      'u:kocka:MediaWiki:Emoticons.js',
      'u:dev:MediaWiki:!mods/code.js'
       ]
});

$(function() {
    $('.Rail').on('DOMNodeInserted', function(e) {
        if (e.target.id.indexOf('priv-user-') > -1) {
            $('<audio>')
                .attr({
                    id: 'ping',
                    src: 'https://vignette.wikia.nocookie.net/test-z/images/c/cf/Ping.ogg',
                    autoplay: true
                })
                .appendTo('body');
        }
    });
    $('.WikiaPage').on('DOMNodeInserted', function(e) {
        if (e.target.className.indexOf('Chat') > -1) {
            $('.Chat').not($('#Chat_' + window.roomId)).each(function() {
                $(this).on('DOMNodeInserted', function() {
                    if ($(this).is(':hidden')/* || ($(this).is(':visible') && document.visibilityState == 'hidden')*/) {
                        $('<audio>')
                            .attr({
                                id: 'ping',
                                src: 'https://vignette.wikia.nocookie.net/test-z/images/c/cf/Ping.ogg',
                                autoplay: true
                            })
                            .appendTo('body');
                    }
                });
            });
        }
    });
});
importScriptPage('ChatAnnouncements/code.js','dev');