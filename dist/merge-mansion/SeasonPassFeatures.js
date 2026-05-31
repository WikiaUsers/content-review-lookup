/**
 * MediaWiki:SeasonPassFeatures.js
 *
 * Compact view for Season Pass rewards tables (template: SeasonPassRewardsFeatures).
 *
 * When the "Compact view" checkbox is checked (state persisted per-user via Fandom
 * Tracker on the {{SeasonPassRewardsFeatures}} template), strips chain-name text
 * anchors from F2P / Silver Pass / Gold Pass reward columns across ALL Season Pass
 * rewards tables on the page (= Buzzing with Purpose has 2: Standard + Test variant).
 *
 * Cells keep:
 *   - Number text before icon (e.g. "10 m", "1 h")
 *   - Image icon (preserved via anchor → <img> unwrap)
 *   - Trailing text not inside any anchor (e.g. "/day", "300 Event Points")
 * Cells lose:
 *   - Text anchors with item display name (e.g. "Hourglass (L1)", "Decoration #1")
 *
 * Level 0 row is intentionally skipped (= contains complex pure-text rewards that
 * should stay untouched per user spec).
 *
 * Reversible: original cell HTML is captured before first compactify and restored
 * when checkbox unchecks. Multiple toggle cycles are idempotent.
 *
 * State sync via MutationObserver on the toggle cell's data-sort-value attribute
 * (= Tracker writes "1"/"0" there after async server state restore).
 *
 * v1.0 (2026-05-25)
 */

(function () {
    'use strict';

    mw.hook('wikipage.content').add(function ($content) {
        const root = $content && $content[0];
        if (!root || !root.querySelector) return;

        // 1. Find the Compact view toggle (rendered by Template:SeasonPassRewardsFeatures).
        //    Looks for: <input data-tpt-row-id="Compact view" data-table-id="SPRewards">
        const toggleInput = root.querySelector('input[data-tpt-row-id="Compact view"][data-table-id="SPRewards"]');
        if (!toggleInput) return;
        const toggleCell = toggleInput.closest('.table-progress-checkbox-cell');
        if (!toggleCell) {
            console.warn('[SeasonPassFeatures] Toggle input found but no .table-progress-checkbox-cell ancestor; aborting');
            return;
        }

        // 2. Locate all reward tables on the page.
        //    Signature: <table class="article-table"> with at least one <th> matching
        //    /(F2P|Silver Pass|Gold Pass)\s+Reward/i. Skip the toggle table itself
        //    (= .table-progress-tracking class added by Template:TableTracker wrapper).
        const rewardTables = [];
        const allTables = root.querySelectorAll('table');
        allTables.forEach(function (t) {
            if (t.classList.contains('table-progress-tracking')) return;
            const ths = t.querySelectorAll(':scope > tbody > tr > th, :scope > tr > th');
            const rewardCols = [];
            ths.forEach(function (th, i) {
                const txt = (th.textContent || '').replace(/\s+/g, ' ').trim();
                if (/(F2P|Silver Pass|Gold Pass)\s+Reward/i.test(txt)) rewardCols.push(i);
            });
            if (rewardCols.length) rewardTables.push({ table: t, rewardCols: rewardCols });
        });
        if (!rewardTables.length) {
            console.log('[SeasonPassFeatures] No Season Pass rewards tables on this page; nothing to do');
            return;
        }
        console.log('[SeasonPassFeatures] Found ' + rewardTables.length + ' reward table(s)');

        // 3. Capture original cell HTML per reward cell (= for reversibility on uncheck).
        //    Skip level-0 rows entirely (= per spec, they stay untouched).
        function eachRewardCell(callback) {
            rewardTables.forEach(function (entry) {
                const rows = entry.table.querySelectorAll(':scope > tbody > tr, :scope > tr');
                rows.forEach(function (tr) {
                    if (tr.querySelector(':scope > th')) return; // header row
                    const tds = tr.querySelectorAll(':scope > td');
                    if (!tds.length) return;
                    // Level 0 detection: first cell text content equals "0"
                    const firstText = (tds[0].textContent || '').trim();
                    if (firstText === '0') return;
                    entry.rewardCols.forEach(function (ci) {
                        const cell = tds[ci];
                        if (cell) callback(cell);
                    });
                });
            });
        }

        eachRewardCell(function (cell) {
            if (cell.dataset.spfOriginalHtml === undefined) {
                cell.dataset.spfOriginalHtml = cell.innerHTML;
            }
        });

        // 4. Compactify rule: for each <a> in cell, if it contains <img>, replace anchor
        //    with the <img> element (= drops link text but preserves icon inside its
        //    imgSize wrapper ancestor). If anchor is pure text (no img), remove it.
        //    Text nodes outside anchors stay (= number prefixes, "/day" suffixes).
        function compactifyCell(cell) {
            // 4a. Anchor strip:
            //   - Pure-text anchor (no <img> child) → remove entirely
            //   - Icon anchor (contains <img>) → KEEP as-is so the icon stays clickable
            //     (= linkable to the chain page like it was in the non-compact view)
            const anchors = cell.querySelectorAll('a');
            anchors.forEach(function (a) {
                if (!a.querySelector('img')) a.remove();
            });
            // 4b. Decoration description label — rendered as <div class="decorationDesc">
            // outside any anchor (= "Decoration #1", "Decoration #2", ...). Remove the
            // div entirely so only the decoration image remains in compact view.
            cell.querySelectorAll('.decorationDesc').forEach(function (el) { el.remove(); });
        }

        function applyCompact() {
            eachRewardCell(function (cell) {
                // Always start from original HTML to avoid double-stripping artefacts
                // when MutationObserver fires multiple times for the same state.
                if (cell.dataset.spfOriginalHtml !== undefined) {
                    cell.innerHTML = cell.dataset.spfOriginalHtml;
                }
                compactifyCell(cell);
            });
        }

        function revertCompact() {
            eachRewardCell(function (cell) {
                if (cell.dataset.spfOriginalHtml !== undefined) {
                    cell.innerHTML = cell.dataset.spfOriginalHtml;
                }
            });
        }

        // 5. Sync state. lastState tracks the last applied state to avoid redundant work
        //    on multiple Tracker writes per click (= Tracker writes data-sort-value 2x:
        //    optimistic + server-confirmed). See memory/wiki-js-debugging.md gotcha #1.
        let lastState = null;
        function sync() {
            const checked = (toggleCell.dataset.sortValue === '1');
            if (checked === lastState) return;
            lastState = checked;
            if (checked) {
                console.log('[SeasonPassFeatures] applying compact view');
                applyCompact();
            } else {
                console.log('[SeasonPassFeatures] reverting to original');
                revertCompact();
            }
        }

        // 6. MutationObserver on the toggle cell. Tracker JS restores per-user state
        //    asynchronously after page load — initial data-sort-value="0" gets updated
        //    to "1" when the user has previously enabled it. Without the observer, the
        //    compact view wouldn't apply on hard refresh until the user clicks again.
        const observer = new MutationObserver(sync);
        observer.observe(toggleCell, { attributes: true, attributeFilter: ['data-sort-value'] });

        // 7. Initial sync — in case state is already "1" by the time we attach (rare
        //    race; usually MutationObserver catches the lazy state update).
        sync();
    });
})();