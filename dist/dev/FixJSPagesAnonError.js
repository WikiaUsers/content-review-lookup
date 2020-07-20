$(function () {
    if (
        mw.config.get('wgCanonicalSpecialPageName') !== 'JSPages' ||
        mw.config.get('wgUserName') ||
        window.FixJSPagesAnonErrorLoaded
    ) {
        return;
    }
    window.FixJSPagesAnonErrorLoaded = true;
    mw.hook('dev.fetch').add(function (fetch) {
        fetch('action-content-review').then(function (msg) {
            $('#mw-content-text > p:first-child').text(function (_, txt) {
                return txt.replace(/<action-content-review-js-pages>/, msg);
            });
        });
    });
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:Fetch.js'
    });
});