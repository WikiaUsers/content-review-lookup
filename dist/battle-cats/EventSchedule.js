/**
 * Script for features involving event schedules and clocks
 */

$(document).ready(function() { // on document ready
	// Run script if div with id current-events or class event-clock exists
	var currentEventsElement = document.getElementById('current-events');
	var eventClockElement = document.getElementsByClassName('event-clock');
	if (currentEventsElement != null) runCurrentEvents();
	if (eventClockElement != null) runEventClock();

	if (!currentEventsElement && !eventClockElement) {
		return;
	}

	// constants used for time calculations
	var SECOND_LENGTH_MS = 1000;
	var MINUTE_LENGTH_MS = 60 * SECOND_LENGTH_MS;
	var HOUR_LENGTH_MS = 60 * MINUTE_LENGTH_MS;
	var DAY_LENGTH_MS = 24 * HOUR_LENGTH_MS;
	var WEEK_LENGTH_MS = 7 * DAY_LENGTH_MS;
	// determines how early events are shown
	var MARGIN_PRE_MS = 3 * DAY_LENGTH_MS;

	/**
	 * Runs all the code necessary to display the current events template content
	 * @return void
	 */
	function runCurrentEvents() {
		var params = {
			action: 'query',
			prop: 'revisions',
			titles: 'Template:CurrentEvents/EventImages.json',
			rvprop: 'content',
			rvslots: 'main',
			formatversion: '2',
			format: 'json'
		};

		api = new mw.Api();
		api.get(params).done(function (data) {
			var content = data.query.pages[0].revisions[0].slots.main.content;
			var images = new Map(Object.entries(JSON.parse(content)));
			var gachaData = images.get('Gacha Schedule');
			var eventData = images.get('Event Schedule');
			var recurData = images.get('Recurring Schedule');
			displayEvents(gachaData, eventData, recurData, images);
		});
	}

	/**
	 * Updates the display of gacha banners and event images
	 * @param {Array[Array[String]]} gachaData 2D array of CSV data read for gacha events
	 * @param {Array[Array[String]]} eventData 2D array of CSV data read for special events
	 * @param {Array[Array[String]]} recurData 2D array of CSV data read for recurring events
	 * @param {Map} images Map for retrieving correct images for the events
	 * @return void
	 */
	function displayEvents(gachaData, eventData, recurData, images) {
		var now = new Date();
		var startTime, endTime;
		var row;
		// gacha sections
		$('div.current-events-gacha').empty();
		for (var i = 0; i < gachaData.length; i++) {
			row = gachaData[i];
			if (row.length > 1) {
				startTime = row.length >= 4 ? row[3] : '11:00';
				endTime = row.length >= 5 ? row[4] : '11:00';
				event = createEvent(row[0], getTime(row[1], startTime), getTime(row[2], endTime), images, true, true);
				$('div.current-events-gacha').append(event);
			}
		}
		// event section
		$('div.current-events-event').empty();
		var addedEvents = [];
		var eventName;
		for (var j = 0; j < eventData.length; j++) {
			row = eventData[j];
			eventName = row[0];
			if (row.length > 1 && !addedEvents.includes(eventName)) {
				startTime = row.length >= 4 ? row[3] : '11:00';
				endTime = row.length >= 5 ? row[4] : '11:00';
				event = createEvent(eventName, getTime(row[1], startTime), getTime(row[2], endTime), images, true, true);
				addedEvents.push(eventName);
				$('div.current-events-event').append(event);
			}
		}
		// recurring section
		$('div.current-events-recurring-current').empty();
		$('div.current-events-recurring-upcoming').empty();
		var type, startData, endData;
		var year = now.getYear() + 1900;
		var month = now.getMonth();
		var wday = now.getDay() + 1;
		var day = now.getDate();
		for (var k = 0; k < recurData.length; k++) {
			row = recurData[k];
			if (row.length > 1) {
				type = row[1];
				startData = toArray(row[2]);
				endData = toArray(row[3]);
				if (type == 'week') {
					var startAfter = (startData[0] - wday) % 7;
					startTime = toUnix(year, month, day, startData[1], startData[2]) + startAfter * DAY_LENGTH_MS;
				} else if (type == 'year') {
					startTime = toUnix(year, startData[0] - 1, startData[1], startData[2], startData[3]);
				} else if (type == 'month') {
					startTime = toUnix(year, month, startData[0], startData[1], startData[2]);
				}
				endTime = startTime + timeLength(endData[0], endData[1], endData[2]);
				event = createEvent(row[0], startTime, endTime, images, false, true);
				if (now >= startTime && now <= endTime) {
					$('div.current-events-recurring-current').append(event);
				} else if (now >= startTime - DAY_LENGTH_MS){
					$('div.current-events-recurring-upcoming').append(event);
				}
			}
		}

		// call function again when the minute changes
		// 10 ms delay to make sure updating is done right after the minute changes instead of right before
		setTimeout(function () { displayEvents(gachaData, eventData, recurData, images); }, MINUTE_LENGTH_MS - (1000 * now.getSeconds() + now.getMilliseconds()) + 10);
	}

	/**
	 * Runs all the code necessary to display event clocks
	 */
	function runEventClock() {
		// params for reading json files
		var scheduleParams = {
			action: 'query',
			prop: 'revisions',
			titles: 'Template:EventClock/recurring.json',
			rvprop: 'content',
			rvslots: 'main',
			formatversion: '2',
			format: 'json'
		};
		var imageParams = {
			action: 'query',
			prop: 'revisions',
			titles: 'Template:CurrentEvents/EventImages.json',
			rvprop: 'content',
			rvslots: 'main',
			formatversion: '2',
			format: 'json'
		};

		api = new mw.Api();
		api.get(scheduleParams).done(function (data) {
			var content = data.query.pages[0].revisions[0].slots.main.content;
			var schedule = new Map(Object.entries(JSON.parse(content)));
			api.get(imageParams).done(function (data) {
				content = data.query.pages[0].revisions[0].slots.main.content;
				var images = new Map(Object.entries(JSON.parse(content)));
				displayClocks(schedule, images);
			});
		});
	}

	/**
	 * Calls functions to update all EventClocks
	 * @return void
	 */
	function displayClocks(schedule, images) {
		var now = new Date();
		$('.event-clock').each( function () {
			// get data
			var name = $(this).data('event-name');
			var data = schedule.get(name);
			var upcoming = nextTimes(data);

			// replace with updated clock
			$(this).empty();
			$(this).append(createEvent(name, upcoming[0], upcoming[1], images, false, false));
		});

		// call function again when the minute changes
		// 10 ms delay to ensure updating is done right after the minute changes instead of right before
		setTimeout(function () { displayClocks(schedule, images); }, MINUTE_LENGTH_MS - (1000 * now.getSeconds() + now.getMilliseconds()) + 10);
	}

	/**
	 * Returns the start and end times of the next occurent of the event, gives current appearance times if ongoing
	 * @param {Array[String]} data Schedule data from recurring.json
	 * @return {Array[Number]} An array containing the start and end times as unix times
	 */
	function nextTimes(dataArray) {
		var now = new Date();
		var nowTime = now.getTime();
		var day = now.getDate();
		var month = now.getMonth();
		var year = now.getFullYear();
		var times = [];
		var startTime, endTime;

		for (var i = 0; i < dataArray.length; i++) {
			data = dataArray[i];
			var type = data[0];
			var start = toArray(data[1]);
			var length = toArray(data[2]);
			var end = getEnd(start, length);
			var eventStart, eventEnd;

			if (type == 'week') {
				var wnow = weekTime(now.getDay() + 1, now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
				eventStart = weekTime(start[0], start[1], start[2], 0, 0);
				eventEnd = eventStart + weekTime(length[0], length[1], length[2], 0, 0);
				startTime = nowTime + eventStart - wnow;
				endTime = nowTime + eventEnd - wnow;
				while (endTime < nowTime) {
					startTime += WEEK_LENGTH_MS;
					endTime += WEEK_LENGTH_MS;
				}
				times.push([startTime, endTime]);
			} else if (type == 'month') {
				eventStart = toUnix(year, month, start[0], start[1], start[2]);
				eventEnd = toUnix(year, month, end[0], end[1], end[2]);
				if (nowTime > eventEnd) {
					eventStart = nextMonth(eventStart);
					eventEnd = nextMonth(eventEnd);
				}
				times.push([eventStart, eventEnd]);
			} else if (type == 'year') {
				eventStart = toUnix(year, start[0] - 1, start[1], start[2], start[3]);
				eventEnd = toUnix(year, end[0] - 1, end[1], end[2], end[3]);
				if (nowTime > eventEnd) {
					eventStart = nextYear(eventStart);
					eventEnd = nextYear(eventEnd);
				}
				times.push([eventStart, eventEnd]);
			}
		}

		// use upcoming start and end time set that is closest to current time
		var min = [Number.MAX_VALUE, Number.MAX_VALUE];
		for (var j = 0; j < times.length; j++) {
			var ref = times[j][1];
			if (ref > now && ref < min[1]) min = times[j];
		}
		return min;
	}

	/**
	 * Returns the html for a single event given its name and necessary data
	 * @param {String} name The full name for the event
	 * @param {Number} startTime Number of milliseconds since epoch until the start time
	 * @param {Number} endTime Number of milliseconds since epoch until the end time
	 * @param {Map} images Map for retrieving correct images for the events
	 * @param {boolean} withName If the event should display the event name above the image
	 * @param {boolean} hide If the event should be hidden after ending or before start margin
	 * @return {String} html for event name, image, and clock
	 */
	function createEvent(name, startTime, endTime, images, withName, hide) {
		var now = Date.now();
		if (hide) {
			if (now >= endTime || now < startTime - MARGIN_PRE_MS) return "";
		}
		var image = images.get(name);
		if (image === undefined) {
			msg = name + " is not recognised as a valid event name!";
			alert(msg);
			return '<strong class="error">' + msg + '</strong>';
		}
		if (name.includes('(R)') || name.includes('(N)')) name = name.substring(0, name.length - 4);
		var displayName = withName ? '<span style="font-weight: bold">' + name + '</span><br>' : "";
		var clock, timer;
		var difference;
		var days, hours, minutes;
		if (now < startTime) {
			difference = startTime - now;
			if (difference >= DAY_LENGTH_MS) {
				days = Math.floor(difference / DAY_LENGTH_MS);
				clock = days + (days == 1 ? ' day' : ' days');
			} else {
				hours = Math.floor(difference / HOUR_LENGTH_MS);
				minutes = Math.floor((difference - hours * HOUR_LENGTH_MS) / MINUTE_LENGTH_MS);
				clock = leadingZeroes(hours, 2) + ':' + leadingZeroes(minutes, 2);
			}
			timer = displayName + image + '<br><span style="font-weight: bold; font-size: 12px; text-align: center; color: #30B858;">Starts in ' + clock + '</span>';
		} else {
			difference = endTime - now;
			if (difference >= DAY_LENGTH_MS) {
				days = Math.floor(difference / DAY_LENGTH_MS);
				clock = days + (days == 1 ? ' day' : ' days');
			} else {
				hours = Math.floor(difference / HOUR_LENGTH_MS);
				minutes = Math.floor((difference - hours * HOUR_LENGTH_MS) / MINUTE_LENGTH_MS);
				clock = leadingZeroes(hours, 2) + ':' + leadingZeroes(minutes, 2);
			}
			timer = displayName + image + '<br><span style="font-weight: bold; font-size: 12px; text-align: center; color: #637EDF;">Ends in ' + clock + '</span>';
		}
		return '<div style="display: inline-block; position: relative; margin: 5px; line-height: 20px; padding: 0px; text-align: center;">' + timer + '</div>';
	}

	/**
	 * Determines the number of milliseconds since epoch until the specified date and time
	 * @param {String} date Representation of date in the form YYYY-MM-DD
	 * @param {String} time Representation of time within the day in the form HH:MM
	 * @return {Number} Number of milliseconds since epoch until the given time
	 */
	function getTime(date, time) {
		var values = date.split('-');
		var hour = time.split(':')[0];
		var minute = time.split(':')[1];
		return toUnix(values[0], values[1] - 1, values[2], hour, minute, 0, 0);
	}

	/**
	 * Determines the number of milliseconds since epoch until the time at the given values
	 * @param {Number} year Year in the Gregorian calendar
	 * @param {Number} month Month of the year
	 * @param {Number} day Day of the month
	 * @param {Number} hour Hour in 24 hour time
	 * @param {Number} minute Minutes of the time
	 * @return {Number} Number of milliseconds since epoch until the given time
	 */
	function toUnix(year, month, day, hour, minute) {
		var object = new Date(year, month, day, hour, minute, 0, 0);
		return object.getTime();
	}

	/**
	 * Converts a number of days, hours, and minutes into milliseconds
	 * @param {Number} day Number of days
	 * @param {Number} hour Number of hours
	 * @param {Number} minute Number of minutes
	 * @return {Number} Number of milliseconds equivalent to total passed time
	 */
	function timeLength(day, hour, minute) {
		return day * DAY_LENGTH_MS + hour * HOUR_LENGTH_MS + minute * MINUTE_LENGTH_MS;
	}

	/**
	 * Separates given text by the characteer ":"
	 * @param {String} time The text to split
	 * @return {Array[String]} Split text
	 */
	function toArray(time) {
		return time.split(':');
	}

	/**
	 * Adds leading zeroes to the given number with the maximum digits specified
	 * @param {Number} num Number to pad
	 * @param {Number} digits The resulting number of digits
	 * @return {String} The padded number
	 */
	function leadingZeroes(num, digits) {
		return ("0000" + num).slice(-1 * digits);
	}

	/**
	 * Gives a time in milliseconds since 0:00 Sunday
	 * @param {Number} weekDay Value representing day of the week with Sunday as 0
	 * @param {Number} hours Hour in time
	 * @param {Number} minutes Minute in time
	 * @param {Number} seconds Second in time
	 * @param {Number} milliseconds Millisecond in time
	 * @return {Number} Number of milliseconds of given time since Sunday 0:00
	 */
	function weekTime(weekDay, hours, minutes, seconds, milliseconds) {
		return weekDay * DAY_LENGTH_MS + hours * HOUR_LENGTH_MS + minutes * MINUTE_LENGTH_MS + seconds * SECOND_LENGTH_MS + milliseconds;
	}

	/**
	 * Get an array for the end time of an event given arrays for its start and length
	 * @param {Array[Number]} start Data array for start time
	 * @param {Array[Number]} length Data array for length of event
	 * @return {Array[Number]} Data array for end time
	 */
	function getEnd(start, length) {
		var end = [];
		var startArray = start;
		var shift = 0; // for year data which has 4 values in start time
		if (startArray.length == 4) {
			shift = 1;
		}
		for (var i = 0; i < 3; i++) {
			end.push(Number(start[i + shift]) + Number(length[i]));
		}
		if (shift == 1) end.unshift(Number(start[0]));
		return end;
	}

	/**
	 * Get the time a month after the given time
	 * @param {Number} time Unix time for the initial time
	 * @return {Number} Unix time for a month later
	 */
	function nextMonth(time) {
		var date = new Date(time);
		if (date.getMonth() == 11) {
			date.setFullYear(date.getFullYear() + 1);
			date.setMonth(0);
		} else {
			date.setMonth(date.getMonth() + 1);
		}
		return date.getTime();
	}

	/**
	 * Get the time a year after the given time
	 * @param {Number} time Unix time for the initial time
	 * @return {Number} Unix time for a year later
	 */
	function nextYear(time) {
		var date = new Date(time);
		date.setFullYear(date.getFullYear() + 1);
		return date.getTime();
	}
});