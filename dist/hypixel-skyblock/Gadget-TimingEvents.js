/* jshint
    esversion: 5, esnext: false, forin: true, immed: true, indent: 4,
    latedef: true, newcap: true, noarg: true, undef: true, unused: true,
    browser: true, jquery: true, onevar: true, eqeqeq: true, multistr: true,
    maxerr: 999999, forin: false, -W082, -W084
*/
/* global mediaWiki, console */
(function (window, $, mw) {
    "use strict";
    var sbte, helpers;

    /** International Customization Standard Notice (ICC-NOTICE-V1)
     * FLAGS: <code-modified: false> <code-appended: false> <msg-verified: true>
     * 
     * Below are the localization settings ("settings") that you can modify.
     * 
     * Please update flags accordingly. Please refer to PAGE for details.
     */
    var msg = {
        eventStart: "Event starts",
        eventEnd: "Event ends",
        active: "ACTIVE",
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
        console: {
            routineNodef: "[SBTE] Routine element does not have data-routine definition."
        },
        skyblockClock: {
            ampm: {}, // override here: { am: "...", pm: "..." }
            displayedMonths: [], // override here: [ ... ] (12 items) in the order of SkyBlock Months
        },
        skyDateMakeString: function (mySkyDate) {
            // customize the SkyDate String here if you want
            return mySkyDate.sbstString;
        },
        countdownMakeString: function (s, m, h, d) {
            return d + (d > 1 ? " days " : " day ") + sbte.helpers.fmtTime(h, m, s);
        }
    };

    function main(pSection) {
        ////////////////////////////////////
        // Countdown Widget
        ////////////////////////////////////
        var timestampEl = pSection && $(pSection).find(".sbte-timestamp") || $(".sbte-timestamp"),
            countdownEl = pSection && $(pSection).find(".sbte-routine") || $(".sbte-routine");
        timestampEl.each(function () {
            var elem = $(this);
            var skyDate = new sbte.SkyDate(elem.data("skydate"));
            elem.html(skyDate.date.toLocaleString(msg.locale, msg.localeOpts) + "<br />" + msg.skyDateMakeString(skyDate));
        });
        countdownEl.each(function () {
            var elem = $(this);
            var routineInput = elem.data("routine");
            if (!routineInput) {
                console.warn(msg.console.routineNodef);
                return;
            }
            var cdNameEl = elem.find(".sbte-cd-name");
            var cdToEl = elem.find(".sbte-cd-to");
            var cdTimerEl = elem.find(".sbte-cd-timer");
            var myRoutine = new sbte.SkyRoutine(routineInput);
            var countDownFn = function (seconds, tout, countToDate, state) {
                if (seconds <= 0)
                    return;
                var s = seconds % 60;
                var m = Math.floor(seconds % helpers.RATIOS[helpers.UNITS.hour] / helpers.RATIOS[helpers.UNITS.minute]);
                var h = Math.floor(seconds % helpers.RATIOS[helpers.UNITS.day] / helpers.RATIOS[helpers.UNITS.hour]);
                var d = Math.floor(seconds / helpers.RATIOS[helpers.UNITS.day]);
                var timestring = msg.countdownMakeString(s, m, h, d);
                cdToEl.html(countToDate.toString());
                if (state === helpers.STATES.WAITING) {
                    cdNameEl.html(msg.eventStart);
                    cdTimerEl.html("<span class=\"sbte-routine-waiting\">" + timestring + "</span>");
                } else {
                    cdNameEl.html(msg.eventEnd);
                    cdTimerEl.html("<span class=\"sbte-routine-ongoing\">" + msg.active + ": " + timestring + "</span>");
                }
            };
            myRoutine.addEvent(helpers.STATES.WAITING, function () {
                myRoutine.startCountdown(countDownFn);
            });
            myRoutine.addEvent(helpers.STATES.ONGOING, function () {
                myRoutine.startCountdown(countDownFn);
            });
            myRoutine.addEvent(helpers.STATES.STOPPED, function () {
                cdNameEl.html(msg.eventStart);
                cdToEl.html(msg.noTime);
                cdTimerEl.html("<span class=\"sbte-routine-stopped\">" + msg.ended + "</span>");
            });
            myRoutine.trigger();
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
            month: ".month",
            year: ".year"
        };
        if ($(".sbte-clock").length > 0) {
            var myFields = {};
            // record all fields
            Object.keys(CLOCK_FIELDS).forEach(function (key) {
                myFields[key] = $(".sbte-clock " + CLOCK_FIELDS[key]);
            });
            // Update function
            var skydate;
            var setCurrentDate = function () {
                skydate = new sbte.SkyDate();
                ////////////
                // Time
                ////////////
                myFields.sec.html(skydate.sbstSecond.toString().padStart(2, "0"));
                myFields.h24.html(skydate.sbstHour.toString().padStart(2, "0"));
                myFields.h12.html((skydate.sbstHour % 12 === 0 ? 12 : skydate.sbstHour % 12).toString().padStart(2, "0"));
                // minute shown in-game is rounded down to 10th place:
                myFields.min.html((Math.floor(skydate.sbstMinute / 10) * 10).toString().padStart(2, "0"));
                // actual minute:
                myFields.minActual.html(skydate.sbstMinute.toString().padStart(2, "0"));
                myFields.ampm.html(skydate.sbstHour < 12 ? msg.skyblockClock.ampm.am || "am" : msg.skyblockClock.ampm.pm || "pm");
                ////////////
                // Date
                ////////////
                myFields.day.html(skydate.sbstDate);
                myFields.dayOrd.html(skydate.sbstOrdinalDate);
                myFields.season.html(msg.skyblockClock.displayedMonths[skydate.sbstMonth] || skydate.sbstFullMonth);
                myFields.month.html(skydate.sbstMonth + 1);
                myFields.year.html(skydate.sbstFullYear);
            };
            setCurrentDate();
            setInterval(setCurrentDate, 833); // runs every SBST Minute: Math.floor(new SkyDuration("1m -S").valueOf() / RATIOS.magic * 1000)
            $(".sbte-clock").show().css("visibility", "visible"); // Hidden by default to avoid awkward text before script runs, so make sure to show it
        }
    }

    // Run on content load
    mw.hook("hsbwiki.sbte").add(function (sbtelib) {
        sbte = sbtelib;
        helpers = sbte.helpers;
        mw.hook("wikipage.content").add(main);
    });

})(window, jQuery, mediaWiki);