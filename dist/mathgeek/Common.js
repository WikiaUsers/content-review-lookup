// 13:21, August 18, 2014 (UTC)
// <source lang="JavaScript">
/*** Extra Source Editor Buttons ***/
 
if ( mwCustomEditButtons ) {
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
		"speedTip": "Redirect",
		"tagOpen": "#REDIRECT [[",
		"tagClose": "]]",
		"sampleText": "Insert text"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/c/c9/Button_strike.png",
		"speedTip": "Strike",
		"tagOpen": "<s>",
		"tagClose": "</s>",
		"sampleText": "Strike-through text"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/1/13/Button_enter.png",
		"speedTip": "Line break",
		"tagOpen": "<br />",
		"tagClose": "",
		"sampleText": ""
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/7/74/Button_comment.png",
		"speedTip": "Comment visible only for editors",
		"tagOpen": "<!-- ",
		"tagClose": " -->",
		"sampleText": "Insert comment here"
	}; 
// Test if an Element has a Certain Class
importScriptPage('MediaWiki:Common.js/elementClass.js', 'admintools');
// END Test if an Element has a Certain Class
 
// Cookie accessor functions
importScriptPage('MediaWiki:Common.js/cookieAccessor.js', 'admintools');
// END Cookie accessor functions
 
// Redesign of ProfileMastheads (included for statustop)
importScriptPage('MediaWiki:Common.js/profileRedesign.js', 'admintools');
// END Redesign of ProfileMastheads
 
// Custom edit buttons
importScriptPage('MediaWiki:Common.js/CEB.js', 'admintools');
// END of custom edit buttons
 
var autoCollapse = 2;
var collapseCaption = "show";
var expandCaption = "show";
var maxHeight = 300;
 
// Collapsible Tables
importScriptPage('ShowHide/code.js', 'dev');
// END of Collapsible Tables
 
// Ajax auto-refresh
var ajaxPages = ["Special:RecentChanges", "Special:WikiActivity", "Special:Log",
                 "Special:Watchlist", "Special:Contributions", "Special:AbuseLog", 
                 "Special:NewFiles", "Special:Statistics", "Special:NewPages",
                 "Special:ListFiles", "Special:Videos"];
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
importScriptPage('MediaWiki:Common.js/displayClock.js', 'admintools');
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
 
// Add Template:Information to Special:Upload
importScriptPage('MediaWiki:Common.js/uploadTemp.js', 'admintools');
// END Add Template:Information to Special:Upload
 
// Renders SVGs as PNGs in Multiple Resolutions
importScriptPage('MediaWiki:Common.js/SvgToPng.js', 'admintools');
// END Renders SVGs as PNGs in Multiple Resolutions
 
// Add Inactive User Icon to MastheadProfiles
importScriptPage('InactiveUsers/code.js', 'dev');
// END Add Inactive User Icon to MastheadProfiles
 
// Render "Wikia contributor" as IP address
importScriptPage('RevealAnonIP/code.js', 'dev');
// END Render "Wikia contributor" as IP address
 
// Check that user has signed talkpage post
importScriptPage('SignatureCheck/code.js', 'dev');
// END Check that user has signed talkpage post
 
// Duplicate image detector
importScriptPage('DupImageList/code.js', 'dev');
// END duplicate image detector
 
// File lister
importScriptPage('ListFiles/code.js', 'dev');
// END File lister
 
// username class for Template:USERNAME
importScriptPage('MediaWiki:Common.js/userName.js', 'admintools');
// END username class for Template:USERNAME
 
// IP Range Calculator
importScriptPage('MediaWiki:Common.js/iprange.js', 'admintools');
// End IP Range Calculator
 
// Adds floating style TOC
// importScriptPage('FloatingToc/code.js', 'dev');
// END Adds floating style TOC
 
// Add social networking buttons to wiki
var SocialMediaButtons = { position: "top", colorScheme: "color" };
importScriptPage('SocialIcons/code.js','dev');
// END Add social networking buttons to wiki
 
// JS for Template:HelpButton
// importScript('MediaWiki:Common.js/helpHover.js');
// END JS for Template:HelpButton
 
// </source>