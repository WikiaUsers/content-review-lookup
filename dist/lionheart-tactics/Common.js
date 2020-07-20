/* Any JavaScript here will be loaded for all users on every page load. */

/* This puts a Back to top button on the bottom of every page when you scroll down */
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