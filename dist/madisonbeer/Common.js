// ** countdown for releases! ** //

function pluralize(value, unit) {
    return value + " " + unit + (value === 1 ? "" : "s");
}

function startCountdown(id) {
    var countdownElement = document.getElementById(id);
    var targetDate = countdownElement.getAttribute("data-date");
    var countDownDate = new Date(targetDate).getTime();

    var x = setInterval(function () {
        var now = new Date().getTime();
        var distance = countDownDate - now;

        if (distance < 0) {
            clearInterval(x);
            countdownElement.innerHTML = "OUT NOW!";
            return;
        }

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Decide what to show
        if (days > 3) {
            countdownElement.innerHTML = pluralize(days, "day");
        } else if (days > 0) {
            countdownElement.innerHTML =
                pluralize(days, "day") + " " + pluralize(hours, "hour");
        } else if (hours > 0) {
            countdownElement.innerHTML =
                pluralize(hours, "hour") + " " + pluralize(minutes, "minute");
        } else if (minutes > 0) {
            countdownElement.innerHTML =
                pluralize(minutes, "minute") + " " + pluralize(seconds, "second");
        } else {
            countdownElement.innerHTML = pluralize(seconds, "second");
        }
    }, 1000);
}

mw.loader.using("mediawiki.util", function () {
    startCountdown("myCountdown");
});