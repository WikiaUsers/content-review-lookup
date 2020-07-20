/* Any JavaScript here will be loaded for all users on every page load. */

window.ajaxPages = ["Special:RecentChanges","Special:NewFiles"];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
importScriptPage('AjaxRC/code.js', 'dev');