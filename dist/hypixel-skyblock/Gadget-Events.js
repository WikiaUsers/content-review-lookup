/** Unified Events Script
 * Script to load any Festive Events scripts at specific times of the year.
 * All script options are still fully customizable by the user.
 */
/* jshint
    esversion: 5, esnext: false, forin: true, immed: true, indent: 4,
    latedef: true, newcap: true, noarg: true, undef: true, unused: true,
    browser: true, jquery: true, onevar: true, eqeqeq: true, multistr: true,
    maxerr: 999999, forin: false, -W082, -W084
*/
/* global mediaWiki, console */
(function ($, mw) {
    "use strict";
    var thisdate = new Date(),
        thisyear = thisdate.getFullYear(),
        nextyear = thisyear + 1,
        conf = mw.config.get([
            "debug",
            "wgAction"
        ]);

    if (window.HSWEventsLoaded)
        return;
    window.HSWEventsLoaded = true;

    function assignDefault(obj, defaults) {
        window[obj] = Object.assign(defaults, window[obj] || {});
    }

    function loadScript(name, host, page, def) {
        mw.loader.getScript(host + "/load.php?mode=articles&only=scripts&articles=" + page).done(function () {
            if (def)
                def.resolve(window[name]);
        });
    }

    function deferredLoadScript(name, straightToResolve, host, page) {
        return $.Deferred(function (def) {
            if (straightToResolve)
                def.resolve(window[name]);
            else
                loadScript(name, host, page, def);
        });
    }

    var loadAndRun = {
        fireworkShow: function () {
            loadScript("fireworkShow", "https://hypixel-skyblock.fandom.com", "MediaWiki:Gadget-Events/FireworkEffects.js");
            $.when(window.fireworkShow.optionalDeferredRegister).then(function () {
                window.fireworkShow.start();
            });
        },
        EasterAddons: function () {
            loadScript("EasterAddons", "https://hypixel-skyblock.fandom.com", "MediaWiki:Gadget-Events/EasterAddons.js");
            $.when(window.EasterAddonsConfig.optionalDeferredRegister).then(function () {
                window.EasterAddons.start();
            });

        },
        HalloweenEffects: function () {
            loadScript("HalloweenEffects", "https://hypixel-skyblock.fandom.com", "MediaWiki:Gadget-Events/HalloweenEffects.js");
            $.when(window.HalloweenEffectsConfig.optionalDeferredRegister).then(function () {
                window.HalloweenEffects.start();
            });
        },
        snowStorm: function () {
            $.when(deferredLoadScript("snowStorm", window.snowStorm && window.snowStorm.flakes, "https://dev.fandom.com", "MediaWiki:SnowStorm.js")).then(function () {
                window.snowStorm.start();
            });
        }
    };

    function during(date0, date1) {
        return date0.getFullYear() === date1.getFullYear() &&
            date0.getMonth() === date1.getMonth() &&
            date0.getDate() === date1.getDate();
    }

    function duringAny(date0, dates) {
        return dates.some(function (d) {
            return during(date0, d);
        });
    }

    function waitTill(func, mode, eventName) {
        // note: func expects an array or a function that receives a year and returns an array
        // "month" mode: expects array of numbers representing months (1-12)
        // "date" mode: expects array of dates
        function getIncludes(thisyearlist, nextyearlist, mode) {
            if (mode === "month")
                return thisyearlist.includes(thisdate.getMonth() + 1);
            else
                return duringAny(thisdate, thisyearlist);
        }

        function getTill(thisyearlist, nextyearlist, mode) {
            if (mode === "month")
                return Math.min.apply(null, thisyearlist.map(function (v, i) {
                    var firstdayofmonththisyear = new Date(thisyear, v - 1, 1, 0, 0, 0, 0),
                        firstdayofmonthnextyear = new Date(nextyear, nextyearlist[i] - 1, 1, 0, 0, 0, 0);
                    return ((thisdate < firstdayofmonththisyear) && firstdayofmonththisyear || firstdayofmonthnextyear) - thisdate;
                }));
            else
                return Math.min.apply(null, thisyearlist.map(function (v, i) {
                    return ((thisdate < v) && v || nextyearlist[i]) - thisdate;
                }));
        }
        var promise = $.Deferred();
        var eventTag = "[FestiveEvents] [" + eventName + "] ";
        var thisyearlist, nextyearlist;
        if (typeof func === "function") {
            thisyearlist = func(thisyear);
            nextyearlist = func(nextyear);
        } else {
            thisyearlist = nextyearlist = func;
        }
        if (getIncludes(thisyearlist, nextyearlist, mode)) {
            console.log(eventTag + "Starting celebration!");
            promise.resolve(true);
        } else if (!thisyearlist.length) {
            promise.resolve(false);
        } else {
            var till = getTill(thisyearlist, nextyearlist, mode);
            if (till < 86400000) { // Celebration in less than 1 day
                if (conf.debug)
                    console.log(eventTag + till + "ms till celebration.");
                setTimeout(function () {
                    console.log(eventTag + "Starting celebration!");
                    promise.resolve(true);
                }, till);
            } else
            if (conf.debug)
                console.log(eventTag + "More than one day till celebration. Days left: " + (till / 86400000).toFixed(2));
            promise.resolve(false);
        }
        return promise;
    }

    function getFireworkDates(year) {
        var cny_lookup = {
            2021: "12 Feb 2021",
            2022: "1 Feb 2022",
            2023: "22 Jan 2023",
            2024: "10 Feb 2024",
            2025: "29 Jan 2025",
            2026: "17 Feb 2026",
            2027: "6 Feb 2027",
            2028: "26 Jan 2028",
            2029: "13 Feb 2029",
            2030: "3 Feb 2030",
            2031: "23 Jan 2031",
            2032: "11 Feb 2032"
        };
        return [
            new Date("1 January " + year), // new year (Gregorian calendar)
            new Date(cny_lookup[year]) // new year (Chinese calendar)
        ];
    }

    function getEasterDates(year) {
        // this list records Easter Sundays for each year
        var easter_lookup = {
            2021: "4 Apr 2021",
            2022: "17 Apr 2022",
            2023: "9 Apr 2023",
            2024: "31 Mar 2024",
            2025: "20 Apr 2025",
            2026: "5 Apr 2026",
            2027: "28 Mar 2027",
            2028: "16 Apr 2028",
            2029: "1 Apr 2029",
            2030: "21 Apr 2030",
            2031: "13 Apr 2031",
            2032: "28 Mar 2032"
        };
        var d = new Date(easter_lookup[year]);
        d.setDate(d.getDate() - 3); // should start on Good Fridays
        return Array(14).fill().map(function () { // should run for 14 days
            return new Date(d.setDate(d.getDate() + 1));
        });
    }

    var defers = [$.Deferred(), $.Deferred(), $.Deferred()];
    assignDefault("fireworkShow", {
        autoStart: false,
        startOnEvent: true,
        optionalDeferredRegister: defers[0]
    });
    assignDefault("EasterAddonsConfig", {
        autoStart: false,
        startOnEvent: true,
        optionalDeferredRegister: defers[1]
    });
    assignDefault("HalloweenEffectsConfig", {
        autoStart: false,
        startOnEvent: true,
        optionalDeferredRegister: defers[2]
    });
    assignDefault("snowStorm", {
        autoStart: false,
        startOnEvent: true,
        onlyStartOnViewMode: true,
    });

    if (!(window.fireworkShow.onlyStartOnViewMode && conf.wgAction !== "view")) {
        if (window.fireworkShow.autoStart) {
            loadAndRun.fireworkShow();
        } else if (window.fireworkShow.startOnEvent) {
            waitTill(getFireworkDates, "date", "FireworkEffects").then(function (toStart) {
                if (toStart)
                    loadAndRun.fireworkShow();
            });
        }
    }

    if (!(window.EasterAddonsConfig.onlyStartOnViewMode && conf.wgAction !== "view")) {
        if (window.EasterAddonsConfig.autoStart) {
            loadAndRun.fireworkShow();
        } else if (window.EasterAddonsConfig.startOnEvent) {
            waitTill(getEasterDates, "date", "EasterAddons").then(function (toStart) {
                if (toStart)
                    loadAndRun.EasterAddons();
            });
        }
    }

    if (!(window.HalloweenEffectsConfig.onlyStartOnViewMode && conf.wgAction !== "view")) {
        if (window.HalloweenEffectsConfig.autoStart) {
            loadAndRun.fireworkShow();
        } else if (window.HalloweenEffectsConfig.startOnEvent) {
            waitTill([10], "month", "HalloweenEffects").then(function (toStart) {
                if (toStart)
                    loadAndRun.HalloweenEffects();
            });
        }
    }

    if (!(window.snowStorm.onlyStartOnViewMode && conf.wgAction !== "view")) {
        if (window.snowStorm.autoStart) {
            loadAndRun.fireworkShow();
        } else if (window.snowStorm.startOnEvent) {
            waitTill([12], "month", "SnowStorm").then(function (toStart) {
                if (toStart)
                    loadAndRun.snowStorm();
            });
        }
    }

})(jQuery, mediaWiki);