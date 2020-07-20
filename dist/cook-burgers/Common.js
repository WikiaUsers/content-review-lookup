/* Any JavaScript here will be loaded for all users on every page load. */

// Progress Bars
importScript("MediaWiki:ProgressBar.js");

window.LockForums = {
    lockMessageWalls: true,
    expiryDays: 60,
    warningDays: 30,
    banners: true,
    warningPopup: true,
    expiryBannerMessage: "This topic has been inactive for <actualDays> days, and has been <b>archived</b>.  New posts cannot be added to this thread.",
    warningBannerMessage: "<span style='color: maroon; font-weight: bold;'>Note:</span> This topic has been inactive for <actualDays> days. It is considered <b>archived</b>.  Please do not add to it unless it <i>needs</i> a response.",
};

window.railWAM = {
    logPage:"Project:WAM Log"
};

// Import scripts for all users
importArticles({
    type: "script",
    articles: [
        "w:c:dev:InputUsername/code.js",
        "w:c:dev:DisableBotMessageWalls/code.js",
        'u:dev:MediaWiki:WallGreetingButton/code.js',
        'u:dev:MediaWiki:RailWAM/code.js',
    ]
});

// Import user group scripts (ElijahPepe)
var ug = mw.config.get("wgUserGroups").join(), group;

if      (/sysop/.test(ug))             group = "sysop";
else if (/content-moderator/.test(ug)) group = "content-moderator";
else if (/autoconfirmed/.test(ug))     group = "autoconfirmed";

if (group)
    importScript("MediaWiki:Group-" + group + ".js");

window.i = window.i || 0; //Required for SignatureCheck to work properly