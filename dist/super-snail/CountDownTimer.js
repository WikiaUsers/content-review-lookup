function startCountdown() {
    // Get current date in UTC
    var now = new Date();

    // Convert it to Pacific Time (UTC-7)
    var localOffset = now.getTimezoneOffset() * 60 * 1000;
    var pacificOffset = 7 * 60 * 60 * 1000;
    var pacificTime = new Date(now.getTime() + localOffset - pacificOffset);

    // Calculate the current day number since the beginning of the 21-day cycle
    var daysSinceCycleStart = Math.floor((pacificTime - new Date(pacificTime.getFullYear(), pacificTime.getMonth(), pacificTime.getDate() - pacificTime.getDate() % 21)) / (24 * 60 * 60 * 1000));

    // Calculate the countdown time for next week and the week after
    var countdownNextWeek = new Date(pacificTime.getFullYear(), pacificTime.getMonth(), pacificTime.getDate() + 7 - daysSinceCycleStart % 7, 8) - pacificTime;
    var countdownWeekAfterNext = new Date(pacificTime.getFullYear(), pacificTime.getMonth(), pacificTime.getDate() + 14 - daysSinceCycleStart % 7, 8) - pacificTime;

    // Convert the countdown time to days, hours, minutes, seconds
    var daysNextWeek = Math.floor(countdownNextWeek / (24 * 60 * 60 * 1000));
    var hoursNextWeek = Math.floor((countdownNextWeek % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    var minutesNextWeek = Math.floor((countdownNextWeek % (60 * 60 * 1000)) / (60 * 1000));
    var secondsNextWeek = Math.floor((countdownNextWeek % (60 * 1000)) / 1000);

    var daysWeekAfterNext = Math.floor(countdownWeekAfterNext / (24 * 60 * 60 * 1000));
    var hoursWeekAfterNext = Math.floor((countdownWeekAfterNext % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    var minutesWeekAfterNext = Math.floor((countdownWeekAfterNext % (60 * 60 * 1000)) / (60 * 1000));
    var secondsWeekAfterNext = Math.floor((countdownWeekAfterNext % (60 * 1000)) / 1000);

    // Calculate the current week number within the 21-day cycle
    var currentWeek = Math.floor(daysSinceCycleStart / 7) % 3;

    var countdownStringNextWeek = daysNextWeek + "d " + hoursNextWeek + "h " + minutesNextWeek + "m " + secondsNextWeek + "s";
    var countdownStringWeekAfterNext = daysWeekAfterNext + "d " + hoursWeekAfterNext + "h " + minutesWeekAfterNext + "m " + secondsWeekAfterNext + "s";

    // Update the countdown text based on the current week
    if (currentWeek === 0) { // If current week is Lottery Week
        document.getElementById('countdownNextWeek').innerText = "Lottery Week in Progress\n" + "Wishing Week in: " + countdownStringNextWeek;
        document.getElementById('countdownWeekAfterNext').innerText = "Offering Week in: " + countdownStringWeekAfterNext;
    } else if (currentWeek === 1) { // If current week is Wishing Week
        document.getElementById('countdownNextWeek').innerText = "Wishing Week in Progress\n" + "Offering Week in: " + countdownStringNextWeek;
        document.getElementById('countdownWeekAfterNext').innerText = "Lottery Week in: " + countdownStringWeekAfterNext;
    } else { // If current week is Offering Week
        document.getElementById('countdownNextWeek').innerText = "Offering Week in Progress\n" + "Lottery Week in: " + countdownStringNextWeek;
        document.getElementById('countdownWeekAfterNext').innerText = "Wishing Week in: " + countdownStringWeekAfterNext;
    }
}

// Update the countdown every second
setInterval(startCountdown, 1000);