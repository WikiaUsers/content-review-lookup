// ============================================================
// displayTimer
// ============================================================
 
/*jslint browser, single, long */
/*global $, mw, importArticle */
 
$(function () {
    'use strict';
 
    // Double run protection.
    if ($('#displayTimer, #showdate, #DisplayClockJS, #display-timer').length) {
        return;
    }
 
    // default English messages - i18n-js will load other languages async
    var msg = {
        nulledit: 'Null editing the page…',
        nulleditfail: 'Null edit failed',
        nulleditsuccess: 'Null edit successful',
        tooltip: 'Purge the server cache for this page \nShift + Click: Null edit this page'
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
        clearInterval(updateDateInterval);
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
 
    if (mw.config.get('wgIsArticle')) {
        $node.click(function (event) {
            // Null edit when shift key is held
            if (event.shiftKey) {
                event.preventDefault();
                mw.loader.using('mediawiki.util', nullEditPage);
            }
        });
    }
 
    if (mw.config.get('skin') === 'oasis') {
        var oasisCSS = document.dir === 'rtl'
            ? {'float': 'left', 'border-left': '0'}
            : {'float': 'right', 'border-right': '0'};
        $parent.css(oasisCSS).appendTo('.toolbar > .tools');
    } else {
        $parent.css('text-transform', 'none').prependTo('#p-personal ul');
    }
    updateDate();
    updateDateInterval = setInterval(updateDate, 1000);
    $parent = null;
 
 
    // load translated messages via i18n-js
    if (!(window.dev && window.dev.i18n)) {
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