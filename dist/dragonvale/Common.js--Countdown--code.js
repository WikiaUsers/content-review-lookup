/**
 * Countdown
 *
 * Version: 2.0
 *
 * Rewrite by Pecoes
 * Original script by Splarka + Eladkse
 *
 * documentation and examples at:
 * http://dev.wikia.com/wiki/Countdown
 */
 
/*jshint jquery:true, browser:true, es5:true, devel:true, camelcase:true, curly:false, undef:true, bitwise:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, unused:true, regexp:true, strict:true, trailing:false */
/*global mediaWiki:true*/
 
;(function (module, mw, $) {
 
    'use strict';
 
    var translations = $.extend(true, {
        en: {
            and: 'and',
            second: 'second',
            seconds: 'seconds',
            minute: 'minute',
            minutes: 'minutes',
            hour: 'hour',
            hours: 'hours',
            day: 'day',
            days: 'days'
        },
    }, module.translations || {}),
    i18n = translations[
        mw.config.get('wgContentLanguage')
    ] || translations.en;
 
    var countdowns = [];
 
    var NO_LEADING_ZEROS = 1;
 
    function output (i, diff) {
        /*jshint bitwise:false*/
        var delta, result, parts = [];
        delta = diff % 60;
        parts.unshift(delta + ' ' + i18n[delta === 1 ? 'second' : 'seconds']);
        diff = Math.floor(diff / 60);
        delta = diff % 60;
        parts.unshift(delta + ' ' + i18n[delta === 1 ? 'minute' : 'minutes']);
        diff = Math.floor(diff / 60);
        delta = diff % 24;
        parts.unshift(delta + ' ' + i18n[delta === 1 ? 'hour'   : 'hours'  ]);
        diff = Math.floor(diff / 24);
        parts.unshift(diff  + ' ' + i18n[diff  === 1 ? 'day'    : 'days'   ]);
        result = parts.pop();
        if (countdowns[i].opts & NO_LEADING_ZEROS) {
            while (parts.length && parts[0][0] === '0') {
                parts.shift();
            }
        }
        if (parts.length) {
            result = parts.join(', ') + ' ' + i18n.and + ' ' + result;
        }
        countdowns[i].node.text(result);
    }
 
    function end(i) {
        var c = countdowns[i].node.parent();
        switch (c.attr('data-end')) {
            case 'countup':
                countdowns[i].countup = true;
                output(i, 0);
                return;
            case 'remove':
                c.remove();
                countdowns.splice(i, 1);
                return;
            case 'toggle':
                var toggle = c.attr('data-toggle');
                if (toggle && $(toggle).length) {
                    $(toggle).css('display', 'inline');
                    c.css('display', 'none');
                    countdowns.splice(i, 1);
                    return;
                }
                break;
            case 'callback':
                var callback = c.attr('data-callback');
                if (callback && $.isFunction(module[callback])) {
                    output(i, 0);
                    countdowns.splice(i, 1);
                    module[callback].call(c);
                    return;
                }
                break;
        }
 
        /* Sylvandyr - Swapped "stop" to default behavior instead of countup.
           Reason: Countdowns implanted by templates won't be able to find the
           desired HTML elements on the page itself. A <verbatim></verbatim> can
           be used to insert HTML elements directly on the page, but the values
           can't be simply requested with a wiki Template.
        */
        output(i, 0);
        countdowns.splice(i, 1);
    }
 
    function update () {
        var now = Date.now();
        $.each(countdowns.slice(0), function (i, countdown) {
            var diff = Math.floor((countdown.date - now) / 1000);
            if (diff <= 0 && !countdown.countup) {
                end(i);
            } else {
                output(i, Math.abs(diff));
            }
        });
        if (countdowns.length) {
            window.setTimeout(function () {
                update();
            }, 1000);
        }
    }
 
    function getOptions (node) {
        /*jshint bitwise:false*/
        var text = node.parent().attr('data-options'),
            opts = 0;
        if (text) {
            if (/no-leading-zeros/.test(text)) {
                opts |= NO_LEADING_ZEROS;
            }
        }
        return opts;
    }
 
    $(function () {
        var countdown = $('.countdown');
        if (!countdown.length) return;
        $('.nocountdown').css('display', 'none');
        countdown
        .css('display', 'inline')
        .find('.countdowndate')
        .each(function () {
            var $this = $(this),
                date = (new Date($this.text())).valueOf();
            if (isNaN(date)) {
                $this.text('BAD DATE');
                return;
            }
            countdowns.push({
                node: $this,
                opts: getOptions($this),
                date: date,
            });
        });
        if (countdowns.length) {
            update();
        }
    });
 
}(window.countdownTimer = window.countdownTimer || {}, mediaWiki, jQuery));
//