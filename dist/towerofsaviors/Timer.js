/**
 * Countdown
 *
 * @version 2.1
 *
 * @author Pecoes <http://c.wikia.com/wiki/User:Pecoes>
 * @author Asaba <http://dev.wikia.com/wiki/User:Asaba>
 *
 * Version 1 authors:
 * - Splarka <http://c.wikia.com/wiki/User:Splarka>
 * - Eladkse <http://c.wikia.com/wiki/User:Eladkse>
 *
 * documentation and examples at:
 * <http://dev.wikia.com/wiki/Countdown>
 */
 
/*jshint jquery:true, browser:true, devel:true, camelcase:true, curly:false, undef:true, bitwise:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, unused:true, regexp:true, strict:true, trailing:false */
/*global mediaWiki:true*/
 
;(function (module, mw, $, undefined) {
 
    'use strict';
 
    var translations = $.extend(true, {
        // English (English)
        en: {
            and: '',
            second: '',
            seconds: '',
            minute: '',
            minutes: '',
            hour: '',
            hours: '',
            day: 'd ',
            days: 'd '
        },
        // Chinese (中文)
        zh: {
            and: '',
            second: '',
            seconds: '',
            minute: '',
            minutes: '',
            hour: '',
            hours: '',
            day: '天 ',
            days: '天 '
        }
    }, module.translations || {}),
    i18n = translations[
        mw.config.get('wgContentLanguage')
    ] || translations.en;
 
    var countdowns = [];
 
    var NO_LEADING_ZEROS = 1;

    // function output modified from original
     function output (i, diff) {
        /*jshint bitwise:false*/
        var result = '', temp;
        temp = Math.floor(diff/86400);
        if (temp) result = temp + 'd ';
        result += ('0'+Math.floor(diff%86400/3600)).slice(-2);
        result += ':';
        result += ('0'+Math.floor(diff%3600/60)).slice(-2);
        countdowns[i].node.text(result);
    }
 
    // added option 'finish'
    function end(i) {
        var c = countdowns[i].node.parent();
        switch (c.attr('data-end')) {
            case 'remove':
                c.remove();
                return true;
            case 'stop':
                output(i, 0);
                return true;
            case 'finish':
                countdowns[i].node.text('Finished');
                return true;
            case 'finished':
                countdowns[i].node.text('Finished');
                return true;
            case 'started':
                countdowns[i].node.text('Started');
                return true;
            case 'toggle':
                var toggle = c.attr('data-toggle');
                if (toggle && $(toggle).length) {
                    $(toggle).css('display', 'inline');
                    c.css('display', 'none');
                    return true;
                }
                break;
            case 'callback':
                var callback = c.attr('data-callback');
                if (callback && $.isFunction(module[callback])) {
                    output(i, 0);
                    module[callback].call(c);
                    return true;
                }
                break;
         }
         countdowns[i].countup = true;
         output(i, 0);
         return false;
    }
 
    function update () {
        var now = Date.now();
        var countdownsToRemove = [];
        $.each(countdowns.slice(0), function (i, countdown) {
            var diff = Math.floor((countdown.date - now) / 1000);
            if (diff <= 0 && !countdown.countup) {
                if (end(i)) countdownsToRemove.push(i);
            } else {
                output(i, Math.abs(diff));
            }
        });
        var x;
        while((x = countdownsToRemove.pop()) !== undefined) {
            countdowns.splice(x, 1);
        }
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