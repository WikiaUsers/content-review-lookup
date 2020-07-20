/* Any JavaScript here will be loaded for all users on every page load. */
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
// 16:03, September 8, 2013 (UTC)
// <source lang="JavaScript">
 
// Test if an Element has a Certain Class
importScript('MediaWiki:Common.js/elementClass.js');
// END Test if an Element has a Certain Class
 
// Cookie accessor functions
importScript('MediaWiki:Common.js/cookieAccessor.js');
// END Cookie accessor functions
 
// Redesign of ProfileMastheads (included for statustop)
importScript('MediaWiki:Common.js/profileRedesign.js');
// END Redesign of ProfileMastheads
 
// Custom edit buttons
importScript('MediaWiki:Common.js/CEB.js');
// END of custom edit buttons
 
var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";
var maxHeight = 300;
 
// Collapsible Tables
importScriptPage('ShowHide/code.js', 'dev');
// END of Collapsible Tables
 
// Standard Edit Summaries
importScript('MediaWiki:Common.js/standardeditsummaries.js');
// END of Standard Edit Summaries
 
// Ajax auto-refresh
var ajaxPages = ["Special:RecentChanges", "Special:WikiActivity", "Special:Log",
                 "Special:Watchlist", "Special:Contributions", "Special:AbuseLog", 
                 "Special:NewFiles", "Special:Statistics", "Special:NewPages",
                 "Special:ListFiles"];
var AjaxRCRefreshText = 'Auto-refresh';
importScriptPage('AjaxRC/code.js', 'dev');
// END of ajax auto-refresh
 
// Added SiteNotice Functionality
importScript('MediaWiki:Common.js/sitenotice.js');
// END of added SiteNotice functionality
 
// Fix Edit Summary Prompt for UNDO
importScript('MediaWiki:Common.js/undoSummary.js');
// END Fix Edit Summary Prompt for UNDO
 
// Skin Redirect Code
importScript('MediaWiki:Common.js/skinRedirect.js');
// END of Skin Redirect Code
 
// Extra Rollback Buttons
importScript('MediaWiki:Common.js/extraRollbacks.js');
// END Extra Rollback Buttons
 
// AjaxRollback - works with Extra Rollback Buttons
importScript('MediaWiki:Common.js/ajaxRollback.js');
// END AjaxRollback
 
// FastDelete Buttons for Administrators
importScript('MediaWiki:Common.js/fastDelete.js');
// END FastDelete Buttons for Administrators
 
// Adds DisplayClock
importScript('MediaWiki:Common.js/displayClock.js');
// END Adds DisplayClock
 
// JS for Template:CSS
importScript('MediaWiki:Common.js/userCSS.js');
// END JS for Template:CSS
 

// Adds PURGE button for both skins
var PurgeButtonText = 'Purge';
importScriptPage('PurgeButton/code.js', 'dev');
// END Adds PURGE button for both skins
 
// For UserGroup-only messages
importScript('MediaWiki:Common.js/UserGroupMessages.js');
// END For UserGroup-only messages
 
// Add "Edit Intro" Button/Tab
importScriptPage('EditIntroButton/code.js', 'dev');
// END Add "Edit Intro" Button/Tab
 
// Adds PopupsNavigation
importScript('MediaWiki:Common.js/popupsNav.js');
// END Adds PopupsNavigation
 
// Add Enhanced DIFF View
importScript('MediaWiki:Common.js/wikEdDiff.js');
// END Add Enhanced DIFF View
 
// Add Template:Information to Special:Upload
importScript('MediaWiki:Common.js/uploadTemp.js');
// END Add Template:Information to Special:Upload
 
// Backwards compatibility CSS
importScript('MediaWiki:Common.js/backupCSS.js');
// END Backwards compatibility CSS 
 
// Locate Main Page "Buttons" into Headers
importScript('MediaWiki:Common.js/mainPageButtons.js');
// END Locate Main Page "Buttons" into Headers
 
// IE-specific fixes
importScript('MediaWiki:Common.js/IE.js');
// END IE-specific fixes
 
// Renders SVGs as PNGs in Multiple Resolutions
importScript('MediaWiki:Common.js/SvgToPng.js');
// END Renders SVGs as PNGs in Multiple Resolutions
 
// Render "Wikia contributor" as IP address
importScript('MediaWiki:Common.js/revealAnonIP.js')
// END Render "Wikia contributor" as IP address
 
// Check that user has signed talkpage post
importScriptPage('SignatureCheck/code.js', 'dev');
// END Check that user has signed talkpage post
 
// Duplicate image detector
importScriptPage('DupImageList/code.js', 'dev');
// END duplicate image detector
 
// username class for Template:USERNAME
importScript('MediaWiki:Common.js/userName.js');
// END username class for Template:USERNAME
 
// IP Range Calculator
importScript('MediaWiki:Common.js/iprange.js');
// End IP Range Calculator  

importScript('MediaWiki:Common.js/profileRedesign.js');
importScript('MediaWiki:Common.js/slider.js');
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});