/* Pings the user when a PM is received */
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
            $('.Chat').eq(1).on('DOMNodeInserted', function() {
                if ($('.Chat').eq(1).is(':hidden')) {
                    $('<audio>')
                        .attr({
                            id: 'ping',
                            src: 'https://vignette.wikia.nocookie.net/test-z/images/c/cf/Ping.ogg',
                            autoplay: true
                        })
                        .appendTo('body');
                }
            });
        }
    });
});