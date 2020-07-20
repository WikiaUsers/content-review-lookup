/* Any JavaScript here will be loaded for all users on every page load. */

/* Reference Popups */
importArticles({
    type: 'script',
    articles: [
        // ...
        'w:dev:ReferencePopups/code.js',
        // ...
    ]
});

/* Custom Popups */
importArticles({
    type: 'script',
    articles: [
        // ...
        'w:dev:ReferencePopups/custom.js',
        // ...
    ]
});