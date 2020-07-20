/* Any JavaScript here will be loaded for all users on every page load. */
window.LockForums = {
    lockMessageWalls: true,
    expiryDays: 30,
    warningDays: 25,
    banners: true,
    warningPopup: true,
    expiryBannerMessage: "This topic has been inactive for <actualDays> days, and has been <b>archived</b>.  New posts cannot be added to this thread.",
    warningBannerMessage: "<span style='color: maroon; font-weight: bold;'>Note:</span> This topic has been inactive for <actualDays> days. It is considered <b>archived</b>.  Please do not add to it unless it <i>needs</i> a response.",
};

window.LockOldBlogs = {
    expiryDays: 15,
    expiryMessage: "This blog hasn\'t been commented on in over <expiryDays> days. There is no need to comment.",
    nonexpiryCategory: "Never archived blogs"
};

importScript("MediaWiki:Reports.js");

window.MassCategorizationGroups = ['sysop', 'content-moderator', 'bot'];

window.highlightUsersConfig = {
    colors: {
        // 'group-name': 'color',
        'bureaucrat':'#04f77d',
        'sysop': '#a104f7',
        'staff': '#04cef7',
        'helper': '#000000',
        'vstf': '#ffb7b7',
        'global-discussions-moderator': '#4286f4',
        'voldev': '#23c8d2',
        'vanguard': '#1eaf7a',
        'content-volunteer': '#ffe500',
        'bot': '#a400a4'
    },
    styles: {
        // 'group-name': 'styles',
        'bureaucrat': 'font-weight: bold;'
    }
};