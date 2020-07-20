/* Any JavaScript here will be loaded for all users on every page load. */

/* WAM on side*/
window.railWAM = {
    logPage:"Project:WAM Log"
};

/*Auto-refresh*/
window.ajaxPages = [
    "Special:Contributions",
    "Special:Log",
    "Special:RecentChanges",
    "Special:WikiActivity",
];
window.ajaxRefresh = 300000;

/*Reveal Anon IP*/
window.RevealAnonIP = {
    permissions : ['user']
};

/*Lock Forums - currently not in action*/
window.LockForums = {
    lockMessageWalls: true,
    expiryDays: 2500,
    warningDays: 30,
    disableOn: [],
    warningBannerMessage: "<span style='color: maroon; font-weight: bold;'>Note:</span> This topic has been unedited for <actualDays> days. Do not add to it unless it really needs a response.",
    banners: true
};