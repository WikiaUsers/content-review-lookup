/**
 * @name SkyBlockTimeEngine (ES5 Version)
 * @author MonkeysHK <https://github.com/MonkeysHK>
 * @description A web time engine for the time system in Hypixel SkyBlock.
 * @license GPL-3.0-or-later GNU General Public License v3.0 or later <https://www.gnu.org/licenses/gpl-3.0-standalone.html>
 * @version 1.0
 */
/* jshint
    esversion: 5, esnext: false, forin: true, immed: true, indent: 4,
    latedef: true, newcap: true, noarg: true, undef: true, unused: true,
    browser: true, jquery: true, onevar: true, eqeqeq: true, multistr: true,
    maxerr: 999999, forin: false, -W082, -W084
*/
/* global mediaWiki */
(function (window, $, mw) {
    "use strict";
    window.hsbwiki = window.hsbwiki || {};
    window.hsbwiki.sbte = window.hsbwiki.sbte || {};
    if (window.hsbwiki.sbte.loaded) {
        return;
    }
    window.hsbwiki.sbte.loaded = true;

    /**
     * **Helpers**
     */
    var h = {
        LOCALES: {
            utc: "U",
            sbst: "S",
            utc_regex: /(?:\s|^)\-u$/i,
            sbst_regex: /(?:\s|^)\-s$/i
        },
        UNITS: {
            year: 0,
            month: 1,
            day: 2,
            hour: 3,
            minute: 4,
            second: 5
        },
        RATIOS: {
            5: 1, // one second
            4: 60, // minute-to-second ratio
            3: 3600, // hour-to-second ratio
            2: 86400, // day-to-second ratio
            1: 2678400, // month-to-second (=31 days) ratio
            0: 32140800, // year-to-second (=372 days) ratio
            magic: 72 // magic ratio
        },
        DATE_FUNC_MAP: [
            "FullYear",
            "Month",
            "Date",
            "Hours",
            "Minutes",
            "Seconds"
        ],
        UNIT_LIMITS: [
            // note: VALUE in [LOWER, UPPER)
            {
                LOWER: 0,
                UPPER: undefined
            },
            {
                LOWER: 0,
                UPPER: 12
            },
            {
                LOWER: 1,
                UPPER: 32
            },
            {
                LOWER: 0,
                UPPER: 24
            },
            {
                LOWER: 0,
                UPPER: 60
            },
            {
                LOWER: 0,
                UPPER: 60
            }
        ],
        STATES: {
            WAITING: 0,
            ONGOING: 1,
            STOPPED: 2
        },
        checkNumber: function (n) {
            if (isNaN(n))
                throw new TypeError("Input must be a number");
            return Number(n);
        },
        checkLocale: function (str) {
            if (typeof str === "string" && (str === h.LOCALES.utc || h.LOCALES.utc_regex.test(str)))
                return h.LOCALES.utc;
            else if (typeof str === "string" && (str === h.LOCALES.sbst || h.LOCALES.sbst_regex.test(str)))
                return h.LOCALES.sbst;
            return false;
        },
        fmtTime: function (h, m, s, s_72th) {
            return String(h).padStart(2, 0) + ":" + String(m).padStart(2, 0) + ":" + String(s).padStart(2, 0) +
                (s_72th ? "[+" + s_72th + "/72s]" : "");
        },
        getFirstNumber: function ( /* ...arguments */ ) {
            for (var i in arguments) {
                if (!isNaN(arguments[i]))
                    return Number(arguments[i]);
            }
        }
    };
    h.SKYBLOCK_EPOCH = {
        UNIX_TS_UTC: 1560275700,
        UNIX_TS_SBST: 1560275700 * h.RATIOS.magic,
        SKYBLOCK_TS_UTC: 0,
        SKYBLOCK_TS_SBST: 0
    };


    /**
     * **SkyDuration**  
     * This script translates between SkyBlock Durations and UTC Durations,  
     * and allow arithmetic to be performed on them.  
     */
    function SkyDuration(locale, seconds, minutes, hours, days, months, years) {
        this.setDuration(locale, seconds, minutes, hours, days, months, years);
    }
    /*** MEMBER FUNCTIONS ***/
    /**
     * setDuration(utc_seconds: number)  
     * setDuration(duration_string: string)  
     * setDuration(locale?: string, seconds?: number, minutes?: number, hours?: number, days?: number, months?: number, years?: number)  
     * Due to different months having different number of days, UTC Time does not support Months and Years  
     * If first parameter is supplied with a number in UTC Seconds, it will define the duration.  
     * If first parameter is supplied with a text-based time notation, it will be passed to a text parser.  
     *       > (e.g. "2y 3mo 1d 3h 2m 50s -U")  
     *       > trailing "-U" (UTC) and "-S" (SBST) defines the locale used in calculation; default is "S"  
     * Else, all parameters will be used to determine the duration.  
     * `Locale` should be LOCALES.utc or LOCALES.sbst.  
     */
    SkyDuration.prototype.setDuration = function (locale, seconds, minutes, hours, days, months, years) {
        // Determine Duration in SBST Seconds
        var str = ["string", "number"].includes(typeof locale) && String(locale) || "";
        var duration = 0;
        if (!isNaN(str)) {
            // If passed in a number, treat it as UTC seconds
            this.locale = h.LOCALES.utc;
            duration = Number(str) * h.RATIOS.magic;
        } else {
            // Else, parse time string
            this.locale = h.checkLocale(str) || h.LOCALES.sbst;
            var data = SkyDuration.durationTextParser(str);
            if (!Object.values(data).every(isNaN)) {
                duration = (data[h.UNITS.second] || 0) + (data[h.UNITS.minute] || 0) * h.RATIOS[h.UNITS.minute] + (data[h.UNITS.hour] || 0) * h.RATIOS[h.UNITS.hour] + (data[h.UNITS.day] || 0) * h.RATIOS[h.UNITS.day];
                if (this.locale === h.LOCALES.sbst)
                    duration += (data[h.UNITS.month] || 0) * h.RATIOS[h.UNITS.month] + (data[h.UNITS.year] || 0) * h.RATIOS[h.UNITS.year]; // month/year support for SBST
                else
                    duration *= h.RATIOS.magic; // Force duration value in SkyBlock seconds
            } else {
                // Add individual values passed to function
                duration = (seconds || 0) + (minutes || 0) * h.RATIOS[h.UNITS.minute] + (hours || 0) * h.RATIOS[h.UNITS.hour] + (days || 0) * h.RATIOS[h.UNITS.day];
                if (this.locale === h.LOCALES.sbst)
                    duration += (months || 0) * h.RATIOS[h.UNITS.month] + (years || 0) * h.RATIOS[h.UNITS.year]; // month/year support for SBST
                else
                    duration *= h.RATIOS.magic; // Force duration value in SkyBlock seconds
            }
        }
        this.duration = Math.floor(duration);
        // SKYBLOCK Duration Calculations
        this.sbstSeconds = this.duration % h.RATIOS[h.UNITS.minute];
        this.sbstMinutes = Math.floor(this.duration % h.RATIOS[h.UNITS.hour] / h.RATIOS[h.UNITS.minute]);
        this.sbstHours = Math.floor(this.duration % h.RATIOS[h.UNITS.day] / h.RATIOS[h.UNITS.hour]);
        this.sbstDays = Math.floor(this.duration % h.RATIOS[h.UNITS.month] / h.RATIOS[h.UNITS.day]);
        this.sbstMonths = Math.floor(this.duration % h.RATIOS[h.UNITS.year] / h.RATIOS[h.UNITS.month]);
        this.sbstYears = Math.floor(this.duration / h.RATIOS[h.UNITS.year]);
        // UTC Duration Calculations
        this.utc72thSecs = this.duration % h.RATIOS.magic;
        var totalUtcSecs = Math.floor(this.duration / h.RATIOS.magic);
        this.utcSeconds = totalUtcSecs % h.RATIOS[h.UNITS.minute];
        this.utcMinutes = Math.floor(totalUtcSecs % h.RATIOS[h.UNITS.hour] / h.RATIOS[h.UNITS.minute]);
        this.utcHours = Math.floor(totalUtcSecs % h.RATIOS[h.UNITS.day] / h.RATIOS[h.UNITS.hour]);
        this.utcDays = Math.floor(totalUtcSecs / h.RATIOS[h.UNITS.day]);
        // Representations
        // Computing Representation [years, months, days, hours, minutes, seconds]
        this.computing = {};
        this.computing.SBST = [this.sbstYears, this.sbstMonths, this.sbstDays, this.sbstHours, this.sbstMinutes, this.sbstSeconds];
        // Time Strings
        this.utcString = [
            this.utcDays !== 0 ? String(this.utcDays) + "d" : null,
            h.fmtTime(this.utcHours, this.utcMinutes, this.utcSeconds, this.utc72thSecs)
        ].filter(Boolean).join(" ");
        this.sbstString = [
            this.sbstYears !== 0 ? String(this.sbstYears) + "y" : null,
            this.sbstMonths !== 0 ? String(this.sbstMonths) + "m" : null,
            this.sbstDays !== 0 ? String(this.sbstDays) + "d" : null,
            h.fmtTime(this.sbstHours, this.sbstMinutes, this.sbstSeconds)
        ].filter(Boolean).join(" ");
        return this;
    };
    SkyDuration.prototype.toString = function () {
        return this.utcString + " (in UTC Duration), " + this.sbstString + " (in SBST Duration)";
    };
    SkyDuration.prototype.valueOf = function () {
        return this.duration;
    };
    SkyDuration.prototype.addUTCTime = function (unit, value) {
        if (unit >= h.UNITS.day && unit <= h.UNITS.second)
            this.addSBSTTime(h.UNITS.second, h.checkNumber(value) * h.RATIOS[unit] * h.RATIOS.magic);
        return this;
    };
    SkyDuration.prototype.addSBSTTime = function (unit, value) {
        if (unit >= h.UNITS.year && unit <= h.UNITS.second)
            this.setDuration(h.LOCALES.sbst, this.valueOf() + h.checkNumber(value));
        return this;
    };
    /*** STATIC FUNCTIONS ***/
    SkyDuration.durationTextParser = function (str) {
        var match;
        return [
            (match = str.match(/(?:\s|^)(\d+)y(?:\s|$)/i)) ? Number(match[1]) : undefined,
            (match = str.match(/(?:\s|^)(\d+)mo(?:\s|$)/i)) ? Number(match[1]) : undefined,
            (match = str.match(/(?:\s|^)(\d+)d(?:\s|$)/i)) ? Number(match[1]) : undefined,
            (match = str.match(/(?:\s|^)(\d+)h(?:\s|$)/i)) ? Number(match[1]) : undefined,
            (match = str.match(/(?:\s|^)(\d+)m(?:\s|$)/i)) ? Number(match[1]) : undefined,
            (match = str.match(/(?:\s|^)(\d+)s(?:\s|$)/i)) ? Number(match[1]) : undefined,
        ];
    };


    /**
     * **SkyDate**  
     * This script translates between SkyBlock Std Time (SBST) and Coordinated Universal Time (UTC).  
     * Also supports output for Local Time (LOCAL).  
     * The main structure is from JavaScript Date.  
     * The time value is stored as a SkyDuration, which operates on SkyBlock seconds. The value is an offset from the SkyBlock Epoch (UNIX_EPOCH_SBST).  
     * Dependencies: SkyDuration  
     * Note: Users are not supposed to modify the values of this.duration and this.date directly. Only use them to read values.  
     */
    function SkyDate(locale, year, monthIndex, day, hours, minutes, seconds) {
        this.setTime(locale, year, monthIndex, day, hours, minutes, seconds);
    }
    /*** MEMBER FUNCTIONS ***/
    /**
     * setTime(duration_since_skyblock_epoch: SkyDuration)  
     * setTime(date: Date)  
     * setTime(utc_seconds_since_unix_epoch: number)  
     * setTime(date_string: string)  
     * setTime(locale?: string, year?: number, monthIndex?: number, day?: number, hours?: number, minutes?: number, seconds?: number)  
     * If first parameter is supplied with a SkyDuration instance or a number in UTC Seconds, it will be used as an offset from SKYBLOCK EPOCH.  
     * If first parameter is supplied with a text-based time notation, it will be passed to a text parser.  
     *       > (e.g. "Y189 M3 D27 00:00:00 -S" for 27th Late-Spring of Year 189)  
     *       > trailing "-U" (UTC) and "-S" (SBST) defines the locale used in calculation; default is "S"  
     * Else, all parameters will be used to determine the date.  
     * `Locale` should be LOCALES.utc or LOCALES.sbst.  
     * In the 2nd/3rd case: Specifications for all units are optional, but at least one must be present.  
     * The largest specified unit is called the Most Significant Unit (MSU):  
     *       > If a unit higher than the MSU is not specified, it will take its value in the current time.  
     *       > If a unit lower than the MSU is not specified, it will take its lowest possible value.  
     */
    SkyDate.prototype.setTime = function (locale, year, monthIndex, day, hours, minutes, seconds) {
        if (locale instanceof SkyDuration) {
            this.locale = h.LOCALES.sbst;
            this.duration = locale; // note: this must be a SkyDuration since SkyBlock Epoch
        } else if (locale instanceof Date) {
            this.locale = h.LOCALES.utc;
            this.duration = SkyDate.durationFromUTCUnixTime(locale.valueOf() / 1000);
        } else if (!isNaN(locale)) {
            // If passed in a number, treat it as UTC seconds since Unix Epoch
            this.locale = h.LOCALES.utc;
            this.duration = SkyDate.durationFromUTCUnixTime(Number(locale));
        } else {
            var str = ["string", "number"].includes(typeof locale) ? String(locale) : "";
            this.locale = h.checkLocale(str) || h.LOCALES.sbst;
            var meme = [year, monthIndex, day, hours, minutes, seconds];
            var data = SkyDate.dateTextParser(str);
            var current = SkyDate.currentTime();
            var most_significant, i;
            for (i = 0; i < 6; i++) {
                if (isNaN(most_significant)) {
                    if (!(isNaN(meme[i]) && isNaN(data[i])))
                        most_significant = i; // on most significant
                    meme[i] = h.getFirstNumber(meme[i], data[i], current[this.locale][i]); // before/on most significant: default current
                } else {
                    meme[i] = h.getFirstNumber(meme[i], data[i], h.UNIT_LIMITS[i].LOWER); // after most significant: default lowest
                }
            }
            if (this.locale === h.LOCALES.utc) {
                var ts = Date.UTC(meme[h.UNITS.year], meme[h.UNITS.month], meme[h.UNITS.day], meme[h.UNITS.hour], meme[h.UNITS.minute], meme[h.UNITS.second]) / 1000;
                this.duration = SkyDate.durationFromUTCUnixTime(ts);
            } else {
                this.duration = new SkyDuration(h.LOCALES.sbst,
                    meme[h.UNITS.second] || 0, // 0-60
                    meme[h.UNITS.minute] || 0, // 0-60
                    meme[h.UNITS.hour] || 0, // 0-60
                    meme[h.UNITS.day] - 1, // 1-31
                    meme[h.UNITS.month], // 0-11
                    meme[h.UNITS.year] - 1); // 1-inf
            }
        }
        // UTC Date
        this.date = SkyDate.dateFromDuration(this.duration);
        // SKYBLOCK Date
        this.sbstFullYear = this.duration.sbstYears + 1;
        this.sbstMonth = this.duration.sbstMonths;
        this.sbstDate = this.duration.sbstDays + 1;
        this.sbstHour = this.duration.sbstHours;
        this.sbstMinute = this.duration.sbstMinutes;
        this.sbstSecond = this.duration.sbstSeconds;
        /* Make Representations */
        // Computing Representation [fullyear, monthindex, date, hour, minute, second]
        this.computing = {};
        this.computing.SBST = [this.sbstFullYear, this.sbstMonth, this.sbstDate, this.sbstHour, this.sbstMinute, this.sbstSecond];
        // Ordinal Dates
        this.sbstOrdinalDate = SkyDate.toOrdinal(this.sbstDate);
        this.utcOrdinalDate = SkyDate.toOrdinal(this.date.getUTCDate());
        this.localOrdinalDate = SkyDate.toOrdinal(this.date.getDate());
        // Full/Short Month
        this.sbstFullMonth = SkyDate.FULLMONTHS_SBST[this.sbstMonth];
        this.utcFullMonth = SkyDate.FULLMONTHS_UTC[this.date.getUTCMonth()];
        this.localFullMonth = SkyDate.FULLMONTHS_UTC[this.date.getMonth()];
        this.sbstShortMonth = SkyDate.SHORTMONTHSB[this.sbstMonth];
        this.utcShortMonth = SkyDate.SHORTMONTHRL[this.date.getUTCMonth()];
        this.localShortMonth = SkyDate.SHORTMONTHRL[this.date.getMonth()];
        // ref: Date.__proto__.toDateString
        this.sbstDateString = this.sbstOrdinalDate + " " + this.sbstFullMonth + " Y" + this.sbstFullYear;
        // ref: Date.__proto__.toTimeString
        this.sbstTimeString = SkyDate.to12HourTime(this.sbstHour, this.sbstMinute);
        // ref: Date.__proto__.toString
        this.sbstString = this.sbstDateString + ", " + this.sbstTimeString;
        // Timestamps
        this.SKYBLOCK_TS_SBST = this.duration.valueOf(); // The SKYBLOCK timestamp (seconds from SkyBlock Epoch) to this instance using SBST units
        this.SKYBLOCK_TS_UTC = Math.floor(this.duration.valueOf() / h.RATIOS.magic); // The SKYBLOCK timestamp (seconds from SkyBlock Epoch) to this instance using UTC units
        this.UNIX_TS_SBST = h.SKYBLOCK_EPOCH.UNIX_TS_SBST + this.SKYBLOCK_TS_SBST; // The UNIX Timestamp (seconds from Unix Epoch) to this instance using SBST units
        this.UNIX_TS_UTC = h.SKYBLOCK_EPOCH.UNIX_TS_UTC + this.SKYBLOCK_TS_UTC; // The UNIX Timestamp (seconds from Unix Epoch) to this instance using UTC units
        return this; // note: this.valueOf() == SKYBLOCK_TS_SBST
    };
    /* Setters */
    SkyDate.prototype.setUTCTimestamp = function (ts) {
        // ts in UTC seconds (not ms)!
        return this.setTime(SkyDate.durationFromUTCUnixTime(ts));
    };
    SkyDate.prototype.setSBSTTimestamp = function (ts) {
        // ts in SBST seconds (not ms)!
        return this.setTime(new SkyDuration(h.LOCALES.sbst, ts));
    };
    SkyDate.prototype.addDuration = function (sbstSeconds) {
        this.duration.addSBSTTime(h.UNITS.second, sbstSeconds);
        return this.setTime(this.duration);
    };
    SkyDate.prototype.setSBSTTime = function (unit, value) {
        if (unit >= h.UNITS.year && unit <= h.UNITS.second)
            this.duration.addSBSTTime(unit, h.checkNumber(value) - this.computing.SBST[unit]);
        return this.setTime(this.duration);
    };
    SkyDate.prototype.setLocalTime = function (unit, value) {
        if (unit >= h.UNITS.year && unit <= h.UNITS.second)
            this.date["set" + h.DATE_FUNC_MAP[unit]](h.checkNumber(value));
        return this.setUTCTimestamp(this.date.valueOf() / 1000);
    };
    SkyDate.prototype.setUTCTime = function (unit, value) {
        if (unit >= h.UNITS.year && unit <= h.UNITS.second)
            this.date["setUTC" + h.DATE_FUNC_MAP[unit]](h.checkNumber(value));
        return this.setUTCTimestamp(this.date.valueOf() / 1000);
    };
    /* Tip: Use this.date to get UTC/LOCAL Time information with the JS Date */
    SkyDate.prototype.valueOf = function () {
        return this.SKYBLOCK_TS_SBST; // Return the SKYBLOCK timestamp (seconds from SkyBlock Epoch) of this instance using SBST units
    };
    SkyDate.prototype.toString = function () {
        return this.sbstString;
    };
    /*** STATIC FUNCTIONS ***/
    SkyDate.durationFromUTCUnixTime = function (ts) {
        return new SkyDuration(h.LOCALES.utc, ts - h.SKYBLOCK_EPOCH.UNIX_TS_UTC);
    };
    SkyDate.dateFromDuration = function (duration) {
        return new Date((duration.valueOf() / h.RATIOS.magic + h.SKYBLOCK_EPOCH.UNIX_TS_UTC) * 1000);
    };
    SkyDate.currentTime = function () {
        var currentDate = new Date();
        var currentDuration = (new SkyDuration(h.LOCALES.utc, Date.now() / 1000 - h.SKYBLOCK_EPOCH.UNIX_TS_UTC)).computing.SBST;
        var result = {};
        result[h.LOCALES.utc] = [currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate(), currentDate.getUTCHours(), currentDate.getUTCMinutes(), currentDate.getUTCSeconds()];
        result[h.LOCALES.sbst] = [currentDuration[0] + 1, currentDuration[1], currentDuration[2] + 1, currentDuration[3], currentDuration[4], currentDuration[5], currentDuration[6]];
        return result;
    };
    SkyDate.matchMonth = function (str) {
        for (var i = 0; i < 12; i++) {
            if (new RegExp("\\b" + SkyDate.FULLMONTHS_UTC[i] + "\\b", "gi").test(str) ||
                new RegExp("\\b" + SkyDate.SHORTMONTHRL[i] + "\\b", "gi").test(str) ||
                new RegExp("\\b" + SkyDate.FULLMONTHS_SBST[i] + "\\b", "gi").test(str) ||
                new RegExp("\\b" + SkyDate.SHORTMONTHSB[i] + "\\b", "gi").test(str))
                return i;
        }
    };
    SkyDate.dateTextParser = function (str) {
        var match;
        return [
            (match = str.match(/(?:\s|^)Y(\d+)(?:\s|$)/i)) ? Number(match[1]) : undefined,
            (match = str.match(/(?:\s|^)M(\d+)(?:\s|$)/i)) ? Number(match[1]) - 1 : (match = str.match(/\b([A-Za-z]{2,})\b/i)) ? SkyDate.matchMonth(match[1]) : undefined,
            (match = str.match(/(?:\s|^)D?(\d+)(?:\s|$)/i)) ? Number(match[1]) : undefined,
            (match = str.match(/(?:\s|^)(\d+):/)) ? Number(match[1]) : undefined,
            (match = str.match(/(?:\s|^)\d*:(\d+)/)) ? Number(match[1]) : undefined,
            (match = str.match(/(?:\s|^)\d*:\d*:(\d+)/)) ? Number(match[1]) : undefined
        ];
    };
    SkyDate.toOrdinal = function (num) {
        return num + (num >= 11 && num <= 13 ? "th" : num % 10 === 1 ? "st" : num % 10 === 2 ? "nd" : num % 10 === 3 ? "rd" : "th");
    };
    SkyDate.to12HourTime = function (hour, min) {
        var ampm = hour < 12 ? " AM" : " PM";
        hour = (hour % 12) === 0 ? 12 : hour % 12;
        return (hour.toString().padStart(2, "0")) + ":" + (min.toString().padStart(2, "0")) + ampm;
    };
    SkyDate.FULLMONTHS_UTC = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    SkyDate.SHORTMONTHRL = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    SkyDate.FULLMONTHS_SBST = [
        "Early Spring", "Spring", "Late Spring", "Early Summer", "Summer", "Late Summer",
        "Early Autumn", "Autumn", "Late Autumn", "Early Winter", "Winter", "Late Winter"
    ];
    SkyDate.SHORTMONTHSB = [
        "ESP", "SP", "LSP", "ESU", "SU", "LSU", "EAU", "AU", "LAU", "EWI", "WI", "LWI"
    ];
    SkyDate.UNIXTIME_TO_SBEPOCH_UTC = 1560275700; // The UNIX Timestamp (seconds from Unix Epoch) to SkyBlock Epoch using UTC units
    SkyDate.UNIXTIME_TO_SBEPOCH_SBST = 1560275700 * h.RATIOS.magic; // The UNIX Timestamp (seconds from Unix Epoch) to SkyBlock Epoch using SBST units


    /**
     * **SkyRoutine**  
     * A routine handler for both SkyBlock Time and UTC Time.  
     * Dependencies: SkyDuration, SkyDate  
     */
    function SkyRoutine(str) {
        this.tasksId = -1;
        this.tasks = []; // array of { event: <any STATES>, cb: function }
        this.timeoutStack = [];
        this.definition = str;
    }
    /*** MEMBER FUNCTIONS ***/
    SkyRoutine.prototype.trigger = function (str) {
        this.definition = str || this.definition;
        var data = SkyRoutine.routineTextParser(this.definition);
        // Calculations
        var chosenLocale = h.checkLocale(data.anchor) || h.LOCALES.sbst;
        var i;
        this.anchor = new SkyDate(data.anchor); // a SkyDate used as number
        this.totalduration = this.totalbreak = this.cycleExecutions = this.routineExecutions = 0;
        this.currentEventTime = this.nextEventTime = undefined;
        this.routinePtr = -1;
        // Handle Cycle
        this.cycle = (data.cycle || "0|0").split("/");
        if (this.cycle.length % 2 === 1)
            this.cycle.push(0);
        for (i = 0; i < this.cycle.length; i++) {
            var v = this.cycle[i].toString().trim();
            this.cycle[i] = v !== "" && !isNaN(v) ? new SkyDuration(chosenLocale, v) : new SkyDuration(v || 0); // a SkyDuration used as number
            this.totalduration += i % 2 === 0 ? this.cycle[i].valueOf() : 0;
            this.totalbreak += i % 2 === 1 ? this.cycle[i].valueOf() : 0;
        }
        this.cycleTime = this.totalduration + this.totalbreak;
        this.executeOnce = this.cycleTime < 1;
        // Handle Limits
        if (this.executeOnce)
            this.limit = 1; /* no cycle length: force limit of 1 */
        if (!isNaN(data.limit)) {
            this.limit = Number(data.limit);
            this.cycleLimit = Math.floor(this.limit / (this.cycle.length / 2));
        }
        if (!!data.until)
            this.until = new SkyDate(data.until); // a SkyDate used as number
        // Get Initial State
        var currentDate = new SkyDate();
        if (currentDate < this.anchor) { // cond. 1: not started; cycleExecutions and routineExecutions remains 0
            this.currentState = h.STATES.WAITING;
            this.nextEventTime = this.anchor;
        } else {
            // seek lastCycleStart, lastRoutineStart, cycleExecutions, routineExecutions
            var lastCycleStart, lastRoutineStart;
            if (this.executeOnce) {
                this.cycleExecutions = 1;
                lastRoutineStart = lastCycleStart = this.anchor;
            } else {
                this.cycleExecutions = Math.floor(((this.until && (this.until < currentDate) ? this.until : currentDate) - this.anchor) / this.cycleTime + 1);
                if (this.cycleLimit)
                    this.cycleExecutions = Math.min(this.cycleLimit, this.cycleExecutions);
                lastRoutineStart = lastCycleStart = this.anchor + (this.cycleExecutions - 1) * this.cycleTime;
            }
            var doubleRoutineCount = (this.cycleExecutions - 1) * this.cycle.length;
            var cumulated = 0;
            for (i = 0; i < this.cycle.length; i++) {
                if (lastRoutineStart + (cumulated + this.cycle[i]) > currentDate) {
                    // this.routinePtr is only valid (> 0) when a routine will happen across the current date
                    this.routinePtr = i;
                    doubleRoutineCount += i;
                    lastRoutineStart += cumulated;
                    break;
                }
                cumulated += this.cycle[i];
            }
            this.routineExecutions = Math.floor(doubleRoutineCount / 2) + 1;
            if (this.limit)
                this.routineExecutions = Math.min(this.limit, this.routineExecutions);

            if (this.executeOnce || // cond. 2: cycle length 0 and executed once
                (this.limit && this.limit >= 0 && this.routineExecutions >= this.limit) || // cond. 3: execution limit reached
                (this.until && currentDate >= this.until)) { // cond. 4: date limit reached
                if (this.routinePtr % 2 === 1 || lastRoutineStart + this.getPeriod() < currentDate) { // cond: not ongoing
                    this.currentState = h.STATES.STOPPED;
                } else {
                    this.currentState = h.STATES.ONGOING;
                    this.currentEventTime = lastRoutineStart;
                    this.nextEventTime = lastRoutineStart + this.getPeriod();
                }
            } else { // cond. 5: no limits reached
                this.currentState = this.routinePtr % 2 === 0 ? h.STATES.ONGOING : h.STATES.WAITING;
                this.currentEventTime = lastRoutineStart;
                this.nextEventTime = lastRoutineStart + this.getPeriod();
            }
        }
        // Trigger event
        if (this.currentState === h.STATES.ONGOING)
            this.onEventStart(true);
        else
            this.onEventEnd(true);
    };
    SkyRoutine.prototype.pause = function () {
        for (var i in this.timeoutStack)
            clearTimeout(this.timeoutStack[i]);
        this.timeoutStack = [];
    };
    SkyRoutine.prototype.removeTimeout = function (id) {
        this.timeoutStack.splice(this.timeoutStack.indexOf(id), 1);
    };
    SkyRoutine.prototype.addEvent = function (eventState, callback) {
        if (Object.values(h.STATES).includes(eventState)) {
            this.tasksId++;
            this.tasks[this.tasksId] = {
                event: eventState,
                cb: callback
            };
            if (this.currentState === eventState)
                callback(this.currentState);
            return this.tasksId;
        }
    };
    SkyRoutine.prototype.removeEvent = function (id) {
        if (id in this.tasks) {
            delete this.tasks[id];
            return true;
        }
        return false;
    };
    SkyRoutine.prototype.getPeriod = function (forward) { // forward must be +ve integer
        if (this.routinePtr + (forward || 0) < 0)
            return 0;
        return this.cycle[(this.routinePtr + (forward || 0)) % this.cycle.length];
    };
    SkyRoutine.prototype.advancePeriod = function (forward) { // forward must be +ve integer
        this.routinePtr = (this.routinePtr + (forward || 0)) % this.cycle.length;
    };
    SkyRoutine.prototype.onEventStart = function (noStateChanges) {
        // State Changes
        if (!noStateChanges) {
            this.advancePeriod(1);
            this.currentEventTime = this.nextEventTime;
            this.nextEventTime += this.getPeriod(0); // Note: Calculation dependent on last state
            this.currentState = h.STATES.ONGOING;
            this.routineExecutions++;
            this.cycleExecutions += this.routinePtr === 0 ? 1 : 0;
        }
        // Call Tasks
        this.callEventSet(h.STATES.ONGOING);
        // Activate Next
        this.passTheBall(this.onEventEnd.bind(this), this.nextEventTime);
        // Schedule future termination if limits reached
        if ((this.limit && this.routineExecutions >= this.limit) || // reached execution limit
            (this.until && this.nextEventTime >= this.until)) // next start time reached/over date limit
            this.nextEventTime = null;
    };
    SkyRoutine.prototype.onEventEnd = function (noStateChanges) {
        // Check termination
        if (!this.nextEventTime) {
            // State Changes
            this.currentState = h.STATES.STOPPED;
            this.currentEventTime = undefined;
            // Call Tasks
            this.callEventSet(h.STATES.STOPPED);
            return;
        }
        // State Changes
        if (!noStateChanges) {
            this.advancePeriod(1);
            this.currentEventTime = this.nextEventTime;
            this.nextEventTime += this.getPeriod(0);
            this.currentState = h.STATES.WAITING;
        }
        // Call Tasks
        this.callEventSet(h.STATES.WAITING);
        // Activate Next
        this.passTheBall(this.onEventStart.bind(this), this.nextEventTime);
    };
    SkyRoutine.prototype.passTheBall = function (callback, startSkyDate) {
        var now = new SkyDate();
        var till = Math.floor(Math.max(startSkyDate - now, 0) / h.RATIOS.magic * 1000); // convert SBST seconds to UTC milliseconds
        var _this = this;
        // Only schedule tasks within one day
        if (till < 86400000) {
            var tout = setTimeout(function () {
                callback();
                _this.removeTimeout(tout);
            }, till);
            _this.timeoutStack.push(tout);
        }
    };
    SkyRoutine.prototype.callEventSet = function (eventset) {
        for (var i in this.tasks)
            if (this.tasks[i].event === eventset)
                this.tasks[i].cb(this.currentState);
    };
    SkyRoutine.prototype.startCountdown = function (callback) {
        var _this = this;
        // align to system clock
        var countTo = this.nextEventTime / h.RATIOS.magic,
            countToDate = new SkyDate(new SkyDuration(h.LOCALES.sbst, this.nextEventTime)),
            countFromDate = new SkyDate(new SkyDuration(h.LOCALES.sbst, this.currentEventTime));
        var alignTout = setTimeout(function () {
            clearTimeout(alignTout);
            // now start actual countdown
            var countdownIntr = setInterval(function () {
                var now = Date.now() / 1000 - h.SKYBLOCK_EPOCH.UNIX_TS_UTC;
                var utcSecondsRemain = Math.floor(countTo - now);
                if (utcSecondsRemain <= 0)
                    clearTimeout(countdownIntr);
                callback(countdownIntr, utcSecondsRemain, countToDate, countFromDate, _this.currentState);
            }, 1000);
            // call it the first time
            var now = Date.now() / 1000 - h.SKYBLOCK_EPOCH.UNIX_TS_UTC;
            var utcSecondsRemain = Math.floor(countTo - now);
            callback(countdownIntr, utcSecondsRemain, countToDate, countFromDate, _this.currentState);
        }, (new Date()).valueOf() % 1000);
    };
    /*** STATIC FUNCTIONS ***/
    SkyRoutine.routineTextParser = function (str) {
        var match;
        return {
            cycle: (match = str.match(/(?:\s|^)C\[(.*?)\]/)) ? match[1] : undefined, // pipe-separated list of duration expr or number
            limit: (match = str.match(/(?:\s|^)L\[(.*?)\]/)) ? match[1] : undefined, // a number
            until: (match = str.match(/(?:\s|^)U\[(.*?)\]/)) ? match[1] : undefined, // a date expr
            anchor: (match = str.match(/(?:\s|^)A\[(.*?)\]/)) ? match[1] : undefined // a date expr
        };
    };


    // Attach to hsbwiki global
    window.hsbwiki.sbte = $.extend(window.hsbwiki.sbte, {
        SkyDuration: SkyDuration,
        SkyDate: SkyDate,
        SkyRoutine: SkyRoutine,
        helpers: h,
    });

    // Attach mw.hook: fire event on load
    mw.hook("hsbwiki.sbte").fire(window.hsbwiki.sbte);


})(window, jQuery, mediaWiki);