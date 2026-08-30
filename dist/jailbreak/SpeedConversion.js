mw.hook('fandom.rightrail.loaded').add(function () {

	if (mw.config.get('wgAction') !== 'view')
		return;

	const $list = $('.rail-module.page-tools-module .rail-module__list');
	if (!$list.length) return;

	mw.util.addCSS(`
		.speed-converter {
			display: grid;
			grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
			gap: 6px;
			align-items: end;
			padding: 0.5em;
			background-color: var(--theme-accent-color);
			margin-top: 0.5em;
			border-radius: 5px;
			color: var(--theme-accent-label-color);
		}

		.speed-converter label {
			min-width: 0;
			text-align: center;
		}

		.speed-converter input {
			box-sizing: border-box;
			width: 100%;
			min-width: 0;
		}
	`);

	const $mph = $('<input>', {
		type: 'number',
		step: 'any',
		placeholder: 'MPH'
	});

	const $kph = $('<input>', {
		type: 'number',
		step: 'any',
		placeholder: 'KPH'
	});

	const $converter = $('<div>', { class: 'speed-converter' }).append(
		$('<label>').text('MPH').append($mph),
		$('<span>').text('='),
		$('<label>').text('KPH').append($kph)
	);

	const $item = $('<li>', { text: 'Convert MPH / KPH' }).append($converter);

	$mph.on('input', function () {
		const value = parseFloat(this.value);
		$kph.val(isNaN(value) ? '' : Math.round(value * 1.609344));

	});

	$kph.on('input', function () {
		const value = parseFloat(this.value);
		$mph.val(isNaN(value) ? '' : Math.round(value / 1.609344));
	});

	$list.append($item);
});