/* Module:Events — live countdown (companion script)
 * ---------------------------------------------------
 * The "Current & Upcoming Events" widget (Module:Events -> p.upcomingEvents) is rendered
 * server-side in Lua and then FROZEN by the MediaWiki/Fandom parser cache. That means its
 * "Starts in / ends in" values, progress bars and active-highlight show the state at the time
 * of the last page parse, not the real current time (e.g. an event that already started can
 * still read "Starts in 5h" for hours).
 *
 * This script recomputes those dynamic bits purely client-side from the absolute UTC epoch
 * stamped on every run as data-start / data-end, refreshing every 30 s. Layout, ordering and
 * Garage-Cleanup nesting stay server-side (they self-heal on the next reparse).
 *
 * Install: create this page as MediaWiki:Events.js and load it from MediaWiki:Common.js via
 *   importArticles({ type: 'script', articles: [ 'MediaWiki:Events.js' ] });
 *
 * Hooks expected in the HTML (emitted by Module:Events):
 *   .mmev-root                     widget container
 *   .mmev-run[data-start][data-end] one event run (epoch seconds, UTC)
 *     .mmev-cd-label               "Starts in" / "ends in" / "Ended"
 *     .mmev-cd-val                 the short value ("5h", "12d", ...)
 *     .mmev-progress               progress bar wrapper (display toggled)
 *       .mmev-fill                 the filled portion (width %)
 *       .tooltipTextWrapper        hover text ("63% elapsed · ends in 3 days")
 *   [data-mmev-seg]                a whole event segment (active highlight class swapped)
 */
(function () {
	'use strict';

	var DAY = 86400;
	var started = false;

	// Compact value for the narrow sidebar: "60d" / "12h" / "45m" / "<1m". Mirrors relShort() in Lua.
	function relShort(sec) {
		if (sec < 0) sec = 0;
		if (sec >= DAY) return Math.floor(sec / DAY) + 'd';
		if (sec >= 3600) return Math.floor(sec / 3600) + 'h';
		if (sec >= 60) return Math.floor(sec / 60) + 'm';
		return '<1m';
	}

	// Long phrasing for the progress tooltip ("in 3 days"). Mirrors relTime() in Lua.
	function relTime(sec) {
		if (sec <= 0) return 'now';
		if (sec >= 2 * DAY) return 'in ' + Math.floor(sec / DAY) + ' days';
		if (sec >= DAY) return 'in 1 day';
		if (sec >= 2 * 3600) return 'in ' + Math.floor(sec / 3600) + ' hours';
		if (sec >= 3600) return 'in 1 hour';
		if (sec >= 120) return 'in ' + Math.floor(sec / 60) + ' minutes';
		return 'in under a minute';
	}

	function tick() {
		// Date.now() is true Unix epoch ms; the Lua epochs are built from UTC civil dates, so both
		// refer to the same absolute instant — no timezone conversion needed.
		var now = Date.now() / 1000;

		var runs = document.querySelectorAll('.mmev-root .mmev-run');
		for (var i = 0; i < runs.length; i++) {
			var run = runs[i];
			var s = parseInt(run.getAttribute('data-start'), 10);
			var e = parseInt(run.getAttribute('data-end'), 10);
			if (isNaN(s) || isNaN(e)) continue;

			var label = run.querySelector('.mmev-cd-label');
			var val = run.querySelector('.mmev-cd-val');
			var prog = run.querySelector('.mmev-progress');
			var fill = prog && prog.querySelector('.mmev-fill');
			var tip = prog && prog.querySelector('.tooltipTextWrapper');

			if (now < s) {                       // upcoming
				run.style.display = '';
				run.setAttribute('data-mmev-state', 'up');
				if (label) label.textContent = 'Starts in';
				if (val) val.textContent = relShort(s - now);
				if (prog) prog.style.display = 'none';
			} else if (now <= e) {               // active
				run.style.display = '';
				run.setAttribute('data-mmev-state', 'active');
				if (label) label.textContent = 'ends in';
				if (val) val.textContent = relShort(e - now);
				if (prog) {
					prog.style.display = 'block';
					var span = e - s;
					var pct = span > 0 ? Math.round((now - s) / span * 100) : 100;
					if (pct < 0) pct = 0; else if (pct > 100) pct = 100;
					if (fill) fill.style.width = pct + '%';
					if (tip) tip.textContent = pct + '% elapsed · ends ' + relTime(e - now);
				}
			} else {                             // ended → drop from the live view
				run.style.display = 'none';
				run.setAttribute('data-mmev-state', 'ended');
				if (prog) prog.style.display = 'none';
			}
		}

		// Refresh each segment's active highlight, and hide a segment once all its runs have ended.
		var segs = document.querySelectorAll('.mmev-root [data-mmev-seg]');
		for (var k = 0; k < segs.length; k++) {
			var seg = segs[k];
			var segRuns = seg.querySelectorAll('.mmev-run');
			var anyActive = false, anyVisible = false;
			for (var r = 0; r < segRuns.length; r++) {
				var st = segRuns[r].getAttribute('data-mmev-state');
				if (st === 'active') anyActive = true;
				if (st !== 'ended') anyVisible = true;
			}
			seg.classList.toggle('mmev-seg-active', anyActive);
			seg.classList.toggle('mmev-seg', !anyActive);
			// Restore the original inline 'flex' (NOT '') — '' wipes display:flex and the segment
			// collapses to block, stacking the icon centered above the text.
			seg.style.display = anyVisible ? 'flex' : 'none';
		}
	}

	function start() {
		if (!document.querySelector('.mmev-root')) return;
		tick();
		if (!started) {
			started = true;
			setInterval(tick, 30000);
		}
	}

	// Fire on parsed content (covers the main-page right column) plus a DOM-ready fallback.
	if (window.mw && mw.hook) {
		mw.hook('wikipage.content').add(start);
	}
	if (document.readyState !== 'loading') {
		start();
	} else {
		document.addEventListener('DOMContentLoaded', start);
	}
}());