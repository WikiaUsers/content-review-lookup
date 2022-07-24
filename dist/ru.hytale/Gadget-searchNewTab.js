// Open search in new tab by [[wikipedia:User:Timeshifter]]
// global:$
// jshint-valid
$(function () {
	$('#searchform, #searchbox, #search, .search-types, #search-types, #powersearch').on('keyup keydown mousedown', function(e) {
		$(this).attr('target', e.ctrlKey || e.metaKey ? '_blank' : '');
	});
});