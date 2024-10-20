// https://vincoding.com/weekly-repeating-countdown-timer-javascript/
(function(mw) {
	'use strict';

	var c = [];

	function getSeconds(i) {
		var curday,
			e = c[i][1],
			t = new Date(),
			nowDate = new Date(t.getTime() + t.getTimezoneOffset()*60000),
			dd = e.getAttribute('data-day'),
			day = Number(dd) || t.getUTCDay(), // Sunday through Saturday, 0 to 6
			newDate = new Date(
				t.getUTCFullYear(),
				t.getUTCMonth(),
				t.getUTCDate(),
				(Number(e.getAttribute('data-hour')) || t.getUTCHours()),
				(Number(e.getAttribute('data-minute')) || t.getUTCMinutes()),
				t.getUTCSeconds()
			),
			diff = parseInt((newDate.getTime() - nowDate.getTime()) / 1000);
		if (diff > 0) { curday = day - t.getUTCDay(); }
		else { curday = day - t.getUTCDay() -1; } //after countdown time
		if (curday < 0) curday += (dd ? 7 : 1 ); //already after countdown time, switch to next week
		if (diff <= 0) diff += 86400;

		return diff + (curday * 86400);
	}

	setInterval(function() {
		c.forEach(function(cd, i) {
			cd[0] = (cd[0] > 0) ? cd[0]-1 : getSeconds(i);
			var s = cd[0],
				d = Math.floor(s / 86400),
				h = Math.floor((s % 86400) / 3600),
				m = Math.floor((s % 3600) / 60);

			cd[1].textContent = (d === 0 ? '' : d + 'd ') +
				((d + h) === 0 ? '' : h + 'h ') +
				m + 'm';
		});
	}, 1000); // Update every second

	mw.hook('wikipage.content').add(function($content) {
		$content.find('.customCountdown:not(.loaded)').addClass('loaded').each(function(_, e) {
			c.push([0, e]); // seconds, element
		});
	});
})(window.mediaWiki);