/* Any JavaScript here will be loaded for all users on every page load. */

window.LockOldBlogs = {
    expiryDays: 90,
    expiryMessage: "This blog is considered archived because it hasn\'t been commented on in over <expiryDays> days. There is no need to comment.",
    nonexpiryCategory: "Never archived blogs"
};
 
 
importArticles({
    type: "script",
    articles: [
        "u:dev:MediaWiki:LockOldBlogs/code.js"
    ]
});