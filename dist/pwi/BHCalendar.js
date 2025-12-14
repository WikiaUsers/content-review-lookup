// ========================================================
//  PWI BH Rotation Calendar — Multi-Server
//  Author: ChatGPT + Lorizza
//  Shows rotation for Dawnglory (UTC+1), Etherblade/TT (UTC-8),
//  and Tideswell (UTC-5), based on server date only.
// ========================================================
console.log('BH BH-calendar script loaded (final UTC-based multi-server version)');

(function () {
    'use strict';

    // ========================================================
    //  CONFIG & ROTATION
    // ========================================================

    // Base rotation start:
    // On this date, BH = Artifact globally (per server date).
    // Month index: 11 = December (0=Jan)
    var baseRotationDate = new Date(Date.UTC(2025, 11, 1)); // Dec 1 2025 UTC

    // Rotation: Artifact -> Weapon -> Armor -> repeat
    var rotationEvents = [
        {
            name: 'Artifact',
            cssClass: 'pwi-bh-event-artifact',
            url: 'https://pwi.fandom.com/wiki/Relic_of_Wonder#Relic_of_Wonder:_Artifact',
            icon: 'https://pwi.fandom.com/wiki/Special:FilePath/Relic_of_Wonder_Artifact.png'
        },
        {
            name: 'Weapon',
            cssClass: 'pwi-bh-event-weapon',
            url: 'https://pwi.fandom.com/wiki/Relic_of_Wonder#Relic_of_Wonder:_Weapon',
            icon: 'https://pwi.fandom.com/wiki/Special:FilePath/Relic_of_Wonder_Weapon.png'
        },
        {
            name: 'Armor',
            cssClass: 'pwi-bh-event-armor',
            url: 'https://pwi.fandom.com/wiki/Relic_of_Wonder#Relic_of_Wonder:_Armor',
            icon: 'https://pwi.fandom.com/wiki/Special:FilePath/Relic_of_Wonder_Armor.png'
        }
    ];

    // Server time zones
    // ⚠ Keeps consistent year-round for now (DST optional later)
    var servers = [
        { label: 'DA',       utcOffset: +1 },
        { label: 'ET / TT', utcOffset: -8 },
        { label: 'TI',       utcOffset: -5 }
    ];

    var monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    var dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    var MS_PER_DAY = 86400000;


    // ========================================================
    //  TIMEZONE & ROTATION HELPERS
    // ========================================================

    var nowLocal = new Date(); // Viewer local but we only use UTC values

    function getUTCDateOnly(date) {
        return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
    }

    // Get the server's current date (yyyy-mm-dd) using its UTC offset
    function getServerDate(utcOffset) {
        var nowUTC = nowLocal.getTime() + nowLocal.getTimezoneOffset() * 60000;
        var serverDateTime = new Date(nowUTC + utcOffset * 3600000);
        return getUTCDateOnly(serverDateTime);
    }

    function getEventForDate(dateUTC) {
        var base = getUTCDateOnly(baseRotationDate);
        var d = getUTCDateOnly(dateUTC);
        var deltaDays = Math.floor((d - base) / MS_PER_DAY);

        return (deltaDays >= 0)
            ? rotationEvents[deltaDays % rotationEvents.length]
            : null;
    }

    function getEventForServer(utcOffset) {
        var date = getServerDate(utcOffset);
        return getEventForDate(date);
    }


    // ========================================================
    //  TODAY’S BH — MULTI SERVER
    // ========================================================

    function buildTodayServersHTML() {
        var html = '<div class="pwi-bh-today-banner">';
        html += '<div class="pwi-bh-today-title">Today’s BH:</div>';

        servers.forEach(function (s) {
            var ev = getEventForServer(s.utcOffset);
            html += '<div class="pwi-bh-today-row">';
            html += '<span class="pwi-bh-today-server">' + s.label + ':</span> ';

            if (!ev) {
                html += '<span class="pwi-bh-today-none">No BH (pre-rotation)</span>';
            } else {
                html += '<a href="' + ev.url + '">';
                if (ev.icon) {
                    html += '<img class="pwi-bh-today-icon" src="' + ev.icon + '" alt="' + ev.name + ' icon">';
                }
                html += '<span class="' + ev.cssClass + '">' + ev.name + '</span>';
                html += '</a>';
            }
            html += '</div>';
        });

        html += '</div>';
        return html;
    }

    function fillTodayOnlyBlocks() {
        var blocks = document.getElementsByClassName('pwi-bh-today');
        if (!blocks.length) return;

        var content = buildTodayServersHTML();
        Array.prototype.forEach.call(blocks, function (el) {
            el.innerHTML = content;
        });
    }


    // ========================================================
    //  MONTHLY CALENDAR
    // ========================================================

    var calYear = nowLocal.getUTCFullYear();
    var calMonth = nowLocal.getUTCMonth();
    var calDay = nowLocal.getUTCDate();

    function buildCalendarHTML() {
        var first = new Date(Date.UTC(calYear, calMonth, 1));
        var startingWeekday = (first.getUTCDay() + 6) % 7;
        var daysInMonth = new Date(Date.UTC(calYear, calMonth + 1, 0)).getUTCDate();

        var html = '';

        html += buildTodayServersHTML();

        html += '<div class="pwi-bh-calendar-wrapper">';
        html += '<div class="pwi-bh-calendar-header">';
        html += monthNames[calMonth] + ' ' + calYear;
        html += '</div>';

        html += '<table class="pwi-bh-calendar-table"><thead><tr>';
        dayNames.forEach(function (d) { html += '<th>' + d + '</th>'; });
        html += '</tr></thead><tbody><tr>';

        for (var i = 0; i < startingWeekday; i++) {
            html += '<td class="pwi-bh-calendar-empty"></td>';
        }

        var day = 1;
        for (i = startingWeekday; i < 7; i++) {
            html += buildDayCell(day++);
        }
        html += '</tr>';

        while (day <= daysInMonth) {
            html += '<tr>';
            for (i = 0; i < 7; i++) {
                html += (day <= daysInMonth)
                    ? buildDayCell(day++)
                    : '<td class="pwi-bh-calendar-empty"></td>';
            }
            html += '</tr>';
        }

        html += '</tbody></table></div>';
        return html;
    }

    function buildDayCell(day) {
        var dateUTC = new Date(Date.UTC(calYear, calMonth, day));
        var ev = getEventForDate(dateUTC);

        var isToday = (day === calDay);

        var html = '<td class="pwi-bh-calendar-day' +
               (isToday ? ' pwi-bh-calendar-day-today' : '') +
               '">';

        html += '<div class="pwi-bh-calendar-day-number">' + day + '</div>';

        if (ev) {
            html += '<ul class="pwi-bh-calendar-events">';
            html += '<li class="' + ev.cssClass + '">';
            html += '<a href="' + ev.url + '">';
            if (ev.icon) {
                html += '<img class="pwi-bh-event-icon" src="' + ev.icon + '" alt="">';
            }
            html += ev.name + '</a></li></ul>';
        }

        html += '</td>';
        return html;
    }


    // ========================================================
    //  INIT
    // ========================================================

    function init() {
        fillTodayOnlyBlocks();

        var calendars = document.getElementsByClassName('pwi-bh-calendar');
        if (!calendars.length) return;

        var html = buildCalendarHTML();
        Array.prototype.forEach.call(calendars, function (el) {
            el.innerHTML = html;
        });
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        init();
    } else {
        document.addEventListener('DOMContentLoaded', init);
    }
})();