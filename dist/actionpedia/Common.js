/* Any JavaScript here will be loaded for all users on every page load. */
 
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
 });
 
/* End of the {{USERNAME}} replacement And start of Custom Promotion boxes, courtesy of the Regular Show Wiki. */
 
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
        "u:dev:MediaWiki:LockOldBlogs/code.js"
    ]
});

// Configuration for NoLicenseWarning
window.NoLicenseWarning = {
    forceLicense: true,
};