/* Any JavaScript here will be loaded for all users on every page load. */

/* Lock Comments */
mw.loader.using('mediawiki.util', function () {
  window.lockOldComments = window.lockOldComments || {};
  window.lockOldComments.limit = 60;
  window.lockOldComments.addNoteAbove = true;

  console.log('[LockOldComments] Configuration applied');

  importArticles({
    type: 'script',
    articles: [
      'u:dev:LockOldComments/code.js',  // Enables comment locking
    ]
  });
});

/* Dedicated Talk Button Settings */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:DedicatedTalkButton.js',
    ]
});