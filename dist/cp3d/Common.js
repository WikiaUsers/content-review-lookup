/* Any JavaScript here will be loaded for all users on every page load. */


/* ====================================================================== *\
	# importArticles - import codes from other wiki pages
	# before adding, it's recommended to move the pages to a subpage of
	  Common.js
	# also, make sure that you separate each page from the
	  array with a comma (,)
\* ====================================================================== */

/* Plok floating across the screen every hour - taken from the cp wiki, made by people smarter than us*/
importArticles({
	type: "script",
	articles: [
		"MediaWiki:Common.js/plok.js",
		"MediaWiki:Common.js/homepageclock.js"
	]
});
/* Visitor's name showing up on a user page */
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").text(wgUserName);
 });
 
 //IST Clock - The majority of this code is borrowed from the CPRewritten Wiki https://clubpenguinrewritten.fandom.com/wiki/MediaWiki:Common.js
var sidebarVisible = getElement("WikiaRail") ? true : false;

if(sidebarVisible) {
	var pstClockElement = document.createElement("div");
	pstClockElement.id = "pst-clock-wrapper";
	pstClockElement.innerHTML = "<section class='rail-module'><h2>IST Clock</h2><div class='border-radius-5 padding-10'id=pst-clock><br><div><span id=time-wrapper class='border-radius-5 padding-10 text-align-center'><span id=time>NOW</span>&nbsp;<span id=am_pm></span></span></div><br><div><span id=day class='border-radius-5 padding-10 text-align-center'>Today</span><button aria-label='Fix date/time accuracy'id=power-clock-button title='Fix date/time accuracy'></button></div></div></section>";
	getElement("WikiaRail").appendChild(pstClockElement);

	var powerClockButton = getElement("power-clock-button");
}

function getElement(id) {
	return document.getElementById(id);
}

function getHour(h) { // UTC Hour to PST Hour conversion
    return 0 < h && 13 > h ? h : 13 <= h ? h - 12 : h + 12;
}

function getMinute(m) {
    return 10 <= m ? m : "0" + m;
}

function getSecond(s) {
    return 10 <= s ? s : "0" + s;
}

function updateTime() {
	var time = getElement("time");
	var utcDate = new Date();
	time.innerText = getHour(utcDate.getUTCHours()) + ":" + getMinute(utcDate.getUTCMinutes()) + ":" + getSecond(utcDate.getUTCSeconds());
}

function updateDayNameAndTimePeriod() { // Updates day name + AM/PM portion
	var days = ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur"];
	var day = getElement("day");
	var am_pm = getElement("am_pm");
	var tempDate = new Date();
	var timeout;
	
	tempDate.setUTCHours(tempDate.getUTCHours());
	day.innerText = days[tempDate.getUTCDay()] + "day";
	if(tempDate.getUTCHours() < 12) {
		am_pm.innerText = "AM";
	} else {
		am_pm.innerText = "PM";
	}
	
	if(tempDate.getUTCHours() === 23 || tempDate.getUTCHours() === 11) {
	    // Prepare for day name or AM/PM change
		timeout = setTimeout(updateDayNameAndTimePeriod, 1000); 
	} else {
		clearTimeout(timeout);
		timeout = setTimeout(updateDayNameAndTimePeriod, 420000);
	}
}

if(sidebarVisible) {
	updateTime();
	setInterval(updateTime, 1000);
	updateDayNameAndTimePeriod();

	try {
		powerClockButton.addEventListener("click", updateTime, false);
		powerClockButton.addEventListener("click", updateDayNameAndTimePeriod, false);
	} catch(e) {  // Event listener not supported
		powerClockButton.parentNode.removeChild(powerClockButton);
	}
}