/* Any JavaScript here will be loaded for all users on every page load. See w:c:dev:AjaxRC for info & attribution  */  
window.AjaxRCRefreshText = 'Auto-Refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page'; 
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity",
    "Special:UncategorizedPages",
    "Special:AllPages"
];

/* Clock */
window.DisplayClockJS = '%X %x [%{Sunday;Monday;Tuesday;Wednesday;Thursday;Friday;Saturday}w] (UTC)';

window.LockOldBlogs = {
    expiryDays: 7,
    expiryMessage: ""This blog hasn\'t been commented on for over <expiryDays> days. There is no need to comment.",
  nonexpiryCategory: "Nonexpiry blogs."
};


window.UserTagsJS = {
    modules: {
        inactive: 60,
        userage: true,
        mwGroups: true,
        autoconfirmed: true
    },
    oasisPlaceBefore: '> h1'
};