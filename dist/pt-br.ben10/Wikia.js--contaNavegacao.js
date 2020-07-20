function AddNavigationLinks() {
	$('<li><a href="/wiki/Predefinição:D'+ encodeURIComponent(wgUserName) +'">Meu Depósito</a></li>').insertAfter($('.AccountNavigation .subnav li a[data-id="preferences"]').parent());
}
addOnloadHook(AddNavigationLinks);