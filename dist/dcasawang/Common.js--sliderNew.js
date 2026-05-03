$(function () {
	$('.slider-content, .slider-generic').on('click', 'img, a', function (e) {
		var $link = $(this).closest('a');
		if (!$link.attr('href').startsWith('#')) {
			return;
		}
		e.preventDefault();
		var tabTitle = $link.attr('href').replace('#', '');
		var $tab = $('.wds-tabs__tab[data-hash="' + tabTitle + '"]');
		$tab.trigger('click');
		history.replaceState(null, null, location.pathname + location.search);
	});
});