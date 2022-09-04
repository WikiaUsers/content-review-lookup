/*
 * Toggle debug mode using a link in the toolbar.
 *
 * @author Cqm <https://dev.wikia.com/User:Cqm>
 * @version 0.4
 */

/* jshint latedef:true, devel:false */

;(function ($, mw) {
    'use strict';

    //Double run protection.
    if (window.ToggleDebugModeLoaded) return;
    window.ToggleDebugModeLoaded = true;

    function init () {
        var href,
            debug = mw.config.get('debug');

        if (debug) {
            href = location.href.replace(/[?&]debug=.+?([&#]|$)/, '$1');
        } else {
            href =
                location.pathname +
                location.search +
                (location.search ? '&' : '?') +
                'debug=1' +
                location.hash;
        }

        window.dev.i18n.loadMessages('ToggleDebugMode').done(function (i18n) {
            $('#WikiaBarWrapper .tools').append(
                $('<li>', {
                    class: 'dev-debugmode'
                }).append(
                    $('<a>', {
                        href: href,
                        id: 'dev-debugmode-toggle',
                        text: i18n.msg(debug ? 'disable-debug-mode' : 'enable-debug-mode').escape()
                    })
                )
            );
        });
    }

    mw.hook('dev.i18n').add(init);
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });

}(window.jQuery, window.mediaWiki));