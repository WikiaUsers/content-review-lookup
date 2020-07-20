// 01:48, February 20, 2012 (UTC)
// <source lang="JavaScript">

// Displays Comments in Local Time

/*
	COMMENTS IN LOCAL TIME
	Description: Changes [[Coordinated Universal Time|UTC]]-based
        times and dates, such as those used in signatures, to be 
        relative to local time.
	Documentation: [[Wikipedia:Comments in Local Time]]
	Link: [[User:Gary King/comments in local time.js]]
        Adapted for Wikia by [[User:Rappy 4187]]	
*/
 
if (typeof(unsafeWindow) != 'undefined') {
	var console = unsafeWindow.console;
	mw = unsafeWindow.mw;
}
 
$(commentsInLocalTime);
 
var language;
function commentsInLocalTime() {
	/*
	Language
 
	LOCALIZING THIS SCRIPT
	To localize this script, change the terms below, to the RIGHT 
	of the colons, to the correct term used in that language.
 
	For example, in the French language,
 
	'Today'		: 	'Today',
 
	would be

	'Today'		: 	'Aujourd’hui',
	*/
	language = {
		// relative terms
		'Today'		: 	'Today',
		'Yesterday'	: 	'Yesterday',
		'Tomorrow'	: 	'Tomorrow',
 
		'last'		: 	'last',
		'this'		: 	'this',
 
		// days of the week
		'Sunday'	: 	'Sunday',
		'Monday'	: 	'Monday',
		'Tuesday'	: 	'Tuesday',
		'Wednesday'	: 	'Wednesday',
		'Thursday'	: 	'Thursday',
		'Friday'	: 	'Friday',
		'Saturday'	: 	'Saturday',
 
		// months of the year
		'January'	: 	'January',
		'February'	: 	'February',
		'March'		: 	'March',
		'April'		: 	'April',
		'May'		: 	'May',
		'June'		: 	'June',
		'July'		: 	'July',
		'August'	: 	'August',
		'September'	: 	'September',
		'October'	: 	'October',
		'November'	: 	'November',
		'December'	: 	'December',
 
		// difference words
		'ago'		: 	'ago',
		'from now'	: 	'from now',
 
		// date phrases
		'year'		: 	'year',
		'years'		: 	'years',
		'month'		: 	'month',
		'months'	: 	'months',
		'day'		: 	'day',
		'days'		: 	'days'
	};
 
	/*
		Settings
	*/
	if (typeof(LocalComments) == 'undefined') LocalComments = {};
	if (typeof(LocalComments.dateDifference) == 'undefined') LocalComments.dateDifference = true;
	if (typeof(LocalComments.dropDays) == 'undefined') LocalComments.dropDays = 0;
	if (typeof(LocalComments.dropMonths) == 'undefined') LocalComments.dropMonths = 0;
	if (typeof(LocalComments.dateFormat) == 'undefined') {
		// Deprecated: LocalizeConfig
		if (typeof(LocalizeConfig) != 'undefined' && typeof(LocalizeConfig.dateFormat) != 'undefined' && LocalizeConfig.dateFormat != '') LocalComments.dateFormat = LocalizeConfig.dateFormat;
		else LocalComments.dateFormat = 'dmy';
	}
	if (typeof(LocalComments.dayOfWeek) == 'undefined') LocalComments.dayOfWeek = true;
	if (typeof(LocalComments.timeFirst) == 'undefined') LocalComments.timeFirst = true;
	if (typeof(LocalComments.twentyFourHours) == 'undefined') LocalComments.twentyFourHours = false;
	/*
		End Settings
	*/
 
	if ('wgCanonicalNamespace' == '' || 'wgCanonicalNamespace' == 'MediaWiki' || 'wgCanonicalNamespace' == 'Special' || 'wgAction' == 'history') return false;
	var skin2 = (skin == 'monobook') ? 'bodyContent' : 'WikiaArticle';
	replaceText($('#' + skin2), /(\d\d):(\d\d), ([A-Z][a-z]+) (\d{1,2}), (\d{4}) \(UTC\)/);
}
 
