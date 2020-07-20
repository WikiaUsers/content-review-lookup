/* Any JavaScript here will be loaded for all users on every page load. */

importScriptPage('DisplayClock/code.js', 'dev');

window.ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

importScriptPage('AjaxRC/code.js', 'dev');