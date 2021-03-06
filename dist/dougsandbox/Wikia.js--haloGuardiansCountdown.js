//Set all time variables
var releaseTime, currentTime, releaseCountdown, releaseDays, releaseHours, releaseMinutes, releaseSeconds, timeDifference;
 
//Get countdown elements
var releaseCountdown1 = $("#countdown-guardians-days");
var releaseCountdown2 = $("#countdown-guardians-hours");
var releaseCountdown3 = $("#countdown-guardians-minutes");
var releaseCountdown4 = $("#countdown-guardians-seconds");
 
function announceRelease() {
    $('.guardians>table').html("<span style=\"font-size:140%;\">Halo 5 Guardians Has Arrived!</span>")
}
 
setInterval(function () {	
	//Calculate number of seconds until release
	currentTime = Math.floor(new Date().getTime() / 1000);
	releaseTime = Math.floor(new Date(2015, 9, 27, 0, 0, 0, 0).getTime() / 1000);
 
	new Date().getHours() - new Date().getUTCHours()
 
	releaseCountdown = releaseTime - currentTime;
 
	//Convert using timezones
	timeDifference = new Date().getHours() - new Date().getUTCHours()
 
	releaseCountdown += timeDifference * 3600;
 
	//Calculate days, hours, minutes and seconds until release
	releaseDays = parseInt(releaseCountdown / 86400);
	releaseCountdown = releaseCountdown % 86400;
 
	releaseHours = parseInt(releaseCountdown / 3600);
	releaseCountdown = releaseCountdown % 3600;
 
	releaseMinutes = parseInt(releaseCountdown / 60);
	releaseSeconds = parseInt(releaseCountdown % 60);
 
	//Format zero buffering
	if (releaseDays < 10) {
		releaseDays = "0" + String(releaseDays);
	}
 
	if (releaseHours < 10) {
		releaseHours = "0" + String(releaseHours);
	}
 
	if (releaseMinutes < 10) {
		releaseMinutes = "0" + String(releaseMinutes);
	}
 
	if (releaseSeconds < 10) {
		releaseSeconds = "0" + String(releaseSeconds);
	}
 
	if ((releaseDays + releaseHours + releaseMinutes + releaseSeconds) > 0) {
		//Update page with times
		releaseCountdown1.text(releaseDays);
		releaseCountdown2.text(releaseHours);
		releaseCountdown3.text(releaseMinutes);
		releaseCountdown4.text(releaseSeconds);
	} else {
		//Announces release
		clearInterval();
		announceRelease();
	}
 
}, 1000);