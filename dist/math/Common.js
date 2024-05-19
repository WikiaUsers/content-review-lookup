// 18:35, February 15, 2017 (UTC)
// <source lang="JavaScript">

// Test if an Element has a Certain Class
importScriptPage('MediaWiki:Common.js/elementClass.js', 'admintools');
// END Test if an Element has a Certain Class

// Cookie accessor functions
importScriptPage('MediaWiki:Common.js/cookieAccessor.js', 'admintools');
// END Cookie accessor functions

// Redesign of ProfileMastheads (included for statustop)
importScriptPage('MediaWiki:Common.js/profileRedesign.js', 'admintools');
// END Redesign of ProfileMastheads

// Collapsible Tables
var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";
var maxHeight = 300;
importScriptPage('MediaWiki:ShowHide/code.js', 'dev');
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
importScriptPage('MediaWiki:AjaxRC/code.js', 'dev');
// END of ajax auto-refresh

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
importScriptPage('MediaWiki:PurgeButton/code.js', 'dev');
// END Adds PURGE button for both skins

// For UserGroup-only messages
importScriptPage('MediaWiki:Common.js/UserGroupMessages.js', 'admintools');
// END For UserGroup-only messages

// Add "Edit Intro" Button/Tab
importScriptPage('MediaWiki:EditIntroButton/code.js', 'dev');
// END Add "Edit Intro" Button/Tab

// Adds PopupsNavigation
// importScriptPage('MediaWiki:Common.js/popupsNav.js', 'admintools');
// END Adds PopupsNavigation

// Add Template:Information to Special:Upload
importScriptPage('MediaWiki:Common.js/uploadTemp.js', 'admintools');
// END Add Template:Information to Special:Upload

// Renders SVGs as PNGs in Multiple Resolutions
importScriptPage('MediaWiki:Common.js/SvgToPng.js', 'admintools');
// END Renders SVGs as PNGs in Multiple Resolutions

// Add Inactive User Icon to MastheadProfiles
importScriptPage('MediaWiki:InactiveUsers/code.js', 'dev');
// END Add Inactive User Icon to MastheadProfiles

// Render “Wikia contributor” as IP address
window.RevealAnonIP = { permissions : ['user'] };
importScriptPage('MediaWiki:RevealAnonIP/code.js', 'dev');
// END Render "Wikia contributor" as IP address

// Check that user has signed talkpage post
importScriptPage('MediaWiki:SignatureCheck/code.js', 'dev');
// END Check that user has signed talkpage post

// Duplicate image detector
importScriptPage('MediaWiki:DupImageList/code.js', 'dev');
// END duplicate image detector

// File lister
importScriptPage('MediaWiki:ListFiles/code.js', 'dev');
// END File lister

// username class for Template:USERNAME
importScriptPage('MediaWiki:Common.js/userName.js', 'admintools');
// END username class for Template:USERNAME

// IP Range Calculator
importScriptPage('MediaWiki:Common.js/iprange.js', 'admintools');
// End IP Range Calculator

// Adds floating style TOC
// importScriptPage('MediaWiki:FloatingToc/code.js', 'dev');
// END Adds floating style TOC

// Add NullEdit button
importScriptPage('MediaWiki:NullEditButton/code.js', 'dev');
// END NullEdit button

// Add WhatLeavesHere
// importScriptPage('MediaWiki:Common.js/WhatLeavesHere.js', 'admintools');
// END Add WhatLeavesHere

// Fixes NewPage Patrol Issues
importScriptPage('MediaWiki:AjaxPatrol/code.js', 'dev');
// END Fixes NewPage Patrol Issues

// Add ImageMapEdit functionality
importScriptURI('//tools.wmflabs.org/imagemapedit/ime.js');
// END Add ImageMapEdit functionality

// JS for Template:HelpButton
// importScriptPage('MediaWiki:Common.js/helpHover.js');
// END JS for Template:HelpButton

// Add Reference Popups
importScriptPage('MediaWiki:ReferencePopups/code.js', 'dev');
// END DD Reference Popups

// Hide redirects at PrefixIndex & AllPages
importScriptPage('MediaWiki:AllPagesHideRedirect/code.js', 'dev');
// END redirects at PrefixIndex & AllPages

// Last edit details on articles
if(wgAction=='view') {
window.lastEdited = {
    avatar: false,
    size: true,
    diff: true,
    comment: true,
    time: 'timestamp',
    namespaces: {
        //  2 - User:
        //  4 - Project:
        // 13 - Help talk:
        include: [13],
        exclude: [2,4]
    },
    pages: ["Scratchpad"]
};
importScriptPage('MediaWiki:LastEdited/code.js', 'dev');
}
// END Last edit details on articles

// Add Countdown Timer code
importScriptPage('MediaWiki:Countdown/code.js', 'dev');
// END Add Countdown Timer code

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

// Add MassRedirect for redirecting closed mini-wikis
if (mw.config.get('wgUserGroups').indexOf('sysop') > -1) {
    importScriptPage('MediaWiki:Common.js/massRedirect.js', 'admintools');
}
// END Add MassRedirect for redirecting closed mini-wikis

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

// Add “poweruser” to Special:ListUsers
importScriptPage('MediaWiki:Common.js/powerUser.js', 'admintools');
// END Add “poweruser” to Special:ListUsers

// Add script for Template:NAMESPACENUMBER
importScriptPage('MediaWiki:Common.js/namespaceNumber.js', 'admintools');
// END Add script for Template:NAMESPACENUMBER

// Add Screen Resolution script /* For use at Project:Screen_resolution */
importScriptPage('MediaWiki:Common.js/screenResolution.js', 'scratchpad');
// END Add Screen Resolution script

// Generate UnwatchedLonelyPages report at [[Project:UnwatchedLonelyPages]]
importScriptPage('MediaWiki:Common.js/unwatchedLonelyPages.js', 'admintools');
// END Generate UnwatchedLonelyPages report [[Project:UnwatchedLonelyPages]]

// Add editintros for disambigs
importScriptPage('MediaWiki:Common.js/magicEditintros.js', 'scratchpad');
// END Add editintros for disambigs

// Add SkinSwitcher option
importScriptPage('MediaWiki:Common.js/skinSwitch.js', 'admintools');
// END Add SkinSwitcher option

// JS for Project:User_info
importScriptPage('MediaWiki:Common.js/UserInfo.js', 'math');
// END JS for Project:User_info

// Custom edit buttons
importScriptPage('MediaWiki:Common.js/CEB.js', 'admintools');
// END of custom edit buttons

// Add Halloween bats!
// importScriptPage('MediaWiki:Common.js/jsBat.js', 'scratchpad');
// END Add Halloween bats!

// Add snow
// excludeMobile = false;
// snowColor = "#FFFFFF";
// snowCharacter = "&#10052;"
// followMouse = false;
// snowStick = true;
// zIndex = 100;
// importScriptPage('MediaWiki:SnowStorm.js', 'dev');
// END Add snow

// </source>