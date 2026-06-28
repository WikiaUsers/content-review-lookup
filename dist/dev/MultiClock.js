/* Copyright (C) 2012 Lunarity
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 * and associated documentation files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.

MultiClock – Multi-timezone clock module
------------------------------------------------------------
/*
Configuration must be defined by the user before importing:

window.MultiClockConfig = {
    interval: 500, // Update interval in milliseconds
    clocks: [
        // 1. Universal Time Coordinated (UTC)
        { label: "UTC", offset: 0, color: "#fff", format: "%2H:%2M:%2S %d %b %Y" },
        
        // 2. User's Local Time (automatically calculated based on browser settings)
        { label: "Local", offset: -(new Date().getTimezoneOffset() / 60), color: "#0f0", format: "%2H:%2M:%2S" }
    ]
};

This script only renders the clocks and handles formatting.
*/
(function ($, mw, window, Date) {
    "use strict";

    // Prevent double execution
    if (window.MultiClock) return;

    // Gathering configuration from all possible sources for backward compatibility
    const cfg = window.MultiClockConfig || {};
    const oldConfig = $.extend({}, window.DisplayClockJS, window.UTCClockConfig);
    const lang = mw.config.get("wgUserLanguage") || "en";

    // If the clocks array is empty, create default clocks based on old UTCClock configs
    if (!cfg.clocks || cfg.clocks.length === 0) {
        cfg.clocks = [{
            format: oldConfig.format || "%2H:%2M:%2S %d %b %Y (UTC)",
            offset: typeof oldConfig.offset === "number" ? oldConfig.offset : 0,
            color: "#fff",
            label: {
                en: oldConfig.hoverText || "UTC",
                ru: "UTC",
                uk: "UTC"
            }
        }];
    }

    // Label separator (defaults to colon)
    const separator = cfg.separator || ":";

    // Target mounting point in the Fandom Community Header
    const $target = $(".fandom-community-header__local-navigation");
    if (!$target.length) {
        console.error("MultiClock: .fandom-community-header__local-navigation not found.");
        return;
    }

    // Preparing container styles
    $target.css("position", "relative");

    const $container = $("<div>")
        .attr("id", "multi-clock-container")
        .css({
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            right: "0",
            top: "0",
            marginTop: "2px",
            gap: "2px",
            fontFamily: cfg.fontFamily || "Rubik, Arial, sans-serif",
            fontSize: "11px",
            textAlign: "right",
            paddingRight: "4px",
            zIndex: "10"
        });

    // Additional CSS tweaks for Fandom header responsiveness
    mw.util.addCSS(`
        #multi-clock-container .multi-clock-item {
            display: block;
            padding: 0;
            margin: 0;
            line-height: 12px;
        }
        .fandom-community-header__top-container {
            grid-column: 2 / span 2;
        }
        .has-no-logo .fandom-community-header__top-container {
            grid-column: 1 / span 3;
        }
    `);

    $target.append($container);

    // Creating DOM elements for each configured clock
    const elements = cfg.clocks.map(clock => {
        const $el = $("<div>")
            .addClass("multi-clock-item")
            .css({
                color: clock.color || "#fff",
                fontWeight: "bold"
            })
            .appendTo($container);

        $el.data("clock", clock);
        return $el;
    });

    // FORMATTING ENGINE
    function createFormatter(monthsLong, monthsShort) {
        const cases = {
            "%": function() { return "%"; },
            d: function(d) { const r = d.getDate(); return { v: r, i: r - 1 }; },
            H: function(d) { return d.getHours(); },
            I: function(d) { const r = d.getHours() % 12; return { i: r, v: r || 12 }; },
            m: function(d) { const r = d.getMonth(); return { i: r, v: r + 1 }; },
            M: function(d) { return d.getMinutes(); },
            p: function(d) { return d.getHours() < 12 ? "AM" : "PM"; },
            S: function(d) { return d.getSeconds(); },
            y: function(d) { return d.getFullYear() % 100; },
            Y: function(d) { return d.getFullYear(); },
            // Complex ISO flags from the original script
            G: function(d) {
                let r = d.getFullYear(), day = d.getDate(), month = d.getMonth();
                if (month === 0 && day < 4) {
                    day = d.getDay();
                    if (day === 0 || day > 4) r--;
                } else if (month === 11 && day > 28) {
                    month = d.getDay();
                    if (month !== 0 && month < day - 27) ++r;
                }
                return r;
            },
            g: function(d) { return cases.G(d) % 100; },
            j: function(d, ys) { const r = (d - ys) / 864e5 | 0; return { i: r, v: r + 1 }; },
            u: function(d) { const r = (d.getDay() + 6) % 7; return { i: r, v: r + 1 }; },
            w: function(d) { const r = d.getDay(); return { i: r, v: r + 1 }; },
            U: function(d, ys) { let doy = cases.j(d, ys).i; doy += ys.getDay() || 7; return (doy / 7) | 0; },
            W: function(d, ys) { let doy = cases.j(d, ys).i; doy += (ys.getDay() + 6) % 7 || 7; return (doy / 7) | 0; },
            X: function(d) { return d.toLocaleTimeString(); },
            x: function(d) { return d.toLocaleDateString(); }
        };

        if (monthsLong) cases.B = function(d) { return monthsLong[d.getMonth()]; };
        if (monthsShort) cases.b = function(d) { return monthsShort[d.getMonth()]; };

        function pad(s, l, c) {
            c = c || (typeof s === "number" ? "0" : " ");
            l = l - (s += "").length | 0;
            if (l <= 0) return s;
            do { if ((l & 1) === 1) s = c + s; c += c; } while ((l >>>= 1) !== 0);
            return s;
        }

        return function(date, string) {
            const pattern = /%([0-9]*)(?:\{([^\}]*)\})?([A-Za-z%])/gi;
            let result = "", start = new Date(date.getFullYear(), 0, 1), lastIndex = 0, match, parsed, dispatcher;
            
            while ((match = pattern.exec(string)) !== null) {
                result += string.substring(lastIndex, match.index);
                lastIndex = pattern.lastIndex;
                dispatcher = cases[match[3]];
                if (typeof dispatcher !== "function") {
                    result += '¿' + match[3] + '?';
                    continue;
                }
                parsed = dispatcher(date, start);
                if (typeof parsed === "object") parsed = parsed.v;
                result += pad(parsed, parseInt(match[1], 10)); 
            }
            result += string.substr(lastIndex);
            return result;
        };
    }

    // Variable to store the interval ID for clean teardown
    let clockInterval = null;

    // Initializing updates with MediaWiki core language localization packs
    mw.loader.using("mediawiki.language.months", function () {
        const formatTime = createFormatter(mw.language.months.names, mw.language.months.abbrev);

        function update() {
            // Self-correcting teardown if the container is abruptly removed from DOM by external scripts
            if (!$.contains(document.documentElement, $container[0])) {
                if (clockInterval) {
                    window.clearInterval(clockInterval);
                    clockInterval = null;
                }
                return;
            }

            elements.forEach($el => {
                const clock = $el.data("clock");
                if (!clock) return; // Protection if the data was wiped by external scripts

                const d = new Date();
                
                // Correct calculation for fractional and standard offsets (e.g. +5.5)
                const offsetMinutes = (typeof clock.offset === "number" ? clock.offset : 0) * 60;
                d.setMinutes(d.getMinutes() + d.getTimezoneOffset() + offsetMinutes);

                // Handling localizable label objects or strings
                let label = clock.label || "";
                if (typeof label === "object") {
                    label = label[lang] || label.en || "";
                }

                const prefix = label ? `${label}${separator} ` : "";
                $el.text(`${prefix}${formatTime(d, clock.format || "%2H:%2M:%2S")}`);
            });
        }

        // Setting update loop (sampling at 2Hz for precise 1s tick rendering)
        const intervalTime = Math.max(500, Math.min(cfg.interval || 500, Infinity));
        clockInterval = window.setInterval(update, intervalTime);
        update();
    });

    // Export public module API for global availability and dependency linking
    const instance = {
        config: cfg,
        elements: elements,
        container: $container
    };

    window.MultiClock = instance;
    
    // Creating standard mock object to satisfy legacy scripts looking for UTCClock
    window.UCX = window.UCX || {};
    window.UTCClock = window.UCX.UTCClock = $.extend({
        killClock: function() { 
            if (clockInterval) {
                window.clearInterval(clockInterval);
                clockInterval = null;
            }
            $container.remove(); 
        }
    }, instance);

    mw.hook("dev.multi-clock").fire(window.MultiClock);
    mw.hook("dev.utc-clock").fire(window.UTCClock);

})(jQuery, mediaWiki, window, Date);