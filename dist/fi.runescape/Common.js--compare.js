/* <pre> */
// Add links to compare templates
$('.cioCompareLink').each(function() {
	var props = $(this).attr('title').split('|');
	var linkText = (props[0] != '') ? props[0] : 'Compare items';
	var items = (props.length >= 2) ? props.slice(1) : [ wgPageName ];
	var $link = $('<a />').attr({href: '#', title: 'Compare this item with others.'}).click(function() { cioOpen(items) }).text(linkText);
	$(this).empty().append($link);
});

var $cioImgDelete = $('<img />').attr({src: 'http://img200.imageshack.us/img200/7898/transdelrow.png', width: 14, height: 13, alt: '[X]'});
var $cioImgLoading = $('<img />').attr({src: stylepath + '/common/progress-wheel.gif', width: 16, height: 16, alt: '...'});
var $cioImgError = $('<img />').attr({src: 'http://img12.imageshack.us/img12/508/1248624996error.png', width: 16, height: 16, alt: '!!'});

/** Open the compare items overlay */
function cioOpen(items) {
	// Darken the page
	$('<div />').attr('id', 'overlay').appendTo('body').show();

	// Build the initial table
	var html = ' \
<div id="cioTitle"> \
 <span id="cioClose"><a href="#" onclick="cioClose();" title="Close this overlay."><img src="http://img43.imageshack.us/img43/7427/1248623480windowclose.png" width="24" height="24" alt="Close [X]" /></a></span> \
 Compare Items \
</div> \
<form name="cioCompare" id="cioCompare" onsubmit="cioSubmit(this.cioItem.value); return false;" action="#"> \
	<table> \
		<tr> \
			<td><label for="cioItem">Compare ' + wgTitle + ' with:</label></td> \
		 	<td><input type="input" type="text" name="cioItem" id="cioItem" value="" /> <input type="submit" value="Add" /></td> \
		</tr> \
		<tr> \
			<td>&nbsp;</td> \
			<td id="cioStatus"></td> \
		</tr> \
	</table> \
</form> \
<table class="wikitable" id="cioItems"> \
	<thead> \
		<tr> \
			<th rowspan="2">Name</th> \
			<th colspan="5"><img src="https://images.wikia.nocookie.net/runescape/images/f/fb/Attack.gif" width="21" height="21" alt="A" /> &nbsp; Attack &nbsp; <img src="https://images.wikia.nocookie.net/runescape/images/f/fb/Attack.gif" width="21" height="21" alt="A" /></th> \
			<th colspan="6"><img src="https://images.wikia.nocookie.net/runescape/images/1/1e/Defence.gif" width="15" height="19" alt="D" /> &nbsp; Defence &nbsp; <img src="https://images.wikia.nocookie.net/runescape/images/1/1e/Defence.gif" width="15" height="19" alt="D" /></th> \
			<th colspan="3">Other</th> \
			<th width="30">Spd</th> \
			<th width="30">Wgt</th> \
		</tr> \
		<tr> \
			<th width="38" title="Stab"><img src="https://images.wikia.nocookie.net/runescape/images/5/5c/White_dagger.png" width="21" height="31" alt="Sta" /></th> \
			<th width="38" title="Slash"><img src="https://images.wikia.nocookie.net/runescape/images/8/8b/White_scimitar.png" width="27" height="30" alt="Sla" /></th> \
			<th width="38" title="Crush"><img src="https://images.wikia.nocookie.net/runescape/images/6/6a/White_warhammer.png" width="30" height="34" alt="Cru" /></th> \
			<th width="38" title="Magic"><img src="https://images.wikia.nocookie.net/runescape/images/b/bd/Magicicon.png" width="22" height="20" alt="Mag" /></th> \
			<th width="38" title="Ranged"><img src="https://images.wikia.nocookie.net/runescape/images/7/7b/Ranged.gif" width="21" height="21" alt="Rng" /></th> \
			<th width="38" title="Stab"><img src="https://images.wikia.nocookie.net/runescape/images/5/5c/White_dagger.png" width="21" height="31" alt="Sta" /></th> \
			<th width="38" title="Slash"><img src="https://images.wikia.nocookie.net/runescape/images/8/8b/White_scimitar.png" width="27" height="30" alt="Sla" /></th> \
			<th width="38" title="Crush"><img src="https://images.wikia.nocookie.net/runescape/images/6/6a/White_warhammer.png" width="30" height="34" alt="Cru" /></th> \
			<th width="38" title="Magic"><img src="https://images.wikia.nocookie.net/runescape/images/b/bd/Magicicon.png" width="22" height="20" alt="Mag" /></th> \
			<th width="38" title="Raanged"><img src="https://images.wikia.nocookie.net/runescape/images/7/7b/Ranged.gif" width="21" height="21" alt="Rng" /></th> \
			<th width="38" title="Summon"><img src="https://images.wikia.nocookie.net/runescape/images/3/32/Summoning.gif" width="22" height="23" alt="Sum" /></th> \
			<th width="38" title="Strength"><img src="https://images.wikia.nocookie.net/runescape/images/b/b3/Strength.gif" width="17" height="22" alt="Str" /></th> \
			<th width="38" title="Ranged Strength"><img src="https://images.wikia.nocookie.net/runescape/images/b/bd/Ranged_Strength.gif" width="32" height="22" alt="RSt" /></th> \
			<th width="38" title="Prayer"><img src="https://images.wikia.nocookie.net/runescape/images/b/ba/Prayericonnew.png" width="22" height="21" alt="Pra" /></th> \
			<th title="Speed"><img src="https://images.wikia.nocookie.net/runescape/images/2/2d/Energy.PNG" width="15" height="18" alt="Spd" /></th> \
			<th title="Weight (kg)"><img src="http://img18.imageshack.us/img18/9642/weightl.png" width="20" height="16" alt="Wgt" /></th> \
		</tr> \
	</thead> \
	<tbody> \
		<tr id="cioTotals"> \
		</tr> \
	</tbody> \
</table>';

	// Create the modal box
	$('<div />').html(html).attr('id', 'modal').appendTo('body');

	// Center
	$('#modal').css('left', $(window).width() / 2 - ($('#modal').width() / 2));

	os_enableSuggestionsOn('cioItem', 'cioCompare');

	// Initial item(s)
	// TODO: Fold multiple item calls into one API query
	for (var i = 0; i < items.length && i < 5; i++) {
		cioSubmit(items[i]);
	}
}

