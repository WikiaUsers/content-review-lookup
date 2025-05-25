/* Lock old comments */
window.lockOldComments = window.lockOldComments || {};
window.lockOldComments.limit = 14; // Lock threads after 14 days
window.lockOldComments.addNoteAbove = true; // Show a note above locked threads

/* Import scripts */
importArticles({
  type: 'script',
  articles: [
    'u:dev:LockOldComments/code.js',  // Required to actually lock the comments
    'u:dev:MediaWiki:MassEdit/code.js' // Enables the MassEdit tool
  ]
});