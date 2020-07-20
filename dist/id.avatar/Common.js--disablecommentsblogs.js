/* Any JavaScript here will be loaded for all users on every page load. */
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "Posting blog ini belum dikomentari selama lebih dari 30 hari. Komentar telah dinonaktifkan.",
};
 
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:LockOldBlogs/code.js"
    ]
});