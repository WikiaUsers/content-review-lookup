// 17:18, June 2, 2014 (UTC)
// <source lang="JavaScript">

// Redesign of ProfileMastheads (included for statustop)
importScriptPage('MediaWiki:Common.js/profileRedesign.js', 'admintools');
// END Redesign of ProfileMastheads
 
// Custom edit buttons
importScriptPage('MediaWiki:Common.js/CEB.js', 'admintools');
// END of custom edit buttons

var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";
var maxHeight = 300;
 
// Collapsible Tables
importScriptPage('ShowHide/code.js', 'dev');
// END of Collapsible Tables
 
// Standard Edit Summaries
importScriptPage('MediaWiki:Common.js/standardeditsummaries.js', 'admintools');
// END of Standard Edit Summaries
 
// Ajax auto-refresh
var ajaxPages = ["Special:RecentChanges", "Special:WikiActivity", "Special:Log",
                 "Special:Watchlist", "Special:Contributions", "Special:AbuseLog", 
                 "Special:NewFiles", "Special:Statistics", "Special:NewPages",
                 "Special:ListFiles", "Special:Videos"];
var AjaxRCRefreshText = 'Auto-refresh';
importScriptPage('AjaxRC/code.js', 'dev');
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

// Backwards compatibility CSS
importScriptPage('MediaWiki:Common.js/backupCSS.js', 'admintools');
// END Backwards compatibility CSS 
 
// IE-specific fixes
importScriptPage('MediaWiki:Common.js/IE.js', 'admintools');
// END IE-specific fixes

// Add Inactive User Icon to MastheadProfiles
importScriptPage('InactiveUsers/code.js', 'dev');
// END Add Inactive User Icon to MastheadProfiles
 
// Render "Wikia contributor" as IP address
importScriptPage('RevealAnonIP/code.js', 'dev');
// END Render "Wikia contributor" as IP address
 
// Check that user has signed talkpage post
importScriptPage('SignatureCheck/code.js', 'dev');
// END Check that user has signed talkpage post

// Add social networking buttons to wiki
var SocialMediaButtons = { position: "top", colorScheme: "color" };
importScriptPage('SocialIcons/code.js','dev');
// END Add social networking buttons to wiki