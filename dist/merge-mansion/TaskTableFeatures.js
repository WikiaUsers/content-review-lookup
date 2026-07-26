/* MediaWiki:TaskTableFeatures.js
 * Four independent task-table features. Each is its own IIFE so they share no
 * state and can be reasoned about / debugged in isolation.
 *
 *  1. Hide Tokens column   — controlled by feature checkbox "Hide Tokens column".
 *  2. Progress Tooltip     — always-on. Shows transient floating tooltip near
 *                            a task checkbox after its state changes (incl. the
 *                            Fandom Tracker async populate). Renders large "X%"
 *                            text, or "All tasks completed!" when reaching 100%.
 *  3. Hide Completed Tasks — controlled by feature checkbox "Hide Completed
 *                            Tasks". Hides completed tasks but keeps a 2-step
 *                            BFS of completed predecessors (via the Needs
 *                            column) for every uncompleted task. A dotted gap
 *                            divider with hover-count is inserted between
 *                            visible rows separated by hidden ones.
 *  4. Active Tasks table   — controlled by feature checkbox "Show Table of
 *                            Active Tasks". Renders a small dynamic table
 *                            directly above each main task table containing the
 *                            currently-actionable tasks (uncompleted AND all
 *                            their Needs are completed; entry tasks with empty
 *                            Needs always qualify). Header is cloned from the
 *                            main table; rows are cloned with the checkbox cell
 *                            re-wired to proxy clicks to the original Tracker-
 *                            bound input. Heading shows live progress pill
 *                            "X/Y (Z%)" with a pulse animation on change. Rows
 *                            that just completed get a strikethrough + fade-out
 *                            before being removed. Whole wrapper disappears at
 *                            100 %. A spinner placeholder shows during the
 *                            initial Tracker grace period.
 *
 *  4b. Foreshadow Upcoming Tasks — controlled by feature checkbox "Foreshadow
 *      Upcoming Tasks" (sub-feature of the Active Tasks table). Under every
 *      active row it previews the tasks up to 6 Opens-steps ahead, covering
 *      all branches, as compact dimmed sub-rows. Branches that run into an
 *      active time lock end with a bare lock row (icon + unlock date) unless
 *      the "Ignore Time Locks" sub-toggle is on (revealed only on pages with
 *      active locks). Sub-rows of the same task highlight together on hover
 *      (tap-toggle on hoverless devices); each group collapses/expands via its
 *      "Show/Hide upcoming tasks" divider (persisted per page, and a freshly
 *      activated task inherits the collapsed state of its completed
 *      predecessor). Group rows are cached so unchanged groups keep their DOM
 *      (and images) across re-renders.
 *
 * Robustness notes:
 *  - Fandom Tracker populates / enables the checkbox cells asynchronously,
 *    AFTER our scripts run. Each feature observes its anchor cells (rather
 *    than reading once on load) and tolerates them appearing late via a
 *    page-level MutationObserver fallback.
 *  - Common.js may relocate the "Completed" column to the table tail. Column
 *    discovery is therefore done by header-text lookup (not hard-coded index).
 *
 * Changelog:
 *  v5.10 (2026-05-10) — Inverted Next Area row priority. The "All tasks
 *    completed!" banner here is now PRIMARY for rendering Next Area; only
 *    when this banner is absent does MediaWiki:DynamicRemainingItemsTable.js
 *    fall back to its own Next Area row in the Required Items table.
 *    Removed Show Only Remaining Items observer dependency.
 */

/* ============================================================================
 * #1 — Hide Tokens column
 * Existing logic, kept verbatim apart from being wrapped in its own scope.
 * ========================================================================== */
(function () {
	function init() {
		var checkboxCell = document.querySelector('[data-tpt-id="TaskTableFeatures"] .table-progress-checkbox-cell');
		if (!checkboxCell) {
			setTimeout(init, 500);
			return;
		}

		function applyState() {
			var checked = checkboxCell.getAttribute('data-sort-value') === '1';
			document.querySelectorAll('.taskTable .tokensColumn').forEach(function (cell) {
				cell.style.display = checked ? 'none' : '';
			});
		}

		applyState();

		new MutationObserver(applyState).observe(checkboxCell, {
			attributes: true,
			attributeFilter: ['data-sort-value']
		});
	}

	if (document.readyState === 'complete') {
		init();
	} else {
		window.addEventListener('load', init);
	}
})();


/* ============================================================================
 * #2 — Progress Tooltip
 * Always-on. Listens for data-sort-value changes on each task's
 * .table-progress-checkbox-cell and shows a transient floating tooltip.
 * ========================================================================== */
