/* [[DisplayTimer]] - add a UTC display clock with purge + null edit function */

/*jslint browser, single, long, unordered */
/*global jQuery, mediaWiki */

(function ($, mw) {
    'use strict';

    // default English messages - i18n-js will load other languages async
    var msg = {
        purge: 'Clearing server cache for the page…',
        purgefail: 'Clearing server cache failed',
        purgesuccess: 'Clearing server cache successful',
        nulledit: 'Editing the page…',
        nulleditfail: 'Edit failed',
        nulleditsuccess: 'Edit successful',
        tooltip: 'Clear the server cache for this page \nShift + Click: Edit this page without making any changes'
    };


    var clockNode;
    var updateClockInterval;

    function updateClock() {
        clockNode.textContent = new Date().toUTCString().slice(5, -3) + '(UTC)';
    }

    function stopClock(cancel) {
        if (cancel || clockNode.isConnected === false) {
            document.removeEventListener('visibilitychange', startClock);
        }

        clearInterval(updateClockInterval);
    }

    function startClock() {
        stopClock();

        if (document.visibilityState === 'visible') {
            updateClock();
            updateClockInterval = setInterval(updateClock, 1000);
        }
    }


    function nullEditPage() {
        clockNode.textContent = msg.nulledit;

        $.post(mw.util.wikiScript('api'), {
            action: 'edit',
            format: 'json',
            title: mw.config.get('wgPageName'),
            token: mw.user.tokens.get('csrfToken'),
            prependtext: ''
        }).always(function (data) {
            if (data.edit && data.edit.result === 'Success') {
                clockNode.textContent = msg.nulleditsuccess;
                location.reload(true);
            } else {
                clockNode.textContent = msg.nulleditfail;
            }
        });
    }

    function purgePage() {
        clockNode.textContent = msg.purge;

        $.post(mw.util.wikiScript('api'), {
            titles: mw.config.get('wgPageName'),
            action: 'purge',
            format: 'json'
        }).always(function (data) {
            if (data.purge && data.purge[0].purged === '') {
                clockNode.textContent = msg.purgesuccess;
                location.reload(true);
            } else {
                clockNode.textContent = msg.purgefail;
            }
        });
    }

    function clockClick(event) {
        event.preventDefault();

        if (!mw.config.get('wgIsArticle')) {
            // can't purge/edit if we're not on an article page
            return;
        }

        stopClock(true);

        if (event.shiftKey) {
            mw.loader.using('mediawiki.util', nullEditPage);
        } else {
            mw.loader.using('mediawiki.util', purgePage);
        }
    }


    function i18n() {
        if (!(window.dev && window.dev.i18n && window.dev.i18n.loadMessages)) {
            mw.loader.load('https://dev.fandom.com/load.php?mode=articles&articles=MediaWiki:I18n-js/code.js&only=scripts');
        }

        mw.hook('dev.i18n').add(function (i18njs) {
            i18njs.loadMessages('DisplayTimer').done(function (i18n) {
                // update messages object w/ loaded translations
                Object.keys(msg).forEach(function (key) {
                    msg[key] = i18n.msg(key).plain();
                });

                // update existing tooltip
                if (clockNode) {
                    clockNode.title = msg.tooltip;
                }
            });
        });
    }

    function main() {
        var $container = $('<li>').attr('id', 'displayTimer').css('direction', 'ltr');
        var $clock = $('<a>').on('click', clockClick).attr({
            title: msg.tooltip,
            href: '?action=purge'
        });

        clockNode = $clock[0];

        // remove any existing clock
        $(document.querySelectorAll('#displayTimer')).remove();

        switch (mw.config.get('skin')) {
        case 'oasis':
            $container.css({
                border: 0,
                marginInlineStart: 'auto',
                order: 1
            }).appendTo('.toolbar > .tools');
            break;
        case 'fandomdesktop':
            $container.css({
                minWidth: '15em',
                order: 1
            }).appendTo('.toolbar > .tools');
            $clock.css('margin', '0 auto');
            break;
        case 'hydra':
        case 'hydradark':
            $container = $('<div>').addClass('netbar-box right').insertAfter('#netbar .netbar-spacer');
            break;
        default: // vector, monobook, etc.
            $container.css('text-transform', 'none').prependTo('#p-personal ul');
        }

        $container.append($clock);

        startClock();
        document.addEventListener('visibilitychange', startClock);
    }

    $(main);
    i18n();
}(jQuery, mediaWiki));