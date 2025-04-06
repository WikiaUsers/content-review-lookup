console.log("Countdown script is running!");

function updateCountdowns() {
    var countdownElements = document.querySelectorAll(".countdown");
    countdownElements.forEach(function (element) {
        var timeElement = element.querySelector(".countdowndate");
        if (!timeElement) return;

        var targetTime = new Date(timeElement.textContent).getTime();
        if (isNaN(targetTime)) {
            element.innerHTML = "<span style='color: red;'>Invalid date</span>";
            return;
        }

        function updateTime() {
            var now = new Date().getTime();
            var distance = targetTime - now;

            if (distance < 0) {
                element.innerHTML = "<span style='color: red;'>Expired</span>";
                return;
            }

            var months = Math.floor(distance / (1000 * 60 * 60 * 24 * 30));
            var days = Math.floor((distance % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            element.innerHTML = `${months} months, ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
        }

        updateTime();
        setInterval(updateTime, 1000);
    });
}

document.addEventListener("DOMContentLoaded", updateCountdowns);