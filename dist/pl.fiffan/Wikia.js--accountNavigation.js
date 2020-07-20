// <source lang="JavaScript">
 
// Dodaje strony do nawigacji
 
function AddNavigationLinks() {
	$('<li><a href="/wiki/Special:Contributions/'+ encodeURIComponent(wgUserName) +'">Wkład</a></li><li><a href="/wiki/Specjalna:Licznik_edycji/">Licznik edycji</a></li><li><a href="/wiki/Special:Following">Obserwowane</a></li>').insertAfter($('.AccountNavigation .subnav li a[data-id="preferences"]').parent());
}
addOnloadHook(AddNavigationLinks);
 
// END Add Special:Contributions, Special:Watchlist, & Special:Following to AccountNavigation in Wikia skin
 
// </source>