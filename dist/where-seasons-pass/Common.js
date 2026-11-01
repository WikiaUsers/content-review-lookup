/* Any JavaScript here will be loaded for all users on every page load (desktop skin only;
   Fandom's mobile skin does not run wiki JavaScript). Styling lives in MediaWiki:Common.css. */

/* ==========================================================================
   1. LIVE SEASON TIMER — enhances {{SeasonTimer}}
   --------------------------------------------------------------------------
   The template already prints the current season (so mobile readers see it).
   On desktop this script turns every .season-timer (and the legacy
   #season-timer-container) into a live countdown, updated once per second.

   Schedule settings come from the template's data attributes, so they can be
   corrected on the wiki without touching this file:
     data-timezone      time zone the weekly cycle follows (default UTC)
     data-offset        seconds after Monday 00:00 when Spring starts (default 0)
     data-season-hours  length of one season in hours (default 42)
   Keep the season names/notes below in sync with Module:Season.
   ========================================================================== */
(function () {
    'use strict';

    var SEASONS = [
        { key: 'spring', label: 'Spring', emoji: '🌸', note: 'Fresh growth and new beginnings.' },
        { key: 'summer', label: 'Summer', emoji: '☀️', note: 'Bright skies and warm weather.' },
        { key: 'autumn', label: 'Autumn', emoji: '🍂', note: 'Falling leaves and cooler days.' },
        { key: 'winter', label: 'Winter', emoji: '❄️', note: 'Cold weather and frosty conditions.' }
    ];
    var WEEK = 7 * 86400;
    var DAY_INDEX = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 };
    var formatters = {};
    var timers = [];
    var ticking = false;

    function pad(n) {
        return (n < 10 ? '0' : '') + n;
    }

    function formatDuration(total) {
        var d = Math.floor(total / 86400);
        var h = Math.floor((total % 86400) / 3600);
        var m = Math.floor((total % 3600) / 60);
        var s = total % 60;
        return d + 'd ' + pad(h) + 'h ' + pad(m) + 'm ' + pad(s) + 's';
    }

    /* Seconds since Monday 00:00 in the given time zone (handles GMT/BST) */
    function secondsIntoWeek(now, timeZone) {
        if (!formatters[timeZone]) {
            formatters[timeZone] = new Intl.DateTimeFormat('en-GB', {
                timeZone: timeZone, weekday: 'short', hour: '2-digit',
                minute: '2-digit', second: '2-digit', hourCycle: 'h23'
            });
        }
        var parts = {};
        formatters[timeZone].formatToParts(now).forEach(function (p) {
            parts[p.type] = p.value;
        });
        return DAY_INDEX[parts.weekday] * 86400 +
            (parseInt(parts.hour, 10) % 24) * 3600 +
            parseInt(parts.minute, 10) * 60 +
            parseInt(parts.second, 10);
    }

    function readConfig(el) {
        var hours = parseFloat(el.getAttribute('data-season-hours'));
        var offset = parseInt(el.getAttribute('data-offset'), 10);
        return {
            timeZone: el.getAttribute('data-timezone') || 'UTC',
            offset: isNaN(offset) ? 0 : offset,
            length: (isNaN(hours) || hours <= 0 ? 42 : hours) * 3600
        };
    }

    function getState(cfg, now) {
        var week = (secondsIntoWeek(now, cfg.timeZone) - cfg.offset + WEEK * 2) % WEEK;
        var index = Math.floor(week / cfg.length) % SEASONS.length;
        return { index: index, secondsLeft: (index + 1) * cfg.length - week };
    }

    /* Old pages only contain an empty #season-timer-container: give it the
       same inner structure the template prints. */
    function ensureStructure(el) {
        if (el.querySelector('[data-part="clock"]')) {
            return;
        }
        el.classList.add('season-box', 'season-timer');
        el.innerHTML =
            '<div class="season-timer__label">Current Season</div>' +
            '<div class="season-timer__name" data-part="name"></div>' +
            '<div class="season-timer__note" data-part="note"></div>' +
            '<div class="season-timer__live">' +
                '<div class="season-timer__small">Time Remaining</div>' +
                '<div class="season-timer__clock" data-part="clock"></div>' +
                '<div class="season-timer__small">Next Season</div>' +
                '<div class="season-timer__next" data-part="next"></div>' +
                '<div class="season-timer__small" data-part="local"></div>' +
            '</div>';
    }

    function setText(el, part, text) {
        var node = el.querySelector('[data-part="' + part + '"]');
        if (node && node.textContent !== text) {
            node.textContent = text;
        }
    }

    function render(el, now) {
        var cfg = el._seasonConfig;
        var state = getState(cfg, now);
        var season = SEASONS[state.index];
        var next = SEASONS[(state.index + 1) % SEASONS.length];
        var changeAt = new Date(now.getTime() + state.secondsLeft * 1000);

        SEASONS.forEach(function (s) {
            el.classList.toggle('season-' + s.key, s === season);
        });
        setText(el, 'name', season.emoji + ' ' + season.label.toUpperCase() + ' ' + season.emoji);
        setText(el, 'note', season.note);
        setText(el, 'clock', formatDuration(state.secondsLeft));
        setText(el, 'next', next.emoji + ' ' + next.label.toUpperCase());
        setText(el, 'local', 'Changes ' + changeAt.toLocaleString(undefined, {
            weekday: 'short', hour: '2-digit', minute: '2-digit'
        }) + ' (your time)');
    }

    function tick() {
        var now = new Date();
        timers = timers.filter(function (el) {
            return document.body.contains(el);
        });
        timers.forEach(function (el) {
            render(el, now);
        });
    }

    function init($content) {
        var root = ($content && $content[0]) || document;
        var found = root.querySelectorAll('.season-timer, #season-timer-container');
        Array.prototype.forEach.call(found, function (el) {
            if (el._seasonConfig) {
                return;
            }
            ensureStructure(el);
            el._seasonConfig = readConfig(el);
            el.classList.add('is-live');
            timers.push(el);
        });
        if (timers.length) {
            tick();
            if (!ticking) {
                ticking = true;
                setInterval(tick, 1000);
            }
        }
    }

    mw.hook('wikipage.content').add(init);
})();

