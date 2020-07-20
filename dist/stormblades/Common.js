/* Any JavaScript here will be loaded for all users on every page load. */


importScriptPage('BackToTopButton/code.js', 'dev');
var Start = 800;

importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});

importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/custom.js',
        // ...
    ]
});