(function () {
	'use strict';

	var FADE_MS = 2000;        // total visible time before fade-out completes
	var FADE_OUT_MS = 350;     // fade-out duration (subtracted from FADE_MS)
	var INIT_GRACE_MS = 2000;  // suppress tooltips for the first N ms (Tracker async populate)
	var STYLE_ID = 'mmwt-progress-tooltip-style';
	var BANNER_CLASS = 'mmwt-all-completed-banner';
	var ACTIVE_TOOLTIP = null; // single transient element, reused across triggers
	var INIT_TIME = 0;

	function injectStyle() {
		if (document.getElementById(STYLE_ID)) return;
		var s = document.createElement('style');
		s.id = STYLE_ID;
		s.textContent = [
			// ── default tooltip (mid-progress) ────────────────────────────────
			'.mmwt-progress-tooltip{',
			'  position:absolute;z-index:9999;',
			'  padding:9px 18px;border-radius:999px;',
			'  background:linear-gradient(135deg,rgba(34,28,18,0.96),rgba(20,16,10,0.96));',
			'  color:#ffd479;',
			'  font-family:"Tisa Sans Pro","Trebuchet MS",sans-serif;',
			'  font-weight:bold;font-size:1.1em;letter-spacing:0.5px;',
			'  line-height:1;text-shadow:0 1px 2px rgba(0,0,0,0.6);',
			'  box-shadow:0 4px 14px rgba(0,0,0,0.45),',
			'             0 0 0 1px rgba(255,212,121,0.28),',
			'             inset 0 1px 0 rgba(255,212,121,0.15);',
			'  pointer-events:none;white-space:nowrap;',
			'  opacity:0;transform:translateY(-3px) scale(0.92);',
			'  transition:opacity 200ms ease-out,transform 240ms cubic-bezier(0.34,1.56,0.64,1);',
			'}',
			'.mmwt-progress-tooltip.mmwt-visible{',
			'  opacity:1;transform:translateY(0) scale(1);',
			'}',
			// ── 100% complete: golden + pulse ─────────────────────────────────
			'.mmwt-progress-tooltip.mmwt-complete{',
			'  background:linear-gradient(135deg,#ffd770 0%,#ffb340 60%,#ff9020 100%);',
			'  color:#3a2410;',
			'  font-size:1.35em;padding:11px 24px;letter-spacing:1px;',
			'  text-shadow:0 1px 0 rgba(255,255,255,0.45);',
			'  box-shadow:0 6px 22px rgba(255,180,40,0.55),',
			'             0 0 0 2px rgba(255,255,255,0.35),',
			'             inset 0 1px 0 rgba(255,255,255,0.55);',
			'  animation:mmwt-pulse 1.4s ease-out;',
			'}',
			'@keyframes mmwt-pulse{',
			'  0%{box-shadow:0 6px 22px rgba(255,180,40,0.55),0 0 0 0 rgba(255,255,150,0.65),0 0 0 2px rgba(255,255,255,0.35),inset 0 1px 0 rgba(255,255,255,0.55);}',
			'  60%{box-shadow:0 6px 22px rgba(255,180,40,0.55),0 0 0 22px rgba(255,255,150,0),0 0 0 2px rgba(255,255,255,0.35),inset 0 1px 0 rgba(255,255,255,0.55);}',
			'  100%{box-shadow:0 6px 22px rgba(255,180,40,0.55),0 0 0 24px rgba(255,255,150,0),0 0 0 2px rgba(255,255,255,0.35),inset 0 1px 0 rgba(255,255,255,0.55);}',
			'}',
			// ── confetti ──────────────────────────────────────────────────────
			'.mmwt-confetti-host{',
			'  position:absolute;z-index:10000;width:0;height:0;pointer-events:none;',
			'}',
			'.mmwt-confetti-piece{',
			'  position:absolute;left:0;top:0;width:8px;height:14px;border-radius:2px;',
			'  opacity:1;will-change:transform,opacity;',
			'  animation:mmwt-confetti-fly 1.5s cubic-bezier(0.2,0.7,0.4,1) forwards;',
			'}',
			'@keyframes mmwt-confetti-fly{',
			'  0%{transform:translate(0,0) rotate(0deg);opacity:1;}',
			'  100%{transform:translate(var(--mmwt-x),var(--mmwt-y)) rotate(var(--mmwt-r));opacity:0;}',
			'}'
			// Banner uses existing global "fancy areaCompleted" classes from Common.css.
		].join('');
		document.head.appendChild(s);
	}

	// ─── confetti spawn ─────────────────────────────────────────────────────
	function spawnConfetti(originRect) {
		var host = document.createElement('div');
		host.className = 'mmwt-confetti-host';
		host.style.left = (window.scrollX + originRect.left + originRect.width / 2) + 'px';
		host.style.top  = (window.scrollY + originRect.top  + originRect.height / 2) + 'px';
		document.body.appendChild(host);

		var colors = ['#ffd479', '#ff8855', '#ff4488', '#88ddff', '#88ff99', '#ffaa44', '#ffffff'];
		var COUNT = 36;
		for (var i = 0; i < COUNT; i++) {
			var piece = document.createElement('div');
			piece.className = 'mmwt-confetti-piece';
			// Random direction biased slightly upward.
			var angle = (Math.random() * 2 - 1) * Math.PI; // -π..π
			var dist  = 70 + Math.random() * 140;
			var x = Math.cos(angle) * dist;
			var y = Math.sin(angle) * dist - 40 - Math.random() * 30; // bias up
			var rot = (Math.random() - 0.5) * 900;
			piece.style.background = colors[i % colors.length];
			piece.style.setProperty('--mmwt-x', x.toFixed(1) + 'px');
			piece.style.setProperty('--mmwt-y', y.toFixed(1) + 'px');
			piece.style.setProperty('--mmwt-r', rot.toFixed(0) + 'deg');
			piece.style.animationDelay = (Math.random() * 120).toFixed(0) + 'ms';
			// Vary piece sizes slightly for richer look.
			var w = 6 + Math.floor(Math.random() * 6);
			var h = 10 + Math.floor(Math.random() * 8);
			piece.style.width  = w + 'px';
			piece.style.height = h + 'px';
			host.appendChild(piece);
		}
		setTimeout(function () {
			if (host.parentNode) host.parentNode.removeChild(host);
		}, 2000);
	}

	// ─── permanent banner (100% complete) ────────────────────────────────────
	function getColspan(table) {
		var headerRow = table.querySelector('tbody > tr, tr');
		return (headerRow && headerRow.children) ? headerRow.children.length : 8;
	}

	var NEXT_AREA_CLASS = 'mmwt-next-area-row';

	function ensureBanner(table) {
		var existing = table.querySelector('tr.' + BANNER_CLASS);
		if (existing) return existing;
		var headerRow = table.querySelector('tbody > tr, tr');
		if (!headerRow) return null;
		// Reuse the same visual style as the "Area Completed!" row in Required Items
		// (.fancy + .areaCompleted, defined globally in MediaWiki:Common.css).
		var tr = document.createElement('tr');
		tr.className = BANNER_CLASS + ' center';
		var td = document.createElement('td');
		td.colSpan = getColspan(table);
		var span = document.createElement('span');
		span.className = 'fancy areaCompleted';
		span.textContent = 'All tasks completed!';
		span.style.fontSize = '26px';
		span.style.padding = '10px 0 10px 0';
		td.appendChild(span);
		tr.appendChild(td);
		var nextSibling = headerRow.nextSibling;
		if (nextSibling) {
			headerRow.parentNode.insertBefore(tr, nextSibling);
		} else {
			headerRow.parentNode.appendChild(tr);
		}
		return tr;
	}

	function removeBanner(table) {
		var existing = table.querySelector('tr.' + BANNER_CLASS);
		if (existing && existing.parentNode) existing.parentNode.removeChild(existing);
	}

	// ─── Next Area row ─────────────────────────────────────────────────────
	// Inserted directly below the "All tasks completed!" banner. Mirrors the
	// "Next Area:" pattern from MediaWiki:DynamicRemainingItemsTable.js — the
	// content is cloned from the page's infobox `div[data-source="unlocks"]`.
	//
	// As of v5.10 the task-table banner has PRIORITY over the Required Items
	// "Area Completed!" Next Area row. When this row is present here, the
	// Required Items script suppresses its own copy. Previously the priority
	// was inverted (Required Items first, this script second) and we hid the
	// row whenever Show Only Remaining Items was enabled — that check is gone.
	function isShowOnlyRemainingEnabled() {
		// kept for backwards compat in case external code checks this; unused below.
		var input = document.querySelector(
			'[data-tpt-id="DynamicRemainingItems"] [data-tpt-row-id="Show Only Remaining Items"]'
		);
		var cell = input && input.closest('.table-progress-checkbox-cell');
		return !!(cell && cell.getAttribute('data-sort-value') === '1');
	}

	function ensureNextAreaRow(table) {
		// Already present?
		var existing = table.querySelector('tr.' + NEXT_AREA_CLASS);
		if (existing) return existing;
		var banner = table.querySelector('tr.' + BANNER_CLASS);
		if (!banner) return null;

		var unlockDiv = document.querySelector('div[data-source="unlocks"]');
		if (!unlockDiv) return null;
		var valueDiv = unlockDiv.querySelector('.pi-data-value');
		if (!valueDiv) return null;

		var tr = document.createElement('tr');
		tr.className = NEXT_AREA_CLASS + ' center';
		var td = document.createElement('td');
		td.colSpan = getColspan(table);

		var label = document.createElement('span');
		label.className = 'fancy';
		label.textContent = 'Next Area:';
		label.style.fontSize = '18px';
		label.style.padding = '10px 0';
		td.appendChild(label);

		var wrapper = document.createElement('div');
		wrapper.className = 'fancy';
		wrapper.style.marginLeft = '20px';
		wrapper.style.display = 'inline';

		// Same image-size normalisation as the Required Items implementation.
		var fixedHTML = valueDiv.innerHTML
			.replace(/--shrinker-multiplier:\s*[^;"]+/g, '--shrinker-multiplier: 10.666666666667')
			.replace(/width:\s*[^;"]+/g, 'width: 48px')
			.replace(/height:\s*[^;"]+/g, 'height: 48px');
		wrapper.innerHTML = fixedHTML;
		td.appendChild(wrapper);
		tr.appendChild(td);

		var afterBanner = banner.nextSibling;
		if (afterBanner) {
			banner.parentNode.insertBefore(tr, afterBanner);
		} else {
			banner.parentNode.appendChild(tr);
		}
		return tr;
	}

	function removeNextAreaRow(table) {
		var existing = table.querySelector('tr.' + NEXT_AREA_CLASS);
		if (existing && existing.parentNode) existing.parentNode.removeChild(existing);
	}

	function ensureTooltip() {
		if (ACTIVE_TOOLTIP && document.body.contains(ACTIVE_TOOLTIP)) return ACTIVE_TOOLTIP;
		ACTIVE_TOOLTIP = document.createElement('div');
		ACTIVE_TOOLTIP.className = 'mmwt-progress-tooltip';
		document.body.appendChild(ACTIVE_TOOLTIP);
		return ACTIVE_TOOLTIP;
	}

	// Compute completed/total for a single task table.
	function computeProgress(table) {
		var cells = table.querySelectorAll('.table-progress-checkbox-cell');
		var completed = 0, total = 0;
		cells.forEach(function (c) {
			total++;
			if (c.getAttribute('data-sort-value') === '1') completed++;
		});
		return { completed: completed, total: total };
	}

	// Banner is shown only when BOTH the Hide Completed Tasks feature is enabled
	// AND every task in the table is completed. (When the feature is off, all
	// tasks are visible anyway, so the banner would be redundant noise.)
	function isHideCompletedEnabled() {
		var input = document.querySelector(
			'[data-tpt-id="TaskTableFeatures"] [data-tpt-row-id="Hide Completed Tasks"]'
		);
		var cell = input && input.closest('.table-progress-checkbox-cell');
		return !!(cell && cell.getAttribute('data-sort-value') === '1');
	}

	function updateBanner(table) {
		injectStyle();
		var p = computeProgress(table);
		var isAllDone = p.total > 0 && p.completed === p.total;
		if (isAllDone && isHideCompletedEnabled()) {
			ensureBanner(table);
			// v5.10: task-table banner has PRIORITY over Required Items table's
			// own Next Area row. Always render Next Area here when banner exists;
			// MediaWiki:DynamicRemainingItemsTable.js detects our row and
			// suppresses its own duplicate.
			ensureNextAreaRow(table);
		} else {
			removeNextAreaRow(table);
			removeBanner(table);
		}
		return isAllDone;
	}

	// Refresh banners across all task tables (used when the feature toggle changes).
	function refreshAllBanners() {
		document.querySelectorAll('table.taskTable').forEach(function (t) {
			if (t.getAttribute('data-tpt-id') === 'TaskTableFeatures') return;
			updateBanner(t);
		});
	}

	function showTooltip(anchorCell, table) {
		injectStyle();
		var tip = ensureTooltip();

		var p = computeProgress(table);
		// Reserve "100%" exclusively for the actually-all-completed state. Math.round
		// would otherwise display 100 % at e.g. 199/200 (= 99.5 % rounded up).
		var pct;
		if (p.total === 0) {
			pct = 0;
		} else if (p.completed === p.total) {
			pct = 100;
		} else {
			pct = Math.min(99, Math.round(100 * p.completed / p.total));
		}
		var isAllDone = (pct === 100);
		tip.textContent = pct + '%';
		// Re-trigger the pulse animation by toggling the class fresh each time.
		tip.classList.remove('mmwt-complete');
		// force reflow so animation can restart
		void tip.offsetWidth;
		if (isAllDone) tip.classList.add('mmwt-complete');

		// Position next to the cell (right side); fall back to viewport-clamped.
		var rect = anchorCell.getBoundingClientRect();
		// Make tooltip measurable
		tip.style.left = '0px';
		tip.style.top = '0px';
		tip.classList.add('mmwt-visible');
		var tipRect = tip.getBoundingClientRect();

		var left = window.scrollX + rect.right + 8;
		var top = window.scrollY + rect.top + (rect.height / 2) - (tipRect.height / 2);
		// Clamp to viewport horizontally if it overflows on the right
		var maxLeft = window.scrollX + document.documentElement.clientWidth - tipRect.width - 8;
		if (left > maxLeft) {
			left = window.scrollX + rect.left - tipRect.width - 8;
		}
		tip.style.left = left + 'px';
		tip.style.top = top + 'px';

		// Restart fade timer
		if (tip._mmwtTimer) clearTimeout(tip._mmwtTimer);
		if (tip._mmwtFadeTimer) clearTimeout(tip._mmwtFadeTimer);
		tip.classList.add('mmwt-visible');

		// 100% celebration: spawn confetti from the tooltip itself.
		if (isAllDone) {
			var tipRect = tip.getBoundingClientRect();
			spawnConfetti(tipRect);
		}

		// Hold the tooltip a bit longer for the 100% celebration.
		var visibleMs = isAllDone ? FADE_MS + 1200 : FADE_MS;
		tip._mmwtFadeTimer = setTimeout(function () {
			tip.classList.remove('mmwt-visible');
		}, visibleMs - FADE_OUT_MS);
		tip._mmwtTimer = setTimeout(function () {
			// no-op cleanup
		}, visibleMs);
	}

	function attachTableObservers(table) {
		// Skip the FEATURES table — its checkboxes are settings, not progress.
		if (table.getAttribute('data-tpt-id') === 'TaskTableFeatures') return;
		if (table._mmwtProgressAttached) return;
		table._mmwtProgressAttached = true;

		// Initial cells
		var cells = table.querySelectorAll('.table-progress-checkbox-cell');
		cells.forEach(function (cell) { observeCell(cell, table); });

		// Some cells may appear/late-mutate (Tracker async populate); observe additions.
		new MutationObserver(function (mutations) {
			mutations.forEach(function (m) {
				m.addedNodes && m.addedNodes.forEach(function (n) {
					if (!(n instanceof HTMLElement)) return;
					if (n.classList && n.classList.contains('table-progress-checkbox-cell')) {
						observeCell(n, table);
					}
					n.querySelectorAll && n.querySelectorAll('.table-progress-checkbox-cell').forEach(function (c) {
						observeCell(c, table);
					});
				});
			});
		}).observe(table, { childList: true, subtree: true });
	}

	function observeCell(cell, table) {
		if (cell._mmwtProgressObserved) return;
		cell._mmwtProgressObserved = true;
		new MutationObserver(function () {
			// Banner state is always kept in sync (incl. during grace period).
			updateBanner(table);
			// Floating tooltip is suppressed during initial grace period (Tracker populate
			// of saved state shouldn't spam tooltips). After that, tooltip ALWAYS shows,
			// including for 100 % — that case gets the celebratory style + confetti.
			if (Date.now() - INIT_TIME < INIT_GRACE_MS) return;

			var p = computeProgress(table);
			var isAllDone = p.total > 0 && p.completed === p.total;
			if (isAllDone) {
				// When the user just completed the last task and the Hide Completed
				// Tasks feature is on, the row that was just clicked gets hidden and
				// the "All tasks completed!" banner is inserted — both shift the
				// layout. Defer the celebration until the layout settles, and anchor
				// the tooltip to the banner so it lands on the correct visual focus.
				setTimeout(function () {
					var anchor = table.querySelector('tr.' + BANNER_CLASS + ' span') || cell;
					showTooltip(anchor, table);
				}, 350);
			} else {
				showTooltip(cell, table);
			}
		}).observe(cell, { attributes: true, attributeFilter: ['data-sort-value'] });
	}

	function attachFeatureToggleObserver() {
		// Watch only the Hide Completed Tasks toggle — it directly controls
		// whether the banner (and our Next Area row) is rendered. v5.10 dropped
		// the Show Only Remaining Items dependency now that this script has
		// priority for Next Area rendering.
		var sel = '[data-tpt-id="TaskTableFeatures"] [data-tpt-row-id="Hide Completed Tasks"]';
		var input = document.querySelector(sel);
		var cell = input && input.closest('.table-progress-checkbox-cell');
		if (!cell) {
			setTimeout(attachFeatureToggleObserver, 500);
			return;
		}
		if (!cell._mmwtBannerToggleObserved) {
			cell._mmwtBannerToggleObserved = true;
			new MutationObserver(refreshAllBanners).observe(cell, {
				attributes: true, attributeFilter: ['data-sort-value']
			});
		}
	}

	function init() {
		INIT_TIME = Date.now();
		document.querySelectorAll('table.taskTable').forEach(function (t) {
			attachTableObservers(t);
			// Initial banner check (in case Tracker has already populated state).
			if (t.getAttribute('data-tpt-id') !== 'TaskTableFeatures') updateBanner(t);
		});
		attachFeatureToggleObserver();

		// Watch for tables that may be added later (Tracker / SPA navigation).
		new MutationObserver(function (mutations) {
			mutations.forEach(function (m) {
				m.addedNodes && m.addedNodes.forEach(function (n) {
					if (!(n instanceof HTMLElement)) return;
					if (n.matches && n.matches('table.taskTable')) attachTableObservers(n);
					n.querySelectorAll && n.querySelectorAll('table.taskTable').forEach(attachTableObservers);
				});
			});
		}).observe(document.documentElement || document.body, { childList: true, subtree: true });
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();


/* ============================================================================
 * #3 — Hide Completed Tasks
 * Hides completed task rows; shows up to 2-hop BFS predecessors (via Needs) of
 * each uncompleted task. Inserts a dotted divider with hover-count between
 * visible rows separated by hidden ones. While hiding is active the table's
 * column widths are pinned to their full-content values (measured as if all
 * rows were visible), so hiding/revealing the widest row never changes the
 * table's width — and the Active Tasks clone above inherits the same stable
 * width through its existing sync.
 * ========================================================================== */
(function () {
	'use strict';

	var FEATURE_ROW_ID = 'Hide Completed Tasks';
	var GAP_ROW_CLASS = 'mmwt-hidden-gap';
	var GAP_STYLE_ID = 'mmwt-hidden-gap-style';
	var BFS_DEPTH = 2;

	function injectStyle() {
		if (document.getElementById(GAP_STYLE_ID)) return;
		var s = document.createElement('style');
		s.id = GAP_STYLE_ID;
		s.textContent = [
			'.' + GAP_ROW_CLASS + ' td{',
			'  border-top:1px dotted rgba(255,212,121,0.45) !important;',
			'  border-bottom:1px dotted rgba(255,212,121,0.45) !important;',
			'  background:transparent !important;',
			'  padding:3px 0 !important;',
			'  height:6px !important;',
			'  cursor:help;',
			'}',
			'.' + GAP_ROW_CLASS + ':hover td{',
			'  background:rgba(255,212,121,0.06) !important;',
			'}',
			// Tiny "..." indicator centered, only visible on hover for cleanness
			'.' + GAP_ROW_CLASS + ' td::after{',
			'  content:attr(data-mmwt-gap-label);',
			'  display:block;text-align:center;',
			'  font-size:0.7em;font-style:italic;color:rgba(255,212,121,0.55);',
			'  letter-spacing:2px;line-height:1;',
			'}'
		].join('');
		document.head.appendChild(s);
	}

	// Locate Needs column index by header text. Robust against Common.js' column
	// reorder (Completed → tail). Returns 0-based td index, or -1 if not found.
	function findColumnIndex(table, headerText) {
		var headerRow = table.querySelector('tbody > tr, tr');
		if (!headerRow) return -1;
		var ths = headerRow.querySelectorAll('th');
		for (var i = 0; i < ths.length; i++) {
			var t = (ths[i].textContent || '').trim();
			if (t === headerText) return i;
		}
		return -1;
	}

	// Parse a row's task id from <span id="T#"> text. Returns string id or null.
	function rowTaskId(tr) {
		var span = tr.querySelector('span[id^="T"]');
		if (!span) return null;
		var t = (span.textContent || '').trim();
		return t || null;
	}

	// Parse "#1, #2 ..." references from a Needs cell. Returns array of string ids.
	function parseNeedsCell(td) {
		if (!td) return [];
		var ids = [];
		var seen = {};
		// Prefer anchor hrefs (#T<n>) — robust against whitespace/markup variants.
		td.querySelectorAll('a[href^="#T"]').forEach(function (a) {
			var id = a.getAttribute('href').slice(2); // strip "#T"
			if (id && !seen[id]) { seen[id] = 1; ids.push(id); }
		});
		// Fallback: regex over plain text (#N tokens).
		if (!ids.length) {
			var text = (td.textContent || '');
			var re = /#(\d+)/g, m;
			while ((m = re.exec(text)) !== null) {
				if (!seen[m[1]]) { seen[m[1]] = 1; ids.push(m[1]); }
			}
		}
		return ids;
	}

	// Build the per-table model used by visibility logic.
	function buildModel(table) {
		var needsIdx = findColumnIndex(table, 'Needs');
		var rows = [];
		var byId = {};
		var trList = table.querySelectorAll('tbody > tr');
		trList.forEach(function (tr) {
			var checkbox = tr.querySelector('.table-progress-checkbox-cell');
			if (!checkbox) return; // header / non-task row
			var taskId = rowTaskId(tr);
			if (!taskId) return;
			var tds = tr.querySelectorAll(':scope > td');
			var needsTd = needsIdx >= 0 ? tds[needsIdx] : null;
			var needs = parseNeedsCell(needsTd);
			var entry = {
				taskId: taskId,
				rowEl: tr,
				checkboxCell: checkbox,
				needs: needs
			};
			rows.push(entry);
			byId[taskId] = entry;
		});
		return { rows: rows, byId: byId };
	}

	// Returns a Set of task ids that should be visible when Hide Completed is on.
	// Algorithm: every uncompleted task is visible. For each uncompleted task,
	// run BFS up to BFS_DEPTH hops over its Needs ancestry; every traversed task
	// (regardless of completion) is also visible. Empty Needs → no expansion.
	function computeVisibleSet(model) {
		var visible = {};
		var queue = [];
		model.rows.forEach(function (r) {
			var done = r.checkboxCell.getAttribute('data-sort-value') === '1';
			if (!done) {
				visible[r.taskId] = 1;
				queue.push({ id: r.taskId, depth: 0 });
			}
		});
		// BFS
		while (queue.length) {
			var head = queue.shift();
			if (head.depth >= BFS_DEPTH) continue;
			var task = model.byId[head.id];
			if (!task) continue;
			for (var i = 0; i < task.needs.length; i++) {
				var nid = task.needs[i];
				if (visible[nid]) continue;
				visible[nid] = 1;
				queue.push({ id: nid, depth: head.depth + 1 });
			}
		}
		return visible;
	}

	function removeGapRows(table) {
		table.querySelectorAll('tr.' + GAP_ROW_CLASS).forEach(function (tr) {
			tr.parentNode.removeChild(tr);
		});
	}

	// Insert dotted-divider rows wherever a contiguous run of hidden tasks lies
	// between (or before/after) the visible task rows. The divider's
	// data-mmwt-gap-label shows "⋯ N hidden ⋯" via CSS ::after.
	function makeGapRow(count, colspan) {
		var gap = document.createElement('tr');
		gap.className = GAP_ROW_CLASS;
		var gapTd = document.createElement('td');
		gapTd.colSpan = colspan;
		gapTd.setAttribute('data-mmwt-gap-label',
			'⋯  ' + count + ' hidden  ⋯');
		gapTd.setAttribute('title', count + ' completed task'
			+ (count === 1 ? '' : 's') + ' hidden here');
		gap.appendChild(gapTd);
		return gap;
	}

	function insertGapRows(table, model, visible) {
		removeGapRows(table);
		var headerRow = table.querySelector('thead tr, tbody > tr');
		var colspan = (headerRow && headerRow.children) ? headerRow.children.length : 8;

		var rows = model.rows;
		// Indices of visible rows within model.rows.
		var visibleIdx = [];
		for (var i = 0; i < rows.length; i++) {
			if (visible[rows[i].taskId] === 1) visibleIdx.push(i);
		}

		// Edge: nothing visible at all → insert one gap row representing the whole table.
		if (visibleIdx.length === 0) {
			if (rows.length > 0) {
				var firstRowEl = rows[0].rowEl;
				firstRowEl.parentNode.insertBefore(makeGapRow(rows.length, colspan), firstRowEl);
			}
			return;
		}

		// Leading gap (hidden rows before the first visible).
		var leading = visibleIdx[0];
		if (leading > 0) {
			var firstVisible = rows[visibleIdx[0]].rowEl;
			firstVisible.parentNode.insertBefore(makeGapRow(leading, colspan), firstVisible);
		}

		// Between gaps.
		for (var k = 0; k < visibleIdx.length - 1; k++) {
			var between = visibleIdx[k + 1] - visibleIdx[k] - 1;
			if (between > 0) {
				var nextVisible = rows[visibleIdx[k + 1]].rowEl;
				nextVisible.parentNode.insertBefore(makeGapRow(between, colspan), nextVisible);
			}
		}

		// Trailing gap (hidden rows after the last visible).
		var lastIdx = visibleIdx[visibleIdx.length - 1];
		var trailing = rows.length - 1 - lastIdx;
		if (trailing > 0) {
			var lastVisible = rows[lastIdx].rowEl;
			var sibling = lastVisible.nextSibling;
			var gap = makeGapRow(trailing, colspan);
			if (sibling) {
				lastVisible.parentNode.insertBefore(gap, sibling);
			} else {
				lastVisible.parentNode.appendChild(gap);
			}
		}
	}

	// ── Full-content width pin ──────────────────────────────────────────────
	// Rows hidden via display:none stop contributing to the browser's column
	// width computation, so whenever the widest row happens to get hidden the
	// whole table (and the Active Tasks clone mirroring it) visibly shrinks —
	// and grows back on undo / when arriving with a different completion state.
	// Instead, measure the widths the table has with ALL rows visible and pin
	// them (table-layout:fixed + per-header widths). The measurement un-hides
	// the rows only inside one synchronous block — the browser never paints
	// mid-block, so nothing flickers. Each table pins its own measured widths,
	// so every area keeps its individual full-content width.

	function headerCells(table) {
		var row = table.querySelector('thead tr') || table.querySelector('tr');
		if (!row) return [];
		return Array.prototype.slice.call(row.children);
	}

	// Measure natural per-column widths + total width as if no row were hidden.
	// Clears any previous pin styles first so auto layout decides freely.
	function measureFullWidths(table) {
		var unhidden = [];
		table.querySelectorAll('tbody > tr').forEach(function (tr) {
			if (tr.style.display === 'none') {
				unhidden.push(tr);
				tr.style.display = '';
			}
		});
		var ths = headerCells(table);
		table.style.tableLayout = '';
		table.style.width = '';
		ths.forEach(function (th) { th.style.width = ''; });
		void table.offsetWidth; // force layout with everything visible
		var widths = ths.map(function (th) {
			return th.getBoundingClientRect().width;
		});
		var total = table.getBoundingClientRect().width;
		unhidden.forEach(function (tr) { tr.style.display = 'none'; });
		return { widths: widths, total: total };
	}

	function applyWidthPin(table) {
		var pin = table._mmwtWidthPin;
		if (!pin) return;
		var ths = headerCells(table);
		if (ths.length !== pin.widths.length) return;
		table.style.tableLayout = 'fixed';
		table.style.width = pin.total + 'px';
		for (var i = 0; i < ths.length; i++) {
			// hidden columns (Hide Tokens) measure 0 — leave them unstyled
			ths[i].style.width = pin.widths[i] > 0 ? pin.widths[i] + 'px' : '';
		}
	}

	function remeasureWidthPin(table) {
		table._mmwtWidthPin = measureFullWidths(table);
		applyWidthPin(table);
	}

	function removeWidthPin(table) {
		if (!table._mmwtWidthPin) return;
		table._mmwtWidthPin = null;
		table.style.tableLayout = '';
		table.style.width = '';
		headerCells(table).forEach(function (th) { th.style.width = ''; });
	}

	function ensureWidthPin(table) {
		if (table._mmwtWidthPin) {
			// Cheap re-assert; revealing rows (undo) never changes the pin —
			// their widths are already part of the full-content measurement.
			applyWidthPin(table);
			return;
		}
		remeasureWidthPin(table);
		attachPinInvalidators(table);
	}

	// Content metrics can change after the pin was measured — re-measure
	// (debounced; the un-hide/measure/re-hide block itself stays synchronous).
	function attachPinInvalidators(table) {
		if (table._mmwtPinHooks) return;
		table._mmwtPinHooks = true;
		var pending = null;
		function remeasureSoon() {
			if (pending) clearTimeout(pending);
			pending = setTimeout(function () {
				pending = null;
				if (table._mmwtWidthPin) remeasureWidthPin(table);
			}, 150);
		}
		// Lazy-loaded images finish after measurement; 'load' does not bubble,
		// so listen in capture phase.
		table.addEventListener('load', remeasureSoon, true);
		// Auto layout caps the natural width at the container, so a resized
		// window can change what "full width" means.
		window.addEventListener('resize', remeasureSoon);
		// Web-font swap changes text metrics.
		if (document.fonts && document.fonts.ready && document.fonts.ready.then) {
			document.fonts.ready.then(remeasureSoon);
		}
		// Hide Tokens toggles a whole column on/off (same anchor cell IIFE #1
		// uses — the FIRST checkbox row of the features table).
		var tokensCell = document.querySelector(
			'[data-tpt-id="TaskTableFeatures"] .table-progress-checkbox-cell'
		);
		if (tokensCell) {
			new MutationObserver(remeasureSoon).observe(tokensCell, {
				attributes: true,
				attributeFilter: ['data-sort-value']
			});
		}
	}

	function applyVisibility(table, enabled) {
		// Never apply to the features table itself.
		if (table.getAttribute('data-tpt-id') === 'TaskTableFeatures') return;

		injectStyle();
		var model = buildModel(table);
		if (!model.rows.length) return;

		if (!enabled) {
			model.rows.forEach(function (r) { r.rowEl.style.display = ''; });
			removeGapRows(table);
			removeWidthPin(table);
			return;
		}

		var visible = computeVisibleSet(model);
		model.rows.forEach(function (r) {
			r.rowEl.style.display = visible[r.taskId] === 1 ? '' : 'none';
		});
		// When every task is completed, the "All tasks completed!" banner replaces
		// any need for gap-row indicators (we don't want a redundant "... N hidden ..."
		// below the banner).
		var allCompleted = true;
		for (var i = 0; i < model.rows.length; i++) {
			if (model.rows[i].checkboxCell.getAttribute('data-sort-value') !== '1') {
				allCompleted = false;
				break;
			}
		}
		if (model.rows.length === 0 || allCompleted) {
			removeGapRows(table);
		} else {
			insertGapRows(table, model, visible);
		}
		// Pin AFTER hiding — the measurement itself is hide-state independent
		// (it un-hides while measuring), this just keeps the pinned widths the
		// last style write of the pass.
		ensureWidthPin(table);
	}

	function applyAll(enabled) {
		document.querySelectorAll('table.taskTable').forEach(function (t) {
			applyVisibility(t, enabled);
		});
	}

	function setupTableMutationListener(featureCell) {
		// Re-apply when any task's checkbox state changes (so unchecking a
		// completed task re-expands its hidden predecessors).
		document.querySelectorAll('table.taskTable').forEach(function (table) {
			if (table.getAttribute('data-tpt-id') === 'TaskTableFeatures') return;
			if (table._mmwtHideAttached) return;
			table._mmwtHideAttached = true;

			function attachCellObserver(cell) {
				if (cell._mmwtHideObserved) return;
				cell._mmwtHideObserved = true;
				new MutationObserver(function () {
					if (featureCell.getAttribute('data-sort-value') === '1') {
						applyVisibility(table, true);
					}
				}).observe(cell, { attributes: true, attributeFilter: ['data-sort-value'] });
			}

			table.querySelectorAll('.table-progress-checkbox-cell').forEach(attachCellObserver);

			// Watch for late-added cells (Tracker populate) AND for row reorder
			// (sortable). Skip gap rows our own code injects to avoid feedback loop.
			new MutationObserver(function (mutations) {
				var saw = false;
				mutations.forEach(function (m) {
					var checkNodes = function (nodes) {
						nodes && nodes.forEach(function (n) {
							if (!(n instanceof HTMLElement)) return;
							if (n.classList && n.classList.contains(GAP_ROW_CLASS)) return;
							saw = true;
							if (n.classList && n.classList.contains('table-progress-checkbox-cell')) {
								attachCellObserver(n);
							}
							n.querySelectorAll && n.querySelectorAll('.table-progress-checkbox-cell').forEach(attachCellObserver);
						});
					};
					checkNodes(m.addedNodes);
					checkNodes(m.removedNodes);
				});
				if (saw && featureCell.getAttribute('data-sort-value') === '1') {
					applyVisibility(table, true);
				}
			}).observe(table, { childList: true, subtree: true });
		});
	}

	function init() {
		// Locate the feature checkbox. It may not exist yet (Tracker async populate).
		var featureCheckbox = document.querySelector(
			'[data-tpt-id="TaskTableFeatures"] [data-tpt-row-id="' + FEATURE_ROW_ID + '"]'
		);
		var featureCell = featureCheckbox && featureCheckbox.closest('.table-progress-checkbox-cell');
		if (!featureCell) {
			// Try later (Tracker may inject the row).
			setTimeout(init, 500);
			return;
		}

		function refresh() {
			var enabled = featureCell.getAttribute('data-sort-value') === '1';
			applyAll(enabled);
		}

		// Initial paint
		refresh();

		// Feature toggle
		new MutationObserver(refresh).observe(featureCell, {
			attributes: true,
			attributeFilter: ['data-sort-value']
		});

		// Re-apply when individual task checkboxes change.
		setupTableMutationListener(featureCell);

		// Page-level observer for new task tables (Tracker / SPA navigation).
		new MutationObserver(function (mutations) {
			var sawNewTable = false;
			mutations.forEach(function (m) {
				m.addedNodes && m.addedNodes.forEach(function (n) {
					if (!(n instanceof HTMLElement)) return;
					if (n.matches && n.matches('table.taskTable')) sawNewTable = true;
					if (n.querySelector && n.querySelector('table.taskTable')) sawNewTable = true;
				});
			});
			if (sawNewTable) {
				setupTableMutationListener(featureCell);
				if (featureCell.getAttribute('data-sort-value') === '1') applyAll(true);
			}
		}).observe(document.documentElement || document.body, { childList: true, subtree: true });
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();


/* ============================================================================
 * #4 — Show Table of Active Tasks
 * Feature checkbox-driven. Renders a dynamic table directly above each main
 * task table. Active = uncompleted AND (Needs empty OR all Needs completed).
 * Mockup checkboxes proxy clicks to the original Tracker-bound inputs so the
 * server-side state stays canonical.
 * ========================================================================== */
(function () {
	'use strict';

	var FEATURE_ROW_ID = 'Show Table of Active Tasks';
	var WRAPPER_CLASS = 'mmwt-active-tasks-wrapper';
	var TABLE_CLASS = 'mmwt-active-tasks-table';
	var HEADING_CLASS = 'mmwt-active-heading';
	var TITLE_CLASS = 'mmwt-active-title';
	var PILL_CLASS = 'mmwt-active-pill';
	var LOCK_PILL_CLASS = 'mmwt-active-lock-pill';
	var BRANCH_TAG_CLASS = 'mmwt-branch-tag';
	var UNDO_BTN_CLASS = 'mmwt-undo-btn';
	var PILL_PULSE_CLASS = 'mmwt-active-pill-pulse';
	var SPINNER_CLASS = 'mmwt-active-spinner';
	var FADE_OUT_CLASS = 'mmwt-active-row-fading';
	var SWAP_OUT_CLASS = 'mmwt-active-row-swapping';
	var SWAP_IN_CLASS = 'mmwt-active-row-swapped-in';
	var STYLE_ID = 'mmwt-active-tasks-style';
	var INIT_GRACE_MS = 2000;   // Tracker async populate window
	var FADE_TOTAL_MS = 700;    // strikethrough + fade-out total duration
	var SWAP_HALF_MS = 150;     // fade-out / fade-in halves of the in-place swap
	var TASK_ATTR = 'data-mmwt-task';

	// ── Foreshadow Upcoming Tasks (sub-feature) ─────────────────────────────
	var FS_FEATURE_ROW_ID = 'Foreshadow Upcoming Tasks';
	var FS_ROW_CLASS = 'mmwt-fs-row';
	var FS_LOCK_ROW_CLASS = 'mmwt-fs-lock-row';
	var FS_HL_CLASS = 'mmwt-fs-highlight';
	var FS_ARROW_CLASS = 'mmwt-fs-arrow';
	var FS_GAP_ROW_CLASS = 'mmwt-fs-gap-row';
	var FS_INLINE_CLASS = 'mmwt-fs-inline';
	var FS_SEP_CLASS = 'mmwt-fs-sep';
	var FS_SOURCE_ATTR = 'data-mmwt-fs-source';
	var FS_TASK_ATTR = 'data-mmwt-fs-task';
	var FS_MAX_DEPTH = 6;
	var FS_STORE_KEY = 'mmwtFsCollapsed:' + location.pathname;

	var FEATURE_INIT_TIME = 0;
	var GRACE_RENDER_SCHEDULED = false;

	function injectStyle() {
		if (document.getElementById(STYLE_ID)) return;
		var s = document.createElement('style');
		s.id = STYLE_ID;
		s.textContent = [
			// ── wrapper + heading ────────────────────────────────────────────
			'.' + WRAPPER_CLASS + '{margin:18px 0 24px 0;}',
			'.' + HEADING_CLASS + '{',
			'  display:flex;align-items:center;gap:10px;',
			'  margin:0 0 8px 0;',
			'  font-family:"Tisa Sans Pro","Trebuchet MS",sans-serif;',
			'}',
			'.' + TITLE_CLASS + '{',
			'  font-weight:bold;font-size:1.3em;color:#ffd479;',
			'  letter-spacing:0.4px;',
			'}',
			'.' + TITLE_CLASS + '::after{',
			'  content:"\\00b7";margin-left:10px;color:rgba(255,212,121,0.55);',
			'}',
			'.' + PILL_CLASS + '{',
			'  display:inline-flex;align-items:center;justify-content:center;',
			'  min-width:84px;min-height:18px;',
			'  padding:5px 14px;border-radius:999px;',
			'  background:linear-gradient(135deg,rgba(34,28,18,0.96),rgba(20,16,10,0.96));',
			'  color:#ffd479;font-weight:bold;font-size:0.95em;letter-spacing:0.4px;',
			'  line-height:1;',
			'  box-shadow:0 2px 8px rgba(0,0,0,0.45),',
			'             0 0 0 1px rgba(255,212,121,0.3),',
			'             inset 0 1px 0 rgba(255,212,121,0.18);',
			'  white-space:nowrap;',
			'  transition:transform 200ms ease-out;',
			'}',
			'.' + PILL_PULSE_CLASS + '{',
			'  animation:mmwt-active-pill-pulse 600ms ease-out;',
			'}',
			'@keyframes mmwt-active-pill-pulse{',
			'  0%{transform:scale(1);box-shadow:0 2px 8px rgba(0,0,0,0.45),0 0 0 1px rgba(255,212,121,0.3),inset 0 1px 0 rgba(255,212,121,0.18);}',
			'  35%{transform:scale(1.18);box-shadow:0 4px 14px rgba(255,180,40,0.6),0 0 0 2px rgba(255,212,121,0.6),inset 0 1px 0 rgba(255,212,121,0.35);}',
			'  100%{transform:scale(1);box-shadow:0 2px 8px rgba(0,0,0,0.45),0 0 0 1px rgba(255,212,121,0.3),inset 0 1px 0 rgba(255,212,121,0.18);}',
			'}',
			// ── spinner inside pill (initial Tracker grace) ──────────────────
			'.' + SPINNER_CLASS + '{',
			'  display:inline-block;width:13px;height:13px;',
			'  border:2px solid rgba(255,212,121,0.28);',
			'  border-top-color:rgba(255,212,121,0.9);',
			'  border-radius:50%;',
			'  animation:mmwt-active-spin 0.8s linear infinite;',
			'}',
			'@keyframes mmwt-active-spin{to{transform:rotate(360deg);}}',
			// ── row fade-out (strikethrough + collapse) ──────────────────────
			'.' + FADE_OUT_CLASS + ' td{',
			'  text-decoration:line-through !important;',
			'  text-decoration-color:rgba(255,212,121,0.85) !important;',
			'  text-decoration-thickness:2px !important;',
			'}',
			'.' + FADE_OUT_CLASS + '{',
			'  animation:mmwt-active-row-fade 700ms ease-out forwards;',
			'  pointer-events:none;',
			'}',
			'@keyframes mmwt-active-row-fade{',
			'  0%{opacity:1;}',
			'  45%{opacity:1;}',  // hold strikethrough
			'  100%{opacity:0;transform:translateY(-4px);}',
			'}',
			// ── linear-progression in-place swap (same <tr> stays, content cross-fades) ─
			'.' + SWAP_OUT_CLASS + '{',
			'  animation:mmwt-active-row-swap-out 150ms ease-out forwards;',
			'  pointer-events:none;',
			'}',
			'@keyframes mmwt-active-row-swap-out{',
			'  to{opacity:0;}',
			'}',
			'.' + SWAP_IN_CLASS + '{',
			'  animation:mmwt-active-row-swap-in 150ms ease-in;',
			'}',
			'@keyframes mmwt-active-row-swap-in{',
			'  from{opacity:0;}',
			'  to{opacity:1;}',
			'}',
			// ── lock pill (tasks remaining before time-locked content) ───────
			'.' + LOCK_PILL_CLASS + ' img{',
			'  width:16px;height:16px;object-fit:contain;',
			'  margin-left:6px;vertical-align:-3px;',
			'}',
			// ── branch tag: paper note beside each active row ─────────────────
			'.' + BRANCH_TAG_CLASS + '{',
			'  position:absolute;left:100%;top:50%;',
			'  transform:translateY(-50%) rotate(2.5deg);',
			'  margin-left:12px;',
			'  display:inline-flex;align-items:center;gap:5px;',
			'  padding:7px 11px;',
			'  background:linear-gradient(160deg,#f7e9c3,#e4cd97);',
			'  color:#5b4519;font-weight:bold;font-size:0.92em;line-height:1;',
			'  border-radius:3px;',
			'  box-shadow:0 2px 6px rgba(0,0,0,0.5),inset 0 0 0 1px rgba(91,69,25,0.25);',
			'  white-space:nowrap;cursor:default;',
			'}',
			// styled hover tooltip (native title attributes are banned on this wiki);
			// counter-rotated so it sits level despite the note tilt
			'.' + BRANCH_TAG_CLASS + '::after{',
			'  content:attr(data-tip);',
			'  position:absolute;bottom:calc(100% + 10px);right:0;',
			'  transform:rotate(-2.5deg);transform-origin:bottom right;',
			'  padding:6px 10px;border-radius:6px;',
			'  background:rgba(20,16,10,0.97);color:#ffd479;',
			'  font-size:12px;font-weight:bold;',
			'  white-space:normal;width:max-content;max-width:260px;text-align:left;',
			'  box-shadow:0 2px 8px rgba(0,0,0,0.5),0 0 0 1px rgba(255,212,121,0.3);',
			'  opacity:0;pointer-events:none;transition:opacity 120ms ease-out;',
			'}',
			'.' + BRANCH_TAG_CLASS + ':hover::after{opacity:1;}',
			// pin dot on top of the note
			'.' + BRANCH_TAG_CLASS + '::before{',
			'  content:"";position:absolute;top:-4px;left:50%;',
			'  width:7px;height:7px;border-radius:50%;',
			'  background:radial-gradient(circle at 30% 30%,#ffd479,#8a6a2f);',
			'  box-shadow:0 1px 2px rgba(0,0,0,0.6);',
			'  transform:translateX(-50%);',
			'}',
			'.' + BRANCH_TAG_CLASS + ' img{',
			'  width:14px;height:14px;object-fit:contain;',
			'}',
			'.' + BRANCH_TAG_CLASS + ' svg{',
			'  width:13px;height:13px;display:block;',
			'}',
			// ── undo button: revert the completed predecessor of an active row ─
			'.' + UNDO_BTN_CLASS + '{',
			'  position:absolute;right:4px;top:50%;transform:translateY(-50%);',
			'  width:26px;height:26px;border-radius:50%;',
			'  display:flex;align-items:center;justify-content:center;',
			'  cursor:pointer;color:#ffd479;',
			'  background:rgba(255,212,121,0.08);',
			'  box-shadow:inset 0 0 0 1px rgba(255,212,121,0.35);',
			'  user-select:none;',
			'  transition:background 120ms ease-out;',
			'}',
			'.' + UNDO_BTN_CLASS + ' svg{',
			'  width:14px;height:14px;display:block;',
			'}',
			'.' + UNDO_BTN_CLASS + ':hover{background:rgba(255,212,121,0.25);}',
			// styled hover tooltip (native title attributes are banned on this wiki)
			'.' + UNDO_BTN_CLASS + '::after{',
			'  content:"Reverts the previous task to uncompleted";',
			'  position:absolute;bottom:calc(100% + 9px);right:-6px;',
			'  padding:6px 10px;border-radius:6px;',
			'  background:rgba(20,16,10,0.97);color:#ffd479;',
			'  font-size:12px;font-weight:bold;white-space:nowrap;',
			'  box-shadow:0 2px 8px rgba(0,0,0,0.5),0 0 0 1px rgba(255,212,121,0.3);',
			'  opacity:0;pointer-events:none;transition:opacity 120ms ease-out;',
			'}',
			'.' + UNDO_BTN_CLASS + ':hover::after{opacity:1;}',
			// ── foreshadow sub-rows: compact dimmed preview of upcoming tasks ─
			'.' + FS_ROW_CLASS + '{opacity:0.72;}',
			// snappy hover: override any slower site-wide row/cell transitions
			'.' + FS_ROW_CLASS + ',',
			'.' + FS_ROW_CLASS + ' td{',
			'  transition:background-color 50ms ease-out,opacity 50ms ease-out !important;',
			'}',
			'.' + FS_ROW_CLASS + ' td{',
			'  padding-top:2px !important;padding-bottom:2px !important;',
			'  font-size:0.86em;line-height:1.3;',
			'  background:rgba(0,0,0,0.15);',
			'  border-top-width:0 !important;',
			'}',
			// rewards + tokens collapse onto one line; the Items cell keeps its
			// natural one-item-per-line layout
			'.' + FS_ROW_CLASS + ' td.' + FS_INLINE_CLASS + ' br{display:none;}',
			'.' + FS_ROW_CLASS + ' td.tokensColumn br{display:none;}',
			// dot separator standing in for the collapsed reward line breaks
			'.' + FS_ROW_CLASS + ' .' + FS_SEP_CLASS + '{margin:0 7px;color:rgba(255,212,121,0.55);font-weight:bold;}',
			'.' + FS_ROW_CLASS + ' td img{max-height:20px;width:auto;}',
			// tokens slightly smaller (zoom keeps the value badges aligned)
			'.' + FS_ROW_CLASS + ' td.tokensColumn{zoom:0.85;}',
			// token grid ships as repeat(3, …) → widen so all tokens fit one line
			'.' + FS_ROW_CLASS + ' .tokenGrid{grid-template-columns:repeat(8, 26px);}',
			// hover cross-highlight: all sub-rows of the same task light up together
			// (kept subtle — a faint tint plus full opacity)
			'.' + FS_ROW_CLASS + '.' + FS_HL_CLASS + '{opacity:0.95;}',
			'.' + FS_ROW_CLASS + '.' + FS_HL_CLASS + ' td{background:rgba(255,212,121,0.06);}',
			'.' + FS_ARROW_CLASS + '{',
			'  color:#ffd479;opacity:0.8;margin-right:5px;display:inline-block;',
			'}',
			// collapsed-group divider — same visual language as Hide Completed gaps
			'.' + FS_GAP_ROW_CLASS + ' td{',
			'  border-top:1px dotted rgba(255,212,121,0.45) !important;',
			'  border-bottom:1px dotted rgba(255,212,121,0.45) !important;',
			'  background:transparent !important;',
			'  padding:3px 0 !important;',
			'  cursor:pointer;',
			// double-clicking the toggle divider must not select surrounding text
			'  user-select:none;-webkit-user-select:none;',
			'}',
			'.' + FS_GAP_ROW_CLASS + ':hover td{',
			'  background:rgba(255,212,121,0.06) !important;',
			'}',
			'.' + FS_GAP_ROW_CLASS + ' td::after{',
			'  content:attr(data-mmwt-fs-gap-label);',
			'  display:block;text-align:center;',
			'  font-size:0.7em;font-style:italic;color:rgba(255,212,121,0.55);',
			'  letter-spacing:2px;line-height:1;',
			'}',
			// bare lock row: why the branch preview ends here — centered across the row
			'.' + FS_LOCK_ROW_CLASS + ' td{color:#ffd479;font-weight:bold;text-align:center;}',
			'.' + FS_LOCK_ROW_CLASS + ' td img{',
			'  width:16px;height:16px;object-fit:contain;vertical-align:-3px;margin-right:6px;',
			'}',
			// ── disable sortable affordance on cloned thead ──────────────────
			'.' + TABLE_CLASS + ' thead th{cursor:default !important;}',
			'.' + TABLE_CLASS + ' thead th.headerSort,',
			'.' + TABLE_CLASS + ' thead th.headerSortUp,',
			'.' + TABLE_CLASS + ' thead th.headerSortDown{',
			'  background-image:none !important;',
			'}'
		].join('');
		document.head.appendChild(s);
	}

	// ── Helpers (kept local to this IIFE for isolation) ─────────────────────

	function findColumnIndex(table, headerText) {
		var headerRow = table.querySelector('thead tr, tbody > tr, tr');
		if (!headerRow) return -1;
		var ths = headerRow.querySelectorAll('th');
		for (var i = 0; i < ths.length; i++) {
			if ((ths[i].textContent || '').trim() === headerText) return i;
		}
		return -1;
	}

	function rowTaskId(tr) {
		var span = tr.querySelector('span[id^="T"]');
		if (!span) return null;
		return (span.textContent || '').trim() || null;
	}

	function parseRefCell(td) {
		if (!td) return [];
		var ids = [];
		var seen = {};
		td.querySelectorAll('a[href^="#T"]').forEach(function (a) {
			var id = a.getAttribute('href').slice(2);
			if (id && !seen[id]) { seen[id] = 1; ids.push(id); }
		});
		if (!ids.length) {
			var text = (td.textContent || '');
			var re = /#(\d+)/g, m;
			while ((m = re.exec(text)) !== null) {
				if (!seen[m[1]]) { seen[m[1]] = 1; ids.push(m[1]); }
			}
		}
		return ids;
	}

	// Time-locked content marker: lock icon + unlock date (DD.MM.YYYY) in the
	// Items cell. The page keeps the icon after the date passes (e.g. staged
	// area waves already released), so a lock only counts while its date is in
	// the future. No parsable date next to the icon → conservatively locked.
	function rowIsTimeLocked(tr) {
		var lockImg = tr.querySelector('img[data-image-name="AreaLockedIcon.png"]');
		if (!lockImg) return false;
		var cell = lockImg.closest('td');
		var m = cell && (cell.textContent || '').match(/(\d{2})\.(\d{2})\.(\d{4})/);
		if (!m) return true;
		var unlock = new Date(+m[3], +m[2] - 1, +m[1]);
		return Date.now() < unlock.getTime();
	}

	function buildModel(table) {
		var needsIdx = findColumnIndex(table, 'Needs');
		var opensIdx = findColumnIndex(table, 'Opens');
		var rows = [];
		var byId = {};
		table.querySelectorAll('tbody > tr').forEach(function (tr) {
			var checkbox = tr.querySelector('.table-progress-checkbox-cell');
			if (!checkbox) return;
			var taskId = rowTaskId(tr);
			if (!taskId) return;
			var tds = tr.querySelectorAll(':scope > td');
			var needsTd = needsIdx >= 0 ? tds[needsIdx] : null;
			var opensTd = opensIdx >= 0 ? tds[opensIdx] : null;
			var entry = {
				taskId: taskId,
				rowEl: tr,
				checkboxCell: checkbox,
				needs: parseRefCell(needsTd),
				opens: parseRefCell(opensTd),
				completed: checkbox.getAttribute('data-sort-value') === '1',
				locked: rowIsTimeLocked(tr)
			};
			rows.push(entry);
			byId[taskId] = entry;
		});
		return { rows: rows, byId: byId };
	}

	// Branch outlook of one task: how many (uncompleted, doable) tasks lie on
	// this task's branch — itself included — following Opens edges until the
	// branch "end": a time-locked task (endsAtLock) or no more Opens (area end).
	// Traversal stops at locks AND at merge tasks whose other parent path is
	// gated by a lock (blocked) — those cannot be done before the unlock date
	// either. Completed tasks pass through without counting (merge points).
	// Note: branches that merge further down legitimately share their tail, so
	// per-branch counts can overlap (each note is true for its own branch).
	function computeBranchTag(model, taskId, blocked) {
		var seen = {};
		var queue = [taskId];
		var count = 0;
		var lockHit = false;
		while (queue.length) {
			var id = queue.shift();
			if (seen[id]) continue;
			seen[id] = 1;
			var t = model.byId[id];
			if (!t) continue;
			if (t.locked || (!t.completed && blocked(t.taskId, {}))) { lockHit = true; continue; }
			if (!t.completed) count++;
			for (var i = 0; i < t.opens.length; i++) queue.push(t.opens[i]);
		}
		return { count: count, lockHit: lockHit };
	}

	// Memoized "is this task gated by time-locked content" predicate: the task
	// is locked itself, or some uncompleted locked task sits anywhere in its
	// Needs ancestry.
	function makeBlockedFn(model) {
		var memo = {};
		return function blocked(id, stack) {
			if (memo[id] !== undefined) return memo[id];
			var t = model.byId[id];
			if (!t || stack[id]) return false;
			stack[id] = 1;
			var b = false;
			if (t.locked && !t.completed) {
				b = true;
			} else {
				for (var i = 0; i < t.needs.length; i++) {
					var n = model.byId[t.needs[i]];
					if (n && !n.completed && blocked(n.taskId, stack)) { b = true; break; }
				}
			}
			delete stack[id];
			memo[id] = b;
			return b;
		};
	}

	// Tasks the player can still complete before hitting time-locked content.
	// Returns null when the area has no time-locked tasks (pill not shown).
	function computeTasksUntilLocked(model, blocked) {
		var hasLocked = false;
		model.rows.forEach(function (r) { if (r.locked) hasLocked = true; });
		if (!hasLocked) return null;
		var count = 0;
		model.rows.forEach(function (r) {
			if (!r.completed && !blocked(r.taskId, {})) count++;
		});
		return count;
	}

	// Active = uncompleted AND (no Needs OR all Needs completed)
	function computeActiveTasks(model) {
		var completedIds = {};
		model.rows.forEach(function (r) {
			if (r.completed) completedIds[r.taskId] = 1;
		});
		return model.rows.filter(function (r) {
			if (r.completed) return false;
			if (r.needs.length === 0) return true;
			for (var i = 0; i < r.needs.length; i++) {
				if (!completedIds[r.needs[i]]) return false;
			}
			return true;
		});
	}

	// ── Foreshadow Upcoming Tasks ───────────────────────────────────────────
	// Preview of what lies ahead: under every active row, show the tasks up to
	// FS_MAX_DEPTH Opens-steps ahead, covering ALL branches. Completed tasks
	// pass through for free (not shown, no depth spent) — same philosophy as
	// the branch tags. Sub-rows are compact clones of the main-table rows, so
	// the column grid stays aligned with the active table.

	function isForeshadowEnabled() {
		var input = document.querySelector(
			'[data-tpt-id="TaskTableFeatures"] [data-tpt-row-id="' + FS_FEATURE_ROW_ID + '"]'
		);
		var cell = input && input.closest('.table-progress-checkbox-cell');
		return !!(cell && cell.getAttribute('data-sort-value') === '1');
	}

	// The template row is prefixed with a {{SubArrow}} glyph that may end up in
	// the Tracker row id, so match by substring.
	function isIgnoreLocksEnabled() {
		var input = document.querySelector(
			'[data-tpt-id="TaskTableFeatures"] [data-tpt-row-id*="Ignore Time Locks"]'
		);
		var cell = input && input.closest('.table-progress-checkbox-cell');
		return !!(cell && cell.getAttribute('data-sort-value') === '1');
	}

	// The "Ignore Time Locks" template sub-row ships hidden (class "dnone");
	// reveal it only on pages that have ACTIVE (unexpired) time locks.
	function updateIgnoreLocksRowVisibility(hasActiveLocks) {
		document.querySelectorAll('[data-tpt-id="TaskTableFeatures"] tr.subRow').forEach(function (tr) {
			if ((tr.textContent || '').indexOf('Ignore Time Locks') === -1) return;
			if (hasActiveLocks) tr.classList.remove('dnone');
			else tr.classList.add('dnone');
		});
	}

	function readFsCollapsed() {
		try {
			var s = localStorage.getItem(FS_STORE_KEY);
			return s ? JSON.parse(s) : {};
		} catch (e) { return {}; }
	}

	function writeFsCollapsed(map) {
		try { localStorage.setItem(FS_STORE_KEY, JSON.stringify(map)); } catch (e) {}
	}

	// Unlock date text next to the lock icon (format already validated by
	// rowIsTimeLocked; empty string when the cell carries no parsable date).
	function lockDateText(tr) {
		var lockImg = tr.querySelector('img[data-image-name="AreaLockedIcon.png"]');
		var cell = lockImg && lockImg.closest('td');
		var m = cell && (cell.textContent || '').match(/(\d{2})\.(\d{2})\.(\d{4})/);
		return m ? m[0] : '';
	}

	// BFS over Opens edges from one active task. Returns render entries:
	//   { task, depth }                — upcoming task to preview
	//   { task, depth, lockEnd: true } — branch preview ends here in a time lock
	// With ignoreLocks on, locked tasks render as regular entries (the caller
	// marks them with an inline lock icon) and the walk continues through them.
	function computeForeshadow(model, sourceId, blocked, ignoreLocks) {
		var entries = [];
		var seen = {};
		seen[sourceId] = 1;
		var src = model.byId[sourceId];
		if (!src) return entries;
		var queue = [];
		for (var i = 0; i < src.opens.length; i++) queue.push({ id: src.opens[i], depth: 1 });
		while (queue.length) {
			var cur = queue.shift();
			if (cur.depth > FS_MAX_DEPTH) continue;
			if (seen[cur.id]) continue;
			seen[cur.id] = 1;
			var t = model.byId[cur.id];
			if (!t) continue;
			if (t.completed) {
				// completed tasks pass through for free (not shown, no depth spent)
				for (var j = 0; j < t.opens.length; j++) queue.push({ id: t.opens[j], depth: cur.depth });
				continue;
			}
			if (!ignoreLocks && (t.locked || blocked(t.taskId, {}))) {
				entries.push({ task: t, depth: cur.depth, lockEnd: true });
				continue; // the branch preview ends at the lock
			}
			entries.push({ task: t, depth: cur.depth });
			for (var k = 0; k < t.opens.length; k++) queue.push({ id: t.opens[k], depth: cur.depth + 1 });
		}
		return entries;
	}

	// "⤷" indent marker at the start of the Name cell, shifted by BFS depth.
	function prependFsIndent(td, depth) {
		var arrow = document.createElement('span');
		arrow.className = FS_ARROW_CLASS;
		arrow.textContent = '⤷';
		arrow.style.marginLeft = ((depth - 1) * 14) + 'px';
		td.insertBefore(arrow, td.firstChild);
	}

	// Compact clone of the main-table row: Needs/Opens cells emptied and the
	// checkbox cell stripped (tds stay for the column grid), name indented by
	// BFS depth. Lock-end entries render as a bare lock + unlock-date row —
	// the locked task itself stays hidden, only the reason is shown.
	function buildFsRow(entry, sourceId, mainTable, colIdx) {
		var tr = entry.task.rowEl.cloneNode(true);
		tr.classList.add(FS_ROW_CLASS);
		tr.removeAttribute('id');
		tr.setAttribute(FS_SOURCE_ATTR, sourceId);
		tr.setAttribute(FS_TASK_ATTR, entry.task.taskId);
		tr.querySelectorAll('span[id^="T"]').forEach(function (sp) {
			sp.removeAttribute('id');
		});
		// Promote lazyload placeholders to their real URLs so the browser fetches
		// all sub-row images in parallel right away — cloned placeholders would
		// otherwise trickle in one by one through the lazyload queue.
		tr.querySelectorAll('img').forEach(function (img) {
			var real = img.getAttribute('data-src');
			if (real) img.setAttribute('src', real);
			var realSet = img.getAttribute('data-srcset');
			if (realSet) img.setAttribute('srcset', realSet);
			img.classList.remove('lazyload', 'lazyloading');
			img.removeAttribute('loading');
		});
		var cb = tr.querySelector('.table-progress-checkbox-cell');
		if (cb) {
			cb.classList.remove('table-progress-checkbox-cell');
			cb.removeAttribute('data-tpt-row-id');
			cb.removeAttribute('data-sort-value');
			cb.textContent = '';
		}
		var tds = tr.querySelectorAll(':scope > td');
		var nameTd = colIdx.name >= 0 ? tds[colIdx.name] : tds[1];
		var needsTd = colIdx.needs >= 0 ? tds[colIdx.needs] : null;
		var opensTd = colIdx.opens >= 0 ? tds[colIdx.opens] : null;
		// One-line names: span the Name cell across the (unused) Needs and Opens
		// columns. Merge only when they directly follow it, so the cell removal
		// can never misalign the grid (cell order differs before/after the
		// Common.js Completed-column relocation).
		if (nameTd) {
			var span = 1;
			while (nameTd.nextElementSibling &&
				(nameTd.nextElementSibling === needsTd || nameTd.nextElementSibling === opensTd)) {
				tr.removeChild(nameTd.nextElementSibling);
				span++;
			}
			if (span > 1) nameTd.colSpan = span;
		}
		// Same for tokens: span under the (emptied) Completed column so the
		// token icons fit on one line.
		var tokensTd = null;
		for (var ti = 0; ti < tds.length; ti++) {
			if (tds[ti].classList.contains('tokensColumn')) { tokensTd = tds[ti]; break; }
		}
		if (tokensTd && cb && cb.parentNode && tokensTd.nextElementSibling === cb) {
			tr.removeChild(cb);
			tokensTd.colSpan = 2;
		}
		if (needsTd && needsTd.parentNode) needsTd.textContent = '';
		if (opensTd && opensTd.parentNode) opensTd.textContent = '';
		// Rewards layout follows the Items cell: when the row already spans two
		// lines (two requirement items), rewards stack naturally too (XP line +
		// item reward line). Single-line rows keep rewards inline — the item
		// reward is reduced to its icon (dual-anchor pattern: drop the text
		// anchor), because the name rarely fits next to the separator.
		var itemsTd = colIdx.items >= 0 ? tds[colIdx.items] : null;
		var multiLineItems = !!(itemsTd && itemsTd.parentNode && itemsTd.querySelector('br'));
		if (colIdx.rewards >= 0 && tds[colIdx.rewards] && tds[colIdx.rewards].parentNode && !multiLineItems) {
			var rewardsTd = tds[colIdx.rewards];
			rewardsTd.classList.add(FS_INLINE_CLASS);
			rewardsTd.querySelectorAll('.iconLinkWrap a').forEach(function (a) {
				if (!a.querySelector('img')) a.parentNode.removeChild(a);
			});
			// the line breaks between reward parts become visual separators
			rewardsTd.querySelectorAll('br').forEach(function (br) {
				var sep = document.createElement('span');
				sep.className = FS_SEP_CLASS;
				sep.textContent = '·';
				br.parentNode.replaceChild(sep, br);
			});
		}
		if (nameTd) {
			prependFsIndent(nameTd, entry.depth);
			if (entry.task.locked) {
				// visible only with Ignore Time Locks on — mark the task inline
				var icon = lockIconFor(mainTable);
				if (icon) nameTd.appendChild(icon);
			}
		}
		return tr;
	}

	// Store semantics: 1 = collapsed, 0 = explicitly expanded (blocks re-inheriting
	// from a collapsed predecessor), absent = default (may inherit on activation).
	function toggleFsCollapsed(sourceId, mainTable) {
		var collapsed = readFsCollapsed();
		collapsed[sourceId] = collapsed[sourceId] ? 0 : 1;
		writeFsCollapsed(collapsed);
		syncForeshadow(mainTable);
	}

	// The collapse state travels WITH the progression: an in-place swap (complete
	// → successor, or undo → predecessor) hands the outgoing task's state to the
	// incoming one instead of remembering every task forever.
	function transferFsState(fromId, toId) {
		if (!fromId || !toId || fromId === toId) return;
		var store = readFsCollapsed();
		if (!(fromId in store)) return;
		store[toId] = store[fromId];
		delete store[fromId];
		writeFsCollapsed(store);
	}

	// Bare lock divider: why the branch preview ends here — a single centered
	// cell across the whole row (no indent arrow, no task details).
	function buildFsLockRow(entry, sourceId, mainTable, colspan) {
		var tr = document.createElement('tr');
		tr.className = FS_ROW_CLASS + ' ' + FS_LOCK_ROW_CLASS;
		tr.setAttribute(FS_SOURCE_ATTR, sourceId);
		tr.setAttribute(FS_TASK_ATTR, entry.task.taskId);
		var td = document.createElement('td');
		td.colSpan = colspan;
		var icon = lockIconFor(mainTable);
		if (icon) td.appendChild(icon);
		var date = lockDateText(entry.task.rowEl);
		td.appendChild(document.createTextNode(
			date ? 'Locked until ' + date : 'Time-locked'
		));
		tr.appendChild(td);
		return tr;
	}

	// Divider row toggling a group — same visual language as the Hide Completed
	// gap rows. A collapsed group shows "⋯ Show upcoming tasks ⋯" in its place;
	// an expanded group ends with "⋯ Hide upcoming tasks ⋯". Click to toggle.
	function makeFsGapRow(label, sourceId, mainTable, colspan) {
		var gap = document.createElement('tr');
		gap.className = FS_ROW_CLASS + ' ' + FS_GAP_ROW_CLASS;
		gap.setAttribute(FS_SOURCE_ATTR, sourceId);
		var td = document.createElement('td');
		td.colSpan = colspan;
		td.setAttribute('data-mmwt-fs-gap-label', '⋯  ' + label + '  ⋯');
		gap.appendChild(td);
		gap.addEventListener('click', function (e) {
			e.preventDefault();
			e.stopPropagation();
			toggleFsCollapsed(sourceId, mainTable);
		});
		return gap;
	}

	// Delegated hover: entering any sub-row lights up ALL sub-rows of the same
	// task (branches can cross, so one task may preview under several sources).
	// Hoverless devices (mobile in desktop view) get a tap-toggle instead:
	// tapping a sub-row highlights its twins, tapping it again (or another
	// row) clears the highlight. Taps on links still navigate.
	function attachFsHover(tbody) {
		if (tbody._mmwtFsHover) return;
		tbody._mmwtFsHover = true;
		function twins(row) {
			var id = row.getAttribute(FS_TASK_ATTR);
			return id ? tbody.querySelectorAll('tr[' + FS_TASK_ATTR + '="' + id + '"]') : [];
		}
		var touchMode = window.matchMedia && window.matchMedia('(hover: none)').matches;
		if (touchMode) {
			tbody.addEventListener('click', function (e) {
				var row = e.target && e.target.closest && e.target.closest('tr.' + FS_ROW_CLASS);
				if (!row || !tbody.contains(row)) return;
				if (row.classList.contains(FS_GAP_ROW_CLASS)) return; // toggles collapse instead
				if (e.target.closest && e.target.closest('a')) return; // let item links navigate
				var turnOn = !row.classList.contains(FS_HL_CLASS);
				tbody.querySelectorAll('tr.' + FS_HL_CLASS).forEach(function (r) {
					r.classList.remove(FS_HL_CLASS);
				});
				if (turnOn) twins(row).forEach(function (r) { r.classList.add(FS_HL_CLASS); });
			});
			return;
		}
		tbody.addEventListener('mouseover', function (e) {
			var row = e.target && e.target.closest && e.target.closest('tr.' + FS_ROW_CLASS);
			if (!row || !tbody.contains(row)) return;
			twins(row).forEach(function (r) { r.classList.add(FS_HL_CLASS); });
		});
		tbody.addEventListener('mouseout', function (e) {
			var row = e.target && e.target.closest && e.target.closest('tr.' + FS_ROW_CLASS);
			if (!row) return;
			twins(row).forEach(function (r) { r.classList.remove(FS_HL_CLASS); });
		});
	}

	// Detach fs rows — cached group rows keep their references and get
	// re-inserted by syncForeshadow, so images stay loaded. Groups whose source
	// id is in keepIds stay in place (mid-swap rows keep their old group visible
	// for the whole animation instead of leaving a height gap).
	function removeFsRows(tbody, keepIds) {
		tbody.querySelectorAll('tr.' + FS_ROW_CLASS).forEach(function (r) {
			var src = r.getAttribute(FS_SOURCE_ATTR);
			if (keepIds && src && keepIds[src]) return;
			if (r.parentNode) r.parentNode.removeChild(r);
		});
	}

	// Post-render pass: (re)attach all foreshadow groups. Runs at the end of
	// renderActiveTable (which detaches fs rows up front so the diff/sort never
	// sees them), after an in-place swap completes, and when either foreshadow
	// toggle changes. Group rows are CACHED per source task and content
	// signature — an unchanged group re-inserts the very same DOM elements, so
	// its images never reload/redecode (a full re-clone made every image in
	// every group repaint one by one on each checkbox click).
	function syncForeshadow(mainTable, model, blocked) {
		var wrapper = findExistingWrapper(mainTable);
		if (!wrapper) return;
		var table = wrapper.querySelector('table.' + TABLE_CLASS);
		var tbody = table && table.querySelector('tbody');
		if (!tbody) return;
		// Mid-swap rows keep their old group in place — it holds the section
		// height through the animation and gets replaced atomically afterwards.
		var keepIds = {};
		Array.prototype.forEach.call(tbody.children, function (tr) {
			var kid = tr.getAttribute(TASK_ATTR);
			if (!kid) return;
			if (tr.classList.contains(SWAP_OUT_CLASS) || tr._mmwtSwapTarget) keepIds[kid] = 1;
		});
		removeFsRows(tbody, keepIds);
		if (!model) model = buildModel(mainTable);
		var hasActiveLocks = false;
		model.rows.forEach(function (r) { if (r.locked) hasActiveLocks = true; });
		updateIgnoreLocksRowVisibility(hasActiveLocks);
		if (!isForeshadowEnabled()) return;
		if (!blocked) blocked = makeBlockedFn(model);
		var ignoreLocks = hasActiveLocks && isIgnoreLocksEnabled();
		var store = readFsCollapsed();
		var storeDirty = false;
		var colIdx = {
			needs: findColumnIndex(mainTable, 'Needs'),
			opens: findColumnIndex(mainTable, 'Opens'),
			name: findColumnIndex(mainTable, 'Name'),
			rewards: findColumnIndex(mainTable, 'Rewards'),
			items: findColumnIndex(mainTable, 'Items')
		};
		var colspan = table.querySelectorAll('thead th').length || 8;
		var cache = tbody._mmwtFsCache || (tbody._mmwtFsCache = {});
		attachFsHover(tbody);
		Array.prototype.slice.call(tbody.children).forEach(function (tr) {
			var id = tr.getAttribute(TASK_ATTR);
			if (!id) return;
			if (tr.classList.contains(FADE_OUT_CLASS)) return;   // leaving the active set
			if (tr.classList.contains(SWAP_OUT_CLASS) || tr._mmwtSwapTarget) return; // mid-swap
			var entries = computeForeshadow(model, id, blocked, ignoreLocks);
			if (!entries.length) return;
			// Collapse inheritance: a freshly activated task (no stored state)
			// starts collapsed when the completed predecessor it came from was
			// collapsed. Explicit expands are stored as 0 and never re-inherit.
			if (!(id in store)) {
				var t = model.byId[id];
				for (var ni = 0; t && ni < t.needs.length; ni++) {
					var pred = model.byId[t.needs[ni]];
					if (pred && pred.completed && store[pred.taskId] === 1) {
						store[id] = 1;
						storeDirty = true;
						break;
					}
				}
			}
			var isCollapsed = store[id] === 1;
			// Content signature: any change here (entry set, lock state, collapse,
			// ignore-locks mode) invalidates the cached rows for this group.
			var sig = (isCollapsed ? 'C' : 'E') + (ignoreLocks ? 'I' : '') + '|'
				+ entries.map(function (e) {
					return e.task.taskId + (e.lockEnd ? 'L' : '') + (e.task.locked ? 'l' : '') + ':' + e.depth;
				}).join(',');
			var bySig = cache[id] || (cache[id] = {});
			var rows = bySig[sig];
			if (!rows) {
				rows = [];
				if (isCollapsed) {
					rows.push(makeFsGapRow('Show upcoming tasks', id, mainTable, colspan));
				} else {
					// collapse divider sits directly under the active row, above the group
					rows.push(makeFsGapRow('Hide upcoming tasks', id, mainTable, colspan));
					entries.forEach(function (entry) {
						rows.push(entry.lockEnd
							? buildFsLockRow(entry, id, mainTable, colspan)
							: buildFsRow(entry, id, mainTable, colIdx));
					});
				}
				bySig[sig] = rows;
			}
			var anchor = tr;
			rows.forEach(function (row) {
				anchor.parentNode.insertBefore(row, anchor.nextSibling);
				anchor = row;
			});
		});
		if (storeDirty) writeFsCollapsed(store);
		// Cached groups of no-longer-active tasks are kept on purpose: an undo
		// brings the task right back, and reusing the same rows means its images
		// don't reload. The cache lives only for the page's lifetime.
		// cloned token cells in the fresh sub-rows need the same visibility state
		applyTokenColumnSync(table);
	}

	// Re-sync foreshadow groups of every main table (toggle changes).
	function syncAllForeshadow() {
		if (!isFeatureEnabled()) return;
		document.querySelectorAll('table.taskTable').forEach(function (t) {
			if (t.getAttribute('data-tpt-id') === 'TaskTableFeatures') return;
			if (t.classList.contains(TABLE_CLASS)) return;
			syncForeshadow(t);
		});
	}

	// ── Hide Tokens column sync ─────────────────────────────────────────────
	function isHideTokensEnabled() {
		var input = document.querySelector(
			'[data-tpt-id="TaskTableFeatures"] [data-tpt-row-id="Hide Tokens column"]'
		);
		var cell = input && input.closest('.table-progress-checkbox-cell');
		return !!(cell && cell.getAttribute('data-sort-value') === '1');
	}

	function applyTokenColumnSync(activeTable) {
		var hide = isHideTokensEnabled();
		activeTable.querySelectorAll('.tokensColumn').forEach(function (cell) {
			cell.style.display = hide ? 'none' : '';
		});
	}

	// ── Column-width sync with the main table ───────────────────────────────
	// The active table is a separate <table>, so browser auto-layout re-derives
	// its column widths from its few (changing) rows — the table visibly jumps
	// around as tasks get checked off. Pin the clone to the main table instead:
	// table-layout:fixed + every header cell gets the measured width of its
	// counterpart in the main table.
	function syncColumnWidths(activeTable) {
		var wrapper = activeTable.closest('.' + WRAPPER_CLASS);
		var mainTable = wrapper && wrapper._mmwtMainTable;
		if (!mainTable) return;
		var mainThs = mainTable.querySelectorAll('thead th');
		var actThs = activeTable.querySelectorAll('thead th');
		if (!mainThs.length || mainThs.length !== actThs.length) return;
		activeTable.style.tableLayout = 'fixed';
		activeTable.style.width = mainTable.getBoundingClientRect().width + 'px';
		for (var i = 0; i < mainThs.length; i++) {
			var w = mainThs[i].getBoundingClientRect().width;
			// hidden columns (e.g. Hide Tokens) measure 0 — their clone is hidden too
			if (w > 0) actThs[i].style.width = w + 'px';
		}
	}

	// Keep the widths pinned when the MAIN table changes size (Hide Completed
	// toggles, lazy-loaded images, window/skin reflows).
	function attachWidthObserver(wrapper, mainTable) {
		if (wrapper._mmwtWidthObserved || typeof ResizeObserver === 'undefined') return;
		wrapper._mmwtWidthObserved = true;
		new ResizeObserver(function () {
			var t = wrapper.querySelector('table.' + TABLE_CLASS);
			if (t) syncColumnWidths(t);
		}).observe(mainTable);
	}

	// ── Wrapper / heading ───────────────────────────────────────────────────

	function findExistingWrapper(mainTable) {
		var existing = mainTable.previousElementSibling;
		if (existing && existing.classList && existing.classList.contains(WRAPPER_CLASS)
			&& existing._mmwtMainTable === mainTable) {
			return existing;
		}
		return null;
	}

	function ensureWrapper(mainTable) {
		var existing = findExistingWrapper(mainTable);
		if (existing) return existing;

		injectStyle();
		var wrapper = document.createElement('div');
		wrapper.className = WRAPPER_CLASS;
		wrapper._mmwtMainTable = mainTable;

		var heading = document.createElement('div');
		heading.className = HEADING_CLASS;
		var title = document.createElement('span');
		title.className = TITLE_CLASS;
		title.textContent = 'Active Tasks';
		heading.appendChild(title);
		var pill = document.createElement('span');
		pill.className = PILL_CLASS;
		pill.textContent = '…'; // initial: ellipsis until first render
		heading.appendChild(pill);
		wrapper.appendChild(heading);

		// Clone the main table's structure (header only — tbody is dynamic)
		var newTable = document.createElement('table');
		newTable.className = mainTable.className + ' ' + TABLE_CLASS;
		// Strip sortable behaviour from the clone — it's a small dynamic list
		newTable.classList.remove('sortable', 'jquery-tablesorter');

		var origThead = mainTable.querySelector('thead');
		if (origThead) {
			var clonedThead = origThead.cloneNode(true);
			// Remove tablesorter affordances on cloned headers
			clonedThead.querySelectorAll('th').forEach(function (th) {
				th.classList.remove('headerSort', 'headerSortUp', 'headerSortDown');
				th.removeAttribute('aria-sort');
				th.removeAttribute('tabindex');
			});
			newTable.appendChild(clonedThead);
		}
		var tbody = document.createElement('tbody');
		newTable.appendChild(tbody);
		wrapper.appendChild(newTable);

		mainTable.parentNode.insertBefore(wrapper, mainTable);
		attachWidthObserver(wrapper, mainTable);
		return wrapper;
	}

	function removeWrapper(mainTable) {
		var existing = findExistingWrapper(mainTable);
		if (existing && existing.parentNode) existing.parentNode.removeChild(existing);
	}

	function updatePill(pill, completedCount, totalCount) {
		var pct = totalCount > 0 ? Math.round(100 * completedCount / totalCount) : 0;
		var newText = completedCount + '/' + totalCount + ' (' + pct + '%)';
		if (pill.textContent === newText) return;
		pill.textContent = newText;
		// Re-trigger pulse animation (reflow trick)
		pill.classList.remove(PILL_PULSE_CLASS);
		void pill.offsetWidth;
		pill.classList.add(PILL_PULSE_CLASS);
	}

	function showLoadingPill(pill) {
		pill.textContent = '';
		pill.classList.remove(PILL_PULSE_CLASS);
		var spinner = document.createElement('span');
		spinner.className = SPINNER_CLASS;
		pill.appendChild(spinner);
	}

	// ── Lock pill ("N tasks until [lock]") ──────────────────────────────────
	// Shown only on areas that still have time-locked content. Counts the tasks
	// the player can complete before running into the locks.
	function lockIconFor(mainTable) {
		var src = mainTable.querySelector('img[data-image-name="AreaLockedIcon.png"]');
		if (!src) return null;
		var img = src.cloneNode(false);
		// lazyload clones keep the 1px placeholder in src — promote the real URL
		var real = img.getAttribute('data-src');
		if (real) img.setAttribute('src', real);
		img.removeAttribute('class');
		img.removeAttribute('width');
		img.removeAttribute('height');
		img.removeAttribute('loading');
		return img;
	}

	function updateLockPill(wrapper, mainTable, count) {
		var heading = wrapper.querySelector('.' + HEADING_CLASS);
		var pill = heading.querySelector('.' + LOCK_PILL_CLASS);
		if (count === null) {
			if (pill) pill.parentNode.removeChild(pill);
			return;
		}
		var label = count + (count === 1 ? ' task until' : ' tasks until');
		if (!pill) {
			pill = document.createElement('span');
			pill.className = PILL_CLASS + ' ' + LOCK_PILL_CLASS;
			heading.appendChild(pill);
		} else if (pill._mmwtLockLabel === label) {
			return;
		}
		pill._mmwtLockLabel = label;
		pill.textContent = label;
		var icon = lockIconFor(mainTable);
		if (icon) pill.appendChild(icon); else pill.textContent = label + ' unlock date';
		// Re-trigger pulse animation (reflow trick, same as the progress pill)
		pill.classList.remove(PILL_PULSE_CLASS);
		void pill.offsetWidth;
		pill.classList.add(PILL_PULSE_CLASS);
	}

	// ── Mockup checkbox proxying ────────────────────────────────────────────
	// Cloned cell HTML keeps the visual styling. We intercept clicks at the
	// cloned-cell level, prevent default, and forward to the original input
	// (which Tracker has wired up to the persistence backend).
	function proxyCheckboxCell(clonedCell, originalCell) {
		// Strip identifiers Tracker may use to bind to the cell
		clonedCell.removeAttribute('data-tpt-row-id');
		clonedCell.removeAttribute('id');
		// Mirror state attribute so any CSS selecting on it still works
		clonedCell.setAttribute('data-sort-value',
			originalCell.getAttribute('data-sort-value') || '0');

		// Disconnect any cloned input from form / Tracker plumbing
		clonedCell.querySelectorAll('input').forEach(function (input) {
			input.removeAttribute('name');
			input.removeAttribute('id');
			if (input.type === 'checkbox') {
				// The original is transiently disabled while Tracker persists a
				// write (e.g. right after the undo button unchecks it) — a row
				// cloned in that window would stay greyed out forever. The proxy
				// is display-only and forwards clicks anyway: never clone disabled.
				input.disabled = false;
				input.removeAttribute('disabled');
				input.checked = originalCell.getAttribute('data-sort-value') === '1';
				// Disable native interaction — outer click handler forwards
				input.addEventListener('click', function (e) {
					e.preventDefault();
					e.stopPropagation();
					var orig = originalCell.querySelector('input[type="checkbox"]');
					if (orig) orig.click();
				}, true);
			}
		});

		// Capture-phase click forwarder for clicks on label / span surrounding the input
		clonedCell.addEventListener('click', function (e) {
			// If click bubbled from the input we already handled, skip
			if (e.target && e.target.tagName === 'INPUT') return;
			// The undo button lives in this cell too and handles itself
			if (e.target && e.target.closest && e.target.closest('.' + UNDO_BTN_CLASS)) return;
			// The branch-tag paper note anchors in the row's LAST cell — which is
			// this very cell once Common.js moves Completed to the tail. Clicking
			// the note must not complete the task.
			if (e.target && e.target.closest && e.target.closest('.' + BRANCH_TAG_CLASS)) return;
			e.preventDefault();
			e.stopPropagation();
			var orig = originalCell.querySelector('input[type="checkbox"]');
			if (orig) orig.click();
		}, true);
	}

	// ── Render ──────────────────────────────────────────────────────────────

	function buildActiveRow(task) {
		var clonedRow = task.rowEl.cloneNode(true);
		clonedRow.setAttribute(TASK_ATTR, task.taskId);
		clonedRow.removeAttribute('id');
		// Strip any embedded <span id="T#"> id so the clone's anchor doesn't shadow original
		clonedRow.querySelectorAll('span[id^="T"]').forEach(function (sp) {
			sp.removeAttribute('id');
		});
		var clonedCell = clonedRow.querySelector('.table-progress-checkbox-cell');
		if (clonedCell) proxyCheckboxCell(clonedCell, task.checkboxCell);
		attachBranchTag(clonedRow, task);
		attachUndoButton(clonedRow, task);
		return clonedRow;
	}

	// Curved-arrow button inside the Completed cell of an active row: reverts
	// the row's completed predecessor(s) — unchecks the task's completed Needs
	// in the MAIN table via their original Tracker-wired checkboxes. The state
	// change re-renders the active set, so the row swaps back in place to the
	// predecessor. Entry tasks (no completed Needs) get no button. Data come
	// from task._undoNeeds (original checkbox cells), precomputed in render.
	function attachUndoButton(clonedRow, task) {
		var cells = task._undoNeeds;
		if (!cells || !cells.length) return;
		var anchor = clonedRow.querySelector('.table-progress-checkbox-cell');
		if (!anchor) return;
		anchor.style.position = 'relative';
		var btn = document.createElement('span');
		btn.className = UNDO_BTN_CLASS;
		btn.setAttribute('role', 'button');
		btn.setAttribute('aria-label', 'Revert the previous task');
		// inline SVG undo arrow: font glyphs (↩) have unreliable vertical metrics
		// across platforms and sat visibly off-centre in the circle
		btn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">'
			+ '<path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"/>'
			+ '</svg>';
		btn.addEventListener('click', function (e) {
			e.preventDefault();
			e.stopPropagation();
			cells.forEach(function (cell) {
				// only revert what is still marked completed (stale-row guard)
				if (cell.getAttribute('data-sort-value') !== '1') return;
				var input = cell.querySelector('input[type="checkbox"]');
				if (input) input.click();
			});
		});
		anchor.appendChild(btn);
	}

	// Paper-note tag beside the row: "N to [lock icon]" (branch runs into a
	// time lock) / "N to [flag]" (branch runs to the end of the area). The tag
	// lives inside the row's last cell (position:relative anchor), so it moves,
	// fades and swaps together with the row. Data come from task._branchTag,
	// precomputed in renderActiveTable (buildActiveRow itself has no model).
	function attachBranchTag(clonedRow, task) {
		var info = task._branchTag;
		if (!info || !info.count) return;
		var anchor = clonedRow.lastElementChild;
		if (!anchor) return;
		anchor.style.position = 'relative';
		var tag = document.createElement('span');
		tag.className = BRANCH_TAG_CLASS;
		tag.setAttribute('data-tip', info.lockHit
			? 'Tasks you can still complete on this branch before reaching its time-locked content'
			: 'Tasks remaining on this branch up to the end of the area');
		tag.appendChild(document.createTextNode(info.count + ' to '));
		var icon = info.lockHit && lockIconFor(task.rowEl.closest('table'));
		if (icon) {
			tag.appendChild(icon);
		} else if (info.lockHit) {
			tag.appendChild(document.createTextNode('unlock date'));
		} else {
			// checkered finish flag drawn in the note's own ink/paper colours
			// (the emoji renders as an ugly monochrome block on most platforms)
			var flag = document.createElement('span');
			flag.innerHTML = '<svg viewBox="0 0 14 14" aria-hidden="true">'
				+ '<rect x="2" y="1" width="1.3" height="12" rx="0.6" fill="#5b4519"/>'
				+ '<rect x="3.3" y="1.6" width="9.2" height="5.6" fill="#5b4519"/>'
				+ '<rect x="3.3" y="1.6" width="3.07" height="2.8" fill="#efdcb0"/>'
				+ '<rect x="9.43" y="1.6" width="3.07" height="2.8" fill="#efdcb0"/>'
				+ '<rect x="6.37" y="4.4" width="3.06" height="2.8" fill="#efdcb0"/>'
				+ '</svg>';
			tag.appendChild(flag.firstChild);
		}
		anchor.appendChild(tag);
	}

	// Linear-progression swap: 1 outgoing + 1 incoming → fade old content,
	// replace the <tr> in place at the same position, fade new content in.
	// User perceives "row stays, content changes" instead of "row gone, new row appears".
	// Re-entry safe: idempotent on same target (Tracker may double-write data-sort-value
	// per click → two observer fires per logical change), redirects on different target.
	function swapRowInPlace(oldRow, newTask) {
		// Idempotency: if already swapping to this exact target, let the in-flight
		// animation continue undisturbed. Without this guard a duplicate render
		// would restart the fade-out from opacity 1, producing a visible double-flash.
		if (oldRow._mmwtSwapTarget === newTask.taskId) return;

		if (oldRow._mmwtSwapTimer) {
			clearTimeout(oldRow._mmwtSwapTimer);
			oldRow._mmwtSwapTimer = null;
		}
		oldRow._mmwtSwapTarget = newTask.taskId;

		// Clear any leftover animation classes (e.g. SWAP_IN from previous swap completion)
		// before starting the new fade-out — leftover SWAP_IN would override the animation
		// property since it's later in stylesheet order.
		oldRow.classList.remove(SWAP_OUT_CLASS, SWAP_IN_CLASS, FADE_OUT_CLASS);
		void oldRow.offsetWidth;
		oldRow.classList.add(SWAP_OUT_CLASS);

		oldRow._mmwtSwapTimer = setTimeout(function () {
			oldRow._mmwtSwapTimer = null;
			if (!oldRow.parentNode) return;
			var newRow = buildActiveRow(newTask);
			newRow.classList.add(SWAP_IN_CLASS);
			oldRow.parentNode.replaceChild(newRow, oldRow);
			// Clean up SWAP_IN_CLASS exactly when the animation ends, NOT via fixed setTimeout.
			// A fixed timeout can drift into the still-running animation under load, which
			// causes the browser to recompute style and effectively re-trigger the animation
			// (visible as a second fade-in flash near the end). animationend is precise.
			var onEnd = function (e) {
				if (e.animationName !== 'mmwt-active-row-swap-in') return;
				newRow.classList.remove(SWAP_IN_CLASS);
				newRow.removeEventListener('animationend', onEnd);
			};
			newRow.addEventListener('animationend', onEnd);
			// The swapped-in task needs its own foreshadow group (fs rows were
			// dropped at render start); rebuild once the row is in the DOM. The
			// collapse state follows the progression in BOTH directions (complete
			// and undo are both in-place swaps).
			transferFsState(oldRow.getAttribute(TASK_ATTR), newTask.taskId);
			var mainTable = newTask.rowEl && newTask.rowEl.closest('table');
			if (mainTable) syncForeshadow(mainTable);
		}, SWAP_HALF_MS);
	}

	// Cancel an in-flight swap (state changed such that the swap target is no longer
	// the right answer). Resets row visual state so the regular diff can take over.
	function abortSwap(tr) {
		if (tr._mmwtSwapTimer) {
			clearTimeout(tr._mmwtSwapTimer);
			tr._mmwtSwapTimer = null;
		}
		tr._mmwtSwapTarget = null;
		tr.classList.remove(SWAP_OUT_CLASS);
		// Animation `forwards` may leave a computed opacity. Force a reflow so the
		// row resumes its default fully-opaque appearance.
		void tr.offsetWidth;
	}

	function renderActiveTable(mainTable) {
		var model = buildModel(mainTable);
		var totalCount = model.rows.length;
		var completedCount = 0;
		for (var i = 0; i < model.rows.length; i++) {
			if (model.rows[i].completed) completedCount++;
		}

		// All completed → remove wrapper entirely
		if (totalCount > 0 && completedCount === totalCount) {
			removeWrapper(mainTable);
			return;
		}

		var wrapper = ensureWrapper(mainTable);
		var table = wrapper.querySelector('table.' + TABLE_CLASS);
		var tbody = table.querySelector('tbody');
		var pill = wrapper.querySelector('.' + PILL_CLASS);

		updatePill(pill, completedCount, totalCount);
		var blocked = makeBlockedFn(model);
		updateLockPill(wrapper, mainTable, computeTasksUntilLocked(model, blocked));

		var activeTasks = computeActiveTasks(model);
		var newTaskIds = {};
		activeTasks.forEach(function (t) {
			newTaskIds[t.taskId] = 1;
			// branch outlook for the paper-note tag (consumed by buildActiveRow)
			t._branchTag = computeBranchTag(model, t.taskId, blocked);
			// original checkbox cells of completed predecessors (undo button)
			t._undoNeeds = t.needs.map(function (id) { return model.byId[id]; })
				.filter(function (n) { return n && n.completed; })
				.map(function (n) { return n.checkboxCell; });
		});

		// Diff vs current tbody children
		var existingRows = {};
		Array.prototype.forEach.call(tbody.children, function (tr) {
			var id = tr.getAttribute(TASK_ATTR);
			if (id) existingRows[id] = tr;
		});

		// Pre-pass: abort stale in-flight swaps. If a row is mid-swap towards a
		// target that's no longer in the active set (state changed during swap),
		// cancel the swap and let the regular diff handle it as outgoing.
		Array.prototype.forEach.call(tbody.children, function (tr) {
			if (tr._mmwtSwapTarget && !newTaskIds[tr._mmwtSwapTarget]) {
				abortSwap(tr);
			}
		});

		// Restoring: row is fading but task became active again → cancel fade
		activeTasks.forEach(function (task) {
			var tr = existingRows[task.taskId];
			if (tr && tr.classList.contains(FADE_OUT_CLASS)) {
				tr.classList.remove(FADE_OUT_CLASS);
			}
		});

		// Compute outgoing (rows that no longer belong, not yet animating).
		// Skip rows mid-swap (SWAP_OUT_CLASS) — their target is still valid (stale
		// targets were aborted in the pre-pass), the swap will resolve them.
		var outgoing = [];
		Object.keys(existingRows).forEach(function (id) {
			if (newTaskIds[id]) return;
			var tr = existingRows[id];
			if (tr.classList.contains(FADE_OUT_CLASS)) return; // already fading
			if (tr.classList.contains(SWAP_OUT_CLASS)) return; // mid-swap, valid target
			outgoing.push(tr);
		});

		// Build set of pending swap targets so we don't double-add an incoming row
		// for a task that's already being swapped in.
		var pendingSwapTargets = {};
		Array.prototype.forEach.call(tbody.children, function (tr) {
			if (tr._mmwtSwapTarget) pendingSwapTargets[tr._mmwtSwapTarget] = 1;
		});
		// Compute incoming (active tasks not currently in tbody and not pending swap targets)
		var incoming = activeTasks.filter(function (t) {
			if (existingRows[t.taskId]) return false;
			if (pendingSwapTargets[t.taskId]) return false;
			return true;
		});

		// Linear progression: exactly 1 in / 1 out → in-place content swap (same <tr>).
		// User perceives "row stays, content changes" rather than "fade out + new row appears".
		var linearSwap = (outgoing.length === 1 && incoming.length === 1);

		if (linearSwap) {
			// Foreshadow rows stay put during a linear swap (no sort runs) — the
			// old group keeps the section height until the swapped-in task's
			// group replaces it atomically in the post-swap sync.
			swapRowInPlace(outgoing[0], incoming[0]);
		} else {
			// Foreshadow rows must not participate in the append/sort below
			removeFsRows(tbody);
			// Regular outgoing: strikethrough + fade-out + remove
			outgoing.forEach(function (tr) {
				tr.classList.add(FADE_OUT_CLASS);
				setTimeout(function () {
					if (tr.parentNode && tr.classList.contains(FADE_OUT_CLASS)) {
						tr.parentNode.removeChild(tr);
					}
				}, FADE_TOTAL_MS);
			});
			// Regular incoming: append + later sort
			incoming.forEach(function (task) {
				tbody.appendChild(buildActiveRow(task));
			});
		}

		// Maintain numeric task ID ordering — but only when actually needed.
		// Calling tbody.appendChild on an existing child IS a DOM remove+re-insert
		// operation, which RESTARTS any CSS animations running on that element.
		// If we blindly sort on every render, a redundant render that fires during
		// a swap's fade-in (e.g. Tracker double-writes data-sort-value per click)
		// re-runs the appendChild loop and restarts the swap-in animation —
		// visible as a second fade-in flash near the end of the first animation.
		// Skip sort if (a) we're in linear-swap mode (preserve in-place animation)
		// or (b) tbody is already in correct order.
		if (!linearSwap) {
			var current = Array.prototype.slice.call(tbody.children);
			var sorted = current.slice().sort(function (a, b) {
				var aId = parseInt(a.getAttribute(TASK_ATTR) || '0', 10);
				var bId = parseInt(b.getAttribute(TASK_ATTR) || '0', 10);
				return aId - bId;
			});
			var inOrder = true;
			for (var k = 0; k < current.length; k++) {
				if (current[k] !== sorted[k]) { inOrder = false; break; }
			}
			if (!inOrder) {
				sorted.forEach(function (tr) { tbody.appendChild(tr); });
			}
		}

		// Rebuild foreshadow groups (also applies token sync to the sub-rows)
		syncForeshadow(mainTable, model, blocked);
		// Sync token-column visibility AFTER row inserts
		applyTokenColumnSync(table);
		// Pin column widths to the main table AFTER visibility sync (hidden
		// columns must measure 0 on both sides)
		syncColumnWidths(table);
	}

	// ── Wiring ──────────────────────────────────────────────────────────────

	function isFeatureEnabled() {
		var input = document.querySelector(
			'[data-tpt-id="TaskTableFeatures"] [data-tpt-row-id="' + FEATURE_ROW_ID + '"]'
		);
		var cell = input && input.closest('.table-progress-checkbox-cell');
		return !!(cell && cell.getAttribute('data-sort-value') === '1');
	}

	function refreshAll() {
		var enabled = isFeatureEnabled();
		document.querySelectorAll('table.taskTable').forEach(function (t) {
			if (t.getAttribute('data-tpt-id') === 'TaskTableFeatures') return;
			if (t.classList.contains(TABLE_CLASS)) return; // skip our own cloned active tables — would loop
			if (!enabled) {
				removeWrapper(t);
				return;
			}
			// During Tracker grace period, show spinner placeholder (saved state
			// is still being populated; the active set would be misleading).
			if (Date.now() - FEATURE_INIT_TIME < INIT_GRACE_MS) {
				var wrapper = ensureWrapper(t);
				var pill = wrapper.querySelector('.' + PILL_CLASS);
				showLoadingPill(pill);
				if (!GRACE_RENDER_SCHEDULED) {
					GRACE_RENDER_SCHEDULED = true;
					setTimeout(function () {
						GRACE_RENDER_SCHEDULED = false;
						if (isFeatureEnabled()) refreshAll();
					}, INIT_GRACE_MS - (Date.now() - FEATURE_INIT_TIME) + 50);
				}
			} else {
				renderActiveTable(t);
			}
		});
	}

	function setupTableObserver(table) {
		if (table.getAttribute('data-tpt-id') === 'TaskTableFeatures') return;
		if (table.classList.contains(TABLE_CLASS)) return; // our own cloned table — never observe
		if (table._mmwtActiveAttached) return;
		table._mmwtActiveAttached = true;

		function attachCellObserver(cell) {
			if (cell._mmwtActiveObserved) return;
			cell._mmwtActiveObserved = true;
			new MutationObserver(function () {
				if (!isFeatureEnabled()) return;
				// During init grace, defer to the post-grace bulk render
				if (Date.now() - FEATURE_INIT_TIME < INIT_GRACE_MS) return;
				renderActiveTable(table);
			}).observe(cell, { attributes: true, attributeFilter: ['data-sort-value'] });
		}

		table.querySelectorAll('.table-progress-checkbox-cell').forEach(attachCellObserver);

		// Watch for late-added cells (Tracker async populate). Only attach to
		// cells that belong to THIS main table (cloned cells in the active
		// wrapper would otherwise also match, creating a feedback loop).
		new MutationObserver(function (mutations) {
			mutations.forEach(function (m) {
				m.addedNodes && m.addedNodes.forEach(function (n) {
					if (!(n instanceof HTMLElement)) return;
					if (n.classList && n.classList.contains('table-progress-checkbox-cell')) {
						if (n.closest('table') === table) attachCellObserver(n);
					}
					n.querySelectorAll && n.querySelectorAll('.table-progress-checkbox-cell').forEach(function (c) {
						if (c.closest('table') === table) attachCellObserver(c);
					});
				});
			});
		}).observe(table, { childList: true, subtree: true });
	}

	function setupFeatureToggleObserver() {
		var input = document.querySelector(
			'[data-tpt-id="TaskTableFeatures"] [data-tpt-row-id="' + FEATURE_ROW_ID + '"]'
		);
		var cell = input && input.closest('.table-progress-checkbox-cell');
		if (!cell) {
			setTimeout(setupFeatureToggleObserver, 500);
			return;
		}
		if (!cell._mmwtActiveFeatureObserved) {
			cell._mmwtActiveFeatureObserved = true;
			new MutationObserver(refreshAll).observe(cell, {
				attributes: true, attributeFilter: ['data-sort-value']
			});
		}
		// Also observe Hide Tokens column toggle so we can sync the active table
		var tokensInput = document.querySelector(
			'[data-tpt-id="TaskTableFeatures"] [data-tpt-row-id="Hide Tokens column"]'
		);
		var tokensCell = tokensInput && tokensInput.closest('.table-progress-checkbox-cell');
		if (tokensCell && !tokensCell._mmwtActiveTokensObserved) {
			tokensCell._mmwtActiveTokensObserved = true;
			new MutationObserver(function () {
				if (!isFeatureEnabled()) return;
				document.querySelectorAll('table.' + TABLE_CLASS).forEach(function (t) {
					applyTokenColumnSync(t);
					syncColumnWidths(t);
				});
			}).observe(tokensCell, { attributes: true, attributeFilter: ['data-sort-value'] });
		}
		// Foreshadow toggles (main + "Ignore Time Locks" sub-row): rebuild the
		// foreshadow groups of every main table on change.
		[
			'[data-tpt-id="TaskTableFeatures"] [data-tpt-row-id="' + FS_FEATURE_ROW_ID + '"]',
			'[data-tpt-id="TaskTableFeatures"] [data-tpt-row-id*="Ignore Time Locks"]'
		].forEach(function (selector) {
			var fsInput = document.querySelector(selector);
			var fsCell = fsInput && fsInput.closest('.table-progress-checkbox-cell');
			if (fsCell && !fsCell._mmwtFsObserved) {
				fsCell._mmwtFsObserved = true;
				new MutationObserver(syncAllForeshadow).observe(fsCell, {
					attributes: true, attributeFilter: ['data-sort-value']
				});
			}
		});
	}

	function init() {
		FEATURE_INIT_TIME = Date.now();
		document.querySelectorAll('table.taskTable').forEach(setupTableObserver);
		setupFeatureToggleObserver();
		refreshAll();

		// Watch for new task tables (Tracker / SPA navigation). Skip our own
		// cloned active tables — they have TABLE_CLASS, getting them through here
		// would loop (refreshAll → renderActiveTable → ensureWrapper around a
		// table that's already inside a wrapper → infinite wrapper nesting).
		new MutationObserver(function (mutations) {
			var sawNewTable = false;
			function consider(t) {
				if (!t || t.classList.contains(TABLE_CLASS)) return;
				setupTableObserver(t);
				sawNewTable = true;
			}
			mutations.forEach(function (m) {
				m.addedNodes && m.addedNodes.forEach(function (n) {
					if (!(n instanceof HTMLElement)) return;
					if (n.matches && n.matches('table.taskTable')) consider(n);
					n.querySelectorAll && n.querySelectorAll('table.taskTable').forEach(consider);
				});
			});
			if (sawNewTable) refreshAll();
		}).observe(document.documentElement || document.body, { childList: true, subtree: true });
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();