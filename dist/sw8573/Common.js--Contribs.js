/* Any JavaScript here will be loaded for all users on every page load. */

// add contribs to user menu
// To add extra links, copy starting from <li> to </li> and change all relevant links

function AddNavigationLinks() {
	$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Special:Contributions/'+ encodeURIComponent (wgUserName) +'">My contributions</a></li><li><a href="/wiki/Sig/'+ encodeURIComponent (wgUserName) +'">My signature</a></li>');
}
addOnloadHook(AddNavigationLinks);