/**
 * Countdown timer that is accurate to the second and accounts for Daylight 
 * Savings Time (DST) unless otherwise specified. Any element with the 
 * .customcountdown CSS class will be targeted for building the countdown timer.
 * 
 * Sample scenario: a countdown of loopTime=30 seconds and a delayTime=10 seconds 
 * will have a delay timer start a count down from 9 to 0 seconds (10 second delay) 
 * and the actual timer start a count down from 19 to 0 seconds for a total 
 * countdown loop time of 30 seconds.
 * 
 * Timestamp formatting strings will follow basic ISO 8601:
 * - YYYY: four-digit year
 * - MM: two-digit month
 * - DD: two-digit day
 * - hh: two-digit hour
 * - mm: two-digit minute
 * - ss: two-digit second
 * 
 * @author	User:FINNER (original author)
 * @author	User:Cephalon Scientia (refactor, i18n)
 * @requires	mediawiki
 * @requires	jQuery
 * 
 * Reference: https://www.w3schools.com/howto/howto_js_countdown.asp
 */

/**
 * Current wiki's locale for i18n.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
 * @type {string}
 */
const WIKI_LOCALE = (function() {
	var config = mw.config.get([ "wgContentLanguage", "wgUserLanguage" ]);
	// Allow logged-in user's language settings to override the wiki's content language
	return (config.wgUserLanguage !== config.wgContentLanguage) ? config.wgUserLanguage : config.wgContentLanguage;
})();

/**
 * Enables consistent translation of datetime unit names through the Intl.DisplayNames object.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames/DisplayNames
 * @constant	I18N
 * @type {Object}
 */
const I18N = new Intl.DisplayNames(WIKI_LOCALE, { type: "dateTimeField", style: "long" });
const I18N_SHORT = new Intl.DisplayNames(WIKI_LOCALE, { type: "dateTimeField", style: "short" });	// Abbreviated

/**
 * Array of CSS classes that must be present on page in order for countdown timer to function.
 * @constant	COUNTDOWN_CLASSES
 * @type {string[]}
 */
const COUNTDOWN_CLASSES = ["seedDate", "bText", "bDelayText", "timer",
		"aText", "aDelayText", "loopTime", "loopLimit", "endText", 
		"delayTime", "delayDisplay", "dst", "dateFormat", "dateLabels"];
Object.freeze(COUNTDOWN_CLASSES);

/**
 * Contains datetime formatting string tokens for iterating over.
 * All objects related to time will use these tokens as key names
 * (e.g. DATETIME_FORMAT_FULL and DATETIME_FORMAT_ABBR).
 * @constant	DATETIME_FORMAT_TOKENS
 * @type {string[]}
 */
const DATETIME_FORMAT_TOKENS = [ "Y", "M", "D", "h", "m", "s" ];
Object.freeze(DATETIME_FORMAT_TOKENS);

/**
 * Mapping datetime format string specifiers to localized datetime unit name.
 * @constant	DATETIME_FORMAT_FULL
 * @type {Object.<string, string>}
 */
// TODO: Add support for pluralization of full datetime units (e.g. Y: "año" to Y: "años")
const DATETIME_FORMAT_FULL = {
	Y: I18N.of("year"),
	M: I18N.of("month"),
	D: I18N.of("day"),
	h: I18N.of("hour"),
	m: I18N.of("minute"),
	s: I18N.of("second")
};
Object.freeze(DATETIME_FORMAT_FULL);

/**
 * Mapping datetime format string specifiers to localized datetime unit abbreviation.
 * Values are based on the first character of the localized datetime unit
 * (when reading from left-to-right, first character is leftmost character).
 * E.g. "Y" -> "A" in Spanish ("year" to "año")
 * @constant	DATETIME_FORMAT_ABBR
 * @type {Object.<string, string>}
 */
const DATETIME_FORMAT_ABBR = {
	Y: I18N_SHORT.of("year"),
	M: I18N_SHORT.of("month"),
	D: I18N_SHORT.of("day"),
	h: I18N_SHORT.of("hour"),
	m: I18N_SHORT.of("minute"),
	s: I18N_SHORT.of("second")
};
Object.freeze(DATETIME_FORMAT_ABBR);

/**
 * Maps time units to milliseconds.
 * @constant	TIME_IN_MILLISECONDS
 * @type {Object.<string, number>}
 */
const TIME_IN_MILLISECONDS = {
	Y: 31536000000,  // assuming leap years are irrelevant (milliseconds in a day * 365)
	M: 2628000000,   // average milliseconds per month (milliseconds in a year / 12)
	D: 86400000,
	h: 3600000,
	m: 60000,
	s: 1000
};
Object.freeze(TIME_IN_MILLISECONDS);

