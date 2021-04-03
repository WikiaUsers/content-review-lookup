/* [[DisplayTimer]] - adds a UTC display clock with purge + null edit function */

/*jslint browser, single, long */
/*global $, mw */

$(function () {
    'use strict';

    // Double run protection.
    if ($('#displayTimer, #showdate, #DisplayClockJS, #display-timer').length) {
        return;
    }

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


    var updateDateInterval;
    var $parent = $('<li>').attr('id', 'displayTimer').css('direction', 'ltr');
    var $node = $('<a>').attr({
        title: msg.tooltip,
        href: '?action=purge'
    }).appendTo($parent);

    function updateDate() {
        $node.text(new Date().toUTCString().slice(5, -3) + '(UTC)');
    }

    function nullEditPage() {
        $node.text(msg.nulledit);
        $.post(mw.util.wikiScript('api'), {
            action: 'edit',
            format: 'json',
            title: mw.config.get('wgPageName'),
            token: mw.user.tokens.get('editToken'),
            prependtext: ''
        }).always(function (data) {
            if (data.edit && data.edit.result === 'Success') {
                $node.text(msg.nulleditsuccess);
                location.reload(true);
            } else {
                $node.text(msg.nulleditfail);
            }
        });
    }

    function purgePage() {
        $node.text(msg.purge);
        $.post(mw.util.wikiScript('api'), {
            titles: mw.config.get('wgPageName'),
            action: 'purge',
            format: 'json'
        }).always(function (data) {
            if (data.purge && data.purge[0].purged === '') {
                $node.text(msg.purgesuccess);
                location.reload(true);
            } else {
                $node.text(msg.purgefail);
            }
        });
    }

    $node.on('click', function (event) {
        event.preventDefault();

        if (!mw.config.get('wgIsArticle')) {
            // can't purge/edit if we're not on an article page
            return;
        }

        clearInterval(updateDateInterval);

        if (event.shiftKey) {
            mw.loader.using('mediawiki.util', nullEditPage);
        } else {
            mw.loader.using('mediawiki.util', purgePage);
        }
    });

    if (mw.config.get('skin') === 'oasis') {
        var oasisCSS = {
            border: 0,
            marginInlineStart: 'auto',
            order: 1
        };

        // for oasis 1.19
        oasisCSS.float = document.dir === 'rtl' ? 'left' : 'right';

        $parent.css(oasisCSS).appendTo('.toolbar > .tools');
    } else {
        $parent.css('text-transform', 'none').prependTo('#p-personal ul');
    }

    updateDate();
    updateDateInterval = setInterval(updateDate, 1000);
    $parent = null;


    // load translated messages via i18n-js
    if (!(window.dev && window.dev.i18n && window.dev.i18n.loadMessages)) {
        mw.loader.load("https://dev.fandom.com/load.php?mode=articles&only=scripts&articles=MediaWiki:I18n-js/code.js");
    }

    mw.hook('dev.i18n').add(function (i18njs) {
        i18njs.loadMessages('DisplayTimer').done(function (i18n) {
            // update messages object w/ loaded translations
            Object.keys(msg).forEach(function (key) {
                msg[key] = i18n.msg(key).plain();
            });

            // update existing tooltip
            $node.attr('title', msg.tooltip);
        });
    });
});