// Toggle all collapsible sections at once
// This assumes all or most are initially closed and keeps them all synced to the same status.
// To use, add id="collapse-all" to the element where you want the toggle inserted, e.g.:
// Click here: <span id="collapse-all">''(JavaScript loading...)''</span>
// Its content will be replaced once the script is loaded and upon each toggle.
$(function() {
	$('#collapse-all').html('<a href="#_" class="mw-collapsible-text" onclick="toggleAllCollapsibles()" data-state="closed">Expand All</a>');
});

window.toggleAllCollapsibles = function toggleAllCollapsibles() {
	if ($('#collapse-all > .mw-collapsible-text').data('state') == "closed") {
		$('.mw-collapsible-toggle-collapsed').trigger( "click" );
		$('#collapse-all').html('<a href="#_" class="mw-collapsible-text" onclick="toggleAllCollapsibles()" data-state="opened">Collapse All</a>');
	}
	else {
		$('.mw-collapsible-toggle-expanded').trigger( "click" );
		$('#collapse-all').html('<a href="#_" class="mw-collapsible-text" onclick="toggleAllCollapsibles()" data-state="closed">Expand All</a>');
	}
}