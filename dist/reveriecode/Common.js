/* TPT - Only check one box */

(function() {
    'use strict';
    
    // Deadline
    var deadline = new Date('2025-10-01T12:00:00Z'); // 1:00 PM BST
    
    // Function to handle single-selection behavior for a table
    function initSingleSelectionTable(tableId) {
        var table = document.querySelector('table[data-tpt-id="' + tableId + '"]');
        if (!table) return;
        
        var checkboxes = table.querySelectorAll('input[type="checkbox"][data-table-id="' + tableId + '"]');
        var now = new Date();
        var isLocked = now > deadline;
        
        // If past deadline, disable all checkboxes and add visual indicator
        if (isLocked) {
            checkboxes.forEach(function(checkbox) {
                checkbox.disabled = true;
                checkbox.style.cursor = 'not-allowed';
            });
            
            // Optional: Add a notice above the table
            var notice = document.createElement('div');
            notice.style.cssText = 'background: #fef6e7; border: 1px solid #f5c842; padding: 10px; margin-bottom: 10px; border-radius: 4px;';
            notice.textContent = 'Voting has closed!';
            table.parentNode.insertBefore(notice, table);
            
            return; // Don't add event listeners if locked
        }
        
        // Normal behavior: single selection
        checkboxes.forEach(function(checkbox) {
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    // Uncheck all other checkboxes in this table
                    checkboxes.forEach(function(otherCheckbox) {
                        if (otherCheckbox !== checkbox && otherCheckbox.checked) {
                            otherCheckbox.checked = false;
                            // Trigger change event to update Fandom's tracking
                            var event = new Event('change', { bubbles: true });
                            otherCheckbox.dispatchEvent(event);
                        }
                    });
                }
            });
        });
    }
    
    // Initialize for table with ID "1" (adjust as needed)
    function init() {
        initSingleSelectionTable('1');
    }
    
    // Run on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();