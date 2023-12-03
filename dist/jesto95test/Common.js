/* Any JavaScript here will be loaded for all users on every page load. */

(function(mw) {
    'use strict';
    mw.hook('wikipage.content').add(function($content) {
        var ele = $content.find('.unix:not(.loaded)');
        for (var i=0; i<ele.length; i++) {
            var ele2 = ele[i];
            ele2.classList.add('loaded');
            var code = ele2.textContent;
            if (!Number(code)) return console.log('[UNIX] Not a valid unix code.');
            ele2.textContent = new Date(code * 1000).toLocaleString();
        }
    });
})(window.mediaWiki);