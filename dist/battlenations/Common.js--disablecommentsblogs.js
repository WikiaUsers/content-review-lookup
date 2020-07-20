/* Any JavaScript here will be loaded for all users on every page load. */

window.LockOldBlogs = {
    expiryDays: 60,
    expiryMessage: "This blog post hasn\'t been commented on for over 60 days. Commenting is no longer necessary.",
};
 
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:LockOldBlogs/code.js"
    ]
});