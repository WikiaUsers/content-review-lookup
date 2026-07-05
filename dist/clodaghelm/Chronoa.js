/**
 * @name Chronoa
 * @desc Creates simple countdowns
 * @auth [[User:ClodaghelmC]]
 */

(function ($, mw) {
    'use strict';

    function initCountdown($content) {
        $content.find('.chronoa:not(.handled)').each(function() {
            const container = $(this);
            const targetDate = new Date(container.data('date')).getTime();
            const endText = container.data('display') || "Event ended";
            
            container.find('.chronoa-timer').css('display', 'flex');
            container.addClass('handled');

            const update = () => {
                const now = new Date().getTime();
                const diff = targetDate - now;

                if (diff <= 0) {
                    container.html(`<div class="chronoa-end">${mw.html.escape(endText)}</div>`);
                    return;
                }

                container.find('.d').text(String(Math.floor(diff / 86400000)).padStart(2, '0'));
                container.find('.h').text(String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0'));
                container.find('.m').text(String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0'));
                container.find('.s').text(String(Math.floor((diff % 60000) / 1000)).padStart(2, '0'));
            };

            setInterval(update, 1000);
            update();
        });
    }

    mw.hook('wikipage.content').add(initCountdown);
}(jQuery, mediaWiki));