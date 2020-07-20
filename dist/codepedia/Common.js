/* Add a clock to the wiki header
 * See w:c:runescape:MediaWiki:Common.js/displayTimer.js for info & attribution
 */
 
importScriptPage('MediaWiki:Common.js/displayTimer.js', 'runescape');

/* Auto-refresh the Recentchanges and Wikiactivity; copied from Avatar Wiki's */
 
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');

/* add contribs to user menu - 2/1/11; by Monchoman45 */
 
function UserContribsMenuItem() {
	$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Special:Contributions/'+ encodeURIComponent (wgUserName) +'">Contributions</a></li>');
}
 
addOnloadHook(UserContribsMenuItem);

if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}