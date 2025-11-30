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
Configuration must be defined by the user before importing:
    
window.MultiClockConfig = {
    interval: 500,
    clocks: [
        { label: "UTC", offset: 0, color: "#fff", format: "%H:%M:%S %d %b %Y" },
        { label: "Local", offset: -(new Date().getTimezoneOffset())/60, color: "#0f0" }
    ]
};

This script only renders the clocks and handles formatting.
*/
(function ($, mw) {
    "use strict";

    const cfg = window.MultiClockConfig || {};

    // Target area inside the Fandom Community Header where clocks will be placed
    const $target = $(".fandom-community-header__local-navigation");

    if (!$target.length) {
        console.error("MultiClock: .fandom-community-header__local-navigation not found");
        return;
    }

    // Required for absolute positioning of the clock container
    $target.css("position", "relative");

    // Main container for all clocks
    const $container = $("<div>")
        .attr("id", "multi-clock-container")
        .css({
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            right: "0",
            top: "0",
            marginTop: "6px",
            gap: "2px",
            fontFamily: "Rubik, Arial, sans-serif",
            fontSize: "11px",
            textAlign: "right",
            paddingRight: "4px"
        });

    // Additional CSS tweaks
    mw.util.addCSS(`
        #multi-clock-container {
            margin-top: 2px;
            font-size: 11px;
            line-height: 12px;
            gap: 2px !important;
        }
        #multi-clock-container .multi-clock-item {
            display: block;
            padding: 0;
            margin: 0;
        }
    `);

    // Inject container into header
    $target.append($container);

    // Month names
    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    // Create individual clock display elements
    const elements = (cfg.clocks || []).map(clock => {
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

    // Format date/time according to the given format string
    function formatDate(date, fmt) {
        return fmt
            .replace("%H", String(date.getHours()).padStart(2, "0"))
            .replace("%M", String(date.getMinutes()).padStart(2, "0"))
            .replace("%S", String(date.getSeconds()).padStart(2, "0"))
            .replace("%d", String(date.getDate()).padStart(2, "0"))
            .replace("%b", monthNames[date.getMonth()])
            .replace("%Y", date.getFullYear());
    }

    // Update every clock on the page
    function update() {
        elements.forEach($el => {
            const clock = $el.data("clock");

            const d = new Date();
            const offsetH = clock.offset || 0;

            // Apply timezone offset (in hours)
            d.setMinutes(
                d.getMinutes() +
                d.getTimezoneOffset() +
                offsetH * 60
            );

            const text = `${clock.label}: ${formatDate(d, clock.format)}`;
            $el.text(text);
        });
    }

    // Start interval updates
    setInterval(update, cfg.interval || 500);
    update();

})(jQuery, mediaWiki);