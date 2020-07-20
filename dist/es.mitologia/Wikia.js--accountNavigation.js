// <source lang="JavaScript">
 
// Special:Contributions, Special:MyBlog y Special:Seguimiento
 
function AddNavigationLinks() {
	$('<li><a href="/wiki/Special:Contributions/'+ encodeURIComponent(wgUserName) +'">Contribuciones</a></li><li><a href="/wiki/Special:MyBlog/'+ encodeURIComponent(wgUserName) +'">Blogs</a></li><li><a href="/wiki/Special:Seguimiento/">Seguimiento</a></li>').insertAfter($('.AccountNavigation .subnav li a[data-id="preferences"]').parent());
}
addOnloadHook(AddNavigationLinks);
 
// END Add Special:Contributions, Special:Watchlist, & Special:Following to AccountNavigation in Wikia skin
 
// </source>