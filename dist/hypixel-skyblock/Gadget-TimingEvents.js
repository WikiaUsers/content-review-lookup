/* jshint
    esversion: 5, esnext: false, forin: true, immed: true, indent: 4,
    latedef: true, newcap: true, noarg: true, undef: true, unused: true,
    browser: true, jquery: true, onevar: true, eqeqeq: true, multistr: true,
    maxerr: 999999, forin: false, -W082, -W084
*/
/* global mediaWiki, console */
(function (window, $, mw) {
    "use strict";
    var sbte, h;

    /** International Customization Standard Notice (ICC-NOTICE-V1)
     * FLAGS: <code-modified: false> <code-appended: false> <msg-verified: true>
     * Please update flags accordingly. Please refer to en:Project:INT#ICS for details.
     * 
     * Below are the localization settings that you can modify.
     */
    var msg = {
        eventStart: "Event starts",
        eventEnd: "Event ends",
        active: "ACTIVE: ",
        ended: "ENDED",
        noTime: "---",
        locale: "en-US",
        localeOpts: {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric"
        },
        routineNodef: "[SBTE] Routine element does not have data-routine definition.",
        formatDay: "$1 day", // placement: [NUMBER]
        formatDayPlural: "$1 days", // placement: [NUMBER]
        formatCountdown: "$1 $2" // placement: [DAY, TIME]
    };

    function findEl(pSection, query) {
        return pSection && $(pSection).find(query) || $(query);
    }

    function getMsg() {
        var m = msg[arguments[0]];
        if (!m)
            return "<msg." + arguments[0] + ">";
        for (var i = 1; i < arguments.length; i++)
            m = m.replaceAll("$" + i, arguments[i]);
        return m;
    }

    function main(pSection) {
        ////////////////////////////////////
        // Simple Timestamp Display
        ////////////////////////////////////
        var timestampEl = findEl(pSection, ".sbte-timestamp"),
            timestampElAlpha = findEl(pSection, ".sbte-timestamp-alpha");
        var setTimestamp = function (isAlpha, elem) {
            var skyDate = isAlpha ? new sbte.SkyRoutineAlpha(elem.data("skydate")) : new sbte.SkyRoutine(elem.data("skydate"));
            var elHov = $("<span class=\"hov\">");
            var elNohov = $("<span class=\"nohov\">");
            elem.addClass("hover-switch");
            elem.append(elHov, elNohov);
            elNohov.text(skyDate.date.toLocaleString(msg.locale, msg.localeOpts) /* + " (" + skyDate.sbstString + ")" */ );
            elHov.text(skyDate.sbstString);
        };
        timestampEl.each(function () {
            setTimestamp(false, $(this));
        });
        timestampElAlpha.each(function () {
            setTimestamp(true, $(this));
        });
        ////////////////////////////////////
        // Countdown Widget
        ////////////////////////////////////
        var countdownEl = findEl(pSection, ".sbte-routine"),
            countdownElAlpha = findEl(pSection, ".sbte-routine-alpha");
        var setCountdown = function (isAlpha, elem) {
            var routineInput = elem.data("routine");
            if (!routineInput) {
                console.warn(msg.routineNodef);
                return;
            }
            var myRoutine = isAlpha ? new sbte.SkyRoutineAlpha(routineInput) : new sbte.SkyRoutine(routineInput);
            var cdNameEl = elem.find(".sbte-cd-name");
            var cdToEl = elem.find(".sbte-cd-to");
            var cdToElHov = $("<span class=\"hov\">");
            var cdToElNohov = $("<span class=\"nohov\">");
            cdToEl.addClass("hover-switch");
            cdToEl.append(cdToElHov, cdToElNohov);
            var cdTimerEl = elem.find(".sbte-cd-timer");
            var countDownFn = function (tout, seconds, countToDate, countFromDate, state) {
                if (seconds <= 0)
                    return;
                var s = seconds % 60;
                var m = Math.floor(seconds % h.RATIOS[h.UNITS.hour] / h.RATIOS[h.UNITS.minute]);
                var hrs = Math.floor(seconds % h.RATIOS[h.UNITS.day] / h.RATIOS[h.UNITS.hour]);
                var d = Math.floor(seconds / h.RATIOS[h.UNITS.day]);
                var timestring = getMsg("formatCountdown", getMsg(d > 1 ? "formatDayPlural" : "formatDay", d), h.fmtTime(hrs, m, s));
                cdToElNohov.text(countToDate.toString());
                cdToElHov.text(countToDate.date.toLocaleString(msg.locale, msg.localeOpts));
                if (state === h.STATES.WAITING) {
                    cdNameEl.text(msg.eventStart);
                    cdTimerEl.removeClass("sbte-routine-ongoing sbte-routine-stopped").addClass("sbte-routine-waiting");
                    cdTimerEl.text(timestring);
                } else {
                    cdNameEl.text(msg.eventEnd);
                    cdTimerEl.removeClass("sbte-routine-waiting sbte-routine-stopped").addClass("sbte-routine-ongoing");
                    cdTimerEl.text(msg.active + timestring);
                }
            };
            myRoutine.addEvent(h.STATES.WAITING, function () {
                myRoutine.startCountdown(countDownFn);
            });
            myRoutine.addEvent(h.STATES.ONGOING, function () {
                myRoutine.startCountdown(countDownFn);
            });
            myRoutine.addEvent(h.STATES.STOPPED, function () {
                cdNameEl.text(msg.eventStart);
                cdToEl.text(msg.noTime);
                cdTimerEl.removeClass("sbte-routine-waiting sbte-routine-ongoing").addClass("sbte-routine-stopped");
                cdTimerEl.text(msg.ended);
            });
            myRoutine.trigger();
        };
        countdownEl.each(function () {
            setCountdown(false, $(this));
        });
        countdownElAlpha.each(function () {
            setCountdown(true, $(this));
        });
        ////////////////////////////////////
        // SkyBlock Clock
        ////////////////////////////////////
        var CLOCK_FIELDS = {
            h24: ".hour24",
            h12: ".hour12",
            sec: ".second",
            min: ".minute",
            minActual: ".minute-actual",
            ampm: ".ampm",
            day: ".day",
            dayOrd: ".day-ordinal",
            season: ".season",
            seasonShort: ".season-short",
            month: ".month",
            year: ".year"
        };
        var updateFields = function (skydate, myFields) {
            ////////////
            // Time
            ////////////
            myFields.sec.text(skydate.sbstSecond.toString().padStart(2, "0"));
            myFields.h24.text(skydate.sbstHour.toString().padStart(2, "0"));
            myFields.h12.text((skydate.sbstHour % 12 === 0 ? 12 : skydate.sbstHour % 12).toString().padStart(2, "0"));
            // minute shown in-game is rounded down to 10th place:
            myFields.min.text((Math.floor(skydate.sbstMinute / 10) * 10).toString().padStart(2, "0"));
            // actual minute:
            myFields.minActual.text(skydate.sbstMinute.toString().padStart(2, "0"));
            myFields.ampm.text(h.FMTMSG.AMPM[skydate.sbstHour < 12 ? 0 : 1].toLowerCase());
            ////////////
            // Date
            ////////////
            myFields.day.text(skydate.sbstDate);
            myFields.dayOrd.text(skydate.sbstOrdinalDate);
            myFields.season.text(skydate.sbstFullMonth);
            myFields.seasonShort.text(skydate.sbstShortMonth);
            myFields.month.text(skydate.sbstMonth + 1);
            myFields.year.text(skydate.sbstFullYear);
        };
        var hasClockField = findEl(pSection, ".sbte-clock").length > 0;
        var hasClockFieldAlpha = findEl(pSection, ".sbte-clock-alpha").length > 0;
        if (hasClockField || hasClockFieldAlpha) {
            // Instantiate objects
            var fields = {},
                fieldsAlpha = {},
                currentSkyDate = new sbte.SkyDate(),
                currentSkyDateAlpha = new sbte.SkyDateAlpha();
            // Record all fields
            Object.keys(CLOCK_FIELDS).forEach(function (key) {
                fields[key] = findEl(pSection, ".sbte-clock " + CLOCK_FIELDS[key]);
                fieldsAlpha[key] = findEl(pSection, ".sbte-clock-alpha " + CLOCK_FIELDS[key]);
            });
            // Update function
            if (hasClockField)
                updateFields(currentSkyDate, fields);
            if (hasClockFieldAlpha)
                updateFields(currentSkyDateAlpha, fieldsAlpha);
            // Runs every SBST Minute: Math.floor(new SkyDuration("1m -S").valueOf() / RATIOS.magic * 1000)
            setInterval(function () {
                if (hasClockField)
                    updateFields(currentSkyDate.setTime(), fields);
                if (hasClockFieldAlpha)
                    updateFields(currentSkyDateAlpha.setTime(), fieldsAlpha);
            }, 833);
            // Hidden by default to avoid awkward text before script runs, so make sure to show it
            findEl(pSection, ".sbte-clock, .sbte-clock-alpha").show().css("visibility", "visible");
        }
    }

    // Run on content load
    mw.hook("hsbwiki.sbte").add(function (sbtelib) {
        sbte = sbtelib;
        h = sbte.helpers;
        mw.hook("wikipage.content").add(main);
    });

})(window, jQuery, mediaWiki);