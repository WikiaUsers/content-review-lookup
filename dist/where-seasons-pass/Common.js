/* Any JavaScript here will be loaded for all users on every page load. */
(function () {
    const WEEK_DURATION = 168 * 3600;
    const SEASON_DURATION = 42 * 3600;

    // Current correction: 1 hour and 10 seconds
    const OFFSET = (60 * 60) + 10;

    const seasonData = [
        {
            key: 'spring',
            label: 'SPRING',
            emoji: '🌸',
            accent: '#7fbf7f',
            text: '#3d6b43',
            background: 'linear-gradient(180deg, #fff1f7 0%, #e6f6e5 100%)',
            note: 'Fresh growth and new beginnings.',
            next: 'Summer'
        },
        {
            key: 'summer',
            label: 'SUMMER',
            emoji: '☀️',
            accent: '#f0b53e',
            text: '#8a5a00',
            background: 'linear-gradient(180deg, #fff3c7 0%, #ffe0a1 100%)',
            note: 'Bright skies and warm weather.',
            next: 'Autumn'
        },
        {
            key: 'autumn',
            label: 'AUTUMN',
            emoji: '🍂',
            accent: '#cf7a41',
            text: '#7a3f1d',
            background: 'linear-gradient(180deg, #f8e1cb 0%, #edc08c 100%)',
            note: 'Falling leaves and cooler days.',
            next: 'Winter'
        },
        {
            key: 'winter',
            label: 'WINTER',
            emoji: '❄️',
            accent: '#7eb6f0',
            text: '#1f63b8',
            background: 'linear-gradient(180deg, #eef7ff 0%, #dbeeff 100%)',
            note: 'Cold weather and frosty conditions.',
            next: 'Spring'
        }
    ];

    function getUkDate() {
        return new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/London' }));
    }

    function pad(num) {
        return String(num).padStart(2, '0');
    }

    function formatTime(totalSeconds) {
        let secondsLeft = totalSeconds;
        const d = Math.floor(secondsLeft / 86400);
        secondsLeft %= 86400;
        const h = Math.floor(secondsLeft / 3600);
        secondsLeft %= 3600;
        const m = Math.floor(secondsLeft / 60);
        const s = secondsLeft % 60;

        return `${d}d ${pad(h)}h ${pad(m)}m ${pad(s)}s`;
    }

    function getCurrentSeasonState() {
        const ukDate = getUkDate();
        const day = ukDate.getDay();
        const shiftedDay = day === 0 ? 6 : day - 1;

        const rawWeekSeconds =
            (shiftedDay * 86400) +
            (ukDate.getHours() * 3600) +
            (ukDate.getMinutes() * 60) +
            ukDate.getSeconds();

        const currentWeekSeconds = (rawWeekSeconds - OFFSET + WEEK_DURATION) % WEEK_DURATION;

        let seasonIndex = Math.floor(currentWeekSeconds / SEASON_DURATION);
        if (seasonIndex < 0 || seasonIndex > 3) {
            seasonIndex = 0;
        }

        let secondsLeft = ((seasonIndex + 1) * SEASON_DURATION) - currentWeekSeconds;
        if (secondsLeft < 0) {
            secondsLeft += SEASON_DURATION;
        }

        return {
            seasonIndex,
            secondsLeft
        };
    }

    function renderSeasonTimer(container) {
        const state = getCurrentSeasonState();
        const season = seasonData[state.seasonIndex];
        const nextSeason = seasonData[(state.seasonIndex + 1) % 4];

        container.style.background = season.background;
        container.style.border = `3px solid ${season.accent}`;
        container.style.borderRadius = '12px';
        container.style.boxSizing = 'border-box';
        container.style.padding = '22px 18px';
        container.style.color = season.text;
        container.style.textAlign = 'center';
        container.style.boxShadow = 'inset 0 0 0 1px rgba(255,255,255,0.25)';

        container.innerHTML = `
            <div style="font-size:0.9em; text-transform:uppercase; font-weight:bold; letter-spacing:1px; opacity:0.85; margin-bottom:6px;">
                Current Season
            </div>

            <div style="font-size:2.2em; font-weight:800; margin:4px 0 8px 0; text-transform:uppercase; color:${season.text};">
                ${season.emoji} ${season.label} ${season.emoji}
            </div>

            <div style="font-size:0.95em; margin-bottom:14px; opacity:0.9;">
                ${season.note}
            </div>

            <div style="font-size:0.9em; margin-bottom:4px; opacity:0.75;">
                Time Remaining
            </div>

            <div style="font-size:1.5em; font-family:monospace; font-weight:bold; margin-bottom:14px; color:${season.text};">
                ${formatTime(state.secondsLeft)}
            </div>

            <div style="font-size:0.9em; opacity:0.8; margin-bottom:4px;">
                Next Season
            </div>

            <div style="font-size:1.05em; font-weight:bold; margin-bottom:12px;">
                ${nextSeason.emoji} ${nextSeason.label}
            </div>
        `;
    }

    function startSeasonTimer(attempt) {
        const container = document.getElementById('season-timer-container');

        if (!container) {
            if (attempt < 40) {
                setTimeout(function () {
                    startSeasonTimer(attempt + 1);
                }, 500);
            }
            return;
        }

        renderSeasonTimer(container);

        if (container.dataset.timerStarted === 'true') {
            return;
        }

        container.dataset.timerStarted = 'true';

        setInterval(function () {
            renderSeasonTimer(container);
        }, 1000);
    }

    document.addEventListener('DOMContentLoaded', function () {
        startSeasonTimer(0);
    });

    window.addEventListener('load', function () {
        startSeasonTimer(0);
    });

    startSeasonTimer(0);
})();