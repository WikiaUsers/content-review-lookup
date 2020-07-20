/* <pre> */
 
// ============================================================
// Autor: Quarenon
// Nome: highlightTable.js
// Versão: 1.2
// Descrição: Adiciona linhas destacadas para várias wiki-tables.
// ============================================================

;(function($, mw) {
	'use strict';

	function highlightTable() {
		// hash a string into a 32-bit hex string, msb first
		function crc32c(s) {
			var polynomial = 0x04C11DB7, // Castagnoli polynomial
				retVal,
				table = [],
				i,
				j,
				k;

			// guarantee 8-bit chars
			s = window.unescape(window.encodeURI(s));

			// calculate the crc for all 8-bit data
			// bit-wise operations discard anything left of bit 31
			for (i = 0; i < 256; i += 1) {
				k = (i << 24);
				for (j = 0; j < 8; j += 1) {
					k = (k << 1) ^ ((k >>> 31) * polynomial);
				}
				table[i] = k;
			}

			// the actual calculation
			retVal = 0;
			for (i = 0; i < s.length; i += 1) {
				retVal = (retVal << 8) ^ table[(retVal >>> 24) ^ s.charCodeAt(i)];
			}

			// make negative numbers unsigned
			if (retVal < 0) {
				retVal += 4294967296;
			}
			// 32-bit hex string, padded on the left
			retVal = '0000000' + retVal.toString(16).toUpperCase();
			retVal = retVal.substr(retVal.length - 8);

			return retVal;
		}

		function highlightRow(el, val) {
			if(val == '1')
				$(el).addClass('selected');
			else
				$(el).removeClass('selected');
		}
	 
		function save() {
			$.cookie(cookieName, cookie.join(''), {expires: 365});
		}

		var pageName = mw.config.get('wgPageName');
		var hashPageName = crc32c(pageName);
		var cookieName = 'lightTable-' + hashPageName;

		var cookie = $.cookie(cookieName);
		cookie = cookie === null ? [] : cookie.split('');

		var numRows = $('.lighttable tr').length;
		if(numRows == 0)
			return;

		while(cookie.length < numRows)
			cookie.push('0');

		$('.lighttable tr').each(function(i) {
			highlightRow(this, cookie[i]);

			$(this).click(function() {
				cookie[i] = 1 - cookie[i]; // Toggles the selection
				highlightRow(this, cookie[i]);
				save();
			});
		});

		$('.lighttable').append( //TODO: Apply to each table on page
			$('<tr />').append(
				$('<th />').attr('colspan', '50').append(
					$('<input />').attr('type', 'button').val('Repor').click(function() {
						$('.lighttable tr').each(function(i) {
							cookie[i] = '0';
							highlightRow(this, cookie[i]);
						});
						save();
					})
				)
			)
		);
	}
 
	$(highlightTable);
 
}(this.jQuery, this.mediaWiki));

/* </pre> */