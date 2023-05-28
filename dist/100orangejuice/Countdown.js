// https://vincoding.com/weekly-repeating-countdown-timer-javascript/
;(function(mw) {
	'use strict';

	var curday = [];
	var secTime = [];
	var ticker = [];
	var countdown;

	function getSeconds(cd) {
		var tmpDate = new Date();
		var nowDate = new Date(
			tmpDate.getUTCFullYear(),
			tmpDate.getUTCMonth(),
			tmpDate.getUTCDate(),
			tmpDate.getUTCHours(),
			tmpDate.getUTCMinutes(),
			tmpDate.getUTCSeconds()
		);
		var dy = Number(countdown[cd].dataset.day) || tmpDate.getUTCDay() ; //Sunday through Saturday, 0 to 6

		var countertime = new Date(
			tmpDate.getUTCFullYear(),
			tmpDate.getUTCMonth(),
			tmpDate.getUTCDate(),
			(Number(countdown[cd].dataset.hour) || tmpDate.getUTCHours()),
			(Number(countdown[cd].dataset.minute) || tmpDate.getUTCMinutes()),
			tmpDate.getUTCSeconds()
		);

		var curtime = nowDate.getTime(); //current time
		var atime = countertime.getTime(); //countdown time
		var diff = parseInt((atime - curtime)/1000);
		if (diff > 0) { curday[cd] = dy - tmpDate.getUTCDay(); }
		else { curday[cd] = dy - tmpDate.getUTCDay() -1; } //after countdown time
		if (curday[cd] < 0) { curday[cd] += (countdown[cd].dataset.day ? 7 : 1 ); } //already after countdown time, switch to next week
		if (diff <= 0) { diff += (86400 * 7); }
		startTimer (cd, diff);
	}

	function startTimer(cd, secs) {
		secTime[cd] = parseInt(secs);
		ticker[cd] = setInterval(function() {tick(cd);},1000);
		tick(cd); //initial count display
	}

	function tick(cd) {
		var secs = secTime[cd];
		if (secs>0) {
			secTime[cd]--;
		}
		else {
			clearInterval(ticker[cd]);
			getSeconds(cd); //start over
		}

		var days = Math.floor(secs/86400);
		secs %= 86400;
		var hours= Math.floor(secs/3600);
		secs %= 3600;
		var mins = Math.floor(secs/60);
		secs %= 60;
		//update the time display

		countdown[cd].textContent = (curday[cd] === 0 ? '' : curday[cd] + 'd ') +
			((curday[cd] + hours) === 0 ? '' : hours + 'h ') +
			mins + 'm';
	}

	// Execute script after page is loaded
	mw.hook('wikipage.content').add(function() {
		countdown = document.getElementsByClassName('customCountdown');
		if (!countdown.length) return;
		for (var i=0; i<countdown.length; i++) {
			getSeconds(i);
		}
	});
})(window.mediaWiki);