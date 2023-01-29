$(function() {
	var path = mw.config.get('wgArticlePath');
	$('*[data-target]:not([data-target=""])').each(function() {
		$(this).find('a').attr('href', path.replace('$1', $(this).attr('data-target')));
	});
});