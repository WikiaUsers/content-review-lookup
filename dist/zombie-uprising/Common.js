/* Any JavaScript here will be loaded for all users on every page load. */
window.lockOldComments.limit = 14;
window.lockOldComments.addNoteAbove = true;

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:UserBadge/code.js',
    ]
});