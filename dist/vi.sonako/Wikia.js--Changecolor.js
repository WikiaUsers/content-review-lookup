/* ==================
   COLOUR CHANGER 1.0
   ==================
   by [[user:Pecoes]]
   see http://community.wikia.com/wiki/Thread:477388
   for conceptual design discussion
   ================== */
 
   (function (mw, $, window) {
 
    'use strict';
 
    if (mw.config.get('skin') !== 'oasis' || mw.config.get('wgNamespaceNumber')) return;
 
    var css, stylesheet, button, defer;
 
    function addStylesheet () {
        stylesheet =
        $('<style type="text/css" id="alt-stylesheet">' + css + '">')
        .appendTo(window.document.head || 'head');
        mw.storage.set('altStylesheet', true);
    }
 
    function loadStylesheet () {
        if (!css) {
            if (defer && defer.state() === 'pending') return;
            if (button && button.length) {
                button.prop('disabled', true);
            }
            defer = $.ajax({
                url: '/index.php?title=MediaWiki:Ns0.css&action=raw&ctype=text/css&maxage=0&smaxage=0',
                dataType: 'text',
                async: false,
                cache: true
            })
            .done(function (text) {
                css = text;
                addStylesheet();
                if (button && button.length) {
                    button.prop('disabled', false);
                }
            });
        } else {
            addStylesheet();
        }
    }
 
    if (!!mw.storage.get('altStylesheet')) {
        loadStylesheet();
    }
 
    $(function () {
        button =
 
        // this is the button:
        $('<input>')
        .attr({type: "button", value: "Giao diện đêm", title: "Giao diện đêm", class: "color-changer"})
        .prependTo($(".page-header__contribution-buttons"))
        .click(function () {
            var stylesheet = $('#alt-stylesheet');
            if (stylesheet.length) {
                stylesheet.remove();
                mw.storage.set('altStylesheet', false);
            } else {
                loadStylesheet();
            }
            // this BS code forces stupid browsers to repaint:
            var div = $('<div>').appendTo(window.document.body);
            window.setTimeout(function(){ div.remove(); }, 0);
        });
 
        if (defer && defer.state() === 'pending') {
            button.prop('disabled', true);
        }
    });
 
}(mw, $, window));