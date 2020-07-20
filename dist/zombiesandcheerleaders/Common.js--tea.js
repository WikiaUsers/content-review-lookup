// 06:31, August 25, 2011 (UTC)
// <source lang="JavaScript">

// Test if an Element has a Certain Class
importScript('MediaWiki:Common.js/elementClass.js', 'tea');
// END Test if an Element has a Certain Class

// Cookie accessor functions
importScript('MediaWiki:Common.js/cookieAccessor.js', 'tea');
// END Cookie accessor functions

// Custom edit buttons
importScript('MediaWiki:Common.js/CEB.js', 'tea');
// END of custom edit buttons

// [show]/[hide] buttons for tables
importScriptPage('ShowHide/code.js', 'dev');
// END [show]/[hide] buttons for tables

// Fix Edit Summary Prompt for UNDO
importScript('MediaWiki:Common.js/undoSummary.js', 'tea');
// END Fix Edit Summary Prompt for UNDO

// Extra Rollback Buttons
importScript('MediaWiki:Common.js/extraRollbacks.js', 'tea');
// END Extra Rollback Buttons
 
// AjaxRollback - works with Extra Rollback Buttons
importScript('MediaWiki:Common.js/ajaxRollback.js', 'tea');
// END AjaxRollback

// FastDelete Buttons for Administrators
importScript('MediaWiki:Common.js/fastDelete.js', 'tea');
// END FastDelete Buttons for Administrators

// Adds DisplayClock
importScript('MediaWiki:Common.js/displayClock.js', 'tea');
// END Adds DisplayClock

// For UserGroup-only messages
importScript('MediaWiki:Common.js/UserGroupMessages.js', 'tea');
// END For UserGroup-only messages

// Add "Edit Intro" Button/Tab
EditIntroButtonText = 'Edit intro';
importScriptPage('EditIntroButton/code.js', 'dev');
// END Add "Edit Intro" Button/Tab

// Adds PURGE button for both skins
var PurgeButtonText = 'Purge';
importScript('MediaWiki:Common.js/PurgeButton.js', 'tea');
// END Adds PURGE button for both skins

// </source>