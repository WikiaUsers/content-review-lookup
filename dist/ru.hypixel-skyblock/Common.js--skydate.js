/* <pre> */
// This script allows for showing the the next appearance of an in-game date in the real world on the wiki

/* jshint
    esversion: 6, forin: true,
    immed: true, indent: 4,
    latedef: true, newcap: true,
    noarg: true, undef: true,
    undef: true, unused: true,
    browser: true, jquery: true,
    onevar: true, eqeqeq: true,
    multistr: true, maxerr: 999999,
    -W082, -W084
*/

/* global mw */

(function () {
    var /* class */ SkyDate; // defining here so that jshint won't complain

    function main(pSection) {
        var timestampEl = pSection && $(pSection).find(".skydate-timestamp") || $(".skydate-timestamp"),
            countdownEl = pSection && $(pSection).find(".skydate-countdown") || $(".skydate-countdown");
        timestampEl.each(function () {
            const cont = $(this);
            var skyDate = new SkyDate(cont.data("skydate"));
            // console.log( "SkyDate: ", skyDate, skyDate.toDate() );
            cont.html(skyDate.toDate().toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric"
            }));
        });
        // Early Spring 1 00:00 @ sep 3, 3:55 --- next at nov 8th, 7:55?
        countdownEl.each(function () {
            var cont = $(this);
            var dateString = cont.data("skydate-start");
            var endDateString = cont.data("skydate-end");

            var skyDate = new SkyDate(dateString);
            var skyEndDate = new SkyDate(endDateString);
            skyDate.year = skyEndDate.year; // This makes sure if we're in the middle of an event the years match
            var date = skyDate.toDate();
            var endDate = skyEndDate.toDate();

            // console.log( "SkyDate: ", skyDate, date, date.getYear() );
            //cont.html( `Sky Date: ${skyDate.toString()}<br />Real Date: ${date}<br />Countdown:`);
            var countdownDiv = $("<span>").appendTo(cont);

            countdownDiv.countdown(date, {
                    elapse: true
                })
                .on("update.countdown", function (event) {
                    var curDate = new Date();
                    if (curDate < date) {
                        $(this).html(event.strftime("%-d days %H:%M:%S"));
                    } else if (curDate >= date && curDate <= endDate) {
                        $(this).html("<span class=\"skydate-countdown-active\">ACTIVE</span>");
                    } else if (curDate > endDate) {
                        // Restart
                        skyDate = new SkyDate(dateString);
                        skyEndDate = new SkyDate(endDateString);
                        skyDate.year = skyEndDate.year; // This makes sure if we're in the middle of an event the years match
                        date = skyDate.toDate();
                        endDate = skyEndDate.toDate();

                        countdownDiv.countdown(date);
                    }
                })
                .on("finish.countdown", function () {
                    $(this).html("<span class=\"skydate-countdown-active\">ACTIVE</span>");
                });
        });
        $(".skydate-clock").each(function () {
            var clockCont = $(this).show(); // Hidden by default to show awkward text before script runs, so make sure to show it
            // Fields
            var cont = {
                h24: ".hour24",
                h12: ".hour12",
                min: ".minute",
                minAct: ".minute-actual",
                ampm: ".ampm",
                day: ".day",
                dayOrd: ".day-ordinal",
                season: ".season",
                month: ".month",
                year: ".year",
            };
            Object.keys(cont).forEach(function (key) {
                cont[key] = clockCont.find(cont[key]);
            });

            // Update function
            const setCurrentDate = function () {
                var skyDate = new SkyDate();

                // Time
                cont.h24.html(skyDate.hour.toString().padStart(2, "0"));
                cont.h12.html((skyDate.hour % 12 === 0 ? 12 : skyDate.hour % 12).toString().padStart(2, "0"));
                // In-game skyblock time only shows minutes rounded to the 10th place
                cont.min.html((Math.floor(skyDate.minute / 10) * 10).toString().padStart(2, "0"));
                cont.minAct.html(skyDate.minute.toString().padStart(2, "0"));
                cont.ampm.html(skyDate.getAmPm());

                // Date
                cont.day.html(skyDate.day);
                cont.dayOrd.html(skyDate.getDayAsOrdinal());
                cont.season.html(skyDate.getMonthName());
                cont.month.html(skyDate.month + 1);
                cont.year.html(skyDate.year);
            };

            setCurrentDate();
            setInterval(setCurrentDate, 500); // Updates every 0.5 seconds since skyblock minutes are actually shorter than irl seconds
        });
    }

    const IRL_TO_SKYBLOCK_MULTI = 24 * 3; // ex: 1 irl hour = 3 days
    const MILLISECOND_TO_DAY_MULTI = 1 / (1000 * 60 * 60 * 24); // jshint ignore:line
    const DAYS_IN_SKY_MONTH = 31;
    const MILLISECOND_TO_MONTH_MULTI = 1 / (1000 * 60 * 60 * 24 * DAYS_IN_SKY_MONTH); // jshint ignore:line
    const MILLISECOND_TO_YEAR_MULTI = 1 / (1000 * 60 * 60 * 24 * DAYS_IN_SKY_MONTH * 12); // jshint ignore:line
    const COMPARE_BASE = {
        IRL_DATE: new Date(1560275700000), // Sky Date: Spring 1, Year 1, 00:00 (12:00 am)
        SKY_YEAR: 1,
        SKY_MONTH: 0,
        SKY_DAY: 1,
        SKY_HOUR: 0,
        SKY_MINUTE: 0,
    };

    const MONTH = {
        ESP: 0,
        SP: 1,
        LSP: 2,

        ESU: 3,
        SU: 4,
        LSU: 5,

        EAU: 6,
        AU: 7,
        LAU: 8,

        EWI: 9,
        WI: 10,
        LWI: 11,
    };

    ////////////////////////////////////
    // Parses date (filling in any blanks for next possible date that fits given data)
    // Ex: if passed in date is early spring but current sky date is winter, instead of assigning date the same sky year as current (which would be in the past), it would give it the next sky year.
    // Allows exporting to real date time
    ////////////////////////////////////
    /* SkyDate class definition */
    SkyDate = (function () {

        function SkyDate(str) {
            if (!str) {
                this._setToNow();
                return;
            }
            const data = this._parseSkyDate(str);
            this.minute = data.minute ? parseInt(data.minute) : 0;
            this.hour = data.hour ? parseInt(data.hour) : 0;
            this.day = data.day ? parseInt(data.day) : 1;
            this.month = data.month ? MONTH[data.month] : MONTH.ESP;
            if (data.year)
                this.year = data.year;
            else
                this._calcNextSkyYearForDateToOccur();
        }

        SkyDate.prototype._calcNextSkyYearForDateToOccur = function () {
            const curSkyDate = new SkyDate();
            this.year = curSkyDate.year;
            // If date already past for current year, then set to next instance
            if (this < curSkyDate)
                this.year++;
        };

        SkyDate.prototype._setToNow = function () {
            this._setToIrlDate(new Date());
        };

        SkyDate.prototype._setToIrlDate = function (date) {
            const millisecondsBetween = date - COMPARE_BASE.IRL_DATE;
            const skyblockMinuteBetween = millisecondsBetween / (1000 * 60) * IRL_TO_SKYBLOCK_MULTI;

            var leftovers = skyblockMinuteBetween;
            var divBy = 60 * 24 * DAYS_IN_SKY_MONTH * 12;
            this.year = COMPARE_BASE.SKY_YEAR + Math.floor(leftovers / divBy);
            leftovers = leftovers % divBy;
            divBy = 60 * 24 * DAYS_IN_SKY_MONTH;
            this.month = (COMPARE_BASE.SKY_MONTH + Math.floor(leftovers / divBy));
            if (this.month === 12) {
                this.month = 0;
                this.year++;
            }
            leftovers = leftovers % divBy;
            divBy = 60 * 24;
            this.day = COMPARE_BASE.SKY_DAY + Math.floor(leftovers / divBy);
            leftovers = leftovers % divBy;
            divBy = 60;
            this.hour = COMPARE_BASE.SKY_HOUR + Math.floor(leftovers / divBy);
            leftovers = leftovers % divBy;
            this.minute = COMPARE_BASE.SKY_MINUTE + Math.floor(leftovers);
        };

        SkyDate.prototype._parseSkyDate = function (str) {
            const FULL_SKY_DATE_REGEX = /(.*?)? (.*)?, ?(.*)/;
            const SKY_DAY_DATE_REGEX = /(.*)?, ?(.*)/;
            const SKY_DATE_REGEX = /(.*?)? (.*)?/;

            const SKY_TIME_REGEX = /(\d{1,2}):(\d{2})/;

            var match, match2;
            if (!!(match = str.match(FULL_SKY_DATE_REGEX))) {
                let month = match[1],
                    day = match[2],
                    time = match[3];
                match2 = time.match(SKY_TIME_REGEX);
                let hour = match2[1],
                    minute = match2[2];
                return {
                    month: month,
                    day: day,
                    hour: hour,
                    minute: minute
                };
            } else if (!!(match = str.match(SKY_DAY_DATE_REGEX))) {
                let day = match[1],
                    time = match[2];
                match2 = time.match(SKY_TIME_REGEX);
                let hour = match2[1],
                    minute = match2[2];
                return {
                    day: day,
                    hour: hour,
                    minute: minute
                };
            } else if (!!(match = str.match(SKY_DATE_REGEX))) {
                let month = match[1],
                    day = match[2];
                return {
                    month: month,
                    day: day
                };
            } else if (!!(match = str.match(SKY_TIME_REGEX))) {
                let hour = match[1],
                    minute = match[2];
                return {
                    hour: hour,
                    minute: minute
                };
            }
        };

        SkyDate.prototype.toDate = function () {
            const compareDate = new Date("20 Dec 2019 18:55:00 GMT"); // Sky Date: Late Spring 2, Year 38, 00:00 (12:00 am)
            var compYear = 38;
            var compMonth = 2;
            var compDay = 2;
            var compHour = 0;
            var compMinute = 0;

            var diffYear = this.year - compYear;
            var diffMonth = this.month - compMonth;
            var diffDay = this.day - compDay;
            var diffHour = this.hour - compHour;
            var diffMinute = this.minute - compMinute;

            var skyTimeBetweenInMinutes = diffMinute + (diffHour * 60) + (diffDay * 60 * 24) + (diffMonth * 60 * 24 * DAYS_IN_SKY_MONTH) + (diffYear * 60 * 24 * DAYS_IN_SKY_MONTH * 12);
            var irlMillisecondsBetween = (skyTimeBetweenInMinutes * 60 * 1000) / IRL_TO_SKYBLOCK_MULTI;

            var date = new Date(compareDate.getTime() + irlMillisecondsBetween);
            date.setMilliseconds(0);
            date.setSeconds(0);
            return date;
        };

        SkyDate.prototype.getMonthName = function () {
            return SkyDate.getFullMonthName(this.month);
        };

        SkyDate.prototype.getDayAsOrdinal = function () {
            return this._toOrdinal(this.day);
        };

        SkyDate.prototype.getAmPm = function () {
            return this.hour < 12 ? "am" : "pm";
        };

        SkyDate.prototype._toOrdinal = function (num) {
            if (num >= 11 && num <= 13)
                return num + "th";
            else if (num % 10 === 1)
                return num + "st";
            else if (num % 10 === 2)
                return num + "nd";
            else if (num % 10 === 3)
                return num + "rd";
            else
                return num + "th";
        };

        SkyDate.prototype._to12HourTime = function (hour, min) {
            const ampm = hour < 12 ? "am" : "pm";
            hour = (hour % 12);
            if (hour === 0) {
                hour = 12;
            }
            return (hour.toString().padStart(2, "0")) + ":" + (min.toString().padStart(2, "0")) + ampm;
        };

        // Default JavaScript method
        SkyDate.prototype.toString = function () {
            return this.getMonthName() +
                " " + this._toOrdinal(this.day) +
                " Y" + this.year + "," +
                " " + this._to12HourTime(this.hour, this.minute);
        };

        // Default JavaScript method
        SkyDate.prototype.valueOf = function () {
            return 1 +
                this.minute +
                this.hour * 60 +
                this.day * 60 * 24 +
                this.month * 60 * 24 * DAYS_IN_SKY_MONTH +
                this.year * 60 * 24 * DAYS_IN_SKY_MONTH * 12;
        };

        return SkyDate;
    })();

    SkyDate.getFullMonthName = function (month) {
        switch (month) {
            case MONTH.ESP:
                return "Early Spring";
            case MONTH.SP:
                return "Spring";
            case MONTH.LSP:
                return "Late Spring";

            case MONTH.ESU:
                return "Early Summer";
            case MONTH.SU:
                return "Summer";
            case MONTH.LSU:
                return "Late Summer";

            case MONTH.EAU:
                return "Early Autumn";
            case MONTH.AU:
                return "Autumn";
            case MONTH.LAU:
                return "Late Autumn";

            case MONTH.EWI:
                return "Early Winter";
            case MONTH.WI:
                return "Winter";
            case MONTH.LWI:
                return "Late Winter";
        }
        return null;
    };

    // jQuery.countdown
    // https://github.com/hilios/jQuery.countdown/blob/master/dist/jquery.countdown.min.js
    !function(a){"use strict";/*"function"==typeof define&&define.amd?define(["jquery"],a):*/a(window.jQuery)}(function(a){"use strict";function b(a){if(a instanceof Date)return a;if(String(a).match(g))return String(a).match(/^[0-9]*$/)&&(a=Number(a)),String(a).match(/\-/)&&(a=String(a).replace(/\-/g,"/")),new Date(a);throw new Error("Couldn't cast `"+a+"` to a date object.")}function c(a){var b=a.toString().replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1");return new RegExp(b)}function d(a){return function(b){var d=b.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);if(d)for(var f=0,g=d.length;f<g;++f){var h=d[f].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/),j=c(h[0]),k=h[1]||"",l=h[3]||"",m=null;h=h[2],i.hasOwnProperty(h)&&(m=i[h],m=Number(a[m])),null!==m&&("!"===k&&(m=e(l,m)),""===k&&m<10&&(m="0"+m.toString()),b=b.replace(j,m.toString()))}return b=b.replace(/%%/,"%")}}function e(a,b){var c="s",d="";return a&&(a=a.replace(/(:|;|\s)/gi,"").split(/\,/),1===a.length?c=a[0]:(d=a[0],c=a[1])),Math.abs(b)>1?c:d}var f=[],g=[],h={precision:100,elapse:!1,defer:!1};g.push(/^[0-9]*$/.source),g.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),g.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),g=new RegExp(g.join("|"));var i={Y:"years",m:"months",n:"daysToMonth",d:"daysToWeek",w:"weeks",W:"weeksToMonth",H:"hours",M:"minutes",S:"seconds",D:"totalDays",I:"totalHours",N:"totalMinutes",T:"totalSeconds"},j=function(b,c,d){this.el=b,this.$el=a(b),this.interval=null,this.offset={},this.options=a.extend({},h),this.firstTick=!0,this.instanceNumber=f.length,f.push(this),this.$el.data("countdown-instance",this.instanceNumber),d&&("function"==typeof d?(this.$el.on("update.countdown",d),this.$el.on("stoped.countdown",d),this.$el.on("finish.countdown",d)):this.options=a.extend({},h,d)),this.setFinalDate(c),this.options.defer===!1&&this.start()};a.extend(j.prototype,{start:function(){null!==this.interval&&clearInterval(this.interval);var a=this;this.update(),this.interval=setInterval(function(){a.update.call(a)},this.options.precision)},stop:function(){clearInterval(this.interval),this.interval=null,this.dispatchEvent("stoped")},toggle:function(){this.interval?this.stop():this.start()},pause:function(){this.stop()},resume:function(){this.start()},remove:function(){this.stop.call(this),f[this.instanceNumber]=null,delete this.$el.data().countdownInstance},setFinalDate:function(a){this.finalDate=b(a)},update:function(){if(0===this.$el.closest("html").length)return void this.remove();var a,b=new Date;return a=this.finalDate.getTime()-b.getTime(),a=Math.ceil(a/1e3),a=!this.options.elapse&&a<0?0:Math.abs(a),this.totalSecsLeft===a||this.firstTick?void(this.firstTick=!1):(this.totalSecsLeft=a,this.elapsed=b>=this.finalDate,this.offset={seconds:this.totalSecsLeft%60,minutes:Math.floor(this.totalSecsLeft/60)%60,hours:Math.floor(this.totalSecsLeft/60/60)%24,days:Math.floor(this.totalSecsLeft/60/60/24)%7,daysToWeek:Math.floor(this.totalSecsLeft/60/60/24)%7,daysToMonth:Math.floor(this.totalSecsLeft/60/60/24%30.4368),weeks:Math.floor(this.totalSecsLeft/60/60/24/7),weeksToMonth:Math.floor(this.totalSecsLeft/60/60/24/7)%4,months:Math.floor(this.totalSecsLeft/60/60/24/30.4368),years:Math.abs(this.finalDate.getFullYear()-b.getFullYear()),totalDays:Math.floor(this.totalSecsLeft/60/60/24),totalHours:Math.floor(this.totalSecsLeft/60/60),totalMinutes:Math.floor(this.totalSecsLeft/60),totalSeconds:this.totalSecsLeft},void(this.options.elapse||0!==this.totalSecsLeft?this.dispatchEvent("update"):(this.stop(),this.dispatchEvent("finish"))))},dispatchEvent:function(b){var c=a.Event(b+".countdown");c.finalDate=this.finalDate,c.elapsed=this.elapsed,c.offset=a.extend({},this.offset),c.strftime=d(this.offset),this.$el.trigger(c)}}),a.fn.countdown=function(){var b=Array.prototype.slice.call(arguments,0);return this.each(function(){var c=a(this).data("countdown-instance");if(void 0!==c){var d=f[c],e=b[0];j.prototype.hasOwnProperty(e)?d[e].apply(d,b.slice(1)):null===String(e).match(/^[$A-Z_][0-9A-Z_$]*$/i)?(d.setFinalDate.call(d,e),d.start()):a.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi,e))}else new j(this,b[0],b[1])})}}); // jshint ignore:line


    // This hook forces it to apply script even in TabViews
    mw.hook("wikipage.content").add(function (pSection) {
        main(pSection);
    });
})();