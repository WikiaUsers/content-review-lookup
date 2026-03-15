/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:SandboxTab/code.js',
    ]
});
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
				var DST = false;
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
/**
 * Name:        Pseudo3D
 * Version:     v1.2
 * Author:		t7ru [[User:Gabonnie]]
 * Ported From: The Tower Defense Simulator Wiki
 * Ported By: [[User:Solaric_Eclipse]]
 * Description: Allow pseudo3d's spritesheets to be panned
 */
(() => {
	document.querySelectorAll('.pseudo-3d-viewport').forEach(viewport => {
		const sprite = viewport.querySelector('img');
		if (!sprite) return;
		
		const frameAmount = parseInt(viewport.dataset.frameAmount) || 24;
		const startFrame = parseInt(viewport.dataset.frameStart) || 0;
		
		viewport._currentFrame = startFrame;
		viewport._frameAmount = frameAmount;
		sprite.style.transform = `translateX(-${startFrame * 100 / frameAmount}%)`;
	});

	const drag = (e, touch) => {
		const viewport = e.target.closest('.pseudo-3d-viewport');
		const sprite = viewport ? viewport.querySelector('img') : null;
		if (!sprite) return;
		e.preventDefault();
		
		const startX = touch ? e.touches[0].pageX : e.pageX;
		const startFrame = viewport._currentFrame || 0;
		const frameAmount = viewport._frameAmount || 24;
		
		const move = ev => {
			const x = touch ? ev.touches[0].pageX : ev.pageX;
			let frame = (startFrame - Math.floor((x - startX) / 10)) % frameAmount;
			if (frame < 0) frame += frameAmount;
			viewport._currentFrame = frame;
			sprite.style.transform = `translateX(-${frame * 100 / frameAmount}%)`;
		};
		
		const up = () => {
			document.removeEventListener(touch ? 'touchmove' : 'mousemove', move);
			document.removeEventListener(touch ? 'touchend' : 'mouseup', up);
		};
		
		document.addEventListener(touch ? 'touchmove' : 'mousemove', move);
		document.addEventListener(touch ? 'touchend' : 'mouseup', up);
	};

	document.addEventListener('mousedown', e => drag(e));
	document.addEventListener('touchstart', e => drag(e, 1));
})();