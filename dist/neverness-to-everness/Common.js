(function() {
    // 1. STRICT SAFEGUARD: Instantly abort if our custom table class is not present
    var targetTables = document.querySelectorAll('.selectable-tracker-table');
    if (!targetTables.length) return;

    // 2. RUNTIME INLINE STYLE INJECTION
    var styleId = 'tracker-table-isolated-styles';
    if (!document.getElementById(styleId)) {
        var styleEl = document.createElement('style');
        styleEl.id = styleId;
        styleEl.innerHTML = 
            '.selectable-tracker-table tr { cursor: pointer; } ' +
            '.selectable-tracker-table tr.row-highlighted td { background-color: #1a3a5f !important; color: #ffffff !important; } ' +
            '#table-counter-bar { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); background: #2a2a2a; color: #ffffff; padding: 12px 24px; border-radius: 24px; box-shadow: 0 4px 16px rgba(0,0,0,0.45); z-index: 10000; font-family: sans-serif; font-weight: bold; display: flex; gap: 16px; align-items: center; user-select: none; } ' +
            '#clear-selection-btn { color: #ff5f5f; cursor: pointer; transition: color 0.15s ease; } ' +
            '#clear-selection-btn:hover { color: #ff2a2a; text-decoration: underline; } ' +
            '#counter-text { border-left: 1px solid #444444; padding-left: 12px; color: #dddddd; }';
        document.head.appendChild(styleEl);
    }

    // 3. GENERATE COUNTER CONTAINER
    var counterBar = document.getElementById('table-counter-bar');
    if (!counterBar) {
        counterBar = document.createElement('div');
        counterBar.id = 'table-counter-bar';
        counterBar.style.display = 'none';
        counterBar.innerHTML = '<span id="clear-selection-btn">✖ Clear selection</span><span id="counter-text">(0/0)</span>';
        document.body.appendChild(counterBar);
    }

    // 4. MAIN SYNCHRONIZATION LOOP
    function syncProgress(table) {
        var tableId = table.getAttribute('data-tableid') || 'default-table';
        var storageKey = 'wiki_table_tracker_' + tableId;
        var rows = table.querySelectorAll('tr:not(:first-child)');
        var totalRows = rows.length;
        
        var highlightedRows = table.querySelectorAll('tr.row-highlighted');
        var selectedCount = highlightedRows.length;

        // Render live numbers
        var txt = document.getElementById('counter-text');
        if (txt) txt.innerText = '(' + selectedCount + '/' + totalRows + ')';

        // FIXED ARRAY SYNTAX: Secure array initialization mapping tracking keys
        var savedIds = [];
        for (var i = 0; i < highlightedRows.length; i++) {
            var rowId = highlightedRows[i].getAttribute('data-rowid');
            if (rowId) savedIds.push(rowId);
        }
        localStorage.setItem(storageKey, JSON.stringify(savedIds));

        // Toggle displaying the active bar overlay
        counterBar.style.display = selectedCount > 0 ? 'flex' : 'none';
    }

    // 5. HYDRATE LOCAL BROWSER PROGRESS
    for (var t = 0; t < targetTables.length; t++) {
        (function(table) {
            var tableId = table.getAttribute('data-tableid') || 'default-table';
            var storageKey = 'wiki_table_tracker_' + tableId;
            var savedData = localStorage.getItem(storageKey);
            var rows = table.querySelectorAll('tr:not(:first-child)');

            if (savedData) {
                try {
                    var parsedIds = JSON.parse(savedData);
                    for (var r = 0; r < rows.length; r++) {
                        var rId = rows[r].getAttribute('data-rowid');
                        if (rId && parsedIds.indexOf(rId.toString()) !== -1) {
                            rows[r].classList.add('row-highlighted');
                        }
                    }
                } catch(e) { console.error(e); }
            }
            syncProgress(table);
        })(targetTables[t]);
    }

    // 6. GLOBAL DELEGATED CLICK EVENT CAPTURE
    document.addEventListener('click', function(event) {
        // Prevent action if clicking inside actual links or structural page nodes
        if (event.target.closest('a')) return;

        var clickedRow = event.target.closest('.selectable-tracker-table tr');
        if (!clickedRow || clickedRow.matches('tr:first-child')) return;

        event.preventDefault();
        clickedRow.classList.toggle('row-highlighted');
        
        var parentTable = clickedRow.closest('.selectable-tracker-table');
        syncProgress(parentTable);
    });

    // Reset button logic
    document.addEventListener('click', function(event) {
        if (event.target.id !== 'clear-selection-btn') return;
        
        var activeTables = document.querySelectorAll('.selectable-tracker-table');
        for (var i = 0; i < activeTables.length; i++) {
            var rows = activeTables[i].querySelectorAll('tr.row-highlighted');
            for (var r = 0; r < rows.length; r++) {
                rows[r].classList.remove('row-highlighted');
            }
            syncProgress(activeTables[i]);
        }
    });

})();