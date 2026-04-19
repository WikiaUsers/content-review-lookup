/* Any JavaScript here will be loaded for all users on every page load. */

/* Start CountUp Timer */
(function () {

	let nodes = [];
	let timerId = null;
	let observer = null;

	function refreshNodes(root) {
		const scope = root || document;
		nodes = Array.from(scope.querySelectorAll(".countdown"));

		nodes.forEach(el => {
			el.setAttribute("aria-live", "polite");
		});
	}

	function updateCountups() {
		if (!nodes.length) return;

		const now = Math.floor(Date.now() / 1000);

		nodes.forEach(el => {
			const target = Number(el.dataset.target);
			if (!Number.isFinite(target)) return;

			let elapsed = now - target;

			if (elapsed <= 0) {
				el.textContent = "0 Seconds";
				return;
			}

			const days = Math.floor(elapsed / 86400);
			const hours = Math.floor((elapsed % 86400) / 3600);
			const mins = Math.floor((elapsed % 3600) / 60);
			const secs = elapsed % 60;

			if (days > 0) {
				el.textContent =
					`${days} ${days === 1 ? "Day" : "Days"}, ` +
					`${hours} ${hours === 1 ? "Hour" : "Hours"} ago`;
			} else if (hours > 0) {
				el.textContent =
					`${hours} ${hours === 1 ? "Hour" : "Hours"}, ` +
					`${mins} ${mins === 1 ? "Minute" : "Minutes"} ago`;
			} else if (mins > 0) {
				el.textContent =
					`${mins} ${mins === 1 ? "Minute" : "Minutes"}, ` +
					`${secs} ${secs === 1 ? "Second" : "Seconds"} ago`;
			} else {
				el.textContent =
					`${secs} ${secs === 1 ? "Second" : "Seconds"} ago`;
			}
		});
	}

	function computeNextDelay() {
		const now = Math.floor(Date.now() / 1000);
		let nextDelay = 60 * 60 * 1000; // 1 hour default

		nodes.forEach(el => {
			const target = Number(el.dataset.target);
			if (!Number.isFinite(target)) return;

			const elapsed = now - target;
			if (elapsed <= 0) return;

			if (elapsed <= 3600) {
				nextDelay = 1000;
			} else if (elapsed <= 6 * 3600) {
				nextDelay = Math.min(nextDelay, 60 * 1000);
			} else {
				nextDelay = Math.min(nextDelay, 30 * 60 * 1000);
			}
		});

		return nextDelay;
	}

	function tick() {
		updateCountups();
		clearTimeout(timerId);
		timerId = setTimeout(tick, computeNextDelay());
	}

	function start() {
		clearTimeout(timerId);
		timerId = null;

		refreshNodes(document);

		if (nodes.length) {
			tick();
		}
	}

	function observeChanges() {
		if (observer) return;

		observer = new MutationObserver(() => {
			refreshNodes(document);
			if (!timerId && nodes.length) {
				tick();
			}
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true
		});
	}

	function init() {
		start();
		observeChanges();
	}

	// MediaWiki hooks
	if (window.mw && mw.hook) {
		mw.hook("wikipage.content").add(init);
	} else {
		document.addEventListener("DOMContentLoaded", init);
	}

})();