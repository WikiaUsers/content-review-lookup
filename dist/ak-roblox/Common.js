/* Any JavaScript here will be loaded for all users on every page load. */

//LockOldComments
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 7;
window.lockOldComments.addNoteAbove = true;

//BackToTopButton
window.BackToTopModern = true;

//AbuseLogRC
abuseLogRC_showTo = [ 'bureaucrat', 'administrator', 'content-moderator', 'thread-moderator',  'rollback' ];

//AjaxRC
window.ajaxSpecialPages = [
    //"Recentchanges", 
    //"WikiActivity", 
    //"Watchlist", 
    "Log", 
    "Contributions"
    ];
window.ajaxRefresh = 60000;

//WikiActivity
window.rwaOptions = {
    limit : 50,
    namespaces : [ 0, 1, 2, 3, 4, 5, 6, 7, 110, 111, 420, 421, 500, 501, 502, 503, 1200, 2900, 2901 ],
    autoInit : true,
    themeName : "main",
    showBotEdits : false,
    loadModule : false,
    customRendering : { },
    headerLink : false,
    refresh : true,
    refreshDelay : 3 * 60 * 1000,
    timeout : 20 * 1000