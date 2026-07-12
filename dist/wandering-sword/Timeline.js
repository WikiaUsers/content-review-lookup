/*
 * Timeline quest-column auto-classifier
 * ---------------------------------------------------------------
 * Runs live in the browser on every page load. Walks each row of
 * table.ws-timeline and, for the Sidequest / Companion Quest /
 * Affiliation columns ONLY, adds the matching class (c-side /
 * c-comp / c-aff) to any cell that:
 *   - has no class attribute at all (nothing manually set), AND
 *   - has real text content (not empty/whitespace-only), AND
 *   - contains no manually-added <div> or <span> (treated as a
 *     deliberate custom styling choice, left alone).
 *
 * A cell that already carries ANY class — correct, wrong, or a
 * deliberate exception like a stray c-bonusA sitting in the
 * Companion column — is never touched. This applies fresh on every
 * page render, straight from the current wikitext, so there is no
 * stale state to clean up: if a cell's text is later removed, the
 * very next page load simply won't inject anything for it.
 */
(function () {
    'use strict';

    // Logical column (1-based, Main Quest = 1) -> class to inject.
    // Only these three columns are ever touched.
    var COLUMN_CLASS = { 2: 'c-side', 3: 'c-comp', 4: 'c-aff' };

    function isEligibleForInjection(cell) {
        if (cell.className && cell.className.trim() !== '') return false; // rule 1: manual class present, never touch
        if (cell.querySelector('div, span')) return false;                // manual div/span customization, never touch
        var text = cell.textContent.replace(/\s+/g, '').trim();
        return text.length > 0;                                           // rule 2/3: only inject if there's real content
    }

    function classifyTable(table) {
        var rows = table.querySelectorAll(':scope > tbody > tr, :scope > tr');
        // Tracks, per logical column index, how many more rows a prior
        // rowspan still reserves (standard HTML-table column algorithm).
        var pending = {};

        rows.forEach(function (row) {
            var cells = row.children;
            var col = 0;

            for (var i = 0; i < cells.length; i++) {
                while (pending[col] > 0) col++; // skip columns reserved by a rowspan above us

                var cell = cells[i];
                var colStart = col;
                var colspan = parseInt(cell.getAttribute('colspan') || '1', 10);
                var rowspan = parseInt(cell.getAttribute('rowspan') || '1', 10);

                if (cell.tagName === 'TD' && COLUMN_CLASS[colStart + 1] && isEligibleForInjection(cell)) {
                    // colStart is 0-based; COLUMN_CLASS is keyed 1-based (Main Quest = col 1)
                    cell.classList.add(COLUMN_CLASS[colStart + 1]);
                }

                if (rowspan > 1) {
                    for (var k = 0; k < colspan; k++) pending[colStart + k] = rowspan;
                }
                col += colspan;
            }

            // this row consumed one unit of every active rowspan reservation
            Object.keys(pending).forEach(function (k) {
                pending[k]--;
                if (pending[k] <= 0) delete pending[k];
            });
        });
    }

    function run() {
        var tables = document.querySelectorAll('table.ws-timeline');
        tables.forEach(classifyTable);
    }

    if (window.mw && mw.hook) {
        mw.hook('wikipage.content').add(run);
    } else {
        document.addEventListener('DOMContentLoaded', run);
    }
})();