/* Any JavaScript here will be loaded for all users on every page load. */

/* Necroposting blocker. */
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 30;
window.lockOldComments.addNoteAbove = true;

/* Auto create user pages & talk pages */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AutoCreateUserPages.js',
    ]
});