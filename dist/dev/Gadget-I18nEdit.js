(function () {
    'use strict';

    var conf = mw.config.get([
        'wgCityId',
        'wgPageName',
        'wgUserGroups'
    ]);

    // Don't bother loading unless we're on the correct page and logged in
    if (
        conf.wgCityId !== 7931 ||
        conf.wgPageName.slice(0, 26).toLowerCase() !== 'special:blankpage/i18nedit' ||
        conf.wgUserGroups.indexOf('user') === -1
    ) {
        return;
    }

    mw.loader.using([
        'mediawiki.util',
        'ext.fandom.ContentReview.legacyLoaders.js'
    ]).then(function() {
        importArticle({
            type: 'script',
            article: 'MediaWiki:I18nEdit.js'
        });
    });
}());