window.EditConflictAlertInterval = 15000;
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:EditConflictAlert/code.js',
    ]
});

/* LockOldComments */
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 90;
window.lockOldComments.addNoteAbove = true;