/* Any JavaScript here will be loaded for all users on every page load. */

/* the code under that is for weekly countdown that automatically refresh at 15.00 UTC of every sunday with a change of "Chapter 1", "Chapter 2" title etc... (feel free to edit it or delete if isn't ok) */
(function () {
    // Chapter 1 release (UTC). Tuesday, November 24, 2026, 15:00 UTC.
    var FIRST = Date.UTC(2026, 10, 24, 15, 0, 0);
    var WEEK = 7 * 24 * 60 * 60 * 1000;

    // From chapter 2 on: every Sunday at 15:00 UTC.
    // SECOND = first Sunday (15:00 UTC) strictly after FIRST.
    var dow = new Date(FIRST).getUTCDay(); // 0 = Sunday
    var daysToSunday = dow === 0 ? 7 : 7 - dow;
    var SECOND = FIRST + daysToSunday * 24 * 60 * 60 * 1000;

    function nextRelease(now) {
        if (now < FIRST) {
            return { chapter: 1, time: FIRST };
        }
        if (now < SECOND) {
            return { chapter: 2, time: SECOND };
        }
        var k = Math.floor((now - SECOND) / WEEK) + 1;
        return { chapter: 2 + k, time: SECOND + k * WEEK };
    }

    function plural(n, word) {
        return n + ' ' + word + (n === 1 ? '' : 's');
    }

    function render() {
        var now = Date.now();
        var next = nextRelease(now);
        var diff = Math.floor((next.time - now) / 1000);
        var d = Math.floor(diff / 86400);
        var h = Math.floor((diff % 86400) / 3600);
        var m = Math.floor((diff % 3600) / 60);
        var s = diff % 60;
        var html = '<b>Only ' + plural(d, 'day') + ', ' + plural(h, 'hour') + ', ' +
            plural(m, 'minute') + ' and ' + plural(s, 'second') + '</b> until the release of <b>Chapter ' +
            next.chapter + '</b>.';
        var els = document.querySelectorAll('.hizuki-countdown');
        for (var i = 0; i < els.length; i++) {
            els[i].innerHTML = html;
        }
    }

    function start() {
        render();
        setInterval(render, 1000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }
})();