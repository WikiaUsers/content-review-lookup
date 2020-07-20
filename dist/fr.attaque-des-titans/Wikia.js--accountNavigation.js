// 08:46, October 24, 2013 (UTC)
// <source lang="JavaScript">

// Add Special:Contributions, Special:Watchlist, & Special:Following to AccountNavigation in Wikia skin

function AddNavigationLinks() {
	$('<li><a href="/wiki/Special:Contributions/'+ encodeURIComponent(wgUserName) +'">Mes contributions</a></li><li><a href="/wiki/Wiki_Shingekinokyojin:Guide_de_l%27%C3%A9dition'+'">Bien débuter</a></li><li><a href="/wiki/Blog_utilisateur:Think_D._Solucer/Arborescence_de_la_cat%C3%A9gorie_Manga">Catégorie Manga</a></li>').insertAfter($('.AccountNavigation .subnav li a[data-id="preferences"]').parent());
}
addOnloadHook(AddNavigationLinks);

// END Add Special:Contributions, Special:Watchlist, & Special:Following to AccountNavigation in Wikia skin

// </source>