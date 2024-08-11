/** 
 * Adding support to mw-collapsible for autocollapse
 * Based on code (maintained by TheDJ) from en.wikipedia.org/wiki/MediaWiki:Common.js
 */
 
function autocollapseSetup ($collapsibleContent) {
	// Autocollapse threshold
	var threshold = 2;
	
	// Remove all subgroup navboxes from the list; these shouldn't count
	$collapsibleContent = $collapsibleContent.filter(":not(.navbox-subgroup)");
	
	$.each($collapsibleContent, function (index, element) {
		$element = $(element);
		
		// If a collapsible object has the autocollapse state, and the threshold is met or succeeded, it collapses
		if ($collapsibleContent.length >= threshold && $element.hasClass('mw-autocollapse')) {
			$element.data('mw-collapsible').collapse();
		} 
	});
}

mw.hook('wikipage.collapsibleContent').add(autocollapseSetup);