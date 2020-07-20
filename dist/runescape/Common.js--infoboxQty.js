/**
 * Infobox quantity script
 * Adds a number input box next to specific numbers in tables
 * Primary use case: the price in Infobox Item
 * 
 * TODO: add infobox monster support
 * 
 * USAGE:
 * <td><span class="infobox-quantity" data-val-each="100"><span class="infobox-quantity-replace">100</span> coins</span></td>
 * Everything inside the td should be wrapped in the outer span, which has class=infobox-quantity and attr data-val-each=(value of each item)
 * Inside that span, some part should be wrapped in another span with class=infobox-quantity-replace
 *     this is the part that gets replaced with the result
 * the result is input val * data-val-each
 *
 * this is safe for use with switch infoboxes - the input is placed outside (before) the outer span, inside the td
 * [[MediaWiki:Common.js/switchInfobox2.js]] has an explicit exception to work with this and this only
 *     (that is, $("input+span"), with the entirety of the span being replaced on a switch)
 * 
 * 
 * 
 * originally based on [[User:Joeytje50/monstercalc.js]]
 */ 
;(function ($, rswiki) {
	/**
	* Detects support for <input type="number">
	* * @source http://diveintohtml5.info/detect.html#input-types
	*/
	var inputNumber = function () {
		var i = document.createElement('input');
		i.setAttribute('type', 'number');
		return i.type !== 'text';
	},
	input_width = inputNumber() ? '65px' : '50px';
	
	
	/**
	* generic one-value calc
	* compatible with most (switch) infoboxes made with [[Module:Infobox]]
	* (assuming the input only needs to depend on one value and only multiply that value)
	* other infoboxes might need 
	*/
	if ($('td > span.infobox-quantity').length) {
		var $input = $('<input>')
						.attr({
							id: 'QtyCalc',
							type: 'number',
							value: '1',
							maxlength: '10',
							min: '0',
							max: '9999999999',
						})
						.css({
							width: input_width,
							'margin-right': '2px',
						});
		
		$input.on('keyup click change mousewheel', function () {
			var warn = '',
			warn2 = '',
			val = 1,
			$this = $(this),
			$ifbq = $('td > span.infobox-quantity'),
			$rep = $ifbq.find('span.infobox-quantity-replace'),
			each = $ifbq.attr('data-val-each');
			// check if nonnumeric entered (generally if type=number not supported)
			// if so, setup warnings
			if ($this.val().search(/[^0-9]/g)  != -1) {
				warn = '<abbr title="non-numeric characters are ignored" style="cursor:help;border-bottom:1px dotted #000;">';
				warn2 = '</abbr>';
			}
			//sanitise val
			val = $this.val().replace(/[^0-9]/g, '');
	 
			//check if there's any numbers at all
			if (val.length === 0) {
				//if no numbers there at all, use 1
				$rep.html(warn + rswiki.addCommas(each) + warn2);
			} else {
				$rep.html(warn + rswiki.addCommas(each * val) + warn2);
			}
		});
		
		$('td > span.infobox-quantity').before($input);
	}
	if ($('div.pi-data-value > span.infobox-quantity').length) {
	var $input = $('<input>')
					.attr({
						id: 'QtyCalc',
						type: 'number',
						value: '1',
						maxlength: '10',
						min: '0',
						max: '9999999999',
					})
					.css({
						width: input_width,
						'margin-right': '2px',
					});
	
	$input.on('keyup click change mousewheel', function () {
		var warn = '',
		warn2 = '',
		val = 1,
		$this = $(this),
		$ifbq = $('div.pi-data-value > span.infobox-quantity'),
		$rep = $ifbq.find('span.infobox-quantity-replace'),
		each = $ifbq.attr('data-val-each');
		// check if nonnumeric entered (generally if type=number not supported)
		// if so, setup warnings
		if ($this.val().search(/[^0-9]/g)  != -1) {
			warn = '<abbr title="non-numeric characters are ignored" style="cursor:help;border-bottom:1px dotted #000;">';
			warn2 = '</abbr>';
		}
		//sanitise val
		val = $this.val().replace(/[^0-9]/g, '');
 
		//check if there's any numbers at all
		if (val.length === 0) {
			//if no numbers there at all, use 1
			$rep.html(warn + rswiki.addCommas(each) + warn2);
		} else {
			$rep.html(warn + rswiki.addCommas(each * val) + warn2);
		}
	});
	
	$('div.pi-data-value > span.infobox-quantity').before($input);
}
})(jQuery, window.rswiki);