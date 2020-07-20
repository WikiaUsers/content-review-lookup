// 15:25, August 21, 2013 (UTC)
// <source lang="JavaScript">
 
// Add Special:Contributions, Special:Watchlist, & Special:Following to AccountNavigation in Wikia skin
importScript('MediaWiki:Wikia.js/accountNavigation.js');
// END Add Special:Contributions, Special:Watchlist, & Special:Following to AccountNavigation in Wikia skin
 
// Restoring Special:Upload functionality
importScript('MediaWiki:Wikia.js/uploadPhoto.js');
// END Restoring Special:Upload functionality
 
// Advertise new CHAT
importScript('MediaWiki:Wikia.js/chat.js');
// END Advertise new CHAT
 
// Restore Traditional [edit] button style
importScript('MediaWiki:Wikia.js/editButton.js');
// END Restore Traditional [edit] button style
 
// Additional UserRights Icons in profile mastheads
importScript('MediaWiki:Wikia.js/userRightsIcons.js');
// END Additional UserRights Icons in profile mastheads
 
// Adds copyright notice to siderail in Oasis
importScript('MediaWiki:Wikia.js/copyright.js');
// END Adds copyright notice to siderail in Oasis
 
// Add navigation bar to the bottom of WikiaPage
importScript('MediaWiki:Wikia.js/navbarFooter.js');
// END Add navigation bar to the bottom of WikiaPage
 
// Add CANCEL Button for new RTE
importScript('MediaWiki:Wikia.js/cancelButton.js');
// END Add CANCEL Button for new RTE
 
// Add EditCount tab to user namespace
importScript('MediaWiki:Wikia.js/editCount.js');
// END Add EditCount tab to user namespace
 
// MediaWiki 1.19 fix for personal CSS/JS
importScript('MediaWiki:Wikia.js/personalSkin.js');
// END MediaWiki 1.19 fix
 
// Sitenotice for Oasis
// importScriptPage('OasisSitenotice/code.js', 'dev');
// END Sitenotice for Oasis
 
// </source>

var SocialMediaButtons = { 
	position: "top",
	colorScheme: "dark"
};
importScriptPage('SocialIcons/code.js','dev');