/* Any JavaScript here will be loaded for all users on every page load. */

// Ajax auto-refresh
var ajaxPages = ['Special:RecentChanges','Special:WikiActivity','Special:Contributions'];
var AjaxRCRefreshText = 'Auto-refresh';
importScriptPage('AjaxRC/code.js', 'dev');
var ajaxRefresh = 30000;
// END of ajax auto-refresh