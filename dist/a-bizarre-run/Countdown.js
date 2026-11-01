$(function() {
    function updateCountdown() {
        var countdown = document.getElementById("countdown");
        if (!countdown) return;

        var target = new Date("2026-11-06T11:37:00Z").getTime();
        var distance = target - Date.now();

        if (distance <= 0) {
            countdown.textContent = "EXPIRED";
            return;
        }

        var d = Math.floor(distance / 86400000);
        var h = Math.floor((distance % 86400000) / 3600000);
        var m = Math.floor((distance % 3600000) / 60000);
        var s = Math.floor((distance % 60000) / 1000);

        countdown.textContent = d + "d " + h + "h " + m + "m " + s + "s";
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
});