function addLeadingZero(number) {
	if (number < 10) number = '0' + number;
	return number;
}
 
function adjustTime(originalTimestamp, search) {
	var time = originalTimestamp.match(search);
	var oldHour = time[1], oldMinute = time[2], oldDay = time[4], oldMonth = time[3], oldYear = time[5];
 
	var today = new Date(), yesterday = new Date(), tomorrow = new Date();
	yesterday.setDate(yesterday.getDate() - 1);
	tomorrow.setDate(tomorrow.getDate() + 1);
 
	// set the date entered
	var time = new Date();
	time.setUTCFullYear(oldYear, convertMonthToNumber(oldMonth), oldDay);
	time.setUTCHours(oldHour);
	time.setUTCMinutes(oldMinute);
 
	// determine the time offset
	var utcOffset = -1 * time.getTimezoneOffset() / 60;
	if (utcOffset >= 0) utcOffset = '+' + utcOffset;
	else utcOffset = '−' + Math.abs(utcOffset);
 
	// set the date bits to output
	var year = time.getFullYear();
	var month = addLeadingZero(time.getMonth() + 1);
	var day = time.getDate();
	var hour = parseInt(time.getHours());
	var minute = addLeadingZero(time.getMinutes());
 
	// output am or pm depending on the date
	var ampm = '';
	if (LocalComments.twentyFourHours) hour = addLeadingZero(hour);
	else {
		ampm = ' am';
		if (hour > 11) ampm = ' pm';
		if (hour > 12) hour -= 12;
		if (hour == '00') hour = 12;
	}
 
	// return 'today' or 'yesterday' if that is the case
	if (year == today.getFullYear() && month == addLeadingZero(today.getMonth() + 1) && day == today.getDate()) var date = language['Today'];
	else if (year == yesterday.getFullYear() && month == addLeadingZero(yesterday.getMonth() + 1) && day == yesterday.getDate()) var date = language['Yesterday'];
	else if (year == tomorrow.getFullYear() && month == addLeadingZero(tomorrow.getMonth() + 1) && day == tomorrow.getDate()) var date = language['Tomorrow'];
	else {
		// calculate day of week
		var dayNames = new Array(language['Sunday'], language['Monday'], language['Tuesday'], language['Wednesday'], language['Thursday'], language['Friday'], language['Saturday']);
		var dayOfTheWeek = dayNames[time.getDay()];
 
		var descriptiveDifference = '';
		var last = '';
 
		if (LocalComments.dateDifference) {
			// calculate time difference from today
			var millisecondsAgo = today.getTime() - time.getTime();
			var daysAgo = Math.abs(Math.round(millisecondsAgo / 1000 / 60 / 60 / 24));
 
			var differenceWord = '', last = '';
			if (millisecondsAgo >= 0) {
				differenceWord = language['ago'];
				if (daysAgo <= 7) last = language['last'] + ' ';
			}
			else {
				differenceWord = language['from now'];
				if (daysAgo <= 7) last = language['this'] + ' ';
			}
 
			// This method of computing the years & months is not exact.
			// However, it's better than the previous method that used
			// 1 January + delta days. That was usually quite off because
			// it mapped the second delta month to February, which has only 28 days.
			// This method is usually not more than one day off.
 
			var monthsAgo = Math.floor(daysAgo / 365 * 12);		// close enough
			var totalMonthsAgo = monthsAgo;
			var yearsAgo = Math.floor(monthsAgo / 12);
 
			if (monthsAgo < LocalComments.dropMonths) yearsAgo = 0;
			else if (LocalComments.dropMonths > 0) monthsAgo = 0;
			else monthsAgo = monthsAgo - yearsAgo * 12;
 
			if (daysAgo < LocalComments.dropDays) {
				monthsAgo = 0;
				yearsAgo = 0;
			}
			else if (LocalComments.dropDays > 0) daysAgo = 0;
			else daysAgo = daysAgo - Math.floor(totalMonthsAgo * 365 / 12);
 
			var descriptiveParts = [];
			if (yearsAgo > 0) {
				var fmtYears = yearsAgo + ' ' + pluralize(language['year'], yearsAgo, language['years']);
				descriptiveParts.push(fmtYears);
			}
			if (monthsAgo > 0) {
				var fmtMonths = monthsAgo + ' ' + pluralize(language['month'], monthsAgo, language['months']);
				descriptiveParts.push(fmtMonths);
			}
			if (daysAgo > 0) {
				var fmtDays = daysAgo + ' ' + pluralize(language['day'], daysAgo, language['days']);
				descriptiveParts.push(fmtDays);
			}
 
			descriptiveDifference = ' (' + descriptiveParts.join(', ') + ' ' + differenceWord + ')';
		}
 
		// format the date according to user preferences
		var formattedDate = '', monthName = convertNumberToMonth(time.getMonth());
 
		switch (LocalComments.dateFormat.toLowerCase()) {
			case 'dmy':
				formattedDate = day + ' ' + monthName + ' ' + year;
				break;
			case 'mdy':
				formattedDate = monthName + ' ' + day + ', ' + year;
				break;
			default:
				formattedDate = year + '-' + month + '-' + addLeadingZero(day);
		}
 
		var formattedDayOfTheWeek = '';
		if (LocalComments.dayOfWeek) formattedDayOfTheWeek = ', ' + last + dayOfTheWeek;
		var date = formattedDate + formattedDayOfTheWeek + descriptiveDifference;
	}
 
	var finalTime = hour + ':' + minute + ampm;
	if (LocalComments.timeFirst) var returnDate = finalTime + ', ' + date + ' (UTC' + utcOffset + ')';
	else var returnDate = date + ', ' + finalTime + ' (UTC' + utcOffset + ')';
 
	return [returnDate, time];
}
 
