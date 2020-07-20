// 08:46, October 24, 2013 (UTC)
// <source lang="JavaScript">
 
// Add Special:Contributions, Special:Watchlist, & Special:Following to AccountNavigation in Wikia skin
 
function AddNavigationLinks() {
	$('<li><a href="/wiki/Special:Contributions/'+ encodeURIComponent(wgUserName) +'">Mis Contribuciones</a></li><li><a href="/wiki/Special:Watchlist/'+ encodeURIComponent(wgUserName) +'">Mis lista</a></li><li><a href="/wiki/Special:Following">Paginas siguiendo</a></li>').insertAfter($('.AccountNavigation .subnav li a[data-id="preferences"]').parent());
}
addOnloadHook(AddNavigationLinks);
 
// END Add Special:Contributions, Special:Watchlist, & Special:Following to AccountNavigation in Wikia skin
 
// </source>