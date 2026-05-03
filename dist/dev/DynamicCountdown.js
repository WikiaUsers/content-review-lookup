(function () {
    'use strict';

    if (window.dev && window.dev.DynamicCountdown) return;
    window.dev = window.dev || {};
    window.dev.DynamicCountdown = true;

    var tokens = [
        { token: 'YY',  placeholder: '«0»',  key: 'Y' },
        { token: 'Y',   placeholder: '«1»',  key: 'Y' },
        { token: 'MM',  placeholder: '«2»',  key: 'M' },
        { token: 'M',   placeholder: '«3»',  key: 'M' },
        { token: 'DD',  placeholder: '«4»',  key: 'D' },
        { token: 'D',   placeholder: '«5»',  key: 'D' },
        { token: 'HH',  placeholder: '«6»',  key: 'H' },
        { token: 'H',   placeholder: '«7»',  key: 'H' },
        { token: 'NN',  placeholder: '«8»',  key: 'N' },
        { token: 'N',   placeholder: '«9»',  key: 'N' },
        { token: 'SS',  placeholder: '«10»', key: 'S' },
        { token: 'S',   placeholder: '«11»', key: 'S' }
    ];

    var TRIM_KEYS = ['Y', 'M', 'D', 'H', 'N'];

    function pad(n) { return String(n).padStart(2, '0'); }

    function getTimeDiff(targetDate, format, timezone) {
        var now = new Date();

        if (timezone) {
            try {
                var nowStr = new Intl.DateTimeFormat('en-US', {
                    timeZone: timezone,
                    year: 'numeric', month: 'numeric', day: 'numeric',
                    hour: 'numeric', minute: 'numeric', second: 'numeric',
                    hour12: false
                }).format(now);
                now = new Date(nowStr);
            } catch(e) {}
        }

        var target = new Date(targetDate);
        var diff = target - now;
        var past = diff < 0;
        diff = Math.abs(diff);

        var totalSeconds = Math.floor(diff / 1000);
        var totalMinutes = Math.floor(totalSeconds / 60);
        var totalHours   = Math.floor(totalMinutes / 60);
        var totalDays    = Math.floor(totalHours / 24);

        var hasY = /YY|Y/.test(format);
        var hasM = /MM|M/.test(format);
        var hasD = /DD|D/.test(format);
        var hasH = /HH|H/.test(format);
        var hasN = /NN|N/.test(format);

        var years = 0, months = 0, days = 0, H = 0, N = 0, S = 0;

        if (hasY || hasM) {
            var nowD = now < target ? now : target;
            var thenD = now < target ? target : now;

            years = thenD.getFullYear() - nowD.getFullYear();
            months = thenD.getMonth() - nowD.getMonth();
            if (months < 0) { years--; months += 12; }
            if (!hasY) { months += years * 12; years = 0; }

            var tempDate = new Date(nowD.getFullYear() + years, nowD.getMonth() + months, nowD.getDate());
            days = Math.floor((thenD - tempDate) / (1000 * 60 * 60 * 24));
        } else {
            days = totalDays;
        }

        H = hasD ? Math.floor(totalHours % 24) : totalHours;
        N = hasH ? totalMinutes % 60 : totalMinutes;
        S = hasN ? totalSeconds % 60 : totalSeconds;

        return { Y: years, M: months, D: days, H: H, N: N, S: S, past: past };
    }

    function getKeyForSegment(segment) {
        var keyMap = { 'YY': 'Y', 'Y': 'Y', 'MM': 'M', 'M': 'M', 'DD': 'D', 'D': 'D', 'HH': 'H', 'H': 'H', 'NN': 'N', 'N': 'N', 'SS': 'S', 'S': 'S' };
        for (var t in keyMap) {
            if (segment.indexOf(t) !== -1) return keyMap[t];
        }
        return null;
    }

    function formatCountdown(format, parts, trim) {
        var result = format;

        var escapedLiterals = [];
        result = result.replace(/!(.)/g, function(match, char) {
            var idx = escapedLiterals.length;
            escapedLiterals.push(char);
            return '«e' + idx + '»';
        });

        result = result.replace(/\[([^\]]*)\]/g, function(match, segment) {
            if (trim) {
                var key = getKeyForSegment(segment);
                if (key && TRIM_KEYS.indexOf(key) !== -1 && parts[key] === 0) return '';
            }
            return segment;
        });

        tokens.forEach(function(t) {
            result = result.split(t.token).join(t.placeholder);
        });

        var values = {
            '«0»':  pad(parts.Y),
            '«1»':  parts.Y,
            '«2»':  pad(parts.M),
            '«3»':  parts.M,
            '«4»':  pad(parts.D),
            '«5»':  parts.D,
            '«6»':  pad(parts.H),
            '«7»':  parts.H,
            '«8»':  pad(parts.N),
            '«9»':  parts.N,
            '«10»': pad(parts.S),
            '«11»': parts.S
        };

        Object.keys(values).forEach(function(ph) {
            result = result.split(ph).join(values[ph]);
        });

        escapedLiterals.forEach(function(char, idx) {
            result = result.split('«e' + idx + '»').join(char);
        });

        return result.trim();
    }

    function parseDuration(str) {
        if (!str) return null;
        str = str.trim();
        var match = str.match(/^(\d+)(s|m|h|d|mo|y)$/);
        if (!match) return null;
        var val = parseInt(match[1]);
        if (match[2] === 's')  return val * 1000;
        if (match[2] === 'm')  return val * 60 * 1000;
        if (match[2] === 'h')  return val * 60 * 60 * 1000;
        if (match[2] === 'd')  return val * 24 * 60 * 60 * 1000;
        if (match[2] === 'mo') return val * 30 * 24 * 60 * 60 * 1000;
        if (match[2] === 'y')  return val * 365.25 * 24 * 60 * 60 * 1000;
        return null;
    }

    function bumpDate(dateStr, rollover) {
        var d = new Date(dateStr);
        var match = rollover.match(/^(\d+)(s|m|h|d|mo|y)$/);
        if (!match) return dateStr;

        var val = parseInt(match[1]);
        var unit = match[2];

        if (unit === 's')       d.setSeconds(d.getSeconds() + val);
        else if (unit === 'm')  d.setMinutes(d.getMinutes() + val);
        else if (unit === 'h')  d.setHours(d.getHours() + val);
        else if (unit === 'd')  d.setDate(d.getDate() + val);
        else if (unit === 'mo') d.setMonth(d.getMonth() + val);
        else if (unit === 'y')  d.setFullYear(d.getFullYear() + val);

        return d.getFullYear() + '-' +
            pad(d.getMonth() + 1) + '-' +
            pad(d.getDate()) + ' ' +
            pad(d.getHours()) + ':' +
            pad(d.getMinutes()) + ':' +
            pad(d.getSeconds());
    }

    function rolloverToMs(str) {
        var match = str.match(/^(\d+)(s|m|h|d|mo|y)$/);
        if (!match) return null;
        var val = parseInt(match[1]);
        var unit = match[2];
        if (unit === 's')  return val * 1000;
        if (unit === 'm')  return val * 60 * 1000;
        if (unit === 'h')  return val * 60 * 60 * 1000;
        if (unit === 'd')  return val * 24 * 60 * 60 * 1000;
        if (unit === 'mo') return val * 30 * 24 * 60 * 60 * 1000;
        if (unit === 'y')  return val * 365.25 * 24 * 60 * 60 * 1000;
        return null;
    }

    var ERROR_MSG = 'Period for end message ended but no rollover specified. Please specify a rollover (e.g. 1y, 7d, 2m) or remove the countdown.';
    var OVERLAP_MSG = 'Message duration exceeds the rollover, which makes this event a one time event, increase the rollover, decrease the message duration, or delete this countdown.';

    function initCountdown(el) {
        var targetDate = el.getAttribute('data-date');
        var format     = el.getAttribute('data-format') || '[Y !years, ][M !months, ][D !days, ][H !hours, ][N !minutes and ][S !seconds]';
        var timezone   = el.getAttribute('data-timezone') || null;
        var trim       = el.getAttribute('data-trim') === 'true';
        var eventAttr  = el.getAttribute('data-event') || '';
        var endAttr    = el.getAttribute('data-end') || '';

        var endParts   = endAttr.split(',').map(function(s) { return s.trim(); });
        var endText    = endParts[0] || 'Countdown over';
        var endLength  = parseDuration(endParts[1]);
        var rollover   = endParts[2] ? endParts[2].trim() : null;

        var eventParts = eventAttr.split(',').map(function(s) { return s.trim(); });
        var fireEvent  = eventParts[0] === 'true';
        var eventId    = eventParts[1] || null;

        if (!targetDate) {
            el.textContent = 'Missing data-date.';
            return;
        }

        var target = new Date(targetDate);
        if (isNaN(target)) {
            el.textContent = 'Invalid date format.';
            return;
        }

        if (endLength !== null && rollover !== null) {
            var rolloverMs = rolloverToMs(rollover);
            if (rolloverMs !== null && endLength >= rolloverMs) {
                el.textContent = OVERLAP_MSG;
                return;
            }
        }

        var ended = false;
        var intervalId;

        function start(date) {
            targetDate = date;
            ended = false;
            clearInterval(intervalId);
            update();
            var now = new Date();
            var msUntilNextSecond = 1000 - now.getMilliseconds();
            setTimeout(function() {
                update();
                intervalId = setInterval(update, 1000);
            }, msUntilNextSecond);
        }

        function update() {
            var parts = getTimeDiff(targetDate, format, timezone);

            if (parts.past && !ended) {
                ended = true;
                clearInterval(intervalId);

                if (fireEvent) {
                    document.dispatchEvent(new CustomEvent('countdownEnd', {
                        detail: { id: eventId }
                    }));
                }

                if (endLength !== null) {
                    var now = new Date();
                    var targetTime = new Date(targetDate);
                    var timeSinceEnd = now - targetTime;
                    var remaining = endLength - timeSinceEnd;

                    if (rollover === null) {
                        if (remaining > 0) {
                            el.textContent = endText;
                            setTimeout(function() {
                                el.textContent = ERROR_MSG;
                            }, remaining);
                        } else {
                            el.textContent = ERROR_MSG;
                        }
                    } else {
                        if (remaining > 0) {
                            el.textContent = endText;
                            setTimeout(function() {
                                start(bumpDate(targetDate, rollover));
                            }, remaining);
                        } else {
                            start(bumpDate(targetDate, rollover));
                        }
                    }
                } else {
                    el.textContent = endText;
                }
                return;
            }

            if (!ended) {
                el.textContent = formatCountdown(format, parts, trim);
            }
        }

        start(targetDate);
    }

    mw.hook('wikipage.content').add(function($content) {
        $content.find('.dynamic-countdown').each(function() {
            initCountdown(this);
        });
    });

})();