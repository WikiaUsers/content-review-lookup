window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 14;
window.lockOldComments.addNoteAbove = true;

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:LockOldComments.js'
    ]
});