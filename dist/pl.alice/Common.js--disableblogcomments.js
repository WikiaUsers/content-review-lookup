window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "This blog post hasn\'t been commented on for over 30 days. Commenting has been disabled.",
};

importArticles({
    type: "script",
    articles: [
        "w:c:dev:LockOldBlogs/code.js"
    ]
});