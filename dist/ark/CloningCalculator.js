/* [[Template:CloningCalculator]] */
(function ($, mw) {
	'use strict';
	window.CloningCalculatorI18n = window.CloningCalculatorI18n || {
		level: 'lvl',
		calculated: 'Calculated Values',
		babyMatureSpeedMultiplier: 'BabyMatureSpeedMultiplier',
		seconds: 'seconds',
	};
	var i18n = window.CloningCalculatorI18n;
	var CHAMBER_MAX_SHARDS = 48 * 1000;

	function calculateValues(context) {
		var cloneCost = Math.round(context.costBase + context.costLevel * context.level);
		var cloneTime = Math.round((context.timeBase + context.timeLevel * context.level) / (context.bmsm || 1));
		var cloneDate = new Date(cloneTime * 1000);

		context.$cost.innerText = cloneCost;
		context.$time.innerText = Math.round(cloneTime) + ' ' + i18n.seconds + ' = ' + 
			(cloneDate.getUTCDate() - 1 /* Jan 1st */) + ' d ' + cloneDate.getUTCHours() + ' h ' +
			cloneDate.getUTCMinutes() + ' m ' + cloneDate.getUTCSeconds() + ' s';

		if (cloneCost >= CHAMBER_MAX_SHARDS)
			context.$cost.style.backgroundColor = "#cf4c4c8a";
		else
			context.$cost.style.backgroundColor = "#2ebf338a";
	}

	function createTableRowH($td1, $inner) {
		return $('<tr>')
			.append($td1)
			.append($('<td>').append($inner))
			.get(0);
	}

	function createTableRow(label, $inner) {
		return createTableRowH($('<td>').text(label), $inner);
	}

	function createNumberInput(context, key, isFloat) {
		return $('<input>')
			.attr('type', 'number')
			.attr('min', '1')
			.attr('max', '100000')
			.attr('maxlength', '6')
			.val('1')
			.on('input', function () {
					var value = $(this).val();
					context[key] = isFloat ? parseFloat(value) : parseInt(value);
					calculateValues(context);
			})
			.get(0);
	}

	function eleFunc(undefined, $root) {
		$root.classList.add('loaded');
		var context = {
			costBase: parseInt($root.dataset.costBase),
			costLevel: parseInt($root.dataset.costLevel),
			timeBase: parseInt($root.dataset.timeBase),
			timeLevel: parseInt($root.dataset.timeLevel),
			
			level: 1,
			bmsm: 1,
			
			$time: null,
			$cost: null,
		};

		var $body = $root.children[0];
		var $levelPlaceholder = $root.querySelector('[data-target-field=level]');

		$levelPlaceholder.innerHTML = '<br/>'+i18n.level+' ';
		$levelPlaceholder.appendChild(createNumberInput(context, 'level', false));

		var $separator = $('<tr>').append($('<th>')
			.attr('colspan', '2')
			.text(i18n.calculated))
			.get(0);
		var $bmsm = createTableRow(i18n.babyMatureSpeedMultiplier, createNumberInput(context, 'bmsm', true));
		var $costRow = createTableRowH($body.children[2].children[0].cloneNode(true), document.createTextNode(''));
		var $timeRow = createTableRowH($body.children[3].children[0].cloneNode(true), document.createTextNode(''));
		context.$cost = $costRow.children[1];
		context.$time = $timeRow.children[1];

		$body.insertBefore($separator, $body.children[1]);
		$body.insertBefore($bmsm, $body.children[2]);
		$body.insertBefore($costRow, $body.children[3]);
		$body.insertBefore($timeRow, $body.children[4]);

		calculateValues(context);
	}
	mw.hook('wikipage.content').add(function($content) {
		$content.find('.cloningcalc:not(.loaded)').each(eleFunc);
	});
})(window.jQuery, window.mediaWiki);