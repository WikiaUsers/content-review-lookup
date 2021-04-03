$( function () {
	
	function escapeCharacters(str) {
		return str.replace(/['\. ]/g, '').toLowerCase();
	}
	
	function applyFilter(selector, searchString) {
		$(selector).each(function() {
			if (escapeCharacters($(this).attr('data-display')).indexOf(searchString) !== -1 || ! searchString || searchString === '') {
				$(this).css('display','block');
			}
			else {
				$(this).css('display', 'none');
			}
		});
	}
	
	$('#champion-filter').on('input', function() {
		var val = escapeCharacters($(this).val());
		applyFilter('.frontpage-champion-item', val);
	});
	
	$('#item-filter').on('input', function() {
		var val = escapeCharacters($(this).val());
		applyFilter('.frontpage-item-item', val);
	});
	
});