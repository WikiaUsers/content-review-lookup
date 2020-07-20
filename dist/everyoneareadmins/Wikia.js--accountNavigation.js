// 10:30, May 23, 2015 (UTC)
// <source lang="JavaScript">

// Add Special:Contributions, Special:Watchlist, & Special:Following to AccountNavigation in Wikia skin

function AddNavigationLinks() {
	$('<li><a href="/wiki/Special:Contributions/'+ encodeURIComponent(wgUserName) +'">My contributions</a></li><li><a href="/wiki/Special:Watchlist/'+ encodeURIComponent(wgUserName) +'">My watchlist</a></li><li><a href="/wiki/Special:Following">Followed pages</a></li>').insertAfter($('.AccountNavigation .subnav li a[data-id="preferences"]').parent());
}
addOnloadHook(AddNavigationLinks);

// END Add Special:Contributions, Special:Watchlist, & Special:Following to AccountNavigation in Wikia skin

// </source>