// According to Krinkle, gadgets don't have to wait using $(function() {... (only core stuff)
// Open search in new tab by [[User:Timeshifter]]

/* global:$ */
/* jshint-valid */
$('#searchform, #searchbox, #search, .search-types, #search-types, #powersearch').bind('keyup keydown mousedown', function(e) {
	$(this).attr('target', e.ctrlKey || e.metaKey ? '_blank' : '');
});