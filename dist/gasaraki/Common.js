/* Any JavaScript here will be loaded for all users on every page load. */

importScriptPage('ShowHide/code.js', 'dev');

/* List of imports */
importArticles({
    type: 'script',
    articles: [
        // ...
        'u:dev:ReferencePopups/code.js', // Displays content of references on hover
        'u:dev:BackToTopButton/code.js', // Adds "Back to top" button in pages
        'u:dev:AutoEditDropdown/code.js', // Automatically opens edit menu on hover
    ]
});