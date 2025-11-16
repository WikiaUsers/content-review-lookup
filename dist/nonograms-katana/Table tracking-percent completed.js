/*
	This code adds a percent of checked boxes (completion percent)
	on every table that has progress tracking.
*/

function percent_completed() {
    const tables = document.querySelectorAll('.table-progress-tracking');
    
    for (let i = 0; i < tables.length; i++) {
    	// Important for updating percentages when page laods.
        observer.observe(tables[i], {
            subtree: true,
            childNodes: true,
            attributes: true
        });
        
        var selected_boxes = 0;
    	var total_boxes = -1; // Omits the first row.
        for (let row of tables[i].rows) {
            total_boxes += 1;
            
            for (let cell of row.cells) {
                cell.addEventListener("change", percent_completed);
                if (cell.getAttribute('data-sort-value') == "1") {
                    selected_boxes += 1;
                }
            }
        }
        
        const th = tables[i].querySelector('th');
        const text = Math.round(selected_boxes / total_boxes * 100) + '%';
        
        if (th.textContent !== text) {
            th.textContent = text;
        }
    }
}

const observer = new MutationObserver(percent_completed);
percent_completed(); // Execute function on page load.