/** Close the overlay. */
function cioClose() {
	os_disableSuggestionsOn('cioItem');
	$('#modal').fadeOut('normal', function() {
		$('#modal').remove();
		$('#overlay').remove();
	});
}

/** Submit an AJAX request to add a new item */
function cioSubmit(itemName) {
	/** Calculate bonus totals */
	function calcTotals() {
		var totals = [];
		for (var i = 0; i < 16; i++) {
			totals[i] = 0;
		}

		// Iterate over each row and col
		$('#cioItems tbody tr').not('#cioTotals').each(function() {
			var i = 0;
			$(this).children('td').each(function() {
				totals[i++] += (isNaN($(this).text()) ? 0 : parseInt($(this).text()));
			});
		});

		$('#cioTotals').empty().append($('<th />').text('Total'));
		for (var i in totals) {
			// Don't total weapon speeds (col 14)
			$('#cioTotals').append(format((i == 14) ? null : (totals[i] + '')));
		}
	}

	/** Format a template number and return a (jQuery) table cell */
	function format(str) {
		if (str == null) {
			return $('<td />').attr('class', 'cioEmpty').text('--');
		} else {
			// Prepend + sign to numbers without any sign
			if (str.substring(0, 1) != '-' && str.substring(0, 1) != '+') {
				str = '+' + str;
			}

			return $('<td />').attr('class', (str.substring(0, 1) == '-') ? 'cioNeg' : 'cioPos').text(str);
		}
	}

	/** Parse the parameters in a given template.  */
	function parseTemplate(text, tpl) {
		tpl = tpl.replace(/[_ ]/g, '[_ ]');
		var re = new RegExp('{{\\s*(template:)?' + tpl + '\\s*\\|([\\w\\W]+?)}}', 'gi');

		var data = [];
		var match;

		while (match = re.exec(text)) {
			var params = match[2].split('|');
			var j = 1; // Unnamed parameter index
			var tplData = new Array();
			for (var k in params) {
				var t = params[k].split('=');
				var name = null;
				var value = null;
				if (t.length == 1) { // Unnamed params
					name = (j++) + ''; // Cast to string
					value = t[0];
				} else {
					name = t[0];
					value = t[1];
				}
				
				tplData[$.trim(name)] = $.trim(value);
			}
			data.push(tplData);
		}

		return data;
	}

	/** Error message */
	function showError(str) {
		$('#cioStatus').empty().attr('class', 'cioError').append($cioImgError.clone()).append(' ' + str);
	}

	/** Ajax error handler */
	function ajaxError(xhr, error) {
		showError('Error: ' + error);
	}

	/** Ajax success handler */
	function ajaxSuccess(data) {
		// TODO Handle error messages from the API

		// List of template params to display within each column.
		var bonusCols = [
			'astab', 'aslash', 'acrush', 'amagic', 'arange',
			'dstab', 'dslash', 'dcrush', 'dmagic', 'drange',
			'dsummon', 'str', 'rangestr', 'prayer', 'aspeed'
		];

		var pages = data.query.pages;
		var pageId = null;

		for (var i in pages) {
			pageId = pages[i].pageid;
		}

		if (pageId == null) {
			showError('Could not find that item.');
		} else {
			var page = data.query.pages[pageId];
			var pageTitle = page.title;
			var pageContent = page.revisions[0]['*'];

			var bonusData = parseTemplate(pageContent, 'infobox bonuses');
			var itemData = parseTemplate(pageContent, 'infobox item');

			for (var i in bonusData) {
				var $row = $('<tr />');
				var $th = $('<th />');
				var $delLink = $('<a />').attr({href: '#', title: 'Remove this row.'}).click(function() {
					$(this).closest('tr').fadeOut('slow', function() { $(this).remove(); calcTotals(); } );
				});
				var $itemLink = $('<a />').attr({href: wgArticlePath.replace('$1', encodeURI(pageTitle)), title: pageTitle}).text(pageTitle);
				
				$delLink.append($cioImgDelete.clone());
				$th.append($delLink).append(' ').append($itemLink);
				$row.append($th);

				for (var j in bonusCols) {
					$row.append(format(bonusData[i][bonusCols[j]]));
					
				}

				$row.append(format(itemData.length ? itemData[0]['weight'] : null));

				$('#cioTotals').before($row);
			}

			if (!bonusData.length) {
				showError('No bonus data found for the item.');
			} else {
				calcTotals();
				$('#cioStatus').empty();
			}
		}
	}

	$('#cioStatus').empty().attr('class', 'cioLoading').append($cioImgLoading.clone()).append(' Loading...');

	$.ajax({
		data: {
			'action': 'query',
			'prop': 'revisions',
			'titles': itemName,
			'rvprop': 'content',
			'redirects': '',
			'format': 'json'
		},
		dataType: 'json',
		success: ajaxSuccess,
		error: ajaxError,
		url: wgScriptPath + '/api.php',
		timeout: 10000 // millisec
	});
}
/* </pre> */