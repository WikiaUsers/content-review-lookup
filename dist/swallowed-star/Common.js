// Set the target day and time
var targetDay = 2; // Wednesday (0=Sunday, 1=Monday, ..., 6=Saturday)
var targetHour = 4; // 4:00 am
var targetOffset = 1; // UTC+2 for European clock mode, currectly airing at 3 am / set to 0 for 4 am

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
};

// Find all elements with class "tally"
var elements = document.querySelectorAll('.LeaderboardTable .tally > em');

// Loop through each element
elements.forEach(function(element) {
    // Get the number inside the <em> tag and remove commas
    var number = parseInt(element.innerText.replace(/,/g, ''));

    // Change the color based on the number
    if (number >= 100) {
        element.style.color = 'var(--achievement-gold)';
    } else if (number >= 50) {
        element.style.color = 'var(--achievement-silver)';
    } else if (number >= 10) {
        element.style.color = 'var(--achievement-bronze)';
    }
});