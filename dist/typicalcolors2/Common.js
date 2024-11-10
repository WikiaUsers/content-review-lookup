/* Any JavaScript here will be loaded for all users on every page load. */
// Countdown for daily shop, taken from Entry Point wiki
$(function() {
	var countdown = document.getElementsByClassName("daily-countdown");
	var prev;
	if (countdown) {
		// Main interval
		setInterval(function() {
			var now = new Date();
			var time = Math.round(Date.now() / 1000);
			if (time != prev) {
				prev = time;
				// Check daylight saving time in EST (correct until 2026)
				var DST = true;
				var year = now.getUTCFullYear();
				var dstStart = new Date("March 1, "+year+" 02:00:00 EST");
				var dstEnd = new Date("November 1, "+year+" 02:00:00 EST");
				dstStart.setDate(dstStart.getDate() + (14 - dstStart.getDay()));
				dstEnd.setDate(dstEnd.getDate() + (7 - dstEnd.getDay()));
				if (now >= dstStart && now <= dstEnd) {
					DST = true;
				}
				// Get remaining time until midnight
				var wantedTime = new Date(now);
	            wantedTime.setUTCHours(DST?5:6, 0, 0, 0);
				if (wantedTime < now) {
					wantedTime.setDate(wantedTime.getDate() + 1);
				}
				var delta = Math.round((wantedTime - now) / 1000);
				var hours = Math.floor(delta / 3600) % 24;
				delta -= hours * 3600;
				var minutes = Math.floor(delta / 60) % 60;
				delta -= minutes * 60;
				var seconds = delta;
				// Insert into page
				$(countdown).text(hours.toString().padStart(2,0)+":"+minutes.toString().padStart(2,0)+":"+seconds.toString().padStart(2,0));
			}
		}, 500);
	}
});