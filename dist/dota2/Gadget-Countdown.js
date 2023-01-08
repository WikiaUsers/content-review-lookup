/**
 * Countdown
 *
 * Version: 2.0.1
 *
 * Rewrite again by Dotalim0204
 * Rewrite by Pecoes
 * Original script by Splarka + Eladkse
 *
 * documentation and examples at:
 * http://dev.wikia.com/wiki/Countdown
 */
 
/*jshint jquery:true, browser:true, es5:true, devel:true, camelcase:true, curly:false, undef:true, bitwise:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, unused:true, regexp:true, strict:true, trailing:false */
/*global mediaWiki:true*/
 
    var countdowns = [];
 
    var NO_LEADING_ZEROS = 1;
 
    function output (i, diff) {
        /*jshint bitwise:false*/
        var delta, result, parts = []; 

        delta = diff % 60;
        if (delta<1)
        {
            parts.unshift();
        }
        else if (delta<10)
        {
            parts.unshift('0'+delta+'s');
        }
        else
        {
            parts.unshift(delta+'s');
        }
        diff = Math.floor(diff / 60);
        delta = diff % 60;
        if (delta<1)
        {
            parts.unshift();
        }
        else if (delta<10)
        {
            parts.unshift('0'+delta+'m');
        }
        else
        {
            parts.unshift(delta+'m');
        }
        diff = Math.floor(diff / 60);
        delta = diff % 24;
        if (delta<1) 
        {
            parts.unshift();
        }
        else if (delta<10)
        {
            parts.unshift('0'+delta+'h');
        }
        else
        {
            parts.unshift(delta+'h ');
        }
        diff = Math.floor(diff / 24);
        if (diff<1) 
        {
            parts.unshift();
        }
        else
        {
            parts.unshift(diff+'d ');
        }
        result = parts.pop();
        if (countdowns[i].opts & NO_LEADING_ZEROS) {
             while (parts.length && parts[0][0] === '0') {
                parts.shift();
            }
        }
        if (parts.length) {
            result = parts.join(' ') + ' ' + ' ' + result;
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

var toggleMapListSetup = function() {
    var btn = $('a[id^="collapseButton"]');

    btn.each(function() {
        var table = $(this).closest('table');
        var m = $('.maprow', table);

        if (m.length) {
            m.hide(); // Collapse maps by default

            var span = $('<span>', {
                class: 'mapsCollapseButton',
                css: {
                    'font-weight': 'normal',
                    'float': 'right',
                    'margin-right': '7px',
                    'cursor': 'pointer'
                }
            });

            table.data('maps-collapsed', true);

            var toggleMaps = function() {
                table.find('.maprow').toggle();
                table.data('maps-collapsed', !table.data('maps-collapsed'));

                $(this).text(function(i, txt) {
                    return txt.replace(/\+|−/, function(a) {
                        return a === '+' ? '−' : '+';
                    });
                });
            }

            var a = $('<a>+maps</a>').click(toggleMaps);

            span.append('[', a, ']');
            $(this).parent().after(span);

            if (table.hasClass('uncollapsed-maps')) {
                a.trigger('click');
            }
        }
    });
};