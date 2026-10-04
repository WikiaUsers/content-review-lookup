(function () {
    function updateCountdown() {
        var countdown = document.querySelector('.after-the-storm-countdown');

        if (!countdown) {
            return;
        }

        var target = new Date(
            countdown.getAttribute('data-countdown')
        ).getTime();

        var difference = target - Date.now();

        if (difference <= 0) {
            countdown.querySelector('.after-the-storm-countdown-timer').style.display = 'none';
            countdown.querySelector('.after-the-storm-countdown-released').style.display = 'block';
            return;
        }

        var totalSeconds = Math.floor(difference / 1000);

        var days = Math.floor(totalSeconds / 86400);
        var hours = Math.floor((totalSeconds % 86400) / 3600);
        var minutes = Math.floor((totalSeconds % 3600) / 60);
        var seconds = totalSeconds % 60;

        countdown.querySelector('[data-unit="days"]').textContent =
            String(days).padStart(2, '0');

        countdown.querySelector('[data-unit="hours"]').textContent =
            String(hours).padStart(2, '0');

        countdown.querySelector('[data-unit="minutes"]').textContent =
            String(minutes).padStart(2, '0');

        countdown.querySelector('[data-unit="seconds"]').textContent =
            String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
})();