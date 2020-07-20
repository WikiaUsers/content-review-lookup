// 07:19, August 2, 2012 (UTC)
// <source lang="JavaScript">

// Test if an Element has a Certain Class
importScriptPage('MediaWiki:Common.js/elementClass.js', 'admintools');
// END Test if an Element has a Certain Class

// Cookie accessor functions
importScriptPage('MediaWiki:Common.js/cookieAccessor.js', 'admintools');
// END Cookie accessor functions

// Redesign of ProfileMastheads (included for statustop)
importScript('MediaWiki:Common.js/profileRedesign.js');
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
var ajaxPages = ['Special:RecentChanges','Special:WikiActivity'];
var AjaxRCRefreshText = 'Auto-refresh';
importScriptPage('AjaxRC/code.js', 'dev');
// END of ajax auto-refresh

// Added SiteNotice Functionality
importScriptPage('MediaWiki:Common.js/sitenotice.js', 'admintools');
// END of added SiteNotice functionality

// Fix Edit Summary Prompt for UNDO
importScriptPage('MediaWiki:Common.js/undoSummary.js', 'admintools');
// END Fix Edit Summary Prompt for UNDO

// Skin Redirect Code
importScriptPage('MediaWiki:Common.js/skinRedirect.js', 'admintools');
// END of Skin Redirect Code

// Extra Rollback Buttons
importScriptPage('MediaWiki:Common.js/extraRollbacks.js', 'admintools');
// END Extra Rollback Buttons

// AjaxRollback - works with Extra Rollback Buttons
importScriptPage('MediaWiki:Common.js/ajaxRollback.js', 'admintools');
// END AjaxRollback

// FastDelete Buttons for Administrators
importScriptPage('MediaWiki:Common.js/fastDelete.js', 'admintools');
// END FastDelete Buttons for Administrators

// Adds DisplayClock
// importScriptPage('MediaWiki:Common.js/displayClock.js', 'admintools');
// END Adds DisplayClock

// JS for Template:CSS
importScriptPage('MediaWiki:Common.js/userCSS.js', 'admintools');
// END JS for Template:CSS

// Adds PURGE button for both skins
var PurgeButtonText = 'Purge';
importScriptPage('PurgeButton/code.js', 'dev');
// END Adds PURGE button for both skins

// For UserGroup-only messages
importScriptPage('MediaWiki:Common.js/UserGroupMessages.js', 'admintools');
// END For UserGroup-only messages

// Add "Edit Intro" Button/Tab
importScriptPage('EditIntroButton/code.js', 'dev');
// END Add "Edit Intro" Button/Tab

// Adds PopupsNavigation
// importScript('MediaWiki:Common.js/popupsNav.js');
// END Adds PopupsNavigation

// Add Enhanced DIFF View
importScriptPage('MediaWiki:Common.js/wikEdDiff.js', 'admintools');
// END Add Enhanced DIFF View

// Add Template:Information to Special:Upload
importScriptPage('MediaWiki:Common.js/uploadTemp.js', 'admintools');
// END Add Template:Information to Special:Upload

// Backwards compatibility CSS
importScriptPage('MediaWiki:Common.js/backupCSS.js', 'admintools');
// END Backwards compatibility CSS 

// Locate Main Page "Buttons" into Headers
importScriptPage('MediaWiki:Common.js/mainPageButtons.js', 'admintools');
// END Locate Main Page "Buttons" into Headers

// IE-specific fixes
importScriptPage('MediaWiki:Common.js/IE.js', 'admintools');
// END IE-specific fixes

// Display Comments w/ Local Times
// importScript('MediaWiki:Common.js/localTimeComments.js');
// END Display Comments w/ Local Times

// </source>