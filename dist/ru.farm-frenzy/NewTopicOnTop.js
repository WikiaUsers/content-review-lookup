mw.hook('wikipage.editform').add(function () {

function transferHeadingToSummary() {
	var textboxContent = $wpTextbox1.val();
	textboxContent = textboxContent && textboxContent.replace(/<!--[^]*?-->/g, '');  // Remove HTML comments
	var matches = textboxContent && textboxContent.match(/^==(.+)==/m);
	if (!matches) return;
	
	var heading = matches[1]
		.replace(/\[\[:?(?:[^:\]]+?:)?([^|\]]+)\|\]\]/g, '$1')  // Constructs like [[Namespace:Page|<empty string>]]
		.replace(/\[\[:?(?:[^|\]]+\|)?(.+?)\]\]/g, '$1')        // Extract displayed text from wikilinks
		.replace(/'''(.+?)'''/g, '$1')                          // Remove bold
		.replace(/''(.+?)''/g, '$1')                            // Remove italics
		.replace(/<\w+( [\w ]+?=[^<>]+?| ?\/?)>/g, '')          // Remove opening tags (won't work with <smth param=">">,
		                                                        // but wikiparser fails too)
		.replace(/<\/\w+ ?>/g, '')                              // Remove closing tags
		.replace(/ {2,}/g, ' ')                                 // Remove multiple spaces
		.trim();
	if (!heading) return;
	
	var summary = $wpSummary.val();
	if (summary === undefined) return;
	
	if (summary.search(/\/\*.*\*\//) != -1) {
		$wpSummary.val('/* ' + heading + ' */' + summary.substr(summary.indexOf('*/') + 2));
	} else {
		$wpSummary.val('/* ' + heading + ' */ ' + summary);
	}
	$wpSummary.trigger('change');
}

// By gilly3, posted at http://stackoverflow.com/a/7745998, CC-BY-SA 3.0
function setCursorPos(input, start, end) {
	if (arguments.length < 3) {
		end = start;
	}
	if ('selectionStart' in input) {
		input.selectionStart = start;
		input.selectionEnd = end;
	} else if (input.createTextRange) {
		var rng = input.createTextRange();
		rng.moveStart('character', start);
		rng.collapse();
		rng.moveEnd('character', end - start);
		rng.select();
	}
}

var decodedSearch = decodeURIComponent(location.search);
var $wpSummary = $('#wpSummary');
var summary = $wpSummary.val();
if (decodedSearch.search(/[?&]summary=\/\*[+ ]*\*\//) != -1 ||
	(mw.config.get('wgAction') == 'submit' &&
		summary !== undefined && summary.search(/\/\*\s*\*\//) != -1))
{
	var $wpTextbox1 = $('#wpTextbox1');
	if (!$wpTextbox1.length) return;
	
	if (mw.config.get('wgAction') != 'submit') {
		var textboxContent = $wpTextbox1.val();
		textboxContent = textboxContent && textboxContent.replace(/<!--[^]*?-->/g, '');
		if (textboxContent.search(/^==.+==/m) == -1) {
			$wpTextbox1.focus().val($wpTextbox1.val() + '\n==  ==\n');
			setCursorPos($wpTextbox1[0], $wpTextbox1.val().length - 4);
		}
	}
	$wpTextbox1.blur(transferHeadingToSummary);
}

});