if( wgNamespaceNumber != -1 && !window.WordmarkLink  ) {
	addOnloadHook( addWordmarkLink );
}
var WordmarkLink = true; // prevent duplication
 
function addWordmarkLink () {
	$('<a href="/Портал:Главная" accesskey="z"><img alt="WoWWiki" src="https://images.wikia.nocookie.net/__cb1/wowwiki/images/8/89/Wiki-wordmark.png"></a>').before('#firstHeading');
}