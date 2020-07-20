/* Any JavaScript here will be loaded for all users on every page load. */
var ts_alternate_row_colors=true;


/* This code is for the Full Script Reference page. */
$(document).ready(function() {
	$("ul.ScriptCategory").hide();
	$("span.ScriptCategory").click(function() {
		$("ul#" + this.id + "_List").toggle();
	});
	$("span.ScriptCategory#ExpandAll").unbind().click(function() {
		$("ul.ScriptCategory").toggle();
	});
});