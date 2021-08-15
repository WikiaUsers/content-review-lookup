/* Any JavaScript here will be loaded for all users on every page load. */
// LockOldBlogs
window.LockOldBlogs = {
    expiryDays: 60
};

// Imports
importArticles({
    type: "script",
    articles: [
        'u:dev:MediaWiki:AdminDashboard JS-Button/code.js',
        'u:dev:MediaWiki:CommunityDataUsers/code.js',
    ]
});