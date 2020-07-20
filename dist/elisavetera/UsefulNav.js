// Miscellaneous
$(function() {
    var buttons = {
        monobook: {
            href: 'useskin=monobook'
        },
        wikiamobile: {
            href: 'useskin=wikiamobile'
        },
        vector: {
            href: 'useskin=monobook&usevector=1&usesitecss=0'
        },
        qqx: {
            href: 'uselang=qqx'
        },
        debug: {
            href: 'debug=true'
        },
        test: {
            id: 'test-mode',
            text: (mw.config.get('wgContentReviewTestModeEnabled') ? 'exit' : 'enter') + ' test mode',
            handler: function() {
                if (mw.config.get('wgContentReviewTestModeEnabled')) {
                    $.nirvana.sendRequest({
                        controller: 'ContentReviewApiController',
                        method: 'disableTestMode',
                        callback: function(e) {
                            if (e.status) {
                                window.location.reload();
                            }
                        }
                    });
                } else {
                    $.nirvana.sendRequest({
                        controller: 'ContentReviewApiController',
                        method: 'enableTestMode',
                        data: {
                            pageId: mw.config.get('wgArticleId'),
                            wikiId: mw.config.get('wgCityId'),
                            editToken: mw.user.tokens.get('editToken')
                        },
                        callback: function(e) {
                            if (e.status) {
                                window.location.reload();
                            }
                        }
                    });
                }
            }
        }
    };
        $('.global-navigation .hubs-links').html('');
        for (var i in buttons) {
            $('.global-navigation .hubs-links').append(
                $('<a>')
                    .attr({
                        href: (buttons[i].href ? mw.config.get('wgArticlePath').replace(/\$1/g, (mw.config.get('wgPageName') + (!!window.location.search ? window.location.search + '&' : '?') + buttons[i].href + (!!window.location.hash ? window.location.hash : ''))) : ''),
                        class: 'globalnav-button',
                        id: (buttons[i].id ? buttons[i].id : '')
                    })
                    .text(buttons[i].text || i)
            );
            if (buttons[i].id && buttons[i].handler && typeof buttons[i].handler == 'function') {
                $('#' + buttons[i].id).bind('click', buttons[i].handler);
            }
        }
    // load pseudo-vector on usevector=1
    if (mw.config.get('skin') == 'monobook' && $.getUrlVar('usevector')) {
        importStylesheetPage('Pseudo-Vector/code.css', 'dev');
    }
});