/**
 * The name of the article page that the client is currently on.
 * @constant	PAGE_NAME
 * @type {string}
 */
const PAGE_NAME = mw.config.get("wgPageName");

/**
 * An array of objects that store the innerHTML of elements with the CSS class
 * associated with the key.
 * Each element contains an object representing all the countdown elements
 * for a particular timer.
 * A sample element would look like:
 * {
 *  seedDate: some html,
 *  bText: some html,
 *  bDelayText: some html,
 *  ...
 *  dateLabels: some html
 * }
 * @var		countdownTimers
 * @type {Object{Object.<string, string>}}
 */
var countdownTimers;

// Countdown timer entry point
if (document.getElementsByClassName("customcountdown").length > 0) {
	countdownInit();
}

/**
 * Initializes countdown timers.
 * @function	countdownInit
 */
function countdownInit() {
	countdownTimers = getTimersElements();
	console.log(PAGE_NAME + ": Countdown timer elements recognized.");

	updateTimers();
	console.log(PAGE_NAME + ": Countdown timers started.");

	// Update timers every second
	setInterval(function() {
		updateTimers();
	}, 1000);
}

/**
 * Updates all countdown timers on the page.
 * @function	updateTimers
 */
function updateTimers() {
	// Create countdown timer for each element with .customcountdown class
	for (var i = 0; i < countdownTimers.length; i++) {
		updateTimer(countdownTimers[i], i);
	}
}

/**
 * Calculate time difference and update timer each second.
 * @function	updateTimer
 * @param {Object.<string, string>} timerParams - dictionary that contains parameters for countdown timer
 * @param {number} num - countdown timer instance
 */
function updateTimer(timerParams, num) {
	var now = new Date();

	// Parameters are stored in innerHTML
	var seedDate = new Date((timerParams.seedDate === "") ? "December 3, 2015 00:00:00 UTC" 
		: timerParams.seedDate);

	if (isNaN(seedDate.getTime())) {
		throw "ERROR: seedDate is not in a valid date format (e.g. \"December 3, 2015 00:00:00 UTC\").";
	}

	// Time between loop iterations (i.e. duration of a loop)
	var loopTime = convertTimeToMilliseconds(timerParams.loopTime);
	// Maximum number of loop iterations; it loopLimit is less than 0, then effectively 
	// treat it as infinite number of loops
	var loopLimit = (isNaN(timerParams.loopLimit)) ? 0 : 
		(timerParams.loopLimit < 0) ? Number.MAX_SAFE_INTEGER 
		: Number(timerParams.loopLimit);

	// Splits total loopTime into two time periods, one that is the delayed countdown (i.e.
	// a countdown of the countdown) and the other is the actual countdown; timers switch 
	// after the other timer reaches zero
	// (e.g. if delayTime == 20s and loopTime = 60s, the first 20s will be a 20s countdown
	// with delay text while the next 40s will be the actual countdown) 
	var delayTime = convertTimeToMilliseconds(timerParams.delayTime);

	// Show delayed countdown if true
	var delayDisplay = timerParams.delayDisplay === "";

	// delayTime should always be less than total loopTime
	if (delayTime >= loopTime) {
		throw "ERROR: Cannot have a delayTime that is larger than total loopTime.";
	}

	var numLoops = calculateNumLoops(now, seedDate, 0, loopTime, loopLimit);
	var numLoopsDelay = calculateNumLoops(now, seedDate, delayTime, loopTime, loopLimit);

	var endDate = findEndDate(seedDate, 0, numLoops, loopTime);
	var endDateDelay = findEndDate(seedDate, delayTime, numLoopsDelay, loopTime);

	// Accounts for Daylight Saving Time (DST) between now and target date 
	// by default unless otherwise specified
	var dstOffset = (timerParams.dst === "") ? 
		(now.getTimezoneOffset() - endDate.getTimezoneOffset()) * 60 * 1000 : 0;
	var dstOffsetDelay = (timerParams.dst === "") ? 
		(now.getTimezoneOffset() - endDateDelay.getTimezoneOffset()) * 60 * 1000 : 0;
	
	// Total time between now and target date in milliseconds converted
	// to certain time period
	// (i.e. for 120 minutes: years = 0; months = 0; days = 0;
	// hours = 2; minutes = 120; seconds = 7200)
	// time string will result in "00021207200" thus far
	var timeDiff = calculateTimeDiff(now, endDate, dstOffset);  // in milliseconds, rounded to the nearest thousandths place
	var timeDiffDelay = calculateTimeDiff(now, endDateDelay, dstOffsetDelay);
	// console.log("Loop time: " + loopTime + 
	//	 " | Time diff: " + timeDiff + 
	//	 " | Delay time diff: " + timeDiffDelay + 
	//	 " | Loop time - time diff " + (loopTime - timeDiff)
	// );

	var dateFormat = (timerParams.dateFormat === "") ? "YY MM DD hh mm ss" 
		: timerParams.dateFormat;

	// Based on the specified time periods' desired units, gives each time
	// period in the string certain units
	// (i.e. for 120 minutes & "hh mm ss" & "single": years = 0Y; months = 0M;
	// days = 0D; hours = 02h; minutes = 00m; seconds = 00s)
	// time string will result in "0Y0M0D02h00m00s" thus far
	var timeUnits = getDisplayUnits(timerParams.dateLabels);

	// When loop iterations reaches loop limit, hide normal text, hide delay
	// text, hide normal/delay time periods, and only show end of loop text
	if ((numLoops === loopLimit) && (endDate.getTime() <= now.getTime())) {
		document.getElementById("endText_" + num).setAttribute("style", "display:visible");
		document.getElementById("bText_" + num).setAttribute("style", "display:none");
		document.getElementById("aText_" + num).setAttribute("style", "display:none");
		document.getElementById("bDelayText_" + num).setAttribute("style", "display:none");
		document.getElementById("aDelayText_" + num).setAttribute("style", "display:none");
		$("#timer_" + num).html("");

	// While delay time has yet to reach inputted delay time show normal text,
	// hide delay text, and only show normal time periods specified by date 
	// format
	// (i.e. for 120 minutes & "hh mm ss" & "single" & " " or "&nbsp;": 
	// years = ; months = ; days = ; hours = 02h ;
	// minutes = 00m ; seconds = 00s)
	// Time string will result in "02h 00m 00s" thus far
	} else if (Math.min(timeDiff, timeDiffDelay) === timeDiffDelay) {
		document.getElementById("endText_" + num).setAttribute("style", "display:none");
		document.getElementById("bText_" + num).setAttribute("style", "display:visible");
		document.getElementById("aText_" + num).setAttribute("style", "display:visible");
		document.getElementById("aDelayText_" + num).setAttribute("style", "display:none");
		document.getElementById("bDelayText_" + num).setAttribute("style", "display:none");
		// Adding the time values onto the page for "true" countdown
		$("#timer_" + num).html(formatTimerNumbers(dateFormat, timeDiffDelay, timeUnits));
	
	// When delay time reaches inputted delay time show delay text, hide normal
	// text, and only show delay time periods specified by date format
	} else {
		document.getElementById("endText_" + num).setAttribute("style", "display:none");
		document.getElementById("bText_" + num).setAttribute("style", "display:none");
		document.getElementById("aText_" + num).setAttribute("style", "display:none");
		document.getElementById("bDelayText_" + num).setAttribute("style", "display:visible");
		document.getElementById("aDelayText_" + num).setAttribute("style", "display:visible");
		// Adding the time values onto the page for delayed time period
		if (delayDisplay) {
			$("#timer_" + num).html(formatTimerNumbers(dateFormat, timeDiff, timeUnits));
		} else {
			$("#timer_" + num).html("");
		}
	}
}

