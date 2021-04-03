/* Any JavaScript here will be loaded for all users on every page load. */

/* Applies css styles to the last column of the members-table based on the value of the cells */
$(function() {
	$("table.members-table td:last-child:contains('Active')").css("background-color", "#00FF00");
	$("table.members-table td:last-child:contains('Deceased')").css("background-color", "#A6A6A6");
	$("table.members-table td:last-child:contains('Unknown')").css("background-color", "#AD5AAD");
	$("table.members-table td:last-child:contains('Left Familia')").css("background-color", "#AFEEEE");
	$("table.members-table td:last-child:contains('Left familia')").css("background-color", "#AFEEEE");
	$("table.members-table td:last-child:contains('Temporary Leave')").css("background-color", "#AFEEEE");
	$("table.members-table td:last-child:contains('Temporary leave')").css("background-color", "#AFEEEE");
	$("table.members-table td:last-child:contains('Partially Left Familia')").css("background-color", "#AFEEEE");
	$("table.members-table td:last-child:contains('Partially Left familia')").css("background-color", "#AFEEEE");
	$("table.members-table td:last-child:contains('Partially left Familia')").css("background-color", "#AFEEEE");
	$("table.members-table td:last-child:contains('Partially left familia')").css("background-color", "#AFEEEE");
	$("table.members-table td:last-child:contains('Left Guild')").css("background-color", "#AFEEEE");
	$("table.members-table td:last-child:contains('Left guild')").css("background-color", "#AFEEEE");
	$("table.members-table td:last-child:contains('Imprisoned')").css("background-color", "#FFFF00");
	$("table.members-table td:last-child:contains('Defected')").css("background-color", "#FF4C4C");
});