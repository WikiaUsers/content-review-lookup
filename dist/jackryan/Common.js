/* Any JavaScript here will be loaded for all users on every page load. */
// ============================================================

// *******
// Auto-Refreshing RecentChanges, Logs, Contributions, and WikiActivity (Courtesy of Sactage)
// *******
var ajaxPages = [
    "Special:RecentChanges",
    "Special:Log",
    "Special:Contributions",
    "Special:WikiActivity"
];
var AjaxRCRefreshText = 'AutoRefresh';
importScriptPage('AjaxRC/code.js', 'dev');