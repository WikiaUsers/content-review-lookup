/* Any JavaScript here will be loaded for all users on every page load. */
dev:Countdown/code.js
dev:BackToTopButton/code.js


// 1. BackToTopButton configuration option
window.BackToTopModern = true;
window.BackToTopStart = 200;
window.BackToTopFade = 0;

// 2. BackToTopButton import statement
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:BackToTopButton/code.js',
    ]
});