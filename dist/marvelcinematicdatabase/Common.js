/* Any JavaScript here will be loaded for all users on every page load. */

/****************/
/* RailWAM */
/****************/
window.railWAM = {
    logPage:"Project:WAM Log"
};

/****************/
/* Auto Refresh */
/****************/
 
window.AjaxRCRefreshText = 'Auto-Refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = [
    'Special:WikiActivity',
    'Special:RecentChanges',
    'Special:Log',
    'Special:Community',
    'Special:Forum',
    'Blog:Recent_posts'
    ];
window.ajaxRefresh = 30000;