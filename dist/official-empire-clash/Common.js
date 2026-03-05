mw.loader.using(['mediawiki.util'], function () {
	$(function() {
    	const originalPageName = mw.config.get('wgPageName') || '';
    	const pageName = originalPageName.replace(/_/g, ' ').toLowerCase();
    	const timerDiv = document.getElementById("timerBox");
    	if (timerDiv) {
    	    importArticles({ type: 'script', article: 'MediaWiki:Timer.js' });
    	}
    	if(pageName === "news") {
    		importArticles({ type: 'script', article: 'MediaWiki:NewsN.js' });
    	}
    	if(pageName === "news panel") {
    		importArticles({ type: 'script', article: 'MediaWiki:NewsAdmin.js' });
    	}
    	if(pageName === "empire clash official wiki") {
    		importArticles({ type: 'script', article: 'MediaWiki:NewsHP.js' });
    	}
	})
});