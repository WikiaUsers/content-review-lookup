function initializeDynamicClocks() {
    const allElements = document.querySelectorAll('.dynamic-clock');

    if (allElements.length === 0) return;

    const groups = new Map();

    allElements.forEach(element => {
        const timezone = element.getAttribute('data-timezone') || 'UTC';
        const format = element.getAttribute('data-format') || 'h:mm - D/M/YYYY';
        const showOffset = element.getAttribute('data-show-offset') === 'true';
        const key = timezone + '|' + format + '|' + showOffset;

        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(element);
    });

    groups.forEach((elements, key) => {
        const [timezone, format, showOffsetRaw] = key.split('|');
        const showOffset = showOffsetRaw === 'true';

        function getTimeParts() {
            const offsetMatch = timezone.match(/^([+-]?)(\d{1,2})(?::(\d{2}))?$/);
            let h24, m, s, day, month, year, offsetMinutes;

            if (offsetMatch) {
                const sign = offsetMatch[1] === '-' ? -1 : 1;
                const hours = parseInt(offsetMatch[2]);
                const mins = parseInt(offsetMatch[3] || 0);
                offsetMinutes = sign * (hours * 60 + mins);
                const utc = Date.now() + (new Date().getTimezoneOffset() * 60000);
                const date = new Date(utc + (offsetMinutes * 60000));
                h24 = date.getUTCHours();
                m = date.getUTCMinutes();
                s = date.getUTCSeconds();
                day = date.getUTCDate();
                month = date.getUTCMonth();
                year = date.getUTCFullYear();
            } else {
                try {
                    const now = new Date();
                    const parts = new Intl.DateTimeFormat('en-US', {
                        timeZone: timezone,
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                        hour12: false
                    }).formatToParts(now);

                    const dateParts = new Intl.DateTimeFormat('en-US', {
                        timeZone: timezone,
                        day: 'numeric',
                        month: 'numeric',
                        year: 'numeric'
                    }).formatToParts(now);

                    const get = (arr, type) => {
                        const part = arr.find(p => p.type === type);
                        return part ? part.value : '0';
                    };

                    h24 = parseInt(get(parts, 'hour')) % 24;
                    m = parseInt(get(parts, 'minute'));
                    s = parseInt(get(parts, 'second'));
                    day = parseInt(get(dateParts, 'day'));
                    month = parseInt(get(dateParts, 'month')) - 1;
                    year = parseInt(get(dateParts, 'year'));

                    const utcDate = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
                    const tzDate = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
                    offsetMinutes = (tzDate - utcDate) / 60000;
                } catch (e) {
                    elements.forEach(el => el.textContent = 'Invalid timezone');
                    return null;
                }
            }

            return { h24, m, s, day, month, year, offsetMinutes };
        }

        const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        const dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

        const tokens = [
            { token: 'YYYY',  placeholder: '%%0%%',  type: 'date' },
            { token: 'YY',    placeholder: '%%17%%', type: 'date' },
            { token: 'MMMM',  placeholder: '%%1%%',  type: 'date' },
            { token: 'MMM',   placeholder: '%%2%%',  type: 'date' },
            { token: 'MM',    placeholder: '%%3%%',  type: 'date' },
            { token: 'M',     placeholder: '%%4%%',  type: 'date' },
            { token: 'dddd',  placeholder: '%%5%%',  type: 'date' },
            { token: 'ddd',   placeholder: '%%6%%',  type: 'date' },
            { token: 'DD',    placeholder: '%%7%%',  type: 'date' },
            { token: 'D',     placeholder: '%%8%%',  type: 'date' },
            { token: 'HH',    placeholder: '%%9%%',  type: 'time24' },
            { token: 'H',     placeholder: '%%10%%', type: 'time24' },
            { token: 'hh',    placeholder: '%%11%%', type: 'time12' },
            { token: 'h',     placeholder: '%%12%%', type: 'time12' },
            { token: 'mm',    placeholder: '%%13%%', type: 'time' },
            { token: 'm',     placeholder: '%%14%%', type: 'time' },
            { token: 'ss',    placeholder: '%%15%%', type: 'time' },
            { token: 's',     placeholder: '%%16%%', type: 'time' },
        ];

        const has12Hour = tokens.some(t => t.type === 'time12' && format.includes(t.token));
        const has24Hour = tokens.some(t => t.type === 'time24' && format.includes(t.token));

        function formatTime(parts) {
            const { h24, m, s, day, month, year, offsetMinutes } = parts;
            const h12 = h24 % 12 || 12;
            const ampm = h24 >= 12 ? 'PM' : 'AM';
            const pad = n => String(n).padStart(2, '0');

            const dateObj = new Date(year, month, day);
            const dayOfWeek = dateObj.getDay();

            const values = {
                '%%0%%':  year,
                '%%17%%': String(year).slice(-2),
                '%%1%%':  monthNames[month],
                '%%2%%':  monthNames[month].substring(0, 3),
                '%%3%%':  pad(month + 1),
                '%%4%%':  month + 1,
                '%%5%%':  dayNames[dayOfWeek],
                '%%6%%':  dayNames[dayOfWeek].substring(0, 3),
                '%%7%%':  pad(day),
                '%%8%%':  day,
                '%%9%%':  pad(h24),
                '%%10%%': h24,
                '%%11%%': pad(h12),
                '%%12%%': h12,
                '%%13%%': pad(m),
                '%%14%%': m,
                '%%15%%': pad(s),
                '%%16%%': s,
            };

            let result = format;

            const escapedLiterals = [];
            result = result.replace(/\\(.)/g, (match, char) => {
                const idx = escapedLiterals.length;
                escapedLiterals.push(char);
                return '%%ESC' + idx + '%%';
            });

            tokens.forEach(({ token, placeholder }) => {
                result = result.replace(token, placeholder);
            });

            if (has12Hour && !has24Hour) {
                const timePlaceholders = ['%%11%%', '%%12%%', '%%13%%', '%%14%%', '%%15%%', '%%16%%'];
                let lastIndex = -1;
                let lastLength = 0;
                timePlaceholders.forEach(ph => {
                    const idx = result.indexOf(ph);
                    if (idx !== -1 && idx > lastIndex) {
                        lastIndex = idx;
                        lastLength = ph.length;
                    }
                });
                if (lastIndex !== -1) {
                    const insertAt = lastIndex + lastLength;
                    result = result.slice(0, insertAt) + ' ' + ampm + result.slice(insertAt);
                }
            }

            Object.keys(values).forEach(placeholder => {
                result = result.replace(placeholder, values[placeholder]);
            });

            escapedLiterals.forEach((char, idx) => {
                result = result.replace('%%ESC' + idx + '%%', char);
            });

            if (showOffset) {
                const sign = offsetMinutes >= 0 ? '+' : '-';
                const absMinutes = Math.abs(offsetMinutes);
                const offH = Math.floor(absMinutes / 60);
                const offM = absMinutes % 60;
                result += ' UTC' + sign + offH + (offM ? ':' + pad(offM) : '');
            }

            return result;
        }

        function update() {
            const parts = getTimeParts();
            if (parts !== null) elements.forEach(el => el.textContent = formatTime(parts));
        }

        update();

        const now = new Date();
        const hasSeconds = format.includes('s');
        const interval = hasSeconds ? 1000 : 60000;
        const msUntilNext = hasSeconds
            ? 1000 - now.getMilliseconds()
            : (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

        setTimeout(() => {
            update();
            setInterval(update, interval);
        }, msUntilNext);
    });
}

jQuery(function($) {
    initializeDynamicClocks();
});