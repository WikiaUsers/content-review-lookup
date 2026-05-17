/* Any JavaScript here will be loaded for all users on every page load. */
console.log("Javascript loaded");

/* Start CountUp Timer */
mw.hook("wikipage.content").add(function () {

	function updateCountdowns() {
		const nodes = document.querySelectorAll(".countdown");
		if (!nodes.length) return;

		const now = Math.floor(Date.now() / 1000);

		nodes.forEach(el => {
			const target = parseInt(el.dataset.target, 10);
			if (!target) return;

			let remaining = target - now;
			if (remaining < 0) remaining = 0;

			const days = Math.floor(remaining / 86400);
			const hours = Math.floor((remaining % 86400) / 3600);
			const mins = Math.floor((remaining % 3600) / 60);
			const secs = remaining % 60;

			if (days > 0) {
				el.textContent = `${days} ${days === 1 ? "Day" : "Days"}, ${hours} ${hours === 1 ? "Hour" : "Hours"}`;
			} else if (hours > 0) {
				el.textContent = `${hours} ${hours === 1 ? "Hour" : "Hours"}, ${mins} ${mins === 1 ? "Minute" : "Minutes"}`;
			} else if (mins > 0) {
				el.textContent = `${mins} ${mins === 1 ? "Minute" : "Minutes"}, ${secs} ${secs === 1 ? "Second" : "Seconds"}`;
			} else {
				el.textContent = `${secs} ${secs === 1 ? "Second" : "Seconds"}`;
			}
		});
	}

	function tick() {
		updateCountdowns();

		const now = Math.floor(Date.now() / 1000);
		const nodes = document.querySelectorAll(".countdown");

		let nextDelay = 60 * 60 * 1000;

		nodes.forEach(el => {
			const target = parseInt(el.dataset.target, 10);
			if (!target) return;

			const remaining = target - now;

			if (remaining <= 3600) {
				nextDelay = 1000;
			} else if (remaining <= 6 * 3600) {
				nextDelay = Math.min(nextDelay, 60 * 1000);
			} else if (remaining <= 24 * 3600) {
				nextDelay = Math.min(nextDelay, 30 * 60 * 1000);
			}
		});

		setTimeout(tick, nextDelay);
	}

	tick();
});