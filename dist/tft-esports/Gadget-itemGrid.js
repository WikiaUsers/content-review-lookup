$(function() {
	function highlight(i) {
		$('[data-item-vs="' + i + '"]').each(function() {
			$(this).addClass('item-vs-highlighted');
		});
	}
	
	function unhighlight() {
		$('.item-grid-cell').removeClass('item-vs-highlighted','');
	}
	
	$('.item-grid-cell').each(function() {
		$(this).hover(function() {
			highlight($(this).attr('data-item-vs'));
		},
		unhighlight);
	});
});