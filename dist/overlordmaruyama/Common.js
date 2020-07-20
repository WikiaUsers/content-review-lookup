/* Any JavaScript here will be loaded for all users on every page load. */
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.noimage = 'https://vignette.wikia.nocookie.net/overlordmaruyama/images/4/4d/Overlord_logo.png/revision/latest?cb=20190906051757&format=original';
window.pPreview.tlen = 1000;

/* Main Page Discord module only */
window.DiscordBannerSettings = {
    bannerStyle: '2',
    inviteLink: 'overlord',
    noRail: true
};

/* RailWAM */
window.railWAM = {
    logPage:         "Project:WAM Log/Auto-Statistics",
    loadOnPage:      "Special:WikiActivity",
    loadOnNamespace: [-1]
};

/* Auto Refresh */
window.ajaxPages = ["Some Frequently Updated Page"];
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Watchlist", "Log", "Contributions"];
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';