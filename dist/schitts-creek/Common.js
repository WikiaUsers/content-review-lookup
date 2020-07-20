/* Any JavaScript here will be loaded for all users on every page load. */
window.AjaxRCRefreshText = 'Auto-Refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity",
    "Special:UncategorizedPages",
    "Special:AllPages"
];

window.railWAM = {
     loadOnPage: 'Special:WikiActivity',
};

 
/* Username Detector */
$(function() {
    $('.insertusername').text(mw.config.get('wgUserName'));
});