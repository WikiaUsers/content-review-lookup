(function($, mw){
	'use strict';
	var console = window.console;
	var settingsName = 'disassembly_calculator_settings';
	var defaultSettings = {junk_reduction: 0}; //other defaults here, when there are some
	var userSettings = {};
	var junkreduction = [1, 0.99, 0.97, 0.95, 0.93, 0.91, 0.88, 0.86, 0.83, 0.8];

	// fetch settings from localStorage
	function getSettings() {
		var settings;
		try {
			// just in case something goes wrong
			settings = JSON.parse(window.localStorage.getItem(settingsName));
		}
		catch (err) {
			settings = {};
		}
		if (settings === null) {
			settings = {};
		}
		userSettings = $.extend({}, defaultSettings, settings);
	}

	// update cached settings and put them back into localStorage
	// use this over directly setting to userSettings
	function updateSettings(k,v) {
		userSettings[k] = v;
		window.localStorage.setItem(settingsName, JSON.stringify(userSettings));
	}


	// returns string version of input float, truncated to 2 decimal places
	//		with commas
	function twoDP(num) {
		if (num < 100) {
			return (Math.trunc(num * 100) / 100).toLocaleString('en-US');
		} else {
			return (Math.trunc(num)).toLocaleString('en-US');
		}
	}

	// main function
	function init() {

		// setup stuff
		// user settings from localStorage
		getSettings();

		// select and supporting things
		var $select = $('<select>');
		var $span = $('<span>');
		var $table = $('#dis-calc-table');
		$span.css('margin-left', '5px').text('Showing data for no junk reduction');

		$select.attr({ name: 'dis-calc-select', id: 'dis-calc-select'})
			.append($('<option value="0">No junk reduction (1)</option>'))
			.append($('<option value="1">Junk reduction 1 (34)</option>'))
			.append($('<option value="2">Junk reduction 2 (49)</option>'))
			.append($('<option value="3">Junk reduction 3 (64)</option>'))
			.append($('<option value="4">Junk reduction 4 (69)</option>'))
			.append($('<option value="5">Junk reduction 5 (78)</option>'))
			.append($('<option value="6">Junk reduction 6 (83)</option>'))
			.append($('<option value="7">Junk reduction 7 (91)</option>'))
			.append($('<option value="8">Junk reduction 8 (95)</option>'))
			.append($('<option value="9">Junk reduction 9 (105)</option>'));

		// begin change event
		$select.change(function () {
			$select.prop('disabled', true);
			$span.text('Calculating...');
			var $this = $(this);
			var val = parseInt($this.val(), 10);


			$table.find('.dis-calc-row').each(function (i, e) { // for every row marked as a dis-calc-row in the table do
				var $row = $(e);
				var mats, basejunk, priceeach, rawchance, newjunk, newchance, newcost, newmph, newchance_junk, newcost_junk, newmph_junk;

				// get info from the row's data attrs
				mats = parseFloat($row.attr('data-dis-mats'), 10);
				basejunk = parseFloat($row.attr('data-dis-junk'), 10);
				priceeach = parseFloat($row.attr('data-dis-price'), 10);
				rawchance = parseFloat($row.attr('data-dis-raw'), 10);

				// cancel if any of the rows aren't numbers - something went wrong
				if (isNaN(mats) || isNaN(basejunk) || isNaN(priceeach) || isNaN(rawchance)) {
					console.log("isNaN error with row");
					console.log($row);
					return;
				}

				// calculate new values
				newjunk = Math.trunc(10 * junkreduction[val] * basejunk) / 10;
				newchance = mats * (1 - newjunk / 100) * rawchance;
				newcost = priceeach / (newchance / 100);
				newmph = 3000 * newchance / 100;
				newchance_junk = mats * newjunk / 100;
				newcost_junk = priceeach / newchance_junk;
				newmph_junk = 3000 * newchance_junk;

				// apply new values
				$row.find('.data-dis-junkcell').text(newjunk + '%').attr('data-sort-value', newjunk);
				$row.find('.data-dis-chancecell').text(twoDP(newchance) + '%').attr('data-sort-value', newchance);
				$row.find('.data-dis-costcell').attr('data-sort-value', newcost).find('.coins').text(twoDP(newcost));
				$row.find('.data-dis-mphcell').text(twoDP(newmph)).attr('data-sort-value', newmph);
				
				// junk calculator
				$row.find('.data-dis-chancecell-junkcalc').text(twoDP(newchance_junk)).attr('data-sort-value', newchance_junk);
				$row.find('.data-dis-costcell-junkcalc').attr('data-sort-value', newcost_junk).find('.coins').text(twoDP(newcost_junk));
				$row.find('.data-dis-mphcell-junkcalc').text(twoDP(newmph_junk)).attr('data-sort-value', newmph_junk);
			});

			// reload table cache
			$table.trigger('updateSortableCache');

			//set this as the user's setting
			updateSettings('junk_reduction', val);

			//re-enable select now that we're done
			$select.prop('disabled', false);
			$span.text('Showing data for ' + (val === 0 ? 'no junk reduction' : 'junk reduction '+val));
		}); //end change event

		// add select to the page
		$('#dis-calc-dropdown').css('font-weight', 'bold').empty().append('Please select the junk reduction to display: ').append($select).append($span);

		// set to user's settings - also writes the default settings if not already chosen
		$select.val(userSettings.junk_reduction).change();
	}

	// run
	$(function () {
		setTimeout(init, 5000);
	});
})(window.jQuery, window.mw);