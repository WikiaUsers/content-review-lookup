/* Any JavaScript here will be loaded for all users on every page load. */

window.MassCategorizationGroups = ['sysop', 'content-moderator'];

window.MassRenameRevertGroups = ['sysop', 'content-moderator'];

ajaxPages = ["Special:WikiActivity","Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions"];
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
importScriptPage('AjaxRC/code.js', 'dev');