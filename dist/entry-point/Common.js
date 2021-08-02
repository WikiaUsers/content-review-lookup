// set dev:LockOldComments.js limit to 1 month
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 30;

let countdown = document.getElementsByClassName('daily-countdown');
let prev;
if (countdown) {
	setInterval(function() {
		let now = new Date();
		let time = Math.round(Date.now() / 1000);
		if (time != prev) {
			prev = time;
			// Check daylight saving time in EST (correct until 2026)
			let DST = false;
			let year = now.getUTCFullYear();
			let dstStart = new Date(`March 1, ${year} 02:00:00 EST`);
			let dstEnd = new Date(`November 1, ${year} 02:00:00 EST`);
			dstStart.setDate(dstStart.getDate() + (14 - dstStart.getDay()));
			dstEnd.setDate(dstEnd.getDate() + (7 - dstEnd.getDay()));
			if (now >= dstStart && now <= dstEnd) {
				DST = true;
			}
		}
	}, 500);
}