$(function () {
	// Making image sizes consistent across the same list slide
	$('.slide-list-content').each(function () {
		var $figures = $(this).find('figure');
		var $firstImg = $figures.find('img').first();
		var firstWidth = $firstImg.width();
		var firstHeight = $firstImg.height();
		$figures.each(function (index) {
			var $img = $(this).find('img');
			if (!$img.length) return;
			if (index > 0) {
				$img.attr({
					width: firstWidth,
					height: firstHeight
				});
			}
			// Adjusting image position to center the focus
			var positionClass = $img.attr('class').match(/position-([^\s]+)/);
			if (positionClass && positionClass[1]) {
				var posValues = positionClass[1].split('-');
				if (posValues.length >= 2) {
					var x = posValues[0];
					var y = posValues[1];
					$img.css('object-position', x + ' ' + y);
					$img.removeClass('position-' + positionClass[1]);
					var newSrc = $img.attr('data-src').replace(/\/revision\/.*$/, '');
					$img.attr('data-src', newSrc);
				}
			}
		});
	});
	// Simulating tab click on button click to switch slides
	$('.slider-content, .slider-generic').on('click', 'img, a', function (e) {
		var $link = $(this).closest('a');
		if (!$link.attr('href').startsWith('#')) {
			return;
		}
		e.preventDefault();
		var tabTitle = $link.attr('href').replace('#', '');
		var $tab = $('.wds-tabs__tab[data-hash="' + tabTitle + '"]');
		setTimeout(function () {
			$tab.trigger('click');
			history.replaceState(null, null, location.pathname + location.search);
		}, 150);
	});
});