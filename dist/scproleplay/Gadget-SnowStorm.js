/* Adds a snowing effect to the background of pages. */
mw.loader.using(['mediawiki.util','ext.fandom.ContentReview.legacyLoaders.js'], function() {
    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:SnowStorm.js'
        ]
    });
});