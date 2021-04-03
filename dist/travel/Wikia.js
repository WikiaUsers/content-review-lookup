mw.hook('dev.banners').add(function(BannerNotification) {
    // BannerNotification is the banner constructor
    new BannerNotification('Due to COVID-19 issues -Information on this wiki might be inaccurate/outdated', 'notify').show();
    // You can also access it with `window.dev.banners.BannerNotification`, but it's advised to keep your own reference to it
});

importArticle({
    type: 'script',
    article: 'u:dev:MediaWiki:BannerNotification.js'
});