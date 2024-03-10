$(function() {
	$('.logged-in-link').each(function() {
		var target = mw.config.get('wgServer') + '/' + $(this).attr('data-href');
		var anchor = document.createElement('a');
		$(anchor).attr('href', target).html($(this).html());
		$(this).html(anchor)
			.removeClass('logged-in-link');
	});
});