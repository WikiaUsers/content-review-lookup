;(function (window, $, mw) {
    'use strict';
    window.dev = window.dev || {};
    if (window.dev.Clock) {
        return;
    }
    window.dev.Clock = true;
 
    function Clock() {
        return new Date().toLocaleTimeString();
    }

    function clockHook($content, original) {
        if (
            !$content ||
            (
                $content === mw.util.$content &&
                !original
            )
        ) {
            return;
        }

        $content.find('.Clock').text(Clock);
    }

    clockHook(mw.util.$content, true);
    mw.loader.using('mediawiki.util').then(function () {
        mw.hook('wikipage.content').add(clockHook);
    });
}(this, jQuery, mediaWiki));