/**
 * Maps countdown timers elements from DOM to individual timers.
 * Assuming that when an element with .customcountdown class is present
 * all the required elements for timer will be nested under it.
 * @function	getTimersElements
 */
function getTimersElements() {
	var count = document.getElementsByClassName("customcountdown");
	countdownTimers = [];

	for (var i = 0; i < count.length; i++) {
		// Adding new objects to dictionary; each representing an individual timer
		countdownTimers[i] = {};
		for (var index in COUNTDOWN_CLASSES) {
			var className = COUNTDOWN_CLASSES[index];
			var element = document.getElementsByClassName(className)[i];
			if (element === null) {
				throw "ERROR: " + className + " CSS class is missing for countdown timer instance #" + i + ".";
			}
			// Gives each instance of repeating elements of same class unique ids
			// (e.g. #seedDate_1)
			element.id = className + "_" + i;
			countdownTimers[i][className] = element.innerHTML;
		}
	}
	
	return countdownTimers;
}

/**
 * Converts time to milliseconds. Ignores sign and decimals. Default unit is seconds ("s") and
 * default number is zero.
 * @function	convertTimeToMilliseconds
 * @param {string} time - a string with a number and a time unit associated (e.g. "50s" is 50 seconds) 
 * @returns {number} time in milliseconds
 */
function convertTimeToMilliseconds(time) {
	var number = parseFloat(time);
	var unit = time.match(/[A-Za-z]+/);
	if (unit === null) {
		unit = "s";
	}
	if (isNaN(number)) {
		number = 0;
	}
	if (TIME_IN_MILLISECONDS[unit] !== undefined) {
		return number * TIME_IN_MILLISECONDS[unit];
	}
	throw "ERROR: Invalid time unit (" + unit + ") in a .loopTime and/or .delayTime CSS class. " + 
			"Valid units: \"Y\", \"M\", \"D\", \"h\", \"m\", \"s\"";
}

