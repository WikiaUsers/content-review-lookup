/* Add stuff to user menu
 * By: [[User:The 888th Avatar]]
 */

function FollowingMenuItem() {
	$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Special:Following">Followed pages</a></li>');
}
 
addOnloadHook(FollowingMenuItem);