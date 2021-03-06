window.BackToTopModern = true;
 
(window.dev = window.dev || {}).profileTags = { noHideTags: true };

(function (mw, $, window) {
 
    'use strict';
 
    if (mw.config.get('skin') !== 'oasis' || mw.config.get('wgNamespaceNumber')) return;
 
    var css, stylesheet, button, defer;
 
    function addStylesheet () {
        stylesheet =
        $('<style type="text/css" id="alt-stylesheet">' + css + '">')
        .appendTo(window.document.head || 'head');
        $.storage.set('altStylesheet', '1');
    }
 
    function loadStylesheet () {
        if (!css) {
            if (defer && defer.state() === 'pending') return;
            if (button && button.length) {
                button.prop('disabled', true);
            }
            defer = $.ajax({
                url: 'http://tardis.wikia.com/index.php?title=MediaWiki:Ns0.css&action=raw&ctype=text/css&maxage=3600&smaxage=3600',
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
 
    if ($.storage.get('altStylesheet')) {
        loadStylesheet();
    }
 
    $(function () {
        button =
 
        // this is the button:
        $('<li><a href="/index.php?title='+encodeURIComponent(wgPageName)+'" title="Change skins">'+ 'Change skin' + '</a></li>').appendTo('.page-header__contribution-buttons .wds-list')
        //.prependTo('.grid-4')
        //('.WikiaMainContent')
 
        .click(function () {
            var stylesheet = $('#alt-stylesheet');
            if (stylesheet.length) {
                stylesheet.remove();
                $.storage.del('altStylesheet');
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
 
}(mediaWiki, jQuery, window));
 
//Getting rid of comment button
$('a[data-id="comment"]').removeClass('comments');
 
//Temporarily turning off the show/hide error message
window.ShowHideDisplayWarning = false;