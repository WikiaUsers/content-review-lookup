/* <pre> */

// ============================================================
// Author: [[User:Quarenon]]
// Name: highlightTable.js
// Version: 1.1 (pengLocations.js)
// Description: Adds row highlighting to various wiki-tables.
// ============================================================

$(document).ready(function() {
	var lightCookieLen = 80;
	var lightCookie = getCookie('lightTable').split('');
 
	function HighlightRow(el, val) {
		var cssText = '';
		if (val == '2') {
			cssText = 'background-color: #CCC !important';
		} else if (val == '1') {
			cssText = 'background-color: #CFC !important';
		}
		$(el).children('td').css('cssText', cssText);
	}
 
	function save() {
		setCookie('lightTable', lightCookie.join(''), 60 * 60 * 24 * 7);
	}
 
	if ( wgCanonicalNamespace == 0 || wgCanonicalNamespace == 2 ) {
		while (lightCookie.length < lightCookieLen) {
			lightCookie.push('0');
		}
 
		$('.lighttable tr').each(function(i) {
			HighlightRow(this, lightCookie[i]);
 
			$(this).mouseover(function() {
				HighlightRow(this, 2);
			}).mouseout(function() {
				HighlightRow(this, lightCookie[i]);
			}).click(function(e) {
				if(e.target.tagName === 'A') { // Don't highlight when clicking links
					return;
				}
				lightCookie[i] = 1 - lightCookie[i];
				HighlightRow(this, lightCookie[i]);
				save();
			});
		});
 
		$('.lighttable').append(  //TODO: Apply to each table on page
			$('<tr />').append(
				$('<th />').attr('colspan', '7').append(
					$('<input />').attr('type', 'button').val('Reset').click(function() {
						$('.lighttable tr').each(function(i) {
							lightCookie[i] = '0';
							HighlightRow(this, lightCookie[i]);
						});
						save();
					})
				)
			)
		);
	}
});

/* </pre> */