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

	// Precise remaining time "5d 3h 42m" for the countdown hover tooltip.
	function relPrecise(sec) {
		if (sec < 0) sec = 0;
		var d = Math.floor(sec / DAY); sec -= d * DAY;
		var h = Math.floor(sec / 3600); sec -= h * 3600;
		var m = Math.floor(sec / 60);
		var parts = [];
		if (d) parts.push(d + 'd');
		if (h) parts.push(h + 'h');
		parts.push(m + 'm');
		return parts.join(' ');
	}

	// Minute+second precision "1h 23m 45s" for the Auto-Merge row (short windows, ticked every
	// second). Mirrors relFull() in Module:Events.
	function relFull(sec) {
		if (sec < 0) sec = 0;
		var d = Math.floor(sec / DAY); sec -= d * DAY;
		var h = Math.floor(sec / 3600); sec -= h * 3600;
		var m = Math.floor(sec / 60); var s = Math.floor(sec - m * 60);
		var parts = [];
		if (d) parts.push(d + 'd');
		if (d || h) parts.push(h + 'h');
		if (d || h || m) parts.push(m + 'm');
		parts.push(s + 's');
		return parts.join(' ');
	}

	var MON = ['January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December'];
	function pad2(n) { return (n < 10 ? '0' : '') + n; }
	// Absolute date+time in UTC, matching Lua fmtEpoch ("June 23, 2026, 08:00 UTC").
	function fmtUTC(epoch) {
		var dt = new Date(epoch * 1000);
		return MON[dt.getUTCMonth()] + ' ' + dt.getUTCDate() + ', ' + dt.getUTCFullYear()
			+ ', ' + pad2(dt.getUTCHours()) + ':' + pad2(dt.getUTCMinutes()) + ' UTC';
	}
	// Fill the countdown hover tooltip: date+time on top (prominent), precise d/h/m below (dimmer).
	function setCdTip(run, word, epoch, rel) {
		var t = run.querySelector('.mmev-cd-tip');
		if (!t) return;
		t.innerHTML = '<span class="mmev-cd-tip-date" style="font-weight:bold;">' + word + ' ' + fmtUTC(epoch) + '</span>'
			+ '<br><span class="mmev-cd-tip-rel" style="opacity:0.65;">' + rel + '</span>';
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
				setCdTip(run, 'Starts', s, 'in ' + relPrecise(s - now));
				if (prog) prog.style.display = 'none';
			} else if (now <= e) {               // active
				run.style.display = '';
				run.setAttribute('data-mmev-state', 'active');
				if (label) label.textContent = 'ends in';
				if (val) val.textContent = relShort(e - now);
				setCdTip(run, 'Ends', e, relPrecise(e - now) + ' left');
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

	// Auto-Merge pinned row — its own 1-second tick (short windows shown with second precision).
	// Recomputes the current-or-next window live from the embedded pattern
	// (data-mmev-am = "startEpoch,durSec,intervalSec;...") — several windows a day means the
	// parser-cached server snapshot goes stale within the hour.
	function tickAutoMerge() {
		var now = Date.now() / 1000;
		var am = document.querySelectorAll('.mmev-root .mmev-am');
		for (var a = 0; a < am.length; a++) {
			var row = am[a];
			var spec = row.getAttribute('data-mmev-am');
			if (!spec) continue;
			var parts = spec.split(';');
			var best = null;
			for (var b = 0; b < parts.length; b++) {
				var p = parts[b].split(',');
				var startE = parseInt(p[0], 10), dur = parseInt(p[1], 10), intv = parseInt(p[2], 10);
				if (isNaN(startE) || isNaN(dur) || !intv) continue;
				var occ = startE + Math.floor((now - startE) / intv) * intv;
				var cand;
				if (now >= occ && now < occ + dur) cand = { active: true, s: occ, e: occ + dur };
				else { var ns = (now < occ) ? occ : occ + intv; cand = { active: false, s: ns, e: ns + dur }; }
				if (!best) best = cand;
				else if (cand.active && !best.active) best = cand;
				else if (cand.active === best.active) {
					if (best.active) { if (cand.e < best.e) best = cand; }
					else { if (cand.s < best.s) best = cand; }
				}
			}
			if (!best) continue;
			var amLabel = row.querySelector('.mmev-am-label');
			var amVal = row.querySelector('.mmev-am-val');
			if (best.active) {
				if (amLabel) amLabel.textContent = 'active now, ends in';
				if (amVal) amVal.textContent = relFull(best.e - now);
				setCdTip(row, 'Ends', best.e, relFull(best.e - now) + ' left');
			} else {
				if (amLabel) amLabel.textContent = 'next in';
				if (amVal) amVal.textContent = relFull(best.s - now);
				setCdTip(row, 'Starts', best.s, 'in ' + relFull(best.s - now));
			}
			row.classList.toggle('mmev-seg-active', best.active);
			row.classList.toggle('mmev-seg', !best.active);
		}
	}

	function start() {
		if (!document.querySelector('.mmev-root')) return;
		tick();
		tickAutoMerge();
		if (!started) {
			started = true;
			setInterval(tick, 30000);
			setInterval(tickAutoMerge, 1000);
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

/* == The Daily Scoop: segment selector for per-segment task goals (.mm-dsg spans) ==
 * Injects a dropdown into .mm-dsg-selector; choice is stored in localStorage and applied
 * as a body class (CSS in Common.css shows the matching spans; no class = Level 51+). */
(function () {
	var holder = document.querySelector('.mm-dsg-selector');
	if (!holder || !document.querySelector('.mm-dsg')) { return; }
	var SEGS = [
		['l51', 'Level 51+'],
		['l46', 'Level 46\u201350'],
		['l26', 'Level 26\u201345'],
		['l15', 'Level 15\u201325'],
		['lt5', 'Level 26+ ($500+ spent)']
	];
	var KEY = 'mmDsgSeg';
	var saved = null;
	try { saved = localStorage.getItem(KEY); } catch (e) {}
	var label = document.createElement('label');
	label.appendChild(document.createTextNode('Show objective goals for:'));
	var sel = document.createElement('select');
	SEGS.forEach(function (sdef) {
		var o = document.createElement('option');
		o.value = sdef[0];
		o.textContent = sdef[1];
		sel.appendChild(o);
	});
	function apply(v) {
		document.body.className = document.body.className.replace(/\bmm-seg-\w+\b/g, '').replace(/\s+/g, ' ').trim();
		if (v !== 'l51') { document.body.classList.add('mm-seg-' + v); }
		try { localStorage.setItem(KEY, v); } catch (e) {}
	}
	sel.addEventListener('change', function () { apply(sel.value); });
	var init = (saved && SEGS.some(function (sdef) { return sdef[0] === saved; })) ? saved : 'l51';
	sel.value = init;
	apply(init);
	label.appendChild(sel);
	holder.appendChild(label);
})();

/* == The Daily Scoop: week selector (current/next week task variants, .mm-dsw cards) ==
 * Module:DailyScoop resolves event-tied tasks per day against the current and next
 * Daily Scoop week and emits hidden variant cards plus a .mm-dsw-selector placeholder
 * carrying the week windows as data attributes. The choice here toggles
 * body.mm-week-cur/-next (visibility rules live in Common.css) and marks the matching
 * difficulty tab. The windows are computed at page-parse time; labels below are derived
 * from the CLIENT clock, so after a week rollover a stale "next" window is relabelled
 * "Current week" and an ended window is dropped until the page cache refreshes. */
(function () {
	var holder = document.querySelector('.mm-dsw-selector');
	if (!holder || holder.getAttribute('data-mm-init')) { return; }
	var KEY = 'mmDswWeek';
	var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	function fmt(iso) {
		if (!iso) { return ''; }
		var p = iso.split('-');
		return MONTHS[parseInt(p[1], 10) - 1] + ' ' + parseInt(p[2], 10);
	}
	// Daily Scoop weeks roll at 08:05 UTC (schedule anchor in Datatable/Events).
	function status(wk) {
		var s = holder.getAttribute('data-' + wk + '-start');
		if (!s) { return null; }
		var e = holder.getAttribute('data-' + wk + '-end');
		var now = Date.now();
		if (now >= Date.parse(e + 'T08:05:00Z')) { return 'past'; }
		if (now >= Date.parse(s + 'T08:05:00Z')) { return 'current'; }
		return 'future';
	}
	function optionLabel(wk) {
		var st = status(wk);
		if (!st || st === 'past') { return null; }
		var out = (st === 'current') ? 'Current week' : 'Next week';
		out += ' (' + fmt(holder.getAttribute('data-' + wk + '-start'))
			+ ' – ' + fmt(holder.getAttribute('data-' + wk + '-end'));
		var t = holder.getAttribute('data-' + wk + '-type');
		if (t) { out += ' · ' + t; }
		return out + ')';
	}
	var OPTS = [];
	['cur', 'next'].forEach(function (wk) {
		var lab = optionLabel(wk);
		if (lab) { OPTS.push([wk, lab, status(wk)]); }
	});
	if (!OPTS.length) { return; }
	OPTS.push(['def', 'Default template', null]);
	holder.setAttribute('data-mm-init', '1'); // guard against double injection (site + user script)

	var label = document.createElement('label');
	label.appendChild(document.createTextNode('Show objectives for:'));
	var sel = document.createElement('select');
	OPTS.forEach(function (o) {
		var opt = document.createElement('option');
		opt.value = o[0];
		opt.textContent = o[1];
		sel.appendChild(opt);
	});
	// Today's index (1-7) within the RUNNING scoop week, client-clock based, so it
	// stays correct even on a stale page cache. Also drives the Full Week column
	// highlight via the body class (Common.css).
	var todayIdx = null;
	var runningWk = null; // whichever emitted window is running by the CLIENT clock
	['cur', 'next'].forEach(function (wk) {
		if (!runningWk && status(wk) === 'current') { runningWk = wk; }
	});
	if (runningWk) {
		var ti = Math.floor((Date.now()
			- Date.parse(holder.getAttribute('data-' + runningWk + '-start') + 'T08:05:00Z')) / 86400000) + 1;
		if (ti >= 1 && ti <= 7) {
			todayIdx = ti;
			document.body.classList.add('mm-today-' + ti);
		}
	}
	function markWeekTab(v) {
		var marked = document.querySelectorAll('.mm-dsw-weektab');
		for (var i = 0; i < marked.length; i++) { marked[i].classList.remove('mm-dsw-weektab'); }
		var t = (v === 'cur' || v === 'next') ? holder.getAttribute('data-' + v + '-type') : null;
		if (!t) { return; }
		var tabs = document.querySelectorAll('.wds-tabs__tab[data-hash="' + t + '_Week"]');
		for (var j = 0; j < tabs.length; j++) { tabs[j].classList.add('mm-dsw-weektab'); }
	}
	// Dot on today's Day tab — only in the current-week view and only inside the
	// panel of the RUNNING week type (Day_N data-hash repeats in all four tabbers).
	function markToday(v) {
		var marked = document.querySelectorAll('.mm-dsw-daytab');
		for (var i = 0; i < marked.length; i++) { marked[i].classList.remove('mm-dsw-daytab'); }
		if (v !== runningWk || !todayIdx) { return; }
		var t = holder.getAttribute('data-' + runningWk + '-type');
		var outer = document.querySelector('.wds-tabber');
		if (!t || !outer) { return; }
		var tabs = outer.querySelectorAll(':scope > .wds-tabs__wrapper .wds-tabs__tab');
		var idx = -1;
		for (var j = 0; j < tabs.length; j++) {
			if (tabs[j].getAttribute('data-hash') === t + '_Week') { idx = j; }
		}
		var panels = outer.querySelectorAll(':scope > .wds-tab__content');
		if (idx < 0 || !panels[idx]) { return; }
		var day = panels[idx].querySelector('.wds-tabs__tab[data-hash="Day_' + todayIdx + '"]');
		if (day) { day.classList.add('mm-dsw-daytab'); }
	}
	function apply(v) {
		document.body.classList.remove('mm-week-cur', 'mm-week-next');
		if (v === 'cur' || v === 'next') { document.body.classList.add('mm-week-' + v); }
		markWeekTab(v);
		markToday(v);
		try { localStorage.setItem(KEY, v); } catch (e) {}
	}
	// Switch the outer tabber to the selected week's difficulty. Only on a USER
	// change — doing it on the initial apply would jump the page on every load.
	function switchWeekTab(v) {
		var t = (v === 'cur' || v === 'next') ? holder.getAttribute('data-' + v + '-type') : null;
		if (!t) { return; }
		var tab = document.querySelector('.wds-tabs__tab[data-hash="' + t + '_Week"]');
		if (tab && !tab.classList.contains('wds-is-current')) {
			var a = tab.querySelector('a');
			if (a) { a.click(); } else { tab.click(); }
		}
	}
	sel.addEventListener('change', function () {
		apply(sel.value);
		switchWeekTab(sel.value);
	});
	var saved = null;
	try { saved = localStorage.getItem(KEY); } catch (e) {}
	var init = null;
	if (saved && OPTS.some(function (o) { return o[0] === saved; })) { init = saved; }
	if (!init) {
		// default to the week actually running right now, else the first offered window
		var running = OPTS.filter(function (o) { return o[2] === 'current'; });
		init = running.length ? running[0][0] : OPTS[0][0];
	}
	sel.value = init;
	apply(init);
	label.appendChild(sel);
	holder.appendChild(label);
	var note = document.createElement('div');
	note.className = 'mm-dsw-note';
	note.textContent = '● marks the selected week’s difficulty and today’s day.';
	holder.appendChild(note);

	// == New-visit auto-focus: jump the tabber to the running week type + today's day.
	// A genuine new visit selects the current week/day; a RELOAD instead keeps whatever
	// the visitor had open (their per-tab-session choice, persisted on every tab click).
	// Classes are toggled directly (not .click()) so the far-down tabber never scrolls
	// the freshly-arrived visitor away from the top of the page; a later user click on
	// any tab fully re-toggles Fandom's own state, so nothing desyncs.
	var SELKEY = 'mmDsTab';
	var userTouched = false;
	function setCurrent(list, idx) {
		for (var i = 0; i < list.length; i++) { list[i].classList.toggle('wds-is-current', i === idx); }
	}
	function focusWeekDay(wHash, dHash) {
		var outer = document.querySelector('.wds-tabber');
		if (!outer) { return; }
		var otabs = outer.querySelectorAll(':scope > .wds-tabs__wrapper .wds-tabs__tab');
		var opanels = outer.querySelectorAll(':scope > .wds-tab__content');
		var oidx = -1;
		for (var i = 0; i < otabs.length; i++) { if (otabs[i].getAttribute('data-hash') === wHash) { oidx = i; } }
		if (oidx < 0) { return; }
		setCurrent(otabs, oidx); setCurrent(opanels, oidx);
		if (!dHash || !opanels[oidx]) { return; }
		var inner = opanels[oidx].querySelector('.wds-tabber');
		if (!inner) { return; }
		var itabs = inner.querySelectorAll(':scope > .wds-tabs__wrapper .wds-tabs__tab');
		var ipanels = inner.querySelectorAll(':scope > .wds-tab__content');
		var iidx = -1;
		for (var k = 0; k < itabs.length; k++) { if (itabs[k].getAttribute('data-hash') === dHash) { iidx = k; } }
		if (iidx < 0) { return; }
		setCurrent(itabs, iidx); setCurrent(ipanels, iidx);
	}
	// Snapshot the tabber's current outer(week)+inner(day) selection into sessionStorage.
	function captureSel() {
		var outer = document.querySelector('.wds-tabber');
		if (!outer) { return; }
		var otabs = outer.querySelectorAll(':scope > .wds-tabs__wrapper .wds-tabs__tab');
		var opanels = outer.querySelectorAll(':scope > .wds-tab__content');
		var oidx = -1, wHash = null;
		for (var i = 0; i < otabs.length; i++) {
			if (otabs[i].classList.contains('wds-is-current')) { oidx = i; wHash = otabs[i].getAttribute('data-hash'); }
		}
		if (!wHash) { return; }
		var dHash = null;
		if (oidx >= 0 && opanels[oidx]) {
			var inner = opanels[oidx].querySelector('.wds-tabber');
			var cur = inner && inner.querySelector(':scope > .wds-tabs__wrapper .wds-tabs__tab.wds-is-current');
			if (cur) { dHash = cur.getAttribute('data-hash'); }
		}
		try { sessionStorage.setItem(SELKEY, JSON.stringify({ w: wHash, d: dHash })); } catch (e) {}
	}
	function isReload() {
		try {
			var nav = performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
			if (nav && nav.type) { return nav.type === 'reload'; }
			if (performance.navigation) { return performance.navigation.type === 1; }
		} catch (e) {}
		return false;
	}
	// Persist the visitor's choice after each manual tab switch (deferred so Fandom has
	// already flipped wds-is-current), and stop the re-assert below from overriding it.
	document.addEventListener('click', function (e) {
		var tab = e.target && e.target.closest && e.target.closest('.wds-tabber .wds-tabs__tab');
		if (tab) { userTouched = true; setTimeout(captureSel, 60); }
	}, true);
	function initialTab() {
		if (userTouched) { return; }
		var stored = null;
		try { stored = JSON.parse(sessionStorage.getItem(SELKEY)); } catch (e) {}
		if (isReload() && stored && stored.w) { focusWeekDay(stored.w, stored.d); return; }
		if (runningWk) {
			var wt = holder.getAttribute('data-' + runningWk + '-type');
			if (wt) { focusWeekDay(wt + '_Week', todayIdx ? ('Day_' + todayIdx) : null); captureSel(); }
		}
	}
	initialTab();
	setTimeout(initialTab, 250); // re-assert once in case Fandom's tabber init ran after us
})();