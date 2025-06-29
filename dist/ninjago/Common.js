/* Any JavaScript here will be loaded for all users on every page load. */

/* Custom Promotion boxes, courtesy of the Regular Show Wiki. */

window.LockForums = {
   expiryDays: 30,
   expiryMessage: "This forum is considered archived because it hasn't been commented in over <expiryDays> days. There is no need to reply. Instead, make a new thread."
};

window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "This blog hasn't been commented on for over <expiryDays> days. There is no need to reply."
};

importArticles({
    type: "script",
    articles: [
        'u:dev:MediaWiki:LockOldBlogs/code.js'
    ]
});

window.BackToTopModern = true;

// Configuration for NoLicenseWarning
window.NoLicenseWarning = {
    forceLicense: true,
};