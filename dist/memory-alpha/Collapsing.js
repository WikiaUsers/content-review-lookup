mw.hook('wikipage.collapsibleContent').add(function($collapsibleContent){
	var $element;
	var $toggle;
	var autoCollapseThreshold = 2;
	$.each($collapsibleContent, function(index, element){
		$element = $(element);
		if ($collapsibleContent.length >= autoCollapseThreshold && $element.hasClass('autocollapse')){
			$element.data('mw-collapsible').collapse();
		} else if ($element.hasClass('innercollapse')){
			if ($element.parents('.outercollapse').length > 0){
				$element.data('mw-collapsible').collapse();
			}
		}
	});
});