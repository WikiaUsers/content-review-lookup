/* Any JavaScript here will be loaded for all users on every page load. */
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Watchlist", "Log", "Contributions"];
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

/* Configure tooltips js module */
var tooltips_config = {
    offsetX: 5,
    offsetY: 10,
    waitForImages: false,
};
 
var tooltips_list = [{
    classname: 'popup-tooltip',
    parse: '{' + '{<#popup#>|tt=<#tt#>}}'
}];
/*! Configure tooltips js module */

/* Configure Back to Top module */
window.BackToTopModern = true;
window.BackToTopSpeed = 300;
window.BackToTopStart = 800;
/*! Configure Back to Top js module */