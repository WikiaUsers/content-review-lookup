// 11:29, January 14, 2017 (UTC)
// <source lang="JavaScript">

// Add Special:Contributions, Special:Watchlist, & Special:Following to AccountNavigation in Oasis
importScriptPage('MediaWiki:Wikia.js/accountNavigation.js', 'admintools');
// END Add Special:Contributions, Special:Watchlist, & Special:Following to AccountNavigation in Oasis

// Restoring Special:Upload functionality
importScriptPage('MediaWiki:Wikia.js/uploadPhoto.js', 'admintools');
// END Restoring Special:Upload functionality

// Advertise new CHAT
importScript('MediaWiki:Wikia.js/chat.js');
// END Advertise new CHAT

// Restore Traditional [edit] button style
importScriptPage('MediaWiki:Wikia.js/editButton.js', 'admintools');
// END Restore Traditional [edit] button style

// Additional UserRights Icons in profile mastheads
importScriptPage('MediaWiki:ProfileTags.js', 'dev');
// END Additional UserRights Icons in profile mastheads

// Adds copyright notice to siderail in Oasis
importScript('MediaWiki:Wikia.js/copyright.js');
// END Adds copyright notice to siderail in Oasis

// Add CANCEL Button for new RTE
importScriptPage('MediaWiki:Wikia.js/cancelButton.js', 'admintools');
// END Add CANCEL Button for new RTE

// Add EditCount tab to user namespace
importScriptPage('MediaWiki:Wikia.js/editCount.js', 'admintools');
// END Add EditCount tab to user namespace

// MediaWiki 1.19 fix
importScriptPage('MediaWiki:Wikia.js/personalSkin.js', 'admintools');
// END MediaWiki 1.19 fix

// Add additional choices to OnTheWiki
importScript('MediaWiki:Wikia.js/OnTheWiki.js');
// END Add additional choices to OnTheWiki

// Add AutoEditDropdown to edit menus
importScriptPage('MediaWiki:AutoEditDropdown/code.js', 'dev');
// END Add AutoEditDropdown to edit menus

// Add SearchSuggest for titles
importScriptPage('MediaWiki:SearchSuggest/code.js', 'dev');
// END Add SearchSuggest for titles

// Add ViewSource to pulldown options
importScriptPage('MediaWiki:View_Source/code.js', 'dev');
// END Add ViewSource to pulldown options

// Add BackToThread to thread histories
importScriptPage('MediaWiki:BackToThread/code.js', 'dev');
// END Add BackToThread to thread histories

// Add CategoryRenameAuto-update
if (mw.config.get('wgUserGroups').indexOf('sysop') > -1) {
    importScriptPage('MediaWiki:CategoryRenameAuto-update/code.js', 'dev');
}
// END Add CategoryRenameAuto-update

// </source>