/**
 * This file serves as a centralized collection of JavaScript code related to companion functionality.
 * Dependencies: jQuery library
 */
 
window.initializeCompanionPower = function () {
	if (!$('.calculate-companion-power').length || $('.calculate-companion-power .settings-icon').length) return;

	const qualityLevels = {
		common: 75 / 900,
		uncommon: 150 / 900,
		rare: 250 / 900,
		epic: 375 / 900,
		legendary: 550 / 900,
		mythic: 750 / 900,
		celestial: 900 / 900
	};

	const qualityNames = {
		common: 'Обычный',
		uncommon: 'Необычный',
		rare: 'Редкий',
		epic: 'Эпический',
		legendary: 'Легендарный',
		mythic: 'Мифический',
		celestial: 'Небесный'
	};

	const $main = $('.calculate-companion-power').first();
	let globalQuality = $main.data('quality');
	if (!qualityLevels[globalQuality]) globalQuality = 'mythic';

	const $qualitySelect = $('<select id="quality-select" title="Выберите качество спутника">');
	$.each(qualityLevels, (key) =>
		$('<option>', { value: key, text: qualityNames[key] })
			.prop('selected', key === globalQuality)
			.appendTo($qualitySelect)
	);

	const $controls = $('<div class="companion-controls">')
		.css({ display: 'flex', alignItems: 'center', gap: '6px' })
		.append('<span class="settings-icon">⚙️</span>', '<label for="quality-select">Качество спутника:</label>', $qualitySelect);

	$main.append($controls);

	$('.calculate-companion-power-target').each(function () {
		$(this).data('base-html', $(this).html().trim());
	});

	function updateAll() {
		const selected = $('#quality-select').val() || 'mythic';
	
		$('.calculate-companion-power-target').each(function () {
			const $el = $(this);
			const baseHtml = $el.data('base-html') || '';
			const sourceQuality = $el.data('quality') || 'epic';
			if (!qualityLevels[sourceQuality]) return $el.html('Ошибка: неизвестное качество');
			if (!baseHtml.match(/\{[\d,.]+\}/)) return $el.html('Ошибка: Укажите максимальные значения в {}');
	
			let index = 0;
			const values = baseHtml.match(/\{[\d,.]+\}/g).map(v =>
				parseFloat(v.replace(/[{},]/g, '').replace(',', '.'))
			);
	
			const updated = baseHtml.replace(/\{[\d,.]+\}/g, () => {
				const baseValue = values[index++];
				const result = baseValue * (qualityLevels[selected] / qualityLevels[sourceQuality]);
				// формат: максимум 2 знака после точки, без округления до целого
				const formatted = result.toFixed(2).replace(/\.?0+$/, ''); // убирает лишние нули (3.50 → 3.5)
				return '<b>' + formatted + '</b>';
			});
	
			$el.html(updated);
			$('.companion-name').attr('data-quality', selected).find('span').attr('class', selected);
		});
	}

	$('#quality-select').on('change', updateAll);
	updateAll();
};

$(document).ready(() => window.initializeCompanionPower());