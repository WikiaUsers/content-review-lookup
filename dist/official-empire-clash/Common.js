mw.loader.using(['mediawiki.util'], function () {
	$(function() {
    	const originalPageName = mw.config.get('wgPageName') || '';
    	const pageName = originalPageName.replace(/_/g, ' ').toLowerCase();
    	const timerDiv = document.getElementById("timerBox");
    	if (timerDiv) {
    	    importArticles({ type: 'script', article: 'MediaWiki:Timer.js' });
    	}
	})
});