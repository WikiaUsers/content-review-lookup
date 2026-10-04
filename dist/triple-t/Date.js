/**
 * Fully Customizable Millisecond Localizer for Fandom
 * Mix-and-match optional parameters via the second template field.
 */
(function () {
    'use strict';

    function parseEpochTimestamps() {
        var elements = document.querySelectorAll('.local-datetime:not(.localized)');
        if (!elements.length) return;

        var months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            
            var rawAttr = el.getAttribute('data-epoch');
            var opts = el.getAttribute('data-opts') || '';
            if (!rawAttr) continue;
            
            rawAttr = rawAttr.trim();
            if (!/^-?\d+$/.test(rawAttr)) continue;

            try {
                var timestampInt = parseInt(rawAttr, 10);
                var localDate = new Date(timestampInt);
                if (isNaN(localDate.getTime())) continue;

                // Parameter Flags (Checks if your custom words exist in parameter 2)
                var noTz     = opts.indexOf('removeTimezone') !== -1 || opts.indexOf('noTz') !== -1;
                var military = opts.indexOf('24h') !== -1 || opts.indexOf('military') !== -1;
                var noTime   = opts.indexOf('noTime') !== -1 || opts.indexOf('dateOnly') !== -1;
                var showDay  = opts.indexOf('showDay') !== -1 || opts.indexOf('withDay') !== -1;
                var noAt     = opts.indexOf('removeAt') !== -1 || opts.indexOf('noAt') !== -1;

                // Extract chronological values
                var lYear  = localDate.getFullYear();
                var lMonth = localDate.getMonth();
                var lDay   = localDate.getDate();
                var lWday  = localDate.getDay();
                var lHour  = localDate.getHours();
                var lMin   = localDate.getMinutes();

                // Format Time Components
                var timeString = '';
                if (!noTime) {
                    var displayHour, displayMin, ampm;
                    displayMin = lMin < 10 ? '0' + lMin : lMin;

                    if (military) {
                        displayHour = lHour < 10 ? '0' + lHour : lHour;
                        timeString = displayHour + ':' + displayMin;
                    } else {
                        ampm = lHour >= 12 ? 'PM' : 'AM';
                        displayHour = lHour % 12;
                        displayHour = displayHour ? displayHour : 12;
                        timeString = displayHour + ':' + displayMin + ' ' + ampm;
                    }
                }

                // Format Timezone Component
                var tzString = '';
                if (!noTz && !noTime) {
                    try {
                        var localeString = localDate.toLocaleDateString(navigator.language || 'en-US', { timeZoneName: 'short' });
                        var stringParts = localeString.split(', ');
                        if (stringParts.length > 1) {
                            tzString = ' ' + stringParts[1];
                        }
                    } catch (tzError) {}
                }

                // Construct Base Date Layout
                var dateString = months[lMonth] + ' ' + lDay + ', ' + lYear;
                if (showDay) {
                    dateString = days[lWday] + ', ' + dateString;
                }

                // Assemble Everything Cleanly
                var finalOutput = dateString;
                if (!noTime) {
                    var separator = noAt ? ' ' : ' at ';
                    finalOutput += separator + timeString + tzString;
                }

                el.textContent = finalOutput;
                el.className += ' localized';
            } catch (err) {
                console.error('Data parameter parsing crash:', rawAttr, err);
            }
        }
    }

    if (window.mw && mw.hook) {
        mw.hook('wikipage.content').add(parseEpochTimestamps);
    }
    setInterval(parseEpochTimestamps, 1000);
}());