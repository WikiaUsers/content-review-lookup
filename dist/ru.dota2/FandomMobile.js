$(function() {
	$('#heroes div.heroentry > div > figure').each(function() {
		$(this).replaceWith($(this).html());
	});
});