function convertMonthToNumber(month) {
   var output = new Date(month + ' 1, 2001');
   return output.getMonth();
}
 
function convertNumberToMonth(number) {
	var month = new Array(language['January'], language['February'], language['March'], language['April'], language['May'], language['June'], language['July'], language['August'], language['September'], language['October'], language['November'], language['December']);
	return month[number];
}
 
function pluralize(term, count, plural) {
	if (plural == null) plural = term + 's';
	return (count == 1 ? term : plural);
}
 
function replaceText(node, search) {
	if (!node.length) return false;
	if (node[0].nodeType == 3) {
		var value = node[0].nodeValue;
		var matches = value.match(search);
 
		if (matches != null) {
			for (match = 0; match < matches.length; match++) {
				if (afterMatch != null && length != null) var position = afterMatch.search(search) + beforeMatch.length + length;
				else var position = value.search(search);
 
				var length = matches[match].toString().length;
				var beforeMatch = value.substring(0, position);
				var afterMatch = value.substring(position + length);
				var timeArray = adjustTime(matches[match].toString(), search);
 
				var span = $('<span class="localcomments" style="font-size: 95%" timestamp="' + timeArray[1].getTime() + '" title="' + matches[match] + '">' + timeArray[0] + '</span>');
 
				node.replaceWith(span);
				span.before($('<span class="before-localcomments"></span>').text(beforeMatch));
				span.after($('<span class="after-localcomments"></span>').text(afterMatch));
 
				break;
			}
		}
	}
	else {
		var children = [];
		var child = node.contents().eq(0);
 
		while (child.length) {
			children.push(child);
			child = $(child[0].nextSibling);
		}
 
		for (var child = 0; child < children.length; child++) {
			replaceText(children[child], search);
		}
	}
}

// END Displays Comments in Local Time

// </source>