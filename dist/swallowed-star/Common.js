// Set the target day and time
var targetDay = 2; // Wednesday (0=Sunday, 1=Monday, ..., 6=Saturday)
var targetHour = 4; // 4:00 am
var targetOffset = 0; // UTC+2 for European clock mode

var now = new Date();
var targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), targetHour, 0, 0, 0);
while (targetDate.getDay() != targetDay) {
    targetDate.setDate(targetDate.getDate() + 1);
}
targetDate.setHours(targetDate.getHours() - targetOffset);

var isCalculating = false;

// Update the countdown every second
setInterval(updateCountdown, 1000);

function updateCountdown() {
    now = new Date();
    var diff = targetDate.getTime() - now.getTime();
    if (diff < 0) {
        // The target time has passed, calculate the next target date
        targetDate.setDate(targetDate.getDate() + 7);
        if (!isCalculating) {
            document.getElementById("countdown").innerHTML = "Calculating...";
            isCalculating = true;
        }
        setTimeout(function () {
            isCalculating = false;
            updateCountdown();
        }, 1000);
    } else {
        var days = Math.floor(diff / (1000 * 60 * 60 * 24));
        var hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
        var minutes = Math.floor(diff / (1000 * 60)) % 60;
        var seconds = Math.floor(diff / 1000) % 60;
        hours = hours.toString().padStart(2, '0'); // add leading zero if less than 10
        minutes = minutes.toString().padStart(2, '0'); // add leading zero if less than 10
        seconds = seconds.toString().padStart(2, '0'); // add leading zero if less than 10

        var returnString = days + "d " + hours + "h " + minutes + "m " + seconds + "s";
        document.getElementById("countdown").innerHTML = returnString;
    }
}

// Spoiler text
var spoiler = document.querySelector(".spoiler");

spoiler.addEventListener("click", function (event) {
    if (event.target.tagName === 'A') { // check if clicked element is an <a> tag
        event.preventDefault(); // prevent default link behavior
        window.location.href = event.target.href; // navigate to the link immediately
    } else {
        spoiler.classList.toggle("active");
    }
});