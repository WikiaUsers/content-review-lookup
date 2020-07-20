/* Any JavaScript here will be loaded for all users on every page load. */
/* Any JavaScript here will be loaded for all users on every page load. */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');
importScriptPage('AjaxRC/code.js', 'dev');
importScriptPage('ShowHide/code.js', 'dev');
importScriptPage('Countdown/code.js', 'dev');
importScriptPage('DisplayClock/code.js', 'dev');
importScriptPage('PurgeButton/code.js', 'dev');
importScriptPage('Standard_Edit_Summary/code.js', 'dev');
importScriptPage('InactiveUsers/code.js', 'dev');
InactiveUsers = { months: 1 };