/**
 * Calculating number of loops between current and initial datetime.
 * @function	calculateNumLoops
 * @param {Date} now - Date object representing current datetime
 * @param {Date} seedDate - Date object that is before now
 * @param {number} delayTime - delay in milliseconds
 * @param {number} loopTime - loop duration in milliseconds
 * @param {number} loopLimit - maximum number of loops countdown timer can run
 * @returns {number} the number of loops that countdown timer will run
 */
function calculateNumLoops(now, seedDate, delayTime, loopTime, loopLimit) {
	// Math.ceil() is needed to account for the fact that timer can reach 0 
	// during an unfinished loop
	var numLoops = Math.ceil((now.getTime() - seedDate.getTime() + delayTime) / loopTime);
	if (numLoops > loopLimit) {
		return loopLimit;
	}
	return numLoops;
}

/**
 * Determining the end datetime based on initial datetime, 
 * loop duration, and the number of loops that the timer will cycle through.
 * @function	findEndDate
 * @param {Date} seedDate - Date object
 * @param {number} delayTime - delay in milliseconds
 * @param {number} numLoops - number of countdown loops
 * @param {number} loopTime - loop duration in milliseconds
 * @returns {Date} a Date object representing end date of countdown
 */
function findEndDate(seedDate, delayTime, numLoops, loopTime) {
	return new Date(seedDate.getTime() - delayTime + (numLoops * loopTime));
}

/**
 * Total time between now and target date in milliseconds converted
 * to certain time period.
 * @function	calculateTimeDiff
 * @param {Date} now - Date object
 * @param {Date} endDate - Date object
 * @param {number} dstOffset - DST offset in milliseconds
 * @returns {number} time difference in milliseconds, rounded to the nearest thousands
 */
function calculateTimeDiff(now, endDate, dstOffset) {
	// Note that skipping seconds can rarely happen
	// especially when counting down to zero
	// since function calls are not instantaneous and take time to run
	// (example case: 7041 milliseconds => 5999 milliseconds)
	var timeDiff = (endDate.getTime() - now.getTime()) + dstOffset;
	return timeDiff;
}

/**
 * Get display units for each time unit.
 * @function	getDisplayUnits
 * @param {string} dateLabels - a string
 * @returns {Object.<string, string>} a dictionary that contains display strings per time unit
 */
function getDisplayUnits(dateLabels) {
	var timeUnits = {};
	var insertDisplayUnit;
	switch(dateLabels) {
		case "full":
			insertDisplayUnit = function(formatToken) {
				timeUnits[formatToken] = " " + DATETIME_FORMAT_FULL[formatToken];
			}
			break;
		case "single":
			insertDisplayUnit = function(formatToken) {
				timeUnits[formatToken] = DATETIME_FORMAT_ABBR[formatToken];
			}
			break;
		default:
			insertDisplayUnit = function(formatToken) {
				timeUnits[formatToken] = "";
			}
			break;
	}
	DATETIME_FORMAT_TOKENS.forEach(insertDisplayUnit);
	return timeUnits;
}

/**
 * Formats the numbers of the countdown timer text.
 * @function	formatTimerNumbers
 * @param {string} dateFormat - string that represents date format; each unit is 
 * separated by a non-alphabetical character (e.g. "YY-MM-DD hh:mm:ss")
 * @param {number} timeDiff - time difference in milliseconds
 * @param {Object.<string, string>} timeUnits - dictionary of display text per time unit
 * @returns {string} a string of the formatted text
 */
function formatTimerNumbers(dateFormat, timeDiff, timeUnits) {
	var timerText = dateFormat;
	var formatArr = dateFormat.split(/[^A-Za-z]/);  // e.g. ["YYYY", "MM", "DD"]
	for (var index in formatArr) {
		var elem = formatArr[index];
		var timestampFormatToken = elem.charAt(0);	// e.g. "Y"

		// calculating how many of a time unit can fit in this time frame
		var timeInMilliseconds = TIME_IN_MILLISECONDS[timestampFormatToken];
		var numTimeUnits = Math.floor(timeDiff / timeInMilliseconds);
		timeDiff -= numTimeUnits * timeInMilliseconds;

		// building display
		var text = numTimeUnits + "";
		text = text.padStart(elem.length, "0");  // padding zeroes for uniformity
		text += timeUnits[timestampFormatToken];  // adding unit display (e.g. "5 Years")
		var regex = new RegExp(elem);
		timerText = timerText.replace(regex, text);
	}
	return timerText;
}