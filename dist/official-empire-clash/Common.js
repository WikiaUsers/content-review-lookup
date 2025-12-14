mw.loader.using('mediawiki.util', function () {
    const originalPageName = mw.config.get('wgPageName') || '';
    const pageName = originalPageName.replace(/_/g, ' ').toLowerCase();
    
    const timerDiv = document?.getElementById("timerBox");
    if (timerDiv) {
        importArticle({ type: 'script', article: 'MediaWiki:Timer.js' });
    }
});