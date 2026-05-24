'use strict';
(() => {
	const revisionBanner = $('.mw-revision');
	if (!revisionBanner.length){
		return;
	}
	$('#mw-content-text > noscript:first-of-type').after(revisionBanner);
})();

// {{JavaScript category}}