// prevents existing tags from being hidden
(window.dev = window.dev || {}).profileTags = { noHideTags: true };

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:WikiActivity.js',
    ]
    });

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:DiscussionsActivity.js',
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:Nuke/code.js',
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AjaxBatchDelete.js',
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:DupImageList/code.js',
    ]
});