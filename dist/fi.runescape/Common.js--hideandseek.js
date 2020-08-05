// ==================================================================
// Penguin Hide and Seek tietolaatikon merkkauskohdat
// ==================================================================
$(document).ready(function() {
	var pengCookieLen = 20;
	var pengCookie = getCookie('pengLocations').split('');

	function rowHighlight(el, val) {
		var cssText = '';
		if (val == '2') {
			cssText = 'background-color: #CCC !important';
		} else if (val == '1') {
			cssText = 'background-color: #CFC !important';
		}
		$(el).children('td').css('cssText', cssText);
	}

	function save() {
		setCookie('pengLocations', pengCookie.join(''), 60 * 60 * 24 * 7);
	}

	if (wgPageName == 'Distractions_and_Diversions_Locations') {
		while (pengCookie.length < pengCookieLen) {
			pengCookie.push('0');
		}

		$('#penglocations tr').each(function(i) {
			rowHighlight(this, pengCookie[i]);

			$(this).mouseover(function() {
				rowHighlight(this, 2);
			}).mouseout(function() {
				rowHighlight(this, pengCookie[i]);
			}).click(function() {
				pengCookie[i] = 1 - pengCookie[i];
				rowHighlight(this, pengCookie[i]);
				save();
			});
		});

		$('#penglocations').append(
			$('<tr />').append(
				$('<th />').attr('colspan', '7').append(
					$('<input />').attr('type', 'button').val('Reset marked locations').click(function() {
						$('#penglocations tr').each(function(i) {
							pengCookie[i] = '0';
							rowHighlight(this, pengCookie[i]);
						});
						save();
					})
				)
			)
		);
	}
});