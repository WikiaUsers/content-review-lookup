/**
 * @name SkyBlockTimeEngine (ES5 Version, RU Adaptation)
 * @author MonkeysHK (Original), Adapted for ru.hsbwiki
 * @description Движок времени для системы Hypixel SkyBlock.
 * @license GPL-3.0-or-later
 * @version:en 3.0
 * @version:ru 1.0
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
    var wikiname = "ruhsbwiki";
    window[wikiname] = window[wikiname] || {};
    window[wikiname].sbte = window[wikiname].sbte || {};
    if (window[wikiname].sbte.loaded) {
        return;
    }
    window[wikiname].sbte.loaded = true;

    /**
     * **Helpers**
     */
    var h = {
        FMTMSG: {
            formatYears: "$1 г.",
            formatMonths: "$1 мес.",
            formatDays: "$1 д.",
            format72th: "[+$1/72с]",
            formatTime: "$1:$2:$3 $4", // Ч, М, С, 72-е доли
            formatFullDuration: "$1 $2 $3 $4", // Г, МЕС, Д, ВРЕМЯ
            formatSBSTDate: "$4, $2 $1 г.", // порядковое число, месяц, год
            formatSBSTTime: "$1:$2 $3", // час, минута, am/pm
            formatSBSTFullDate: "$1, $2", // строка даты, строка времени
            AMPM: ["AM", "PM"],
            SHORTMONTHS_UTC: [
                "янв.", "февр.", "мар.", "апр.", "мая", "июн.",
                "июл.", "авг.", "сент.", "окт.", "нояб.", "дек."
            ],
            SHORTMONTHS_SBST: [
                "Ран. весна", "Весна", "Позд. весна",
                "Ран. лето", "Лето", "Позд. лето",
                "Ран. осень", "Осень", "Позд. осень",
                "Ран. зима", "Зима", "Позд. зима"
            ],
            FULLMONTHS_UTC: [
                "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
                "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
            ],
            FULLMONTHS_SBST: [
                "Ранняя весна", "Весна", "Поздняя весна",
                "Раннее лето", "Лето", "Позднее лето",
                "Ранняя осень", "Осень", "Поздняя осень",
                "Ранняя зима", "Зима", "Поздняя зима"
            ],
        },
        LOCALES: {
            utc: "U",
            sbst: "S",
            utc_regex: /(?:\s|^)-u$/i,
            sbst_regex: /(?:\s|^)-s$/i
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
            5: 1,
            4: 60,
            3: 3600,
            2: 86400,
            1: 2678400,
            0: 32140800
        },
        MAGIC_RATIO: 72,
        DATE_FUNC_MAP: [
            "FullYear", "Month", "Date", "Hours", "Minutes", "Seconds"
        ],
        UNIT_LIMITS: [
            { LOWER: 0, UPPER: undefined },
            { LOWER: 0, UPPER: 12 },
            { LOWER: 1, UPPER: 32 },
            { LOWER: 0, UPPER: 24 },
            { LOWER: 0, UPPER: 60 },
            { LOWER: 0, UPPER: 60 }
        ],
        STATES: {
            WAITING: 0,
            ONGOING: 1,
            STOPPED: 2
        },
        checkNumber: function (n) {
            if (isNaN(n)) throw new TypeError("Input must be a number");
            return Number(n);
        },
        checkLocale: function (str) {
            if (typeof str === "string" && (str === h.LOCALES.utc || h.LOCALES.utc_regex.test(str)))
                return h.LOCALES.utc;
            else if (typeof str === "string" && (str === h.LOCALES.sbst || h.LOCALES.sbst_regex.test(str)))
                return h.LOCALES.sbst;
            return false;
        },
        getMsg: function () {
            var m = h.FMTMSG[arguments[0]];
            if (!m) return "";
            for (var i = 1; i < arguments.length; i++)
                m = m.replaceAll("$" + i, arguments[i]);
            return m;
        },
        fmtTime: function (hrs, m, s, s_72th) {
            return h.getMsg("formatTime", String(hrs).padStart(2, "0"), String(m).padStart(2, "0"), String(s).padStart(2, "0"),
                (s_72th ? h.getMsg("format72th", s_72th) : "")).trim();
        },
        fmtFullDuration: function (y, mo, d, hrs, m, s, s_72th) {
            return h.getMsg("formatFullDuration", y !== 0 ? h.getMsg("formatYears", y) : "",
                mo !== 0 ? h.getMsg("formatMonths", mo) : "",
                d !== 0 ? h.getMsg("formatDays", d) : "",
                h.fmtTime(hrs, m, s, s_72th)).replace(/\s{2,}/g, " ").trim();
        },
        toOrdinal: function (num) {
            return num + "-е"; 
        },
        getFirstNumber: function () {
            for (var i in arguments) {
                if (!isNaN(arguments[i])) return Number(arguments[i]);
            }
        }
    };

    h.SKYBLOCK_EPOCH = {
        UNIX_TS_UTC: 1560275700,
        UNIX_TS_SBST: 1560275700 * h.MAGIC_RATIO, // Исправлено с h.RATIOS.magic
        SKYBLOCK_TS_UTC: 0,
        SKYBLOCK_TS_SBST: 0
    };
    h.ALPHA_SKYBLOCK_EPOCH = {
        UNIX_TS_UTC: 1560275700,
        UNIX_TS_SBST: 1560275700 * h.MAGIC_RATIO,
        SKYBLOCK_TS_UTC: 0,
        SKYBLOCK_TS_SBST: 0
    };

    /*** SkyDuration ***/
    function SkyDuration(locale, seconds, minutes, hours, days, months, years) {
        this.setDuration(locale, seconds, minutes, hours, days, months, years);
    }

    SkyDuration.prototype.setDuration = function (locale, seconds, minutes, hours, days, months, years) {
        var str = ["string", "number"].includes(typeof locale) && String(locale) || "";
        var duration = 0;
        if (!isNaN(str)) {
            this.locale = h.LOCALES.utc;
            duration = Number(str) * h.MAGIC_RATIO;
        } else {
            this.locale = h.checkLocale(str) || h.LOCALES.sbst;
            var data = this.durationTextParser(str);
            if (!Object.values(data).every(isNaN)) {
                duration = (data[h.UNITS.second] || 0) + (data[h.UNITS.minute] || 0) * h.RATIOS[h.UNITS.minute] + (data[h.UNITS.hour] || 0) * h.RATIOS[h.UNITS.hour] + (data[h.UNITS.day] || 0) * h.RATIOS[h.UNITS.day];
                if (this.locale === h.LOCALES.sbst)
                    duration += (data[h.UNITS.month] || 0) * h.RATIOS[h.UNITS.month] + (data[h.UNITS.year] || 0) * h.RATIOS[h.UNITS.year];
                else
                    duration *= h.MAGIC_RATIO;
            } else {
                duration = (seconds || 0) + (minutes || 0) * h.RATIOS[h.UNITS.minute] + (hours || 0) * h.RATIOS[h.UNITS.hour] + (days || 0) * h.RATIOS[h.UNITS.day];
                if (this.locale === h.LOCALES.sbst)
                    duration += (months || 0) * h.RATIOS[h.UNITS.month] + (years || 0) * h.RATIOS[h.UNITS.year];
                else
                    duration *= h.MAGIC_RATIO;
            }
        }
        this.duration = Math.floor(duration);
        this.sbstSeconds = this.duration % h.RATIOS[h.UNITS.minute];
        this.sbstMinutes = Math.floor(this.duration % h.RATIOS[h.UNITS.hour] / h.RATIOS[h.UNITS.minute]);
        this.sbstHours = Math.floor(this.duration % h.RATIOS[h.UNITS.day] / h.RATIOS[h.UNITS.hour]);
        this.sbstDays = Math.floor(this.duration % h.RATIOS[h.UNITS.month] / h.RATIOS[h.UNITS.day]);
        this.sbstMonths = Math.floor(this.duration % h.RATIOS[h.UNITS.year] / h.RATIOS[h.UNITS.month]);
        this.sbstYears = Math.floor(this.duration / h.RATIOS[h.UNITS.year]);
        
        this.utc72thSecs = this.duration % h.MAGIC_RATIO;
        var totalUtcSecs = Math.floor(this.duration / h.MAGIC_RATIO);
        this.utcSeconds = totalUtcSecs % h.RATIOS[h.UNITS.minute];
        this.utcMinutes = Math.floor(totalUtcSecs % h.RATIOS[h.UNITS.hour] / h.RATIOS[h.UNITS.minute]);
        this.utcHours = Math.floor(totalUtcSecs % h.RATIOS[h.UNITS.day] / h.RATIOS[h.UNITS.hour]);
        this.utcDays = Math.floor(totalUtcSecs / h.RATIOS[h.UNITS.day]);
        
        this.computing = {
            SBST: [this.sbstYears, this.sbstMonths, this.sbstDays, this.sbstHours, this.sbstMinutes, this.sbstSeconds],
            UTC: [null, null, this.utcDays, this.utcHours, this.utcMinutes, this.utcSeconds, this.utc72thSecs]
        };
        this.utcString = h.fmtFullDuration(0, 0, this.utcDays, this.utcHours, this.utcMinutes, this.utcSeconds, this.utc72thSecs);
        this.sbstString = h.fmtFullDuration(this.sbstYears, this.sbstMonths, this.sbstDays, this.sbstHours, this.sbstMinutes, this.sbstSeconds);
        return this;
    };

    SkyDuration.prototype.toString = function () { return this.utcString + " (UTC), " + this.sbstString + " (SBST)"; };
    SkyDuration.prototype.valueOf = function () { return this.duration; };
    SkyDuration.prototype.addUTCTime = function (unit, value) {
        if (unit >= h.UNITS.day && unit <= h.UNITS.second) this.addSBSTTime(h.UNITS.second, h.checkNumber(value) * h.RATIOS[unit] * h.MAGIC_RATIO);
        return this;
    };
    SkyDuration.prototype.addSBSTTime = function (unit, value) {
        if (unit >= h.UNITS.year && unit <= h.UNITS.second) this.setDuration(h.LOCALES.sbst, this.valueOf() + h.checkNumber(value));
        return this;
    };
    
    // Улучшенный парсер: поддерживает английские и русские сокращения
    SkyDuration.prototype.durationTextParser = function (str) {
        var match;
        return [
            (match = str.match(/(?:^|\s)(\d+)(?:y|г|год|года|лет)(?=\s|$)/i)) ? Number(match[1]) : undefined,
            (match = str.match(/(?:^|\s)(\d+)(?:mo|мес|месяц|месяца|месяцев)(?=\s|$)/i)) ? Number(match[1]) : undefined,
            (match = str.match(/(?:^|\s)(\d+)(?:d|д|день|дня|дней)(?=\s|$)/i)) ? Number(match[1]) : undefined,
            (match = str.match(/(?:^|\s)(\d+)(?:h|ч|час|часа|часов)(?=\s|$)/i)) ? Number(match[1]) : undefined,
            (match = str.match(/(?:^|\s)(\d+)(?:m|м|мин|минут|минуты)(?=\s|$)/i)) ? Number(match[1]) : undefined,
            (match = str.match(/(?:^|\s)(\d+)(?:s|с|сек|секунд|секунды)(?=\s|$)/i)) ? Number(match[1]) : undefined,
        ];
    };

    /*** SkyDate ***/
    function SkyDate(locale, year, monthIndex, day, hours, minutes, seconds) {
        this.setTime(locale, year, monthIndex, day, hours, minutes, seconds);
    }

    SkyDate.prototype.setTime = function (locale, year, monthIndex, day, hours, minutes, seconds) {
        if (locale instanceof SkyDuration) {
            this.locale = h.LOCALES.sbst;
            this.duration = locale;
        } else if (locale instanceof Date) {
            this.locale = h.LOCALES.utc;
            this.duration = this.durationFromUTCUnixTime(locale.valueOf() / 1000);
        } else if (!isNaN(locale)) {
            this.locale = h.LOCALES.utc;
            this.duration = this.durationFromUTCUnixTime(Number(locale));
        } else {
            var str = ["string", "number"].includes(typeof locale) ? String(locale) : "";
            this.locale = h.checkLocale(str) || h.LOCALES.sbst;
            var meme = [year, monthIndex, day, hours, minutes, seconds];
            var data = this.dateTextParser(str);
            var current = this.currentTime();
            var most_significant, i;
            for (i = 0; i < 6; i++) {
                if (isNaN(most_significant)) {
                    if (!(isNaN(meme[i]) && isNaN(data[i]))) most_significant = i;
                    meme[i] = h.getFirstNumber(meme[i], data[i], current[this.locale][i]);
                } else {
                    meme[i] = h.getFirstNumber(meme[i], data[i], h.UNIT_LIMITS[i].LOWER);
                }
            }
            if (this.locale === h.LOCALES.utc) {
                var ts = Date.UTC(meme[h.UNITS.year], meme[h.UNITS.month], meme[h.UNITS.day], meme[h.UNITS.hour], meme[h.UNITS.minute], meme[h.UNITS.second]) / 1000;
                this.duration = this.durationFromUTCUnixTime(ts);
            } else {
                this.duration = new SkyDuration(h.LOCALES.sbst, meme[h.UNITS.second] || 0, meme[h.UNITS.minute] || 0, meme[h.UNITS.hour] || 0, meme[h.UNITS.day] - 1, meme[h.UNITS.month], meme[h.UNITS.year] - 1);
            }
        }
        this.date = this.dateFromDuration(this.duration);
        this.sbstFullYear = this.duration.sbstYears + 1;
        this.sbstMonth = this.duration.sbstMonths;
        this.sbstDate = this.duration.sbstDays + 1;
        this.sbstHour = this.duration.sbstHours;
        this.sbstMinute = this.duration.sbstMinutes;
        this.sbstSecond = this.duration.sbstSeconds;
        
        this.computing = { SBST: [this.sbstFullYear, this.sbstMonth, this.sbstDate, this.sbstHour, this.sbstMinute, this.sbstSecond] };
        this.sbstOrdinalDate = h.toOrdinal(this.sbstDate);
        this.utcOrdinalDate = h.toOrdinal(this.date.getUTCDate());
        this.localOrdinalDate = h.toOrdinal(this.date.getDate());
        
        this.sbstFullMonth = this.FULLMONTHS_SBST[this.sbstMonth];
        this.utcFullMonth = this.FULLMONTHS_UTC[this.date.getUTCMonth()];
        this.localFullMonth = this.FULLMONTHS_UTC[this.date.getMonth()];
        this.sbstShortMonth = this.SHORTMONTHS_SBST[this.sbstMonth];
        this.utcShortMonth = this.SHORTMONTHS_UTC[this.date.getUTCMonth()];
        this.localShortMonth = this.SHORTMONTHS_UTC[this.date.getMonth()];
        
        this.sbstDateString = h.getMsg("formatSBSTDate", this.sbstFullYear, this.sbstFullMonth, this.sbstDate, this.sbstOrdinalDate);
        var hour12 = (this.sbstHour % 12) === 0 ? 12 : this.sbstHour % 12;
        this.sbstTimeString = h.getMsg("formatSBSTTime", hour12.toString().padStart(2, "0"), this.sbstMinute.toString().padStart(2, "0"), h.FMTMSG.AMPM[this.sbstHour < 12 ? 0 : 1]);
        this.sbstString = h.getMsg("formatSBSTFullDate", this.sbstDateString, this.sbstTimeString);
        
        this.SKYBLOCK_TS_SBST = this.duration.valueOf();
        this.SKYBLOCK_TS_UTC = Math.floor(this.duration.valueOf() / h.MAGIC_RATIO);
        this.UNIX_TS_SBST = this.EPOCH.UNIX_TS_SBST + this.SKYBLOCK_TS_SBST;
        this.UNIX_TS_UTC = this.EPOCH.UNIX_TS_UTC + this.SKYBLOCK_TS_UTC;
        return this;
    };

    SkyDate.prototype.setSBSTTimestamp = function (ts) { return this.setTime(new SkyDuration(h.LOCALES.sbst, ts)); };
    SkyDate.prototype.setUTCTimestamp = function (ts) { return this.setTime(this.durationFromUTCUnixTime(ts)); };
    SkyDate.prototype.addDuration = function (sbstSeconds) { this.duration.addSBSTTime(h.UNITS.second, sbstSeconds); return this.setTime(this.duration); };
    SkyDate.prototype.setSBSTTime = function (unit, value) {
        if (unit >= h.UNITS.year && unit <= h.UNITS.second) this.duration.addSBSTTime(unit, h.checkNumber(value) - this.computing.SBST[unit]);
        return this.setTime(this.duration);
    };
    SkyDate.prototype.setLocalTime = function (unit, value) {
        if (unit >= h.UNITS.year && unit <= h.UNITS.second) this.date["set" + h.DATE_FUNC_MAP[unit]](h.checkNumber(value));
        return this.setUTCTimestamp(this.date.valueOf() / 1000);
    };
    SkyDate.prototype.setUTCTime = function (unit, value) {
        if (unit >= h.UNITS.year && unit <= h.UNITS.second) this.date["setUTC" + h.DATE_FUNC_MAP[unit]](h.checkNumber(value));
        return this.setUTCTimestamp(this.date.valueOf() / 1000);
    };
    SkyDate.prototype.valueOf = function () { return this.SKYBLOCK_TS_SBST; };
    SkyDate.prototype.toString = function () { return this.sbstString; };
    SkyDate.prototype.EPOCH = h.SKYBLOCK_EPOCH;
    
    SkyDate.prototype.currentTime = function () {
        var currentDate = new Date();
        var currentDuration = (new SkyDuration(h.LOCALES.utc, Date.now() / 1000 - this.EPOCH.UNIX_TS_UTC)).computing.SBST;
        var result = {};
        result[h.LOCALES.utc] = [currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate(), currentDate.getUTCHours(), currentDate.getUTCMinutes(), currentDate.getUTCSeconds()];
        result[h.LOCALES.sbst] = [currentDuration[0] + 1, currentDuration[1], currentDuration[2] + 1, currentDuration[3], currentDuration[4], currentDuration[5]];
        return result;
    };
    SkyDate.prototype.durationFromUTCUnixTime = function (ts) { return new SkyDuration(h.LOCALES.utc, ts - this.EPOCH.UNIX_TS_UTC); };
    SkyDate.prototype.dateFromDuration = function (duration) { return new Date((duration.valueOf() / h.MAGIC_RATIO + this.EPOCH.UNIX_TS_UTC) * 1000); };
    
    // Улучшенный парсер месяцев: поддерживает русские и английские названия
    SkyDate.prototype.matchMonth = function (str) {
        var utcAliases = [
            ["янв", "january", "jan", "янв.", "январь"],
            ["февр", "february", "feb", "февр.", "февраль"],
            ["мар", "march", "mar", "мар.", "март"],
            ["апр", "april", "apr", "апр.", "апрель"],
            ["май", "may", "мая"],
            ["июн", "june", "jun", "июн.", "июнь"],
            ["июл", "july", "jul", "июл.", "июль"],
            ["авг", "august", "aug", "авг.", "август"],
            ["сент", "september", "sep", "sept", "сент.", "сентябрь"],
            ["окт", "october", "oct", "окт.", "октябрь"],
            ["нояб", "november", "nov", "нояб.", "ноябрь"],
            ["дек", "december", "dec", "дек.", "декабрь"]
        ];
        var sbstAliases = [
            ["ранняя весна", "ран. весна", "esp", "early spring"],
            ["весна", "spring", "sp"],
            ["поздняя весна", "позд. весна", "lsp", "late spring"],
            ["раннее лето", "ран. лето", "esu", "early summer"],
            ["лето", "summer", "su"],
            ["позднее лето", "позд. лето", "lsu", "late summer"],
            ["ранняя осень", "ран. осень", "eau", "early autumn", "early fall"],
            ["осень", "autumn", "fall", "au"],
            ["поздняя осень", "позд. осень", "lau", "late autumn", "late fall"],
            ["ранняя зима", "ран. зима", "ewi", "early winter"],
            ["зима", "winter", "wi"],
            ["поздняя зима", "позд. зима", "lwi", "late winter"]
        ];
        var lowerStr = str.toLowerCase();
        for (var i = 0; i < 12; i++) {
            for (var j = 0; j < utcAliases[i].length; j++) {
                if (lowerStr.indexOf(utcAliases[i][j]) !== -1) return i;
            }
            for (var k = 0; k < sbstAliases[i].length; k++) {
                if (lowerStr.indexOf(sbstAliases[i][k]) !== -1) return i;
            }
        }
        return -1;
    };

    SkyDate.prototype.dateTextParser = function (str) {
        var match;
        return [
            (match = str.match(/(?:^|\s)Y(\d+)(?=\s|$)/i)) ? Number(match[1]) : undefined,
            (match = str.match(/(?:^|\s)M(\d+)(?=\s|$)/i)) ? Number(match[1]) - 1 : (match = str.match(/([A-Za-zА-Яа-я]{2,})/i)) ? this.matchMonth(match[1]) : undefined,
            (match = str.match(/(?:^|\s)D(\d+)(?=\s|$)/i)) ? Number(match[1]) : undefined,
            (match = str.match(/(?:^|\s)(\d+):/)) ? Number(match[1]) : undefined,
            (match = str.match(/(?:^|\s)\d*:(\d+)/)) ? Number(match[1]) : undefined,
            (match = str.match(/(?:^|\s)\d*:\d*:(\d+)/)) ? Number(match[1]) : undefined
        ];
    };

    SkyDate.prototype.INPUTMONTHS_UTC = ["янв.", "февр.", "мар.", "апр.", "мая", "июн.", "июл.", "авг.", "сент.", "окт.", "нояб.", "дек."];
    SkyDate.prototype.INPUTMONTHS_SBST = ["Ран. весна", "Весна", "Позд. весна", "Ран. лето", "Лето", "Позд. лето", "Ран. осень", "Осень", "Позд. осень", "Ран. зима", "Зима", "Позд. зима"];
    SkyDate.prototype.SHORTMONTHS_UTC = h.FMTMSG.SHORTMONTHS_UTC;
    SkyDate.prototype.SHORTMONTHS_SBST = h.FMTMSG.SHORTMONTHS_SBST;
    SkyDate.prototype.FULLMONTHS_UTC = h.FMTMSG.FULLMONTHS_UTC;
    SkyDate.prototype.FULLMONTHS_SBST = h.FMTMSG.FULLMONTHS_SBST;

    /*** SkyRoutine ***/
    function SkyRoutine(str) {
        this.tasksId = -1;
        this.tasks = [];
        this.taskStack = [];
        this.definition = str;
    }

    var countdownStackId = -1;
    var countdownStack = [];
    var countdownStackAdd = function (callback) {
        countdownStackId++;
        countdownStack[countdownStackId] = callback;
        return countdownStackId;
    };
    var countdownStackRemove = function (id) {
        if (id in countdownStack) { delete countdownStack[id]; return true; }
        return false;
    };
    var alignTout = setTimeout(function () {
        clearTimeout(alignTout);
        setInterval(function () { for (var i in countdownStack) countdownStack[i](); }, 1000);
        for (var i in countdownStack) countdownStack[i]();
    }, (new Date()).valueOf() % 1000);

    SkyRoutine.prototype.trigger = function (str) {
        this.definition = str || this.definition;
        var data = this.routineTextParser(this.definition);
        var chosenLocale = h.checkLocale(data.anchor) || h.LOCALES.sbst;
        var i;
        this.anchor = new this.SkyDateConstructor(data.anchor);
        this.totalduration = this.totalbreak = this.cycleExecutions = this.routineExecutions = 0;
        this.currentEventTime = this.nextEventTime = undefined;
        this.routinePtr = -1;
        
        this.cycle = (data.cycle || "0/0").split("/");
        if (this.cycle.length % 2 === 1) this.cycle.push(0);
        for (i = 0; i < this.cycle.length; i++) {
            var v = this.cycle[i].toString().trim();
            this.cycle[i] = v !== "" && !isNaN(v) ? new SkyDuration(chosenLocale, v) : new SkyDuration(v || 0);
            this.totalduration += i % 2 === 0 ? this.cycle[i].valueOf() : 0;
            this.totalbreak += i % 2 === 1 ? this.cycle[i].valueOf() : 0;
        }
        this.cycleTime = this.totalduration + this.totalbreak;
        this.executeOnce = this.cycleTime < 1;
        
        if (this.executeOnce) this.limit = 1;
        if (!isNaN(data.limit)) {
            this.limit = Number(data.limit);
            this.cycleLimit = Math.floor(this.limit / (this.cycle.length / 2));
        }
        if (!!data.until) this.until = new this.SkyDateConstructor(data.until);
        
        var currentDate = new this.SkyDateConstructor();
        if (currentDate < this.anchor) {
            this.currentState = h.STATES.WAITING;
            this.nextEventTime = this.anchor;
        } else {
            var lastCycleStart, lastRoutineStart;
            if (this.executeOnce) {
                this.cycleExecutions = 1;
                lastRoutineStart = lastCycleStart = this.anchor;
            } else {
                this.cycleExecutions = Math.floor(((this.until && (this.until < currentDate) ? this.until : currentDate) - this.anchor) / this.cycleTime + 1);
                if (this.cycleLimit) this.cycleExecutions = Math.min(this.cycleLimit, this.cycleExecutions);
                lastRoutineStart = lastCycleStart = this.anchor + (this.cycleExecutions - 1) * this.cycleTime;
            }
            var doubleRoutineCount = (this.cycleExecutions - 1) * this.cycle.length;
            var cumulated = 0;
            for (i = 0; i < this.cycle.length; i++) {
                if (lastRoutineStart + (cumulated + this.cycle[i]) > currentDate) {
                    this.routinePtr = i;
                    doubleRoutineCount += i;
                    lastRoutineStart += cumulated;
                    break;
                }
                cumulated += this.cycle[i];
            }
            this.routineExecutions = Math.floor(doubleRoutineCount / 2) + 1;
            if (this.limit) this.routineExecutions = Math.min(this.limit, this.routineExecutions);

            if (this.executeOnce || (this.limit && this.limit >= 0 && this.routineExecutions >= this.limit) || (this.until && currentDate >= this.until)) {
                if (this.routinePtr % 2 === 1 || lastRoutineStart + this.getPeriod() < currentDate) {
                    this.currentState = h.STATES.STOPPED;
                } else {
                    this.currentState = h.STATES.ONGOING;
                    this.currentEventTime = lastRoutineStart;
                    this.nextEventTime = lastRoutineStart + this.getPeriod();
                }
            } else {
                this.currentState = this.routinePtr % 2 === 0 ? h.STATES.ONGOING : h.STATES.WAITING;
                this.currentEventTime = lastRoutineStart;
                this.nextEventTime = lastRoutineStart + this.getPeriod();
            }
        }
        if (this.currentState === h.STATES.ONGOING) this.onEventStart(true);
        else this.onEventEnd(true);
    };

    SkyRoutine.prototype.pause = function () {
        for (var i in this.taskStack) clearTimeout(this.taskStack[i]);
        this.taskStack = [];
    };
    SkyRoutine.prototype.removeTimeout = function (id) { this.taskStack.splice(this.taskStack.indexOf(id), 1); };
    SkyRoutine.prototype.addEvent = function (eventState, callback) {
        if (Object.values(h.STATES).includes(eventState)) {
            this.tasksId++;
            this.tasks[this.tasksId] = { event: eventState, cb: callback };
            if (this.currentState === eventState) callback(this.currentState);
            return this.tasksId;
        }
    };
    SkyRoutine.prototype.removeEvent = function (id) {
        if (id in this.tasks) { delete this.tasks[id]; return true; }
        return false;
    };
    SkyRoutine.prototype.getPeriod = function (forward) {
        if (this.routinePtr + (forward || 0) < 0) return 0;
        return this.cycle[(this.routinePtr + (forward || 0)) % this.cycle.length];
    };
    SkyRoutine.prototype.advancePeriod = function (forward) { this.routinePtr = (this.routinePtr + (forward || 0)) % this.cycle.length; };
    
    SkyRoutine.prototype.onEventStart = function (noStateChanges) {
        if (!noStateChanges) {
            this.advancePeriod(1);
            this.currentEventTime = this.nextEventTime;
            this.nextEventTime += this.getPeriod(0);
            this.currentState = h.STATES.ONGOING;
            this.routineExecutions++;
            this.cycleExecutions += this.routinePtr === 0 ? 1 : 0;
        }
        this.callEventSet(h.STATES.ONGOING);
        this.passTheBall(this.onEventEnd.bind(this), this.nextEventTime);
        if ((this.limit && this.routineExecutions >= this.limit) || (this.until && this.nextEventTime >= this.until)) this.nextEventTime = null;
    };
    
    SkyRoutine.prototype.onEventEnd = function (noStateChanges) {
        if (!this.nextEventTime) {
            this.currentState = h.STATES.STOPPED;
            this.currentEventTime = undefined;
            this.callEventSet(h.STATES.STOPPED);
            return;
        }
        if (!noStateChanges) {
            this.advancePeriod(1);
            this.currentEventTime = this.nextEventTime;
            this.nextEventTime += this.getPeriod(0);
            this.currentState = h.STATES.WAITING;
        }
        this.callEventSet(h.STATES.WAITING);
        this.passTheBall(this.onEventStart.bind(this), this.nextEventTime);
    };
    
    SkyRoutine.prototype.passTheBall = function (callback, startSkyDate) {
        var now = new this.SkyDateConstructor();
        var till = Math.floor(Math.max(startSkyDate - now, 0) / h.MAGIC_RATIO * 1000);
        var _this = this;
        if (till < 86400000) {
            var tout = setTimeout(function () {
                callback();
                _this.removeTimeout(tout);
            }, till);
            _this.taskStack.push(tout);
        }
    };
    
    SkyRoutine.prototype.callEventSet = function (eventset) {
        for (var i in this.tasks) if (this.tasks[i].event === eventset) this.tasks[i].cb(this.currentState);
    };
    
    SkyRoutine.prototype.startCountdown = function (callback) {
        var _this = this;
        var countTo = this.nextEventTime / h.MAGIC_RATIO,
            countToDate = new this.SkyDateConstructor(new SkyDuration(h.LOCALES.sbst, this.nextEventTime)),
            countFromDate = new this.SkyDateConstructor(new SkyDuration(h.LOCALES.sbst, this.currentEventTime));
        var stopCountdown = function (id) { countdownStackRemove(id); };
        var countdownId = countdownStackAdd(function () {
            var now = Date.now() / 1000 - _this.EPOCH.UNIX_TS_UTC;
            var utcSecondsRemain = Math.floor(countTo - now);
            if (utcSecondsRemain <= 0) countdownStackRemove(countdownId);
            callback(stopCountdown.bind(null, countdownId), utcSecondsRemain, countToDate, countFromDate, _this.currentState);
        });
    };
    
    SkyRoutine.prototype.SkyDateConstructor = SkyDate;
    SkyRoutine.prototype.EPOCH = h.SKYBLOCK_EPOCH;
    
    SkyRoutine.prototype.routineTextParser = function (str) {
        var match;
        return {
            cycle: (match = str.match(/(?:^|\s)C\[(.*?)\]/)) ? match[1] : undefined,
            limit: (match = str.match(/(?:^|\s)L\[(.*?)\]/)) ? match[1] : undefined,
            until: (match = str.match(/(?:^|\s)U\[(.*?)\]/)) ? match[1] : undefined,
            anchor: (match = str.match(/(?:^|\s)A\[(.*?)\]/)) ? match[1] : undefined
        };
    };

    /*** Alpha Network Classes ***/
    function SkyDateAlpha() { SkyDate.apply(this, arguments); }
    Object.setPrototypeOf(SkyDateAlpha.prototype, SkyDate.prototype);
    SkyDateAlpha.prototype.EPOCH = h.ALPHA_SKYBLOCK_EPOCH;

    function SkyRoutineAlpha() { SkyRoutine.apply(this, arguments); }
    Object.setPrototypeOf(SkyRoutineAlpha.prototype, SkyRoutine.prototype);
    SkyRoutineAlpha.prototype.SkyDateConstructor = SkyDateAlpha;
    SkyRoutineAlpha.prototype.EPOCH = h.ALPHA_SKYBLOCK_EPOCH;

    // Экспорт в глобальную область видимости с новым именем
    window[wikiname].sbte = $.extend(window[wikiname].sbte, {
        SkyDuration: SkyDuration,
        SkyDate: SkyDate,
        SkyRoutine: SkyRoutine,
        SkyDateAlpha: SkyDateAlpha,
        SkyRoutineAlpha: SkyRoutineAlpha,
        helpers: h,
    });

    // MediaWiki hook
    mw.hook(wikiname + ".sbte").fire(window[wikiname].sbte);

})(window, jQuery, mediaWiki);