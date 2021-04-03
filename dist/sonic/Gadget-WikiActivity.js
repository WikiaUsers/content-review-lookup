window.rwaOption = {
namespaces: [0,1,4,5,14,15],
};
mw.loader.using(['mediawiki.util','ext.fandom.ContentReview.legacyLoaders.js'], function() {
    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:WikiActivity.js'
        ]
    });
});