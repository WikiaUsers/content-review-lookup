/* Any JavaScript here will be loaded for all users on every page load. */
// prevents existing tags from being hidden
(window.dev = window.dev || {}).profileTags = { noHideTags: true };
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MessageBlock/code.js',
    ]
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:GlobalEditcount/code.js',
    ]
});