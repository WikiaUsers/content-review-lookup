'use strict';
mw.hook('wikipage.collapsibleContent').add(collapsibleContent => {
	const autoCollapseThreshold = 2;
	collapsibleContent.each((index, element) => {
		const autoCollapse = collapsibleContent.length >= autoCollapseThreshold && $(element).hasClass('autocollapse');
		const innerCollapse = $(element).hasClass('innercollapse') && $(element).parents('.outercollapse').length;
		
		if (autoCollapse || innerCollapse){
			$(element).data('mw-collapsible').collapse();
		}
	});
});

// {{JavaScript category}}