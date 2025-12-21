// ========================================================
//  PWI BH Rotation Calendar â€” Multi-Server
//  Author: ChatGPT + Lorizza
//  Shows BH rotation for Dawnglory (UTC+1), Etherblade/TT (UTC-8),
//  and Tideswell (UTC-5), based on server date.
// ========================================================

(function () {
    'use strict';

    // ========================================================
    //  CONFIG & ROTATION
    // ========================================================

    // Base rotation start:
    // On this date, BH = Artifact globally (per server date).
    // Month index: 11 = December (0=Jan)
    // DEFAULT base rotation (fallback if no config found)
	var defaultBaseRotationDate = new Date(Date.UTC(2025, 11, 1)); // Dec 1 2025 UTC

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
    // UtcOffset is consistent year-round, using timeZone for DST-proof time
    var servers = [
        { label: 'DA',		utcOffset: +1,	timeZone: 'Europe/Berlin' },
        { label: 'ET / TT',	utcOffset: -8,	timeZone: 'America/Los_Angeles' },
        { label: 'TI',		utcOffset: -5,	timeZone: 'America/New_York' }
    ];

    var monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    var dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	var MS_PER_DAY = 86400000;
    
    // ========================================================
    //  DATE CONFIG LOAD HELPERS
    // ========================================================

    function parseISODateToUTC(iso) {
	    // iso = "YYYY-MM-DD"
	    if (!iso) return null;
	    var parts = iso.split('-');
	    if (parts.length !== 3) return null;
	    var y = parseInt(parts[0], 10);
	    var m = parseInt(parts[1], 10) - 1; // 0-based
	    var d = parseInt(parts[2], 10);
	    if (isNaN(y) || isNaN(m) || isNaN(d)) return null;
	    return new Date(Date.UTC(y, m, d));
	}
	
	function getConfiguredBaseRotationDate() {
	    var span = document.getElementById('pwi-bh-base-date');
	    if (!span) {
	        return defaultBaseRotationDate;
	    }
	
	    var iso = span.getAttribute('data-bh-basedate');
	    var parsed = parseISODateToUTC(iso);
	    return parsed || defaultBaseRotationDate;
	}
	
	// Settable baseRotationDate. Set in Template:BHCalendarConfig
	var baseRotationDate = getConfiguredBaseRotationDate();


    // ========================================================
    //  TIMEZONE & ROTATION HELPERS
    // ========================================================

    var nowLocal = new Date(); // Viewer local
    // For testing purposes
    //var nowLocal = new Date(Date.parse("Dec 15 2025 00:00:00 GMT+0100")); // DA 0
    //var nowLocal = new Date(Date.parse("Dec 15 2025 00:00:00 GMT-0800")); // ET 0
    //var nowLocal = new Date(Date.parse("Dec 15 2025 00:00:00 GMT-0500")); // TI 0
    
    function getServerDateWithTZ(timeZone) {
	    // Get parts in that timezone
	    var fmt = new Intl.DateTimeFormat('en-US', {
	        timeZone: timeZone,
	        year: 'numeric',
	        month: 'numeric',
	        day: 'numeric'
	    });
	
	    var parts = fmt.formatToParts(nowLocal);
	    var y = 0, m = 0, d = 0;
	
	    parts.forEach(function (p) {
	        if (p.type === 'year')  y = parseInt(p.value, 10);
	        if (p.type === 'month') m = parseInt(p.value, 10);
	        if (p.type === 'day')   d = parseInt(p.value, 10);
	    });
	
	    // Return a "date only" in UTC for rotation math
	    return new Date(Date.UTC(y, m - 1, d));
	}
	
	function getEventForDate(dateUTC) {
        var base = baseRotationDate;
        var d = dateUTC
        var deltaDays = Math.floor((d - base) / MS_PER_DAY);

        return (deltaDays >= 0)
            ? rotationEvents[deltaDays % rotationEvents.length]
            : null;
    }
    
    function getEventForServerTZ(timeZone) {
	    var serverDate = getServerDateWithTZ(timeZone);
	    return getEventForDate(serverDate);
	}


    // ========================================================
    //  TODAYâ€™S BH â€” MULTI SERVER
    // ========================================================

    function buildServerBhHTML() {
        var html = '<div class="pwi-bh-today-banner">';
        html += '<div class="pwi-bh-today-title">Today\'s BH:</div>';
        //html += '<div> debug-local: '+ nowLocal +'</div>';

        servers.forEach(function (s) {
            var ev = getEventForServerTZ(s.timeZone); // Changed to work with DST timezones
            var dt = getServerDateWithTZ(s.timeZone);
            //html += '<div> debug-server date: '+ dt +'</div>';
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

    // ========================================================
    //  MONTHLY CALENDAR
    // ========================================================

    var calYearUTC = nowLocal.getUTCFullYear();
    var calMonthUTC = nowLocal.getUTCMonth();
    var calDayLocal = nowLocal.getDate();

    function buildCalendarHTML() {
        var first = new Date(Date.UTC(calYearUTC, calMonthUTC, 1));
        var startingWeekday = (first.getUTCDay() + 6) % 7;
        var daysInMonth = new Date(Date.UTC(calYearUTC, calMonthUTC + 1, 0)).getUTCDate();

        var html = '';

        html += '<div class="pwi-bh-calendar-wrapper">';
        html += '<div class="pwi-bh-calendar-header">';
        html += monthNames[calMonthUTC] + ' ' + calYearUTC;
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
        var dateUTC = new Date(Date.UTC(calYearUTC, calMonthUTC, day));
        var ev = getEventForDate(dateUTC);

        var isToday = (day === calDayLocal);

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

	function initPwiBhCalendarWidget() {
        var bhtodayblocks = document.getElementsByClassName('pwi-bh-today');
        if (!bhtodayblocks.length) return;

        var content = buildServerBhHTML();
        Array.prototype.forEach.call(bhtodayblocks, function (el) {
            el.innerHTML = content;
        });
    }
	
    function initPwiBhCalendar() {
        initPwiBhCalendarWidget();

        var bhcalendarblocks = document.getElementsByClassName('pwi-bh-calendar');
        if (!bhcalendarblocks.length) return;

        var content = buildCalendarHTML();
        Array.prototype.forEach.call(bhcalendarblocks, function (el) {
            el.innerHTML = content;
        });
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initPwiBhCalendar();
    } else {
		document.addEventListener('DOMContentLoaded', initPwiBhCalendar);
    }
})();