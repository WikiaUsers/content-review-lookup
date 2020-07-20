/* Any JavaScript here will be loaded for all users on every page load. */
ajaxPages = ["Special:WikiActivity","Special:RecentChanges","Special:Log"];
ajaxRefresh = 20000; /* 20 seconds */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';

importScriptPage('AjaxRC/code.js', 'dev');

importScriptPage('ShowHide/code.js', 'dev');