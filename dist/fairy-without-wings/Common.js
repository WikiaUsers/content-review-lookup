/* Any JavaScript here will be loaded for all users on every page load. */
/* Auto Refresh */
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refreshes the page';
window.ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];

/* Username Display */
$('.insertusername').text(mw.config.get('wgUserName'));

/* Spoiler Alert */
SpoilerAlert = {
  categories: "Spoiler",
};