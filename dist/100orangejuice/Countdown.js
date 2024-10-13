// https://vincoding.com/weekly-repeating-countdown-timer-javascript/
// ToDo: Remove date variable by fixing second calculation
(function(mw) {
	'use strict';

	var countdowns = [];

	function getSeconds(index) {
		var curday,
			cd = countdowns[index],
			ele = cd[2],
			tmpDate = new Date(),
			nowDate = new Date(
				tmpDate.getUTCFullYear(),
				tmpDate.getUTCMonth(),
				tmpDate.getUTCDate(),
				tmpDate.getUTCHours(),
				tmpDate.getUTCMinutes(),
				tmpDate.getUTCSeconds()
			),
			dy = Number(ele.getAttribute('data-day')) || tmpDate.getUTCDay(), // Sunday through Saturday, 0 to 6
			countertime = new Date(
				tmpDate.getUTCFullYear(),
				tmpDate.getUTCMonth(),
				tmpDate.getUTCDate(),
				(Number(ele.getAttribute('data-hour')) || tmpDate.getUTCHours()),
				(Number(ele.getAttribute('data-minute')) || tmpDate.getUTCMinutes()),
				tmpDate.getUTCSeconds()
			),
			curtime = nowDate.getTime(), //current time
			atime = countertime.getTime(), //countdown time
			diff = parseInt((atime - curtime) / 1000);
		if (diff > 0) { curday = dy - tmpDate.getUTCDay(); }
		else { curday = dy - tmpDate.getUTCDay() -1; } //after countdown time
		if (curday < 0) curday += (ele.getAttribute('data-day') ? 7 : 1 ); //already after countdown time, switch to next week
		if (diff <= 0) diff += (86400 * 7);

		cd[0] = diff;
		cd[1] = curday;
	}

	function tick() {
		countdowns.forEach(function(cd, index) {
			var secs = cd[0];

			if (secs > 0) {
				cd[0]--;
			} else {
				getSeconds(index);
				secs = cd[0];
			}
			var days = cd[1];

			//var days = Math.floor(secs / 86400);
			secs %= 86400;
			var hours = Math.floor(secs / 3600);
			secs %= 3600;
			var mins = Math.floor(secs / 60);
			secs %= 60;

			cd[2].textContent = (days === 0 ? '' : days + 'd ') +
				((days + hours) === 0 ? '' : hours + 'h ') +
				mins + 'm';
		});
	}

	tick();
	setInterval(tick, 60000); // Update every minute

	mw.hook('wikipage.content').add(function($content) {
		$content.find('.customCountdown:not(.loaded)').each(function(_, ele) {
			ele.classList.add('loaded');
			countdowns.push([0, 0, ele]); // seconds, days, element
		});
	});
})(window.mediaWiki);