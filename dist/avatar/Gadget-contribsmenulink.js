/* Add a link to your list of contributions to the user menu
 * Adapted from code originally on w:c:dev
 */

function UserContribsMenuItem() {
	$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Special:Contributions/'+ encodeURIComponent (wgUserName) +'">Contributions</a></li>');
}
 
addOnloadHook(UserContribsMenuItem);