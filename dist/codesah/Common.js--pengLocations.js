/* <pre> */
 
// ============================================================
// Name: pengLocations.js
// Description: Implement row marking on the penguin locations
//                  table in the DnD Locations article.
//              Show/hide columns to fit a large table
//                  on a smaller display area.
// Version 1.0: [[User:Quarenon]]
//              Row marking
// Version 2.0: [[User:Saftzie]]
//              Add show/hide
//              Thanks to [[User:Tyilo]]
//                  and [[User:Chrislee33]] for ideas
// ============================================================
 
$(document).ready(function() {

	var pengTableID = 'pengLocations';
	var pengCookieID = 'pengLocations';
	var pengToggleClass = 'pengToggle';

	var pengCookie = getCookie(pengCookieID).split('');	// load the existing cookie, if any
 
	function pengHighlight(el, val) {			// change the row bg color based on mouse events
		var pengCSS = '';
		if (val == '2') {
			pengCSS = 'background-color: #CCC !important';
		} else if (val == '1') {
			pengCSS = 'background-color: #CFC !important';
		}
		$(el).css('cssText', pengCSS);
	}

	function pengVisibility(val) {				// show or hide columns
		if (val == '1') {				// 1 = show, 0 = hide
			$('#' + pengTableID + ' .' + pengToggleClass).show();
		} else {
			$('#' + pengTableID + ' .' + pengToggleClass).hide();
		}
	}
 
	function pengSave() {					// save the cookie for page reloads
		setCookie(pengCookieID, pengCookie.join(''), 7);
	}
 
	if (wgPageName == 'Distracciones y Diversiones' || wgPageName == 'Distracciones y Diversiones/Escondidas con los pingüinos') {

                var pengRows = $('#' + pengTableID + ' tr:has(td)');	// data rows
		var pengCookieLen = pengRows.length+1;			// 1 for hidden + 1 for each peng/bear

		while (pengCookie.length < pengCookieLen) {		// initialize a cookie if one didn't exist on load
			pengCookie.push('0');
		}

		var pengSelector = '';						// propagate class from header row to data rows
		var pengHeaders = $('#' + pengTableID + ' tr > th');		// save the headers to count them later
		pengHeaders.filter('.' + pengToggleClass).each(function() {
			if (pengSelector.length > 0)				// build a selector that mirrors the header row
				pengSelector += ',';				// Note: index() starts at 0, nth-child starts at 1
			pengSelector += 'td:nth-child(' + ($(this).index() + 1) + ')';
		});
		if (pengSelector.length > 0)					// apply it to the data rows and add the class
			pengRows.children(pengSelector).addClass(pengToggleClass);

		pengRows.each(function(iLoc) {					// initialize highlighting based on the cookie
			pengHighlight(this, pengCookie[iLoc+1]);		// pengCookie[0] is the hidden state
			$(this).mouseover(function() {				// set mouse events
				pengHighlight(this, 2);
			}).mouseout(function() {
				pengHighlight(this, pengCookie[iLoc+1]);
			}).click(function(e) {
				if (e.target.tagName === 'A')			// don't highlight when clicking links
					return;
				pengCookie[iLoc+1] = 1 - pengCookie[iLoc+1];	// toggle highlight
				pengHighlight(this, pengCookie[iLoc+1]);
				pengSave();
			});
		});

		pengVisibility(pengCookie[0]);			// initialize cell visibility based on the cookie

		$('#' + pengTableID).append(			// add some buttons for reset and size
			$('<tr />').append(
				$('<th />').attr('colspan', pengHeaders.length).append(
					$('<input />').attr('type', 'button').val('Clear marks').click(function() {
						pengRows.each(function(iLoc) {
							pengCookie[iLoc+1] = '0';
							pengHighlight(this, '0');
						});
						pengSave();
					}), '&nbsp;',
					$('<input />').attr('type', 'button').val('Variar visibilidad').click(function() {
						pengCookie[0] = 1 - pengCookie[0];
						pengVisibility(pengCookie[0]);
						pengSave();
					})
				)
			)
		);
	}
});

/* </pre> */