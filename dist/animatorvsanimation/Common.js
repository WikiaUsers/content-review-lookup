/* Any JavaScript here will be loaded for all users on every page load. */
window.ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions","Special:WikiActivity"];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

/* LockOldComments */
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 90;

/* UTC Clock */
window.DisplayClockJS = {
	format: '%I:%2M:%2S %p, %b %d, %Y (UTC)'
};