// AJAX auto-refresh
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity",
    "Special:Log",
    "Special:Watchlist",
    "Special:Contributions",
    "Special:AbuseLog",
    "Special:NewFiles",
    "Special:Statistics",
    "Special:NewPages",
    "Special:ListFiles"
];
window.AjaxRCRefreshText = 'Auto-refresh';
window.ajaxindicator = 'https://images.wikia.nocookie.net/__cb20100609110347/software/images/a/a9/Indicator.gif';
// END of AJAX auto-refresh

// UserTags - Get other tags
UserTagsJS.modules.mwGroups = [
    // Blocked Users
    'blocked',
    'patroller',
    'rollback',
    'sysop',
    'bureaucrat',
    'founder',
    'checkuser',

    // Bots
    'bot',
    'bot-global',

    // Wikia
    'staff',
    'vstf',
    'council',
    'helper',
    'checkuser-global',
    'util',
    'voldev',
    'authenticated',
    'wikiastars'
];
// END of UserTags - Get other tags