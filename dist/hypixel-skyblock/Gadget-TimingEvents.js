/* jshint
    esversion: 5, esnext: false, forin: true, immed: true, indent: 4,
    latedef: true, newcap: true, noarg: true, undef: true, unused: true,
    browser: true, jquery: true, onevar: true, eqeqeq: true, multistr: true,
    maxerr: 999999, forin: false, -W082, -W084
*/
/* global mediaWiki, console, importArticle */
(function (window, $, mw) {
    "use strict";
    var sbte, h;
    window.hsbwiki = window.hsbwiki || {};
    if (window.hsbwiki.timingEventsLoaded)
        return;
    window.hsbwiki.timingEventsLoaded = true;

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
    msg.localeOptsUtc = Object.assign(Object.assign({}, msg.localeOpts), {
        timezone: "UTC"
    }); // -> make a copy of localeOpts, then override the "timezone" field

    /* Maintain a private stack */
    // Runs every SBST Minute: Math.floor(new SkyDuration("1m -S").valueOf() / RATIOS.magic * 1000)
    var updateStack = [];

    function updateStackAdd(callback) {
        if (updateStack.length === 0)
            setInterval(function () {
                for (var i in updateStack)
                    updateStack[i]();
            }, 833);
        callback();
        updateStack.push(callback);
    }

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
        // 1. SkyBlock Clock
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
        if (findEl(pSection, ".sbte-clock").length > 0) {
            // Instantiate objects
            var fields = {},
                fieldsAlpha = {},
                requiresMain = false,
                requiresAlpha = false,
                currentSkyDate,
                currentSkyDateAlpha;
            // Record all fields
            Object.keys(CLOCK_FIELDS).forEach(function (key) {
                fields[key] = findEl(pSection, ".sbte-clock " + CLOCK_FIELDS[key] + ":not(.alpha)");
                fieldsAlpha[key] = findEl(pSection, ".sbte-clock " + CLOCK_FIELDS[key] + ".alpha");
                requiresMain = requiresMain || fields[key].length > 0;
                requiresAlpha = requiresAlpha || fieldsAlpha[key].length > 0;
            });
            // Update function
            if (requiresMain) {
                currentSkyDate = new sbte.SkyDate();
                updateFields(currentSkyDate, fields);
            }
            if (requiresAlpha) {
                currentSkyDateAlpha = new sbte.SkyDateAlpha();
                updateFields(currentSkyDateAlpha, fieldsAlpha);
            }
            updateStackAdd(function () {
                if (requiresMain)
                    updateFields(currentSkyDate.setTime(), fields);
                if (requiresAlpha)
                    updateFields(currentSkyDateAlpha.setTime(), fieldsAlpha);
            });
            // Hidden by default to avoid awkward text before script runs, so make sure to show it
            findEl(pSection, ".sbte-clock").css("visibility", "visible");
        }
        ////////////////////////////////////
        // 2. Simple Timestamp Display
        ////////////////////////////////////
        var timestampEl = findEl(pSection, ".sbte-timestamp:not(.sbte-timestamp .sbte-timestamp)");
        timestampEl.each(function () {
            var elem = $(this);
            var skyDate = elem.hasClass("alpha") ? new sbte.SkyDateAlpha(elem.data("skydate")) : new sbte.SkyDate(elem.data("skydate"));
            elem.find(".utc").text(skyDate.date.toLocaleString(msg.locale, msg.localeOptsUtc));
            elem.find(".local").text(skyDate.date.toLocaleString(msg.locale, msg.localeOpts));
            elem.find(".sbst").text(skyDate.sbstString);
        });
        ////////////////////////////////////
        // 3. Countdown Widget
        ////////////////////////////////////
        var countdownEl = findEl(pSection, ".sbte-routine:not(.sbte-routine .sbte-routine)");
        var setCountdown = function (elem, fields) {
            var countDownFn = function (stopCountdown, seconds, countToDate, countFromDate, state) {
                if (seconds <= 0)
                    return;
                var s = seconds % 60;
                var m = Math.floor(seconds % h.RATIOS[h.UNITS.hour] / h.RATIOS[h.UNITS.minute]);
                var hrs = Math.floor(seconds % h.RATIOS[h.UNITS.day] / h.RATIOS[h.UNITS.hour]);
                var d = Math.floor(seconds / h.RATIOS[h.UNITS.day]);
                var timestring = getMsg("formatCountdown", getMsg(d > 1 ? "formatDayPlural" : "formatDay", d), h.fmtTime(hrs, m, s));
                fields.cdUtc.text(countToDate.date.toLocaleString(msg.locale, msg.localeOptsUtc));
                fields.cdLocal.text(countToDate.date.toLocaleString(msg.locale, msg.localeOpts));
                fields.cdSbst.text(countToDate.toString());
                if (state === h.STATES.WAITING) {
                    fields.cdName.text(msg.eventStart);
                    fields.cdTimer.removeClass("cd-ongoing cd-stopped").addClass("cd-waiting");
                    fields.cdTimer.text(timestring);
                } else {
                    fields.cdName.text(msg.eventEnd);
                    fields.cdTimer.removeClass("cd-waiting cd-stopped").addClass("cd-ongoing");
                    fields.cdTimer.text(msg.active + timestring);
                }
                elem.css("visibility", "visible");
            };
            fields.routine.addEvent(h.STATES.WAITING, function () {
                fields.routine.startCountdown(countDownFn);
            });
            fields.routine.addEvent(h.STATES.ONGOING, function () {
                fields.routine.startCountdown(countDownFn);
            });
            fields.routine.addEvent(h.STATES.STOPPED, function () {
                fields.cdName.text(msg.eventStart);
                fields.cdUtc.text(msg.noTime);
                fields.cdLocal.text(msg.noTime);
                fields.cdSbst.text(msg.noTime);
                fields.cdTimer.removeClass("cd-waiting cd-ongoing").addClass("cd-stopped");
                fields.cdTimer.text(msg.ended);
                elem.css("visibility", "visible");
            });
            fields.routine.trigger();
        };
        countdownEl.each(function () {
            var elem = $(this);
            var routineInput = elem.data("routine");
            if (!routineInput) {
                console.warn(msg.routineNodef);
                return;
            }
            var allCount = elem.find(".cd-name, .cd-to, .cd-timer").length;
            var alphaCount = elem.find(".cd-name.alpha, .cd-to.alpha, .cd-timer.alpha").length;
            if (allCount !== alphaCount)
                setCountdown(elem, {
                    cdName: elem.find(".cd-name:not(.alpha)"),
                    cdUtc: elem.find(".cd-utc:not(.alpha)"),
                    cdLocal: elem.find(".cd-local:not(.alpha)"),
                    cdSbst: elem.find(".cd-sbst:not(.alpha)"),
                    cdTimer: elem.find(".cd-timer:not(.alpha)"),
                    routine: new sbte.SkyRoutine(routineInput)
                });
            if (alphaCount > 0)
                setCountdown(elem, {
                    cdName: elem.find(".cd-name.alpha"),
                    cdUtc: elem.find(".cd-utc.alpha"),
                    cdLocal: elem.find(".cd-local.alpha"),
                    cdSbst: elem.find(".cd-sbst.alpha"),
                    cdTimer: elem.find(".cd-timer.alpha"),
                    routine: new sbte.SkyRoutineAlpha(routineInput)
                });
        });
    }
    // Load dependencies and run when dependencies ready
    mw.hook("hsbwiki.sbte").add(function (sbtelib) {
        sbte = sbtelib;
        h = sbte.helpers;
        mw.hook("wikipage.content").add(main);
    });
    // If used without gadget loading, uncomment this part
    /*
    mw.loader.using(["mediawiki.api"], function () {
        importArticle({
            type: "script",
            article: "MediaWiki:Gadget-SkyBlockTimeEngine.js"
        });
    });
    */

})(window, jQuery, mediaWiki);