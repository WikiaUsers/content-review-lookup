/* Any JavaScript here will be loaded for all users on every page load. */
    // ***************************************
    // Ajax-refresh (code from pcj of WoWWiki)
    // ***************************************
    var ajaxPages = ["Special:RecentChanges", "Special:Log", "Special:Contributions", "Special:AbuseLog"];
    var AjaxRCRefreshText = 'Auto-Refresh';
    importScriptPage('AjaxRC/code.js', 'dev');