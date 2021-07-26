/****************
 * Modified version of TZclock ( @author [[User:Saftzie]] )
 * Check the source code at [[w:c:dev:MediaWiki:TZclock.js]]
 * This version displays the time (i) using a Spanish locale and (ii) a preferred format for the stringified date with 12h format
 * If you're looking for this feature, please make sure [[w:c:dev:TZclock]] isn't what you exactly need, you shouldn't need to copy this modified version in most cases.
 * ---------------------------------
 * Versión modificada de TZclock ( @autor [[User:Saftzie]] )
 * Consulta el código original en [[w:c:dev:MediaWiki:TZclock.js]]
 * La versión muestra el tiempo (i) usando español y (ii) un formato de texto preferido, incluyendo el formato de 12 horas
 * Si buscas esta funcionalidad, asegúrate de que [[w:c:dev:TZclock]] no es exactamente lo que necesitas, no deberías de necesitar copiar esta versión modificada en la mayoría de casos.
*****************/

(function ($) {
    'use strict';

    var
        clock = []; // all clock data

    // calculate day of week using Zeller's algorithm
    // 0 = Saturday, ..., 6 = Friday
    function zeller(d, m, y) {
        var
            Y = y - (m < 3 ? 1 : 0),
            c = Math.floor(Y / 100),
            w;

        m += (m < 3) ? 12 : 0;
        y = Y % 100;
        w = (d + Math.floor(13 * (m + 1) / 5) + y +
            Math.floor(y / 4) + Math.floor(c / 4) - 2 * c) % 7;
        return (w < 0) ? w + 7 : w;
    }

    // convert [+|-]h[:m] to seconds
    function parseHM(s) {
        var
            sign = s.charAt(0) === '-' ? -1 : 1;

        s = (s.replace(/[+\-]/, '') + ':0').split(':');
        return sign * (parseInt(s[0], 10) * 60 + parseInt(s[1], 10)) * 60;
    }

    // parse the daylight saving rule for the given year
    // return epoch seconds (local time)
    function parseRule(year, rule) {
        var
            inMonth = rule[0],
            onDay = rule[1],
            atHour = rule[2],
            week = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            m = $.inArray(inMonth, [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ]) + 1,
            last = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1],
            d;

        if ((m === 2) &&
            (((year % 100 !== 0) && (year % 4 === 0)) || (year % 400 === 0))) {
            // leap year, in the unlikely event daylight saving switches in Feb
            last = 29;
        }
        if (/^\d+$/.test(onDay)) {
            // pure number
            d = parseInt(onDay, 10);
        } else if (onDay.substr(0, 4) === 'last') {
            // last day of week of month
            d = last;
            d -= (zeller(d, m, year) + 7 - $.inArray(onDay.substr(4), week)) % 7;
        } else if (onDay.substr(3, 2) === '>=') {
            // day of week at/after date
            d = parseInt(onDay.substr(5), 10);
            d += ($.inArray(onDay.substr(0, 3), week) + 7 - zeller(d, m, year)) % 7;
        } else {
            // error
            return;
        }
        // ISO format the date and return epoch seconds
        // atHour is local time, so the return is local time, despite the Z
        return Date.parse(
            year.toString() + '-' + ('0' + m.toString()).substr(-2) +
                '-' + ('0' + d.toString()).substr(-2) + 'T00:00:00Z'
        ) / 1000 + atHour;
    }

    // read tz configs from clock elements
    // populate the clock global object
    // data = jQuery collection of clock elements
    // NB: strings inserted into the DOM with $().text()
    //   CANNOT be escaped per OWASP XSS recommendations,
    //   because $().text() uses document.createTextNode,
    //   which does not unescape the entities
    // NB: text nodes are unparsed by the DOM engine
    //   hence there is no XSS or injection risk
    // NB: literal strings that use $().text are
    //   name (0), zone (2), and letters (7 & 12)
    function getConfig(data) {
        var
            i;

        data.each(function (_, e) {
            var
                text = $(e).text()
                    .replace(/#.*?(\n|$)/g, '$1') // remove all comments
                    .replace(/\s+/g, ' ')         // compress whitespace
                    .replace(/^\s|\s$/g, '')      // trim
                    .split(' '),                  // tokenize
                c;

            // process tokens, sanitizing them along the way
            if ((text.length === 3) || (text.length === 13)) {
                // basic zone definition
                clock.push({
                    e: $(e),
                    name: text[0]           // location description
                        .replace(/_/g, ' '),  // translate spaces
                    utcoff: parseHM(text[1] // [+|-]hh:mm UTC offset
                        .replace(/[^+\-\d:]/g, '')
                    ),
                    zone: text[2]           // zone designator
                        .replace(/_/g, ' '),  // translate spaces
                });
                c = clock[clock.length - 1];
                if (text.length === 13) {
                    // daylight time rules
                    c.year = 1; // truthy, but purposefully wrong
                    c.rule1 = [
                        text[3]         // in month (Jan - Dec)
                            .replace(/[^a-zA-Z]/g, ''),
                        text[4]         // on day (number, last, >=)
                            .replace(/[^a-zA-Z>=\d]/g, ''),
                        parseHM(text[5] // at time hh:mm
                            .replace(/[^\d:]/g, '')
                        )
                    ];
                    c.rule2 = [
                        text[8]          // in month (Jan - Dec)
                            .replace(/[^a-zA-Z]/g, ''),
                        text[9]          // on day (number, last, >=)
                            .replace(/[^a-zA-Z>=\d]/g, ''),
                        parseHM(text[10] // at time hh:mm
                            .replace(/[^\d:]/g, '')
                        )
                    ];
                    c.save1 = parseHM(text[6]  // daylight adjust hh:mm
                        .replace(/[^\d:]/g, '')
                    );
                    c.save2 = parseHM(text[11] // daylight adjust hh:mm
                        .replace(/[^\d:]/g, '')
                    );
                    c.letters1 = text[7]   // zone designator
                        .replace(/_/g, ' '); // translate spaces
                    c.letters2 = text[12]  // zone designator
                        .replace(/_/g, ' '); // translate spaces
                }
            } else {
                // error
                $(e).empty().text('Incorrect number of data for clock');
            }
        });
    }

    // handle timer event
    function onTick() {
        var
            now = Math.floor(Date.now() / 1000), // epoch in seconds
            time, year, i, c;

        for ( i = 0; i < clock.length; ++i ) {
            c = clock[i];
            time = now + c.utcoff; // local epoch
            year = (new Date(time * 1000)).getUTCFullYear();  // Date() takes msec
            if (c.year) {
                if (year !== c.year) {
                    // Happy New Year (maybe)
                    // (re)parse the rules for the calendar year
                    c.year = year;
                    c.switch1 = parseRule(year, c.rule1);
                    c.switch2 = parseRule(year, c.rule2);
                }
                // apply the rules
                if ((time >= c.switch1) && (time < c.switch2)) {
                    time += c.save1;
                    c.zone = c.letters1;
                } else {
                    time += c.save2;
                    c.zone = c.letters2;
                }
            }
            // mostly RFC-822/RFC-1123 time string
            // See comment about $().text() at getConfig()
            var thetime;
            if (window.TZclockSimpleFormat) {
                thetime = (new Date(time * 1000)).toLocaleString( 'es', { year: 'numeric', month: 'long', day: 'numeric', hour12: true, hour: 'numeric', minute: 'numeric', timeZone: 'UTC' } )
                    .replace( ' 0:', ' 12:' ); // Edge issue with hour12
            } else {
                thetime = (new Date(time * 1000)).toLocaleString( 'es', { year: 'numeric', month: 'long', day: 'numeric', hour12: true, hour: 'numeric', minute: 'numeric', timeZone: 'UTC' } )
                    .replace( ' 0:', ' 12:' ); // Edge issue with hour12
            }
            
            $('.js-tzclock-time', c.e).text(thetime);
        }
        // set timeout for next tick
        setTimeout(onTick, 1100 - Date.now() % 1000);
    }

    // main routine
    // look for signature classes, init, and run
    function init($content) {
        var
            data = $content.find('.js-tzclock:not(.loaded)'),
            dom = String.prototype.concat(
                '<div class="js-tzclock-wrap">',
                    '<div class="js-tzclock-lctn"></div>',
                    '<div class="js-tzclock-time"></div>',
                '</div>'
            ),
            e, i;

        if (data.length) {
            data.addClass('loaded');
            getConfig(data);
            if (clock.length) {
                // init formats with names
                for ( i = 0; i < clock.length; ++i ) {
                    e = clock[i].e.empty().append(dom);
                    // See comment about $().text() at getConfig()
                    $('.js-tzclock-lctn', e).text(clock[i].name);
                }
                // fake the first tick
                setTimeout(onTick);
            }
        }
    }

    // hook into dynamic content changes
    mw.loader.using('mediawiki.util').then(function() {
        init(mw.util.$content);
    });
    mw.hook('wikipage.content').add(init);
}(jQuery));