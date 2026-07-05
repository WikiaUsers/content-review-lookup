;(function(window, $, mw){
	'use strict';

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

	const scalingConfig = {
		key: 'everspacewiki-shipScaling-settings',
		defaults: {
			ships: {}
		},
	};

	scalingConfig.save = function(settings) {
		mw.storage.set(scalingConfig.key, JSON.stringify(settings));
	};

	scalingConfig.update = function(updates) {
		const settings = scalingConfig.load();
		Object.assign(settings, updates);
		scalingConfig.save(settings);
	};

	scalingConfig.clamp = function(min, max, value) {
		return Math.min(Math.max(min, value), max);
	};

	scalingConfig.load = function() {
		const settings = Object.assign({}, scalingConfig.defaults);

		try {
			const raw = mw.storage.get(scalingConfig.key);
			if (raw)
				Object.assign(settings, JSON.parse(raw));
		} catch (e) {
			console.error('Failed to get Ship Scaling settings, using defaults:', e);
			return settings;
		}

		// Validate retrieved values
		if (typeof settings.ships !== 'object' || settings.ships === null)
			settings.ships = {};

		Object.keys(settings.ships).forEach(function(ship) {
			settings.ships[ship] = scalingConfig.clamp(0,tierKeys.length - 1,settings.ships[ship]);
		});

		return settings;
	};

	const wikiUserScalingConfig = scalingConfig.load();

	ships.each(function() {

		const $ship      = $(this);
		const $shipName  = $ship.find('.ship-name');
		const $tierLabel = $ship.find('.ship-tier');

		// If no tier III+ data attribute, must be Wraith (no tiers)
		const hasTieredStats = $ship.find('.ship-stat-armor').next('[data-tier-iii-plus]').length;
		if (!hasTieredStats) return true; // continue to next ship

		const shipName = $shipName.contents().first().text().trim();

		let startIndex = wikiUserScalingConfig.ships[shipName];
		if (startIndex == null)
			startIndex = 0;

		// Create slider
		const $slider = $('<input type="range">')
			.prop('min', 0)
			.prop('max', tierKeys.length - 1)
			.prop('value', startIndex);

		const $sliderWrapper = $('<div>')
			.addClass('ship-tier-slider')
			.append($slider);

		$sliderWrapper.insertAfter($shipName);

		// Slider handler
		$slider.on('input change', function() {
			const tierIndex = parseInt($(this).val(), 10);

			const settings = scalingConfig.load();
			settings.ships[shipName] = tierIndex;
			scalingConfig.save(settings);

			const tier     = tierKeys[tierIndex] || 'I';
			const tierAttr = tierAttrMap[tier] || 'i';
			const dataAttr = 'data-tier-' + tierAttr;

			// Update the tier label
			$tierLabel.text(tier);

			// Update all stats for this tier
			$ship.find('[' + dataAttr + ']').each(function() {
				const $el    = $(this);
				const value  = $el.attr(dataAttr);
				const suffix = $el.attr('data-suffix') || '';
				$el.text(value + suffix);
			});
		});

		// Initialise slider state
		$slider.trigger('change');
	});

})(this, jQuery, mediaWiki);