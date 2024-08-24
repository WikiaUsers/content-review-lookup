// Afegim a la navegació del compte un enllaç per habilitar els accessoris (skins personalitzats)
function AddNavigationLinks() {
	$('<li><a href="/wiki/Special:Preferences#mw-prefsection-gadgets" data-id="accessoris">Accessoris</a></li>').insertAfter($('.AccountNavigation .subnav li a[data-id="preferences"]').parent());
}
addOnloadHook(AddNavigationLinks);
// [[Template:Article_destacat]]
$('.WikiaPageHeader').append($('.article_destacat'));