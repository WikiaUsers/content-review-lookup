/*
	This code adds a percent of checked boxes (completion percent)
	on every table that has progress tracking.
*/

// Code.
function percent_completed () {
	var table = document.querySelector('.table-progress-tracking');
	// these 2 have to match
	var table_ID = document.getElementById("data-tpt-id").value;
	var checkbox_ID = document.getElementById("data-table-id").value;
	var selected_boxes = 0;
	var total_boxes = 0;
	for (let row of table.rows) {
	    for(let cell of row.cells) {
	       let val = cell.innerText; // your code below
	    }
	}
}