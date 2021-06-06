/* Any JavaScript here will be loaded for all users on every page load. */

/* Multiple Uploads */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MultiUpload.js',
    ]
});

/* User Badges */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MastheadRightsBadge.js',
    ]
});

/* Tooltips */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:Tooltips.js',
    ]
});