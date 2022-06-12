/* Any JavaScript here will be loaded for all users on every page load. */

// Initialises stripes on all zebra tables after page load
$(document).ready(function() {
	$('table.zebra tbody tr:nth-child(even)').addClass('even');
	$('table.zebra tbody tr:nth-child(odd)').addClass('odd');
});

// Re do stripes on a table after sort finishes
$(document).on('sortEnd.tablesorter', function(event) {
	var table = $(event.target);
	if(table.hasClass('zebra')) {
		$('tbody tr:nth-child(even)',table).addClass('even').removeClass('odd');
		$('tbody tr:nth-child(odd)',table).addClass('odd').removeClass('even');
	}
});