//Set all time variables
var currentTime, currentSeconds, currentHour, currentDay,
	threeHourSeconds_left, nextRefresh, threeHourDays, threeHourHours, threeHourMinutes, threeHourSeconds,
	daily1Seconds_left, daily1Days, daily1Hours, daily1Minutes, daily1Seconds,
	daily2Seconds_left, daily2Days, daily2Hours, daily2Minutes, daily2Seconds,
	weeklySeconds_left, weeklyRefresh, weeklyDays, weeklyHours, weeklyMinutes, weeklySeconds,
	reefSeconds_left, reefRefresh, reefDays, reefHours, reefMinutes, reefSeconds,
	xurSeconds_left, xurRefresh, xurDays, xurHours, xurMinutes, xurSeconds;

//Get countdown elements
var countdown1 = $(".vendor-countdown-1");
var countdown2 = $(".vendor-countdown-2");
var countdown3 = $(".vendor-countdown-3");
var countdown4 = $(".vendor-countdown-4");
var countdown5 = $(".vendor-countdown-5");
var countdown6 = $(".vendor-countdown-6");
var countdown7 = $(".vendor-countdown-7");

$(".vendor-xur").text("Leaving in:")

setInterval(function () {	
	//Find current time in seconds
	currentTime = new Date();
	currentSeconds = ((currentTime.getUTCHours()) * 3600) + ((currentTime.getMinutes()) * 60) + (currentTime.getSeconds());

	//Find next stock refresh
		//3 hour refresh
		if (currentTime.getUTCHours() < 2) {
			nextRefresh = 2;
		} else if (currentTime.getUTCHours() >= 2 && currentTime.getUTCHours() < 5) {
			nextRefresh = 5;
		} else if (currentTime.getUTCHours() >= 5 && currentTime.getUTCHours() < 8) {
			nextRefresh = 8;
		} else if (currentTime.getUTCHours() >= 8 && currentTime.getUTCHours() < 11) {
			nextRefresh = 11;
		} else if (currentTime.getUTCHours() >= 11 && currentTime.getUTCHours() < 14) {
			nextRefresh = 14;
		} else if (currentTime.getUTCHours() >= 14 && currentTime.getUTCHours() < 17) {
			nextRefresh = 17;
		} else if (currentTime.getUTCHours() >= 17 && currentTime.getUTCHours() < 20) {
			nextRefresh = 20;
		} else if (currentTime.getUTCHours() >= 20 && currentTime.getUTCHours() < 23) {
			nextRefresh = 23;
		} else if (currentTime.getUTCHours() >= 23) {
			nextRefresh = 26;
		}
		
		//Daily refresh
		currentHour = currentTime.getUTCHours()
		currentDay = currentTime.getUTCDay()
		
		if (currentHour < 8) {
			daily1Seconds_left = (8*3600) - currentSeconds;
		} else if (currentHour >= 8) {
			daily1Seconds_left = ((8*3600) - currentSeconds) + (24*3600);
		}
		
		if (currentHour < 9) {
			daily2Seconds_left = (9*3600) - currentSeconds;
		} else if (currentHour >= 9) {
			daily2Seconds_left = ((9*3600) - currentSeconds) + (24*3600);
		}
	
		//Weekly refresh		
		if (currentHour < 8) {
			if (currentDay <= 3) {
				weeklySeconds_left = ((8*3600) - currentSeconds) + ((3-currentDay) * (24*3600));
			} else if (currentDay > 3) {
				weeklySeconds_left = ((8*3600) - currentSeconds) + ((10-currentDay) * (24*3600));
			}
		} else if (currentHour >= 8) {
			if (currentDay <= 2) {
				weeklySeconds_left = ((24*3600) - currentSeconds) + (8*3600) + ((2-currentDay) * (24*3600));
			} else if (currentDay > 2) {
				weeklySeconds_left = ((24*3600) - currentSeconds) + (8*3600) + ((9-currentDay) * (24*3600));
			}
		}
	
		//Reef refresh		
		if (currentHour < 9) {
			if (currentDay <= 2) {
				reefSeconds_left = ((9*3600) - currentSeconds) + ((2-currentDay) * (24*3600));
			} else if (currentDay > 2) {
				reefSeconds_left = ((9*3600) - currentSeconds) + ((9-currentDay) * (24*3600));
			}
		} else if (currentHour >= 9) {
			if (currentDay <= 1) {
				reefSeconds_left = ((24*3600) - currentSeconds) + (9*3600) + ((1-currentDay) * (24*3600));
			} else if (currentDay > 1) {
				reefSeconds_left = ((24*3600) - currentSeconds) + (9*3600) + ((8-currentDay) * (24*3600));
			}
		}
		
		//Xur refresh		
		if (currentHour < 9) {
			if (currentDay > 0) {
				xurSeconds_left = ((9*3600) - currentSeconds) + ((7-currentDay) * (24*3600));
			} else if (currentDay == 0) {
				xurSeconds_left = ((9*3600) - currentSeconds);
			}
		} else if (currentHour >= 9) {
			if (currentDay > 0) {
				xurSeconds_left = ((24*3600) - currentSeconds) + (9*3600) + ((6-currentDay) * (24*3600));
			} else if (currentDay == 0) {
				xurSeconds_left = ((24*3600) - currentSeconds) + (9*3600) + ((6) * (24*3600));
			}
		}
		
		//Shipwright refresh
		var yearStart = new Date(currentTime.getFullYear(), 0, 0);
		var yearDifference = currentTime - yearStart;
		var currentYearDay = Math.floor(yearDifference / (1000 * 60 * 60 * 24));
		
		if (((currentYearDay) % 3) == 0) {
			var shipWrightDifference = 1;
		} else if (((currentYearDay) % 3) == 1) { 
			var shipWrightDifference = 0;
		} else if (((currentYearDay) % 3) == 2) {
			var shipWrightDifference = 2;
		}
		
		if (currentHour < 8) {
			if (shipWrightDifference == 2) { 
				shipWrightSeconds_left = (8*3600) - currentSeconds;
			} else {
				shipWrightSeconds_left = ((8*3600) - currentSeconds) + ((shipWrightDifference + 1) * (24*3600));
			}
		} else if (currentHour >= 8) {
			shipWrightSeconds_left = (((8*3600) - currentSeconds) + (24*3600)) + (shipWrightDifference * (24*3600));
		}

	//Calculate time until next stock refresh
		//3 hour refresh
		threeHourSeconds_left = (nextRefresh * 3600) - currentSeconds;

		threeHourDays = parseInt(threeHourSeconds_left / 86400);
		threeHourSeconds_left = threeHourSeconds_left % 86400;

		threeHourHours = parseInt(threeHourSeconds_left / 3600);
		threeHourSeconds_left = threeHourSeconds_left % 3600;

		threeHourMinutes = parseInt(threeHourSeconds_left / 60);
		threeHourSeconds = parseInt(threeHourSeconds_left % 60);
		
		//Daily refresh
		daily1Days = parseInt(daily1Seconds_left / 86400);
		daily1Seconds_left = daily1Seconds_left % 86400;

		daily1Hours = parseInt(daily1Seconds_left / 3600);
		daily1Seconds_left = daily1Seconds_left % 3600;

		daily1Minutes = parseInt(daily1Seconds_left / 60);
		daily1Seconds = parseInt(daily1Seconds_left % 60);
		
		daily2Days = parseInt(daily2Seconds_left / 86400);
		daily2Seconds_left = daily2Seconds_left % 86400;

		daily2Hours = parseInt(daily2Seconds_left / 3600);
		daily2Seconds_left = daily2Seconds_left % 3600;

		daily2Minutes = parseInt(daily2Seconds_left / 60);
		daily2Seconds = parseInt(daily2Seconds_left % 60);
		
		//Weekly refresh
		weeklyDays = parseInt(weeklySeconds_left / 86400);
		weeklySeconds_left = weeklySeconds_left % 86400;

		weeklyHours = parseInt(weeklySeconds_left / 3600);
		weeklySeconds_left = weeklySeconds_left % 3600;

		weeklyMinutes = parseInt(weeklySeconds_left / 60);
		weeklySeconds = parseInt(weeklySeconds_left % 60);	
		
		//Reef refresh
		reefDays = parseInt(reefSeconds_left / 86400);
		reefSeconds_left = reefSeconds_left % 86400;

		reefHours = parseInt(reefSeconds_left / 3600);
		reefSeconds_left = reefSeconds_left % 3600;

		reefMinutes = parseInt(reefSeconds_left / 60);
		reefSeconds = parseInt(reefSeconds_left % 60);	
		
		//Xur refresh
		xurDays = parseInt(xurSeconds_left / 86400);
		xurSeconds_left = xurSeconds_left % 86400;

		xurHours = parseInt(xurSeconds_left / 3600);
		xurSeconds_left = xurSeconds_left % 3600;

		xurMinutes = parseInt(xurSeconds_left / 60);
		xurSeconds = parseInt(xurSeconds_left % 60);	
		
		//Shipwright refresh
		shipWrightDays = parseInt(shipWrightSeconds_left / 86400);
		shipWrightSeconds_left = shipWrightSeconds_left % 86400;

		shipWrightHours = parseInt(shipWrightSeconds_left / 3600);
		shipWrightSeconds_left = shipWrightSeconds_left % 3600;

		shipWrightMinutes = parseInt(shipWrightSeconds_left / 60);
		shipWrightSeconds = parseInt(shipWrightSeconds_left % 60);	
	
	//Format zero buffering
		//3 hours
	if (threeHourDays < 10) {
		threeHourDays = "0" + String(threeHourDays);
	}

	if (threeHourHours < 10) {
		threeHourHours = "0" + String(threeHourHours);
	}

	if (threeHourMinutes < 10) {
		threeHourMinutes = "0" + String(threeHourMinutes);
	}

	if (threeHourSeconds < 10) {
		threeHourSeconds = "0" + String(threeHourSeconds);
	}
	
		//Daily 1
	if (daily1Hours < 10) {
		daily1Hours = "0" + String(daily1Hours);
	}

	if (daily1Minutes < 10) {
		daily1Minutes = "0" + String(daily1Minutes);
	}

	if (daily1Seconds < 10) {
		daily1Seconds = "0" + String(daily1Seconds);
	}
	
	if (daily1Days < 10) {
		daily1Days = "0" + String(daily1Days);
	}
	
		//Daily 2
	if (daily2Hours < 10) {
		daily2Hours = "0" + String(daily2Hours);
	}

	if (daily2Minutes < 10) {
		daily2Minutes = "0" + String(daily2Minutes);
	}

	if (daily2Seconds < 10) {
		daily2Seconds = "0" + String(daily2Seconds);
	}
	
	if (daily2Days < 10) {
		daily2Days = "0" + String(daily2Days);
	}
	
		//Weekly	
	if (weeklyHours < 10) {
		weeklyHours = "0" + String(weeklyHours);
	}

	if (weeklyMinutes < 10) {
		weeklyMinutes = "0" + String(weeklyMinutes);
	}

	if (weeklySeconds < 10) {
		weeklySeconds = "0" + String(weeklySeconds);
	}
	
	if (weeklyDays < 10) {
		weeklyDays = "0" + String(weeklyDays);
	}
	
		//Reef	
	if (reefHours < 10) {
		reefHours = "0" + String(reefHours);
	}

	if (reefMinutes < 10) {
		reefMinutes = "0" + String(reefMinutes);
	}

	if (reefSeconds < 10) {
		reefSeconds = "0" + String(reefSeconds);
	}
	
	if (reefDays < 10) {
		reefDays = "0" + String(reefDays);
	}
	
		//Xur	
	if (xurHours < 10) {
		xurHours = "0" + String(xurHours);
	}

	if (xurMinutes < 10) {
		xurMinutes = "0" + String(xurMinutes);
	}

	if (xurSeconds < 10) {
		xurSeconds = "0" + String(xurSeconds);
	}
	
	if (xurDays < 10) {
		xurDays = "0" + String(xurDays);
	}
	
		//Shipwright	
	if (shipWrightHours < 10) {
		shipWrightHours = "0" + String(shipWrightHours);
	}

	if (shipWrightMinutes < 10) {
		shipWrightMinutes = "0" + String(shipWrightMinutes);
	}

	if (shipWrightSeconds < 10) {
		shipWrightSeconds = "0" + String(shipWrightSeconds);
	}
	
	if (shipWrightDays < 10) {
		shipWrightDays = "0" + String(shipWrightDays);
	}
	
	//Update page with timer
	countdown1.text(threeHourDays + ":" + threeHourHours + ":" + threeHourMinutes + ":" + threeHourSeconds);
	countdown2.text(daily1Days + ":" + daily1Hours + ":" + daily1Minutes + ":" + daily1Seconds);
	countdown3.text(daily2Days + ":" + daily2Hours + ":" + daily2Minutes + ":" + daily2Seconds);
	countdown4.text(shipWrightDays + ":" + shipWrightHours + ":" + shipWrightMinutes + ":" + shipWrightSeconds);
	countdown5.text(weeklyDays + ":" + weeklyHours + ":" + weeklyMinutes + ":" + weeklySeconds);
	countdown6.text(reefDays + ":" + reefHours + ":" + reefMinutes + ":" + reefSeconds);
	countdown7.text(xurDays + ":" + xurHours + ":" + xurMinutes + ":" + xurSeconds);

}, 1000);