/* ==========================================================================
   2. MISSING FILE PLACEHOLDER
   --------------------------------------------------------------------------
   Red links to files that have not been uploaded yet are shown as the wiki's
   "Missing File Icon" instead of red text (desktop only; styles in
   Common.css → .missing-file-fallback).
   ========================================================================== */
(function () {
    'use strict';

    var FALLBACK_FILE = 'Missing File Icon.png';
    var FALLBACK_SIZE = 120;
    var FALLBACK_SRC = mw.util.getUrl('Special:Redirect/file/' + FALLBACK_FILE, {
        width: FALLBACK_SIZE,
        height: FALLBACK_SIZE
    });

    function getMissingFileTitle(link) {
        var titleMatch = (link.getAttribute('title') || '')
            .match(/^((?:File|Image):.+?)(?:\s+\(.*\))?$/i);
        if (titleMatch) {
            return titleMatch[1];
        }
        var href = link.getAttribute('href') || '';
        try {
            href = decodeURIComponent(href);
        } catch (e) { /* keep the raw href */ }
        var hrefMatch = href.match(/(?:title=|\/wiki\/)((?:File|Image):[^?&#]+)/i);
        return hrefMatch ? hrefMatch[1].replace(/_/g, ' ') : null;
    }

    function replaceMissingFiles($content) {
        var root = ($content && $content[0]) || document;
        Array.prototype.forEach.call(root.querySelectorAll('a.new'), function (link) {
            var fileTitle = getMissingFileTitle(link);
            if (!fileTitle || link.getAttribute('data-missing-file-fallback')) {
                return;
            }
            var message = fileTitle + ' has not been uploaded yet.';
            var image = document.createElement('img');
            image.src = FALLBACK_SRC;
            image.alt = 'Missing file';
            image.title = message;
            image.loading = 'lazy';
            image.width = FALLBACK_SIZE;
            image.height = FALLBACK_SIZE;

            link.textContent = '';
            link.appendChild(image);
            link.classList.remove('new');
            link.classList.add('missing-file-fallback');
            link.setAttribute('data-missing-file-fallback', 'true');
            link.setAttribute('aria-label', message);
        });
    }

    mw.hook('wikipage.content').add(replaceMissingFiles);
})();