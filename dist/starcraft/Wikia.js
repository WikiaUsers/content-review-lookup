$(function() { // Restores the Special:Upload functionality. This does not block core functionality
	$('#WikiaRail').on('click', '.upphotos', function(e) {if (e.target && e.target.href) { document.location.href = e.target.href; return false;}});
});