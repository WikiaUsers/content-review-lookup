/* Any JavaScript here will be loaded for all users on every page load. */

$('.insertusername').text(mw.config.get('wgUserName'));

/* Auto Refresh */
AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];