/* Any JavaScript here will be loaded for all users on every page load. */
mw.hook('wikipage.content').add(function($content) {
    var countdown = $content.find('#countdown')[0];

    if (!countdown || countdown.dataset.started) return;
    countdown.dataset.started = "true";

    var targetDate = new Date("2026-11-06T11:37:00Z").getTime();

    function updateCountdown() {
        var distance = targetDate - Date.now();

        if (distance <= 0) {
            countdown.textContent = "EXPIRED";
            return;
        }

        var days = Math.floor(distance / 86400000);
        var hours = Math.floor((distance % 86400000) / 3600000);
        var minutes = Math.floor((distance % 3600000) / 60000);
        var seconds = Math.floor((distance % 60000) / 1000);

        countdown.textContent =
            days + "d " + hours + "h " +
            minutes + "m " + seconds + "s";
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
});