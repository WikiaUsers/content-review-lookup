/**
 * Implement a timezone-adjusted clock
 * . Looks for elements with class "js-tzclock"
 * . Supports any timezone, not just the user's or UTC
 * . Supports multiple clocks per page
 * . Supports optional daylight saving time
 *
 * Configuration is adapted from tzdata format
 * . Optional comments begin with # (pound/octothorpe)
 * . Spaces in strings must use _ (underscore)
 * .   Underscore is replaced with a space when running
 * . + (plus) is optional for positive time offsets
 * . Basic zone definition must come before any rules
 * . Rules, if there are any, must be in chronological order
 * . NAME is location name displayed in clock (any string)
 * . UTCOFF is offset from UTC ([+|-]hh[:mm])
 * . ZONE is the timezone name (any string)
 * . IN is the month name for a rule (3-letter in English)
 * . ON is the date (numerical date, lastDay, or Day>=date)
 * .   If used, Day is 3-letter in English
 * . AT is the standard time at which the rule takes effect (24-hour)
 * . SAVE is the amount of time added to standard time (hh[:mm])
 * . LETTERS is the zone name when the rule is in effect (any string)
 *
 * Example clock configurations:
 *
 * <div class="js-tzclock"><nowiki>
 * # NAME          UTCOFF  ZONE
 * New_York        -5:00   EST
 * # IN    ON      AT      SAVE    LETTERS
 * Mar     Sun>=8  2:00    1       EDT # 2nd Sunday in March
 * Nov     Sun>=1  2:00    0       EST # 1st Sunday in November
 * </nowiki></div>
 *
 * <div class="js-tzclock"><nowiki>
 * # NAME          UTCOFF  ZONE
 * London          0:00    GMT
 * # IN    ON      AT      SAVE    LETTERS
 * Mar     lastSun 1:00    1       BST # last Sunday in March
 * Oct     lastSun 1:00    0       GMT # last Sunday in October
 * </nowiki></div>
 *
 * <div class="js-tzclock"><nowiki>
 * # NAME          UTCOFF  ZONE
 * Tokyo           9:00    JST # no daylight time in Japan
 * </nowiki></div>
 *
 * <div class="js-tzclock"><nowiki>
 * # NAME          UTCOFF  ZONE
 * Adelaide        +9:30   CST
 * # IN    ON      AT      SAVE    LETTERS
 * Apr     Sun>=1  2:00    0       CST # 1st Sunday in April
 * Oct     Sun>=1  2:00    1       CDT # 1st Sunday in October
 * </nowiki></div>
 *
 * <nowiki> ... </nowiki> may not be essential
 *   for all clock configurations, but it is recommended
 *   to stop MediaWiki from interfering with them
 */
;(function ($) {
    'use strict';

    var msg;
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
                $(e).empty().text(msg('error').plain());
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
                thetime = (new Date(time * 1000)).toUTCString()
                    .replace(/Sun, |Mon, |Tue, |Wed, |Thu, |Fri, |Sat, /, '') // remove day name
                    .replace(/\s\d\d\d\d/, ',')                               // remove year
                    .replace(/:\d\d\sGMT/, '');                               // remove seconds and GMT
            } else {
                thetime = (new Date(time * 1000)).toUTCString()
                    .replace(/\d{4}/, '$&,')                // add comma after year
                    .replace(/ 0/g, ' ')                    // no leading zero on date/hour
                    .replace(/UT|GMT/, '(' + c.zone + ')'); // "local" zone designation
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
            // Avoid nesting <div> in <span> - for valid HTML but also
            // to allow embedding the clock inline
            spanDom = String.prototype.concat(
                '<span class="js-tzclock-wrap">',
                    '<span class="js-tzclock-lctn"></span>',
                    '<span class="js-tzclock-time"></span>',
                '</span>'
            ),
            e, i;

        if (data.length) {
            data.addClass('loaded');
            getConfig(data);
            if (clock.length) {
                // init formats with names
                for ( i = 0; i < clock.length; ++i ) {
                    e = clock[i].e.empty().append(
                    	clock[i].e.prop('tagName') === 'SPAN' ? spanDom : dom);
                    // See comment about $().text() at getConfig()
                    $('.js-tzclock-lctn', e).text(clock[i].name);
                }
                // fake the first tick
                setTimeout(onTick);
            }
        }
    }

    mw.hook('dev.i18n').add(function(i18n) {
        i18n.loadMessages('TZclock').done(function(i18no) {
            msg = i18no.msg;
		    // hook into dynamic content changes
		    $.when( mw.loader.using('mediawiki.util'), $.ready ).then(function() {
		        init(mw.util.$content);
		    });
		    mw.hook('wikipage.content').add(init);
        });
    });
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });

})(jQuery);