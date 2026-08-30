/* Configure LockOldComments script */
window.lockOldComments = {
    limit: 20, // Lock comments after 20 days
    addNote: true, // Display a note informing users
    customText: "🔒 Replies are locked because this comment is older than 20 days to prevent necroposting.", // Streamlined message
    namespace: [0, 500] // Run on main article pages (0) and User Blog pages (500)
};

/* Import LockOldComments script from Dev Wiki */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:LockOldComments.js'
    ]
});