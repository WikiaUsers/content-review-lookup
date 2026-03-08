(function () {
    'use strict';

    function plural(value, unit) {
        return value + ' ' + unit + (value === 1 ? '' : 's');
    }

    function formatElapsed(ms, format) {
        if (ms < 0) {
            return format === 'short' ? '0s' : '0 seconds';
        }

        var totalSeconds = Math.floor(ms / 1000);
        var days = Math.floor(totalSeconds / 86400);
        var hours = Math.floor((totalSeconds % 86400) / 3600);
        var minutes = Math.floor((totalSeconds % 3600) / 60);
        var seconds = totalSeconds % 60;

        if (format === 'short') {
            if (days > 0) {
                return days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's';
            }
            if (hours > 0) {
                return hours + 'h ' + minutes + 'm ' + seconds + 's';
            }
            if (minutes > 0) {
                return minutes + 'm ' + seconds + 's';
            }
            return seconds + 's';
        }

        var parts = [];
        if (days) parts.push(plural(days, 'day'));
        if (hours) parts.push(plural(hours, 'hour'));
        if (minutes) parts.push(plural(minutes, 'minute'));
        if (seconds || parts.length === 0) parts.push(plural(seconds, 'second'));

        return parts.join(', ');
    }

    function initCountups() {
        var elements = document.querySelectorAll('.countup');
        var timers = [];

        elements.forEach(function (el) {
            var rawStart = el.getAttribute('data-start');
            var format = el.getAttribute('data-format') || 'long';

            if (!rawStart) {
                el.textContent = 'Invalid date';
                return;
            }

            var startTime = new Date(rawStart);

            if (isNaN(startTime.getTime())) {
                el.textContent = 'Invalid date';
                return;
            }

            timers.push({
                element: el,
                startTime: startTime,
                format: format
            });
        });

        function updateAll() {
            var now = Date.now();

            timers.forEach(function (timer) {
                var elapsed = now - timer.startTime.getTime();
                timer.element.textContent = formatElapsed(elapsed, timer.format);
            });
        }

        if (timers.length) {
            updateAll();
            window.setInterval(updateAll, 1000);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCountups);
    } else {
        initCountups();
    }
})();