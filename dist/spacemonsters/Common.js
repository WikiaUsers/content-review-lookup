/* Any JavaScript here will be loaded for all users on every page load. */

/* Auto Refresh */
var ajaxRefresh = 30000; //in millisecond
var AjaxRCRefreshText = 'Auto-refresh';
var AjaxRCRefreshHoverText = 'Click to automatically update the current page every 30 seconds';
var ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions","Special:WikiActivity"];

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});

/* End of the {{USERNAME}} replacement */

window.SpoilerAlert = {
  pages: ["Spoiler"],
};