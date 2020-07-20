// <source lang="JavaScript"> 
 
// adiciona "Depósito" na accountNavigation
 
function AddNavigationLinks() {
	$('<li><a href="/wiki/OmniProject:Depósito/'+ encodeURIComponent(wgUserName) +'">Meu depósito</a></li>').insertAfter($('.AccountNavigation .subnav li a[data-id="preferences"]').parent());
}
addOnloadHook(AddNavigationLinks);
 
// end source
 
// </source>