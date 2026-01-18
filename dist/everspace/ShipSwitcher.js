;(function(window, $, mw){
	'use strict';

	$(function() {
		// Single-run guard
		window.everspacewiki = window.everspacewiki || {};
		if (window.everspacewiki.shipSwitcher && window.everspacewiki.shipSwitcher.hasRun) return;
		window.everspacewiki.shipSwitcher = { hasRun: true };

		const ships = $('.es2-ship');
		if (!ships.length) return;
		
		const tierKeys = ['I','I+','II','II+','III','III+','IV'];
		const tierAttrMap = {
			'I': 'i',
			'I+': 'i-plus',
			'II': 'ii',
			'II+': 'ii-plus',
			'III': 'iii',
			'III+': 'iii-plus',
			'IV': 'iv'
		};

		ships.each(function() {

			const $ship      = $(this);
			const $shipName  = $ship.find('.ship-name');
			const $tierLabel = $ship.find('.ship-tier');

			const hasTieredStats = $ship.find('.ship-stat-armor').next('[data-tier-iii-plus]').length;
			if (!hasTieredStats) return true;

			const currentTier = $tierLabel.text();
			let startIndex = tierKeys.indexOf(currentTier);
			if (startIndex < 0) startIndex = 0;

			const $slider = $('<input type="range">')
				.prop('min', 0)
				.prop('max', tierKeys.length - 1)
				.prop('value', startIndex);

			const $sliderWrapper = $('<div>')
				.addClass('ship-tier-slider')
				.append($slider);

			$sliderWrapper.insertAfter($shipName);

			$slider.on('input change', function() {
				const tierIndex = parseInt($(this).val(), 10);
				const tier      = tierKeys[tierIndex] || 'I';
				const tierAttr  = tierAttrMap[tier] || 'i';
				const dataAttr  = 'data-tier-' + tierAttr;

				$tierLabel.text(tier);

				$ship.find('[' + dataAttr + ']').each(function() {
					const $el    = $(this);
					const value  = $el.attr(dataAttr);
					const suffix = $el.attr('data-suffix') || '';
					$el.text(value + suffix);
				});
			});

			$slider.trigger('change');
		});
		
	}); // end jQuery ready
	
})(this, jQuery, mediaWiki);