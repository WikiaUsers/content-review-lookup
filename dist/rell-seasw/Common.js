/* Any JavaScript here will be loaded for all users on every page load. */
// Scroll bar
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ScrollUpButton.js',
    ]
});

//Design//
if (mw.config.get('wgPageName') === 'User:XxImMortalV1ruSxX' && mw.config.get('wgAction') !== 'edit') {
    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:SnowStorm.js',
        ]
    });
}