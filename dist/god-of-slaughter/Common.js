/* WAM Site-wide Installation */

window.railWAM = {
    logPage:"Project:WAM Log"
};

// Custom edit buttons
importScriptPage('MediaWiki:Common.js/CEB.js', 'admintools');
// END of custom edit buttons
 
// Collapsible Tables
var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";
var maxHeight = 300;
// END of Collapsible Tables
 
// Standard Edit Summaries
importScriptPage('MediaWiki:Common.js/standardeditsummaries.js', 'admintools');
// END of Standard Edit Summaries
 
// Ajax auto-refresh
var ajaxPages = ["Special:RecentChanges", "Special:WikiActivity",
                 "Special:Log", "Special:Watchlist", "Special:NewFiles",
                 "Special:NewPages", "Special:ListFiles", "Special:Videos"];
var AjaxRCRefreshText = 'Auto-refresh';
window.ajaxRefresh = 30000;
// END of ajax auto-refresh
 
// Fix Edit Summary Prompt for UNDO
importScriptPage('MediaWiki:Common.js/undoSummary.js', 'admintools');
// END Fix Edit Summary Prompt for UNDO
 
// Extra Rollback Buttons
importScriptPage('MediaWiki:Common.js/extraRollbacks.js', 'admintools');
// END Extra Rollback Buttons
 
// AjaxRollback - works with Extra Rollback Buttons
importScriptPage('MediaWiki:Common.js/ajaxRollback.js', 'admintools');
// END AjaxRollback
 
// JS for Template:CSS
importScriptPage('MediaWiki:Common.js/userCSS.js', 'admintools');
// END JS for Template:CSS
 
// Adds PURGE button for both skins
var PurgeButtonText = 'Purge';
// END Adds PURGE button for both skins
 
// For UserGroup-only messages
importScriptPage('MediaWiki:Common.js/UserGroupMessages.js', 'admintools');
// END For UserGroup-only messages
 
// Adds PopupsNavigation
// importScriptPage('MediaWiki:Common.js/popupsNav.js', 'admintools');
// END Adds PopupsNavigation
 
// Add Template:Information to Special:Upload
importScriptPage('MediaWiki:Common.js/uploadTemp.js', 'admintools');
// END Add Template:Information to Special:Upload
 
// Locate Main Page "Buttons" into Headers
importScriptPage('MediaWiki:Common.js/mainPageButtons.js', 'admintools');
// END Locate Main Page "Buttons" into Headers
 
// Renders SVGs as PNGs in Multiple Resolutions
importScriptPage('MediaWiki:Common.js/SvgToPng.js', 'admintools');
// END Renders SVGs as PNGs in Multiple Resolutions
 
// Render “Wikia contributor” as IP address
window.RevealAnonIP = { permissions : ['user'] };
// END Render "Wikia contributor" as IP address

// IP Range Calculator
importScriptPage('MediaWiki:Common.js/iprange.js', 'admintools');
// End IP Range Calculator
 
// Add WhatLeavesHere
// importScriptPage('MediaWiki:Common.js/WhatLeavesHere.js', 'admintools');
// END Add WhatLeavesHere
 
// Add ImageMapEdit functionality
importScriptURI('//tools.wmflabs.org/imagemapedit/ime.js');
// END Add ImageMapEdit functionality
 
// JS for Template:HelpButton
importScriptPage('MediaWiki:Common.js/helpHover.js');
// END JS for Template:HelpButton
 
// Add AjaxRedirect for quick redirections
if (mw.config.get('wgUserGroups').indexOf('sysop') > -1) {
    importScriptPage('MediaWiki:AjaxRedirect/code.js', 'dev');
}
// END Add AjaxRedirect for quick redirections
 
// Add MassCategorization for (de)categorization en masse
if (mw.config.get('wgUserGroups').indexOf('sysop') > -1) {
    massCategorizationDelay = 1000;
    importScriptPage('MediaWiki:MassCategorization/code.js', 'dev');
}
// END Add MassCategorization for (de)categorization en masse
 
// Add MassRedirect
if (mw.config.get('wgUserGroups').indexOf('sysop') > -1) {
    importScriptPage('MediaWiki:Common.js/massRedirect.js', 'admintools');
}
// END Add MassRedirect
 
// Add RedirectManagement for solving redirect issues
if (mw.config.get('wgUserGroups').indexOf('sysop') > -1) {
    importScriptPage('MediaWiki:RedirectManagement/code.js', 'dev');
}
// END Add RedirectManagement for solving redirect issues
 
// Add MassRename for renaming batches of pages
if (mw.config.get('wgUserGroups').indexOf('sysop') > -1) {
  massRenameDelay = 1000;
  massRenameSummary = 'automatic';
  importScriptPage('MediaWiki:MassRename/code.js', 'dev');
}
// END Add MassRename for renaming batches of pages
 
// Generate UnwatchedLonelyPages report
importScriptPage('MediaWiki:Common.js/unwatchedLonelyPages.js', 'admintools');
// END Generate UnwatchedLonelyPages report