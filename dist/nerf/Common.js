/* Any JavaScript here will be loaded for all users on every page load. */

window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "This blog is considered closed because it has not been commented on in over <expiryDays> days.",
    nonexpiryCategory: "Closed blogs"
};

importArticles({
    type: "script",
    articles: [
        "w:c:dev:LockOldBlogs/code.js"
    ]
});

window.LockForums = {
    expiryDays: 30,
    expiryMessage: "This thread has not been commented on in over 30 days and discussion is considered closed.",
    warningDays: 20,
    warningMessage: "This thread has not been commented on in over 20 days and discussion will soon be closed. Please only reply if a response is necessary.",
    disableOn: "35284",
    banners: true
};

importArticles({
    type: "script",
    articles: [
        "u:dev:LockForums/code.js"
    ]
});