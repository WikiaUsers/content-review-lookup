'use strict';
(() => {
	const revisionBanner = $('.mw-revision');
	if (!revisionBanner.length){
		return;
	}
	const revisionBannerClone = revisionBanner.clone();
	$('#mw-content-text > noscript:first-of-type').after(revisionBannerClone);
	revisionBanner.remove();
})();