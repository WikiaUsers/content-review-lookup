/* NOTE: Any JavaScript here will be loaded for all users on every page load. */

/*
 * ===============================================
 * Script Configuration
 * ===============================================
 */

/* Link Preview */
window.pPreview = $.extend(true, window.pPreview, {
    defimage: 'https://vignette.wikia.nocookie.net/borderlands/images/0/05/Ajax.gif/revision/latest?cb=20170626182120&path-prefix=ru',
    noimage: 'https://vignette.wikia.nocookie.net/sparklecarehospital/images/0/09/Sparklecare_Tumblr.png/revision/latest/?cb=20170830020146',
});

/* Ajax Refresh */
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions"
];