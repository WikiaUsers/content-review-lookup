/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:YouTubeModal/code.js',
    ]
});

// prevents existing tags from being hidden
(window.dev = window.dev || {}).profileTags = { noHideTags: true };