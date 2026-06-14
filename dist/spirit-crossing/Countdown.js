/* ===== Reset Countdown Timers ===== */
$(function () {
    function runCountdown(elementId, getNextReset) {
        var el = document.getElementById(elementId);
        if (!el) return;

        function tick() {
            var now = new Date();
            var target = getNextReset(now);
            var diff = target - now;

            var days    = Math.floor(diff / 86400000);
            var hours   = Math.floor((diff % 86400000) / 3600000);
            var minutes = Math.floor((diff % 3600000) / 60000);
            var seconds = Math.floor((diff % 60000) / 1000);

            var parts = [];
            if (days > 0) parts.push(days + 'd');
            parts.push(hours + 'h');
            parts.push(minutes + 'm');
            parts.push(seconds + 's');

            el.textContent = parts.join(' ');
        }

        tick();
        setInterval(tick, 1000);
    }

    // Daily reset: next 12:00 UTC
    function getNextDailyReset(now) {
        var target = new Date(Date.UTC(
            now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),
            12, 0, 0, 0
        ));
        if (now >= target) {
            target.setUTCDate(target.getUTCDate() + 1);
        }
        return target;
    }

    // Wilderness reset: next Wednesday or Saturday at 12:00 UTC
    function getNextWildernessReset(now) {
        var today = new Date(Date.UTC(
            now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),
            12, 0, 0, 0
        ));

        // If today is a reset day and we haven't passed noon UTC, use today
        var day = today.getUTCDay();
        if ((day === 3 || day === 6) && now < today) {
            return today;
        }

        // Step forward until we hit Wednesday (3) or Saturday (6)
        for (var i = 1; i <= 6; i++) {
            var check = new Date(today.getTime() + i * 86400000);
            if (check.getUTCDay() === 3 || check.getUTCDay() === 6) {
                return check;
            }
        }
    }

    runCountdown('daily-reset-timer', getNextDailyReset);
    runCountdown('wilderness-reset-timer', getNextWildernessReset);
});