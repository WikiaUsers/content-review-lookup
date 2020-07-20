/* Any JavaScript here will be loaded for all users on every page load. */

addOnloadHook(function() {$('.qaywsx').text(wgUserName);});

window.railWAM = {
    logPage:"Project:WAM Log"
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AdminDashboard JS-Button/code.js',
    ]
});

window.LockForums = {
    lockMessageWalls: true,
    expiryDays: 30,
    warningDays: 25,
    banners: true,
    warningPopup: true,
    expiryBannerMessage: "This topic has been inactive for <actualDays> days, and has been <b>archived</b>.  New posts cannot be added to this thread.",
    warningBannerMessage: "<span style='color: maroon; font-weight: bold;'>Note:</span> This topic has been inactive for <actualDays> days. It is considered <b>archived</b>.  Please do not add to it unless it <i>needs</i> a response.",
};