// __NOWYSIWYG__ <source lang="javascript">
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

/*jshint jquery:true, browser:true, devel:true, camelcase:true, curly:false, undef:true, bitwise:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, unused:true, regexp:true, strict:true, trailing:false */
/*global mediaWiki:true*/

;(function (module, mw, $) {
    
    'use strict';
    
    var translations = $.extend(true, {
        en: {
            and: '',
            s: 's',
            m: 'm ',
            h: 'h ',
            d: 'd ',
        },
        fr: {
            and: 'et',
            second: 'seconde',
            seconds: 'secondes',
            minute: 'minute',
            minutes: 'minutes',
            hour: 'heure',
            hours: 'heures',
            day: 'jour',
            days: 'jours'
        },
        es: {
            and: 'y',
            second: 'segundo',
            seconds: 'segundos',
            minute: 'minuto',
            minutes: 'minutos',
            hour: 'hora',
            hours: 'horas',
            day: 'día',
            days: 'días'
        },
        ca: {
            and: 'i',
            second: 'segon',
            seconds: 'segons',
            minute: 'minut',
            minutes: 'minuts',
            hour: 'hora',
            hours: 'hores',
            day: 'dia',
            days: 'dies'
        },
        'pt-br': {
            and: 'e',
            second: 'segundo',
            seconds: 'segundos',
            minute: 'minuto',
            minutes: 'minutos',
            hour: 'hora',
            hours: 'horas',
            day: 'dia',
            days: 'dias'

        },
        pt: {
            and: 'e',
            second: 'segundo',
            seconds: 'segundos',
            minute: 'minuto',
            minutes: 'minutos',
            hour: 'hora',
            hours: 'horas',
            day: 'dia',
            days: 'dias'

        },
        de: {
            and: 'und',
            second: 'Sekunde',
            seconds: 'Sekunden',
            minute: 'Minute',
            minutes: 'Minuten',
            hour: 'Stunde',
            hours: 'Stunden',
            day: 'Tag',
            days: 'Tage'
        },
        it: {
            and: 'e',
            second: 'secondo',
            seconds: 'secondi',
            minute: 'minuto',
            minutes: 'minuti',
            hour: 'ora',
            hours: 'ore',
            day: 'giorno',
            days: 'giorni'
        },
        nl: {
            and: 'en',
            second: 'seconde',
            seconds: 'seconden',
            minute: 'minuut',
            minutes: 'minuten',
            hour: 'uur',
            hours: 'uur',
            day: 'dag',
            days: 'dagen'
        },
        pl: {
            and: 'i',
            second: 'sekunda',
            seconds: 'sekund(y)',
            minute: 'minuta',
            minutes: 'minut(y)',
            hour: 'godzina',
            hours: 'godzin(y)',
            day: 'dzień',
            days: 'dni'
        },
        sr: {
            and: 'i',
            second: 'sekundu',
            seconds: 'sekunde/-i',
            minute: 'minutu',
            minutes: 'minute/-a',
            hour: 'sat',
            hours: 'sata/-i',
            day: 'dan',
            days: 'dana'
        },
        zh: {
            and: ' ',
            second: '秒',
            seconds: '秒',
            minute: '分',
            minutes: '分',
            hour: '小时',
            hours: '小时',
            day: '天',
            days: '天'
        },
        ru: {
            and: 'и', 
            second: 'секунда', 
            seconds: 'секунд', 
            minute: 'минута', 
            minutes: 'минут', 
            hour: 'час', 
            hours: 'часов', 
            day: 'день', 
            days: 'дней'
        },
        hu: {
            and: 'és',
            second: 'másodperc',
            seconds: 'másodperc',
            minute: 'perc',
            minutes: 'perc',
            hour: 'óra',
            hours: 'óra',
            day: 'nap',
            days: 'nap'
        },
        ms: {
            and: 'dan',
            second: 'saat',
            seconds: 'saat',
            minute: 'minit',
            minutes: 'minit',
            hour: 'jam',
            hours: 'jam',
            day: 'hari',
            days: 'hari'
        },
        ja: {
            and: '',
            second: '秒',
            seconds: '秒',
            minute: '分',
            minutes: '分',
            hour: '時間',
            hours: '時間',
            day: '日',
            days: '日'
        }
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
        parts.unshift(delta + ' ' + i18n[delta === 1 ? 's' : 's']);
        diff = Math.floor(diff / 60);
        delta = diff % 60;
        parts.unshift(delta + ' ' + i18n[delta === 1 ? 'm' : 'm']);
        diff = Math.floor(diff / 60);
        delta = diff % 24;
        parts.unshift(delta + ' ' + i18n[delta === 1 ? 'h'   : 'h'  ]);
        diff = Math.floor(diff / 24);
        parts.unshift(diff  + ' ' + i18n[diff  === 1 ? 'd'    : 'd'   ]);
        result = parts.pop();
           {
            while (parts.length && parts[0][0] === '0') {
                parts.shift();
            }
        }
        if (parts.length) {
            result = parts.join(' ') + ' ' + i18n.and + ' ' + ' ' + result;
        }
        countdowns[i].node.text(result);
    }
    
    function end(i) {
        var c = countdowns[i].node.parent();
        switch (c.attr('data-end')) {
            case 'remove':
                c.remove();
                countdowns.splice(i, 1);
                return;
            case 'stop':
                output(i, 0);
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
        countdowns[i].countup = false;
        output(i, 0);
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
//</source>