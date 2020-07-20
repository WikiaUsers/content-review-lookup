 importScriptPage('FastDelete/code.js', 'dev');
var fdButtons = [];
fdButtons[fdButtons.length] = {
  'summary': 'spam',
  'label': 'spam'};
fdButtons[fdButtons.length] = {
  'summary': 'vandalism',
  'label': 'vandalism'}
fdButtons[fdButtons.length] = {
  'summary': 'Clean Up',
  'label': 'Clean Up'}

// Adds copyright notice to siderail in Oasis
importScript('MediaWiki:Wikia.js/copyright.js');
// END Adds copyright notice to siderail in Oasis

// Add Special:Contributions, Special:Watchlist, & Special:Following to AccountNavigation in Wikia skin
importScript('MediaWiki:Wikia.js/accountNavigation.js');
// END Add Special:Contributions, Special:Watchlist, & Special:Following to AccountNavigation in Wikia skin

// Add CANCEL Button for new RTE
importScript('MediaWiki:Wikia.js/cancelButton.js');
// END Add CANCEL Button for new RTE
/* Auto-refresh the Recentchanges and Wikiactivity; copied from Avatar Wiki's */

AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');

importScript('MediaWiki:Wikia.js/userRightsIcons.js');

// 11:11, 3/19/3012, 
// <source lang="JavaScript">
/* add contribs to user menu - 2/1/11 */
 
function UserContribsMenuItem() {
	$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Special:Contributions/'+ encodeURIComponent (wgUserName) +'">Contributions</a></li>');
}
 
addOnloadHook(UserContribsMenuItem);

// </source>