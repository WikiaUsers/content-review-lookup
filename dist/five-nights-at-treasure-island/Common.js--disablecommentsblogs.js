window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "This blog post isn't commented in the last 30 days, meaning that the blog is closed. Comments disabled.",
};
 
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:LockOldBlogs/code.js"
    ]
});