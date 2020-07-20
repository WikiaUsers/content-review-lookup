/* Dashboard */
 
function AddNavigationLinks() {
	$('<li><a href="/wiki/Project:Dashboard">Dashboard</a></li>').insertAfter($('.AccountNavigation .subnav li a[data-id="preferences"]').parent());
}
addOnloadHook(AddNavigationLinks);
 
/* User Rights Icons */
importScript('MediaWiki:Wikia.js/userRightsIcons.js');