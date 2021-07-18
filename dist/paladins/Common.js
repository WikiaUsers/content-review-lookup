/* Any JavaScript here will be loaded for all users on every page load. */
// Countdown timer that is accurate to the second and accounts for Daylight Savings Time (DST) unless
// otherwise specified.
// Example: a countdown of loopTime=30 seconds and a delayTime=10 seconds will have a delay timer start a 
// count down from 9 to 0 seconds and the actual timer start a count down from 19 to 0 seconds.
// Reference: https://www.w3schools.com/howto/howto_js_countdown.asp

// Source: https://warframe.fandom.com/wiki/Warframes

// All of these CSS classes must be present on page in order for countdown timer to function
const COUNTDOWN_CLASSES = ["seedDate", "bText", "bDelayText", "timer",
        "aText", "aDelayText", "loopTime", "loopLimit", "endText", 
        "delayTime", "delayDisplay", "dst", "dateFormat", "dateLabels"];
Object.freeze(COUNTDOWN_CLASSES);

// All dictionaries related to time use the abbreviated time units as keys
const TIME_UNIT_ABBR = {
    Year: "Y",
    Month: "M",
    Day: "D",
    Hour: "h",
    Minute: "m",
    Second: "s"
};
Object.freeze(TIME_UNIT_ABBR);

const TIME_IN_MILLISECONDS = {
    Y: 31536000000,  // assuming leap years are irrelevant (milliseconds in a day * 365)
    M: 2628000000,   // average milliseconds per month (milliseconds in a year / 12)
    D: 86400000,
    h: 3600000,
    m: 60000,
    s: 1000
};
Object.freeze(TIME_IN_MILLISECONDS);

var countdownTimers;

// Do not start countdown until Nightwave act table is finish building;
// MediaWiki:NightwaveActs.js will call countdownInit() instead
if (document.getElementsByClassName("customcountdown").length > 0) {
    countdownInit();
}

/**
 * Initializes countdown timers.
 */
function countdownInit() {
    // Stores the innerHTML of elements with the CSS class associated with the key;
    // each element contains an object representing all the countdown elements
    // for a particular timer.
    countdownTimers = getTimersElements();
    console.log("Countdown timer elements recognized.");

    updateTimers();
    console.log("Countdown timers started.");

    // Update timers every second
    setInterval(function() {
        updateTimers();
    }, 1000);
}

function updateTimers() {
    // Create countdown timer for each element with .customcountdown class
    for (var i = 0; i < countdownTimers.length; i++) {
        updateTimer(countdownTimers[i], i);
    }
}

/**
 * Calculate time difference and update timer each second.
 * @param {*} timerParams - dictionary that contains parameters for countdown timer
 * @param {*} num - countdown timer instance
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
    //     " | Time diff: " + timeDiff + 
    //     " | Delay time diff: " + timeDiffDelay + 
    //     " | Loop time - time diff " + (loopTime - timeDiff)
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
        document.getElementById("bText_" + num).setAttribute("style", "display:none;");
        document.getElementById("aText_" + num).setAttribute("style", "display:none;");
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
        document.getElementById("bText_" + num).setAttribute("style", "display:visible; font-size:12px; font-weight:normal; front; line-height: 0.7;");
        document.getElementById("aText_" + num).setAttribute("style", "display:visible; font-size:12px; font-weight:normal; front; line-height: 0.7;");
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
 * all the required elements for timer will be nested under it
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
 * @param {*} time = a string with a number and a time unit associated (e.g. "50s" is 50 seconds) 
 * @returns time in milliseconds
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
 * @param {*} now - Date object representing current datetime
 * @param {*} seedDate - Date object that is before now
 * @param {*} delayTime - delay in milliseconds
 * @param {*} loopTime - loop duration in milliseconds
 * @param {*} loopLimit - maximum number of loops countdown timer can run
 * @returns the number of loops that countdown timer will run
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
 * @param {*} seedDate - Date object
 * @param {*} delayTime - delay in milliseconds
 * @param {*} numLoops - number of countdown loops
 * @param {*} loopTime - loop duration in milliseconds
 * @returns a Date object representing end date of countdown
 */
function findEndDate(seedDate, delayTime, numLoops, loopTime) {
    return new Date(seedDate.getTime() - delayTime + (numLoops * loopTime));
}

/**
 * Total time between now and target date in milliseconds converted
 * to certain time period.
 * @param {*} now - Date object
 * @param {*} endDate - Date object
 * @param {*} dstOffset - DST offset in milliseconds
 * @returns time difference in milliseconds, rounded to the nearest thousands
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
 * @param {*} dateLabels - a string
 * @returns a dictionary that contains display strings per time unit
 */
function getDisplayUnits(dateLabels) {
    var timeUnits = {};
    var unitAbbr;
    switch(dateLabels) {
        case "full":
            for (var unit in TIME_UNIT_ABBR) {
                unitAbbr = TIME_UNIT_ABBR[unit];
                timeUnits[unitAbbr] = " " + unit + "s";
            }
            break;
        case "single":
            for (var unit in TIME_UNIT_ABBR) {
                unitAbbr = TIME_UNIT_ABBR[unit];
                timeUnits[unitAbbr] = TIME_UNIT_ABBR[unit];
            }
            break;
        default:
            for (var unit in TIME_UNIT_ABBR) {
                unitAbbr = TIME_UNIT_ABBR[unit];
                timeUnits[unitAbbr] = "";
            }
            break;
    }
    return timeUnits;
}

/**
 * Formats the numbers of the countdown timer text.
 * @param {*} dateFormat - string that represents date format; each unit is separated by a non-alphabetical
 * character (e.g. "YY-MM-DD hh:mm:ss")
 * @param {*} timeDiff - dictionary that contains time differences per time unit
 * @param {*} timeUnits - dictionary of display text per time unit
 * @returns a string of the formatted text
 */
function formatTimerNumbers(dateFormat, timeDiff, timeUnits) {
    var timerText = dateFormat;
    var formatArr = dateFormat.split(/[^A-Za-z]/);  // e.g. ["YYYY", "MM", "DD"]
    for (var index in formatArr) {
        var elem = formatArr[index];
        var unitAbbr = elem.charAt(0);

        // calculating how many of a time unit can fit in this time frame
        var timeInMilliseconds = TIME_IN_MILLISECONDS[unitAbbr];
        var numTimeUnits = Math.floor(timeDiff / timeInMilliseconds);
        timeDiff -= numTimeUnits * timeInMilliseconds;

        // building display
        var text = numTimeUnits + "";
        text = text.padStart(elem.length, "0");  // padding zeroes for uniformity
        text += timeUnits[elem.charAt(0)];  // adding unit display (e.g. "5 Years")
        var regex = new RegExp(elem);
        timerText = timerText.replace(regex, text);
    }
    return timerText;
}