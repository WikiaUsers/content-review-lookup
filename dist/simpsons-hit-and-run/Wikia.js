/*** Script Configurations ***/
/* AjaxRC */
window.ajaxPages = ["Special:WikiActivity", "Special:RecentChanges", "Special:Log", "Special:Contributions"];
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

window.LockOldBlogs = {
    expiryDays: 60,
    expiryMessage: "This blog has not been commented on for over <expiryDays> days. There is no need to comment, so it has been locked.",
    nonexpiryCategory: "Nonexpiry blogs",
    expiryCategories: []
};