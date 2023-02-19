/* Any JavaScript here will be loaded for all users on every page load. */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = [
    'Special:RecentChanges',
    'Special:WikiActivity',
    'Special:AllPages',
    'Special:UncategorizedPages'
];
 
if (mw.config.get("wgUserGroups").indexOf('sysop') > -1)
  importScriptPage('MediaWiki:AjaxRedirect/code.js', 'dev');