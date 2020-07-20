/** 上限重設倒數 **/
//Sets the timer to update the page in 1 second intervals
setInterval(function () {	
	//Find current time in seconds
	currentTime = new Date();
	currentSeconds = ((currentTime.getUTCHours()) * 3600) + ((currentTime.getMinutes()) * 60) + (currentTime.getSeconds());
 
	//Finds the current day and hour at GMT/UTC time
	currentHour = currentTime.getUTCHours()
	currentDay = currentTime.getUTCDay();
 
	//Calculates number of seconds until next refresh at 9PM PDT on Tuesday
	//This has been converted into GMT/UTC for the code (9PM PDT Tuesday == 4AM Wednesday)
	if (currentHour <= 4) {
		if (currentDay <= 3) {
			timerSeconds_left = ((4*3600) - currentSeconds) + ((3-currentDay) * (24*3600));
		} else {
			timerSeconds_left = ((4*3600) - currentSeconds) + ((9-currentDay) * (24*3600));
		}
	} else if (currentHour > 4) {
		if (currentDay < 3) {
			timerSeconds_left = ((24*3600) - currentSeconds) + (4*3600) + ((2-currentDay) * (24*3600));
		} else {
			timerSeconds_left = ((24*3600) - currentSeconds) + (4*3600) + ((9-currentDay) * (24*3600));
		}
	}
 
	//Calculates the days, hours, minutes and seconds left until the
	//next refresh using remainder equations
	timerDays = parseInt(timerSeconds_left / 86400);
	timerSeconds_left = timerSeconds_left % 86400;
 
	timerHours = parseInt(timerSeconds_left / 3600);
	timerSeconds_left = timerSeconds_left % 3600;
 
	timerMinutes = parseInt(timerSeconds_left / 60);
	timerSeconds = parseInt(timerSeconds_left % 60);
 
	//Formats each time variable with zero buffering (1 -> 01)
	if (timerHours < 10) {
		timerHours = "0" + String(timerHours);
	}
 
	if (timerMinutes < 10) {
		timerMinutes = "0" + String(timerMinutes);
	}
 
	if (timerSeconds < 10) {
		timerSeconds = "0" + String(timerSeconds);
	}
 
	if (timerDays < 10) {
		timerDays = "0" + String(timerDays);
	}
 
	//Updates each element with the timer
	$(".countdown-spark-days").text(timerDays)
	$(".countdown-spark-hours").text(timerHours)
	$(".countdown-spark-minutes").text(timerMinutes)
	$(".countdown-spark-seconds").text(timerSeconds)
 
}, 1000);