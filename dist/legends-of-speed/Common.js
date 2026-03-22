/* Settings for DevWiki Scripts */

// LockOldComments Settings
window.lockOldComments = {
    limit: 60, // Blocks topics that haven't been answered in over 60 days.
    addNote: true, // Adds an automatic notification informing that the topic has been closed.
    namespace: 'Project_talk' // Ensures it works in the project's discussion namespace.
};

// Importing scripts via DevWiki
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:UTCClock/code.js',
        'u:dev:MediaWiki:LockOldComments/code.js'
    ]
});/* Any JavaScript here will be loaded for all users on every page load. */